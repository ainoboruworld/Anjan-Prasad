"use client";

import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  getServicePricing,
  formatTierPrice,
  type ServiceType,
  type PriceTier,
} from "@/lib/pricingConfig";
import { Eyebrow } from "../ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { track, EVENTS } from "@/lib/analytics";

/**
 * Pricing grid, driven entirely by `pricingConfig`. Cards render whatever
 * tiers the service defines — no amount is hardcoded here. Selecting a card
 * deep-links to the booking form with the tier pre-chosen and fires a
 * PostHog event; the display price will not change when backend pricing
 * takes over because cards reference tiers by stable id.
 */
export function PricingCards({
  serviceType,
  eyebrow = "Pricing",
  title,
  lead,
  bookingHref = "#book",
  onSelect,
  columns = 3,
}: {
  serviceType: ServiceType;
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  bookingHref?: string;
  /** Optional in-page handler (used when the form lives on the same page). */
  onSelect?: (tier: PriceTier) => void;
  columns?: 3 | 4;
}) {
  const { tiers } = getServicePricing(serviceType);
  const gridCols =
    columns === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section id="pricing" className="scroll-mt-28 border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
            {title}
          </h2>
          {lead && (
            <p className="mt-5 text-[length:var(--text-body)] leading-relaxed text-foreground-muted">
              {lead}
            </p>
          )}
        </Reveal>

        <RevealGroup className={`mt-14 grid gap-6 ${gridCols}`}>
          {tiers.map((tier) => (
            <RevealItem key={tier.id}>
              <PricingCard
                tier={tier}
                bookingHref={bookingHref}
                onSelect={onSelect}
                serviceType={serviceType}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function PricingCard({
  tier,
  bookingHref,
  onSelect,
  serviceType,
}: {
  tier: PriceTier;
  bookingHref: string;
  onSelect?: (tier: PriceTier) => void;
  serviceType: ServiceType;
}) {
  const select = () => {
    track(EVENTS.tierSelected, {
      serviceType,
      tierId: tier.id,
      price: formatTierPrice(tier),
    });
    onSelect?.(tier);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={`relative flex h-full flex-col rounded-[var(--radius-xl)] border p-8 ${
        tier.featured
          ? "border-brand/40 bg-background-elevated shadow-[var(--shadow-card-hover)]"
          : "border-border bg-background-elevated shadow-[var(--shadow-card)]"
      }`}
    >
      {tier.featured && (
        <span className="absolute right-6 top-6 rounded-full bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
          Most booked
        </span>
      )}

      <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
        {tier.label}
      </h3>
      {tier.caption && (
        <p className="mt-1 text-sm text-foreground-muted">{tier.caption}</p>
      )}

      <p className="mt-6 flex items-baseline gap-1.5">
        <span className="font-display text-4xl font-bold tracking-tight text-foreground">
          {formatTierPrice(tier)}
        </span>
        {tier.free && (
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-brand-sky">
            verification
          </span>
        )}
      </p>

      {tier.includes && (
        <ul className="mt-6 space-y-3 border-t border-border pt-6">
          {tier.includes.map((inc) => (
            <li
              key={inc}
              className="flex gap-3 text-sm leading-relaxed text-foreground"
            >
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-brand-sky"
                strokeWidth={2.5}
              />
              {inc}
            </li>
          ))}
        </ul>
      )}

      <a
        href={bookingHref}
        onClick={select}
        className={`group mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
          tier.featured
            ? "bg-brand text-brand-ink hover:bg-brand-hover"
            : "border border-border-strong text-foreground hover:bg-background-sunken"
        }`}
      >
        {tier.free ? "Apply with verification" : "Book this"}
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          strokeWidth={2}
        />
      </a>
    </motion.div>
  );
}
