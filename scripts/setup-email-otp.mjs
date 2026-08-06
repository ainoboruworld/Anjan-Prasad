#!/usr/bin/env node
/**
 * Switch Supabase Auth from Magic Link to Email OTP — end to end.
 *
 * The client already requests an OTP (signInWithOtp, no emailRedirectTo), but
 * whether the email contains a 6-digit CODE or a LINK is decided by the project
 * auth config, not the SDK. This script sets the "Magic Link" email template to
 * one that renders {{ .Token }} (the code), so requesting a login sends an OTP.
 *
 * Run:
 *   SUPABASE_ACCESS_TOKEN=sbp_xxx node scripts/setup-email-otp.mjs
 *
 * Requirements:
 *   - SUPABASE_ACCESS_TOKEN — a Supabase *personal access token* (create at
 *     https://supabase.com/dashboard/account/tokens). This is NOT the anon or
 *     service_role key; the Management API needs a PAT.
 *   - Project ref — taken from SUPABASE_PROJECT_REF, or derived from
 *     NEXT_PUBLIC_SUPABASE_URL in .env.local / the environment.
 */
import { readFileSync } from "node:fs";

function loadDotEnvLocal() {
  try {
    for (const line of readFileSync(".env.local", "utf8").split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#") || !t.includes("=")) continue;
      const i = t.indexOf("=");
      const k = t.slice(0, i).trim();
      if (!(k in process.env)) process.env[k] = t.slice(i + 1).trim();
    }
  } catch {
    /* no .env.local — rely on the real environment */
  }
}
loadDotEnvLocal();

const PAT = process.env.SUPABASE_ACCESS_TOKEN;
const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const ref =
  process.env.SUPABASE_PROJECT_REF ||
  (url.match(/^https:\/\/([a-z0-9]+)\.supabase\.co/i)?.[1] ?? "");

if (!PAT) {
  console.error(
    "Missing SUPABASE_ACCESS_TOKEN (a personal access token, sbp_...).\n" +
      "Create one at https://supabase.com/dashboard/account/tokens and re-run:\n" +
      "  SUPABASE_ACCESS_TOKEN=sbp_xxx node scripts/setup-email-otp.mjs"
  );
  process.exit(1);
}
if (!ref) {
  console.error("Could not determine the project ref (set SUPABASE_PROJECT_REF).");
  process.exit(1);
}

const otpTemplate = (heading, action) => `<h2>${heading}</h2>
<p>Enter this 6-digit code to ${action}:</p>
<p style="font-size:28px;font-weight:700;letter-spacing:6px;margin:16px 0">{{ .Token }}</p>
<p style="color:#5b6b7a;font-size:13px">This code expires in {{ .OTPExpiry }} minutes. If you didn't request it, you can ignore this email.</p>`;

const body = {
  // Log In (existing user) uses the "Magic Link" template…
  mailer_subjects_magic_link: "Your Anjan Prasad sign-in code",
  mailer_templates_magic_link_content: otpTemplate("Your sign-in code", "finish signing in"),
  // …and Sign Up (new user) uses the "Confirm signup" template. Both must
  // render {{ .Token }} so the whole flow is OTP, never a link.
  mailer_subjects_confirmation: "Confirm your email — your code",
  mailer_templates_confirmation_content: otpTemplate("Confirm your email", "create your account"),
  // OTP validity (seconds). 1 hour.
  mailer_otp_exp: 3600,
};

const endpoint = `https://api.supabase.com/v1/projects/${ref}/config/auth`;

console.log(`Updating auth email config for project ${ref} …`);
const res = await fetch(endpoint, {
  method: "PATCH",
  headers: {
    Authorization: `Bearer ${PAT}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

if (!res.ok) {
  const text = await res.text();
  console.error(`Failed (${res.status}): ${text}`);
  process.exit(1);
}
console.log(
  "✓ Done. The Magic Link template now sends a 6-digit OTP.\n" +
    "  Request a login and confirm the email contains a code, not a link."
);
