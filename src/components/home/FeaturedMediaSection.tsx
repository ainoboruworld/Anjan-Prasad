import { Play } from "lucide-react";
import {
  MEDIA_FEATURES,
  extractYouTubeId,
  featuredMediaFromCms,
  type MediaFeature,
} from "@/lib/media";
import { getFeaturedMedia } from "@/lib/cms";
import { YouTubeThumb } from "../hub/YouTubeThumb";
import { SectionHeading } from "../ui/Primitives";
import { RevealGroup, RevealItem } from "../ui/Reveal";

/**
 * Featured Media - Anjan Prasad's YouTube appearances as thought leadership.
 * Elegant 2-column cards (single column on mobile), official thumbnails with
 * a maxres→hq fallback, play overlay, and the whole card links out.
 */
export async function FeaturedMediaSection() {
  const cms = await getFeaturedMedia();
  const features =
    cms && cms.length > 0 ? featuredMediaFromCms(cms) : MEDIA_FEATURES;
  return (
    <section className="border-t border-border py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Featured Media"
          title={
            <>
              Watch the{" "}
              <span className="editorial-accent text-brand">method.</span>
            </>
          }
          lead="Watch Anjan Prasad share practical insights on entrepreneurship, business growth, leadership, startups, and building sustainable businesses."
        />

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2">
          {features.map((video) => (
            <RevealItem key={video.id} className="h-full">
              <VideoCard video={video} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function VideoCard({ video }: { video: MediaFeature }) {
  const id = video.youtubeId || extractYouTubeId(video.url);
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch “${video.title}” on ${video.platform} (opens in a new tab)`}
      className="card card-hover group flex h-full flex-col overflow-hidden"
      data-cursor="view"
    >
      <div className="relative aspect-video overflow-hidden bg-background-sunken">
        {id ? (
          <YouTubeThumb id={id} alt={video.title} />
        ) : (
          <div className="bg-blueprint absolute inset-0" aria-hidden />
        )}
        {/* subtle gradient for legibility + play button */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-brand-ink shadow-[0_12px_30px_-10px_rgba(79,169,255,0.7)] transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-0.5 h-5 w-5" strokeWidth={2} fill="currentColor" />
          </span>
        </span>
        <span className="absolute left-3.5 top-3.5 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
          {video.platform}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-brand">
          {video.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-muted">
          {video.description}
        </p>
      </div>
    </a>
  );
}
