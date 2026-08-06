import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "../ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";

const PILLARS = [
  {
    index: "I",
    title: "Learn",
    copy: "The Demo Session and the flagship Live Course - implementation-first business education.",
    href: "/courses",
    label: "Courses",
  },
  {
    index: "II",
    title: "Transform",
    copy: "Hands-on advisory that rebuilds revenue engines, operations, and teams from the inside.",
    href: "/business-advisory",
    label: "Business Advisory",
  },
  {
    index: "III",
    title: "Prove",
    copy: "Transformation stories told end to end - challenge, execution, and the numbers after.",
    href: "/case-studies",
    label: "Case Studies",
  },
  {
    index: "IV",
    title: "Belong",
    copy: "A knowledge hub, a weekly letter, and a community of builders who hold each other to the method.",
    href: "/knowledge-hub",
    label: "Knowledge Hub",
  },
];

/**
 * What Anjan Prasad is: four connected practices drawn as one architectural
 * elevation - a stepped structure rather than a card grid.
 */
export function Ecosystem() {
  return (
    <section className="bg-grid relative border-t border-border py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-3xl">
          <Eyebrow>The ecosystem</Eyebrow>
          <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
            One platform.{" "}
            <span className="editorial-accent text-brand">
              Every stage of the build.
            </span>
          </h2>
          <p className="mt-5 text-[length:var(--text-body)] leading-relaxed text-foreground-muted">
            Education, advisory, and community - one system, so the next step
            always exists.
          </p>
        </Reveal>

        {/* Stepped elevation: each practice sits one level higher */}
        <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
          {PILLARS.map((p, i) => (
            <RevealItem key={p.title}>
              <Link
                href={p.href}
                className="group flex h-full flex-col bg-background p-7 transition-colors duration-300 hover:bg-background-elevated"
                style={{ paddingTop: `${1.75 + (3 - i) * 1.25}rem` }}
              >
                <span
                  aria-hidden
                  className="font-serif text-sm italic text-foreground-muted"
                >
                  {p.index}
                </span>
                <span className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground">
                  {p.title}
                </span>
                <span className="mt-3 flex-1 text-[15px] leading-relaxed text-foreground-muted">
                  {p.copy}
                </span>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-brand">
                  {p.label}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                  />
                </span>
                {/* Rising baseline: the 0 → 1 → Scale slope */}
                <span
                  aria-hidden
                  className="mt-6 block h-1 bg-brand/25"
                >
                  <span
                    className="block h-full bg-brand transition-[width] duration-500 group-hover:w-full"
                    style={{ width: `${(i + 1) * 25}%` }}
                  />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-8">
          <p className="text-center text-xs uppercase tracking-[0.28em] text-foreground-muted">
            0 <span className="mx-2 text-brand">→</span> 1{" "}
            <span className="mx-2 text-brand">→</span> Scale
          </p>
        </Reveal>
      </div>
    </section>
  );
}
