import Link from "next/link";
import { TESTIMONIALS } from "@/lib/data";
import { CTAButton, GhostButton, TextLink } from "../ui/Primitives";
import { Reveal } from "../ui/Reveal";

/**
 * Proof woven as a single editorial pull-quote, followed by the closing
 * invitation - the homepage's answer to "what should I do next?"
 */
export function ProofAndNextStep() {
  const quote = TESTIMONIALS[0];

  return (
    <>
      {/* Pull quote */}
      <section className="border-t border-border bg-background-sunken py-28">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <p
              aria-hidden
              className="font-serif text-7xl italic leading-none text-brand"
            >
              &ldquo;
            </p>
            <blockquote className="-mt-6">
              <p className="font-display text-3xl font-medium leading-[1.25] tracking-tight text-foreground sm:text-4xl">
                {quote.quote}
              </p>
              <footer className="mt-8 flex items-center gap-4">
                <span aria-hidden className="h-px w-12 bg-brand" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{quote.name}</p>
                  <p className="text-sm text-foreground-muted">{quote.title}</p>
                </div>
              </footer>
            </blockquote>
            <div className="mt-10 flex flex-wrap gap-8">
              <TextLink href="/testimonials">More voices</TextLink>
              <TextLink href="/case-studies">The full transformations</TextLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing invitation */}
      <section className="bg-blueprint relative overflow-hidden border-t border-border py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(79,169,255,0.12),transparent_65%)] blur-3xl"
        />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-foreground-muted">
              Your next step
            </p>
            <h2 className="mt-6 font-display text-[length:var(--text-chapter)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground">
              The business you want to build{" "}
              <span className="editorial-accent text-brand">has a method.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-foreground-muted">
              See it working live - or bring it into your business.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <CTAButton href="/courses/demo">Book a Demo Session</CTAButton>
              <GhostButton href="/business-advisory">Business Advisory</GhostButton>
            </div>
            <p className="mt-8 text-sm text-foreground-muted">
              Prefer to read first?{" "}
              <Link href="/knowledge-hub" className="font-medium text-foreground underline decoration-brand underline-offset-4 hover:text-brand">
                Start in the Knowledge Hub
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
