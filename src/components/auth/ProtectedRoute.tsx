"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "./AuthProvider";

/**
 * Guards a client route. Restores session first (shows a loader), redirects
 * unauthenticated visitors to sign-in with a return path, and — unless
 * `allowIncompleteProfile` — sends first-time users to onboarding.
 */
export function ProtectedRoute({
  children,
  allowIncompleteProfile = false,
}: {
  children: ReactNode;
  allowIncompleteProfile?: boolean;
}) {
  const { status, isAuthenticated, profileLoaded, needsOnboarding } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const resolving = status === "loading" || (isAuthenticated && !profileLoaded);
  const redirectingToSignIn = status === "unauthenticated";
  const redirectingToOnboarding =
    isAuthenticated && profileLoaded && needsOnboarding && !allowIncompleteProfile;

  useEffect(() => {
    if (redirectingToSignIn) {
      const back = encodeURIComponent(pathname || "/");
      router.replace(`/sign-in?redirect=${back}`);
    } else if (redirectingToOnboarding) {
      const back = encodeURIComponent(pathname || "/");
      router.replace(`/onboarding?redirect=${back}`);
    }
  }, [redirectingToSignIn, redirectingToOnboarding, pathname, router]);

  if (resolving || redirectingToSignIn || redirectingToOnboarding) {
    return (
      <div
        className="flex min-h-[60vh] items-center justify-center"
        role="status"
        aria-live="polite"
      >
        <Loader2 className="h-6 w-6 animate-spin text-brand-sky" strokeWidth={2} />
        <span className="sr-only">Loading…</span>
      </div>
    );
  }

  return <>{children}</>;
}
