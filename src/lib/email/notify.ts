import "server-only";
import { serverEnv } from "../env";
import { sendEmail } from "./resend";
import {
  adminTemplate,
  customerTemplate,
  type EmailKind,
  type EmailPayload,
} from "./templates";

/**
 * Send the admin notification and the customer acknowledgement for a flow.
 * Best-effort: both are attempted independently and errors are swallowed so a
 * failed email can never break the surrounding request or the DB write.
 */
export async function sendTransactional(
  kind: EmailKind,
  payload: EmailPayload
): Promise<{ admin: boolean; customer: boolean }> {
  const admin = adminTemplate(kind, payload);
  const customer = customerTemplate(kind, payload);

  const [a, c] = await Promise.allSettled([
    sendEmail({
      to: serverEnv.notifyAdminEmail,
      subject: admin.subject,
      html: admin.html,
      replyTo: payload.email,
    }),
    payload.email
      ? sendEmail({ to: payload.email, subject: customer.subject, html: customer.html })
      : Promise.resolve({ ok: false, skipped: true }),
  ]);

  return {
    admin: a.status === "fulfilled" && a.value.ok,
    customer: c.status === "fulfilled" && c.value.ok,
  };
}
