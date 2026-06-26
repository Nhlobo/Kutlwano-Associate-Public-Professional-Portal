import { DataTable } from '../../../components/DataTable';
import { firstValue, dateLabel, statusClass } from '../../../lib/utils';
import type { DashboardData } from '../../../lib/types';

export function ReportPanel({ data }: { data: DashboardData }) {
  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Report tracking</h2>
        <span className="badge-count">{data.reports.length}</span>
      </div>
      <DataTable
        empty="No report records found for this account."
        headers={['Claimant', 'Report type', 'Due date', 'Status']}
        rows={data.reports.map((r) => ({
          key: r.id,
          cells: [
            firstValue(r.claimant_name),
            firstValue(r.report_type),
            dateLabel(r.report_due_date || r.due_date),
            <span className={statusClass(r.report_status || r.status)}>
              {firstValue(r.report_status, r.status, 'In progress')}
            </span>,
          ],
        }))}
      />
    </div>
  );
}
