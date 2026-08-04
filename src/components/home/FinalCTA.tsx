import { CTAButton, GhostButton } from "../ui/Primitives";
import { Reveal } from "../ui/Reveal";

/** Closing invitation — the homepage's answer to "what should I do next?" */
export function FinalCTA() {
  return (
    <section className="bg-blueprint relative overflow-hidden border-t border-border py-24 sm:py-28">
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
            Ready to Build Your{" "}
            <span className="editorial-accent text-brand">Next Chapter?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-foreground-muted">
            Bring a proven operating playbook into your business — or get clarity
            on your next decision.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <CTAButton href="/business-advisory">Business Advisory</CTAButton>
            <GhostButton href="/consulting">Career Consultation</GhostButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
