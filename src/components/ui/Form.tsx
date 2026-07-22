"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

/**
 * Shared form primitives — every form on the site (Contact, Advisory,
 * Demo, Consultation, Newsletter, Sign In) composes these so inputs,
 * labels, buttons, and success states stay one design language.
 */

/** The one input surface. Styling lives in globals.css (.input). */
export const inputCls = "input";

export function Field({
  label,
  htmlFor,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted"
      >
        {label}
        {optional && (
          <span className="ml-1 normal-case tracking-normal">(optional)</span>
        )}
      </label>
      {children}
    </div>
  );
}

export function SubmitButton({
  sending,
  idleLabel,
  sendingLabel = "Sending…",
  className = "",
}: {
  sending: boolean;
  idleLabel: string;
  sendingLabel?: string;
  className?: string;
}) {
  return (
    <button
      type="submit"
      disabled={sending}
      className={`group inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-[15px] font-semibold text-brand-ink shadow-[0_10px_30px_-10px_rgba(217,167,46,0.55)] transition-all duration-300 hover:bg-brand-hover hover:shadow-[0_16px_40px_-12px_rgba(217,167,46,0.65)] disabled:opacity-60 ${className}`}
    >
      {sending ? sendingLabel : idleLabel}
      <ArrowRight
        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
        strokeWidth={2}
      />
    </button>
  );
}

export function SuccessCard({
  title,
  copy,
}: {
  title: string;
  copy: string;
}) {
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
        {title}
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-foreground-muted">
        {copy}
      </p>
    </motion.div>
  );
}
