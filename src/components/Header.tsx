"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { easeSmooth } from "./motion";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description: string }[];
};

const NAV: NavItem[] = [
  {
    label: "Courses",
    href: "#courses",
    children: [
      {
        label: "Demo Session",
        href: "#demo",
        description: "A working introduction to the advisory approach.",
      },
      {
        label: "Premium Course",
        href: "#premium",
        description: "The complete operations & growth curriculum.",
      },
      {
        label: "Business Advisory",
        href: "#advisory",
        description: "Ongoing, hands-on engagements for leadership teams.",
      },
      {
        label: "Counselling",
        href: "#counselling",
        description: "One-to-one guidance for founders at a crossroads.",
      },
    ],
  },
  {
    label: "Resources",
    href: "#resources",
    children: [
      {
        label: "Blogs",
        href: "#blogs",
        description: "Field notes on operations, systems, and scale.",
      },
      {
        label: "Case Studies",
        href: "#cases",
        description: "How real businesses were rebuilt to grow.",
      },
      {
        label: "Featured Media",
        href: "#media",
        description: "Talks, interviews, and press appearances.",
      },
    ],
  },
];

const RIGHT_LINKS = [
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function Logo() {
  return (
    <a
      href="#top"
      aria-label="Anjan Prasad — home"
      className="flex items-center gap-2"
    >
      <span className="text-xl font-bold italic tracking-tight text-foreground">
        Anjan
      </span>
      <span
        aria-hidden
        className="inline-block h-2.5 w-2.5 rounded-[3px] bg-brand"
      />
    </a>
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
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 py-2 text-[length:var(--text-nav)] text-foreground-muted transition-colors hover:text-foreground"
      >
        {item.label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={1.75}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.28, ease: easeSmooth }}
            className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3"
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-glass p-2 shadow-2xl backdrop-blur-xl">
              {item.children?.map((child) => (
                <a
                  key={child.label}
                  href={child.href}
                  role="menuitem"
                  className="block rounded-xl px-4 py-3 transition-colors hover:bg-background-elevated"
                >
                  <span className="block text-sm font-medium text-foreground">
                    {child.label}
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-foreground-muted">
                    {child.description}
                  </span>
                </a>
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
  const [mobileOpen, setMobileOpen] = useState(false);

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
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
      }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`mt-4 flex items-center justify-between rounded-full border border-border bg-glass px-5 backdrop-blur-xl transition-all duration-300 ${
            scrolled ? "py-2 shadow-lg" : "py-3"
          }`}
        >
          <motion.div variants={fadeDown} transition={{ ease: easeSmooth }}>
            <Logo />
          </motion.div>

          <motion.nav
            variants={fadeDown}
            transition={{ ease: easeSmooth }}
            aria-label="Primary"
            className="hidden items-center gap-8 lg:flex"
          >
            {NAV.map((item) => (
              <Dropdown key={item.label} item={item} />
            ))}
          </motion.nav>

          <motion.div
            variants={fadeDown}
            transition={{ ease: easeSmooth }}
            className="hidden items-center gap-6 lg:flex"
          >
            {RIGHT_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[length:var(--text-nav)] text-foreground-muted transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#signin"
              className="text-[length:var(--text-nav)] font-medium text-foreground transition-colors hover:text-brand"
            >
              Sign In
            </a>
            <ThemeToggle />
          </motion.div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
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
            className="mx-auto mt-3 max-w-7xl px-6 lg:hidden"
          >
            <div className="max-h-[70vh] overflow-y-auto rounded-3xl border border-border bg-glass p-4 backdrop-blur-xl">
              {NAV.map((item) => (
                <div key={item.label} className="py-2">
                  <span className="px-2 text-xs font-medium uppercase tracking-wider text-muted">
                    {item.label}
                  </span>
                  <div className="mt-1">
                    {item.children?.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-xl px-2 py-2.5 text-base text-foreground transition-colors hover:bg-background-elevated"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
              <div className="mt-2 border-t border-border pt-3">
                {[...RIGHT_LINKS, { label: "Sign In", href: "#signin" }].map(
                  (l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-xl px-2 py-2.5 text-base text-foreground transition-colors hover:bg-background-elevated"
                    >
                      {l.label}
                    </a>
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
