"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { saveProfile } from "@/services/profile/profileService";
import { friendlyAuthError } from "@/lib/auth/errors";
import { profileSchema, type ProfileValues } from "@/lib/validation/schemas";
import { USER_ROLES } from "@/lib/supabase/types";

/**
 * First-time onboarding - RHF + Zod. Collects Full Name and Role and writes
 * the profile via the profile service, then returns the user to where they
 * came from. Returning users never reach this.
 */
export function OnboardingForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { user, refreshProfile } = useAuth();
  const redirectTo = sanitizeRedirect(params.get("redirect"));

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ProfileValues>({ resolver: zodResolver(profileSchema) });

  const onSubmit = handleSubmit(async (values) => {
    if (!user) {
      setError("root", { message: "Your session has expired. Please sign in again." });
      return;
    }
    const { error } = await saveProfile({
      id: user.id,
      email: user.email ?? "",
      full_name: values.full_name,
      role: values.role,
    });
    if (error) {
      setError("root", { message: friendlyAuthError({ message: error }) });
      return;
    }
    await refreshProfile();
    router.replace(redirectTo);
  });

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      <div>
        <label
          htmlFor="onb-name"
          className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted"
        >
          Full name
        </label>
        <input
          id="onb-name"
          autoComplete="name"
          placeholder="Your full name"
          className="input"
          aria-invalid={Boolean(errors.full_name)}
          {...register("full_name")}
        />
        {errors.full_name && (
          <p role="alert" className="mt-1.5 text-sm font-medium text-red-500">
            {errors.full_name.message}
          </p>
        )}
      </div>

      <fieldset>
        <legend className="mb-3 block text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
          Which best describes you?
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {USER_ROLES.map((r) => (
            <label
              key={r}
              className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border-strong px-5 py-4 text-sm font-medium text-foreground-muted transition-all hover:text-foreground has-[:checked]:border-brand-sky has-[:checked]:bg-brand/5 has-[:checked]:text-foreground"
            >
              <input
                type="radio"
                value={r}
                className="h-4 w-4 accent-[var(--brand-sky)]"
                {...register("role")}
              />
              {r}
            </label>
          ))}
        </div>
        {errors.role && (
          <p role="alert" className="mt-2 text-sm font-medium text-red-500">
            {errors.role.message}
          </p>
        )}
      </fieldset>

      {errors.root && (
        <p role="alert" className="text-sm font-medium text-red-500">
          {errors.root.message}
        </p>
      )}

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileTap={{ scale: 0.99 }}
        className="group flex w-full items-center justify-center gap-2 rounded-full bg-brand py-4 text-[15px] font-semibold text-brand-ink shadow-[0_10px_30px_-10px_rgba(79,169,255,0.55)] transition-all hover:bg-brand-hover disabled:opacity-60"
      >
        {isSubmitting ? (
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
