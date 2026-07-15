import type { Metadata } from "next";
import { MEDIA_ITEMS } from "@/lib/data";
import { CTAButton, Eyebrow, PageHero, RuleTick } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Media & Recognition",
  description:
    "Speaking engagements, podcasts, guest lectures, visiting faculty work, publications, and awards — where the industry meets Anjan Prasad.",
};

const KINDS = ["Speaking", "Podcast", "Guest Lecture", "Faculty", "Press", "Award"] as const;

export default function MediaPage() {
  return (
    <main>
      <PageHero
        eyebrow="Media & Recognition"
        title={
          <>
            The industry{" "}
            <span className="editorial-accent text-brand">listens.</span>
          </>
        }
        lead="Keynotes, podcasts, classrooms, and press — the public record of two decades spent building and explaining businesses. Video embeds and institution marks land here as each appearance is licensed for publication."
      />

      {/* Authority ledger — editorial timeline, not a gallery */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <RevealGroup className="divide-y divide-border border-y border-border">
            {MEDIA_ITEMS.map((m) => (
              <RevealItem
                key={m.title}
                className="group grid gap-3 py-9 transition-colors duration-300 hover:bg-background-elevated sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:px-4"
                data-cursor={m.kind === "Podcast" || m.kind === "Speaking" ? "play" : "view"}
              >
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand sm:col-span-2">
                  {m.kind}
                </p>
                <div className="sm:col-span-6">
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                    {m.title}
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">
                    {m.note}
                  </p>
                </div>
                <p className="text-sm text-foreground sm:col-span-3">{m.venue}</p>
                <p className="font-display text-sm font-semibold text-foreground-muted sm:col-span-1 sm:text-right">
                  {m.year}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Coverage spectrum */}
          <Reveal className="mt-16">
            <Eyebrow>Across formats</Eyebrow>
            <p className="mt-6 flex flex-wrap gap-x-3 gap-y-2 font-display text-2xl font-semibold tracking-tight text-foreground-muted">
              {KINDS.map((k, i) => (
                <span key={k} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden className="text-brand">·</span>}
                  <span className="transition-colors hover:text-foreground">{k}s</span>
                </span>
              ))}
            </p>
          </Reveal>
        </div>
      </section>

      <RuleTick />

      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <h2 className="font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
              Invite Anjan to{" "}
              <span className="editorial-accent text-brand">your stage.</span>
            </h2>
            <p className="mt-5 text-[length:var(--text-body)] leading-relaxed text-foreground-muted">
              Keynotes, panels, podcasts, and guest lectures on business
              building, transformation, and AI-native operations.
            </p>
            <div className="mt-9">
              <CTAButton href="/contact?interest=speaking">Request an appearance</CTAButton>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
