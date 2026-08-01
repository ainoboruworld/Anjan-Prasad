/**
 * Shared form submission layer.
 *
 * Every form on the site (Contact, Business Advisory, Demo Session,
 * Newsletter) posts through `submitForm`, which sends a normalised payload
 * to a Google Apps Script web app. The script appends the row to the
 * matching tab of one Google Spreadsheet and emails a notification to
 * NOTIFY_EMAIL. See docs/forms-google-sheets.md for the script and setup.
 *
 * When the real backend ships, only `submitForm` changes — no form
 * component needs to be touched.
 */

export type FormType =
  | "Contact"
  | "Business Advisory"
  | "Demo Session"
  | "Monthly Consulting"
  | "Consultation"
  | "Newsletter"
  | "General Enquiries";

export const NOTIFY_EMAIL = "performance@noboruworld.com";

/**
 * Google Apps Script web app URL ("Deploy → Web app → Anyone").
 * Configure via NEXT_PUBLIC_FORMS_ENDPOINT; falls back to the constant
 * below so the URL can also be pasted here directly after deployment.
 */
const FORMS_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMS_ENDPOINT ?? "";

export type FormPayload = {
  formType: FormType;
  /** Core identity fields — mapped to dedicated spreadsheet columns. */
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  /** Everything else the form collected. */
  data?: Record<string, string>;
};

export type SubmitResult = { ok: boolean; queued: boolean };

export async function submitForm(payload: FormPayload): Promise<SubmitResult> {
  const body = JSON.stringify({
    timestamp: new Date().toISOString(),
    sourcePage: typeof window !== "undefined" ? window.location.pathname : "",
    status: "New",
    ...payload,
  });

  if (!FORMS_ENDPOINT) {
    // Frontend-complete mode: no endpoint configured yet. Log so QA can
    // verify payloads, and report the submission as queued.
    console.info("[forms] endpoint not configured — payload:", body);
    return { ok: true, queued: true };
  }

  try {
    // text/plain + no-cors keeps the request preflight-free, which is the
    // supported way to call an Apps Script web app from the browser.
    await fetch(FORMS_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body,
    });
    return { ok: true, queued: false };
  } catch (err) {
    console.error("[forms] submission failed:", err);
    return { ok: false, queued: false };
  }
}

/**
 * Build the checkout URL for the payment placeholder. UPI / gateway
 * integration lands later; until then paid flows submit their lead through
 * `submitForm` and then route the visitor here with an order summary.
 */
export function paymentUrl(params: {
  plan: string;
  amount: string;
  name?: string;
}): string {
  const q = new URLSearchParams({ plan: params.plan, amount: params.amount });
  if (params.name) q.set("name", params.name);
  return `/payment?${q.toString()}`;
}
