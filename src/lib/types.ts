export type PortalRole = 'referring_attorney' | 'medical_expert';
export type PublicPage = 'home' | 'services' | 'security' | 'privacy' | 'install' | 'support';
export type DashboardTab = 'overview' | 'cases' | 'documents' | 'profile' | 'support';

export type Profile = {
  id: string;
  email?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  role?: string | null;
  user_type?: string | null;
  position?: string | null;
  attorney_id?: string | null;
  expert_id?: string | null;
};

export type Referral = {
  id: string;
  claimant_first_name?: string | null;
  claimant_last_name?: string | null;
  matter_type?: string | null;
  expert_type?: string | null;
  province?: string | null;
  status?: string | null;
  created_at?: string | null;
};

export type Appointment = {
  id: string;
  claimant_name?: string | null;
  appointment_date?: string | null;
  appointment_time?: string | null;
  status?: string | null;
  expert_name?: string | null;
  attorney_name?: string | null;
  case_status?: string | null;
  expert_id?: string | null;
  attorney_id?: string | null;
  referring_attorney_id?: string | null;
};

export type DocumentRecord = {
  id: string;
  title?: string | null;
  file_name?: string | null;
  document_type?: string | null;
  created_at?: string | null;
  status?: string | null;
  appointment_id?: string | null;
};

export type ReportRecord = {
  id: string;
  claimant_name?: string | null;
  report_type?: string | null;
  report_status?: string | null;
  status?: string | null;
  report_due_date?: string | null;
  due_date?: string | null;
  created_at?: string | null;
};

export type ExpertProfile = {
  id: string;
  full_name?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  contact_number?: string | null;
  practice_address?: string | null;
  province?: string | null;
  qualifications?: string | null;
  availability_notes?: string | null;
  practice_company_name?: string | null;
  personal_assistant_name?: string | null;
  personal_assistant_contact?: string | null;
};

export type DashboardData = {
  referrals: Referral[];
  appointments: Appointment[];
  documents: DocumentRecord[];
  reports: ReportRecord[];
  expertProfile: ExpertProfile | null;
};

export const EMPTY_DASHBOARD: DashboardData = {
  referrals: [],
  appointments: [],
  documents: [],
  reports: [],
  expertProfile: null,
};
