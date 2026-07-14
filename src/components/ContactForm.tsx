"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const FIELD =
  "h-12 w-full rounded-xl border border-border bg-background-elevated px-4 text-[15px] text-foreground placeholder:text-muted transition-colors focus:border-brand focus:outline-none";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center rounded-[1.5rem] border border-border bg-background-elevated/40 p-12 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/15 text-brand">
          <Check className="h-6 w-6" strokeWidth={2.5} />
        </span>
        <h3 className="mt-6 font-display text-xl font-semibold text-foreground">
          Message received.
        </h3>
        <p className="mt-2 max-w-sm text-sm text-foreground-muted">
          Thank you for reaching out. You&apos;ll hear back within two business
          days.
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
      className="rounded-[1.5rem] border border-border bg-background-elevated/40 p-8 sm:p-10"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-2 block text-sm text-foreground">
            Full name
          </label>
          <input id="c-name" required placeholder="Your name" className={FIELD} />
        </div>
        <div>
          <label htmlFor="c-email" className="mb-2 block text-sm text-foreground">
            Email
          </label>
          <input
            id="c-email"
            type="email"
            required
            placeholder="you@company.com"
            className={FIELD}
          />
        </div>
        <div>
          <label htmlFor="c-company" className="mb-2 block text-sm text-foreground">
            Company
          </label>
          <input id="c-company" placeholder="Company name" className={FIELD} />
        </div>
        <div>
          <label htmlFor="c-topic" className="mb-2 block text-sm text-foreground">
            I&apos;m interested in
          </label>
          <select id="c-topic" className={FIELD} defaultValue="">
            <option value="" disabled>
              Select a topic
            </option>
            <option>Business Advisory</option>
            <option>Counselling</option>
            <option>Courses</option>
            <option>Speaking &amp; Media</option>
            <option>Something else</option>
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="c-message" className="mb-2 block text-sm text-foreground">
          Message
        </label>
        <textarea
          id="c-message"
          required
          rows={5}
          placeholder="Tell me a little about your business and what you're looking for."
          className="w-full rounded-xl border border-border bg-background-elevated px-4 py-3 text-[15px] text-foreground placeholder:text-muted transition-colors focus:border-brand focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-brand px-8 text-[15px] font-semibold text-[#0a0a0a] transition-all duration-300 hover:scale-[1.02] hover:bg-brand-hover"
      >
        Send message
      </button>
    </form>
  );
}
