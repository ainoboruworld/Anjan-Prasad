import { NextResponse } from "next/server";
import { getTier, type ServiceType } from "@/lib/pricingConfig";
import { flags, serverEnv } from "@/lib/env";

/**
 * Create a Cashfree order.
 *
 * SECURITY: the amount is re-derived from `pricingConfig` on the server — the
 * client's price is never trusted. Free tiers (e.g. BPL) short-circuit with no
 * payment. When Cashfree credentials are present, this is where the Cashfree
 * "create order" call goes (using serverEnv.cashfreeSecret) and where the
 * booking row is inserted into Supabase. Until then it returns a mock order so
 * the full frontend flow works end-to-end.
 */
export async function POST(request: Request) {
  let body: {
    serviceType?: ServiceType;
    tierId?: string;
    customer?: { name?: string; email?: string; phone?: string };
    metadata?: Record<string, string>;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { serviceType, tierId, customer } = body;
  if (!serviceType || !tierId || !customer?.email) {
    return NextResponse.json(
      { error: "Missing service, tier, or customer details." },
      { status: 400 }
    );
  }

  const tier = getTier(serviceType, tierId);
  if (!tier) {
    return NextResponse.json({ error: "Unknown pricing tier." }, { status: 400 });
  }

  const orderId = `apc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  // Free / verification tiers require no payment.
  if (tier.free || tier.amount === null) {
    return NextResponse.json({
      order: {
        orderId,
        paymentSessionId: "",
        amount: 0,
        currency: "INR",
        status: "free" as const,
      },
    });
  }

  // ── Cashfree integration point ──────────────────────────────────────────
  // if (flags.cashfree && serverEnv.cashfreeSecret) {
  //   const session = await createCashfreeOrder({ orderId, amount: tier.amount,
  //     currency: "INR", customer });
  //   await insertBookingRow(...);   // Supabase (service role)
  //   return NextResponse.json({ order: { orderId,
  //     paymentSessionId: session.payment_session_id, amount: tier.amount,
  //     currency: "INR", status: "created" } });
  // }
  void flags;
  void serverEnv;

  // Mock order until Cashfree is connected.
  return NextResponse.json({
    order: {
      orderId,
      paymentSessionId: `mock_session_${orderId}`,
      amount: tier.amount,
      currency: "INR",
      status: "created" as const,
    },
  });
}
