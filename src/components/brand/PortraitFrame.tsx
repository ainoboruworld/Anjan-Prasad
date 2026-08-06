import { Portrait } from "./Portrait";

/**
 * Framed portrait of Anjan Prasad. Renders the real photo from
 * public/images/anjan-prasad.jpg the moment it exists (see Portrait), and a
 * branded fallback until then - never a broken image. Fixed aspect so
 * dropping in the photo needs no layout change.
 */
export function PortraitFrame({
  aspect = "4/5",
  className = "",
}: {
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      style={{ aspectRatio: aspect }}
      className={`relative overflow-hidden rounded-[1.5rem] border border-border bg-background-elevated shadow-[var(--shadow-soft)] ${className}`}
    >
      <Portrait
        fallback={
          <div
            role="img"
            aria-label="Portrait of Anjan Prasad"
            className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[radial-gradient(120%_90%_at_50%_-10%,rgba(79,169,255,0.12),transparent_60%)] text-center"
          >
            <span className="font-display text-6xl font-bold tracking-tight text-brand/25">
              AP
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-foreground-muted">
              Anjan Prasad
            </span>
          </div>
        }
      />
    </div>
  );
}
