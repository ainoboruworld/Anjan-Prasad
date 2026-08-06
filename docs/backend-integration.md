# Backend integration guide

The frontend is wired to connect to Supabase, Resend and Sanity with minimal
changes. All configuration flows through `src/lib/env.ts`; every integration
degrades gracefully until its credentials exist (`flags` in that file).

## Where the wiring lives

| Concern        | UI calls…                         | Implementation             | Backend            |
| -------------- | --------------------------------- | -------------------------- | ------------------ |
| Auth (OTP)     | `services/auth/authService`       | `lib/auth/service.ts`      | Supabase Auth      |
| Profiles       | `services/profile/profileService` | `lib/auth/service.ts`      | Supabase `profiles`|
| CMS / blogs    | `services/blogs/blogService`      | `lib/sanity.ts`, `blog.ts` | Sanity (GROQ)      |
| Forms/bookings | `services/*` + `lib/forms.ts`     | `lib/forms.ts`             | Supabase / Sheets  |
| Newsletter     | `services/newsletter`             | `lib/newsletter.ts`        | Supabase           |
| Email          | server routes                     | Resend (`RESEND_API_KEY`)  | Resend             |
| Payments       | `services/payments`               | `app/api/payments/*`       | Cashfree           |

Components never import a client SDK or read `process.env` directly - they call
a service, and services return a uniform `{ data, error }`. To connect a
backend, fill `.env.local` (see `.env.example`) and, if needed, edit only the
matching `lib/*` implementation.

## Supabase schema

The full schema lives in **`supabase/migrations/0001_init.sql`** — four tables,
derived directly from the frontend:

| Table                     | Backs                                   | Client write        | Read            |
| ------------------------- | --------------------------------------- | ------------------- | --------------- |
| `profiles`                | Auth users (auto-created on sign-up)    | owner only          | owner only      |
| `newsletter_subscriptions`| Footer newsletter                       | anyone (insert)     | none (client)   |
| `contact_submissions`     | Contact form                            | anyone (insert)     | owner only      |
| `bookings`                | Consultation / Demo / Cohort / Advisory | anyone (insert)     | owner (by id or email) |

Design notes: UUID PKs, `created_at`/`updated_at` (auto-touched via trigger),
FKs to `auth.users`, indexes on `email` / `user_id` / `created_at` / `status`,
and RLS on every table. `bookings` keeps common fields as columns and
variant-specific answers in a `payload` jsonb, so new offerings need no
migration.

### Apply it

1. Open the Supabase SQL editor for the project and paste
   `supabase/migrations/0001_init.sql`, or run `supabase db push` if you use
   the CLI.
2. This also installs `handle_new_user()` + the `on_auth_user_created` trigger,
   which **auto-creates the profile from the sign-up metadata** on first login.

## Auth flow (email OTP, passwordless)

- **Sign Up** (`/sign-up`): name + email + phone + default-on comms consent →
  `sendSignUpOtp()` (attaches `full_name`, `phone`, `marketing_consent` to the
  auth user metadata, `shouldCreateUser: true`) → verify → `upsertProfile()`.
- **Log In** (`/sign-in`): email → `sendSignInOtp()` (`shouldCreateUser: false`,
  so an unknown email is guided to sign-up) → verify → session.
- Configure Supabase Auth: enable Email provider, "Email OTP" (6-digit), and
  set the email template. `RESEND_API_KEY` is used by server routes for any
  additional marketing/transactional mail beyond Supabase's own OTP send.

## Recommendation before integrating

1. Create the tables above and enable RLS.
2. Add Supabase env vars first - auth, profiles, and newsletter light up with
   no code changes.
3. Point Supabase Auth's SMTP at Resend so OTP + comms share one sender.
4. Add Sanity env vars to switch the Knowledge Hub from the local seed to live
   content.
