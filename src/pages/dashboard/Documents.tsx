import { FileText, UploadCloud } from 'lucide-react';
import { SimpleList } from '../../components/SimpleList';
import { firstValue, dateLabel } from '../../lib/utils';
import type { DashboardData } from '../../lib/types';

export function Documents({ data }: { data: DashboardData }) {
  return (
    <div className="content-grid">
      <div className="panel">
        <div className="panel-header">
          <h2>Synced documents</h2>
          <span className="badge-count">{data.documents.length}</span>
        </div>
        <p className="panel-sub">
          Documents visible to your role. Upload workflows use approved Supabase storage buckets governed by RLS.
        </p>
        <SimpleList
          empty="No documents available for your account."
          items={data.documents.map((d) => ({
            id: d.id,
            icon: <FileText size={18} />,
            title: firstValue(d.title, d.file_name),
            subtitle: `${firstValue(d.document_type)} · ${dateLabel(d.created_at)}`,
            meta: firstValue(d.status, 'Synced'),
          }))}
        />
      </div>

      {/* Upload placeholder */}
      <div className="panel" style={{ borderStyle: 'dashed' }}>
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted)' }}>
          <UploadCloud size={32} style={{ margin: '0 auto 1rem', color: 'var(--border)' }} />
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '.5rem', color: 'var(--text)' }}>
            Document upload
          </h3>
          <p style={{ fontSize: '.9rem', lineHeight: 1.6 }}>
            Document upload is handled by your Kutlwano coordinator through the internal system.
            Contact support if you need to submit additional evidence or files.
          </p>
        </div>
      </div>
    </div>
  );
}
