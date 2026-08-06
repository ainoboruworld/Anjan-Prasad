/**
 * Blog service - reads blog content (Sanity when configured, seed otherwise).
 * The frontend consumes this; it never talks to Sanity directly.
 */
import {
  getBlogPosts,
  getBlogPostBySlug,
  getBlogSlugs,
} from "@/lib/sanity";
import type { BlogPost } from "@/lib/blog";

export function listBlogPosts(): Promise<BlogPost[]> {
  return getBlogPosts();
}

export function getBlogPost(slug: string): Promise<BlogPost | null> {
  return getBlogPostBySlug(slug);
}

export function listBlogSlugs(): Promise<string[]> {
  return getBlogSlugs();
}

export type { BlogPost };
