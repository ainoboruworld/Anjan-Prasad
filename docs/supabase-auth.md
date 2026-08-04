# Authentication — Supabase Email OTP

Passwordless (Email OTP) authentication, implemented on the frontend and
ready to go live the moment the Supabase credentials are added. **The only
manual step is setting the two environment variables** below and creating the
`profiles` table.

## 1. Environment variables

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

Until these are set, the app runs normally: the header shows **Sign In**, and
the sign-in panel explains that auth activates once credentials are added.

## 2. Enable Email OTP (6-digit code)

In the Supabase dashboard → **Authentication → Providers → Email**:

- Enable **Email**.
- Ensure **"Confirm email"** / OTP is on.
- Edit the **Magic Link / OTP email template** so it sends the numeric code:
  include `{{ .Token }}` in the template (the app verifies a 6-digit code, not
  a magic link).

## 3. Profile table (profile data, separate from auth)

Authentication data lives in `auth.users`. Profile data lives here:

```sql
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  role text not null check (role in
    ('Student','Working Professional','Founder','Business Owner')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- A user can read and write only their own profile.
create policy "read own profile"  on public.profiles
  for select using (auth.uid() = id);
create policy "insert own profile" on public.profiles
  for insert with check (auth.uid() = id);
create policy "update own profile" on public.profiles
  for update using (auth.uid() = id);
```

Optional: a `bookings` table (used by **My Bookings**; the page degrades to an
empty state until it exists):

```sql
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  service_type text,
  program_type text,
  status text default 'Confirmed',
  created_at timestamptz not null default now()
);
```

## 4. Flow

```
Email → Supabase sends OTP → user enters code → verifyOtp
  → profile exists?  yes → restore session, return to previous page
                     no  → /onboarding (collect Full Name + Role)
                          → save profile → return to previous page
```

- **Returning users** never see onboarding.
- **Session restoration** is automatic on load; tokens auto-refresh, so
  reloads and returning visits stay signed in until sign-out or expiry.

## 5. Architecture (modular, extensible)

| Layer | File |
| --- | --- |
| Supabase client | `src/lib/supabase/client.ts` |
| Domain types | `src/lib/supabase/types.ts` |
| Auth + profile service | `src/lib/auth/service.ts` |
| Error mapping / validation | `src/lib/auth/errors.ts` |
| React context + `useAuth()` | `src/components/auth/AuthProvider.tsx` |
| Protected routes | `src/components/auth/ProtectedRoute.tsx` |
| UI: sign-in, OTP, onboarding, profile menu, account | `src/components/auth/*` |

Extending later (Google Sign-In, Phone OTP, dashboards) means adding a service
function and a UI entry point — the context, session handling, and route
guards already generalise.
