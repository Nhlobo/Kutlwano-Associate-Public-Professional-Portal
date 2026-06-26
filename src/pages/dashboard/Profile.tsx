import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, UserCircle } from 'lucide-react';
import type { Profile, PortalRole, ExpertProfile } from '../../lib/types';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';
import { clean, firstValue, formatName } from '../../lib/utils';
import { Alert } from '../../components/Alert';

type ProfilePageProps = {
  role: PortalRole;
  profile: Profile | null;
  user: User | null;
  expertProfile: ExpertProfile | null;
  refresh: () => void;
};

const EXPERT_FIELDS: Array<keyof Omit<ExpertProfile, 'id' | 'full_name' | 'first_name' | 'last_name' | 'email'>> = [
  'contact_number',
  'practice_address',
  'province',
  'qualifications',
  'availability_notes',
  'practice_company_name',
  'personal_assistant_name',
  'personal_assistant_contact',
];

function ExpertProfileEditor({
  expert,
  refresh,
}: {
  expert: ExpertProfile;
  refresh: () => void;
}) {
  const [form, setForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    setForm(
      Object.fromEntries(
        EXPERT_FIELDS.map((k) => [k, (expert as Record<string, unknown>)[k] as string || ''])
      )
    );
  }, [expert.id]);

  const save = async () => {
    setSaving(true);
    setError('');
    setNotice('');
    const payload = Object.fromEntries(
      Object.entries(form).map(([k, v]) => [k, clean(String(v))])
    );
    const { error: dbError } = await supabase
      .from('medical_experts')
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq('id', expert.id);

    if (dbError) setError(dbError.message);
    else {
      setNotice('Profile updated and synced to the internal system.');
      await refresh();
    }
    setSaving(false);
  };

  return (
    <div className="panel">
      <h2>Expert practice profile</h2>
      <p className="panel-sub">
        Update your contact and practice fields here. These sync immediately to the internal K&A system.
        Fee schedules and sensitive edits remain governed by internal approval workflows.
      </p>

      {error && <Alert kind="error" text={error} />}
      {notice && <Alert kind="success" text={notice} />}

      <div className="form-grid">
        {EXPERT_FIELDS.map((key) => (
          <div className="form-field" key={key}>
            <label htmlFor={key}>{key.replace(/_/g, ' ')}</label>
            <textarea
              id={key}
              value={form[key] || ''}
              onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
              maxLength={500}
              rows={key === 'practice_address' || key === 'qualifications' ? 3 : 2}
            />
          </div>
        ))}
      </div>

      <button className="btn-teal" onClick={save} disabled={saving} style={{ marginTop: '.5rem' }}>
        {saving
          ? <><Loader2 size={16} className="spin" /> Saving…</>
          : <><CheckCircle2 size={16} /> Save profile</>
        }
      </button>
    </div>
  );
}

export function ProfilePage({ role, profile, user, expertProfile, refresh }: ProfilePageProps) {
  const displayName = formatName(profile, user);

  if (role === 'medical_expert') {
    if (!expertProfile) {
      return (
        <div className="panel">
          <h2>Expert profile</h2>
          <div className="empty-state">
            <UserCircle size={28} />
            No linked <code>medical_experts</code> record found for your account.
            Contact your Kutlwano coordinator to link your expert profile.
          </div>
        </div>
      );
    }
    return (
      <div className="content-grid">
        {/* Read-only header */}
        <div className="panel">
          <h2>Account info</h2>
          <div className="profile-meta">
            <div className="profile-meta-item">
              <UserCircle size={16} />
              <strong>{firstValue(expertProfile.full_name, displayName)}</strong>
            </div>
            <div className="profile-meta-item">Email: <strong>{firstValue(expertProfile.email, user?.email)}</strong></div>
            <div className="profile-meta-item">Practice: <strong>{firstValue(expertProfile.practice_company_name)}</strong></div>
            <div className="profile-meta-item">Expert ID: <strong>{expertProfile.id}</strong></div>
          </div>
        </div>
        <ExpertProfileEditor expert={expertProfile} refresh={refresh} />
      </div>
    );
  }

  // Attorney profile (read-only — controlled by internal system)
  return (
    <div className="panel">
      <h2>Attorney profile</h2>
      <p className="panel-sub">
        Attorney account details are managed by the internal Kutlwano system.
        Contact your coordinator for any changes.
      </p>
      <div className="profile-meta">
        <div className="profile-meta-item">
          <UserCircle size={16} />
          <strong>{displayName}</strong>
        </div>
        <div className="profile-meta-item">Email: <strong>{firstValue(profile?.email, user?.email)}</strong></div>
        <div className="profile-meta-item">Attorney ID: <strong>{firstValue(profile?.attorney_id, '—')}</strong></div>
        <div className="profile-meta-item">Role: <strong>Referring attorney</strong></div>
      </div>
    </div>
  );
}
