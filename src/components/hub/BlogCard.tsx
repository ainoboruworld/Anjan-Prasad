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
 * Blog card — the reusable unit of the Blogs grid. Featured image (real
 * cover when present, else a Placeholder), category chips, title, short
 * description, reading time, published date, author, and a Read More link.
 */
export function BlogCard({ post }: { post: BlogPost }) {
  const href = `/knowledge-hub/blogs/${post.slug}`;
  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <Link href={href} className="relative block" aria-label={post.title}>
        <div className="relative aspect-[16/9] overflow-hidden">
          {post.coverImage.url ? (
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <Placeholder
              caption={post.categories[0] ?? "Article"}
              aspect="16/9"
              rounded="rounded-none"
              className="!border-x-0 !border-t-0 !shadow-none"
            />
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {post.categories.map((c) => (
            <span
              key={c}
              className="rounded-full bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand"
            >
              {c}
            </span>
          ))}
        </div>

        <h3 className="mt-4 font-display text-xl font-semibold leading-snug tracking-tight text-foreground">
          <Link href={href} className="transition-colors group-hover:text-brand">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-foreground-muted">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="mt-6 flex items-center gap-3 border-t border-hairline pt-5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/12 font-display text-xs font-bold text-brand">
            {post.author.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">
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

        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-brand"
        >
          Read More
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
          />
        </Link>
      </div>
    </article>
  );
}
