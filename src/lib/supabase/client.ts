import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env, flags } from "../env";

/**
 * Browser Supabase client (singleton).
 *
 * Reads the public project credentials from `src/lib/env.ts`. Until they are
 * set the client is `null` and the app degrades gracefully — every call site
 * guards on `isSupabaseConfigured()`. Once the URL and anon key are added,
 * the entire auth flow works with no further code changes.
 */
const SUPABASE_URL = env.supabase.url;
const SUPABASE_ANON_KEY = env.supabase.anonKey;

export function isSupabaseConfigured(): boolean {
  return flags.supabase;
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
