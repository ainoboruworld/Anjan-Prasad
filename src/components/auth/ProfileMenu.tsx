"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookMarked,
  Bookmark,
  ChevronDown,
  LogOut,
  Settings,
  User as UserIcon,
} from "lucide-react";
import { easeSmooth } from "../motion";
import { useAuth } from "./AuthProvider";

type Item =
  | { kind: "link"; label: string; href: string; icon: typeof UserIcon }
  | { kind: "soon"; label: string; icon: typeof UserIcon };

const ITEMS: Item[] = [
  { kind: "link", label: "My Profile", href: "/account", icon: UserIcon },
  { kind: "link", label: "My Bookings", href: "/account/bookings", icon: BookMarked },
  { kind: "soon", label: "Saved Resources", icon: Bookmark },
  { kind: "soon", label: "Settings", icon: Settings },
];

/**
 * Signed-in account menu for the header. Shows the user's full name and a
 * dropdown of account destinations plus Sign Out. Closes on outside click,
 * Escape, and navigation.
 */
export function ProfileMenu() {
  const { displayName, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleSignOut = async () => {
    setOpen(false);
    await signOut();
    router.push("/");
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-border-strong py-1.5 pl-1.5 pr-3 text-[length:var(--text-nav)] font-medium text-foreground transition-colors hover:bg-background-elevated"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand/12 font-display text-xs font-bold text-brand">
          {initials(displayName)}
        </span>
        <span className="max-w-[10rem] truncate">{displayName}</span>
        <ChevronDown
          className={`h-4 w-4 text-foreground-muted transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          strokeWidth={1.75}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: easeSmooth }}
            className="absolute right-0 top-full mt-3 w-64 rounded-3xl border border-border-strong bg-background-elevated p-2 shadow-[var(--shadow-soft)] backdrop-blur-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border px-3 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/12 font-display text-xs font-bold text-brand">
                {initials(displayName)}
              </span>
              <p className="min-w-0 truncate font-display text-sm font-semibold text-foreground">
                {displayName}
              </p>
            </div>

            <div className="mt-2 space-y-0.5">
              {ITEMS.map((item) =>
                item.kind === "link" ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-background-sunken"
                  >
                    <item.icon className="h-4 w-4 text-foreground-muted" strokeWidth={1.75} />
                    {item.label}
                  </Link>
                ) : (
                  <span
                    key={item.label}
                    className="flex items-center justify-between gap-3 rounded-2xl px-3 py-2.5 text-sm text-foreground-muted"
                  >
                    <span className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" strokeWidth={1.75} />
                      {item.label}
                    </span>
                    <span className="rounded-full bg-background-sunken px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em]">
                      Soon
                    </span>
                  </span>
                )
              )}
            </div>

            <div className="mt-2 border-t border-border pt-2">
              <button
                type="button"
                role="menuitem"
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-background-sunken"
              >
                <LogOut className="h-4 w-4 text-foreground-muted" strokeWidth={1.75} />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
