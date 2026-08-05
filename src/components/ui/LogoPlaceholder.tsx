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

/** A single boxless logo — just the mark, sized to a uniform height. */
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
        className="h-8 w-auto object-contain sm:h-9"
      />
    );
  }

  return (
    <span className="font-display text-sm font-semibold tracking-tight text-neutral-700">
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
      className={`rounded-[1.75rem] border border-black/[0.06] bg-white px-6 py-10 shadow-[var(--shadow-card)] ring-1 ring-black/[0.02] sm:px-10 ${className}`}
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
          <RevealItem key={logo.name} className="flex items-center justify-center">
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
