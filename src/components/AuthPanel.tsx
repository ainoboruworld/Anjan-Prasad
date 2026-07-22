"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { easeSmooth } from "./motion";

const inputCls = "input";

/**
 * Sign-in / create-account panel. UI only — connect to the real auth
 * provider when the member area ships.
 */
export function AuthPanel() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="rounded-3xl border border-brand/40 bg-brand/10 p-10 text-center" role="status">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand">
          <Check className="h-6 w-6 text-brand-ink" strokeWidth={2.5} />
        </span>
        <h2 className="mt-5 font-display text-2xl font-semibold text-foreground">
          The member area is almost ready.
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-foreground-muted">
          Accounts open with the next cohort — you&apos;ll be first to know at
          this address.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-background-elevated p-8 shadow-[var(--shadow-soft)] sm:p-10">
      {/* Mode switch */}
      <div
        role="tablist"
        aria-label="Sign in or create account"
        className="grid grid-cols-2 rounded-full border border-border p-1"
      >
        {(
          [
            ["in", "Sign in"],
            ["up", "Create account"],
          ] as const
        ).map(([m, label]) => (
          <button
            key={m}
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={`relative rounded-full py-2.5 text-sm font-medium transition-colors ${
              mode === m ? "text-brand-ink" : "text-foreground-muted hover:text-foreground"
            }`}
          >
            {mode === m && (
              <motion.span
                layoutId="auth-pill"
                className="absolute inset-0 rounded-full bg-brand"
                transition={{ duration: 0.35, ease: easeSmooth }}
              />
            )}
            <span className="relative">{label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.form
          key={mode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: easeSmooth }}
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          {mode === "up" && (
            <div>
              <label htmlFor="auth-name" className="sr-only">
                Name
              </label>
              <input id="auth-name" required placeholder="Your name" className={inputCls} />
            </div>
          )}
          <div>
            <label htmlFor="auth-email" className="sr-only">
              Email
            </label>
            <input
              id="auth-email"
              type="email"
              required
              placeholder="you@company.com"
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="auth-password" className="sr-only">
              Password
            </label>
            <input
              id="auth-password"
              type="password"
              required
              minLength={8}
              placeholder="Password"
              className={inputCls}
            />
          </div>
          <button
            type="submit"
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-4 text-[15px] font-semibold text-background transition-colors hover:bg-brand hover:text-brand-ink"
          >
            {mode === "in" ? "Sign in" : "Create account"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
          </button>
        </motion.form>
      </AnimatePresence>

      <p className="mt-6 text-center text-xs leading-relaxed text-foreground-muted">
        Course access, community, and saved playbooks live here once the member
        area opens.
      </p>
    </div>
  );
}
