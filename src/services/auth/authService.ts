/**
 * Auth service — the frontend's auth API surface.
 *
 * Wraps the Supabase auth implementation so components and hooks import from
 * one stable place. When backend auth changes, only this module + the
 * underlying implementation move.
 */
export {
  sendEmailOtp,
  verifyEmailOtp,
  resendEmailOtp,
  signOut,
  getCurrentSession,
  getProfile,
  upsertProfile,
  type ServiceResult,
} from "@/lib/auth/service";

export { friendlyAuthError, isValidEmail } from "@/lib/auth/errors";
