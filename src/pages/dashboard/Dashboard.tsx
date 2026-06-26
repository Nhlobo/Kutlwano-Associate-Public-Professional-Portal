import { Briefcase, Loader2, RefreshCw, Stethoscope } from 'lucide-react';
import type { DashboardData, DashboardTab, PortalRole } from '../../lib/types';
import type { Profile } from '../../lib/types';
import type { User } from '@supabase/supabase-js';
import { Alert } from '../../components/Alert';
import { Overview } from './Overview';
import { Cases } from './Cases';
import { Documents } from './Documents';
import { ProfilePage } from './Profile';
import { SupportDash } from './Support';

type DashboardProps = {
  role: PortalRole;
  data: DashboardData;
  profile: Profile | null;
  user: User | null;
  displayName: string;
  activeTab: DashboardTab;
  dataLoading: boolean;
  error: string;
  notice: string;
  refresh: () => void;
  setNotice: (v: string) => void;
  setError: (v: string) => void;
};

export function Dashboard({
  role, data, profile, user, displayName,
  activeTab, dataLoading, error, notice,
  refresh,
}: DashboardProps) {
  return (
    <main className="dash-wrap">
      {/* Hero header */}
      <div className="dash-hero">
        <div className="dash-hero-text">
          <div className="eyebrow">
            {role === 'medical_expert'
              ? <><Stethoscope size={13} /> Medical expert dashboard</>
              : <><Briefcase size={13} /> Referring attorney dashboard</>
            }
          </div>
          <h1>Welcome back, {displayName}</h1>
          <p>
            {role === 'medical_expert'
              ? 'Your assigned cases, appointments, reports, and practice profile — synced live from K&A.'
              : 'Your referrals, appointments, and documents — synced live from the K&A internal system.'
            }
          </p>
        </div>
        <div className="dash-hero-actions">
          <button className="btn-secondary" onClick={refresh} disabled={dataLoading}>
            {dataLoading
              ? <><Loader2 size={16} className="spin" /> Syncing…</>
              : <><RefreshCw size={16} /> Refresh</>
            }
          </button>
        </div>
      </div>

      {/* Alerts */}
      {error && <Alert kind="error" text={error} />}
      {notice && <Alert kind="success" text={notice} />}
      {dataLoading && <Alert kind="info" text="Loading dashboard data from Supabase…" />}

      {/* Tab content */}
      {activeTab === 'overview' && (
        <Overview role={role} data={data} />
      )}
      {activeTab === 'cases' && (
        <Cases role={role} data={data} />
      )}
      {activeTab === 'documents' && (
        <Documents data={data} />
      )}
      {activeTab === 'profile' && (
        <ProfilePage
          role={role}
          profile={profile}
          user={user}
          expertProfile={data.expertProfile}
          refresh={refresh}
        />
      )}
      {activeTab === 'support' && <SupportDash />}
    </main>
  );
}
