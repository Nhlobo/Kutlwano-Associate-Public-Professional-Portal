import React from 'react';
import { Briefcase, CalendarDays, FileCheck2, FileText, UserCircle } from 'lucide-react';
import type { DashboardData, PortalRole } from '../../lib/types';
import { AppointmentPanel } from './panels/AppointmentPanel';
import { ReferralPanel } from './panels/ReferralPanel';
import { ReportPanel } from './panels/ReportPanel';

type OverviewProps = {
  role: PortalRole;
  data: DashboardData;
};

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

export function Overview({ role, data }: OverviewProps) {
  if (role === 'referring_attorney') {
    return (
      <>
        <div className="stat-grid">
          <StatCard icon={<Briefcase size={20} />} label="Referrals" value={data.referrals.length} />
          <StatCard icon={<CalendarDays size={20} />} label="Appointments" value={data.appointments.length} />
          <StatCard icon={<FileText size={20} />} label="Documents" value={data.documents.length} />
        </div>
        <div className="content-grid">
          <ReferralPanel data={data} />
          <AppointmentPanel data={data} />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="stat-grid">
        <StatCard icon={<CalendarDays size={20} />} label="Appointments" value={data.appointments.length} />
        <StatCard icon={<FileCheck2 size={20} />} label="Reports" value={data.reports.length} />
        <StatCard icon={<UserCircle size={20} />} label="Profile" value={data.expertProfile ? 'Linked' : 'Pending'} />
      </div>
      <div className="content-grid">
        <AppointmentPanel data={data} />
        <ReportPanel data={data} />
      </div>
    </>
  );
}
