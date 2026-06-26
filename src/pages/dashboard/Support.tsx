import { Bell, Mail, RefreshCw, ShieldCheck } from 'lucide-react';
import { SimpleList } from '../../components/SimpleList';

export function SupportDash() {
  return (
    <div className="content-grid">
      <div className="panel">
        <h2>Support & escalation</h2>
        <p className="panel-sub">Follow these steps before contacting the internal team.</p>
        <SimpleList
          items={[
            {
              id: '1',
              icon: <RefreshCw size={18} />,
              title: 'Refresh your dashboard first',
              subtitle: 'Use the Refresh button at the top of your dashboard before reporting a missing matter, appointment, or report.',
              meta: 'Step 1',
            },
            {
              id: '2',
              icon: <Mail size={18} />,
              title: 'Contact your coordinator',
              subtitle: 'Send your account email address, the claimant reference number, and a clear description of the issue.',
              meta: 'Step 2',
            },
            {
              id: '3',
              icon: <Bell size={18} />,
              title: 'Allow up to 24 hours',
              subtitle: 'Internal staff process escalations during business hours. Urgent matters should be flagged by phone.',
              meta: 'Step 3',
            },
            {
              id: '4',
              icon: <ShieldCheck size={18} />,
              title: 'Keep data confidential',
              subtitle: 'Never share passwords, session tokens, or patient medical files via email, WhatsApp, or other unsecured channels.',
              meta: 'Always',
            },
          ]}
        />
      </div>

      <div className="panel" style={{ background: 'rgba(11,27,62,.03)' }}>
        <h2>Quick reference</h2>
        <p className="panel-sub">Common questions and answers for portal users.</p>
        <div style={{ display: 'grid', gap: '1rem', marginTop: '.5rem' }}>
          {[
            { q: "My referral isn't showing?", a: "Referrals appear after the internal team processes your submission. Refresh and wait 24h." },
            { q: "My appointment date is wrong?", a: "Contact your Kutlwano coordinator — appointment changes are made in the internal system." },
            { q: "I can't update my profile?", a: "Only medical experts can update practice contact fields. Attorneys must use the internal system." },
            { q: "Report status hasn't changed?", a: "Report statuses update when the internal team marks them. Refresh, then escalate if stale for 48h+." },
          ].map(({ q, a }) => (
            <div key={q} style={{ padding: '.9rem 1rem', borderRadius: '.6rem', border: '1px solid var(--border)', background: 'white' }}>
              <strong style={{ fontSize: '.9rem', display: 'block', marginBottom: '.35rem' }}>{q}</strong>
              <span style={{ fontSize: '.85rem', color: 'var(--muted)', lineHeight: 1.55 }}>{a}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
