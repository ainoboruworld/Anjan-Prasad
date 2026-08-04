"use client";

import { useMutation } from "@tanstack/react-query";
import {
  subscribeToNewsletter,
  type NewsletterInput,
} from "@/services/newsletter/newsletterService";

/** Mutation: subscribe to the newsletter. */
export function useNewsletterSubscribe() {
  return useMutation({
    mutationFn: async (input: NewsletterInput) => {
      const { error } = await subscribeToNewsletter(input);
      if (error) throw new Error(error);
      return { subscribed: true as const };
    },
  });
}
