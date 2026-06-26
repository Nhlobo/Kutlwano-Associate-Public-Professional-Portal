import {
  Briefcase, CheckCircle2, Globe2, LockKeyhole, ShieldCheck, Stethoscope
} from 'lucide-react';

export function HomePage() {
  return (
    <section className="hero-section">
      <div className="eyebrow">
        <LockKeyhole size={13} />
        Secure external access
      </div>

      <h1 className="hero-title">
        Your cases.<br />
        <em>Anywhere you work.</em>
      </h1>

      <p className="hero-subtitle">
        Kutlwano & Associate's public professional portal gives referring attorneys
        and medical experts a focused, secure dashboard — completely separate from
        the internal staff system, but sharing the same live data.
      </p>

      {/* Role cards */}
      <div className="role-grid">
        <div className="role-card">
          <div className="role-card-icon"><Briefcase size={20} /></div>
          <h3>Referring Attorneys</h3>
          <p>
            Submit referrals, track appointment requests, monitor matter status,
            and access documents linked to your cases in real time.
          </p>
        </div>
        <div className="role-card">
          <div className="role-card-icon"><Stethoscope size={20} /></div>
          <h3>Medical Experts</h3>
          <p>
            View assigned appointments, manage your report pipeline, update your
            practice profile, and download relevant case documents.
          </p>
        </div>
      </div>

      {/* Trust strip */}
      <div className="trust-list">
        <div className="trust-item">
          <CheckCircle2 size={17} />
          No disruption to the internal K&A operations workflow.
        </div>
        <div className="trust-item">
          <CheckCircle2 size={17} />
          Same live database — profiles, appointments, reports, and documents stay in sync.
        </div>
        <div className="trust-item">
          <CheckCircle2 size={17} />
          Role gate prevents internal staff from accessing this portal.
        </div>
        <div className="trust-item">
          <ShieldCheck size={17} style={{ color: 'var(--success)' }} />
          All queries are scoped by your attorney or expert ID and enforced by RLS.
        </div>
        <div className="trust-item">
          <Globe2 size={17} style={{ color: 'var(--teal)' }} />
          Install as an app on mobile or desktop for faster access when online.
        </div>
      </div>
    </section>
  );
}
