"use client";

import { useState } from "react";
import { youtubeThumbnails } from "@/lib/media";

/**
 * YouTube thumbnail with graceful quality fallback: prefers maxresdefault
 * and falls back to hqdefault if that isn't available. Lazy-loaded.
 */
export function YouTubeThumb({ id, alt }: { id: string; alt: string }) {
  const { max, hq } = youtubeThumbnails(id);
  const [src, setSrc] = useState(max);
  return (
    // eslint-disable-next-line @next/next/no-img-element -- remote YouTube CDN thumbnail
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => src !== hq && setSrc(hq)}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
    />
  );
}
