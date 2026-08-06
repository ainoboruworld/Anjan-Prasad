import type { ReactNode } from "react";
import { ImageIcon } from "lucide-react";

/**
 * Responsive image placeholder.
 *
 * A premium, intentional stand-in for photography that doesn't exist yet
 * (hero, About chapters, workshops, speaking, meetings). It reserves the
 * exact aspect ratio the final image will occupy, so dropping in a real
 * `<Image>` later requires no layout change - just replace the placeholder
 * with the photo at the same `aspect`.
 *
 * Kept deliberately calm: a soft sky-blue wash on an elevated surface, a
 * hairline frame, and a quiet caption. No loud colour, no noise.
 */
export function Placeholder({
  label,
  caption = "Image placeholder",
  aspect = "4/5",
  rounded = "rounded-[1.5rem]",
  className = "",
  children,
}: {
  label?: string;
  caption?: string;
  /** CSS aspect-ratio value, e.g. "4/5", "16/9", "1/1". */
  aspect?: string;
  rounded?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      role="img"
      aria-label={label ? `${label} - ${caption}` : caption}
      style={{ aspectRatio: aspect }}
      className={`relative w-full overflow-hidden border border-border bg-background-elevated shadow-[var(--shadow-soft)] ${rounded} ${className}`}
    >
      {/* Soft brand wash */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,rgba(79,169,255,0.12),transparent_62%)]"
      />
      {/* Faint architectural grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5] [background-image:linear-gradient(var(--hairline)_1px,transparent_1px),linear-gradient(90deg,var(--hairline)_1px,transparent_1px)] [background-size:38px_38px]"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
        {children ?? (
          <>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand-sky">
              <ImageIcon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
            </span>
            {label && (
              <span className="font-display text-base font-semibold tracking-tight text-foreground">
                {label}
              </span>
            )}
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-foreground-muted">
              {caption}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
