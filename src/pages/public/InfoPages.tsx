import React from 'react';
import {
  BookOpen, CheckCircle2, Download, HelpCircle, Laptop,
  LockKeyhole, ShieldCheck, Smartphone
} from 'lucide-react';

type InfoPageProps = {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  points: string[];
  extra?: React.ReactNode;
};

function InfoPage({ icon, eyebrow, title, points, extra }: InfoPageProps) {
  return (
    <section className="info-section hero-section">
      <div className="eyebrow">{icon} {eyebrow}</div>
      <h1 className="info-title">{title}</h1>
      <div className="info-list">
        {points.map((p) => (
          <div key={p} className="info-item">
            <CheckCircle2 size={17} />
            <span>{p}</span>
          </div>
        ))}
      </div>
      {extra}
    </section>
  );
}

export function ServicesPage() {
  return (
    <InfoPage
      icon={<BookOpen size={13} />}
      eyebrow="What we expose"
      title="Portal services"
      points={[
        "Attorney referral intake and appointment-request visibility — same pipeline as internal.",
        "Medical expert case allocation tracking and report-status monitoring.",
        "Document and evidence visibility, scoped to your role by Supabase RLS.",
        "Practice and contact profile updates for doctors, synced immediately to the internal system.",
        "Support escalation path without exposing any internal admin modules.",
        "Installable as a Progressive Web App on mobile and desktop for faster access.",
      ]}
    />
  );
}

export function SecurityPage() {
  return (
    <InfoPage
      icon={<ShieldCheck size={13} />}
      eyebrow="How we protect your data"
      title="Security model"
      points={[
        "Connects to the K&A Supabase project using the publishable anon key only — no service-role secrets in the browser.",
        "Every database query is filtered by your attorney_id or expert_id, enforced by Row Level Security.",
        "Internal staff, administrators, and sales roles are blocked at sign-in — they must use the internal system.",
        "Input is sanitised, length-limited, and rendered through React's escaping to prevent injection.",
        "Sessions are scoped to this portal and never share tokens with the internal application.",
        "Transport is HTTPS. Do not use this portal on untrusted or shared public networks without a VPN.",
      ]}
    />
  );
}

export function PrivacyPage() {
  return (
    <InfoPage
      icon={<LockKeyhole size={13} />}
      eyebrow="Your data obligations"
      title="Privacy notice"
      points={[
        "Only authorised attorney and medical expert accounts may sign in. Do not share credentials.",
        "All patient, claimant, legal, and medical information accessed here is strictly confidential.",
        "Sign out after every session, especially on shared or public devices.",
        "Report any suspected unauthorised access immediately to your Kutlwano coordinator.",
        "Data is stored in the shared Supabase backend governed by Kutlwano & Associate's data policies.",
        "This portal does not store or cache confidential case data offline on your device.",
      ]}
    />
  );
}

export function InstallPage() {
  return (
    <InfoPage
      icon={<Download size={13} />}
      eyebrow="Offline-ready web app"
      title="Install the portal"
      points={[
        "The portal is a Progressive Web App (PWA) — install it like a native app with one tap.",
        "Installed app shell loads instantly; live case data always fetches from Supabase when you're online.",
        "Confidential case data is never cached offline — only the UI shell and fonts are stored locally.",
        "Your browser shows an install prompt automatically when the conditions are met.",
        "On iOS Safari: tap Share → Add to Home Screen. On Android Chrome: tap the install icon in the address bar.",
        "On desktop Chrome or Edge: click the install icon in the address bar or use the browser menu.",
      ]}
      extra={
        <div className="device-grid" style={{ marginTop: '1.5rem' }}>
          <div className="device-card">
            <div className="device-card-icon"><Smartphone size={18} /></div>
            <h3>Mobile (iOS & Android)</h3>
            <p>Open in your mobile browser, follow the Add to Home Screen or install prompt, then sign in when you have connectivity.</p>
          </div>
          <div className="device-card">
            <div className="device-card-icon"><Laptop size={18} /></div>
            <h3>Desktop (Chrome / Edge)</h3>
            <p>Click the install icon in the address bar or open the browser menu and choose "Install Professional Portal". Pin it to your taskbar.</p>
          </div>
        </div>
      }
    />
  );
}

export function SupportPage() {
  return (
    <InfoPage
      icon={<HelpCircle size={13} />}
      eyebrow="Getting help"
      title="Support"
      points={[
        "Always use the Refresh button inside your dashboard before reporting a missing matter or appointment.",
        "For login issues, contact your Kutlwano & Associate internal coordinator — not email support.",
        "For missing appointments, reports, or referrals, provide your account email and the claimant reference number.",
        "Never send passwords, service-role keys, or patient medical files through email or WhatsApp.",
        "If you believe your account has been compromised, contact support immediately and change your password.",
      ]}
    />
  );
}
