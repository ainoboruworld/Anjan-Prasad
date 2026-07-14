import type { SVGProps } from "react";

/** The "Anjan■" wordmark used across the site. */
export function Wordmark({
  className = "",
  onDark,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <span
        className={`font-display text-xl font-bold italic tracking-tight ${
          onDark ? "text-white" : "text-foreground"
        }`}
      >
        Anjan
      </span>
      <span
        aria-hidden
        className="inline-block h-2.5 w-2.5 rounded-[3px] bg-brand"
      />
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
