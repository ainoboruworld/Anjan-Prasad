# Newsletter → Supabase

The newsletter lives **only in the website footer**. Submissions are stored in
Supabase via `src/lib/newsletter.ts` (`subscribeNewsletter`), which the footer
`Newsletter` component calls. No SDK is used — it posts to the Supabase REST
API. Until Supabase is configured, submissions fall back to the shared forms
layer so no signup is lost.

## Configuration

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

## Table

```sql
create table if not exists newsletter_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  source text,
  created_at timestamptz not null default now()
);

-- Allow anonymous inserts from the site (RLS).
alter table newsletter_subscriptions enable row level security;

create policy "anon can subscribe"
  on newsletter_subscriptions for insert
  to anon
  with check (true);
```

Re-subscribing is idempotent: the client sends
`Prefer: resolution=merge-duplicates` and the `email` column is unique.

## Data flow

1. Visitor submits the footer form (name + email).
2. `subscribeNewsletter` POSTs to `/rest/v1/newsletter_subscriptions`.
3. On success the row is stored (or merged on duplicate email).
4. If Supabase is not configured or the request fails, the submission is sent
   through the existing forms layer instead.
