import { NextResponse } from "next/server";
import { serverEnv } from "@/lib/env";

/**
 * Cashfree payment webhook.
 *
 * Backend wiring later:
 *   1. Verify the Cashfree signature using serverEnv.cashfreeSecret.
 *   2. On PAID, update the booking row in Supabase (service role).
 *   3. Send the confirmation + meeting details via Resend.
 *
 * The endpoint exists now so the integration is a fill-in, not a new route.
 */
export async function POST(request: Request) {
  const payload = await request.text();

  // TODO: verify signature with serverEnv.cashfreeSecret before trusting.
  void serverEnv;
  void payload;

  // TODO: update Supabase booking status; trigger Resend confirmation email.

  return NextResponse.json({ received: true });
}
