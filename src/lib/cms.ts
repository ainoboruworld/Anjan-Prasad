/**
 * CMS read layer for Sanity-managed content (site settings, testimonials,
 * FAQs, case studies, featured media, brand logos, and page singletons).
 *
 * Dependency-free — the same public GROQ HTTP approach as `lib/sanity.ts`, so
 * the site builds and runs with or without Sanity connected. Every fetcher
 * returns `null`/`[]` when Sanity is absent or a document hasn't been authored
 * yet, so callers fall back to the built-in content and the UI never breaks.
 */
import { env, flags } from "./env";

const SANITY = {
  projectId: env.sanity.projectId,
  dataset: env.sanity.dataset,
  apiVersion: env.sanity.apiVersion,
};

const REVALIDATE = 60;

export function isCmsConfigured(): boolean {
  return flags.sanity;
}

/** Resolve a Sanity image asset ref to a CDN URL (no SDK). */
export function imageUrl(ref?: string): string | null {
  if (!ref) return null;
  // ref: image-<id>-<w>x<h>-<ext>
  const m = ref.match(/^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/);
  if (!m) return null;
  return `https://cdn.sanity.io/images/${SANITY.projectId}/${SANITY.dataset}/${m[1]}-${m[2]}.${m[3]}`;
}

async function cmsFetch<T>(query: string): Promise<T | null> {
  if (!isCmsConfigured()) return null;
  const url =
    `https://${SANITY.projectId}.apicdn.sanity.io/v${SANITY.apiVersion}` +
    `/data/query/${SANITY.dataset}?query=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return null;
    const json = (await res.json()) as { result?: T };
    return json.result ?? null;
  } catch {
    return null;
  }
}

/* ── Types (mirror the Studio schema) ─────────────────────────────────── */

export interface CmsSiteSettings {
  siteName?: string;
  tagline?: string;
  contactEmail?: string;
  contactPhone?: string;
  officeLocation?: string;
  copyright?: string;
  socials?: { name: string; href: string }[];
}

export interface CmsTestimonial {
  quote: string;
  name: string;
  title?: string;
  kind?: "Founder" | "Student" | "Enterprise";
  categories?: string[];
}

export interface CmsFaq {
  question: string;
  answer: string;
  page?: string;
}

export interface CmsCta {
  label: string;
  href: string;
}

export interface CmsStat {
  value: string;
  label: string;
}

export interface CmsHomePage {
  eyebrow?: string;
  heroHeadline?: string;
  heroHeadlineAccent?: string;
  heroSubhead?: string;
  trustIndicators?: string[];
  primaryCta?: CmsCta;
  secondaryCta?: CmsCta;
  stats?: CmsStat[];
}

export interface CmsCaseStudy {
  title: string;
  client?: string;
  sector?: string;
  summary?: string;
  problem?: string;
  approach?: string;
  result?: string;
  metrics?: CmsStat[];
}

/* ── Fetchers ─────────────────────────────────────────────────────────── */

export function getSiteSettings(): Promise<CmsSiteSettings | null> {
  return cmsFetch<CmsSiteSettings>(
    `*[_type == "siteSettings"][0]{siteName,tagline,contactEmail,contactPhone,officeLocation,copyright,socials[]{name,href}}`
  );
}

export function getTestimonials(category?: string): Promise<CmsTestimonial[] | null> {
  const filter = category
    ? `*[_type == "testimonial" && "${category}" in categories]`
    : `*[_type == "testimonial"]`;
  return cmsFetch<CmsTestimonial[]>(
    `${filter} | order(order asc){quote,name,title,kind,categories}`
  );
}

export function getFaqs(page?: string): Promise<CmsFaq[] | null> {
  const filter = page
    ? `*[_type == "faq" && page == "${page}"]`
    : `*[_type == "faq"]`;
  return cmsFetch<CmsFaq[]>(`${filter} | order(order asc){question,answer,page}`);
}

export function getHomePage(): Promise<CmsHomePage | null> {
  return cmsFetch<CmsHomePage>(
    `*[_type == "homePage"][0]{
      eyebrow, heroHeadline, heroHeadlineAccent, heroSubhead, trustIndicators,
      primaryCta{label,href}, secondaryCta{label,href}, stats[]{value,label}
    }`
  );
}

export function getCaseStudies(): Promise<CmsCaseStudy[] | null> {
  return cmsFetch<CmsCaseStudy[]>(
    `*[_type == "caseStudy"] | order(order asc){
      title, client, sector, summary, problem, approach, result, metrics[]{value,label}
    }`
  );
}
