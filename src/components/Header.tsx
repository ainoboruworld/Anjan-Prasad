"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { UserNav, UserNavMobile } from "./auth/UserNav";
import { Wordmark } from "./brand/ApMark";
import { easeSmooth } from "./motion";
import { NAV, type NavItem } from "@/lib/data";

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
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: easeSmooth }}
            className="absolute left-0 top-full w-72 max-w-[calc(100vw-2rem)] pt-3"
          >
            <div className="rounded-2xl border border-border-strong bg-background-elevated p-2 shadow-[var(--shadow-soft)] ring-1 ring-black/[0.03] backdrop-blur-2xl">
              {item.children?.map((child) => (
                <Link
                  key={child.label}
                  href={child.href}
                  role="menuitem"
                  className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-background-sunken"
                >
                  {child.label}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 -translate-x-1 text-brand opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                    strokeWidth={2}
                  />
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

export function Header({ items = NAV }: { items?: NavItem[] }) {
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
            <Link href="/" aria-label="Anjan Prasad - home">
              <Wordmark />
            </Link>
          </motion.div>

          <motion.nav
            variants={fadeDown}
            transition={{ ease: easeSmooth }}
            aria-label="Primary"
            className="hidden items-center gap-6 2xl:gap-7 xl:flex"
          >
            {items.map((item) =>
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
            className="hidden items-center gap-3.5 xl:flex"
          >
            <ThemeToggle />
            <UserNav />
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
              {items.map((item) => (
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
              <div className="mt-2 border-t border-border pt-3">
                <UserNavMobile onNavigate={() => setMobileOpen(false)} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
