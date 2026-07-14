"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { inViewOnce, riseIn, staggerContainer } from "./motion";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <section id="newsletter" className="py-24 sm:py-32">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className="mx-auto max-w-2xl px-6 text-center"
      >
        <motion.h2
          variants={riseIn}
          className="text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground"
        >
          Stay updated
        </motion.h2>
        <motion.p
          variants={riseIn}
          className="mx-auto mt-5 max-w-lg text-[length:var(--text-body)] leading-relaxed text-foreground-muted"
        >
          Occasional field notes on operations, systems, and building
          businesses that outgrow their founder. No noise.
        </motion.p>

        <motion.form
          variants={riseIn}
          onSubmit={(e) => {
            e.preventDefault();
            if (email.trim()) setSubmitted(true);
          }}
          className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="h-12 flex-1 rounded-full border border-border bg-background-elevated px-5 text-[15px] text-foreground placeholder:text-muted transition-colors focus:border-brand focus:outline-none"
          />
          <button
            type="submit"
            disabled={submitted}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-[15px] font-semibold text-[#0a0a0a] transition-all duration-300 hover:scale-[1.03] hover:bg-brand-hover disabled:opacity-80"
          >
            {submitted ? (
              <>
                <Check className="h-4 w-4" strokeWidth={2.5} /> Subscribed
              </>
            ) : (
              "Subscribe"
            )}
          </button>
        </motion.form>
      </motion.div>
    </section>
  );
}
