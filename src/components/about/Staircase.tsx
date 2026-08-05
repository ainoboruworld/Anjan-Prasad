import type { ReactNode } from "react";
import { Quote } from "lucide-react";
import { Placeholder } from "../ui/Placeholder";
import { LogoRow } from "../ui/LogoPlaceholder";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";

/**
 * The Staircase of Continuous Learning.
 *
 * Each chapter is one step. As you scroll you climb alongside Anjan: a new
 * step means new lessons, industries, companies and perspectives — never a
 * career ladder that ends. Steps alternate sides and rise, and the final
 * step fades into soft light to signal that the learning continues.
 *
 * Every step is a visual composition — number, title, short text, image,
 * logos, milestone, pull quote and a highlight card — so no step is ever
 * text-only.
 */

export interface StaircaseChapter {
  step: string;
  title: string;
  /** 2–4 short lines. */
  blurb: string;
  imageLabel: string;
  logos: string[];
  /** Milestones for this stage (existing career entries, regrouped). */
  milestones: { year: string; label: string }[];
  quote: string;
  highlight: { label: string; value: string };
}

/** Small ascending-steps glyph — the staircase motif beside each number. */
function StairGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-brand-sky" fill="none" aria-hidden>
      <path
        d="M3 21h4v-5h5v-5h5V6h4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StepContent({ chapter }: { chapter: StaircaseChapter }) {
  return (
    <div>
      <Reveal className="flex items-center gap-4">
        <span className="numeral-outline font-display text-6xl font-bold leading-none sm:text-7xl">
          {chapter.step}
        </span>
        <StairGlyph />
      </Reveal>

      <Reveal>
        <h3 className="mt-6 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
          {chapter.title}
        </h3>
        <p className="mt-4 max-w-md text-[length:var(--text-lead)] leading-relaxed text-foreground-muted">
          {chapter.blurb}
        </p>
      </Reveal>

      {/* Milestones + highlight card */}
      <div className="mt-8 grid gap-4 sm:grid-cols-[1.4fr_1fr] sm:items-start">
        <RevealGroup as="ul" className="space-y-2">
          {chapter.milestones.map((m) => (
            <RevealItem
              as="li"
              key={`${m.year}-${m.label}`}
              className="flex items-baseline gap-3"
            >
              <span className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-brand-sky">
                {m.year}
              </span>
              <span className="text-sm leading-relaxed text-foreground">{m.label}</span>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="rounded-2xl border border-border bg-background-elevated px-5 py-4 shadow-[var(--shadow-card)]">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-foreground-muted">
            {chapter.highlight.label}
          </p>
          <p className="mt-0.5 font-display text-base font-semibold tracking-tight text-foreground">
            {chapter.highlight.value}
          </p>
        </Reveal>
      </div>

      {/* Pull quote */}
      <Reveal className="mt-8 border-l-2 border-brand/40 pl-5">
        <Quote className="h-5 w-5 text-brand/50" strokeWidth={1.75} aria-hidden />
        <p className="mt-2 max-w-md font-serif text-lg italic leading-relaxed text-foreground">
          {chapter.quote}
        </p>
      </Reveal>

      {/* Company logos for this stage */}
      <LogoRow
        logos={chapter.logos.map((name) => ({ name }))}
        className="mt-8"
      />
    </div>
  );
}

function StepImage({ chapter }: { chapter: StaircaseChapter }) {
  return (
    <Reveal>
      <Placeholder label={chapter.imageLabel} caption="Photography pending" aspect="4/5" />
    </Reveal>
  );
}

/** One step of the staircase — alternates image/content sides as it climbs. */
export function StaircaseStep({
  chapter,
  index,
}: {
  chapter: StaircaseChapter;
  index: number;
}) {
  const imageRight = index % 2 === 0;
  return (
    <div className="relative py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
        {imageRight ? (
          <>
            <StepContent chapter={chapter} />
            <StepImage chapter={chapter} />
          </>
        ) : (
          <>
            <div className="lg:order-2">
              <StepContent chapter={chapter} />
            </div>
            <div className="lg:order-1">
              <StepImage chapter={chapter} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/** The staircase container — steps plus the closing fade into light. */
export function Staircase({
  chapters,
  ending,
}: {
  chapters: StaircaseChapter[];
  ending: ReactNode;
}) {
  return (
    <div className="relative divide-y divide-border">
      {chapters.map((c, i) => (
        <StaircaseStep key={c.step} chapter={c} index={i} />
      ))}

      {/* The staircase never ends — the final step fades into soft light. */}
      <div className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 top-0 bg-[linear-gradient(180deg,transparent,color-mix(in_srgb,var(--brand-sky)_10%,transparent)_60%,color-mix(in_srgb,var(--brand-sky)_18%,transparent))]"
        />
        {ending}
      </div>
    </div>
  );
}
