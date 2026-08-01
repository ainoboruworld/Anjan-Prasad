import { Play } from "lucide-react";
import { FEATURED_VIDEOS, type FeaturedVideo } from "@/lib/data";
import { SectionHeading, TextLink } from "../ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";

/**
 * One video card. With a real videoId the YouTube thumbnail renders and
 * the card opens the video; until then a branded blueprint plate holds
 * the slot so the section ships before the channel does.
 */
function VideoCard({ video }: { video: FeaturedVideo }) {
  const href = video.videoId
    ? `https://www.youtube.com/watch?v=${video.videoId}`
    : "https://www.youtube.com";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="card card-hover group block overflow-hidden"
      data-cursor="view"
    >
      <div className="relative aspect-video overflow-hidden bg-background-sunken">
        {video.videoId ? (
          // eslint-disable-next-line @next/next/no-img-element -- remote YouTube thumbnails are not in the image allowlist
          <img
            src={`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="bg-blueprint absolute inset-0" aria-hidden />
        )}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-brand-ink shadow-[0_10px_30px_-10px_rgba(79,169,255,0.7)] transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-0.5 h-5 w-5" strokeWidth={2} fill="currentColor" />
          </span>
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-display text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-brand">
          {video.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
          {video.note}
        </p>
      </div>
    </a>
  );
}

/** Featured Media — YouTube conversations and talks. */
export function FeaturedMedia() {
  return (
    <section className="py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Featured Media"
          title={
            <>
              Watch the{" "}
              <span className="editorial-accent text-brand">method.</span>
            </>
          }
          lead="Talks, sessions, and conversations on how profitable businesses are actually built."
        />

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_VIDEOS.map((v) => (
            <RevealItem key={v.title}>
              <VideoCard video={v} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-12">
          <TextLink href="/media">All media &amp; recognition</TextLink>
        </Reveal>
      </div>
    </section>
  );
}
