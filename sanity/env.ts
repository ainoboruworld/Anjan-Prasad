/**
 * Sanity environment — shared by the Studio and (via NEXT_PUBLIC_* mirrors)
 * the website's read layer in `src/lib/sanity.ts`.
 */
export const apiVersion =
  process.env.SANITY_STUDIO_API_VERSION ||
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  "2024-01-01";

export const dataset = assertValue(
  process.env.SANITY_STUDIO_DATASET ||
    process.env.NEXT_PUBLIC_SANITY_DATASET ||
    "production",
  "Missing dataset"
);

export const projectId = assertValue(
  process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing Sanity project id (SANITY_STUDIO_PROJECT_ID)"
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) throw new Error(errorMessage);
  return v;
}
