/**
 * Centralised environment access — the single place the app reads config.
 *
 * Next.js inlines only `NEXT_PUBLIC_*` variables into the browser bundle, so
 * anything the client needs uses that prefix. (If this app is ever ported to
 * Vite the mapping is 1:1 with the `VITE_*` names in `.env.example`.)
 *
 * SECRETS ARE SERVER-ONLY. The Cashfree secret and the Resend API key must
 * never be exposed to the browser — they carry NO `NEXT_PUBLIC_` prefix and
 * are read only inside server code (route handlers / webhooks). Never
 * hardcode a credential; always read it here.
 */

/* Public (browser-safe) configuration. */
export const env = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  },
  sanity: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  },
  cashfree: {
    appId: process.env.NEXT_PUBLIC_CASHFREE_APP_ID ?? "",
    // "sandbox" | "production"
    mode: process.env.NEXT_PUBLIC_CASHFREE_MODE ?? "sandbox",
  },
  posthog: {
    key: process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "",
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com",
  },
  forms: {
    endpoint: process.env.NEXT_PUBLIC_FORMS_ENDPOINT ?? "",
  },
} as const;

/**
 * Server-only secrets. Importing this from a Client Component throws at build
 * time (the values are simply empty in the browser) — use only in route
 * handlers, server actions, and webhooks.
 */
export const serverEnv = {
  cashfreeSecret: process.env.CASHFREE_SECRET ?? "",
  resendApiKey: process.env.RESEND_API_KEY ?? "",
  supabaseServiceRole: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
} as const;

/** Feature flags derived from configuration — drive graceful degradation. */
export const flags = {
  supabase: Boolean(env.supabase.url && env.supabase.anonKey),
  sanity: Boolean(env.sanity.projectId),
  cashfree: Boolean(env.cashfree.appId),
  posthog: Boolean(env.posthog.key),
  forms: Boolean(env.forms.endpoint),
} as const;
