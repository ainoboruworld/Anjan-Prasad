"use client";

import { useState } from "react";

/**
 * A stat rendered as a brand image (e.g. the Fortune 500 mark) instead of a
 * number. Sits at the same optical height as the numeric tiles and, if the
 * artwork is missing, degrades gracefully to the text label so the row never
 * shows a broken image.
 */
export function StatImage({
  src,
  alt,
  fallback,
}: {
  src: string;
  alt: string;
  fallback: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <>{fallback}</>;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- small static brand mark with a text fallback
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="h-11 w-auto max-w-[160px] object-contain sm:h-[3.25rem]"
    />
  );
}
