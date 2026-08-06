import type { Metadata } from "next";
import { Suspense } from "react";
import { SignInForm } from "@/components/auth/SignInForm";
import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to Anjan Prasad with a one-time email code - no password needed. Access your profile, bookings, and saved resources.",
};

export default function SignInPage() {
  return (
    <main>
      <section className="bg-grid relative flex min-h-screen items-center overflow-hidden pt-36 pb-20">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Members</Eyebrow>
            <h1 className="mt-6 font-display text-[length:var(--text-hero)] font-semibold leading-[1.04] tracking-[-0.03em] text-foreground">
              Back to{" "}
              <span className="editorial-accent text-brand">the build.</span>
            </h1>
            <p className="mt-7 max-w-md text-[length:var(--text-lead)] leading-relaxed text-foreground-muted">
              Your profile, bookings, and saved playbooks - one door for all of
              it. Sign in with a one-time code; no password to remember.
            </p>
          </Reveal>
          <Reveal>
            <Suspense fallback={<AuthPanelFallback />}>
              <SignInForm />
            </Suspense>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function AuthPanelFallback() {
  return (
    <div className="h-72 rounded-3xl border border-border bg-background-elevated shadow-[var(--shadow-soft)]" />
  );
}
