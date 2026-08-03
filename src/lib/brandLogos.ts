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
