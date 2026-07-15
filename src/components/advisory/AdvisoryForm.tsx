"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { submitForm } from "@/lib/forms";

const INDUSTRIES = [
  "Consumer / D2C",
  "B2B Services",
  "Manufacturing",
  "Technology / SaaS",
  "Healthcare",
  "Education",
  "Retail",
  "Finance",
  "Other",
];

const COMPANY_SIZES = ["Just me", "2–10", "11–50", "51–200", "201–1000", "1000+"];

const STAGES = [
  "Idea / pre-revenue",
  "Early revenue",
  "Growing",
  "Established / plateaued",
  "Enterprise",
];

const ADVISORY_AREAS = [
  "Business Growth",
  "Digital Transformation",
  "Revenue Operations",
  "Fractional CXO",
  "People & Organisation",
  "Finance & Cash Flow",
  "Leadership Development",
  "Operations & Systems",
  "Technology & AI",
  "Corporate Training",
  "Not sure yet",
];

const inputCls =
  "w-full rounded-2xl border border-border-strong bg-background px-5 py-3.5 text-[15px] text-foreground placeholder:text-foreground-muted transition-colors focus:border-brand focus:outline-none";

function Field({
  label,
  htmlFor,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted"
      >
        {label}
        {optional && <span className="ml-1 normal-case tracking-normal">(optional)</span>}
      </label>
      {children}
    </div>
  );
}

/** Business Advisory enquiry form — posts through the shared forms layer. */
export function AdvisoryForm() {
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
        <h3 className="mt-5 font-display text-2xl font-semibold text-foreground">
          Enquiry received.
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-foreground-muted">
          You&apos;ll get a human reply within one working day — and an honest
          read on whether advisory is the right next step.
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
      formType: "Business Advisory",
      name: v("fullName"),
      email: v("email"),
      phone: v("phone"),
      company: v("companyName"),
      data: {
        Website: v("website"),
        Industry: v("industry"),
        "Company Size": v("companySize"),
        "Business Stage": v("businessStage"),
        "Area of Advisory": v("advisoryArea"),
        "Current Challenge": v("challenge"),
        Message: v("message"),
      },
    });
    setSending(false);
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full Name" htmlFor="adv-name">
          <input id="adv-name" name="fullName" required placeholder="Your name" className={inputCls} />
        </Field>
        <Field label="Email" htmlFor="adv-email">
          <input id="adv-email" name="email" type="email" required placeholder="you@company.com" className={inputCls} />
        </Field>
        <Field label="Phone Number" htmlFor="adv-phone">
          <input id="adv-phone" name="phone" type="tel" required placeholder="+91" className={inputCls} />
        </Field>
        <Field label="Company Name" htmlFor="adv-company">
          <input id="adv-company" name="companyName" required placeholder="Company" className={inputCls} />
        </Field>
        <Field label="Website" htmlFor="adv-website" optional>
          <input id="adv-website" name="website" type="url" placeholder="https://" className={inputCls} />
        </Field>
        <Field label="Industry" htmlFor="adv-industry">
          <select id="adv-industry" name="industry" required defaultValue="" className={inputCls}>
            <option value="" disabled>
              Select industry
            </option>
            {INDUSTRIES.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Company Size" htmlFor="adv-size">
          <select id="adv-size" name="companySize" required defaultValue="" className={inputCls}>
            <option value="" disabled>
              Select size
            </option>
            {COMPANY_SIZES.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Business Stage" htmlFor="adv-stage">
          <select id="adv-stage" name="businessStage" required defaultValue="" className={inputCls}>
            <option value="" disabled>
              Select stage
            </option>
            {STAGES.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Area of Advisory" htmlFor="adv-area">
        <select id="adv-area" name="advisoryArea" required defaultValue="" className={inputCls}>
          <option value="" disabled>
            Select area
          </option>
          {ADVISORY_AREAS.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </Field>

      <Field label="Current Challenge" htmlFor="adv-challenge">
        <input
          id="adv-challenge"
          name="challenge"
          required
          placeholder="The one thing that's most in the way right now"
          className={inputCls}
        />
      </Field>

      <Field label="Message" htmlFor="adv-message">
        <textarea
          id="adv-message"
          name="message"
          rows={5}
          required
          placeholder="A few lines about the business — where it is, where you want it to go…"
          className={`${inputCls} resize-y`}
        />
      </Field>

      <button
        type="submit"
        disabled={sending}
        className="group inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-[15px] font-semibold text-brand-ink transition-colors hover:bg-brand-hover disabled:opacity-60"
      >
        {sending ? "Sending…" : "Send enquiry"}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
      </button>
    </form>
  );
}
