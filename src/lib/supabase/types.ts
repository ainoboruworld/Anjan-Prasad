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
  role: UserRole;
  created_at?: string;
  updated_at?: string;
}

/** Payload the onboarding form sends to create/complete a profile. */
export interface ProfileInput {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
}
