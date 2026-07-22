"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { submitForm } from "@/lib/forms";

/** Newsletter capture — name + email, posts through the shared forms layer. */
export function Newsletter() {
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const f = new FormData(e.currentTarget);
    await submitForm({
      formType: "Newsletter",
      name: (f.get("name") as string) ?? "",
      email: (f.get("email") as string) ?? "",
    });
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
    <form
      onSubmit={submit}
      className="flex w-full min-w-0 max-w-xl flex-wrap gap-2 lg:ml-auto"
    >
      <label htmlFor="newsletter-name" className="sr-only">
        Name
      </label>
      <input
        id="newsletter-name"
        name="name"
        required
        size={8}
        placeholder="Your name"
        className="input min-w-0 flex-1 rounded-full"
      />
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        size={10}
        placeholder="you@company.com"
        className="input min-w-0 flex-[1.4] rounded-full"
      />
      <button
        type="submit"
        disabled={sending}
        className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-brand-ink shadow-[0_10px_30px_-10px_rgba(217,167,46,0.55)] transition-all hover:bg-brand-hover disabled:opacity-60"
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
