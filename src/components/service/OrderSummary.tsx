import { ShieldCheck } from "lucide-react";
import { formatTierPrice, type PriceTier } from "@/lib/pricingConfig";

/**
 * Order summary — the live price panel beside/above a booking form and the
 * confirmation block on checkout. Reads its amount from the resolved tier
 * (pricingConfig), never a hardcoded number, so it stays correct when the
 * backend becomes the source of truth for pricing.
 */
export function OrderSummary({
  serviceName,
  tier,
  compact = false,
}: {
  serviceName: string;
  tier: PriceTier | undefined;
  compact?: boolean;
}) {
  const isFree = !tier || tier.free || tier.amount === null;

  return (
    <div
      className={`rounded-3xl border border-border bg-background-sunken ${
        compact ? "p-5" : "p-6 sm:p-7"
      }`}
      aria-live="polite"
    >
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
        Order summary
      </p>

      <div className="mt-4 flex items-baseline justify-between gap-4 border-b border-border pb-4">
        <div>
          <p className="font-display text-base font-semibold text-foreground">
            {serviceName}
          </p>
          {tier && (
            <p className="mt-0.5 text-sm text-foreground-muted">
              {tier.label}
              {tier.caption ? ` · ${tier.caption}` : ""}
            </p>
          )}
        </div>
        <span className="shrink-0 font-display text-2xl font-bold tracking-tight text-foreground">
          {tier ? formatTierPrice(tier) : "—"}
        </span>
      </div>

      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-foreground-muted">
        <ShieldCheck
          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-sky"
          strokeWidth={2}
        />
        {isFree
          ? "No payment required. Your booking is confirmed after documents are verified."
          : "Final price is validated securely at checkout. Meeting link & confirmation email follow payment."}
      </p>
    </div>
  );
}
