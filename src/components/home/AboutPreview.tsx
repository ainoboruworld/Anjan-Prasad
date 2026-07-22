import { JOURNEY } from "@/lib/data";
import { SectionHeading, TextLink } from "../ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";

/**
 * "Who is Anjan Prasad?" — a compact editorial answer with the career
 * timeline in miniature, leading to the full About page.
 */
export function AboutPreview() {
  return (
    <section className="py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="About Anjan Prasad"
              title={
                <>
                  An operator,{" "}
                  <span className="editorial-accent text-brand">
                    not a theorist.
                  </span>
                </>
              }
              lead="Two decades inside global agencies, enterprise growth teams, and three bootstrapped companies of his own. Anjan advises businesses the way he runs them — on systems, margins, and accountable execution."
            />
            <Reveal className="mt-8">
              <TextLink href="/about">The full story</TextLink>
            </Reveal>
          </div>

          {/* Miniature timeline with premium connectors */}
          <RevealGroup as="ul" className="relative">
            <span
              aria-hidden
              className="absolute left-[7px] top-3 bottom-3 w-px bg-gradient-to-b from-brand/60 via-border-strong to-transparent"
            />
            {JOURNEY.map((ch) => (
              <RevealItem
                key={ch.index}
                as="li"
                className="group relative pb-8 pl-10 last:pb-0"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-1.5 h-[15px] w-[15px] rotate-45 border border-brand/60 bg-background transition-colors duration-300 group-hover:bg-brand"
                />
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
                  {ch.era}
                </p>
                <h3 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-foreground">
                  {ch.title}
                </h3>
                <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-foreground-muted">
                  {ch.copy}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
