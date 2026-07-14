"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { easeSmooth } from "./motion";

type Mode = "signin" | "register";
type Method = "email" | "mobile";

const FIELD =
  "h-12 w-full rounded-xl border border-border bg-background-elevated px-4 text-[15px] text-foreground placeholder:text-muted transition-colors focus:border-brand focus:outline-none";
const LABEL = "mb-2 block text-sm text-foreground";

const OCCUPATIONS = [
  "Student",
  "Working Professional",
  "Founder",
  "Business Owner",
  "Freelancer",
  "Other",
];

export function AuthPanel() {
  const [mode, setMode] = useState<Mode>("signin");
  const [method, setMethod] = useState<Method>("email");
  const [step, setStep] = useState<"details" | "otp">("details");

  const reset = () => setStep("details");

  return (
    <div className="w-full max-w-md">
      {/* Mode switch */}
      <div className="mb-8 grid grid-cols-2 rounded-full border border-border bg-background-elevated/50 p-1">
        {(["signin", "register"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              reset();
            }}
            className={`relative rounded-full py-2.5 text-sm font-medium transition-colors ${
              mode === m ? "text-[#0a0a0a]" : "text-foreground-muted"
            }`}
          >
            {mode === m && (
              <motion.span
                layoutId="auth-pill"
                className="absolute inset-0 rounded-full bg-brand"
                transition={{ duration: 0.3, ease: easeSmooth }}
              />
            )}
            <span className="relative">
              {m === "signin" ? "Sign In" : "Register"}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === "otp" ? (
          <motion.div
            key="otp"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: easeSmooth }}
          >
            <button
              type="button"
              onClick={reset}
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} /> Back
            </button>
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Enter the code
            </h2>
            <p className="mt-2 text-sm text-foreground-muted">
              We sent a 6-digit code to your {method}. Enter it below to
              continue.
            </p>
            <div className="mt-8 flex justify-between gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <input
                  key={i}
                  inputMode="numeric"
                  maxLength={1}
                  aria-label={`Digit ${i + 1}`}
                  className="h-14 w-full rounded-xl border border-border bg-background-elevated text-center text-lg font-semibold text-foreground focus:border-brand focus:outline-none"
                />
              ))}
            </div>
            <button
              type="button"
              className="mt-8 h-12 w-full rounded-full bg-brand text-[15px] font-semibold text-[#0a0a0a] transition-all hover:scale-[1.01] hover:bg-brand-hover"
            >
              Verify &amp; continue
            </button>
            <p className="mt-5 text-center text-sm text-muted">
              Didn&apos;t get it?{" "}
              <button type="button" className="font-medium text-brand">
                Resend code
              </button>
            </p>
          </motion.div>
        ) : (
          <motion.form
            key={mode}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: easeSmooth }}
            onSubmit={(e) => {
              e.preventDefault();
              setStep("otp");
            }}
          >
            <h2 className="font-display text-2xl font-semibold text-foreground">
              {mode === "signin"
                ? "Welcome back."
                : "Create your account."}
            </h2>
            <p className="mt-2 text-sm text-foreground-muted">
              {mode === "signin"
                ? "Sign in with a one-time passcode — no password to remember."
                : "Join to access sessions, courses, and resources."}
            </p>

            {/* Method toggle */}
            <div className="mt-7 grid grid-cols-2 gap-2">
              {(["email", "mobile"] as Method[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMethod(m)}
                  className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-medium transition-colors ${
                    method === m
                      ? "border-brand bg-brand/10 text-brand"
                      : "border-border text-foreground-muted hover:text-foreground"
                  }`}
                >
                  {m === "email" ? (
                    <Mail className="h-4 w-4" strokeWidth={1.75} />
                  ) : (
                    <Phone className="h-4 w-4" strokeWidth={1.75} />
                  )}
                  {m === "email" ? "Email" : "Mobile"}
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-5">
              {mode === "register" && (
                <div>
                  <label htmlFor="a-name" className={LABEL}>
                    Full name
                  </label>
                  <input id="a-name" required placeholder="Your name" className={FIELD} />
                </div>
              )}

              {method === "email" ? (
                <div>
                  <label htmlFor="a-email" className={LABEL}>
                    Email
                  </label>
                  <input
                    id="a-email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className={FIELD}
                  />
                </div>
              ) : (
                <div>
                  <label htmlFor="a-mobile" className={LABEL}>
                    Mobile number
                  </label>
                  <input
                    id="a-mobile"
                    type="tel"
                    required
                    placeholder="+91 00000 00000"
                    className={FIELD}
                  />
                </div>
              )}

              {mode === "register" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="a-age" className={LABEL}>
                        Age
                      </label>
                      <input
                        id="a-age"
                        type="number"
                        min={13}
                        placeholder="28"
                        className={FIELD}
                      />
                    </div>
                    <div>
                      <label htmlFor="a-alt" className={LABEL}>
                        {method === "email" ? "Mobile" : "Email"}
                      </label>
                      <input
                        id="a-alt"
                        placeholder={method === "email" ? "Phone" : "Email"}
                        className={FIELD}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="a-occ" className={LABEL}>
                      Occupation
                    </label>
                    <select id="a-occ" defaultValue="" className={FIELD}>
                      <option value="" disabled>
                        Select occupation
                      </option>
                      {OCCUPATIONS.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>

            <button
              type="submit"
              className="mt-8 h-12 w-full rounded-full bg-brand text-[15px] font-semibold text-[#0a0a0a] transition-all hover:scale-[1.01] hover:bg-brand-hover"
            >
              Send one-time code
            </button>

            <p className="mt-5 text-center text-xs leading-relaxed text-muted">
              By continuing you agree to the Terms and Privacy Policy. A
              one-time passcode will be sent to your {method}.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
