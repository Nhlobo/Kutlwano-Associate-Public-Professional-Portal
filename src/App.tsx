import { useMemo, useState } from 'react';
import type { PublicPage, DashboardTab } from './lib/types';
import { formatName } from './lib/utils';
import { useAuth } from './hooks/useAuth';
import { Topbar } from './components/Topbar';
import { Footer } from './components/Footer';
import { LoginCard } from './pages/LoginCard';
import { Dashboard } from './pages/dashboard/Dashboard';
import { HomePage } from './pages/public/HomePage';
import { ServicesPage, SecurityPage, PrivacyPage, InstallPage, SupportPage } from './pages/public/InfoPages';

export default function App() {
  const auth = useAuth();
  const [activePage, setActivePage] = useState<PublicPage>('home');
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');

  const displayName = useMemo(
    () => formatName(auth.profile, auth.user),
    [auth.profile, auth.user]
  );

  const handleSignIn = async (email: string, password: string) => {
    return auth.signIn(email, password);
  };

  // Public page map
  const publicPage = {
    home:     <HomePage />,
    services: <ServicesPage />,
    security: <SecurityPage />,
    privacy:  <PrivacyPage />,
    install:  <InstallPage />,
    support:  <SupportPage />,
  }[activePage];

  return (
    <>
      <Topbar
        isAuthenticated={!!auth.user}
        role={auth.role}
        displayName={displayName}
        activePage={activePage}
        activeTab={activeTab}
        setActivePage={(p) => { setActivePage(p); }}
        setActiveTab={(t) => { setActiveTab(t); }}
        onSignOut={auth.signOut}
      />

      {auth.user && auth.role ? (
        <Dashboard
          role={auth.role!}
          data={auth.dashboardData}
          profile={auth.profile}
          user={auth.user}
          displayName={displayName}
          activeTab={activeTab}
          dataLoading={auth.dataLoading}
          error={auth.error}
          notice={auth.notice}
          refresh={auth.refresh}
          setNotice={auth.setNotice}
          setError={auth.setError}
        />
      ) : auth.user ? (
        <main className="dash-wrap">
          <div className="panel">
            <h2>Verifying secure portal access</h2>
            <p className="panel-sub">
              We are checking your account role, external profile link, and Row Level
              Security scope before loading any confidential dashboard data.
            </p>
          </div>
        </main>
      ) : (
        <div className="public-wrap">
          <div>{publicPage}</div>
          <LoginCard
            onSignIn={handleSignIn}
            loading={auth.authLoading}
            error={auth.error}
            notice={auth.notice}
          />
        </div>
      )}

      {!auth.user && (
        <Footer setActivePage={setActivePage} />
      )}
    </>
  );
}
