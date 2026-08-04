import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { getBlogPostBySlug, getBlogSlugs } from "@/lib/sanity";
import { formatBlogDate, readingTimeLabel } from "@/lib/blog";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Blog not found" };
  const title = post.seo?.title ?? post.title;
  const description = post.seo?.description ?? post.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `/knowledge-hub/blogs/${post.slug}` },
    openGraph: {
      title,
      description,
      url: `/knowledge-hub/blogs/${post.slug}`,
      type: "article",
      images: post.coverImage.url ? [{ url: post.coverImage.url }] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const body = post.bodyPreview ?? [post.excerpt];

  return (
    <main>
      <article className="pt-36 pb-24 sm:pt-44">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <Link
              href="/knowledge-hub/blogs"
              className="inline-flex items-center gap-2 text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
              All blogs
            </Link>

            <div className="mt-8 flex flex-wrap gap-2">
              {post.categories.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand"
                >
                  {c}
                </span>
              ))}
            </div>

            <h1 className="mt-5 font-display text-[length:var(--text-chapter)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground">
              {post.title}
            </h1>

            <div className="mt-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/12 font-display text-sm font-bold text-brand">
                {post.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {post.author.name}
                </p>
                <p className="flex items-center gap-2 text-xs text-foreground-muted">
                  <span>{formatBlogDate(post.publishedAt)}</span>
                  <span aria-hidden>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" strokeWidth={2} aria-hidden />
                    {readingTimeLabel(post.readingTimeMins)}
                  </span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Cover */}
        <Reveal className="mx-auto mt-12 max-w-4xl px-6">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem] border border-border">
            {post.coverImage.url ? (
              <Image
                src={post.coverImage.url}
                alt={post.coverImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 56rem"
                className="object-cover"
                priority
              />
            ) : (
              <Placeholder
                caption={post.categories[0] ?? "Article"}
                aspect="16/9"
                rounded="rounded-none"
                className="!border-0 !shadow-none"
              />
            )}
          </div>
        </Reveal>

        {/* Body */}
        <div className="mx-auto mt-12 max-w-3xl px-6">
          <Reveal className="space-y-6">
            <p className="text-[length:var(--text-lead)] font-medium leading-relaxed text-foreground">
              {post.excerpt}
            </p>
            {body.map((para, i) => (
              <p
                key={i}
                className="text-[length:var(--text-body)] leading-relaxed text-foreground-muted"
              >
                {para}
              </p>
            ))}
          </Reveal>
        </div>
      </article>
    </main>
  );
}
