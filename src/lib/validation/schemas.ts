/**
 * Zod schemas - the single validation layer, shared by every form.
 *
 * Forms bind these via `@hookform/resolvers/zod`; services can re-validate
 * the same shapes server-side. Validation lives here, never in components.
 */
import { z } from "zod";
import { USER_ROLES, type UserRole } from "@/lib/supabase/types";

export const emailField = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address");

export const phoneField = z
  .string()
  .min(6, "Please enter a valid phone number")
  .max(20, "Please enter a valid phone number");

/* ── Newsletter ─────────────────────────────────────────────────────────── */
export const newsletterSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: emailField,
});
export type NewsletterValues = z.infer<typeof newsletterSchema>;

/* ── Contact ────────────────────────────────────────────────────────────── */
export const contactSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: emailField,
  phone: phoneField,
  companyName: z.string().optional().or(z.literal("")),
  reason: z.string().min(1, "Please choose a reason"),
  message: z.string().min(10, "Please add a few lines so we can help"),
});
export type ContactValues = z.infer<typeof contactSchema>;

/* ── Auth ───────────────────────────────────────────────────────────────── */
export const authEmailSchema = z.object({ email: emailField });
export type AuthEmailValues = z.infer<typeof authEmailSchema>;

export const otpSchema = z.object({
  token: z.string().length(6, "Enter the 6-digit code"),
});
export type OtpValues = z.infer<typeof otpSchema>;

/* ── Onboarding / profile ───────────────────────────────────────────────── */
export const profileSchema = z.object({
  full_name: z.string().min(2, "Please enter your full name"),
  role: z.enum(USER_ROLES as unknown as [UserRole, ...UserRole[]], {
    message: "Please select the option that best describes you",
  }),
});
export type ProfileValues = z.infer<typeof profileSchema>;
