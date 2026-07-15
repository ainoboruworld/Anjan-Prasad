"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const INTERESTS = [
  { id: "demo", label: "₹199 Demo Session" },
  { id: "premium", label: "Premium Course" },
  { id: "consulting", label: "Consulting" },
  { id: "training", label: "Corporate Training" },
  { id: "speaking", label: "Speaking / Media" },
  { id: "other", label: "Something else" },
];

const inputCls =
  "w-full rounded-2xl border border-border-strong bg-background px-5 py-3.5 text-[15px] text-foreground placeholder:text-foreground-muted transition-colors focus:border-brand focus:outline-none";

/**
 * Contact form with contextual intent chips. Client-side confirmation only —
 * wire onSubmit to the real inbox/CRM endpoint when it exists.
 */
export function ContactForm({ initialInterest }: { initialInterest?: string }) {
  const [interest, setInterest] = useState(
    INTERESTS.some((i) => i.id === initialInterest) ? initialInterest! : "demo"
  );
  const [sent, setSent] = useState(false);

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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-6"
    >
      <fieldset>
        <legend className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
          I&apos;m here about
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {INTERESTS.map((i) => {
            const on = interest === i.id;
            return (
              <button
                key={i.id}
                type="button"
                onClick={() => setInterest(i.id)}
                aria-pressed={on}
                className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                  on
                    ? "border-brand bg-brand font-semibold text-brand-ink"
                    : "border-border text-foreground-muted hover:border-border-strong hover:text-foreground"
                }`}
              >
                {i.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="sr-only">
            Name
          </label>
          <input id="contact-name" required placeholder="Your name" className={inputCls} />
        </div>
        <div>
          <label htmlFor="contact-email" className="sr-only">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            required
            placeholder="you@company.com"
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="sr-only">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          required
          placeholder="A few lines about your business, your goal, or your question…"
          className={`${inputCls} resize-y`}
        />
      </div>

      <button
        type="submit"
        className="group inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-[15px] font-semibold text-brand-ink transition-colors hover:bg-brand-hover"
      >
        Send it
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
      </button>
    </form>
  );
}
