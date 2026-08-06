/**
 * Business Advisory service - books a Demo, Cohort, or Monthly Advisory
 * program. Same shape as consultation; pricing is validated server-side.
 */
import { submitForm, type FormType } from "@/lib/forms";
import { saveBooking } from "@/lib/bookings";
import { notifyEmail } from "@/lib/emailClient";
import { createPaymentOrder } from "../payments/paymentsService";
import { ok, fail, type ServiceResponse } from "../types";
import type {
  BookingCustomer,
  BookingResult,
} from "../consultation/consultationService";

export interface AdvisoryBookingInput {
  /** "demo" | "cohort" | "advisory" */
  tierId: string;
  formType: FormType;
  customer: BookingCustomer;
  data: Record<string, string>;
}

export async function createAdvisoryBooking(
  input: AdvisoryBookingInput
): Promise<ServiceResponse<BookingResult>> {
  await saveBooking({
    serviceType: "business-advisory",
    programType: input.formType,
    tierId: input.tierId,
    fullName: input.customer.name,
    email: input.customer.email,
    phone: input.customer.phone,
    company: input.customer.company,
    status: "pending_payment",
    payload: input.data,
  });
  await submitForm({
    formType: input.formType,
    name: input.customer.name,
    email: input.customer.email,
    phone: input.customer.phone,
    company: input.customer.company,
    data: {
      service_type: "business-advisory",
      tier_id: input.tierId,
      ...input.data,
    },
  });
  void notifyEmail(input.tierId === "demo" ? "demo" : "advisory", {
    name: input.customer.name,
    email: input.customer.email,
    phone: input.customer.phone,
    company: input.customer.company,
    plan: input.formType,
    details: input.data,
  });

  const { data: order, error } = await createPaymentOrder({
    serviceType: "business-advisory",
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

export type { BookingCustomer, BookingResult };
