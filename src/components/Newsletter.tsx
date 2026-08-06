"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { newsletterSchema, type NewsletterValues } from "@/lib/validation/schemas";
import { useNewsletterSubscribe } from "@/hooks/mutations/useNewsletterSubscribe";

/**
 * Newsletter capture - RHF + Zod validation, TanStack Query mutation to the
 * newsletter service (Supabase). UI only; no business logic here.
 */
export function Newsletter() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsletterValues>({ resolver: zodResolver(newsletterSchema) });
  const subscribe = useNewsletterSubscribe();

  const onSubmit = handleSubmit((values) => subscribe.mutate(values));

  if (subscribe.isSuccess) {
    return (
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 rounded-2xl border border-brand/40 bg-brand/10 px-5 py-4 text-sm font-medium text-foreground"
        role="status"
      >
        <Check className="h-4 w-4 text-brand" strokeWidth={2.5} />
        You&apos;re in. The next letter arrives this week.
      </motion.p>
    );
  }

  const errorMessage =
    errors.name?.message ||
    errors.email?.message ||
    (subscribe.isError ? "Something went wrong. Please try again." : "");

  return (
    <form
      onSubmit={onSubmit}
      className="w-full min-w-0 max-w-xl lg:ml-auto"
      noValidate
    >
      <div className="flex flex-wrap gap-2">
        <label htmlFor="newsletter-name" className="sr-only">
          Name
        </label>
        <input
          id="newsletter-name"
          size={8}
          placeholder="Your name"
          className="input min-w-0 flex-1 rounded-full"
          aria-invalid={Boolean(errors.name)}
          {...register("name")}
        />
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          size={10}
          placeholder="you@company.com"
          className="input min-w-0 flex-[1.4] rounded-full"
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
        />
        <button
          type="submit"
          disabled={subscribe.isPending}
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-brand-ink shadow-[0_10px_30px_-10px_rgba(79,169,255,0.55)] transition-all hover:bg-brand-hover disabled:opacity-60"
        >
          {subscribe.isPending ? "Subscribing…" : "Subscribe"}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </button>
      </div>
      {errorMessage && (
        <p role="alert" className="mt-2 text-sm font-medium text-red-500">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
