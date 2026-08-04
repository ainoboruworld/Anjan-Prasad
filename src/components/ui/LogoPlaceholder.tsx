"use client";

import { useMemo, useState } from "react";
import {
  brandfetchLogo,
  logoDomainFor,
  logoFileFor,
} from "@/lib/brandLogos";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

/**
 * Company-logo tiles — compact, premium, perfectly uniform.
 *
 * Each tile is one fixed height with the logo centred and capped to the same
 * visual weight regardless of the source aspect ratio. The logo resolves in
 * order: latest official logo from the Brandfetch CDN (by domain) →
 * local file in public/brand-logos → a refined wordmark. No broken images.
 */

export interface LogoItem {
  name: string;
  domain?: string;
  file?: string;
}

/** A single logo tile. */
export function LogoChip({ name, domain, file }: LogoItem) {
  const candidates = useMemo(() => {
    const list: string[] = [];
    const d = domain ?? logoDomainFor(name);
    const f = file ?? logoFileFor(name);
    // Prefer the official local asset (renders reliably on the white chip in
    // both themes); fall back to the Brandfetch CDN only when we have no
    // local file. This avoids Brandfetch's occasional light-theme variants
    // that load as white/invisible on a white background.
    if (f) list.push(`/brand-logos/${f}`);
    if (d) list.push(brandfetchLogo(d));
    return list;
  }, [name, domain, file]);

  const [attempt, setAttempt] = useState(0);
  const src = candidates[attempt];

  if (src) {
    return (
      <div className="group flex h-[72px] items-center justify-center overflow-hidden rounded-2xl border border-border bg-white px-5 shadow-[var(--shadow-card)] ring-1 ring-black/[0.04] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]">
        {/* eslint-disable-next-line @next/next/no-img-element -- official logo hotlinked from Brandfetch CDN / static fallback */}
        <img
          key={src}
          src={src}
          alt={`${name} logo`}
          loading="lazy"
          onError={() => setAttempt((a) => a + 1)}
          className="max-h-8 w-auto max-w-[80%] object-contain"
        />
      </div>
    );
  }

  return (
    <div className="flex h-[72px] items-center justify-center rounded-2xl border border-border bg-gradient-to-b from-background-elevated to-background-sunken px-5 shadow-[var(--shadow-card)]">
      <span className="text-center font-display text-sm font-semibold leading-tight tracking-tight text-foreground/75">
        {name}
      </span>
    </div>
  );
}

/**
 * A responsive grid of logo tiles. Columns (2 / 3 / 6) are chosen so that
 * logo lists sized as multiples of 6 (e.g. 12, 18) fill every row exactly —
 * no ragged final row.
 */
export function LogoGrid({
  logos,
  className = "",
}: {
  logos: LogoItem[];
  className?: string;
}) {
  return (
    <RevealGroup
      className={`grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 ${className}`}
    >
      {logos.map((logo) => (
        <RevealItem key={logo.name}>
          <LogoChip name={logo.name} domain={logo.domain} file={logo.file} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

/** A titled group of logo tiles with an optional subtitle. */
export function LogoGroup({
  title,
  note,
  logos,
}: {
  title: string;
  note?: string;
  logos: LogoItem[];
}) {
  return (
    <div>
      <Reveal className="max-w-3xl">
        <h3 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h3>
        {note && (
          <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">
            {note}
          </p>
        )}
      </Reveal>
      <LogoGrid logos={logos} className="mt-7" />
    </div>
  );
}
