import { ArrowUpRight, Play } from "lucide-react";
import {
  formatMediaDate,
  extractYouTubeId,
  type MediaFeature,
} from "@/lib/media";
import { YouTubeThumb } from "./YouTubeThumb";
import { Placeholder } from "../ui/Placeholder";

/**
 * Media card — one public appearance. Thumbnail, type/platform, title, short
 * description, and (optional) date; the whole card opens the original
 * platform in a new tab. Layout is type-agnostic, so Podcasts, Interviews,
 * Press and more slot in without any redesign.
 */
export function MediaCard({ item }: { item: MediaFeature }) {
  const id = item.youtubeId || extractYouTubeId(item.url);
  const isPlayable = item.type === "Video" || item.type === "Podcast";
  const date = formatMediaDate(item.publishedAt);

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card card-hover group flex h-full flex-col overflow-hidden"
      data-cursor="view"
      aria-label={`Watch “${item.title}” on ${item.platform} (opens in a new tab)`}
    >
      <div className="relative aspect-video overflow-hidden">
        {id ? (
          <YouTubeThumb id={id} alt={item.title} />
        ) : (
          <Placeholder
            caption={item.type}
            aspect="16/9"
            rounded="rounded-none"
            className="!border-x-0 !border-t-0 !shadow-none"
          />
        )}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
        />
        {isPlayable && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-brand-ink shadow-[0_10px_30px_-10px_rgba(79,169,255,0.7)] transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-0.5 h-5 w-5" strokeWidth={2} fill="currentColor" />
            </span>
          </span>
        )}
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
          {item.type}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-brand">
          {item.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-muted">
          {item.description}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-hairline pt-4 text-xs text-foreground-muted">
          <span className="font-medium text-foreground">{item.platform}</span>
          <span className="flex items-center gap-2">
            {date}
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </span>
        </div>
      </div>
    </a>
  );
}
