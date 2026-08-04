import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser Supabase client (singleton).
 *
 * Reads the public project credentials from the environment. Until they are
 * set the client is `null` and the app degrades gracefully — every call site
 * guards on `isSupabaseConfigured()`. Once the URL and anon key are added,
 * the entire auth flow works with no further code changes.
 *
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

let cached: SupabaseClient | null = null;

/** The shared browser client, or `null` when credentials are absent. */
export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (cached) return cached;
  cached = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      // Keep users signed in across reloads and refresh tokens automatically.
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "apcom.auth",
      flowType: "pkce",
    },
  });
  return cached;
}
