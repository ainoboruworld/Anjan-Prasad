/**
 * Newsletter subscriptions — stored in Supabase.
 *
 * When Supabase env is configured, subscriptions are inserted into the
 * `newsletter_subscriptions` table via the REST API (no SDK). Otherwise the
 * submission falls back to the shared forms layer so no signup is lost before
 * the backend is connected. The UI (footer Newsletter) calls this only.
 *
 * Configure with:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 *
 * Table (see docs/newsletter-supabase.md):
 *   create table newsletter_subscriptions (
 *     id uuid primary key default gen_random_uuid(),
 *     email text not null unique,
 *     name text,
 *     source text,
 *     created_at timestamptz not null default now()
 *   );
 */

import { submitForm } from "./forms";
import { env, flags } from "./env";

const SUPABASE_URL = env.supabase.url;
const SUPABASE_ANON_KEY = env.supabase.anonKey;

export function isSupabaseConfigured(): boolean {
  return flags.supabase;
}

export type SubscribeResult = { ok: boolean };

export async function subscribeNewsletter(input: {
  email: string;
  name?: string;
}): Promise<SubscribeResult> {
  const source =
    typeof window !== "undefined" ? window.location.pathname : "server";

  if (isSupabaseConfigured()) {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/newsletter_subscriptions`,
        {
          method: "POST",
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json",
            // Upsert on the unique email so re-subscribing is idempotent.
            Prefer: "resolution=merge-duplicates,return=minimal",
          },
          body: JSON.stringify({
            email: input.email,
            name: input.name ?? null,
            source,
          }),
        }
      );
      if (res.ok) return { ok: true };
    } catch {
      // fall through to the forms-layer fallback below
    }
  }

  // Frontend-complete fallback so subscriptions are never dropped.
  const r = await submitForm({
    formType: "Newsletter",
    name: input.name,
    email: input.email,
  });
  return { ok: r.ok };
}
