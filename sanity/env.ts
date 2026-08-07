/**
 * Sanity environment — shared by the Studio and (via NEXT_PUBLIC_* mirrors)
 * the website's read layer in `src/lib/sanity.ts`.
 */
export const apiVersion =
  process.env.SANITY_STUDIO_API_VERSION ||
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  "2024-01-01";

export const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  "production";

// Public project id (safe to commit) as a last-resort fallback so the Studio
// and `sanity deploy` work even when the CLI hasn't loaded .env.local. Env
// values still take precedence.
export const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  "w0h41l91";
