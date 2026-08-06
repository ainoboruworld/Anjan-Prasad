/**
 * Pricing - single source of truth (Anjan Prasad).
 *
 * During development, prices are DISPLAYED from this file so the UI is
 * immediately populated. Nothing in a component hardcodes a rupee amount;
 * every price is read from here through the helpers below.
 *
 * When Cashfree is integrated the contract does not change for the UI:
 *   • the frontend sends only `serviceType` + `tierId` + form data,
 *   • the backend re-derives and VALIDATES the amount (never trusts the
 *     client), creates the Cashfree order, and the webhook updates Supabase,
 *   • confirmation email + meeting/joining details are sent server-side.
 * Because components reference tiers by stable `id`, swapping these display
 * amounts for backend-authoritative pricing needs no component changes.
 */

export type ServiceType = "consultation" | "business-advisory";
export type Interval = "one-time" | "month";

export interface PriceTier {
  /** Stable key sent to the backend - never localise or reorder-couple this. */
  id: string;
  /** Human label shown in pricing cards and order summaries. */
  label: string;
  /** Short qualifier under the label (audience / cadence). */
  caption?: string;
  /** Display amount in INR. `null` means no fixed price (free / verification). */
  amount: number | null;
  interval?: Interval;
  /** BPL / concession flow - no payment, verification instead. */
  free?: boolean;
  /** Marketing highlight on the pricing grid. */
  featured?: boolean;
  /** Bullets rendered inside the pricing card. */
  includes?: string[];
}

export interface ServicePricing {
  serviceType: ServiceType;
  currency: "INR";
  tiers: PriceTier[];
}

/* ───────────────────────────── Consultation ───────────────────────────── */

export const CONSULTATION_PRICING: ServicePricing = {
  serviceType: "consultation",
  currency: "INR",
  tiers: [
    {
      id: "kpg-12",
      label: "KPG-12",
      caption: "School students",
      amount: 499,
      includes: ["30-min 1:1 session", "Stream & path clarity", "Written next step"],
    },
    {
      id: "ug",
      label: "Undergraduate",
      caption: "UG students",
      amount: 999,
      includes: ["30-min 1:1 session", "Career & skill roadmap", "Written next step"],
    },
    {
      id: "pg",
      label: "Postgraduate",
      caption: "PG students",
      amount: 999,
      includes: ["30-min 1:1 session", "Career & specialisation call", "Written next step"],
    },
    {
      id: "exp-1-3",
      label: "1-3 Years",
      caption: "Early-career professionals",
      amount: 1499,
      includes: ["30-min 1:1 session", "Growth vs. ownership read", "Written action plan"],
    },
    {
      id: "exp-3-6",
      label: "3-6 Years",
      caption: "Mid-career professionals",
      amount: 1999,
      featured: true,
      includes: ["30-min 1:1 session", "Career or venture decision", "Written action plan"],
    },
    {
      id: "exp-6-12",
      label: "6-12 Years",
      caption: "Senior professionals",
      amount: 2999,
      includes: ["30-min 1:1 session", "Leadership / pivot strategy", "Written action plan"],
    },
    {
      id: "bpl",
      label: "BPL Candidate",
      caption: "Verification required",
      amount: null,
      free: true,
      includes: ["Full consultation, at no cost", "Document verification", "Same written next step"],
    },
  ],
};

/* ──────────────────────────── Business Advisory ───────────────────────── */

export const BUSINESS_ADVISORY_PRICING: ServicePricing = {
  serviceType: "business-advisory",
  currency: "INR",
  tiers: [
    {
      id: "demo",
      label: "Business Growth Demo",
      caption: "Start here",
      amount: 99,
      includes: [
        "3-hour live working session",
        "The 0 → 1 → Scale framework",
        "Live business Q&A",
      ],
    },
    {
      id: "cohort",
      label: "Business Growth Cohort",
      caption: "Structured program",
      amount: 5999,
      featured: true,
      includes: [
        "Multi-week structured curriculum",
        "Live cohort sessions & accountability",
        "Playbooks, templates & community",
      ],
    },
    {
      id: "advisory",
      label: "Business Advisory",
      caption: "Ongoing partnership",
      amount: 9999,
      interval: "month",
      includes: [
        "Dedicated monthly advisory",
        "Systems installed with your team",
        "Outcomes measured in the P&L",
      ],
    },
  ],
};

/* ─────────────────────────────── Registry ─────────────────────────────── */

const REGISTRY: Record<ServiceType, ServicePricing> = {
  consultation: CONSULTATION_PRICING,
  "business-advisory": BUSINESS_ADVISORY_PRICING,
};

export function getServicePricing(serviceType: ServiceType): ServicePricing {
  return REGISTRY[serviceType];
}

export function getTier(
  serviceType: ServiceType,
  tierId: string
): PriceTier | undefined {
  return REGISTRY[serviceType].tiers.find((t) => t.id === tierId);
}

/** Format an INR amount with Indian digit grouping. */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Display string for a tier: "₹499", "₹9,999/month", or "Free".
 * The single place UI turns a tier into human-readable pricing.
 */
export function formatTierPrice(tier: PriceTier): string {
  if (tier.free || tier.amount === null) return "Free";
  const base = formatINR(tier.amount);
  return tier.interval === "month" ? `${base}/month` : base;
}
