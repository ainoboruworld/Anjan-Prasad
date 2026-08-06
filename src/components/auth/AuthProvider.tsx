"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase/types";
import {
  getProfile,
  signOut as signOutService,
} from "@/lib/auth/service";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthContextValue {
  status: AuthStatus;
  /** Whether Supabase credentials are present. */
  configured: boolean;
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  /** True once we've resolved whether a profile exists for the user. */
  profileLoaded: boolean;
  isAuthenticated: boolean;
  /** Authenticated but no profile row yet - needs onboarding. */
  needsOnboarding: boolean;
  displayName: string;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * App-wide authentication context.
 *
 * Restores the Supabase session on load, keeps it fresh, tracks the user's
 * profile (to decide onboarding), and exposes a single `useAuth()` hook. When
 * Supabase isn't configured it resolves cleanly to "unauthenticated" so the
 * UI keeps working.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const configured = isSupabaseConfigured();
  const [status, setStatus] = useState<AuthStatus>(
    configured ? "loading" : "unauthenticated"
  );
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoaded, setProfileLoaded] = useState(!configured);
  const mounted = useRef(true);

  const loadProfile = useCallback(async (uid: string) => {
    setProfileLoaded(false);
    const { data } = await getProfile(uid);
    if (!mounted.current) return;
    setProfile(data);
    setProfileLoaded(true);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) await loadProfile(user.id);
  }, [user, loadProfile]);

  useEffect(() => {
    mounted.current = true;
    const supabase = getSupabaseClient();
    // When unconfigured, state is already initialised to "unauthenticated"
    // (see useState above) - nothing to synchronise.
    if (!supabase) return;

    // 1) Restore any existing session on load.
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted.current) return;
      const s = data.session ?? null;
      setSession(s);
      setUser(s?.user ?? null);
      setStatus(s ? "authenticated" : "unauthenticated");
      if (s?.user) loadProfile(s.user.id);
      else setProfileLoaded(true);
    });

    // 2) Track sign-in / sign-out / token refresh for the app's lifetime.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      if (!mounted.current) return;
      setSession(s);
      setUser(s?.user ?? null);
      setStatus(s ? "authenticated" : "unauthenticated");
      if (s?.user) loadProfile(s.user.id);
      else {
        setProfile(null);
        setProfileLoaded(true);
      }
    });

    return () => {
      mounted.current = false;
      sub.subscription.unsubscribe();
    };
  }, [loadProfile]);

  const signOut = useCallback(async () => {
    await signOutService();
    if (!mounted.current) return;
    setProfile(null);
    setUser(null);
    setSession(null);
    setStatus("unauthenticated");
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    const isAuthenticated = status === "authenticated";
    return {
      status,
      configured,
      user,
      session,
      profile,
      profileLoaded,
      isAuthenticated,
      needsOnboarding: isAuthenticated && profileLoaded && profile === null,
      displayName:
        profile?.full_name ||
        user?.email?.split("@")[0] ||
        "Account",
      refreshProfile,
      signOut,
    };
  }, [status, configured, user, session, profile, profileLoaded, refreshProfile, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
