/**
 * Official brand logos, extracted directly from the Brand Portfolio PDF and
 * stored under `public/brand-logos/`. Used as-is (no recreation) across the
 * trust marquee, the About logo walls, and the Business Advisory page.
 */
export type BrandLogo = { name: string; file: string };

export const COMPANIES_FOUNDED: BrandLogo[] = [
  { name: "Noboru World", file: "noboru-world.jpg" },
  { name: "Lushful", file: "lushful.jpg" },
  { name: "Filing Buddy", file: "filing-buddy.jpg" },
];

export const ENTERPRISE_BRANDS: BrandLogo[] = [
  { name: "Accenture", file: "accenture.jpg" },
  { name: "Mindshare", file: "mindshare.jpg" },
  { name: "IPG Mediabrands", file: "ipg-mediabrands.jpg" },
  { name: "Zeta", file: "zeta.jpg" },
  { name: "Fareportal", file: "fareportal.jpg" },
  { name: "PwC", file: "pwc.jpg" },
  { name: "American Express", file: "american-express.jpg" },
  { name: "Sony", file: "sony.jpg" },
  { name: "Dabur", file: "dabur.jpg" },
  { name: "Pizza Hut", file: "pizza-hut.jpg" },
  { name: "KFC", file: "kfc.jpg" },
  { name: "Snapdeal", file: "snapdeal.jpg" },
  { name: "DLF", file: "dlf.jpg" },
  { name: "Cairn", file: "cairn.jpg" },
  { name: "Aditya Birla Capital", file: "aditya-birla-capital.jpg" },
  { name: "Digit Insurance", file: "digit.jpg" },
  { name: "Tommy Hilfiger", file: "tommy-hilfiger.jpg" },
  { name: "Tata Housing", file: "tata-housing.jpg" },
  { name: "Black+Decker", file: "black-decker.jpg" },
];

export const STARTUP_BRANDS: BrandLogo[] = [
  { name: "Urban Kisaan", file: "urban-kisaan.jpg" },
  { name: "Akounto", file: "akounto.jpg" },
];

export const ACADEMIC_BRANDS: BrandLogo[] = [
  { name: "IIFT", file: "iift.jpg" },
  { name: "IMT Ghaziabad", file: "imt.jpg" },
  { name: "BML Munjal University", file: "bml-munjal.jpg" },
];

/** Curated, recognisable subset for the hero trust marquee. */
export const TRUST_MARQUEE: BrandLogo[] = [
  { name: "Accenture", file: "accenture.jpg" },
  { name: "American Express", file: "american-express.jpg" },
  { name: "Mindshare", file: "mindshare.jpg" },
  { name: "Sony", file: "sony.jpg" },
  { name: "PwC", file: "pwc.jpg" },
  { name: "Dabur", file: "dabur.jpg" },
  { name: "KFC", file: "kfc.jpg" },
  { name: "Pizza Hut", file: "pizza-hut.jpg" },
  { name: "Snapdeal", file: "snapdeal.jpg" },
  { name: "DLF", file: "dlf.jpg" },
  { name: "Cairn", file: "cairn.jpg" },
  { name: "Aditya Birla Capital", file: "aditya-birla-capital.jpg" },
  { name: "Tommy Hilfiger", file: "tommy-hilfiger.jpg" },
  { name: "Noboru World", file: "noboru-world.jpg" },
  { name: "Filing Buddy", file: "filing-buddy.jpg" },
  { name: "IIFT", file: "iift.jpg" },
];

/* ── Two kinds of credibility, cleanly separated ──────────────────────────
 * EMPLOYMENT: organisations where Anjan held professional / leadership roles
 *   (employed, founded, or faculty).
 * ADVISORY:   brands advised, consulted, or mentored.
 *
 * Each logo carries a `domain` so the wall renders the LATEST official logo
 * from the Brandfetch Logo CDN (theme=light for the white chips). The local
 * `file` (public/brand-logos) is an automatic fallback if Brandfetch has no
 * asset for that domain. Counts are chosen so every row is full: 12 and 18
 * divide evenly into the 2 / 3 / 6 responsive columns. */

export interface WallLogo {
  name: string;
  /** Domain for the Brandfetch Logo CDN (latest official logo). */
  domain?: string;
  /** Local fallback file in public/brand-logos. */
  file?: string;
}

/** Public Brandfetch client id for hotlinked logo embeds (safe to ship). */
export const BRANDFETCH_CLIENT_ID = "1idaq8xZNIHpaTlDlPg";

