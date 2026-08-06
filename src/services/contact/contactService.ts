/**
 * Contact service - submits a contact enquiry and routes it to the right
 * CRM/spreadsheet bucket. The reason→destination logic lives here, not in the
 * form component.
 */
import { submitForm, type FormType } from "@/lib/forms";
import { ok, fail, type ServiceResponse } from "../types";

export const CONTACT_REASONS = [
  "Business Advisory",
  "Demo Session",
  "Live Course",
  "Partnership",
  "Speaking Engagement",
  "General Enquiry",
  "Other",
] as const;

export type ContactReason = (typeof CONTACT_REASONS)[number];

/** Map a ?interest= query value to a preselected reason. */
export const INTEREST_TO_REASON: Record<string, ContactReason> = {
  "business-advisory": "Business Advisory",
  consulting: "Business Advisory",
  training: "Business Advisory",
  demo: "Demo Session",
  "live-course": "Live Course",
  premium: "Live Course",
  partnership: "Partnership",
  speaking: "Speaking Engagement",
};

const REASON_TO_FORM_TYPE: Record<string, FormType> = {
  "Business Advisory": "Business Advisory",
  "Demo Session": "Demo Session",
  "Live Course": "Contact",
  Partnership: "General Enquiries",
  "Speaking Engagement": "General Enquiries",
  "General Enquiry": "General Enquiries",
  Other: "General Enquiries",
};

export interface ContactInput {
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  reason: string;
  message: string;
}

export async function submitContact(
  input: ContactInput
): Promise<ServiceResponse<{ received: true }>> {
  const res = await submitForm({
    formType: REASON_TO_FORM_TYPE[input.reason] ?? "Contact",
    name: input.fullName,
    email: input.email,
    phone: input.phone,
    company: input.companyName,
    data: {
      "Why do you want to contact us?": input.reason,
      Message: input.message,
    },
  });
  return res.ok
    ? ok({ received: true as const })
    : fail("Could not send your message. Please try again.");
}
