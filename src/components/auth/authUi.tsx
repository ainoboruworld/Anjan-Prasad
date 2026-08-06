"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";

/**
 * Shared building blocks for the Sign Up and Log In panels, so both surfaces
 * look and behave identically and stay in sync.
 */

/** The premium card shell shared by both auth forms. */
export function AuthPanel({
  configured,
  children,
}: {
  configured: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-border bg-background-elevated p-6 shadow-[var(--shadow-soft)] sm:p-8 md:p-10">
      {!configured && (
        <p className="mb-6 rounded-2xl border border-border bg-background-sunken px-4 py-3 text-xs leading-relaxed text-foreground-muted">
          Authentication activates automatically once the Supabase credentials
          are added to the environment.
        </p>
      )}
      {children}
    </div>
  );
}

/** Inline, animated validation / error line. */
export function ErrorLine({ error }: { error: string }) {
  return (
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          role="alert"
          className="text-sm font-medium text-red-500"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

/** The primary action button with a built-in loading state. */
export function PrimaryButton({
  busy,
  label,
  busyLabel,
  type = "submit",
  onClick,
  disabled = false,
}: {
  busy: boolean;
  label: string;
  busyLabel: string;
  type?: "submit" | "button";
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={busy || disabled}
      className="group flex w-full items-center justify-center gap-2 rounded-full bg-brand py-4 text-[15px] font-semibold text-brand-ink shadow-[0_10px_30px_-10px_rgba(79,169,255,0.55)] transition-all hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"
    >
      {busy ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
          {busyLabel}
        </>
      ) : (
        <>
          {label}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </>
      )}
    </button>
  );
}
