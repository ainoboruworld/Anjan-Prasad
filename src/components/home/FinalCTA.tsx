import Link from "next/link";
import { CTAButton, GhostButton } from "../ui/Primitives";
import { Reveal } from "../ui/Reveal";

/** Closing invitation — the homepage's answer to "what should I do next?" */
export function FinalCTA() {
  return (
    <section className="bg-blueprint relative overflow-hidden border-t border-border py-32 sm:py-40">
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
            See it working live for ₹99 — or bring it straight into
            your business.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <CTAButton href="/courses/demo">Book a ₹99 Demo Session</CTAButton>
            <GhostButton href="/consulting">Schedule a Consultation</GhostButton>
          </div>
          <p className="mt-8 text-sm text-foreground-muted">
            Running a business already?{" "}
            <Link
              href="/business-advisory"
              className="font-medium text-foreground underline decoration-brand underline-offset-4 hover:text-brand"
            >
              Explore Business Advisory
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
