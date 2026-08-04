/**
 * Maps Supabase / network errors to clean, user-friendly messages.
 * One place so every auth surface speaks the same language.
 */

interface ErrorLike {
  message?: string;
  status?: number;
  code?: string;
  name?: string;
}

export function friendlyAuthError(err: unknown): string {
  if (!err) return "Something went wrong. Please try again.";

  const e = err as ErrorLike;
  const msg = (e.message ?? "").toLowerCase();
  const code = (e.code ?? "").toLowerCase();
  const status = e.status ?? 0;

  // Rate limiting / too many requests
  if (status === 429 || code.includes("rate") || msg.includes("rate limit")) {
    return "Too many attempts. Please wait a minute and try again.";
  }

  // Expired or incorrect OTP
  if (
    msg.includes("expired") ||
    msg.includes("invalid") ||
    code.includes("otp_expired") ||
    code.includes("invalid_token")
  ) {
    return "That code has expired or is incorrect. Request a new one.";
  }

  // Invalid email
  if (msg.includes("email") && (msg.includes("invalid") || msg.includes("valid"))) {
    return "Please enter a valid email address.";
  }

  // Network / fetch failures
  if (
    e.name === "TypeError" ||
    msg.includes("failed to fetch") ||
    msg.includes("network") ||
    msg.includes("timeout")
  ) {
    return "Network error. Check your connection and try again.";
  }

  // Signups disabled / not allowed
  if (msg.includes("signups not allowed") || msg.includes("not allowed")) {
    return "Sign-ups are currently closed. Please contact support.";
  }

  // Fall back to the raw message when it is presentable, else a generic line.
  return e.message && e.message.length < 120
    ? e.message
    : "Something went wrong. Please try again.";
}

/** Basic email shape check for inline validation. */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
