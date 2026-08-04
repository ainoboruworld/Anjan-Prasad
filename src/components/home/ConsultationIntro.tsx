import { Users, FileCheck2, Compass } from "lucide-react";
import { CTAButton, Eyebrow } from "../ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";

/**
 * Career Consultation — a short overview: who it's for, what you receive,
 * and why to book it. Three compact cards, one idea each, leading to the
 * full Consultation page.
 */
const POINTS = [
  {
    icon: Users,
    kicker: "Who it's for",
    copy: "Students, working professionals, and BPL candidates facing a real decision about their path.",
  },
  {
    icon: FileCheck2,
    kicker: "What you receive",
    copy: "A prepared one-to-one session and a written next step you can act on immediately.",
  },
  {
    icon: Compass,
    kicker: "Why book it",
    copy: "An operator's read on your options — clarity today, better decisions tomorrow.",
  },
];

export function ConsultationIntro() {
  return (
    <section className="border-t border-border bg-background-sunken py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Career Consultation</Eyebrow>
            <Reveal>
              <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
                One hour that moves the{" "}
                <span className="editorial-accent text-brand">whole decision.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal>
            <CTAButton href="/consulting">Explore Consultation</CTAButton>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
          {POINTS.map((p) => {
            const Icon = p.icon;
            return (
              <RevealItem key={p.kicker} className="card card-hover p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10">
                  <Icon className="h-5 w-5 text-brand-sky" strokeWidth={1.75} />
                </span>
                <p className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                  {p.kicker}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-foreground">
                  {p.copy}
                </p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
