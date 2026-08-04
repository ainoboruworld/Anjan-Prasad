/**
 * Newsletter service — subscribe an email (stored in Supabase, with a
 * forms-layer fallback until Supabase is connected).
 */
import { subscribeNewsletter as subscribe } from "@/lib/newsletter";
import { ok, fail, type ServiceResponse } from "../types";

export interface NewsletterInput {
  email: string;
  name?: string;
}

export async function subscribeToNewsletter(
  input: NewsletterInput
): Promise<ServiceResponse<{ subscribed: true }>> {
  const res = await subscribe(input);
  return res.ok
    ? ok({ subscribed: true as const })
    : fail("We couldn't subscribe you just now. Please try again.");
}
