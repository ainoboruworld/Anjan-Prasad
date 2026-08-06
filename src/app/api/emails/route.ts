import { NextResponse } from "next/server";
import { z } from "zod";
import { sendTransactional } from "@/lib/email/notify";

/**
 * Transactional email endpoint. The browser calls this AFTER a successful
 * Supabase write, so email is a non-blocking side-effect: this route always
 * responds 200 (even when email is skipped/failed) so the client flow never
 * breaks. Secrets (RESEND_API_KEY) stay server-side.
 */
export const runtime = "nodejs";

const schema = z.object({
  kind: z.enum(["contact", "consultation", "demo", "advisory", "newsletter"]),
  payload: z.object({
    name: z.string().optional(),
    email: z.string().email(),
    phone: z.string().optional(),
    company: z.string().optional(),
    plan: z.string().optional(),
    details: z.record(z.string(), z.string()).optional(),
  }),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    // Bad input shouldn't surface to the user's flow — log and 200.
    console.warn("[emails] invalid payload:", parsed.error.flatten());
    return NextResponse.json({ ok: false, skipped: true });
  }

  try {
    const result = await sendTransactional(parsed.data.kind, parsed.data.payload);
    return NextResponse.json({ ok: true, result });
  } catch (err) {
    console.error("[emails] send failed:", err);
    return NextResponse.json({ ok: false, error: "send_failed" });
  }
}
