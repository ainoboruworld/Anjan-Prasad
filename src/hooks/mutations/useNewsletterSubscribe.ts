"use client";

import { useMutation } from "@tanstack/react-query";
import {
  subscribeToNewsletter,
  type NewsletterInput,
} from "@/services/newsletter/newsletterService";
import { notifyEmail } from "@/lib/emailClient";

/** Mutation: subscribe to the newsletter, then send the welcome email. */
export function useNewsletterSubscribe() {
  return useMutation({
    mutationFn: async (input: NewsletterInput) => {
      const { error } = await subscribeToNewsletter(input);
      if (error) throw new Error(error);
      // Best-effort welcome + admin notification after the DB write.
      void notifyEmail("newsletter", { name: input.name, email: input.email });
      return { subscribed: true as const };
    },
  });
}
