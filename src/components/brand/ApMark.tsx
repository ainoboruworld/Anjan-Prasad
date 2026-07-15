import type { SVGProps } from "react";

/** The "AP.com" wordmark used across the site. */
export function Wordmark({
  className = "",
  onDark,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <span className={`flex items-baseline gap-0.5 ${className}`}>
      <span
        className={`font-display text-xl font-bold tracking-tight ${
          onDark ? "text-white" : "text-foreground"
        }`}
      >
        AP
      </span>
      <span aria-hidden className="mx-0.5 inline-block h-1.5 w-1.5 rotate-45 bg-brand" />
      <span
        className={`font-display text-xl font-semibold tracking-tight ${
          onDark ? "text-white/70" : "text-foreground-muted"
        }`}
      >
        com
      </span>
    </span>
  );
}

/** Square "AP" monogram — used in the preloader and favicons. */
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
