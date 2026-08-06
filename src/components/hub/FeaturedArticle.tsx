import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
import {
  formatBlogDate,
  readingTimeLabel,
  type BlogPost,
} from "@/lib/blog";
import { Placeholder } from "../ui/Placeholder";

/**
 * Featured article - the front-page spread of the Blogs page. A large,
 * two-column editorial card built from the same BlogPost shape as the grid.
 */
export function FeaturedArticle({ post }: { post: BlogPost }) {
  const href = `/knowledge-hub/blogs/${post.slug}`;
  return (
    <article className="card card-hover group grid overflow-hidden lg:grid-cols-2">
      <Link href={href} className="relative block" aria-label={post.title}>
        <div className="relative aspect-[16/10] h-full w-full overflow-hidden lg:aspect-auto lg:min-h-[22rem]">
          {post.coverImage.url ? (
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              priority
            />
          ) : (
            <Placeholder
              caption={post.categories[0] ?? "Featured"}
              aspect="16/10"
              rounded="rounded-none"
              className="h-full !border-0 !shadow-none"
            />
          )}
        </div>
      </Link>

      <div className="flex flex-col justify-center p-8 sm:p-11">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-ink">
            Featured
          </span>
          {post.categories.map((c) => (
            <span
              key={c}
              className="rounded-full bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand"
            >
              {c}
            </span>
          ))}
        </div>

        <h2 className="mt-6 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-[2.4rem]">
          <Link href={href} className="transition-colors group-hover:text-brand">
            {post.title}
          </Link>
        </h2>
        <p className="mt-4 max-w-lg text-[length:var(--text-lead)] leading-relaxed text-foreground-muted">
          {post.excerpt}
        </p>

        <div className="mt-8 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/12 font-display text-xs font-bold text-brand">
            {post.author.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </span>
          <p className="flex flex-wrap items-center gap-x-2 text-sm text-foreground-muted">
            <span className="font-medium text-foreground">{post.author.name}</span>
            <span aria-hidden>·</span>
            <span>{formatBlogDate(post.publishedAt)}</span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" strokeWidth={2} aria-hidden />
              {readingTimeLabel(post.readingTimeMins)}
            </span>
          </p>
        </div>

        <Link
          href={href}
          className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-hover"
        >
          Read More
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
          />
        </Link>
      </div>
    </article>
  );
}
