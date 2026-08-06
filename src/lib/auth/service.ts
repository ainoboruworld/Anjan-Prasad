/**
 * Auth service - the only module that talks to Supabase Auth and the
 * `profiles` table. UI and context call these functions; they never touch
 * the Supabase client directly. Every function returns a typed result so
 * callers can render loading/error/success states uniformly.
 */

import type { Session, User } from "@supabase/supabase-js";
import { getSupabaseClient } from "../supabase/client";
import type { Profile, ProfileInput } from "../supabase/types";

export type ServiceResult<T = void> = { data: T | null; error: string | null };

const NOT_CONFIGURED =
  "Authentication is not connected yet. Add the Supabase credentials to enable sign-in.";

/** Details captured on the Sign Up form before the account exists. */
export interface SignUpInput {
  fullName: string;
  email: string;
  phone: string;
  marketingConsent: boolean;
}

/**
 * Send a one-time passcode to the given email (passwordless).
 *
 * `create` decides whether a brand-new auth user may be created: `true` for
 * Sign Up, `false` for Log In (so logging in never silently creates an
 * account). Any `metadata` is attached to the auth user and mirrored into the
 * profile on first verify.
 */
export async function sendEmailOtp(
  email: string,
  opts: { create?: boolean; metadata?: Record<string, unknown> } = {}
): Promise<ServiceResult> {
  const supabase = getSupabaseClient();
  if (!supabase) return { data: null, error: NOT_CONFIGURED };
  // Request an email OTP: NO `emailRedirectTo` is passed — setting it makes
  // Supabase send a magic *link* instead of a code. Whether the recipient gets
  // a 6-digit code or a link is decided by the Supabase "Magic Link" email
  // template, which MUST use {{ .Token }} (not {{ .ConfirmationURL }}). See
  // docs/supabase-email-otp.md.
  const { error } = await supabase.auth.signInWithOtp({
    email: email.trim(),
    options: {
      shouldCreateUser: opts.create ?? true,
      data: opts.metadata,
    },
  });
  return { data: null, error: error ? error.message : null };
}

/** Log In: send an OTP but never create a new account for an unknown email. */
export async function sendSignInOtp(email: string): Promise<ServiceResult> {
  return sendEmailOtp(email, { create: false });
}

/** Sign Up: create the account on verify and carry the entered details. */
export async function sendSignUpOtp(input: SignUpInput): Promise<ServiceResult> {
  return sendEmailOtp(input.email, {
    create: true,
    metadata: {
      full_name: input.fullName.trim(),
      phone: input.phone.trim(),
      marketing_consent: input.marketingConsent,
    },
  });
}

/** Verify the emailed OTP and establish a session. */
export async function verifyEmailOtp(
  email: string,
  token: string
): Promise<ServiceResult<{ user: User; session: Session }>> {
  const supabase = getSupabaseClient();
  if (!supabase) return { data: null, error: NOT_CONFIGURED };
  const { data, error } = await supabase.auth.verifyOtp({
    email: email.trim(),
    token: token.trim(),
    type: "email",
  });
  if (error) return { data: null, error: error.message };
  if (!data.user || !data.session) {
    return { data: null, error: "Verification failed. Please try again." };
  }
  return { data: { user: data.user, session: data.session }, error: null };
}

/** Resend the OTP for an in-progress sign-in. */
export async function resendEmailOtp(email: string): Promise<ServiceResult> {
  return sendEmailOtp(email);
}

export async function signOut(): Promise<ServiceResult> {
  const supabase = getSupabaseClient();
  if (!supabase) return { data: null, error: NOT_CONFIGURED };
  const { error } = await supabase.auth.signOut();
  return { data: null, error: error ? error.message : null };
}

export async function getCurrentSession(): Promise<Session | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session ?? null;
}

/** Fetch the profile row for a user, or `null` if none exists yet. */
export async function getProfile(userId: string): Promise<ServiceResult<Profile>> {
  const supabase = getSupabaseClient();
  if (!supabase) return { data: null, error: NOT_CONFIGURED };
  const { data, error } = await supabase
    .from("profiles")
    .select(
      "id, full_name, email, phone, role, marketing_consent, created_at, updated_at"
    )
    .eq("id", userId)
    .maybeSingle();
  if (error) return { data: null, error: error.message };
  return { data: (data as Profile) ?? null, error: null };
}

/** Create or update a profile (onboarding + profile edits). */
export async function upsertProfile(
  input: ProfileInput
): Promise<ServiceResult<Profile>> {
  const supabase = getSupabaseClient();
  if (!supabase) return { data: null, error: NOT_CONFIGURED };
  const { data, error } = await supabase
    .from("profiles")
    .upsert(
      {
        id: input.id,
        email: input.email,
        full_name: input.full_name.trim(),
        ...(input.phone !== undefined ? { phone: input.phone } : {}),
        ...(input.role !== undefined ? { role: input.role } : {}),
        ...(input.marketing_consent !== undefined
          ? { marketing_consent: input.marketing_consent }
          : {}),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    )
    .select(
      "id, full_name, email, phone, role, marketing_consent, created_at, updated_at"
    )
    .single();
  if (error) return { data: null, error: error.message };
  return { data: data as Profile, error: null };
}
