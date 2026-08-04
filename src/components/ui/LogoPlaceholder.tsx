"use client";

import { useState } from "react";
import { logoFileFor } from "@/lib/brandLogos";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

/**
 * Company-logo tiles — compact, premium, fixed-height chips.
 *
 * Real coloured logos from public/brand-logos render on clean white chips at
 * one consistent height, so a wall reads evenly and no mark looks oversized.
 * A brand with no file yet falls back to a refined wordmark — no broken
 * images. To add a logo: drop `<file>.jpg` in public/brand-logos and map the
 * name in src/lib/brandLogos.ts.
 */

export interface LogoItem {
  name: string;
  /** File in public/brand-logos; resolved from the name when omitted. */
  file?: string;
}

/** A single logo tile. */
export function LogoChip({ name, file }: LogoItem) {
  const resolved = file ?? logoFileFor(name);
  const [failed, setFailed] = useState(false);

  if (resolved && !failed) {
    return (
      <div className="group flex h-[72px] items-center justify-center overflow-hidden rounded-2xl border border-border bg-white px-5 shadow-[var(--shadow-card)] ring-1 ring-black/[0.04] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]">
        {/* eslint-disable-next-line @next/next/no-img-element -- static logo asset, intrinsic size varies */}
        <img
          src={`/brand-logos/${resolved}`}
          alt={`${name} logo`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="max-h-9 w-auto max-w-[82%] object-contain"
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

/** A responsive grid of logo tiles — compact, up to six per row. */
export function LogoGrid({
  logos,
  className = "",
}: {
  logos: LogoItem[];
  className?: string;
}) {
  return (
    <RevealGroup
      className={`grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ${className}`}
    >
      {logos.map((logo) => (
        <RevealItem key={logo.name}>
          <LogoChip name={logo.name} file={logo.file} />
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
