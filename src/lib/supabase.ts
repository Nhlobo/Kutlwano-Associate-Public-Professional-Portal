import { createClient } from '@supabase/supabase-js';

// This portal uses the same Supabase project as the internal system.
// Only the publishable anon key is allowed here.
// Access control must be enforced by RLS in Supabase.

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!SUPABASE_URL) {
  throw new Error('Missing VITE_SUPABASE_URL');
}

if (!SUPABASE_ANON_KEY) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'ka-portal-auth',
  },
  global: {
    headers: {
      'x-application-name': 'kutlwano-public-professional-portal',
    },
  },
});
