"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Official portrait of Anjan Prasad.
 *
 * Drop the photo in at `public/images/anjan-prasad.jpg` and it appears
 * automatically in the hero and About page. Until that file exists, the
 * `fallback` (a branded placeholder plate) renders instead.
 *
 * The image is preloaded client-side and only swapped in once it has
 * genuinely loaded - this avoids the broken-image flash that a plain SSR
 * `<img onError>` produces when the error fires before React hydrates.
 */
export const PORTRAIT_SRC = "/public/images/anjan-prasad.jpg";

export function Portrait({
  className = "",
  fallback,
}: {
  className?: string;
  fallback: ReactNode;
  /** Retained for API compatibility; loading is handled internally. */
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const img = new window.Image();
    const done = () => {
      if (!cancelled) setLoaded(true);
    };
    img.addEventListener("load", done);
    img.src = PORTRAIT_SRC;
    // Cached images may already be complete; defer to avoid a synchronous
    // setState inside the effect.
    let raf = 0;
    if (img.complete && img.naturalWidth > 0) {
      raf = requestAnimationFrame(done);
    }
    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      img.removeEventListener("load", done);
    };
  }, []);

  if (!loaded) return <>{fallback}</>;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={PORTRAIT_SRC}
      alt="Anjan Prasad - entrepreneur and business strategist"
      className={`h-full w-full animate-[fadein_0.6s_ease] object-cover ${className}`}
    />
  );
}
