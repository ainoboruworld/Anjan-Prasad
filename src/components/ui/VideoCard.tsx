"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

/** Premium video placeholder card with a glowing play control. */
export function VideoCard({
  label,
  meta,
  aspect = "video",
}: {
  label?: string;
  meta?: string;
  aspect?: "video" | "portrait";
}) {
  return (
    <div
      className={`group relative w-full ${
        aspect === "video" ? "aspect-video" : "aspect-[3/4]"
      }`}
    >
      <div
        aria-hidden
        className="absolute -inset-3 -z-10 rounded-[1.75rem] bg-[radial-gradient(circle_at_center,rgba(238,192,75,0.1),transparent_70%)] blur-2xl"
      />
      <div className="relative h-full w-full overflow-hidden rounded-[1.25rem] border border-border-strong bg-background-elevated">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.04),transparent_55%)]" />
        <button
          type="button"
          aria-label={`Play ${label ?? "video"}`}
          className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-glass backdrop-blur-md transition-transform duration-300 group-hover:scale-105"
        >
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-brand/15 animate-ping [animation-duration:2.5s]"
          />
          <Play
            className="relative ml-0.5 h-6 w-6 text-brand"
            strokeWidth={1.5}
            fill="currentColor"
          />
        </button>
        {(label || meta) && (
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
            {label && (
              <p className="max-w-[70%] text-sm font-medium text-foreground">
                {label}
              </p>
            )}
            {meta && (
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                {meta}
              </span>
            )}
          </div>
        )}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.25rem] ring-1 ring-brand/30"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
