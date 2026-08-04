"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2, Mail } from "lucide-react";
import { easeSmooth } from "../motion";
import { OtpInput } from "./OtpInput";
import { useAuth } from "./AuthProvider";
import {
  sendEmailOtp,
  verifyEmailOtp,
  resendEmailOtp,
  getProfile,
} from "@/lib/auth/service";
import { friendlyAuthError, isValidEmail } from "@/lib/auth/errors";

type Step = "email" | "otp" | "success";

const RESEND_SECONDS = 30;

/**
 * Passwordless Email-OTP sign-in.
 *
 * Email → OTP → verify. On success, returning users (profile exists) go back
 * to where they came from; first-time users are sent to onboarding. Inline
 * validation, loading states, friendly errors, and a success animation.
 */
export function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { configured } = useAuth();
  const redirectTo = useMemo(() => sanitizeRedirect(params.get("redirect")), [params]);

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const requestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setBusy(true);
    const { error: err } = await sendEmailOtp(email);
    setBusy(false);
    if (err) {
      setError(friendlyAuthError({ message: err }));
      return;
    }
    setStep("otp");
    setCooldown(RESEND_SECONDS);
  };

  const submitOtp = async (code: string) => {
    setError("");
    setBusy(true);
    const { data, error: err } = await verifyEmailOtp(email, code);
    if (err || !data) {
      setBusy(false);
      setError(friendlyAuthError({ message: err ?? "" }));
      setOtp("");
      return;
    }

    // Decide destination: returning user → back where they came from;
    // new user (no profile) → onboarding.
    const { data: profile } = await getProfile(data.user.id);
    setBusy(false);
    setStep("success");

    const target = profile
      ? redirectTo
      : `/onboarding?redirect=${encodeURIComponent(redirectTo)}`;

    // Let the success state show briefly, then navigate.
    setTimeout(() => router.replace(target), 700);
  };

  const resend = async () => {
    if (cooldown > 0 || busy) return;
    setError("");
    setBusy(true);
    const { error: err } = await resendEmailOtp(email);
    setBusy(false);
    if (err) setError(friendlyAuthError({ message: err }));
    else setCooldown(RESEND_SECONDS);
  };

  return (
    <div className="rounded-3xl border border-border bg-background-elevated p-8 shadow-[var(--shadow-soft)] sm:p-10">
      {!configured && (
        <p className="mb-6 rounded-2xl border border-border bg-background-sunken px-4 py-3 text-xs leading-relaxed text-foreground-muted">
          Sign-in activates automatically once the Supabase credentials are
          added to the environment.
        </p>
      )}

      <AnimatePresence mode="wait">
        {step === "email" && (
          <motion.form
            key="email"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: easeSmooth }}
            onSubmit={requestOtp}
            className="space-y-5"
          >
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                Sign in
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                Enter your email and we&apos;ll send you a one-time code. No
                password needed.
              </p>
            </div>

            <div>
              <label htmlFor="auth-email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted"
                  strokeWidth={1.75}
                />
                <input
                  id="auth-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="you@company.com"
                  className="input !pl-11"
                  aria-invalid={Boolean(error)}
                />
              </div>
            </div>

            <ErrorLine error={error} />

            <SubmitButton busy={busy} label="Send code" busyLabel="Sending…" />
          </motion.form>
        )}

        {step === "otp" && (
          <motion.div
            key="otp"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: easeSmooth }}
            className="space-y-5"
          >
            <button
              type="button"
              onClick={() => {
                setStep("email");
                setOtp("");
                setError("");
              }}
              className="inline-flex items-center gap-1.5 text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
              Change email
            </button>

            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                Enter your code
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                We sent a 6-digit code to{" "}
                <span className="font-medium text-foreground">{email}</span>.
              </p>
            </div>

            <OtpInput
              value={otp}
              onChange={(v) => {
                setOtp(v);
                if (error) setError("");
              }}
              onComplete={submitOtp}
              disabled={busy}
            />

            <ErrorLine error={error} />

            <button
              type="button"
              disabled={busy || otp.length < 6}
              onClick={() => submitOtp(otp)}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-brand py-4 text-[15px] font-semibold text-brand-ink shadow-[0_10px_30px_-10px_rgba(79,169,255,0.55)] transition-all hover:bg-brand-hover disabled:opacity-60"
            >
              {busy ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                  Verifying…
                </>
              ) : (
                <>
                  Verify &amp; continue
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                </>
              )}
            </button>

            <p className="text-center text-sm text-foreground-muted">
              Didn&apos;t get it?{" "}
              <button
                type="button"
                onClick={resend}
                disabled={cooldown > 0 || busy}
                className="font-medium text-foreground underline decoration-brand underline-offset-4 transition-colors hover:text-brand disabled:cursor-not-allowed disabled:text-foreground-muted disabled:no-underline"
              >
                {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
              </button>
            </p>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: easeSmooth }}
            className="py-6 text-center"
            role="status"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.05 }}
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand"
            >
              <Check className="h-7 w-7 text-brand-ink" strokeWidth={2.5} />
            </motion.span>
            <h2 className="mt-5 font-display text-2xl font-semibold text-foreground">
              You&apos;re in.
            </h2>
            <p className="mt-1.5 text-sm text-foreground-muted">
              Taking you where you left off…
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ErrorLine({ error }: { error: string }) {
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

function SubmitButton({
  busy,
  label,
  busyLabel,
}: {
  busy: boolean;
  label: string;
  busyLabel: string;
}) {
  return (
    <button
      type="submit"
      disabled={busy}
      className="group flex w-full items-center justify-center gap-2 rounded-full bg-brand py-4 text-[15px] font-semibold text-brand-ink shadow-[0_10px_30px_-10px_rgba(79,169,255,0.55)] transition-all hover:bg-brand-hover disabled:opacity-60"
    >
      {busy ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
          {busyLabel}
        </>
      ) : (
        <>
          {label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
        </>
      )}
    </button>
  );
}

/** Only allow same-origin path redirects, never open redirects. */
function sanitizeRedirect(value: string | null): string {
  if (!value) return "/";
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}
