import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/sanity";
import { FeaturedArticle } from "@/components/hub/FeaturedArticle";
import { BlogExplorer } from "@/components/hub/BlogExplorer";
import { Eyebrow, PageHero } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Blogs — Knowledge Hub",
  description:
    "Premium blogs from Anjan Prasad across business, startups, marketing, society, spirituality and politics. Search, filter by category, and read the latest.",
  alternates: { canonical: "/knowledge-hub/blogs" },
  openGraph: {
    title: "Blogs — Knowledge Hub · AP.com",
    description:
      "Playbooks, frameworks and field notes on building profitable businesses.",
    url: "/knowledge-hub/blogs",
    type: "website",
  },
};

export default async function BlogsPage() {
  const posts = await getBlogPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = featured ? posts.filter((p) => p.slug !== featured.slug) : posts;

  return (
    <main>
      <PageHero
        eyebrow="Blogs"
        title={
          <>
            Written to be{" "}
            <span className="editorial-accent text-brand">used.</span>
          </>
        }
        lead="Playbooks, frameworks, and field notes from inside real businesses — across business, startup, marketing, society, spirituality and politics."
      />

      {/* Featured article */}
      {featured && (
        <section className="border-t border-border py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <Eyebrow>Featured</Eyebrow>
            </Reveal>
            <Reveal className="mt-8">
              <FeaturedArticle post={featured} />
            </Reveal>
          </div>
        </section>
      )}

      {/* All blogs — search, filters, load more */}
      <section className="border-t border-border py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="max-w-2xl">
            <Eyebrow>All blogs</Eyebrow>
            <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
              Find your next read.
            </h2>
          </Reveal>
          <div className="mt-10">
            <BlogExplorer posts={rest} />
          </div>
        </div>
      </section>
    </main>
  );
}
