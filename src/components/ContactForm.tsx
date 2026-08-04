"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { contactSchema, type ContactValues } from "@/lib/validation/schemas";
import {
  submitContact,
  CONTACT_REASONS,
  INTEREST_TO_REASON,
} from "@/services/contact/contactService";
import { TextField, TextareaField, SelectField } from "./ui/form/fields";

/**
 * Contact form — UI only. Validation is Zod (`contactSchema`); submission is
 * the contact service. No business logic lives here.
 */
export function ContactForm({ initialInterest }: { initialInterest?: string }) {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      reason: INTEREST_TO_REASON[initialInterest ?? ""] ?? "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    await submitContact(values);
    setSent(true);
  });

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-brand/40 bg-brand/10 p-10 text-center"
        role="status"
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand">
          <Check className="h-6 w-6 text-brand-ink" strokeWidth={2.5} />
        </span>
        <h2 className="mt-5 font-display text-2xl font-semibold text-foreground">
          Received. Properly.
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-foreground-muted">
          Your note is in the queue and gets a human reply — usually within one
          working day.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Full name"
          id="contact-name"
          placeholder="Full name"
          autoComplete="name"
          registration={register("fullName")}
          error={errors.fullName?.message}
        />
        <TextField
          label="Email"
          id="contact-email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          registration={register("email")}
          error={errors.email?.message}
        />
        <TextField
          label="Phone"
          id="contact-phone"
          type="tel"
          placeholder="+91"
          autoComplete="tel"
          registration={register("phone")}
          error={errors.phone?.message}
        />
        <TextField
          label="Company"
          id="contact-company"
          optional
          placeholder="Company"
          registration={register("companyName")}
          error={errors.companyName?.message}
        />
      </div>

      <SelectField
        label="Why do you want to contact us?"
        id="contact-reason"
        defaultValue=""
        registration={register("reason")}
        error={errors.reason?.message}
      >
        <option value="" disabled>
          Select a reason
        </option>
        {CONTACT_REASONS.map((r) => (
          <option key={r}>{r}</option>
        ))}
      </SelectField>

      <TextareaField
        label="Message"
        id="contact-message"
        rows={5}
        placeholder="A few lines about your business, your goal, or your question…"
        registration={register("message")}
        error={errors.message?.message}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="group inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-[15px] font-semibold text-brand-ink transition-colors hover:bg-brand-hover disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Send it"}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
      </button>
    </form>
  );
}
