import type { Profile } from './types';
import type { User } from '@supabase/supabase-js';
import type { PortalRole } from './types';

export const clean = (value: string) =>
  value.replace(/[<>]/g, '').trim().slice(0, 500);

export const firstValue = (...values: Array<string | null | undefined>) =>
  values.find((v) => v && String(v).trim()) ?? 'Not provided';

export const dateLabel = (value?: string | null) =>
  value
    ? new Date(value).toLocaleDateString('en-ZA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Not scheduled';

export const formatName = (profile: Profile | null, user: User | null) =>
  [profile?.first_name, profile?.last_name]
    .filter(Boolean)
    .join(' ')
    .trim() ||
  user?.email?.split('@')[0] ||
  'Professional';

export const resolvePortalRole = (profile: Profile | null): PortalRole | null => {
  const values = [profile?.user_type, profile?.role, profile?.position]
    .filter(Boolean)
    .map((v) => String(v).toLowerCase());
  if (
    values.some(
      (v) =>
        v.includes('referring_attorney') ||
        v.includes('attorney') ||
        v.includes('lawyer')
    )
  )
    return 'referring_attorney';
  if (
    values.some(
      (v) =>
        v.includes('medical_expert') ||
        v.includes('expert') ||
        v.includes('doctor')
    )
  )
    return 'medical_expert';
  return null;
};

export const statusClass = (status?: string | null) => {
  const s = (status ?? '').toLowerCase();
  if (s.includes('complete') || s.includes('approved') || s.includes('submitted'))
    return 'pill pill-green';
  if (s.includes('pending') || s.includes('draft') || s.includes('progress'))
    return 'pill pill-amber';
  if (s.includes('overdue') || s.includes('reject') || s.includes('cancel'))
    return 'pill pill-red';
  return 'pill pill-blue';
};
