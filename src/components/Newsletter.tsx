"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { submitForm } from "@/lib/forms";

/** Newsletter capture — posts through the shared forms layer. */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSending(true);
    await submitForm({ formType: "Newsletter", email });
    setSending(false);
    setDone(true);
  };

  if (done) {
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

  return (
    <form onSubmit={submit} className="flex w-full min-w-0 max-w-md flex-wrap gap-2 lg:ml-auto">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        size={10}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="min-w-0 flex-1 rounded-full border border-border-strong bg-background px-5 py-3.5 text-sm text-foreground placeholder:text-foreground-muted focus:border-brand focus:outline-none"
      />
      <button
        type="submit"
        disabled={sending}
        className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-brand hover:text-brand-ink disabled:opacity-60"
      >
        {sending ? "Subscribing…" : "Subscribe"}
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          strokeWidth={2}
        />
      </button>
    </form>
  );
}
