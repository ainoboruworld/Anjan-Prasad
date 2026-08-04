import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ARTICLES } from "@/lib/data";
import { SectionHeading, TextLink } from "../ui/Primitives";
import { RevealGroup, RevealItem } from "../ui/Reveal";

/**
 * From the Knowledge Hub — a clean editorial shelf of the latest writing.
 * Text-first cards (no placeholder imagery), premium and quick to scan.
 */
export function KnowledgeMedia() {
  const articles = ARTICLES.slice(0, 4);

  return (
    <section className="border-t border-border bg-background-sunken py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Knowledge Hub"
            title={
              <>
                Playbooks &amp;{" "}
                <span className="editorial-accent text-brand">field notes.</span>
              </>
            }
            lead="How profitable businesses are actually built — written to be used, not skimmed."
          />
          <TextLink href="/knowledge-hub/blogs">All articles</TextLink>
        </div>

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((a) => (
            <RevealItem key={a.slug} className="h-full">
              <Link
                href="/knowledge-hub/blogs"
                className="card card-hover group flex h-full flex-col p-7"
                data-cursor="view"
              >
                <span className="w-fit rounded-full bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand">
                  {a.category}
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-brand">
                  {a.title}
                </h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-foreground-muted">
                  {a.dek}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 border-t border-hairline pt-4 text-sm font-medium text-foreground">
                  Read
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                  />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
