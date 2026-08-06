-- ─────────────────────────────────────────────────────────────────────────
-- Anjan Prasad — initial schema
--
-- Designed from the existing frontend: authentication/profiles, the contact
-- form, all booking flows (consultation, demo, cohort, monthly advisory), and
-- newsletter subscriptions. UUID PKs, timestamps, FKs, indexes and RLS
-- throughout. Public forms allow anonymous INSERT under RLS; reads are locked
-- to the owning user. Run in the Supabase SQL editor (or `supabase db push`).
-- ─────────────────────────────────────────────────────────────────────────

create extension if not exists "pgcrypto";

-- Keep updated_at fresh on any UPDATE.
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ── profiles ─────────────────────────────────────────────────────────────
-- One row per auth user, created automatically on first sign-up (see trigger).
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null default '',
  email text not null,
  phone text,
  role text check (role in ('Student','Working Professional','Founder','Business Owner')),
  marketing_consent boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;

create policy "Profiles are viewable by their owner"
  on public.profiles for select using (auth.uid() = id);
create policy "Users can insert their own profile"
  on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

-- Auto-create the profile from auth metadata on first sign-up.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, phone, marketing_consent)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.raw_user_meta_data ->> 'phone',
    coalesce((new.raw_user_meta_data ->> 'marketing_consent')::boolean, true)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── newsletter_subscriptions ─────────────────────────────────────────────
create table if not exists public.newsletter_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  source text,
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscriptions enable row level security;

-- Public subscribe: anyone may insert (idempotent upsert on unique email);
-- nobody may read the list from the client.
create policy "Anyone can subscribe"
  on public.newsletter_subscriptions for insert to anon, authenticated with check (true);
create policy "No public read of subscribers"
  on public.newsletter_subscriptions for select using (false);

-- ── contact_submissions ──────────────────────────────────────────────────
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  company_name text,
  reason text not null,
  message text not null,
  source_page text,
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_email_idx on public.contact_submissions (email);
create index if not exists contact_submissions_created_at_idx on public.contact_submissions (created_at desc);

alter table public.contact_submissions enable row level security;

create policy "Anyone can send a contact message"
  on public.contact_submissions for insert to anon, authenticated with check (true);
create policy "Users can read their own messages"
  on public.contact_submissions for select using (auth.uid() = user_id);

-- ── bookings ─────────────────────────────────────────────────────────────
-- One table for every paid/verified flow. Common columns are first-class;
-- variant-specific answers live in `payload` (jsonb) so new offerings need no
-- migration. `status` tracks the lead → payment → confirmation lifecycle.
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  service_type text not null,               -- 'consultation' | 'business-advisory'
  program_type text,                        -- 'Consultation' | 'Demo Session' | 'Business Growth Program' | 'Business Advisory'
  tier_id text,
  full_name text not null,
  email text not null,
  phone text,
  company text,
  amount integer,                           -- INR, minor unit-free; null for free/verification
  currency text not null default 'INR',
  status text not null default 'new'
    check (status in ('new','pending_payment','paid','verifying','confirmed','cancelled')),
  order_id text,
  payment_ref text,
  payload jsonb not null default '{}'::jsonb,
  source_page text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists bookings_email_idx on public.bookings (email);
create index if not exists bookings_user_id_idx on public.bookings (user_id);
create index if not exists bookings_created_at_idx on public.bookings (created_at desc);
create index if not exists bookings_status_idx on public.bookings (status);

create trigger bookings_set_updated_at
  before update on public.bookings
  for each row execute function public.set_updated_at();

alter table public.bookings enable row level security;

-- Anyone can create a booking (guests book too). A logged-in user may read the
-- bookings they own or that were made with their email.
create policy "Anyone can create a booking"
  on public.bookings for insert to anon, authenticated with check (true);
create policy "Users can read their own bookings"
  on public.bookings for select using (
    auth.uid() = user_id
    or (auth.jwt() ->> 'email') = email
  );
