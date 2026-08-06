/**
 * Featured Media content model.
 *
 * A single, extensible shape for every kind of public appearance. YouTube is
 * supported today; adding Podcasts, Interviews, Speaking Sessions, Event
 * Talks or Press Coverage later is just a new `type`/`platform` value and a
 * data entry - no layout change. Each item links out to its original
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
  /** Where it lives - "YouTube", "Spotify", "Forbes India", etc. */
  platform: string;
  title: string;
  description: string;
  /** ISO date (optional). */
  publishedAt?: string;
  /** External URL the card opens. */
  url: string;
  /** YouTube video id - thumbnail is derived when present. */
  youtubeId?: string;
}

/** Extract the video id from any YouTube URL (youtu.be or watch?v=). */
export function extractYouTubeId(url: string): string {
  const short = url.match(/youtu\.be\/([\w-]{11})/);
  if (short) return short[1];
  const long = url.match(/[?&]v=([\w-]{11})/);
  if (long) return long[1];
  const embed = url.match(/youtube\.com\/(?:embed|shorts)\/([\w-]{11})/);
  if (embed) return embed[1];
  return "";
}

/** Thumbnail URLs for a video id, highest quality first. */
export function youtubeThumbnails(id: string): { max: string; hq: string } {
  return {
    max: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
    hq: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  };
}

/** Backwards-compatible helper - the safe (always-present) thumbnail. */
export function youtubeThumb(id: string): string {
  return youtubeThumbnails(id).hq;
}

/** Anjan Prasad's featured YouTube appearances. */
export const MEDIA_FEATURES: MediaFeature[] = [
  {
    id: "from-accenture-to-serial-entrepreneur",
    type: "Video",
    platform: "YouTube",
    title: "From Accenture to Serial Entrepreneur",
    description:
      "Anjan Prasad shares his entrepreneurial journey, lessons from building businesses, and transitioning from corporate leadership to entrepreneurship.",
    url: "https://youtu.be/U3otsv7eLKA?si=HD6D_Vxyt1GgfKap",
    youtubeId: "U3otsv7eLKA",
  },
  {
    id: "farm-to-consumer-business-model",
    type: "Video",
    platform: "YouTube",
    title: "₹5/kg vs ₹150/kg - Farm to Consumer Business Model",
    description:
      "Learn how direct-to-consumer business models create value, improve profitability, and transform traditional industries.",
    url: "https://youtu.be/ghVIlCZ7NMQ?si=wCAIR45JzpvLxSDY",
    youtubeId: "ghVIlCZ7NMQ",
  },
];

export function formatMediaDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
