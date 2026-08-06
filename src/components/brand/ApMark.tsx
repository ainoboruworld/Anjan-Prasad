import type { SVGProps } from "react";

/**
 * Official "Anjan Prasad" wordmark - the brand logo used across the site.
 * "Anjan" sits in Midnight Blue (white on dark surfaces), "Prasad" in the
 * Sky Blue accent, stacked and tightly leaded, matching the master logo.
 */
export function Wordmark({
  className = "",
  onDark,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <span
      role="img"
      aria-label="Anjan Prasad"
      className={`flex flex-col font-display text-[1.05rem] font-bold leading-[0.92] tracking-[-0.02em] ${className}`}
    >
      <span className={onDark ? "text-white" : "text-brand-midnight dark:text-white"}>
        Anjan
      </span>
      <span className="text-brand-sky">Prasad</span>
    </span>
  );
}

/** Square "AP" monogram - used in the preloader and favicons. */
export function ApMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" role="img" aria-label="AP monogram" {...props}>
      <rect
        x="2"
        y="2"
        width="96"
        height="96"
        rx="22"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.18"
        strokeWidth="1.5"
      />
      <text
        x="50"
        y="54"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-display)"
        fontSize="42"
        fontStyle="italic"
        fontWeight="700"
        letterSpacing="-1"
        fill="currentColor"
      >
        AP
      </text>
    </svg>
  );
}
