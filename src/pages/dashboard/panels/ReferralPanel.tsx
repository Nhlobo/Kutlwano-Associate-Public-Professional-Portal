import { DataTable } from '../../../components/DataTable';
import { firstValue, dateLabel, statusClass } from '../../../lib/utils';
import type { DashboardData } from '../../../lib/types';

export function ReferralPanel({ data }: { data: DashboardData }) {
  return (
    <div className="panel">
      <div className="panel-header">
        <h2>My referrals</h2>
        <span className="badge-count">{data.referrals.length}</span>
      </div>
      <p className="panel-sub">
        Live from <code>appointment_requests</code>. The internal appointment team sees this same intake pipeline.
      </p>
      <DataTable
        empty="No referrals found for this account yet."
        headers={['Claimant', 'Matter type', 'Expert type', 'Province', 'Submitted', 'Status']}
        rows={data.referrals.map((r) => ({
          key: r.id,
          cells: [
            `${firstValue(r.claimant_first_name)} ${firstValue(r.claimant_last_name, '')}`.trim(),
            firstValue(r.matter_type),
            firstValue(r.expert_type),
            firstValue(r.province),
            dateLabel(r.created_at),
            <span className={statusClass(r.status)}>{firstValue(r.status, 'Submitted')}</span>,
          ],
        }))}
      />
    </div>
  );
}
