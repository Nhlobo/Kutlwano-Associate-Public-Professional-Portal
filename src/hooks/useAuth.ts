import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import {
  EMPTY_DASHBOARD,
  type Appointment,
  type DashboardData,
  type DocumentRecord,
  type ExpertProfile,
  type PortalRole,
  type Profile,
  type Referral,
  type ReportRecord,
} from '../lib/types';
import { resolvePortalRole } from '../lib/utils';

type AuthState = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  role: PortalRole | null;
  dashboardData: DashboardData;
  authLoading: boolean;
  dataLoading: boolean;
  error: string;
  notice: string;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
  setError: (message: string) => void;
  setNotice: (message: string) => void;
};

const ALLOWED_PORTAL_ROLES: PortalRole[] = ['referring_attorney', 'medical_expert'];
const PUBLIC_PROFILE_COLUMNS =
  'id,email,first_name,last_name,role,user_type,position,attorney_id,expert_id';

const scopedOr = (filters: Array<[string, string | null | undefined]>) =>
  filters
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => `${key}.eq.${value}`)
    .join(',');

async function loadDashboardData(profile: Profile, role: PortalRole): Promise<DashboardData> {
  const nextData: DashboardData = { ...EMPTY_DASHBOARD };

  if (role === 'referring_attorney') {
    const attorneyId = profile.attorney_id ?? profile.id;
    const referralScope = scopedOr([
      ['requested_by', profile.id],
      ['attorney_id', attorneyId],
      ['referring_attorney_id', attorneyId],
    ]);

    const [referrals, appointments, documents] = await Promise.all([
      supabase
        .from('appointment_requests')
        .select('id,claimant_first_name,claimant_last_name,matter_type,expert_type,province,status,created_at')
        .or(referralScope || `requested_by.eq.${profile.id}`)
        .order('created_at', { ascending: false })
        .limit(50),
      supabase
        .from('appointments')
        .select('id,claimant_name,appointment_date,appointment_time,status,case_status,expert_name,attorney_name,attorney_id,referring_attorney_id')
        .or(`attorney_id.eq.${attorneyId},referring_attorney_id.eq.${attorneyId}`)
        .order('appointment_date', { ascending: true, nullsFirst: false })
        .limit(50),
      supabase
        .from('documents')
        .select('id,title,file_name,document_type,created_at,status,appointment_id')
        .or(`uploaded_by.eq.${profile.id},attorney_id.eq.${attorneyId},referring_attorney_id.eq.${attorneyId}`)
        .order('created_at', { ascending: false })
        .limit(50),
    ]);

    nextData.referrals = (referrals.data ?? []) as Referral[];
    nextData.appointments = (appointments.data ?? []) as Appointment[];
    nextData.documents = (documents.data ?? []) as DocumentRecord[];
  }

  if (role === 'medical_expert') {
    const expertId = profile.expert_id ?? profile.id;
    const [appointments, reports, documents, expertProfile] = await Promise.all([
      supabase
        .from('appointments')
        .select('id,claimant_name,appointment_date,appointment_time,status,case_status,expert_name,attorney_name,expert_id')
        .eq('expert_id', expertId)
        .order('appointment_date', { ascending: true, nullsFirst: false })
        .limit(50),
      supabase
        .from('expert_reports')
        .select('id,claimant_name,report_type,report_status,report_due_date,due_date,status,created_at')
        .eq('expert_id', expertId)
        .order('created_at', { ascending: false })
        .limit(50),
      supabase
        .from('documents')
        .select('id,title,file_name,document_type,created_at,status,appointment_id')
        .eq('expert_id', expertId)
        .order('created_at', { ascending: false })
        .limit(50),
      supabase
        .from('medical_experts')
        .select('id,full_name,first_name,last_name,email,contact_number,practice_address,province,qualifications,availability_notes,practice_company_name,personal_assistant_name,personal_assistant_contact')
        .eq('id', expertId)
        .maybeSingle(),
    ]);

    nextData.appointments = (appointments.data ?? []) as Appointment[];
    nextData.reports = (reports.data ?? []) as ReportRecord[];
    nextData.documents = (documents.data ?? []) as DocumentRecord[];
    nextData.expertProfile = (expertProfile.data ?? null) as ExpertProfile | null;
  }

  return nextData;
}

export function useAuth(): AuthState {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [role, setRole] = useState<PortalRole | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData>(EMPTY_DASHBOARD);
  const [authLoading, setAuthLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const user = useMemo(() => session?.user ?? null, [session]);

  const clearPrivateState = useCallback(() => {
    setProfile(null);
    setRole(null);
    setDashboardData(EMPTY_DASHBOARD);
  }, []);

  const loadProfileAndDashboard = useCallback(async (currentUser: User) => {
    setDataLoading(true);
    setError('');

    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select(PUBLIC_PROFILE_COLUMNS)
      .eq('id', currentUser.id)
      .single();

    if (profileError || !profileData) {
      clearPrivateState();
      await supabase.auth.signOut();
      setError('We could not verify your public portal profile. Please contact Kutlwano & Associate support.');
      setDataLoading(false);
      return;
    }

    const nextProfile = profileData as Profile;
    const nextRole = resolvePortalRole(nextProfile);
    if (!nextRole || !ALLOWED_PORTAL_ROLES.includes(nextRole)) {
      clearPrivateState();
      await supabase.auth.signOut();
      setError('This public portal is only for external attorneys/lawyers and medical experts/doctors. Internal staff must use the internal system.');
      setDataLoading(false);
      return;
    }

    setProfile(nextProfile);
    setRole(nextRole);
    setDashboardData(await loadDashboardData(nextProfile, nextRole));
    setDataLoading(false);
  }, [clearPrivateState]);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setAuthLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (!nextSession) clearPrivateState();
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [clearPrivateState]);

  useEffect(() => {
    if (user) void loadProfileAndDashboard(user);
  }, [loadProfileAndDashboard, user]);

  const refresh = useCallback(async () => {
    if (!user) return;
    await loadProfileAndDashboard(user);
    setNotice('Dashboard refreshed from the secure K&A system.');
  }, [loadProfileAndDashboard, user]);

  const signIn = useCallback(async (email: string, password: string) => {
    setAuthLoading(true);
    setError('');
    setNotice('');

    const normalizedEmail = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail) || password.length < 6) {
      setError('Enter a valid email address and password.');
      setAuthLoading(false);
      return false;
    }

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

    if (signInError || !data.session) {
      setError(signInError?.message ?? 'Sign-in failed. Please try again.');
      setAuthLoading(false);
      return false;
    }

    setSession(data.session);
    setNotice('Signed in successfully. Loading your secure dashboard…');
    setAuthLoading(false);
    return true;
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
    clearPrivateState();
    setNotice('Signed out successfully.');
  }, [clearPrivateState]);

  return {
    session,
    user,
    profile,
    role,
    dashboardData,
    authLoading,
    dataLoading,
    error,
    notice,
    signIn,
    signOut,
    refresh,
    setError,
    setNotice,
  };
}
