/**
 * Sanity content source for the Knowledge Hub — dependency-free.
 *
 * When a Sanity project is configured via env, blogs are fetched live over
 * Sanity's public query (GROQ) HTTP API; otherwise the local seed slate in
 * `blog.ts` is returned. No SDK is required, so the app builds and runs with
 * or without a CMS connected. Newly published (and scheduled-then-due) posts
 * appear automatically because the query filters on `publishedAt <= now()`.
 *
 * Configure with:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET        (default: "production")
 *   NEXT_PUBLIC_SANITY_API_VERSION    (default: "2024-01-01")
 *
 * See docs/sanity-cms.md for the studio schema and editor workflow.
 */

import {
  SEED_BLOG_POSTS,
  filterPublished,
  type BlogPost,
  type BlogCategory,
} from "./blog";
import { env, flags } from "./env";

export const SANITY = {
  projectId: env.sanity.projectId,
  dataset: env.sanity.dataset,
  apiVersion: env.sanity.apiVersion,
};

export function isSanityConfigured(): boolean {
  return flags.sanity;
}

/** How often server-rendered blog data is revalidated (seconds). */
const REVALIDATE = 60;

async function sanityFetch<T>(query: string): Promise<T | null> {
  if (!isSanityConfigured()) return null;
  const url =
    `https://${SANITY.projectId}.apicdn.sanity.io/v${SANITY.apiVersion}` +
    `/data/query/${SANITY.dataset}?query=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return null;
    const json = (await res.json()) as { result?: T };
    return json.result ?? null;
  } catch {
    // Network/parse failure — fall back to seed content rather than error.
    return null;
  }
}

/* GROQ: published (or scheduled-then-due) posts, newest first, mapped to
   the BlogPost shape the UI consumes. */
const POST_PROJECTION = `{
  "slug": slug.current,
  title,
  excerpt,
  "categories": categories[]->title,
  "coverImage": { "url": coverImage.asset->url, "alt": coalesce(coverImage.alt, title) },
  "author": {
    "name": author->name,
    "role": author->role,
    "avatarUrl": author->avatar.asset->url
  },
  publishedAt,
  "readingTimeMins": readingTimeMins,
  featured,
  "seo": { "title": seo.title, "description": seo.description }
}`;

const ALL_POSTS_QUERY = `*[_type == "blogPost" && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) ${POST_PROJECTION}`;

function isNonEmptyArray<T>(v: unknown): v is T[] {
  return Array.isArray(v) && v.length > 0;
}

/** All blog posts — live from Sanity when configured, else the seed slate. */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const live = await sanityFetch<BlogPost[]>(ALL_POSTS_QUERY);
  if (isNonEmptyArray<BlogPost>(live)) return live;
  return filterPublished(SEED_BLOG_POSTS);
}

/** A single post by slug — live from Sanity when configured, else the seed. */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const query = `*[_type == "blogPost" && slug.current == "${slug}"][0] ${POST_PROJECTION}`;
  const live = await sanityFetch<BlogPost>(query);
  if (live && live.slug) return live;
  return SEED_BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}

/** Slugs for static generation. */
export async function getBlogSlugs(): Promise<string[]> {
  const posts = await getBlogPosts();
  return posts.map((p) => p.slug);
}

export type { BlogPost, BlogCategory };
