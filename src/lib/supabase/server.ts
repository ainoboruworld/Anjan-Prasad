import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env, serverEnv } from "../env";
import type { Database } from "./database.types";

/**
 * Server-side Supabase clients — for route handlers, server actions and
 * webhooks only. Never import this from a Client Component.
 *
 * - `getServiceSupabase()` uses the service-role key and BYPASSES RLS. Use it
 *   only for trusted server operations (e.g. reconciling a payment webhook,
 *   writing a booking after server-side price validation). Never expose its
 *   results directly to an untrusted caller without your own checks.
 * - `getAnonServerSupabase()` uses the anon key and RESPECTS RLS — a safe
 *   default for server reads that should follow the same rules as the client.
 */

let serviceCached: SupabaseClient<Database> | null = null;

export function isServiceConfigured(): boolean {
  return Boolean(env.supabase.url && serverEnv.supabaseServiceRole);
}

export function getServiceSupabase(): SupabaseClient<Database> | null {
  if (!isServiceConfigured()) return null;
  if (serviceCached) return serviceCached;
  serviceCached = createClient<Database>(
    env.supabase.url,
    serverEnv.supabaseServiceRole,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
  return serviceCached;
}

export function getAnonServerSupabase(): SupabaseClient<Database> | null {
  if (!env.supabase.url || !env.supabase.anonKey) return null;
  return createClient<Database>(env.supabase.url, env.supabase.anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
