import type { DashboardData, PortalRole } from '../../lib/types';
import { ReferralPanel } from './panels/ReferralPanel';
import { ReportPanel } from './panels/ReportPanel';
import { AppointmentPanel } from './panels/AppointmentPanel';

type CasesProps = { role: PortalRole; data: DashboardData };

export function Cases({ role, data }: CasesProps) {
  return (
    <div className="content-grid">
      {role === 'referring_attorney' && <ReferralPanel data={data} />}
      {role === 'medical_expert' && <ReportPanel data={data} />}
      <AppointmentPanel data={data} />
    </div>
  );
}
