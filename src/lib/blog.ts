/**
 * Blog content model — the shape the Knowledge Hub renders, plus a local
 * seed slate so the Blogs page is fully populated before Sanity is wired.
 *
 * The frontend reads blogs through `src/lib/sanity.ts`, which returns real
 * Sanity documents when the project is configured and falls back to
 * `SEED_BLOG_POSTS` otherwise. Components reference posts by this `BlogPost`
 * shape only, so swapping the seed for live CMS data needs no UI change.
 */

export const BLOG_CATEGORIES = [
  "Politics",
  "Spirituality",
  "Marketing",
  "Business",
  "Startup",
  "Society",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export interface BlogAuthor {
  name: string;
  role?: string;
  avatarUrl?: string;
}

export interface BlogImage {
  /** Absolute URL once artwork exists; empty renders a Placeholder. */
  url?: string;
  alt: string;
}

export interface BlogSEO {
  title?: string;
  description?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** A post can belong to one or more categories. */
  categories: BlogCategory[];
  coverImage: BlogImage;
  author: BlogAuthor;
  /** ISO date. Scheduled (future) posts are filtered out until due. */
  publishedAt: string;
  readingTimeMins: number;
  featured?: boolean;
  seo?: BlogSEO;
  /** Plain-text body used by the detail page until Portable Text is wired. */
  bodyPreview?: string[];
}

const AP: BlogAuthor = { name: "Anjan Prasad", role: "Founder & Growth Advisor" };

/** Representative editorial slate — replaced automatically by Sanity content. */
export const SEED_BLOG_POSTS: BlogPost[] = [
  {
    slug: "anatomy-of-a-profitable-business",
    title: "The Anatomy of a Profitable Business",
    excerpt:
      "Nine systems every durable business runs on — and the exact order to build them in.",
    categories: ["Business", "Startup"],
    coverImage: { alt: "Blueprint of a profitable business" },
    author: AP,
    publishedAt: "2026-07-22",
    readingTimeMins: 12,
    featured: true,
    bodyPreview: [
      "Profit is not an event. It is the output of a handful of systems working in sequence.",
      "This is the order those systems are built in — and why skipping one quietly caps every business that skips it.",
    ],
  },
  {
    slug: "validate-before-you-build",
    title: "Validate Before You Build",
    excerpt:
      "A ₹0 validation method that kills bad ideas in two weeks instead of two years.",
    categories: ["Startup"],
    coverImage: { alt: "Idea validation on a whiteboard" },
    author: AP,
    publishedAt: "2026-07-08",
    readingTimeMins: 9,
    bodyPreview: [
      "Most founders build first and ask questions later. The order is backwards.",
      "Here is the validation loop that separates a real market from a hopeful one — before you spend a rupee.",
    ],
  },
  {
    slug: "pricing-is-positioning",
    title: "Pricing Is Positioning",
    excerpt:
      "Why underpricing is the most expensive branding decision Indian founders make.",
    categories: ["Marketing", "Business"],
    coverImage: { alt: "Pricing and positioning" },
    author: AP,
    publishedAt: "2026-06-18",
    readingTimeMins: 7,
    bodyPreview: [
      "Your price is the first thing the market reads about you — long before your copy.",
      "Set it like a position, not a guess.",
    ],
  },
  {
    slug: "ai-operating-system-for-smes",
    title: "An AI Operating System for Small Businesses",
    excerpt:
      "Where AI actually pays back in an SME — and the three places it quietly doesn't.",
    categories: ["Business", "Marketing"],
    coverImage: { alt: "AI operating system" },
    author: AP,
    publishedAt: "2026-06-02",
    readingTimeMins: 11,
    bodyPreview: [
      "AI is a headline in the boardroom and a rumour on the floor.",
      "Start from workflows and economics, not from tools — and it starts paying back.",
    ],
  },
  {
    slug: "the-quiet-discipline-of-stillness",
    title: "The Quiet Discipline of Stillness",
    excerpt:
      "What a daily practice of stillness taught me about making better business decisions.",
    categories: ["Spirituality", "Society"],
    coverImage: { alt: "Stillness and reflection" },
    author: AP,
    publishedAt: "2026-05-20",
    readingTimeMins: 6,
    bodyPreview: [
      "The best decisions I have made were not made quickly.",
      "Stillness is not the absence of action. It is the preparation for it.",
    ],
  },
  {
    slug: "policy-and-the-indian-founder",
    title: "Policy and the Indian Founder",
    excerpt:
      "How regulation quietly shapes which businesses get built in India — and which don't.",
    categories: ["Politics", "Business"],
    coverImage: { alt: "Policy and enterprise" },
    author: AP,
    publishedAt: "2026-05-04",
    readingTimeMins: 10,
    bodyPreview: [
      "Every business plan assumes a policy environment, whether the founder names it or not.",
      "Reading that environment early is a competitive advantage most ignore.",
    ],
  },
  {
    slug: "first-ten-customers",
    title: "Your First Ten Customers",
    excerpt:
      "Sales before marketing: the founder-led motion that de-risks everything after it.",
    categories: ["Startup", "Marketing"],
    coverImage: { alt: "First ten customers" },
    author: AP,
    publishedAt: "2026-04-16",
    readingTimeMins: 10,
    bodyPreview: [
      "Your first ten customers are not a revenue milestone. They are a research programme.",
      "Sell to them yourself, by hand, before you automate anything.",
    ],
  },
  {
    slug: "building-a-business-that-serves-society",
    title: "Building a Business That Serves Society",
    excerpt:
      "Profit and purpose are not opposites — the durable businesses hold both at once.",
    categories: ["Society", "Business"],
    coverImage: { alt: "Business and society" },
    author: AP,
    publishedAt: "2026-03-28",
    readingTimeMins: 8,
    bodyPreview: [
      "A business that takes more than it gives has a shelf life.",
      "The most resilient companies I have built or advised return something to the society they draw from.",
    ],
  },
  {
    slug: "the-cash-flow-rhythm",
    title: "The Cash-Flow Rhythm",
    excerpt:
      "A weekly 30-minute finance ritual that has saved more businesses than any funding round.",
    categories: ["Business", "Startup"],
    coverImage: { alt: "Cash flow rhythm" },
    author: AP,
    publishedAt: "2026-03-10",
    readingTimeMins: 8,
    bodyPreview: [
      "Growth eats cash. Most founders discover this too late.",
      "A simple weekly rhythm keeps the number in front of you before it becomes a crisis.",
    ],
  },
];

/* ──────────────────────────────── Helpers ─────────────────────────────── */

/** Only posts whose publish date has arrived (respects Sanity scheduling). */
export function filterPublished(posts: BlogPost[], now: Date = new Date()): BlogPost[] {
  return posts
    .filter((p) => new Date(p.publishedAt).getTime() <= now.getTime())
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

export function formatBlogDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function readingTimeLabel(mins: number): string {
  return `${mins} min read`;
}
