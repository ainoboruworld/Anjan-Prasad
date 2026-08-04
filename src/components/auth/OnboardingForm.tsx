"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { upsertProfile } from "@/lib/auth/service";
import { friendlyAuthError } from "@/lib/auth/errors";
import { USER_ROLES, type UserRole } from "@/lib/supabase/types";

/**
 * First-time onboarding — collects Full Name and Role and writes the profile
 * row to Supabase. On success the user is returned to the page they came
 * from. Returning users never reach this (they already have a profile).
 */
export function OnboardingForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { user, refreshProfile } = useAuth();

  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<UserRole | "">("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const redirectTo = sanitizeRedirect(params.get("redirect"));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!user) {
      setError("Your session has expired. Please sign in again.");
      return;
    }
    if (fullName.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (!role) {
      setError("Please select the option that best describes you.");
      return;
    }

    setBusy(true);
    const { error: err } = await upsertProfile({
      id: user.id,
      email: user.email ?? "",
      full_name: fullName,
      role,
    });
    if (err) {
      setBusy(false);
      setError(friendlyAuthError({ message: err }));
      return;
    }
    await refreshProfile();
    router.replace(redirectTo);
  };

  return (
    <form onSubmit={submit} className="space-y-8">
      <div>
        <label
          htmlFor="onb-name"
          className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted"
        >
          Full name
        </label>
        <input
          id="onb-name"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            if (error) setError("");
          }}
          required
          autoComplete="name"
          placeholder="Your full name"
          className="input"
        />
      </div>

      <fieldset>
        <legend className="mb-3 block text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
          Which best describes you?
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {USER_ROLES.map((r) => {
            const on = role === r;
            return (
              <label
                key={r}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-5 py-4 text-sm font-medium transition-all ${
                  on
                    ? "border-brand-sky bg-brand/5 text-foreground"
                    : "border-border-strong text-foreground-muted hover:border-border-strong hover:text-foreground"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={r}
                  checked={on}
                  onChange={() => {
                    setRole(r);
                    if (error) setError("");
                  }}
                  className="h-4 w-4 accent-[var(--brand-sky)]"
                />
                {r}
              </label>
            );
          })}
        </div>
      </fieldset>

      {error && (
        <p role="alert" className="text-sm font-medium text-red-500">
          {error}
        </p>
      )}

      <motion.button
        type="submit"
        disabled={busy}
        whileTap={{ scale: 0.99 }}
        className="group flex w-full items-center justify-center gap-2 rounded-full bg-brand py-4 text-[15px] font-semibold text-brand-ink shadow-[0_10px_30px_-10px_rgba(79,169,255,0.55)] transition-all hover:bg-brand-hover disabled:opacity-60"
      >
        {busy ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
            Saving…
          </>
        ) : (
          <>
            Complete setup
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
          </>
        )}
      </motion.button>
    </form>
  );
}

function sanitizeRedirect(value: string | null): string {
  if (!value) return "/";
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}
