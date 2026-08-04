# Frontend Architecture — Backend-Ready

AP.com's frontend is structured so that connecting the backend is **wiring, not
rebuilding**. Every integration point already exists behind a service; UI never
holds business logic; all config flows through one env module.

> Framework note: the app runs on **Next.js (App Router)**, chosen to preserve
> the existing routing, SSR, image/font optimisation, and the auth/CMS/services
> layers. The service/validation/query architecture below is framework-agnostic;
> the `VITE_*` names in `.env.example` map 1:1 if ever ported to Vite.

## Layers

| Concern | Location |
| --- | --- |
| Environment (single source) | `src/lib/env.ts`, `.env.example` |
| Service layer (API surface) | `src/services/*` |
| Validation (Zod) | `src/lib/validation/schemas.ts` |
| Reusable RHF fields | `src/components/ui/form/fields.tsx` |
| Server state (TanStack Query) | `src/lib/query/*`, `src/hooks/queries/*`, `src/hooks/mutations/*` |
| Auth state | `src/components/auth/AuthProvider.tsx` |
| Theme state | `next-themes` (dark default, persisted) |
| Payments (Cashfree) | `src/services/payments/*`, `src/app/api/payments/*` |

## Services (`src/services/`)

```
auth/            consultation/     business-advisory/
newsletter/      contact/          blogs/
media/           profile/          payments/
```

Each service exposes reusable functions returning `ServiceResponse<T>`. They
wrap the current implementations (Supabase, Sanity, forms) and expose mock
fallbacks so the UI works before the backend exists. Components and query hooks
import from services — never from `@/lib/supabase` or `@/lib/sanity` directly.

## Forms

Every form separates **UI / validation / API**:

- UI: `src/components/ui/form/fields.tsx` (RHF-aware `TextField`, `SelectField`,
  `TextareaField`) + the form component.
- Validation: `src/lib/validation/schemas.ts` (Zod), bound via
  `@hookform/resolvers/zod`.
- API: the matching service in `src/services/*`.

Converted: Contact, Newsletter, Onboarding. Auth (Email OTP) uses a bespoke
multi-step flow with the same Zod schemas. The config-driven `DynamicBookingForm`
already emits `{ service_type, program_type, tier_id, … }` and can be pointed at
`consultationService` / `advisoryService` with no UI change.

## State management

- **Server state** → TanStack Query (`QueryProvider` in the root layout;
  `queryKeys` in `src/lib/query/keys.ts`). Example: `useBookings`,
  `useMediaFeatures`, `useNewsletterSubscribe`.
- **Auth state** → `AuthProvider` / `useAuth()`.
- **Theme state** → `next-themes`.
- **UI state** → local `useState`.

## Payments (Cashfree)

The client calls `paymentsService.createPaymentOrder()` → `POST
/api/payments/create-order`. The **server** re-derives the amount from
`pricingConfig` (never trusting the client), and is where the Cashfree order
creation + Supabase booking insert go. `POST /api/payments/webhook` is the
Cashfree → Supabase + Resend seam. No payment logic lives in UI.

## Connecting the backend (~1 hour)

1. Fill `.env.local` from `.env.example` (Supabase, Sanity, Cashfree, PostHog).
2. Create the Supabase tables (`docs/supabase-auth.md`) — auth, `profiles`,
   `bookings`, `newsletter_subscriptions`.
3. Deploy the Sanity studio (`docs/sanity-cms.md`); blogs go live automatically.
4. Implement the Cashfree calls inside `src/app/api/payments/*` (marked TODO).
5. Add the PostHog snippet/key — `track()` events already fire.
6. Add the Resend send in the payment webhook for confirmations.

No component, routing, or layout changes are required.
