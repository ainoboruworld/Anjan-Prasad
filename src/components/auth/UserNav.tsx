"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { ProfileMenu } from "./ProfileMenu";

/**
 * Header auth slot. Shows "Sign In" when logged out (carrying the current
 * path so the user returns here after auth), the profile menu when logged
 * in, and a quiet placeholder while the session is being restored.
 */
export function UserNav() {
  const { status, isAuthenticated } = useAuth();
  const pathname = usePathname();

  if (status === "loading") {
    return (
      <span
        aria-hidden
        className="h-9 w-24 animate-pulse rounded-full bg-background-elevated"
      />
    );
  }

  if (isAuthenticated) return <ProfileMenu />;

  const redirect = encodeURIComponent(pathname || "/");
  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/sign-in?redirect=${redirect}`}
        className="rounded-full px-4 py-2.5 text-[length:var(--text-nav)] font-medium text-foreground-muted transition-colors hover:text-foreground"
      >
        Log In
      </Link>
      <Link
        href={`/sign-up?redirect=${redirect}`}
        className="rounded-full bg-brand px-5 py-2.5 text-[length:var(--text-nav)] font-semibold text-brand-ink shadow-[0_8px_24px_-12px_rgba(79,169,255,0.6)] transition-colors hover:bg-brand-hover"
      >
        Sign Up
      </Link>
    </div>
  );
}

/** Compact variant for the mobile sheet. */
export function UserNavMobile({ onNavigate }: { onNavigate?: () => void }) {
  const { status, isAuthenticated, displayName, signOut } = useAuth();
  const pathname = usePathname();

  if (status === "loading") return null;

  if (isAuthenticated) {
    return (
      <div className="space-y-1">
        <p className="flex items-center gap-2 px-2 py-2 text-sm font-semibold text-foreground">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand/12 text-[10px] font-bold text-brand">
            {displayName
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()}
          </span>
          {displayName}
        </p>
        <Link
          href="/account"
          onClick={onNavigate}
          className="block rounded-xl px-2 py-2 text-sm text-foreground-muted transition-colors hover:text-foreground"
        >
          My Profile
        </Link>
        <Link
          href="/account/bookings"
          onClick={onNavigate}
          className="block rounded-xl px-2 py-2 text-sm text-foreground-muted transition-colors hover:text-foreground"
        >
          My Bookings
        </Link>
        <button
          type="button"
          onClick={async () => {
            onNavigate?.();
            await signOut();
          }}
          className="block w-full rounded-xl px-2 py-2 text-left text-sm font-medium text-foreground"
        >
          Sign Out
        </button>
      </div>
    );
  }

  const redirect = encodeURIComponent(pathname || "/");
  return (
    <div className="space-y-2">
      <Link
        href={`/sign-up?redirect=${redirect}`}
        onClick={onNavigate}
        className="block rounded-full bg-brand px-5 py-3 text-center text-sm font-semibold text-brand-ink"
      >
        Sign Up
      </Link>
      <Link
        href={`/sign-in?redirect=${redirect}`}
        onClick={onNavigate}
        className="block rounded-full border border-border-strong px-5 py-3 text-center text-sm font-medium text-foreground"
      >
        Log In
      </Link>
    </div>
  );
}
