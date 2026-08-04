"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarClock, Loader2 } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { getSupabaseClient } from "@/lib/supabase/client";

interface Booking {
  id: string;
  service_type: string;
  program_type?: string;
  status?: string;
  created_at?: string;
}

/**
 * My Bookings — lists the signed-in user's bookings from Supabase.
 *
 * Reads a `bookings` table filtered by the user's email. If the table isn't
 * provisioned yet (or there are none), it degrades to a clean empty state —
 * so the page is production-ready the moment the table exists.
 */
export function AccountBookings() {
  const { user } = useAuth();
  const [state, setState] = useState<"loading" | "ready" | "empty">("loading");
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    let active = true;
    const supabase = getSupabaseClient();
    const email = user?.email;

    const load = async (): Promise<Booking[] | null> => {
      if (!supabase || !email) return [];
      const { data, error } = await supabase
        .from("bookings")
        .select("id, service_type, program_type, status, created_at")
        .eq("email", email)
        .order("created_at", { ascending: false });
      if (error) return null;
      return (data as Booking[]) ?? [];
    };

    load().then((rows) => {
      if (!active) return;
      if (!rows || rows.length === 0) {
        setState("empty");
      } else {
        setBookings(rows);
        setState("ready");
      }
    });

    return () => {
      active = false;
    };
  }, [user]);

  if (state === "loading") {
    return (
      <div className="flex items-center gap-3 py-10 text-foreground-muted">
        <Loader2 className="h-5 w-5 animate-spin text-brand-sky" strokeWidth={2} />
        Loading your bookings…
      </div>
    );
  }

  if (state === "empty") {
    return (
      <div className="rounded-3xl border border-border bg-background-elevated p-10 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10">
          <CalendarClock className="h-6 w-6 text-brand-sky" strokeWidth={1.75} />
        </span>
        <h2 className="mt-5 font-display text-xl font-semibold text-foreground">
          No bookings yet
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-foreground-muted">
          When you book a consultation or a program, it will appear here.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/business-advisory#pricing"
            className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-hover"
          >
            Explore programs
          </Link>
          <Link
            href="/consulting"
            className="rounded-full border border-border-strong px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-background-elevated"
          >
            Book a consultation
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {bookings.map((b) => (
        <li
          key={b.id}
          className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-background-elevated p-6"
        >
          <div>
            <p className="font-display text-lg font-semibold tracking-tight text-foreground">
              {labelFor(b)}
            </p>
            {b.created_at && (
              <p className="mt-0.5 text-sm text-foreground-muted">
                {new Date(b.created_at).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            )}
          </div>
          <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand">
            {b.status ?? "Confirmed"}
          </span>
        </li>
      ))}
    </ul>
  );
}

function labelFor(b: Booking): string {
  const parts = [b.service_type, b.program_type].filter(Boolean);
  return parts.join(" · ") || "Booking";
}
