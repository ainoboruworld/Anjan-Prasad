/**
 * Client-side trigger for transactional email.
 *
 * Call this AFTER a successful Supabase write. It POSTs to `/api/emails`
 * (which holds the Resend secret) and never throws — if the request fails,
 * the surrounding flow (which already persisted the data) is unaffected.
 */
export type EmailKind =
  | "contact"
  | "consultation"
  | "demo"
  | "advisory"
  | "newsletter";

export interface EmailPayload {
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  plan?: string;
  details?: Record<string, string>;
}

export async function notifyEmail(
  kind: EmailKind,
  payload: EmailPayload
): Promise<void> {
  try {
    await fetch("/api/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, payload }),
      keepalive: true,
    });
  } catch {
    // Best-effort only — the data is already saved in Supabase.
  }
}
