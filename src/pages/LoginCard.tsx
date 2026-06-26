import React, { useState } from 'react';
import { ArrowRight, Loader2, LockKeyhole, Mail } from 'lucide-react';
import { Alert } from '../components/Alert';

type LoginCardProps = {
  onSignIn: (email: string, password: string) => Promise<boolean>;
  loading: boolean;
  error: string;
  notice: string;
};

export function LoginCard({ onSignIn, loading, error, notice }: LoginCardProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSignIn(email, password);
  };

  return (
    <aside>
      <div className="login-card">
        <div className="login-card-header">
          <div className="login-icon"><LockKeyhole size={20} /></div>
          <div>
            <h2>Professional sign in</h2>
            <p>Attorneys and medical experts only.</p>
          </div>
        </div>

        {error && <Alert kind="error" text={error} />}
        {notice && <Alert kind="success" text={notice} />}

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@lawfirm.co.za"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Your password"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading
              ? <><Loader2 size={18} className="spin" /> Signing in…</>
              : <><ArrowRight size={18} /> Sign in to dashboard</>
            }
          </button>
        </form>

        <div className="divider" style={{ margin: '1.25rem 0 1rem' }} />
        <div className="forgot-link">
          <p>Trouble signing in? Contact your internal Kutlwano coordinator.</p>
        </div>

        {/* Security reassurance */}
        <div style={{ marginTop: '1rem', padding: '.75rem', background: 'rgba(11,27,62,.04)', borderRadius: '.6rem', display:'flex', gap:'.6rem', alignItems:'flex-start' }}>
          <Mail size={15} style={{ color:'#64748B', flexShrink:0, marginTop:'.1rem' }} />
          <p style={{ fontSize:'.78rem', color:'#64748B', lineHeight:1.5, margin:0 }}>
            This portal shares the same secure Supabase backend as the internal system. Your session is isolated by Row Level Security and your role.
          </p>
        </div>
      </div>
    </aside>
  );
}
