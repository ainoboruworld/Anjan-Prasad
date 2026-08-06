/**
 * Booking persistence — writes every consultation / demo / cohort / advisory
 * booking to Supabase (`public.bookings`). Common fields are first-class
 * columns; the rest of the form lives in `payload` (jsonb). If Supabase isn't
 * configured, callers still succeed via their existing forms-layer fallback,
 * so no lead is ever lost.
 */
import { getSupabaseClient } from "./supabase/client";

export interface BookingRecord {
  serviceType: "consultation" | "business-advisory";
  programType?: string;
  tierId?: string;
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  amount?: number | null;
  status?:
    | "new"
    | "pending_payment"
    | "paid"
    | "verifying"
    | "confirmed"
    | "cancelled";
  /** Variant-specific answers (anything not a first-class column). */
  payload?: Record<string, unknown>;
}

export interface SavedBooking {
  id: string | null;
}

/**
 * Insert a booking. Attaches the signed-in user's id when available so it
 * shows up under their account; guests book too (user_id stays null). Returns
 * `{ id: null }` when the backend isn't connected — never throws.
 */
export async function saveBooking(
  record: BookingRecord
): Promise<SavedBooking> {
  const supabase = getSupabaseClient();
  if (!supabase) return { id: null };

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      user_id: user?.id ?? null,
      service_type: record.serviceType,
      program_type: record.programType ?? null,
      tier_id: record.tierId ?? null,
      full_name: record.fullName,
      email: record.email,
      phone: record.phone ?? null,
      company: record.company ?? null,
      amount: record.amount ?? null,
      status: record.status ?? "new",
      payload: (record.payload ?? {}) as never,
      source_page:
        typeof window !== "undefined" ? window.location.pathname : null,
    })
    .select("id")
    .single();

  if (error) {
    // Table not provisioned yet or RLS mismatch — degrade gracefully.
    console.warn("[bookings] insert skipped:", error.message);
    return { id: null };
  }
  return { id: data?.id ?? null };
}
