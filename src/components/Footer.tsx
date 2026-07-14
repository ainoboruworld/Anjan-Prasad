"use client";

import type { ComponentType, SVGProps } from "react";

const COLUMNS: { heading: string; links: string[] }[] = [
  { heading: "Business", links: ["About", "Courses", "Business Advisory"] },
  { heading: "Resources", links: ["Blogs", "Case Studies", "Featured Media"] },
];

/* Brand marks kept as inline SVGs so the layout stays self-contained. */
function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.24 8.09h4.48V24H.24V8.09Zm7.36 0h4.29v2.17h.06c.6-1.13 2.06-2.32 4.24-2.32 4.53 0 5.37 2.98 5.37 6.86V24h-4.48v-6.4c0-1.53-.03-3.5-2.13-3.5-2.14 0-2.47 1.67-2.47 3.39V24H7.6V8.09Z" />
    </svg>
  );
}
function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="5.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
    </svg>
  );
}
function YouTubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M23.5 6.9a3 3 0 0 0-2.1-2.12C19.5 4.25 12 4.25 12 4.25s-7.5 0-9.4.53A3 3 0 0 0 .5 6.9 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.1 3 3 0 0 0 2.1 2.12c1.9.53 9.4.53 9.4.53s7.5 0 9.4-.53a3 3 0 0 0 2.1-2.12A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.1ZM9.6 15.5v-7l6.3 3.5-6.3 3.5Z" />
    </svg>
  );
}

const SOCIALS: {
  label: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
  { label: "LinkedIn", href: "#linkedin", Icon: LinkedInIcon },
  { label: "Instagram", href: "#instagram", Icon: InstagramIcon },
  { label: "YouTube", href: "#youtube", Icon: YouTubeIcon },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold italic tracking-tight text-foreground">
                Anjan
              </span>
              <span
                aria-hidden
                className="inline-block h-2.5 w-2.5 rounded-[3px] bg-brand"
              />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground-muted">
              Business operations & growth consulting for founders and
              leadership teams building for the long term.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="text-sm font-semibold text-foreground">
                {col.heading}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Connect</h3>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-border-strong hover:text-foreground"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex max-w-xs items-center gap-2"
            >
              <label htmlFor="footer-email" className="sr-only">
                Newsletter email
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Email"
                className="h-10 flex-1 rounded-full border border-border bg-background-elevated px-4 text-sm text-foreground placeholder:text-muted focus:border-brand focus:outline-none"
              />
              <button
                type="submit"
                className="h-10 shrink-0 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Anjan Prasad. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#privacy"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              Privacy
            </a>
            <a
              href="#terms"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
