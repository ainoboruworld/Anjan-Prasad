/**
 * Consultation service - books a consultation.
 *
 * Flow: capture the lead, then either take payment (Cashfree via the payments
 * service) or, for free/BPL tiers, record a verification request. UI passes
 * only identity + tier + form data; pricing is validated server-side.
 */
import { submitForm, type FormType } from "@/lib/forms";
import { saveBooking } from "@/lib/bookings";
import { notifyEmail } from "@/lib/emailClient";
import { createPaymentOrder } from "../payments/paymentsService";
import { ok, fail, type ServiceResponse } from "../types";

export interface BookingCustomer {
  name: string;
  email: string;
  phone: string;
  company?: string;
}

export interface ConsultationBookingInput {
  tierId: string;
  /** Which spreadsheet/CRM bucket the lead belongs to. */
  formType: FormType;
  customer: BookingCustomer;
  data: Record<string, string>;
  mode: "payment" | "verification";
}

export interface BookingResult {
  orderId?: string;
  paymentSessionId?: string;
  amount?: number;
  verification?: boolean;
}

export async function createConsultationBooking(
  input: ConsultationBookingInput
): Promise<ServiceResponse<BookingResult>> {
  // Persist the booking to Supabase (source of truth) and mirror to the
  // forms layer (notification / fallback). Neither blocks the payment step.
  await saveBooking({
    serviceType: "consultation",
    programType: input.formType,
    tierId: input.tierId,
    fullName: input.customer.name,
    email: input.customer.email,
    phone: input.customer.phone,
    company: input.customer.company,
    status: input.mode === "verification" ? "verifying" : "pending_payment",
    payload: input.data,
  });
  await submitForm({
    formType: input.formType,
    name: input.customer.name,
    email: input.customer.email,
    phone: input.customer.phone,
    company: input.customer.company,
    data: { service_type: "consultation", tier_id: input.tierId, ...input.data },
  });
  // Best-effort admin + customer email; never blocks checkout/verification.
  void notifyEmail("consultation", {
    name: input.customer.name,
    email: input.customer.email,
    phone: input.customer.phone,
    company: input.customer.company,
    plan: input.tierId,
    details: input.data,
  });

  if (input.mode === "verification") {
    return ok({ verification: true });
  }

  const { data: order, error } = await createPaymentOrder({
    serviceType: "consultation",
    tierId: input.tierId,
    customer: input.customer,
    metadata: input.data,
  });
  if (error || !order) return fail(error ?? "Could not start checkout.");
  return ok({
    orderId: order.orderId,
    paymentSessionId: order.paymentSessionId,
    amount: order.amount,
  });
}
