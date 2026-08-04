import { CheckCircle2 } from "lucide-react";
import { CTAButton, Eyebrow } from "../ui/Primitives";
import { Placeholder } from "../ui/Placeholder";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";

/**
 * About Anjan Prasad — a short introduction only (not the full About page).
 * A portrait placeholder, two compact text blocks, and a few small
 * achievements, leading to the full story.
 */
const ACHIEVEMENTS = [
  "Founder & CEO, Noboru World",
  "CEO, Filing Buddy",
  "Visiting Faculty — IIFT · IMT Ghaziabad",
  "16+ years across Fortune 500 & startups",
];

export function AboutIntro() {
  return (
    <section className="py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Portrait placeholder */}
        <Reveal>
          <div className="relative mx-auto w-full max-w-sm lg:mx-0">
            <Placeholder
              label="Anjan Prasad"
              caption="At work — portrait"
              aspect="4/5"
            />
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <Eyebrow>About Anjan Prasad</Eyebrow>
          <Reveal>
            <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
              An operator,{" "}
              <span className="editorial-accent text-brand">not a theorist.</span>
            </h2>
          </Reveal>

          <RevealGroup className="mt-6 space-y-5">
            <RevealItem>
              <p className="max-w-xl text-[length:var(--text-body)] leading-relaxed text-foreground-muted">
                Two decades inside global agencies, enterprise growth teams, and
                three bootstrapped companies of his own.
              </p>
            </RevealItem>
            <RevealItem>
              <p className="max-w-xl text-[length:var(--text-body)] leading-relaxed text-foreground-muted">
                He advises businesses the way he runs them — on systems, margins,
                and accountable execution.
              </p>
            </RevealItem>
          </RevealGroup>

          <RevealGroup className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {ACHIEVEMENTS.map((a) => (
              <RevealItem key={a} className="flex items-start gap-2.5">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-sky"
                  strokeWidth={2}
                />
                <span className="text-sm leading-relaxed text-foreground">{a}</span>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-10">
            <CTAButton href="/about">Learn More</CTAButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
