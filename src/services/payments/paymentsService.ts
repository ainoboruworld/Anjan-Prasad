/**
 * Payments service - the frontend's payment API surface (Cashfree).
 *
 * The frontend NEVER computes or trusts a price. It sends the service +
 * tier + customer to our server route, which re-derives and validates the
 * amount from `pricingConfig`, creates the Cashfree order, and returns a
 * payment session. No payment logic lives in UI components.
 *
 * Backend wiring later: implement the Cashfree calls inside
 * `src/app/api/payments/*` - this client contract does not change.
 */
import type { ServiceType } from "@/lib/pricingConfig";
import { ok, fail, type ServiceResponse } from "../types";

export interface PaymentCustomer {
  name: string;
  email: string;
  phone: string;
}

export interface CreateOrderInput {
  serviceType: ServiceType;
  tierId: string;
  customer: PaymentCustomer;
  /** Arbitrary booking context stored with the order. */
  metadata?: Record<string, string>;
}

export interface PaymentOrder {
  orderId: string;
  /** Cashfree payment session id used to launch checkout. */
  paymentSessionId: string;
  amount: number;
  currency: string;
  status: "created" | "paid" | "failed" | "free";
}

export async function createPaymentOrder(
  input: CreateOrderInput
): Promise<ServiceResponse<PaymentOrder>> {
  try {
    const res = await fetch("/api/payments/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const json = (await res.json()) as
      | { order: PaymentOrder }
      | { error: string };
    if (!res.ok || "error" in json) {
      return fail("error" in json ? json.error : "Could not start checkout.");
    }
    return ok(json.order);
  } catch {
    return fail("Network error starting checkout. Please try again.");
  }
}

export async function getPaymentStatus(
  orderId: string
): Promise<ServiceResponse<{ status: PaymentOrder["status"] }>> {
  try {
    const res = await fetch(
      `/api/payments/status?orderId=${encodeURIComponent(orderId)}`
    );
    const json = (await res.json()) as { status?: PaymentOrder["status"] };
    if (!res.ok || !json.status) return fail("Could not fetch payment status.");
    return ok({ status: json.status });
  } catch {
    return fail("Network error fetching payment status.");
  }
}
