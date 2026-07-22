import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Mail, PlaySquare } from "lucide-react";
import { Newsletter } from "@/components/Newsletter";
import { PageHero, SectionHeading } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Blogs, the weekly newsletter, and featured media — the Knowledge Hub of AP.com, in one place.",
};

const RESOURCES = [
  {
    icon: BookOpen,
    title: "Blogs",
    href: "/knowledge-hub",
    copy: "The Knowledge Hub — playbooks, frameworks, and field notes on building profitable businesses.",
  },
  {
    icon: Mail,
    title: "Newsletter",
    href: "#newsletter",
    copy: "One operator's letter, every week. Margins, systems, and method — never motivation.",
  },
  {
    icon: PlaySquare,
    title: "Featured Media",
    href: "/media",
    copy: "Talks, videos, podcasts, faculty work, and press across two decades of building.",
  },
];

export default function ResourcesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Resources"
        title={
          <>
            Everything worth{" "}
            <span className="editorial-accent text-brand">reading first.</span>
          </>
        }
        lead="The Knowledge Hub lives here — blogs, the weekly newsletter, and featured media."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <RevealGroup className="grid gap-6 sm:grid-cols-3">
            {RESOURCES.map((r) => (
              <RevealItem key={r.title}>
                <Link
                  href={r.href}
                  className="card card-hover group flex h-full flex-col p-8"
                >
                  <r.icon className="h-6 w-6 text-brand" strokeWidth={1.75} />
                  <h2 className="mt-5 flex items-center gap-1.5 font-display text-xl font-semibold tracking-tight text-foreground">
                    {r.title}
                    <ArrowUpRight
                      className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                      strokeWidth={2}
                    />
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                    {r.copy}
                  </p>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section
        id="newsletter"
        className="border-t border-border bg-background-elevated/60 py-24"
      >
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionHeading
            align="center"
            eyebrow="Newsletter"
            title={
              <>
                One operator&apos;s letter.{" "}
                <span className="editorial-accent text-brand">Every week.</span>
              </>
            }
          />
          <Reveal className="mt-10 flex justify-center">
            <Newsletter />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
