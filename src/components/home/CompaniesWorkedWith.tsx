import {
  FOUNDED_LOGOS,
  EMPLOYMENT_LOGOS,
  ADVISORY_LOGOS,
  MENTORED_LOGOS,
  type BrandLogo,
} from "@/lib/brandLogos";
import { LogoRow } from "../ui/LogoPlaceholder";
import { Eyebrow } from "../ui/Primitives";
import { Reveal } from "../ui/Reveal";

/**
 * The brand showcase — an editorial proof band, not a grid of logo cards.
 * Three kinds of credibility (built, advised, worked with) read as distinct
 * categories separated by elegant dividers, with the logos embedded directly
 * into the layout and lit rather than boxed.
 */
type Category = { label: string; note: string; logos: BrandLogo[] };

const CATEGORIES: Category[] = [
  {
    label: "Ventures Built",
    note: "Companies Anjan Prasad founded, co-founded, and leads.",
    logos: FOUNDED_LOGOS,
  },
  {
    label: "Companies Advised",
    note: "Enterprises and brands guided through consulting and strategic advisory.",
    logos: ADVISORY_LOGOS,
  },
  {
    label: "Career Experience",
    note: "Organizations where he held leadership and professional roles.",
    logos: EMPLOYMENT_LOGOS,
  },
  {
    label: "Startups Mentored",
    note: "Early-stage ventures and founders guided through growth and go-to-market.",
    logos: MENTORED_LOGOS,
  },
];

export function CompaniesWorkedWith() {
  return (
    <section
      aria-label="Brands built, advised, and worked with"
      className="relative overflow-hidden border-y border-border bg-background-sunken py-20 sm:py-24 lg:py-28"
    >
      {/* Premium top lighting — a soft brand glow, not a container. */}
      <div
  aria-hidden
  className="pointer-events-none absolute inset-x-0 top-0 h-72"
  style={{
    background:
      "radial-gradient(35% 55% at 50% 0%, color-mix(in srgb, var(--brand-sky) 22%, transparent), transparent 50%, transparent 100%)",
  }}
/>

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow>Trusted across two decades</Eyebrow>
          </div>
          <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
            The brands built, advised, and led.
          </h2>
        </Reveal>

        <div className="mt-14 space-y-12 sm:mt-20 sm:space-y-16 lg:space-y-20">
          {CATEGORIES.map((cat, i) => (
            <div key={cat.label}>
              {i > 0 && (
                <div
                  aria-hidden
                  className="mx-auto mb-12 h-px max-w-sm bg-gradient-to-r from-transparent via-border-strong to-transparent sm:mb-16 lg:mb-20"
                />
              )}
              <Reveal className="mx-auto max-w-xl text-center">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-foreground-muted">
                  {cat.label}
                </p>
                <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-foreground-muted/80">
                  {cat.note}
                </p>
              </Reveal>
              <LogoRow logos={cat.logos} className="mt-9" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
