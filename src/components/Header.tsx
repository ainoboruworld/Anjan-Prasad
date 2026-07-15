"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Wordmark } from "./brand/ApMark";
import { easeSmooth } from "./motion";
import { NAV, type NavItem } from "@/lib/data";

/** Miniature blueprint glyph rendered per dropdown item. */
function MenuGlyph({ seed }: { seed: number }) {
  const variants = [
    // path drawn between nodes
    <g key="a">
      <circle cx="8" cy="24" r="2.5" fill="var(--brand-gold)" />
      <path d="M8 24 C16 24 16 8 26 8" stroke="currentColor" strokeOpacity="0.45" fill="none" />
      <circle cx="26" cy="8" r="2.5" fill="currentColor" fillOpacity="0.5" />
    </g>,
    // rising steps
    <g key="b" stroke="currentColor" strokeOpacity="0.45" fill="none">
      <path d="M4 26 H12 V18 H20 V10 H28" />
      <circle cx="28" cy="10" r="2.5" fill="var(--brand-gold)" stroke="none" />
    </g>,
    // connected grid
    <g key="c">
      <rect x="5" y="5" width="9" height="9" rx="2" stroke="currentColor" strokeOpacity="0.45" fill="none" />
      <rect x="18" y="18" width="9" height="9" rx="2" stroke="currentColor" strokeOpacity="0.45" fill="none" />
      <path d="M14 14 L18 18" stroke="var(--brand-gold)" />
    </g>,
    // orbit
    <g key="d">
      <circle cx="16" cy="16" r="10" stroke="currentColor" strokeOpacity="0.45" fill="none" />
      <circle cx="24" cy="9" r="2.5" fill="var(--brand-gold)" />
    </g>,
  ];
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8 text-foreground" aria-hidden>
      {variants[seed % variants.length]}
    </svg>
  );
}

function Dropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={item.href}
        aria-expanded={open}
        aria-haspopup="menu"
        onFocus={() => setOpen(true)}
        className="flex items-center gap-1 py-2 text-[length:var(--text-nav)] text-foreground-muted transition-colors hover:text-foreground"
      >
        {item.label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          strokeWidth={1.75}
        />
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.28, ease: easeSmooth }}
            className="absolute left-1/2 top-full w-[26rem] -translate-x-1/2 pt-4"
          >
            <div className="overflow-hidden rounded-3xl border border-border bg-glass p-3 shadow-[var(--shadow-soft)] backdrop-blur-2xl">
              {item.children?.map((child, i) => (
                <Link
                  key={child.label}
                  href={child.href}
                  role="menuitem"
                  className="group flex items-start gap-4 rounded-2xl px-4 py-4 transition-colors hover:bg-background-elevated"
                >
                  <span className="mt-0.5 shrink-0 rounded-xl border border-border bg-background p-2 transition-colors group-hover:border-brand/40">
                    <MenuGlyph seed={i} />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5 text-[15px] font-medium text-foreground">
                      {child.label}
                      <ArrowUpRight
                        className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                        strokeWidth={2}
                      />
                    </span>
                    <span className="mt-1 block text-[13px] leading-relaxed text-foreground-muted">
                      {child.description}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const fadeDown = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0 },
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  // Keyed open-state: any navigation renders the sheet closed without an effect.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const mobileOpen = openedAt === pathname;
  const setMobileOpen = (open: boolean) => setOpenedAt(open ? pathname : null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
      }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={`mt-4 flex items-center justify-between gap-4 rounded-full border border-border bg-glass px-5 backdrop-blur-xl transition-all duration-300 ${
            scrolled ? "py-2 shadow-[var(--shadow-soft)]" : "py-3"
          }`}
        >
          <motion.div variants={fadeDown} transition={{ ease: easeSmooth }}>
            <Link href="/" aria-label="AP.com — home">
              <Wordmark />
            </Link>
          </motion.div>

          <motion.nav
            variants={fadeDown}
            transition={{ ease: easeSmooth }}
            aria-label="Primary"
            className="hidden items-center gap-7 xl:flex"
          >
            {NAV.map((item) =>
              item.children ? (
                <Dropdown key={item.label} item={item} />
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="py-2 text-[length:var(--text-nav)] text-foreground-muted transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              )
            )}
          </motion.nav>

          <motion.div
            variants={fadeDown}
            transition={{ ease: easeSmooth }}
            className="hidden items-center gap-4 xl:flex"
          >
            <Link
              href="/sign-in"
              className="text-[length:var(--text-nav)] font-medium text-foreground transition-colors hover:text-brand"
            >
              Sign In
            </Link>
            <Link
              href="/courses#demo"
              className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-hover"
            >
              Book Demo Session
            </Link>
            <ThemeToggle />
          </motion.div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 xl:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" strokeWidth={1.75} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: easeSmooth }}
            className="mx-auto mt-3 max-w-7xl px-4 sm:px-6 xl:hidden"
          >
            <div className="max-h-[75vh] overflow-y-auto rounded-3xl border border-border bg-glass p-4 backdrop-blur-xl">
              {NAV.map((item) => (
                <div key={item.label} className="py-1.5">
                  <Link
                    href={item.href}
                    className="block rounded-xl px-2 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-background-elevated"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-2 border-l border-border pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block rounded-xl px-2 py-2 text-sm text-foreground-muted transition-colors hover:text-foreground"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-2 flex items-center justify-between border-t border-border pt-3">
                <Link
                  href="/sign-in"
                  className="rounded-xl px-2 py-2.5 text-base font-medium text-foreground"
                >
                  Sign In
                </Link>
                <Link
                  href="/courses#demo"
                  className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-ink"
                >
                  Book Demo Session
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
