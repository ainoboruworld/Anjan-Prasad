/**
 * Media service — featured media items. Backed by a local slate today;
 * swap the source for Sanity by changing only this function.
 */
import { MEDIA_FEATURES, type MediaFeature } from "@/lib/media";

export async function listMediaFeatures(): Promise<MediaFeature[]> {
  // When Sanity powers media, fetch here and map to MediaFeature[].
  return MEDIA_FEATURES;
}

export type { MediaFeature };
