# Email OTP (not Magic Link) — Supabase setup

The app requests a one-time code and verifies it with a 6-digit input:

- `sendEmailOtp()` → `supabase.auth.signInWithOtp({ email, options })` with
  **no `emailRedirectTo`** (passing that forces a magic link).
- `verifyEmailOtp()` → `supabase.auth.verifyOtp({ email, token, type: "email" })`.
- UI uses the segmented `OtpInput` (`src/components/auth/OtpInput.tsx`).

The Supabase JS SDK has **no flag** that selects "OTP vs magic link" — the
recipient gets a **code** or a **link** based purely on the email template. If
a magic link is arriving, the template is still emitting a URL.

## Fix: make the template send a code

Supabase Dashboard → **Authentication → Email Templates → "Magic Link"**.
Replace the body so it uses **`{{ .Token }}`** (the 6-digit code) instead of
`{{ .ConfirmationURL }}`. For example:

```html
<h2>Your sign-in code</h2>
<p>Enter this 6-digit code to continue:</p>
<p style="font-size:28px;font-weight:700;letter-spacing:4px">{{ .Token }}</p>
<p>This code expires in 1 hour. If you didn't request it, ignore this email.</p>
```

Then, still in the Dashboard:

1. **Authentication → Providers → Email** — ensure Email is enabled. "Confirm
   email" can stay on; OTP works either way.
2. Save. New sign-ins now receive the numeric code; the existing UI verifies it.

## Optional — deliver via Resend
For reliable delivery and higher limits, point **Authentication → Emails →
SMTP** at Resend (`smtp.resend.com:465`, user `resend`, password = your
`RESEND_API_KEY`, sender = a verified address). The OTP template above is used
regardless of the SMTP provider.

## Note
This is a Supabase project configuration change (dashboard), not a code change —
the code already requests OTP correctly. It can't be set from the client SDK.
