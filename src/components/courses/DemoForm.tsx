"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { submitForm } from "@/lib/forms";

const inputCls = "input";

/** Demo Session registration — posts through the shared forms layer. */
export function DemoForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-brand/40 bg-brand/10 p-8 text-center"
        role="status"
      >
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-brand">
          <Check className="h-5 w-5 text-brand-ink" strokeWidth={2.5} />
        </span>
        <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
          You&apos;re registered.
        </h3>
        <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-foreground-muted">
          Payment and joining details for Saturday&apos;s session arrive by
          email shortly.
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
      formType: "Demo Session",
      name: v("fullName"),
      email: v("email"),
      phone: v("phone"),
      data: { "I am": v("identity") },
    });
    setSending(false);
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
        Register for Saturday
      </p>
      <div>
        <label htmlFor="demo-name" className="sr-only">
          Full Name
        </label>
        <input id="demo-name" name="fullName" required placeholder="Full name" className={inputCls} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="demo-email" className="sr-only">
            Email
          </label>
          <input id="demo-email" name="email" type="email" required placeholder="you@email.com" className={inputCls} />
        </div>
        <div>
          <label htmlFor="demo-phone" className="sr-only">
            Phone Number
          </label>
          <input id="demo-phone" name="phone" type="tel" required placeholder="+91" className={inputCls} />
        </div>
      </div>
      <div>
        <label htmlFor="demo-identity" className="sr-only">
          I am
        </label>
        <select id="demo-identity" name="identity" required defaultValue="" className={inputCls}>
          <option value="" disabled>
            I am…
          </option>
          {["A Student", "A Working Professional", "A Founder", "A Business Owner", "Other"].map(
            (o) => (
              <option key={o}>{o}</option>
            )
          )}
        </select>
      </div>
      <button
        type="submit"
        disabled={sending}
        className="group flex w-full items-center justify-center gap-2 rounded-full bg-brand py-4 text-[15px] font-semibold text-brand-ink transition-colors hover:bg-brand-hover disabled:opacity-60"
      >
        {sending ? "Registering…" : "Register — ₹199 fee"}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
      </button>
      <p className="text-center text-xs text-foreground-muted">
        ₹199 registration fee · Every Saturday · 3 hours live
      </p>
    </form>
  );
}
