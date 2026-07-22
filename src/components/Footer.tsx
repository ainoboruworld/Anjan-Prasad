import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_PHONE, OFFICE_LOCATION } from "@/lib/data";
import { Wordmark } from "./brand/ApMark";
import { Newsletter } from "./Newsletter";
import { SocialLinks } from "./SocialLinks";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Learn",
    links: [
      { label: "Demo Session", href: "/courses#demo" },
      { label: "Live Course", href: "/courses#live" },
      { label: "Blogs", href: "/knowledge-hub" },
      { label: "Featured Media", href: "/media" },
    ],
  },
  {
    title: "Work with us",
    links: [
      { label: "Business Advisory", href: "/business-advisory" },
      { label: "1-to-1 Consulting", href: "/consulting" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
  {
    title: "AP.com",
    links: [
      { label: "About Anjan", href: "/about" },
      { label: "Resources", href: "/resources" },
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

      {/* Brand, contact, and link columns */}
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <Wordmark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground-muted">
            India&apos;s Business Growth Ecosystem — start, build, and scale a
            profitable business with the operator behind it.
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.22em] text-foreground-muted">
            0 → 1 → Scale
          </p>
          <SocialLinks className="mt-6" />
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

        {/* Contact — lives here, not in the navigation */}
        <div>
          <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-start gap-2 text-foreground transition-colors hover:text-brand"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-foreground-muted" strokeWidth={1.75} />
                <span className="break-all">{CONTACT_EMAIL}</span>
              </a>
            </li>
            {CONTACT_PHONE && (
              <li>
                <a
                  href={`tel:${CONTACT_PHONE}`}
                  className="flex items-start gap-2 text-foreground transition-colors hover:text-brand"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-foreground-muted" strokeWidth={1.75} />
                  {CONTACT_PHONE}
                </a>
              </li>
            )}
            {OFFICE_LOCATION && (
              <li className="flex items-start gap-2 text-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-foreground-muted" strokeWidth={1.75} />
                {OFFICE_LOCATION}
              </li>
            )}
            <li>
              <Link
                href="/contact"
                className="text-foreground underline decoration-brand underline-offset-4 transition-colors hover:text-brand"
              >
                Contact form
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-6 text-xs text-foreground-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Anjan Prasad · AP.com. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
