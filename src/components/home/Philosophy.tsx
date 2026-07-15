"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { PHILOSOPHY_SCENES } from "@/lib/data";

function Scene({
  progress,
  index,
  total,
  kicker,
  line,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  kicker: string;
  line: string;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const mid = (start + end) / 2;

  const opacity = useTransform(
    progress,
    [start, start + 0.08, mid, end - 0.02, end],
    [0, 1, 1, index === total - 1 ? 1 : 0, index === total - 1 ? 1 : 0]
  );
  const y = useTransform(progress, [start, start + 0.1], [40, 0]);
  const scale = useTransform(progress, [start, mid], [0.97, 1]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
    >
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-foreground-muted">
        {kicker}
      </p>
      <p className="mt-6 max-w-4xl font-display text-[length:var(--text-chapter)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground">
        {index === 1 ? (
          <>
            Anjan <span className="editorial-accent text-brand">operates.</span>
          </>
        ) : (
          line
        )}
      </p>
    </motion.div>
  );
}

/**
 * The business philosophy, told as three pinned cinematic statements.
 * The section pins for ~3 viewport-heights while each line takes the stage.
 */
export function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const total = PHILOSOPHY_SCENES.length;

  return (
    <section ref={ref} aria-label="Business philosophy" className="relative h-[300vh] bg-background-sunken">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Slowly rotating drafting circle as the scene backdrop */}
        <motion.svg
          aria-hidden
          viewBox="0 0 600 600"
          className="absolute h-[80vmin] w-[80vmin] opacity-40"
          style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, 90]) }}
          fill="none"
        >
          <circle cx="300" cy="300" r="280" stroke="var(--blueprint)" strokeDasharray="3 9" />
          <circle cx="300" cy="300" r="190" stroke="var(--hairline)" />
          <line x1="300" y1="20" x2="300" y2="580" stroke="var(--hairline)" />
          <line x1="20" y1="300" x2="580" y2="300" stroke="var(--hairline)" />
        </motion.svg>

        {PHILOSOPHY_SCENES.map((s, i) => (
          <Scene
            key={s.kicker}
            progress={scrollYProgress}
            index={i}
            total={total}
            kicker={s.kicker}
            line={s.line}
          />
        ))}

        {/* Scene progress marks */}
        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-3" aria-hidden>
          {PHILOSOPHY_SCENES.map((s, i) => {
            return <SceneDot key={s.kicker} progress={scrollYProgress} index={i} total={total} />;
          })}
        </div>
      </div>

      {/* Static fallback for reduced motion / non-JS is the last statement,
          which the pinned sequence also ends on. */}
    </section>
  );
}

function SceneDot({
  progress,
  index,
  total,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, start + 0.02], [0.25, 1]);
  const width = useTransform(progress, [start, end], [8, 24]);
  return (
    <motion.span
      style={{ opacity, width }}
      className="h-[3px] rounded-full bg-brand"
    />
  );
}
