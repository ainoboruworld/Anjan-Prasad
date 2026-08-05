/**
 * Official, final brand logos — delivered as uniform artwork and stored under
 * `public/brand-logos/` (each a 212×72 mark on a clean white field). Rendered
 * as-is on uniform white chips across the trust wall, the About logo walls, and
 * the service pages, so the brand wall reads consistent, premium, and evenly
 * weighted in both Light and Dark modes.
 */
export type BrandLogo = { name: string; file: string };

/**
 * Companies Anjan Prasad FOUNDED / co-founded and built — his own ventures,
 * not employers or advisory clients. Never shown under "Companies Worked With"
 * or "Brands Advised".
 */
export const FOUNDED_LOGOS: BrandLogo[] = [
  { name: "Noboru World", file: "noboru-world.png" },
  { name: "Lushful", file: "lushful.png" },
  { name: "Filing Buddy", file: "filing-buddy.png" },
];

/** Organisations where Anjan held employed / leadership / faculty roles. */
export const EMPLOYMENT_LOGOS: BrandLogo[] = [
  { name: "Accenture", file: "accenture.png" },
  { name: "Mindshare", file: "mindshare.png" },
  { name: "IPG Mediabrands", file: "ipg-mediabrands.png" },
  { name: "Zeta Global", file: "zeta.png" },
  { name: "Fareportal", file: "fareportal.png" },
  { name: "The Art of Living", file: "art-of-living.png" },
];

/** Brands advised, consulted, or supported through strategic engagements. */
export const ADVISORY_LOGOS: BrandLogo[] = [
  { name: "American Express", file: "american-express.png" },
  { name: "Sony", file: "sony.png" },
  { name: "Dabur", file: "dabur.png" },
  { name: "KFC", file: "kfc.png" },
  { name: "Pizza Hut", file: "pizza-hut.png" },
  { name: "Snapdeal", file: "snapdeal.png" },
  { name: "PwC", file: "pwc.png" },
  { name: "Google", file: "google.png" },
  { name: "Motorola", file: "motorola.png" },
  { name: "NIIT", file: "niit.png" },
  { name: "CheapOair", file: "cheapoair.png" },
  { name: "Aditya Birla Capital", file: "aditya-birla-capital.png" },
  { name: "Digit", file: "digit.png" },
  { name: "Tata Housing", file: "tata-housing.png" },
  { name: "Tommy Hilfiger", file: "tommy-hilfiger.png" },
  { name: "Black+Decker", file: "black-decker.png" },
];

/** Startups and founders mentored. */
export const MENTORED_LOGOS: BrandLogo[] = [
  { name: "Urban Kisaan", file: "urban-kisaan.png" },
  { name: "Akounto", file: "akounto.png" },
];

/** Institutes and universities where Anjan served as visiting faculty. */
export const ACADEMIC_LOGOS: BrandLogo[] = [
  { name: "IIFT", file: "iift.png" },
  { name: "IMT Ghaziabad", file: "imt.png" },
  { name: "BML Munjal University", file: "bml-munjal.png" },
];

/**
 * Recognisable enterprise subset used by the service-page proof strips.
 * Draws from the employment and advisory sets.
 */
export const ENTERPRISE_BRANDS: BrandLogo[] = [
  { name: "Accenture", file: "accenture.png" },
  { name: "American Express", file: "american-express.png" },
  { name: "Sony", file: "sony.png" },
  { name: "PwC", file: "pwc.png" },
  { name: "Google", file: "google.png" },
  { name: "Dabur", file: "dabur.png" },
  { name: "KFC", file: "kfc.png" },
  { name: "Pizza Hut", file: "pizza-hut.png" },
  { name: "Snapdeal", file: "snapdeal.png" },
  { name: "Aditya Birla Capital", file: "aditya-birla-capital.png" },
  { name: "Tommy Hilfiger", file: "tommy-hilfiger.png" },
  { name: "Mindshare", file: "mindshare.png" },
];

/** Every known brand across all groups, de-duplicated by name. */
const ALL_LOGOS: BrandLogo[] = Array.from(
  new Map(
    [
      ...FOUNDED_LOGOS,
      ...EMPLOYMENT_LOGOS,
      ...ADVISORY_LOGOS,
      ...MENTORED_LOGOS,
      ...ACADEMIC_LOGOS,
    ].map((l) => [l.name, l])
  ).values()
);

/** Name → logo file, across every known brand (for name-only callers). */
const NAME_TO_FILE: Record<string, string> = Object.fromEntries(
  ALL_LOGOS.map((l) => [l.name, l.file])
);

/** Resolve a brand name to its logo file in public/brand-logos, if any. */
export function logoFileFor(name: string): string | undefined {
  return NAME_TO_FILE[name];
}
