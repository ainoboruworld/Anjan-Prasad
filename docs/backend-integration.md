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

```sql
-- Profiles: one row per auth user (auth.users.id).
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text,
  role text,                       -- set at onboarding; nullable after sign-up
  marketing_consent boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

-- Newsletter subscriptions.
create table if not exists public.newsletter_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  source text,
  created_at timestamptz not null default now()
);
```

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
