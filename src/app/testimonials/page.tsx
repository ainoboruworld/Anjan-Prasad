import type { Metadata } from "next";
import { TESTIMONIALS } from "@/lib/data";
import { CTAButton, Eyebrow, PageHero } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Testimonials — Founders & Students",
  description:
    "Founder stories, student stories, and business transformations — the people who built with AP.com, in their own words.",
};

/** Video plate awaiting the real footage — framed so the embed drops in. */
function VideoPlate({ label }: { label: string }) {
  return (
    <div
      data-cursor="play"
      className="bg-blueprint relative aspect-video w-full overflow-hidden rounded-3xl border border-border bg-background-elevated"
      role="img"
      aria-label={`${label} — video coming soon`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-border-strong bg-background/70 backdrop-blur">
          <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 text-foreground" fill="currentColor" aria-hidden>
            <path d="M8 5.5v13l11-6.5-11-6.5z" />
          </svg>
        </span>
        <p className="text-xs uppercase tracking-[0.24em] text-foreground-muted">{label}</p>
      </div>
    </div>
  );
}

const GROUPS = [
  { kind: "Founder", title: "Founders who rebuilt" },
  { kind: "Student", title: "Students who built first" },
  { kind: "Enterprise", title: "Enterprises that transformed" },
] as const;

export default function TestimonialsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Testimonials"
        title={
          <>
            Minimal words.{" "}
            <span className="editorial-accent text-brand">Maximum proof.</span>
          </>
        }
        lead="Video-first stories from founders, students, and organisations. Filmed testimonials are being edited for release; the plates below hold their places, word for word."
      />

      {/* Video-first stage */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-7xl px-6">
          <RevealGroup className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <RevealItem>
              <VideoPlate label="A founder's transformation" />
            </RevealItem>
            <RevealItem className="grid gap-6">
              <VideoPlate label="A student's first business" />
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* Voices, grouped */}
      {GROUPS.map((g, gi) => {
        const voices = TESTIMONIALS.filter((t) => t.kind === g.kind);
        if (voices.length === 0) return null;
        return (
          <section
            key={g.kind}
            className={`py-20 ${gi % 2 === 0 ? "bg-background-elevated" : ""} border-t border-border`}
          >
            <div className="mx-auto max-w-7xl px-6">
              <Reveal>
                <Eyebrow>{g.title}</Eyebrow>
              </Reveal>
              <RevealGroup className="mt-10 grid gap-x-16 gap-y-12 lg:grid-cols-2">
                {voices.map((t) => (
                  <RevealItem key={t.name} as="div">
                    <figure>
                      <blockquote>
                        <p className="font-display text-2xl font-medium leading-[1.35] tracking-tight text-foreground">
                          &ldquo;{t.quote}&rdquo;
                        </p>
                      </blockquote>
                      <figcaption className="mt-6 flex items-center gap-4">
                        <span
                          aria-hidden
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background font-display text-sm font-semibold text-brand"
                        >
                          {t.name
                            .split(" ")
                            .map((w) => w[0])
                            .slice(0, 2)
                            .join("")}
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-foreground">
                            {t.name}
                          </span>
                          <span className="block text-sm text-foreground-muted">{t.title}</span>
                        </span>
                      </figcaption>
                    </figure>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </section>
        );
      })}

      <section className="bg-blueprint border-t border-border py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <h2 className="font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
              Add your story{" "}
              <span className="editorial-accent text-brand">to this page.</span>
            </h2>
            <div className="mt-9">
              <CTAButton href="/courses/demo">Start with the Demo Session</CTAButton>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
