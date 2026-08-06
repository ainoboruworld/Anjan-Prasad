import { BRAND_ICON_PATHS } from "./brandIconPaths";

/**
 * One organisation mark. Renders the official vector glyph where a
 * licensed single-colour SVG exists (via the simple-icons set); private
 * companies and institutes that publish no vector mark render as refined
 * typographic wordmarks in the site's display face - real names, set
 * deliberately, never placeholder boxes.
 */
const VECTOR = new Map(BRAND_ICON_PATHS.map((i) => [i.title, i.path]));

/** Distinct wordmark styling per brand so text marks don't read uniform. */
const WORDMARK_STYLE: Record<string, string> = {
  Mindshare: "font-display font-bold tracking-tight lowercase",
  "IPG Mediabrands": "font-display font-semibold uppercase tracking-[0.14em] text-[0.8em]",
  "Noboru World": "font-display font-bold uppercase tracking-[0.22em] text-[0.78em]",
  Lushful: "font-serif italic font-medium tracking-tight",
  "Filing Buddy": "font-display font-semibold tracking-tight",
  IIFT: "font-serif font-semibold tracking-[0.08em]",
  "IMT Ghaziabad": "font-serif font-semibold text-[0.85em]",
};

export function LogoMark({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const path = VECTOR.get(name);
  if (path) {
    return (
      <svg
        viewBox="0 0 24 24"
        role="img"
        aria-label={`${name} logo`}
        fill="currentColor"
        className={`h-7 w-auto ${name === "American Express" ? "h-8" : ""} ${className}`}
      >
        <path d={path} />
      </svg>
    );
  }
  return (
    <span
      role="img"
      aria-label={`${name} wordmark`}
      className={`whitespace-nowrap text-xl leading-none ${WORDMARK_STYLE[name] ?? "font-display font-semibold tracking-tight"} ${className}`}
    >
      {name}
    </span>
  );
}