/** Build the Brandfetch Logo CDN URL for a domain (light theme, SVG-first). */
export function brandfetchLogo(domain: string): string {
  return `https://cdn.brandfetch.io/${domain}/theme/light/fallback/404/type/logo?c=${BRANDFETCH_CLIENT_ID}`;
}

/**
 * Companies Anjan Prasad FOUNDED / co-founded and built — not employers or
 * advisory clients. These are his own ventures and must never appear under
 * "Companies Worked With" or "Brands Advised".
 */
export const FOUNDED_LOGOS: WallLogo[] = [
  { name: "Noboru World", domain: "noboruworld.com", file: "noboru-world.jpg" },
  { name: "Filing Buddy", domain: "filingbuddy.in", file: "filing-buddy.jpg" },
  { name: "Lushful", domain: "lushful.in", file: "lushful.jpg" },
];

/** Organisations where Anjan held employed / leadership / faculty roles. */
export const EMPLOYMENT_LOGOS: WallLogo[] = [
  { name: "Accenture", domain: "accenture.com", file: "accenture.jpg" },
  { name: "Mindshare", domain: "mindshare.com", file: "mindshare.jpg" },
  { name: "IPG Mediabrands", domain: "ipgmediabrands.com", file: "ipg-mediabrands.jpg" },
  { name: "Zeta", domain: "zetaglobal.com", file: "zeta.jpg" },
  { name: "Fareportal", domain: "fareportal.com", file: "fareportal.jpg" },
  { name: "The Art of Living", domain: "artofliving.org" },
  { name: "IIFT", domain: "iift.ac.in", file: "iift.jpg" },
  { name: "IMT Ghaziabad", domain: "imt.edu", file: "imt.jpg" },
  { name: "BML Munjal University", domain: "bmu.edu.in", file: "bml-munjal.jpg" },
];

export const ADVISORY_LOGOS: WallLogo[] = [
  { name: "American Express", domain: "americanexpress.com", file: "american-express.jpg" },
  { name: "Sony", domain: "sony.com", file: "sony.jpg" },
  { name: "Dabur", domain: "dabur.com", file: "dabur.jpg" },
  { name: "KFC", domain: "kfc.com", file: "kfc.jpg" },
  { name: "Pizza Hut", domain: "pizzahut.com", file: "pizza-hut.jpg" },
  { name: "Snapdeal", domain: "snapdeal.com", file: "snapdeal.jpg" },
  { name: "PwC", domain: "pwc.com", file: "pwc.jpg" },
  { name: "DLF", domain: "dlf.in", file: "dlf.jpg" },
  { name: "Tata Housing", domain: "tatahousing.com", file: "tata-housing.jpg" },
  { name: "Cairn", domain: "cairnindia.com", file: "cairn.jpg" },
  { name: "Aditya Birla Capital", domain: "adityabirlacapital.com", file: "aditya-birla-capital.jpg" },
  { name: "Digit Insurance", domain: "godigit.com", file: "digit.jpg" },
  { name: "Tommy Hilfiger", domain: "tommy.com", file: "tommy-hilfiger.jpg" },
  { name: "Black+Decker", domain: "blackanddecker.com", file: "black-decker.jpg" },
  { name: "Google", domain: "google.com" },
  { name: "Motorola", domain: "motorola.com" },
  { name: "Urban Kisaan", domain: "urbankisaan.com", file: "urban-kisaan.jpg" },
  { name: "Akounto", domain: "akounto.com", file: "akounto.jpg" },
];

/** Name → logo file, across every known brand (for name-only callers). */
const NAME_TO_FILE: Record<string, string> = Object.fromEntries(
  [
    ...COMPANIES_FOUNDED,
    ...ENTERPRISE_BRANDS,
    ...STARTUP_BRANDS,
    ...ACADEMIC_BRANDS,
    ...EMPLOYMENT_LOGOS,
    ...ADVISORY_LOGOS,
  ]
    .filter((l): l is BrandLogo => Boolean(l.file))
    .map((l) => [l.name, l.file])
);

/** Resolve a brand name to its logo file in public/brand-logos, if any. */
export function logoFileFor(name: string): string | undefined {
  return NAME_TO_FILE[name];
}

/** Resolve a brand name to its Brandfetch domain, if known. */
const NAME_TO_DOMAIN: Record<string, string> = Object.fromEntries(
  [...FOUNDED_LOGOS, ...EMPLOYMENT_LOGOS, ...ADVISORY_LOGOS]
    .filter((l) => l.domain)
    .map((l) => [l.name, l.domain as string])
);

export function logoDomainFor(name: string): string | undefined {
  return NAME_TO_DOMAIN[name];
}
