import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

type AlertProps = {
  kind: 'error' | 'success' | 'info';
  text: string;
};

export function Alert({ kind, text }: AlertProps) {
  const Icon = kind === 'success' ? CheckCircle2 : kind === 'info' ? Info : AlertCircle;
  return (
    <div className={`alert alert-${kind}`} role={kind === 'error' ? 'alert' : 'status'}>
      <Icon size={17} />
      <span>{text}</span>
    </div>
  );
}
