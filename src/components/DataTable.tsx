import React from 'react';
import { Inbox } from 'lucide-react';

type Row = { key: string; cells: React.ReactNode[] };

type DataTableProps = {
  headers: string[];
  rows: Row[];
  empty: string;
};

export function DataTable({ headers, rows, empty }: DataTableProps) {
  if (!rows.length) {
    return (
      <div className="empty-state">
        <Inbox size={28} />
        {empty}
      </div>
    );
  }
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            {headers.map((h) => <th key={h}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key}>
              {row.cells.map((cell, i) => (
                <td key={`${row.key}-${i}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
