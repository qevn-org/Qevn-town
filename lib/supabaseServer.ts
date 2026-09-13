import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _cachedClient: SupabaseClient | null = null;

export function getSupabaseServer(): SupabaseClient | null {
  if (_cachedClient) return _cachedClient;

  const supabaseUrl =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://znancnethpmrdmrucdtw.supabase.co';

  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseKey) {
    return null;
  }

  try {
    _cachedClient = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    return _cachedClient;
  } catch (err) {
    console.error('[SUPABASE] Failed to initialize client:', err);
    return null;
  }
}

// Safe lazy proxy to prevent build-time crashes when env vars are not set during next build
export const supabaseServer = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabaseServer();
    if (!client) {
      return (..._args: unknown[]) => {
        console.warn(`[SUPABASE] Called ${String(prop)} but Supabase keys are not configured.`);
        return {
          insert: async () => ({ error: { message: 'Supabase keys not configured' } }),
          select: async () => ({ data: null, error: { message: 'Supabase keys not configured' } }),
          delete: async () => ({ error: { message: 'Supabase keys not configured' } }),
          update: async () => ({ error: { message: 'Supabase keys not configured' } }),
        };
      };
    }
    const val = (client as unknown as Record<string | symbol, unknown>)[prop];
    return typeof val === 'function' ? (val as (...args: unknown[]) => unknown).bind(client) : val;
  },
});
