import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, PlaySquare } from "lucide-react";
import { getBlogPosts } from "@/lib/sanity";
import { FeaturedArticle } from "@/components/hub/FeaturedArticle";
import { Eyebrow, PageHero } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Knowledge Hub - Blogs & Featured Media",
  description:
    "The Knowledge Hub of Anjan Prasad - premium blogs on business, startups, marketing and more, plus featured media and public appearances by Anjan Prasad.",
  alternates: { canonical: "/knowledge-hub" },
  openGraph: {
    title: "Knowledge Hub - Anjan Prasad",
    description:
      "Premium blogs and featured media on building profitable businesses.",
    url: "/knowledge-hub",
    type: "website",
  },
};

const ENTRIES = [
  {
    icon: BookOpen,
    title: "Blogs",
    href: "/knowledge-hub/blogs",
    copy: "Playbooks, frameworks and field notes - across business, startup, marketing, society, spirituality and politics.",
  },
  {
    icon: PlaySquare,
    title: "Featured Media",
    href: "/media",
    copy: "Videos, talks and appearances - Anjan Prasad's public content across platforms.",
  },
];

export default async function KnowledgeHubPage() {
  const posts = await getBlogPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];

  return (
    <main>
      <PageHero
        eyebrow="Knowledge Hub"
        title={
          <>
            The operator&apos;s{" "}
            <span className="editorial-accent text-brand">library.</span>
          </>
        }
        lead="A premium editorial home for everything Anjan Prasad publishes - blogs written to be used, and the media where the method is explained aloud."
      />

      {/* Two entries - Blogs & Featured Media */}
      <section className="border-t border-border py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <RevealGroup className="grid gap-6 sm:grid-cols-2">
            {ENTRIES.map((e) => (
              <RevealItem key={e.title}>
                <Link
                  href={e.href}
                  className="card card-hover group flex h-full flex-col p-9"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10">
                    <e.icon className="h-6 w-6 text-brand-sky" strokeWidth={1.75} />
                  </span>
                  <h2 className="mt-6 flex items-center gap-1.5 font-display text-2xl font-semibold tracking-tight text-foreground">
                    {e.title}
                    <ArrowUpRight
                      className="h-5 w-5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                      strokeWidth={2}
                    />
                  </h2>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-foreground-muted">
                    {e.copy}
                  </p>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Latest from the blog */}
      {featured && (
        <section className="border-t border-border py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <Reveal>
                <Eyebrow>From the blog</Eyebrow>
              </Reveal>
              <Reveal>
                <Link
                  href="/knowledge-hub/blogs"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-brand"
                >
                  All blogs
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                  />
                </Link>
              </Reveal>
            </div>
            <Reveal className="mt-8">
              <FeaturedArticle post={featured} />
            </Reveal>
          </div>
        </section>
      )}
    </main>
  );
}
