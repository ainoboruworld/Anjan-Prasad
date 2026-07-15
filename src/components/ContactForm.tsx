"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { submitForm, type FormType } from "@/lib/forms";

const REASONS = [
  "Business Advisory",
  "Demo Session",
  "Live Course",
  "Partnership",
  "Speaking Engagement",
  "General Enquiry",
  "Other",
] as const;

/** Map ?interest= query values to a preselected reason. */
const INTEREST_TO_REASON: Record<string, (typeof REASONS)[number]> = {
  "business-advisory": "Business Advisory",
  consulting: "Business Advisory",
  training: "Business Advisory",
  demo: "Demo Session",
  "live-course": "Live Course",
  premium: "Live Course",
  partnership: "Partnership",
  speaking: "Speaking Engagement",
};

/** Route a submission to the right spreadsheet tab by reason. */
const REASON_TO_FORM_TYPE: Record<string, FormType> = {
  "Business Advisory": "Business Advisory",
  "Demo Session": "Demo Session",
  "Live Course": "Contact",
  Partnership: "General Enquiries",
  "Speaking Engagement": "General Enquiries",
  "General Enquiry": "General Enquiries",
  Other: "General Enquiries",
};

const inputCls =
  "w-full rounded-2xl border border-border-strong bg-background px-5 py-3.5 text-[15px] text-foreground placeholder:text-foreground-muted transition-colors focus:border-brand focus:outline-none";

/** Contact form — posts through the shared forms layer. */
export function ContactForm({ initialInterest }: { initialInterest?: string }) {
  const [reason, setReason] = useState<string>(
    INTEREST_TO_REASON[initialInterest ?? ""] ?? ""
  );
  const [sending, setSending] = useState(false);
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const f = new FormData(e.currentTarget);
    const v = (k: string) => (f.get(k) as string) ?? "";
    await submitForm({
      formType: REASON_TO_FORM_TYPE[v("reason")] ?? "Contact",
      name: v("fullName"),
      email: v("email"),
      phone: v("phone"),
      company: v("companyName"),
      data: {
        "Why do you want to contact us?": v("reason"),
        Message: v("message"),
      },
    });
    setSending(false);
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="sr-only">
            Full Name
          </label>
          <input id="contact-name" name="fullName" required placeholder="Full name" className={inputCls} />
        </div>
        <div>
          <label htmlFor="contact-email" className="sr-only">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="sr-only">
            Phone Number
          </label>
          <input id="contact-phone" name="phone" type="tel" required placeholder="+91" className={inputCls} />
        </div>
        <div>
          <label htmlFor="contact-company" className="sr-only">
            Company Name (optional)
          </label>
          <input
            id="contact-company"
            name="companyName"
            placeholder="Company (optional)"
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-reason" className="sr-only">
          Why do you want to contact us?
        </label>
        <select
          id="contact-reason"
          name="reason"
          required
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className={inputCls}
        >
          <option value="" disabled>
            Why do you want to contact us?
          </option>
          {REASONS.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="sr-only">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          placeholder="A few lines about your business, your goal, or your question…"
          className={`${inputCls} resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="group inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-[15px] font-semibold text-brand-ink transition-colors hover:bg-brand-hover disabled:opacity-60"
      >
        {sending ? "Sending…" : "Send it"}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
      </button>
    </form>
  );
}
