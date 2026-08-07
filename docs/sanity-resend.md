# Sanity CMS + Resend email — setup & operations

Both integrate through the existing config pattern (`src/lib/env.ts` + `flags`)
and degrade gracefully: with nothing configured the site still builds and runs
on its built-in content, and email is simply skipped.

## Environment variables

Add to `.env.local` (git-ignored) and to your host (Vercel → Settings → Env):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=w0h41l91
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=skRmSHyIkSvGdSgvCwrcbknlLwtVv4a8O1nCkfRb1nHjd6EEzm8ABLTktplSn4Svu1FQft5WwDeYJSR46VwCNSo6bwtqeVOXRcuKHegL8dGHbXxvKlntqPcMRske52eQuh6Ks45waiSg2uufvAnjEJGOinfCYjo75RfXLB4SoJff3CAcZWIc      # server-only

RESEND_API_KEY=<re_...>                        # server-only
RESEND_FROM_EMAIL=Anjan Prasad <hello@your-verified-domain>
NOTIFY_ADMIN_EMAIL=performance@noboruworld.com
```

## Resend (transactional email) — done

- Server-only client: `src/lib/email/resend.ts`. Templates:
  `src/lib/email/templates.ts` (one branded shell, admin + customer variants).
  Dispatcher: `src/lib/email/notify.ts`.
- Endpoint: `POST /api/emails` (`src/app/api/emails/route.ts`) — validates with
  Zod, always returns 200 so email never breaks a flow. Secret stays server-side.
- Client trigger: `src/lib/emailClient.ts` → `notifyEmail(kind, payload)`, called
  **after** the Supabase write in each flow:
  - Contact → `contactService`
  - Consultation → `consultationService`
  - Demo Session → `DemoForm` + advisory (demo tier)
  - Monthly Advisory / Business Growth → `MonthlyConsultingForm` + advisory
  - Newsletter welcome → `useNewsletterSubscribe`
- Order guaranteed: **DB write first, email after; email failure is swallowed**
  (`void notifyEmail(...)`), so storage always succeeds.

### Manual setup
1. In Resend, **verify a sending domain** and set `RESEND_FROM_EMAIL` to an
   address on it (the `onboarding@resend.dev` default only sends to your own
   Resend account email).
2. Optional but recommended — **Supabase Auth SMTP via Resend**: Supabase →
   Auth → Emails → SMTP → host `smtp.resend.com`, port `465`, user `resend`,
   password = your `RESEND_API_KEY`, sender = your verified address. This routes
   the login OTP through Resend and lifts Supabase's built-in rate limit.

## Sanity (CMS)

- **Studio** runs from the repo via the Sanity CLI (kept out of the Next build
  for a clean, fast production bundle):
  ```
  npm run studio          # local Studio at http://localhost:3333
  npm run studio:deploy   # hosted Studio at <project>.sanity.studio
  ```
  Config: `sanity.config.ts`, `sanity.cli.ts`. Schema: `sanity/schemas/`
  (`content.ts` adds all the site content types).
- **Content model** (authorable now): site settings (contact, socials,
  copyright, logo), global SEO, navbar, footer, homepage, about page, service
  pages (Business Advisory / Demo / Monthly Advisory / Consultation),
  testimonials, FAQs, case studies, featured media, brand/client logos, and
  blog posts.
- **Read layer** (dependency-free GROQ, with fallback): `src/lib/cms.ts`
  (`getSiteSettings`, `getTestimonials`, `getFaqs`) and the existing
  `src/lib/sanity.ts` for blogs. Every fetcher returns `null`/`[]` when a
  document isn't authored yet, so components fall back to the built-in content.
- **Wired now:** Knowledge Hub blogs (existing) and the Testimonials page
  (`/testimonials`) read from Sanity with fallback.

### Wiring remaining pages
The pattern is intentionally uniform — the schema + fetchers are in place, so
connecting any remaining page is a small, low-risk change:

1. Add a fetcher in `src/lib/cms.ts` (GROQ for the singleton/collection).
2. In the page (a server component), `await` it and use it **only if present**,
   otherwise keep the current constant from `src/lib/data.ts`.

This keeps the UI identical until an editor publishes, so nothing breaks. Do the
homepage/about/service-page hero + stats first (highest value), then FAQs and
case studies, using the Testimonials page as the reference implementation.

### Manual setup
1. `npm run studio:deploy` (or run locally) and **create the singleton
   documents** (Site settings, SEO, Homepage, About, one Service page per slug,
   Navbar, Footer) plus your testimonials/FAQs/logos.
2. Add an API token (Sanity → API → Tokens, *Viewer* is enough for reads) as
   `SANITY_API_TOKEN` if you later add server-side writes; public reads work
   with just the project id/dataset.
3. Ensure the dataset is **public** (or configure a token) so the site can read
   it at runtime.

## Vercel
Set every variable above in Project → Settings → Environment Variables, then
**redeploy** — `NEXT_PUBLIC_*` values are inlined at build time.
