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
 * A single boxless logo — the transparent, full-colour mark, sized to a uniform
 * height so every brand carries equal visual weight. A restrained hover (a
 * gentle lift and a whisper more presence) keeps the wall feeling alive without
 * turning the logos into buttons.
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
        className="h-7 w-auto object-contain opacity-90 transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:opacity-100 sm:h-8"
      />
    );
  }

  return (
    <span className="font-display text-sm font-semibold tracking-tight text-neutral-500 transition-colors duration-300 group-hover:text-neutral-800">
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
      className={`w-fit max-w-full rounded-[1.5rem] border border-black/[0.05] bg-white/60 px-7 py-6 shadow-[0_8px_30px_-16px_rgba(2,12,27,0.28)] backdrop-blur-lg sm:px-9 dark:border-white/[0.14] dark:bg-white/75 dark:shadow-[0_14px_44px_-20px_rgba(0,0,0,0.65)] ${className}`}
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
    <LogoPanel className={`max-w-4xl ${className}`}>
      <RevealGroup className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-10 sm:gap-y-6">
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
