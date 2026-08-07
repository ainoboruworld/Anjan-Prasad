/**
 * One-time, idempotent seed for the Sanity production dataset.
 *
 * WHY: the Studio is connected but empty, so every page is rendering its
 * built-in fallback copy. This imports the CURRENT website content — read from
 * the project's own source of truth (`src/lib/*`) plus the singleton copy that
 * lives inline in the page/hero components — into Sanity, so the same content
 * is now editable in the Studio and drives the live site.
 *
 * SAFETY: every document is written with `createIfNotExists` and a deterministic
 * `_id`. That means:
 *   - running it on an empty dataset creates the documents,
 *   - running it again NEVER overwrites anything you've since edited in the
 *     Studio (existing ids are left untouched),
 *   - it can be re-run safely at any time.
 *
 * It does NOT delete, patch, or replace anything. It only fills gaps.
 *
 * RUN (locally — the CI sandbox cannot reach api.sanity.io):
 *   1. Add a write token to `.env.local`:
 *        SANITY_API_TOKEN=sk_...            (Editor/Deploy token from
 *        https://www.sanity.io/manage → project w0h41191 → API → Tokens)
 *   2. npm run seed:sanity
 *
 * Project id / dataset are read from the same env the site/Studio use, with the
 * committed w0h41191 / production fallback.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@sanity/client";

import {
  NAV,
  TAGLINE,
  CONTACT_EMAIL,
  SOCIALS,
  TESTIMONIALS,
  CASE_STUDIES,
  ADVISORY_FAQS,
} from "../src/lib/data";
import { MEDIA_FEATURES } from "../src/lib/media";
import {
  FOUNDED_LOGOS,
  EMPLOYMENT_LOGOS,
  ADVISORY_LOGOS,
  MENTORED_LOGOS,
  ACADEMIC_LOGOS,
  type BrandLogo,
} from "../src/lib/brandLogos";

/* ── Env ──────────────────────────────────────────────────────────────── */

function loadDotEnvLocal() {
  try {
    for (const line of readFileSync(".env.local", "utf8").split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#") || !t.includes("=")) continue;
      const i = t.indexOf("=");
      const k = t.slice(0, i).trim();
      if (!(k in process.env)) process.env[k] = t.slice(i + 1).trim();
    }
  } catch {
    /* no .env.local — rely on the real environment */
  }
}
loadDotEnvLocal();

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  "w0h41191";
const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  "production";
const token =
  process.env.SANITY_API_TOKEN ||
  process.env.SANITY_STUDIO_API_TOKEN ||
  process.env.SANITY_WRITE_TOKEN ||
  "";

