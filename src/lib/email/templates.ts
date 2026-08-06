import "server-only";

/**
 * Reusable transactional email templates.
 *
 * One branded shell (`layout`) wraps every message so admin and customer
 * emails stay consistent. Builders return `{ subject, html }` and are pure —
 * no I/O — so they're easy to test and reuse.
 */

const BRAND = "#0f3d5e";
const ACCENT = "#2f6fed";
const MUTED = "#5b6b7a";

function esc(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function layout(opts: { heading: string; intro: string; rows?: [string, string][]; footNote?: string }): string {
  const rows = (opts.rows ?? [])
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr>
           <td style="padding:8px 0;color:${MUTED};font-size:13px;width:170px;vertical-align:top">${esc(k)}</td>
           <td style="padding:8px 0;color:#0f2233;font-size:14px;line-height:1.6">${esc(v)}</td>
         </tr>`
    )
    .join("");

  return `<!doctype html>
<html><body style="margin:0;background:#f5f7fa;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fa;padding:32px 16px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid rgba(15,61,94,0.08)">
        <tr><td style="background:${BRAND};padding:22px 32px">
          <span style="color:#fff;font-size:18px;font-weight:700;letter-spacing:-0.02em">Anjan</span><span style="color:#4fa9ff;font-size:18px;font-weight:700;letter-spacing:-0.02em">Prasad</span>
        </td></tr>
        <tr><td style="padding:32px">
          <h1 style="margin:0 0 12px;color:${BRAND};font-size:20px;line-height:1.3">${esc(opts.heading)}</h1>
          <p style="margin:0 0 20px;color:#0f2233;font-size:15px;line-height:1.7">${opts.intro}</p>
          ${rows ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(15,61,94,0.08)">${rows}</table>` : ""}
          ${opts.footNote ? `<p style="margin:22px 0 0;color:${MUTED};font-size:13px;line-height:1.6">${opts.footNote}</p>` : ""}
        </td></tr>
        <tr><td style="padding:18px 32px;border-top:1px solid rgba(15,61,94,0.08);color:${MUTED};font-size:12px">
          <a href="https://ap.com" style="color:${ACCENT};text-decoration:none">ap.com</a> · India's Business Growth Ecosystem
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

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
  /** Human label of the plan/tier where relevant. */
  plan?: string;
  /** Any additional key/value details to show in the admin email. */
  details?: Record<string, string>;
}

const LABELS: Record<Exclude<EmailKind, "newsletter">, string> = {
  contact: "message",
  consultation: "consultation request",
  demo: "Demo Session booking",
  advisory: "Business Advisory enquiry",
};

/** Build the internal (admin) notification. */
export function adminTemplate(kind: EmailKind, p: EmailPayload) {
  if (kind === "newsletter") {
    return {
      subject: `New newsletter subscriber: ${p.email}`,
      html: layout({
        heading: "New newsletter subscriber",
        intro: "Someone just subscribed to the newsletter.",
        rows: [
          ["Name", p.name ?? ""],
          ["Email", p.email],
        ],
      }),
    };
  }
  const label = LABELS[kind];
  const rows: [string, string][] = [
    ["Name", p.name ?? ""],
    ["Email", p.email],
    ["Phone", p.phone ?? ""],
    ["Company", p.company ?? ""],
    ["Plan", p.plan ?? ""],
    ...Object.entries(p.details ?? {}),
  ];
  return {
    subject: `New ${label}: ${p.name ?? p.email}`,
    html: layout({
      heading: `New ${label}`,
      intro: `A new ${label} just came in through the website.`,
      rows,
    }),
  };
}

/** Build the customer-facing acknowledgement. */
export function customerTemplate(kind: EmailKind, p: EmailPayload) {
  const first = (p.name ?? "there").split(" ")[0];
  const common = { footNote: "If you didn't request this, you can ignore this email." };
  switch (kind) {
    case "newsletter":
      return {
        subject: "You're on the list",
        html: layout({
          heading: `Welcome, ${first}`,
          intro:
            "Thanks for subscribing. You'll get occasional, high-signal notes on building businesses that outlast their founders — no noise.",
          ...common,
        }),
      };
    case "contact":
      return {
        subject: "We received your message",
        html: layout({
          heading: `Thanks, ${first}`,
          intro:
            "We've received your message and will get back to you personally, usually within one business day.",
          ...common,
        }),
      };
    case "consultation":
      return {
        subject: "Your consultation request is in",
        html: layout({
          heading: `Thanks, ${first}`,
          intro:
            "Your consultation request has been received. We'll confirm your session and next steps by email shortly.",
          rows: [["Plan", p.plan ?? "Consultation"]],
          ...common,
        }),
      };
    case "demo":
      return {
        subject: "Your Demo Session booking",
        html: layout({
          heading: `Thanks, ${first}`,
          intro:
            "Your ₹99 Business Growth Demo booking is in. We'll email your session details and joining link shortly.",
          ...common,
        }),
      };
    case "advisory":
      return {
        subject: "Your Business Advisory enquiry",
        html: layout({
          heading: `Thanks, ${first}`,
          intro:
            "Your Business Advisory enquiry has been received. We'll review your context and reach out to arrange the next step.",
          ...common,
        }),
      };
  }
}
