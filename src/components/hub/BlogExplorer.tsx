"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { BLOG_CATEGORIES, type BlogPost } from "@/lib/blog";
import { easeSmooth } from "../motion";
import { BlogCard } from "./BlogCard";

const PAGE_SIZE = 6;
const FILTERS = ["All", ...BLOG_CATEGORIES] as const;

/**
 * Blogs explorer - client-side search, category filter tabs, and Load More
 * paging over the posts passed in from the server. Filtering animates
 * smoothly; nothing navigates away.
 */
export function BlogExplorer({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const inCat = active === "All" || p.categories.includes(active);
      const inText =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.categories.some((c) => c.toLowerCase().includes(q));
      return inCat && inText;
    });
  }, [posts, query, active]);

  const shown = results.slice(0, visible);
  const hasMore = visible < results.length;

  const onFilter = (f: (typeof FILTERS)[number]) => {
    setActive(f);
    setVisible(PAGE_SIZE);
  };

  return (
    <div>
      {/* Search + filter tabs */}
      <div className="flex flex-col gap-6">
        <div className="relative max-w-md">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted"
            strokeWidth={1.75}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(PAGE_SIZE);
            }}
            placeholder="Search blogs…"
            aria-label="Search blogs"
            className="input !pl-11"
          />
        </div>

        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter by category"
        >
          {FILTERS.map((cat) => {
            const on = active === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => onFilter(cat)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                  on
                    ? "border-transparent bg-brand text-brand-ink"
                    : "border-border text-foreground-muted hover:border-border-strong hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results */}
      <motion.ul layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((post) => (
            <motion.li
              key={post.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: easeSmooth }}
              className="h-full"
            >
              <BlogCard post={post} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {results.length === 0 && (
        <p className="mt-16 text-center text-[15px] text-foreground-muted">
          No blogs match{" "}
          <span className="font-medium text-foreground">
            &ldquo;{query}&rdquo;
          </span>
          . Try another search or category.
        </p>
      )}

      {hasMore && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="inline-flex items-center gap-2 rounded-full border border-border-strong px-7 py-3.5 text-[15px] font-medium text-foreground transition-colors hover:bg-background-elevated"
          >
            Load more
            <span className="text-foreground-muted">
              ({results.length - visible})
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
