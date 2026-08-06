"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2, Mail, Phone, User } from "lucide-react";
import { easeSmooth } from "../motion";
import { OtpInput } from "./OtpInput";
import { useAuth } from "./AuthProvider";
import {
  sendSignUpOtp,
  verifyEmailOtp,
  resendEmailOtp,
  upsertProfile,
} from "@/lib/auth/service";
import { friendlyAuthError, isValidEmail } from "@/lib/auth/errors";
import { AuthPanel, ErrorLine, PrimaryButton } from "./authUi";

type Step = "details" | "otp" | "success";
const RESEND_SECONDS = 30;

const CONSENT_LABEL =
  "I agree to receive important updates, reminders, newsletters, product announcements, and service-related communications via email.";

/**
 * Sign Up — collect name, email and phone, send an email OTP, then verify to
 * create the account and persist the profile. Inline validation, loading,
 * error and success states; fully responsive within the shared auth panel.
 */
export function SignUpForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { configured } = useAuth();
  const redirectTo = useMemo(
    () => sanitizeRedirect(params.get("redirect")),
    [params]
  );

  const [step, setStep] = useState<Step>("details");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(true);
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
    if (fullName.trim().length < 2) return setError("Please enter your full name.");
    if (!isValidEmail(email)) return setError("Please enter a valid email address.");
    if (phone.trim().replace(/\D/g, "").length < 6)
      return setError("Please enter a valid phone number.");

    setBusy(true);
    const { error: err } = await sendSignUpOtp({
      fullName,
      email,
      phone,
      marketingConsent: consent,
    });
    setBusy(false);
    if (err) return setError(friendlyAuthError({ message: err }));
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
    // Create/complete the profile with the details entered at sign-up.
    await upsertProfile({
      id: data.user.id,
      email: data.user.email ?? email.trim(),
      full_name: fullName,
      phone: phone.trim(),
      marketing_consent: consent,
    });
    setBusy(false);
    setStep("success");
    setTimeout(() => router.replace(redirectTo), 800);
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
    <AuthPanel configured={configured}>
      <AnimatePresence mode="wait">
        {step === "details" && (
          <motion.form
            key="details"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: easeSmooth }}
            onSubmit={requestOtp}
            className="space-y-5"
          >
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                Create your account
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                A few details, then a one-time code to your email. No password
                to remember.
              </p>
            </div>

            <Field label="Full name" htmlFor="su-name" icon={User}>
              <input
                id="su-name"
                type="text"
                autoComplete="name"
                required
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Your name"
                className="input !pl-11"
              />
            </Field>

            <Field label="Email address" htmlFor="su-email" icon={Mail}>
              <input
                id="su-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="you@email.com"
                className="input !pl-11"
              />
            </Field>

            <Field label="Phone number" htmlFor="su-phone" icon={Phone}>
              <input
                id="su-phone"
                type="tel"
                autoComplete="tel"
                required
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (error) setError("");
                }}
                placeholder="+91 98765 43210"
                className="input !pl-11"
              />
            </Field>

            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-background-sunken px-4 py-3.5">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-border-strong text-brand accent-brand"
              />
              <span className="text-[13px] leading-relaxed text-foreground-muted">
                {CONSENT_LABEL}
              </span>
            </label>

            <ErrorLine error={error} />
            <PrimaryButton busy={busy} label="Send code" busyLabel="Sending…" />

            <p className="text-center text-sm text-foreground-muted">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-foreground underline decoration-brand underline-offset-4 transition-colors hover:text-brand"
              >
                Log in
              </Link>
            </p>
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
                setStep("details");
                setOtp("");
                setError("");
              }}
              className="inline-flex items-center gap-1.5 text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
              Back to details
            </button>

            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                Verify your email
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

            <PrimaryButton
              busy={busy}
              type="button"
              onClick={() => submitOtp(otp)}
              disabled={otp.length < 6}
              label="Verify & create account"
              busyLabel="Verifying…"
            />

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
          <SuccessState
            title="Account created."
            subtitle="Setting up your space…"
          />
        )}
      </AnimatePresence>
    </AuthPanel>
  );
}

/** A labelled input row with a leading icon. */
function Field({
  label,
  htmlFor,
  icon: Icon,
  children,
}: {
  label: string;
  htmlFor: string;
  icon: typeof Mail;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-xs font-medium uppercase tracking-[0.1em] text-foreground-muted"
      >
        {label}
      </label>
      <div className="relative">
        <Icon
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted"
          strokeWidth={1.75}
        />
        {children}
      </div>
    </div>
  );
}

function SuccessState({ title, subtitle }: { title: string; subtitle: string }) {
  return (
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
        {title}
      </h2>
      <p className="mt-1.5 text-sm text-foreground-muted">{subtitle}</p>
    </motion.div>
  );
}

function sanitizeRedirect(value: string | null): string {
  if (!value) return "/";
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}
