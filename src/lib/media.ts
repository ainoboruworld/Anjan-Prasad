/**
 * Featured Media content model.
 *
 * A single, extensible shape for every kind of public appearance. YouTube is
 * supported today; adding Podcasts, Interviews, Speaking Sessions, Event
 * Talks or Press Coverage later is just a new `type`/`platform` value and a
 * data entry — no layout change. Each item links out to its original
 * platform.
 */

export const MEDIA_TYPES = [
  "Video",
  "Podcast",
  "Interview",
  "Speaking",
  "Event Talk",
  "Press",
] as const;

export type MediaType = (typeof MEDIA_TYPES)[number];

export interface MediaFeature {
  id: string;
  type: MediaType;
  /** Where it lives — "YouTube", "Spotify", "Forbes India", etc. */
  platform: string;
  title: string;
  description: string;
  /** ISO date. */
  publishedAt: string;
  /** External URL the card opens. */
  url: string;
  /** Thumbnail URL; empty renders a Placeholder. For YouTube it can be
   *  derived from the video id. */
  thumbnailUrl?: string;
  /** Optional YouTube video id — thumbnail is derived when present. */
  youtubeId?: string;
}

/** Build a YouTube thumbnail URL from a video id. */
export function youtubeThumb(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

/**
 * Representative slate — swap the ids/urls for the official channel content.
 * Empty `youtubeId`/`thumbnailUrl` render a branded Placeholder, so the
 * section ships before the assets do.
 */
export const MEDIA_FEATURES: MediaFeature[] = [
  {
    id: "how-profitable-businesses-are-built",
    type: "Video",
    platform: "YouTube",
    title: "How Profitable Businesses Are Actually Built",
    description:
      "The 0 → 1 → Scale framework, explained on real business models.",
    publishedAt: "2026-06-30",
    url: "https://www.youtube.com/@anjanprasad",
    youtubeId: "",
  },
  {
    id: "validate-before-you-build-video",
    type: "Video",
    platform: "YouTube",
    title: "Validate Before You Build",
    description:
      "A ₹0 validation method that kills bad ideas in two weeks.",
    publishedAt: "2026-05-24",
    url: "https://www.youtube.com/@anjanprasad",
    youtubeId: "",
  },
  {
    id: "ai-operating-systems-video",
    type: "Video",
    platform: "YouTube",
    title: "AI Operating Systems for Small Businesses",
    description:
      "Where AI actually pays back in an SME — and where it doesn't.",
    publishedAt: "2026-04-19",
    url: "https://www.youtube.com/@anjanprasad",
    youtubeId: "",
  },
  {
    id: "pricing-is-positioning-video",
    type: "Video",
    platform: "YouTube",
    title: "Pricing Is Positioning",
    description:
      "Why underpricing is the most expensive branding decision founders make.",
    publishedAt: "2026-03-15",
    url: "https://www.youtube.com/@anjanprasad",
    youtubeId: "",
  },
];

export function formatMediaDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
