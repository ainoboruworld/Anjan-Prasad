"use client";

import { useState, type ReactNode } from "react";

/**
 * Official portrait of Anjan Prasad.
 *
 * Drop the photo in at `public/images/anjan-prasad.jpg` and it appears
 * automatically in the hero and About page. Until that file exists, the
 * `fallback` (a branded placeholder plate) renders instead — so the layout
 * is final and only the asset needs swapping in.
 */
export const PORTRAIT_SRC = "/images/anjan-prasad.jpg";

export function Portrait({
  className = "",
  fallback,
  priority,
}: {
  className?: string;
  fallback: ReactNode;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) return <>{fallback}</>;

  return (
    // A plain <img> is used deliberately: it lets the portrait degrade to the
    // branded fallback via onError while the real asset is still pending.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={PORTRAIT_SRC}
      alt="Anjan Prasad — entrepreneur and business strategist"
      loading={priority ? "eager" : "lazy"}
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
