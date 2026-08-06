import { Counter } from "../ui/Counter";
import { SectionHeading } from "../ui/Primitives";
import { RevealGroup, RevealItem } from "../ui/Reveal";
import { StatImage } from "../ui/StatImage";
import type { CmsStat } from "@/lib/cms";

/**
 * Trust & Experience - the record in animated numbers. Numeric stats count
 * up on scroll (premium easeOut settle); non-numeric stats render as text.
 * Answers "why trust him?" before a paragraph is read.
 */
type Stat = {
  value?: number;
  prefix?: string;
  suffix?: string;
  text?: string;
  image?: string;
  label: string;
};

const STATS: Stat[] = [
  { value: 16, suffix: "+", label: "Years of Experience" },
  { value: 250, suffix: "+", label: "Businesses Guided" },
  { value: 4, label: "Ventures Built" },
  { value: 100, suffix: "+", label: "Brands Worked With" },
  { image: "/images/fortune-500.png", text: "Fortune 500", label: "Companies Advised" },
  { value: 3, suffix: "+", label: "Institutions & Universities" },
];

/** Map a CMS stat ("16+", "Fortune 500") to the render shape. */
function fromCms(s: CmsStat): Stat {
  const m = s.value.trim().match(/^(\d+)(\D*)$/);
  if (m) return { value: Number(m[1]), suffix: m[2] || undefined, label: s.label };
  return { text: s.value, label: s.label };
}

export function TrustExperience({ stats }: { stats?: CmsStat[] | null }) {
  const items: Stat[] = stats && stats.length > 0 ? stats.map(fromCms) : STATS;
  return (
    <section
      aria-label="Trust and experience"
      className="border-b border-border py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          align="center"
          eyebrow="Trust & Experience"
          title={
            <>
              A record measured in{" "}
              <span className="editorial-accent text-brand">outcomes.</span>
            </>
          }
        />

        <RevealGroup
          as="ul"
          className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-6"
        >
          {items.map((s) => (
            <RevealItem
              as="li"
              key={s.label}
              className="flex flex-col items-center gap-2 text-center"
            >
              <span className="flex min-h-[2.75rem] items-center justify-center font-display text-4xl font-semibold tracking-tight text-foreground sm:min-h-[3.25rem] sm:text-5xl">
                {typeof s.value === "number" ? (
                  <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                ) : s.image ? (
                  <StatImage src={s.image} alt={s.text ?? s.label} fallback={s.text ?? s.label} />
                ) : (
                  s.text
                )}
              </span>
              <span className="max-w-[11rem] text-sm leading-relaxed text-foreground-muted">
                {s.label}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
