import React, { useState } from 'react';
import {
  Briefcase, DatabaseZap, Download, FileText,
  HelpCircle, Home, LockKeyhole, LogOut, Menu, ShieldCheck,
  Stethoscope, User, X, BookOpen
} from 'lucide-react';
import type { PublicPage, DashboardTab, PortalRole } from '../lib/types';
import { usePWAInstall } from '../hooks/usePWAInstall';

type TopbarProps = {
  isAuthenticated: boolean;
  role: PortalRole | null;
  displayName: string;
  activePage: PublicPage;
  activeTab: DashboardTab;
  setActivePage: (p: PublicPage) => void;
  setActiveTab: (t: DashboardTab) => void;
  onSignOut: () => void;
};

const PUBLIC_PAGES: Array<{ id: PublicPage; label: string; icon: React.ReactNode }> = [
  { id: 'home',     label: 'Home',            icon: <Home size={15} /> },
  { id: 'services', label: 'Services',         icon: <BookOpen size={15} /> },
  { id: 'security', label: 'Security',         icon: <ShieldCheck size={15} /> },
  { id: 'privacy',  label: 'Privacy',          icon: <LockKeyhole size={15} /> },
  { id: 'install',  label: 'Install app',      icon: <Download size={15} /> },
  { id: 'support',  label: 'Support',          icon: <HelpCircle size={15} /> },
];

const DASH_TABS: Array<{ id: DashboardTab; label: string; icon: React.ReactNode }> = [
  { id: 'overview',   label: 'Overview',   icon: <Home size={15} /> },
  { id: 'cases',      label: 'Cases',      icon: <Briefcase size={15} /> },
  { id: 'documents',  label: 'Documents',  icon: <FileText size={15} /> },
  { id: 'profile',    label: 'Profile',    icon: <User size={15} /> },
  { id: 'support',    label: 'Support',    icon: <HelpCircle size={15} /> },
];

export function Topbar({
  isAuthenticated, role, displayName,
  activePage, activeTab,
  setActivePage, setActiveTab, onSignOut
}: TopbarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { canInstall, install, isInstalling } = usePWAInstall();

  const navItems = isAuthenticated ? DASH_TABS : PUBLIC_PAGES;
  const isActive = (id: string) =>
    isAuthenticated ? activeTab === id : activePage === id;

  const handleNav = (id: string) => {
    if (isAuthenticated) setActiveTab(id as DashboardTab);
    else setActivePage(id as PublicPage);
    setDrawerOpen(false);
  };

  return (
    <>
      {/* Install banner */}
      {canInstall && (
        <div className="install-banner">
          <div className="install-banner-text">
            <Download size={18} />
            <span><strong>Install the K&A Portal</strong> — access your dashboard faster, even offline.</span>
          </div>
          <button className="install-btn" onClick={install} disabled={isInstalling}>
            <Download size={15} />
            {isInstalling ? 'Installing…' : 'Install app'}
          </button>
        </div>
      )}

      <header className="topbar">
        {/* Brand */}
        <button className="brand-btn" onClick={() => handleNav('home')} aria-label="Home">
          <div className="brand-mark">K&A</div>
          <div>
            <span className="brand-name">Kutlwano & Associate</span>
            <span className="brand-sub">Professional Portal</span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="topnav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`topnav-btn ${isActive(item.id) ? 'active' : ''}`}
              onClick={() => handleNav(item.id)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="topbar-right">
          <div className="status-pill">
            <div className="pulse-dot" />
            <DatabaseZap size={14} />
            <span className="status-text">Live sync</span>
          </div>

          {isAuthenticated && (
            <>
              <span style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.6)', display:'flex', alignItems:'center', gap: '.4rem' }}>
                {role === 'medical_expert' ? <Stethoscope size={14} /> : <Briefcase size={14} />}
                <span style={{ color: 'rgba(255,255,255,.8)' }}>{displayName}</span>
              </span>
              <button className="icon-btn" onClick={onSignOut}>
                <LogOut size={15} /> Sign out
              </button>
            </>
          )}

          <button
            className="hamburger-btn"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="mobile-drawer" style={{ display: 'block' }}>
          <div className="drawer-backdrop" onClick={() => setDrawerOpen(false)} />
          <div className="drawer-panel">
            <div className="drawer-header">
              <div style={{ display:'flex', alignItems:'center', gap:'.6rem' }}>
                <div className="brand-mark" style={{ width:'2rem', height:'2rem', fontSize:'.7rem' }}>K&A</div>
                <span style={{ color:'white', fontWeight:700, fontSize:'.9rem' }}>Portal</span>
              </div>
              <button onClick={() => setDrawerOpen(false)} style={{ color:'rgba(255,255,255,.6)' }} aria-label="Close menu">
                <X size={20} />
              </button>
            </div>

            {navItems.map((item) => (
              <button
                key={item.id}
                className={`drawer-nav-btn ${isActive(item.id) ? 'active' : ''}`}
                onClick={() => handleNav(item.id)}
              >
                {item.icon}
                {item.label}
              </button>
            ))}

            {isAuthenticated && (
              <>
                <div style={{ height:'1px', background:'rgba(255,255,255,.1)', margin:'.5rem 0' }} />
                <button className="drawer-nav-btn" onClick={() => { onSignOut(); setDrawerOpen(false); }}>
                  <LogOut size={15} /> Sign out
                </button>
              </>
            )}

            {canInstall && (
              <button className="install-btn" style={{ marginTop:'auto' }} onClick={install} disabled={isInstalling}>
                <Download size={15} />
                {isInstalling ? 'Installing…' : 'Install app'}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
