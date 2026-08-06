/**
 * Auth & profile domain types.
 *
 * Authentication data (email, session, identities) lives in Supabase's
 * `auth.users`. Profile data lives in a separate `public.profiles` table -
 * this `Profile` shape mirrors that table. See docs/supabase-auth.md.
 */

export const USER_ROLES = [
  "Student",
  "Working Professional",
  "Founder",
  "Business Owner",
] as const;

export type UserRole = (typeof USER_ROLES)[number];

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  /** E.164-ish phone captured at sign-up. Optional until provided. */
  phone?: string | null;
  /** Role is set during onboarding, so it can be absent right after sign-up. */
  role?: UserRole | null;
  /** Opt-in for updates, reminders, newsletters, and announcements. */
  marketing_consent?: boolean;
  created_at?: string;
  updated_at?: string;
}

/** Payload used to create or complete a profile (sign-up + onboarding + edits). */
export interface ProfileInput {
  id: string;
  email: string;
  full_name: string;
  phone?: string | null;
  role?: UserRole | null;
  marketing_consent?: boolean;
}
