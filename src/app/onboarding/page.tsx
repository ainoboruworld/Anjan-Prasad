import type { Metadata } from "next";
import { Suspense } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { OnboardingForm } from "@/components/auth/OnboardingForm";
import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Welcome - Complete your profile",
  description: "Tell us a little about you to finish setting up your Anjan Prasad account.",
  robots: { index: false },
};

export default function OnboardingPage() {
  return (
    <main>
      {/* Authenticated, but the profile row may not exist yet - allow it. */}
      <ProtectedRoute allowIncompleteProfile>
        <section className="bg-grid relative flex min-h-screen items-center overflow-hidden pt-36 pb-20">
          <div className="mx-auto w-full max-w-xl px-6">
            <Reveal>
              <Eyebrow>Welcome</Eyebrow>
              <h1 className="mt-6 font-display text-[length:var(--text-hero)] font-semibold leading-[1.04] tracking-[-0.03em] text-foreground">
                A couple of{" "}
                <span className="editorial-accent text-brand">details.</span>
              </h1>
              <p className="mt-6 max-w-md text-[length:var(--text-lead)] leading-relaxed text-foreground-muted">
                This is a one-time step - it personalises your experience and
                takes a few seconds.
              </p>
            </Reveal>

            <Reveal className="mt-10 rounded-3xl border border-border bg-background-elevated p-8 shadow-[var(--shadow-soft)] sm:p-10">
              <Suspense fallback={null}>
                <OnboardingForm />
              </Suspense>
            </Reveal>
          </div>
        </section>
      </ProtectedRoute>
    </main>
  );
}
