"use client";

import { useState } from "react";
import { logoFileFor } from "@/lib/brandLogos";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

/**
 * Brand logos, presented as a clean minimal wall — not as individual stickers.
 *
 * Each logo is delivered as the same 212×72 mark, so height-based sizing renders
 * every one at an identical visual weight. Rather than boxing each logo, a whole
 * group sits on a single, softly lifted surface (`LogoPanel`), so the wall reads
 * as one elegant, integrated grid with balanced spacing in both Light and Dark.
 */

export interface LogoItem {
  name: string;
  file?: string;
}

/**
 * A single boxless logo — just the transparent mark, sized to a uniform height.
 * It renders as one adaptive tone by default (ink in Light, light in Dark) so
 * the wall reads as a cohesive set, and blooms into full brand colour on hover.
 */
export function LogoChip({ name, file }: LogoItem) {
  const src = file ?? logoFileFor(name);
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- static, pre-optimised brand artwork
      <img
        src={`/brand-logos/${src}`}
        alt={`${name} logo`}
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-8 w-auto object-contain opacity-60 transition-all duration-500 ease-out [filter:brightness(0)] group-hover:!opacity-100 group-hover:![filter:none] dark:opacity-70 dark:[filter:brightness(0)_invert(1)] sm:h-9"
      />
    );
  }

  return (
    <span className="font-display text-sm font-semibold tracking-tight text-foreground/70 transition-colors duration-300 group-hover:text-foreground">
      {name}
    </span>
  );
}

/**
 * The shared surface for a set of logos: one softly lifted panel with a hairline
 * outline. It provides uniform, gentle contrast for every logo at once — the
 * subtle neutral background that keeps mixed marks legible — instead of a box
 * around each one.
 */
export function LogoPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[1.75rem] border border-black/[0.06] bg-white/60 px-6 py-12 shadow-[0_12px_44px_-18px_rgba(2,12,27,0.35)] ring-1 ring-white/50 backdrop-blur-md sm:px-12 dark:border-white/[0.08] dark:bg-white/[0.04] dark:shadow-[0_18px_54px_-20px_rgba(0,0,0,0.7)] dark:ring-white/[0.06] ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * A group of logos laid out as a centered, evenly spaced wrap on a single panel.
 * Centering keeps a partly filled final row balanced rather than ragged.
 */
export function LogoGrid({
  logos,
  className = "",
}: {
  logos: LogoItem[];
  className?: string;
}) {
  return (
    <LogoPanel className={className}>
      <RevealGroup className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-14 sm:gap-y-10">
        {logos.map((logo) => (
          <RevealItem
            key={logo.name}
            className="group flex items-center justify-center"
          >
            <LogoChip name={logo.name} file={logo.file} />
          </RevealItem>
        ))}
      </RevealGroup>
    </LogoPanel>
  );
}

/** A titled group of logos with an optional subtitle. */
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
      <LogoGrid logos={logos} className="mt-6" />
    </div>
  );
}
