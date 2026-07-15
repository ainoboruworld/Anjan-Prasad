import Link from "next/link";
import { Wordmark } from "./brand/ApMark";
import { Newsletter } from "./Newsletter";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Learn",
    links: [
      { label: "₹199 Demo Session", href: "/courses#demo" },
      { label: "Premium Course", href: "/courses#premium" },
      { label: "Corporate Training", href: "/corporate-training" },
      { label: "Knowledge Hub", href: "/knowledge-hub" },
    ],
  },
  {
    title: "Work with us",
    links: [
      { label: "Consulting", href: "/consulting" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "AP.com",
    links: [
      { label: "About Anjan", href: "/about" },
      { label: "Media & Recognition", href: "/media" },
      { label: "Sign In", href: "/sign-in" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-sunken">
      {/* Newsletter band */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              One operator&apos;s letter.{" "}
              <span className="editorial-accent text-brand">Every week.</span>
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-foreground-muted">
              Playbooks, margins, and field notes on building profitable
              businesses in India — no motivation, only method.
            </p>
          </div>
          <Newsletter />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6" aria-hidden>
        <div className="h-px bg-hairline" />
      </div>

      {/* Link columns */}
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Wordmark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground-muted">
            India&apos;s Business Growth Ecosystem — start, build, and scale a
            profitable business with the operator behind it.
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.22em] text-foreground-muted">
            0 → 1 → Scale
          </p>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-foreground transition-colors hover:text-brand"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-6 py-6 text-xs text-foreground-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Anjan Prasad · AP.com. All rights reserved.</p>
          <p>Built like a business: on systems.</p>
        </div>
      </div>
    </footer>
  );
}
