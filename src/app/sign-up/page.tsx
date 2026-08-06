import type { Metadata } from "next";
import { Suspense } from "react";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Create your account",
  description:
    "Create your Anjan Prasad account with a one-time email code. No password needed. Access consultations, programs, bookings, and saved resources.",
  alternates: { canonical: "/sign-up" },
};

export default function SignUpPage() {
  return (
    <main>
      <section className="bg-grid relative flex min-h-screen items-center overflow-hidden pt-36 pb-20">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>Join</Eyebrow>
            <h1 className="mt-6 font-display text-[length:var(--text-hero)] font-semibold leading-[1.04] tracking-[-0.03em] text-foreground">
              Start the{" "}
              <span className="editorial-accent text-brand">build.</span>
            </h1>
            <p className="mt-7 max-w-md text-[length:var(--text-lead)] leading-relaxed text-foreground-muted">
              One account for consultations, programs, bookings, and saved
              playbooks. Sign up with a one-time code; no password to remember.
            </p>
          </Reveal>
          <Reveal>
            <Suspense fallback={<AuthPanelFallback />}>
              <SignUpForm />
            </Suspense>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function AuthPanelFallback() {
  return (
    <div className="h-96 rounded-3xl border border-border bg-background-elevated shadow-[var(--shadow-soft)]" />
  );
}
