import type { Metadata } from "next";
import { Wordmark } from "@/components/brand/ApMark";
import { AuthPanel } from "@/components/AuthPanel";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in or register for AP.com — access sessions, courses, and resources with a one-time passcode.",
};

const POINTS = [
  "Reserve seats for live demo sessions",
  "Access the premium course and workbooks",
  "Save case studies, articles, and media",
];

export default function SignInPage() {
  return (
    <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Brand panel */}
      <section className="bg-grid relative hidden flex-col justify-between overflow-hidden border-r border-border bg-background-elevated/30 p-12 pt-28 lg:flex">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 top-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(238,192,75,0.14),transparent_65%)] blur-3xl"
        />
        <Wordmark />
        <div>
          <h1 className="max-w-md font-display text-[clamp(2rem,3.5vw,3rem)] font-semibold leading-tight tracking-tight text-foreground">
            Build a profitable business — with the right room to learn in.
          </h1>
          <ul className="mt-10 space-y-4">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-3 text-foreground-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} Anjan Prasad
        </p>
      </section>

      {/* Auth panel */}
      <section className="flex items-center justify-center px-6 py-32">
        <AuthPanel />
      </section>
    </main>
  );
}
