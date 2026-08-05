"use client";

import { useState } from "react";
import { logoFileFor } from "@/lib/brandLogos";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

/**
 * Company-logo tiles — compact, premium, and perfectly uniform.
 *
 * Every logo is delivered as the same 212×72 mark on a clean white field, so a
 * single fixed-height white chip renders each one at identical size, padding,
 * and visual weight — the wall reads even across every group and in both Light
 * and Dark modes. If a name has no artwork it degrades to a refined wordmark.
 */

export interface LogoItem {
  name: string;
  file?: string;
}

/** A single logo tile. */
export function LogoChip({ name, file }: LogoItem) {
  const src = file ?? logoFileFor(name);
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <div className="group flex h-[76px] items-center justify-center overflow-hidden rounded-2xl border border-border bg-white px-6 shadow-[var(--shadow-card)] ring-1 ring-black/[0.04] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]">
        {/* eslint-disable-next-line @next/next/no-img-element -- static, pre-optimised brand artwork */}
        <img
          src={`/brand-logos/${src}`}
          alt={`${name} logo`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="max-h-[44px] w-auto max-w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className="flex h-[76px] items-center justify-center rounded-2xl border border-border bg-white px-6 shadow-[var(--shadow-card)] ring-1 ring-black/[0.04]">
      <span className="text-center font-display text-sm font-semibold leading-tight tracking-tight text-neutral-800">
        {name}
      </span>
    </div>
  );
}

/**
 * A responsive grid of logo tiles. A centered flex-wrap keeps partly filled
 * final rows centred (no ragged blank cells), and every tile shares the same
 * responsive width across the 2 / 3 / 6 breakpoints so the grid stays aligned.
 */
export function LogoGrid({
  logos,
  className = "",
}: {
  logos: LogoItem[];
  className?: string;
}) {
  return (
    <RevealGroup className={`flex flex-wrap justify-center gap-3 sm:gap-4 ${className}`}>
      {logos.map((logo) => (
        <RevealItem
          key={logo.name}
          className="w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(16.666%-0.834rem)]"
        >
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
          <p className="mt-2.5 text-[15px] leading-relaxed text-foreground-muted">
            {note}
          </p>
        )}
      </Reveal>
      <LogoGrid logos={logos} className="mt-7" />
    </div>
  );
}
