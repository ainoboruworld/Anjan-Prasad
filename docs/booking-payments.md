# Booking & Payments Architecture

The Consultation and Business Advisory pages share one booking and payment
architecture. The frontend is intentionally **decoupled from pricing logic**:
it displays prices for UX but never treats them as authoritative.

## Single source of truth for display pricing

`src/lib/pricingConfig.ts` holds every price. Nothing else hardcodes an
amount — pricing cards, order summaries, and booking forms all read tiers
from here by stable `id`.

```
getServicePricing(serviceType) → { tiers }
getTier(serviceType, tierId)   → PriceTier
formatTierPrice(tier)          → "₹499" | "₹9,999/month" | "Free"
```

## The reusable form

`src/components/service/DynamicBookingForm.tsx` is config-driven. Each page
declares an array of `BookingVariant`s (audience/program tabs). A variant
resolves its tier either from a fixed id or from a form field (e.g. the
student's *level* select), and runs in one of two modes:

- `payment` — submits the lead, then routes to `/payment` (checkout).
- `verification` — the BPL/free flow: uploads a document, no payment.

## What the frontend sends

Only the service/program identity plus form data — **never** an
authoritative price:

```jsonc
{
  "formType": "Consultation",
  "name": "…", "email": "…", "phone": "…", "company": "…",
  "data": {
    "service_type": "consultation",   // ServiceType
    "program_type": "student",        // variant id
    "tier_id": "ug",                  // stable pricing key
    /* ...labelled form fields... */
  }
}
```

## Backend flow (Cashfree + Supabase)

When the backend replaces display pricing, **no component changes**:

1. Frontend posts `{ service_type, program_type, tier_id, ...formData }`.
2. Backend re-derives and **validates** the amount from its own pricing
   table keyed by `service_type` + `tier_id` — the client amount is ignored.
3. Backend creates a **Cashfree order** and returns the checkout session.
4. The **Cashfree webhook** marks the order paid and updates **Supabase**
   (`bookings` row: status, payment id, tier, amount).
5. On success, the backend sends the **confirmation email** and the
   **meeting / joining details**.

BPL bookings skip steps 2–4: the uploaded certificate is verified, and on
approval the same confirmation + meeting email is sent at no cost.

## Analytics

Important actions are instrumented via `src/lib/analytics.ts` (`track` +
`EVENTS`), a dependency-free PostHog wrapper that captures through
`window.posthog` when present and no-ops otherwise. Wiring the real PostHog
key later requires no call-site changes.

## Swapping display pricing for backend pricing

Because tiers are referenced by `id`, the migration is a backend-only change:
point the pricing lookups at the server and keep `pricingConfig.ts` (or a
generated copy) as the display mirror. The UI contract is unchanged.
