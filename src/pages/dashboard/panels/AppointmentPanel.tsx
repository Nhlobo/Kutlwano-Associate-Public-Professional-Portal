import { DataTable } from '../../../components/DataTable';
import { firstValue, dateLabel, statusClass } from '../../../lib/utils';
import type { DashboardData } from '../../../lib/types';

export function AppointmentPanel({ data }: { data: DashboardData }) {
  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Appointments & cases</h2>
        <span className="badge-count">{data.appointments.length}</span>
      </div>
      <DataTable
        empty="No appointments available for this account."
        headers={['Claimant', 'Date', 'Time', 'Professional', 'Case status']}
        rows={data.appointments.map((a) => ({
          key: a.id,
          cells: [
            firstValue(a.claimant_name),
            dateLabel(a.appointment_date),
            firstValue(a.appointment_time, '—'),
            firstValue(a.expert_name, a.attorney_name),
            <span className={statusClass(a.status || a.case_status)}>
              {firstValue(a.status, a.case_status)}
            </span>,
          ],
        }))}
      />
    </div>
  );
}
