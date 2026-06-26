import { createClient } from '@supabase/supabase-js';

// ─── IMPORTANT ────────────────────────────────────────────────────────────────
// This portal shares the SAME Supabase project as the internal K&A system.
// ONLY the publishable anon key is used here — NEVER the service-role key.
// All data access is enforced by Row Level Security on the database side.
// ──────────────────────────────────────────────────────────────────────────────

const SUPABASE_URL =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
  'https://zybkhhxvsdjkluqydcbb.supabase.co';

const SUPABASE_ANON_KEY =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5YmtoaHh2c2Rqa2x1cXlkY2JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MzYzNzgsImV4cCI6MjA3MDUxMjM3OH0.63RLvxgywnkjnqHzr9OLNxB_6wVpOBtcGlQZvJR_HyQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'ka-portal-auth',
  },
  global: {
    headers: { 'x-application-name': 'kutlwano-public-professional-portal' },
  },
});