if (!token) {
  console.error(
    "Missing SANITY_API_TOKEN.\n" +
      "Create an Editor token at https://www.sanity.io/manage (project " +
      projectId +
      " → API → Tokens), add it to .env.local as SANITY_API_TOKEN=sk_..., and re-run:\n" +
      "  npm run seed:sanity"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

/* ── Helpers ──────────────────────────────────────────────────────────── */

const created: string[] = [];
const skipped: string[] = [];

/** createIfNotExists — never overwrites a document already in the dataset. */
async function seed(doc: { _id: string; _type: string; [k: string]: unknown }) {
  const existing = await client.getDocument(doc._id).catch(() => null);
  if (existing) {
    skipped.push(`${doc._type} (${doc._id})`);
    return;
  }
  await client.createIfNotExists(doc);
  created.push(`${doc._type} (${doc._id})`);
}

const stat = (value: string, label: string) => ({
  _key: label.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  value,
  label,
});

/* ── Image upload (brand logos) ───────────────────────────────────────── */

const assetCache = new Map<string, string>();

/** Upload a public/brand-logos file once; returns the Sanity asset _id. */
async function uploadLogo(file: string): Promise<string | null> {
  if (assetCache.has(file)) return assetCache.get(file)!;
  try {
    const path = join(process.cwd(), "public", "brand-logos", file);
    const buf = readFileSync(path);
    const asset = await client.assets.upload("image", buf, { filename: file });
    assetCache.set(file, asset._id);
    return asset._id;
  } catch (err) {
    console.warn(`  ! could not upload ${file}:`, (err as Error).message);
    return null;
  }
}

/* ── Singleton content (mirrors the components' built-in copy) ─────────── */

const homePage = {
  _id: "homePage",
  _type: "homePage",
  eyebrow: "India's Business Growth Ecosystem",
  heroHeadline: "Build a Business That",
  heroHeadlineAccent: "Outlasts You.",
  heroSubhead:
    "Strategic business advisory, executive consulting, leadership development, and scalable growth systems - helping founders and business owners build resilient, profitable businesses that create lasting impact.",
  primaryCta: { label: "Book ₹99 Demo Session", href: "/business-advisory#book-demo", variant: "primary" },
  secondaryCta: { label: "Explore Business Advisory", href: "/business-advisory", variant: "ghost" },
  trustIndicators: ["16+ years experience", "4 ventures built", "100+ brands advised"],
  stats: [
    stat("16+", "Years of Experience"),
    stat("250+", "Businesses Guided"),
    stat("4", "Ventures Built"),
    stat("100+", "Brands Worked With"),
    stat("Fortune 500", "Companies Advised"),
    stat("3+", "Institutions & Universities"),
  ],
};

const aboutPage = {
  _id: "aboutPage",
  _type: "aboutPage",
  eyebrow: "About",
  title: "He builds businesses -",
  titleAccent: "then teaches how it's done.",
  lead:
    "Anjan Prasad is an entrepreneur, business strategist and growth advisor with 16+ years across startups, Fortune 500 companies and the classroom. This is the record of how an operator was formed.",
};

const businessAdvisoryPage = {
  _id: "servicePage.business-advisory",
  _type: "servicePage",
  title: "Business Advisory",
  slug: { _type: "slug", current: "business-advisory" },
  eyebrow: "Business Advisory",
  heroHeadline: "Build a Business That",
  heroHeadlineAccent: "Outlasts You.",
  heroSubhead:
    "Transformation delivered inside your business by an operator - not a slide deck. Start with a ₹99 demo, join the growth cohort, or engage monthly advisory. One playbook, three ways in.",
};

const consultingPage = {
  _id: "servicePage.consulting",
  _type: "servicePage",
  title: "Consultation",
  slug: { _type: "slug", current: "consulting" },
  eyebrow: "Consultation",
  heroHeadline: "Clarity Today.",
  heroHeadlineAccent: "Better Decisions Tomorrow.",
  heroSubhead:
    "A private, one-to-one session with Anjan Prasad on the single decision that matters most - for students, working professionals, and BPL candidates. You bring the question; you leave with a plan.",
};

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  siteName: "Anjan Prasad",
  tagline: TAGLINE,
  contactEmail: CONTACT_EMAIL,
  copyright: `© ${new Date().getFullYear()} Anjan Prasad. All rights reserved.`,
  socials: SOCIALS.map((s) => ({ _key: s.name.toLowerCase(), name: s.name, href: s.href })),
};

const seoSettings = {
  _id: "seoSettings",
  _type: "seoSettings",
  title: "Anjan Prasad - Business Strategist, Startup Mentor & Growth Advisor",
  description:
    "Anjan Prasad is an entrepreneur, business strategist and growth advisor with 16+ years building, scaling and transforming companies. 250+ businesses guided, 100+ brands advised - from Fortune 500 rooms to bootstrapped ventures.",
  keywords: [
    "Anjan Prasad",
    "business strategist",
    "startup mentor",
    "growth advisor",
    "business advisory India",
    "business consulting",
  ],
};

/** Navbar singleton — built straight from NAV (the site's source of truth). */
const navbar = {
  _id: "navbar",
  _type: "navbar",
  items: NAV.map((item, i) => ({
    _key: `nav-${i}`,
    label: item.label,
    href: item.href,
    ...(item.children
      ? {
          children: item.children.map((c, j) => ({
            _key: `nav-${i}-${j}`,
            _type: "navLink",
            label: c.label,
            href: c.href,
            description: c.description,
          })),
        }
      : {}),
  })),
};

/** Footer columns — the same three columns the Footer renders by default. */
const footer = {
  _id: "footer",
  _type: "footer",
  columns: [
    {
      _key: "col-programs",
      title: "Programs & Services",
      links: [
        { _key: "l1", _type: "navLink", label: "Business Advisory", href: "/business-advisory" },
        { _key: "l2", _type: "navLink", label: "Consultation", href: "/consulting" },
        { _key: "l3", _type: "navLink", label: "About", href: "/about" },
      ],
    },
    {
      _key: "col-hub",
      title: "Knowledge Hub",
      links: [
        { _key: "l1", _type: "navLink", label: "Blogs", href: "/knowledge-hub/blogs" },
        { _key: "l2", _type: "navLink", label: "Featured Media", href: "/media" },
        { _key: "l3", _type: "navLink", label: "Newsletter", href: "#newsletter" },
        { _key: "l4", _type: "navLink", label: "Contact", href: "/contact" },
      ],
    },
    {
      _key: "col-account",
      title: "Account",
      links: [
        { _key: "l1", _type: "navLink", label: "Sign In", href: "/sign-in" },
        { _key: "l2", _type: "navLink", label: "My Profile", href: "/account" },
        { _key: "l3", _type: "navLink", label: "My Bookings", href: "/account/bookings" },
      ],
    },
  ],
};

/* ── Main ─────────────────────────────────────────────────────────────── */

async function main() {
  console.log(`Seeding Sanity → project ${projectId} / dataset ${dataset}\n`);

  // Singletons
  await seed(siteSettings);
  await seed(seoSettings);
  await seed(navbar);
  await seed(footer);
  await seed(homePage);
  await seed(aboutPage);
  await seed(businessAdvisoryPage);
  await seed(consultingPage);

  // Testimonials
  for (let i = 0; i < TESTIMONIALS.length; i++) {
    const t = TESTIMONIALS[i];
    await seed({
      _id: `testimonial.${i}`,
      _type: "testimonial",
      quote: t.quote,
      name: t.name,
      title: t.title,
      kind: t.kind,
      categories: t.categories.map((c) => (c === "Courses" ? "Courses" : c)),
      order: i,
    });
  }

  // FAQs — Business Advisory (from data.ts) + Consultation (from the page)
  const consultingFaqs = [
    {
      q: "How is the price decided?",
      a: "By audience and level - school students (KPG-12) ₹499, UG and PG ₹999, and professionals by experience: 1-3 years ₹1,499, 3-6 years ₹1,999, 6-12 years ₹2,999. BPL candidates are served free after verification.",
    },
    {
      q: "How does the free BPL consultation work?",
      a: "Choose the BPL Candidate tab and upload a valid BPL or income certificate. Our team verifies eligibility, then confirms your session and sends meeting details - at no cost.",
    },
    {
      q: "Online or in person?",
      a: "Both. You choose your preferred mode when you book - a video call or, where feasible, an in-person session.",
    },
    {
      q: "What should I prepare?",
      a: "Just the decision and the context around it. The booking form captures what Anjan needs to arrive ready.",
    },
    {
      q: "How does payment work?",
      a: "You submit your booking details and proceed to secure checkout. UPI and card payments are processed by Cashfree; your meeting link and confirmation email follow a successful payment.",
    },
  ];
  for (let i = 0; i < ADVISORY_FAQS.length; i++) {
    const f = ADVISORY_FAQS[i];
    await seed({
      _id: `faq.ba.${i}`,
      _type: "faq",
      question: f.q,
      answer: f.a,
      page: "Business Advisory",
      order: i,
    });
  }
  for (let i = 0; i < consultingFaqs.length; i++) {
    const f = consultingFaqs[i];
    await seed({
      _id: `faq.consulting.${i}`,
      _type: "faq",
      question: f.q,
      answer: f.a,
      page: "Consultation",
      order: i,
    });
  }

  // Case studies
  for (let i = 0; i < CASE_STUDIES.length; i++) {
    const c = CASE_STUDIES[i];
    await seed({
      _id: `caseStudy.${c.slug}`,
      _type: "caseStudy",
      title: c.headline,
      slug: { _type: "slug", current: c.slug },
      client: c.business,
      sector: c.industry,
      summary: c.challenge,
      problem: c.challenge,
      approach: c.strategy,
      result: c.execution.join(" "),
      metrics: c.results.map((r) => stat(r.metric, r.label)),
      order: i,
    });
  }

  // Featured media
  for (let i = 0; i < MEDIA_FEATURES.length; i++) {
    const m = MEDIA_FEATURES[i];
    await seed({
      _id: `featuredMedia.${m.id}`,
      _type: "featuredMedia",
      title: m.title,
      outlet: m.platform,
      type: m.type === "Video" ? "Video" : m.type,
      url: m.url,
      publishedAt: m.publishedAt,
      order: i,
    });
  }

  // Brand / client logos (uploads the artwork to Sanity assets)
  const logoGroups: { group: string; logos: BrandLogo[] }[] = [
    { group: "Ventures Built", logos: FOUNDED_LOGOS },
    { group: "Career Experience", logos: EMPLOYMENT_LOGOS },
    { group: "Companies Advised", logos: ADVISORY_LOGOS },
    { group: "Startups Mentored", logos: MENTORED_LOGOS },
    { group: "Career Experience", logos: ACADEMIC_LOGOS },
  ];
  let order = 0;
  for (const { group, logos } of logoGroups) {
    for (const logo of logos) {
      const id = `clientLogo.${logo.file.replace(/\.[a-z]+$/, "")}`;
      const existing = await client.getDocument(id).catch(() => null);
      if (existing) {
        skipped.push(`clientLogo (${id})`);
        order++;
        continue;
      }
      const assetId = await uploadLogo(logo.file);
      await seed({
        _id: id,
        _type: "clientLogo",
        name: logo.name,
        group,
        order: order++,
        ...(assetId
          ? { logo: { _type: "image", asset: { _type: "reference", _ref: assetId } } }
          : {}),
      });
    }
  }

  console.log(`\n✓ Done. ${created.length} created, ${skipped.length} left untouched.`);
  if (created.length) console.log("\nCreated:\n  " + created.join("\n  "));
  if (skipped.length) console.log("\nAlready present (skipped):\n  " + skipped.join("\n  "));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
