import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { ARTICLES, FEATURED_VIDEOS } from "@/lib/data";
import { SectionHeading, TextLink } from "../ui/Primitives";
import { Placeholder } from "../ui/Placeholder";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";

/**
 * Knowledge Hub + Featured Media, merged — one premium content shelf mixing
 * blogs, articles, videos and podcasts. Thumbnails are image placeholders,
 * ready to swap for real artwork with no layout change.
 */
type Card = {
  type: "Blog" | "Article" | "Video" | "Podcast";
  title: string;
  note: string;
  href: string;
  media?: boolean;
};

const ARTICLE_CARDS: Card[] = ARTICLES.slice(0, 2).map((a) => ({
  type: "Article",
  title: a.title,
  note: a.dek,
  href: "/knowledge-hub/blogs",
}));

const MEDIA_CARDS: Card[] = [
  {
    type: "Video",
    title: FEATURED_VIDEOS[0].title,
    note: FEATURED_VIDEOS[0].note,
    href: "/media",
    media: true,
  },
  {
    type: "Podcast",
    title: "The Operator's Playbook",
    note: "Long-form conversations on bootstrapping, margins, and systems.",
    href: "/media",
    media: true,
  },
];

const CARDS: Card[] = [ARTICLE_CARDS[0], MEDIA_CARDS[0], ARTICLE_CARDS[1], MEDIA_CARDS[1]];

function ContentCard({ card }: { card: Card }) {
  return (
    <Link
      href={card.href}
      className="card card-hover group flex h-full flex-col overflow-hidden"
      data-cursor="view"
    >
      <div className="relative">
        <Placeholder
          caption={card.type}
          aspect="16/9"
          rounded="rounded-none"
          className="!border-x-0 !border-t-0 !shadow-none"
        />
        {card.media && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-brand-ink shadow-[0_10px_30px_-10px_rgba(79,169,255,0.7)] transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-0.5 h-5 w-5" strokeWidth={2} fill="currentColor" />
            </span>
          </span>
        )}
        <span className="absolute left-4 top-4 rounded-full border border-border bg-glass px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground backdrop-blur">
          {card.type}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-brand">
          {card.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-muted">
          {card.note}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
          Explore
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
          />
        </span>
      </div>
    </Link>
  );
}

export function KnowledgeMedia() {
  return (
    <section className="border-t border-border bg-background-sunken py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Knowledge Hub & Featured Media"
          title={
            <>
              Playbooks, talks, and{" "}
              <span className="editorial-accent text-brand">field notes.</span>
            </>
          }
          lead="Blogs, articles, videos and podcasts on how profitable businesses are actually built."
        />

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c) => (
            <RevealItem key={c.title} className="h-full">
              <ContentCard card={c} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-12 flex flex-wrap gap-8">
          <TextLink href="/knowledge-hub/blogs">All articles</TextLink>
          <TextLink href="/media">All media &amp; recognition</TextLink>
        </Reveal>
      </div>
    </section>
  );
}
