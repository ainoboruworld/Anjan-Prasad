/**
 * Profile service — the user's profile and bookings (profile data, distinct
 * from Supabase auth data).
 */
import { getProfile, upsertProfile } from "@/lib/auth/service";
import { getSupabaseClient } from "@/lib/supabase/client";
import { ok, type ServiceResponse } from "../types";
import type { Profile, ProfileInput } from "@/lib/supabase/types";

export interface Booking {
  id: string;
  service_type: string;
  program_type?: string;
  status?: string;
  created_at?: string;
}

export function fetchProfile(userId: string) {
  return getProfile(userId);
}

export function saveProfile(input: ProfileInput) {
  return upsertProfile(input);
}

/** A user's bookings by email. Empty (not an error) until the table exists. */
export async function listBookings(
  email: string
): Promise<ServiceResponse<Booking[]>> {
  const supabase = getSupabaseClient();
  if (!supabase || !email) return ok([]);
  const { data, error } = await supabase
    .from("bookings")
    .select("id, service_type, program_type, status, created_at")
    .eq("email", email)
    .order("created_at", { ascending: false });
  if (error) return ok([]); // table not provisioned yet → graceful empty
  return ok((data as Booking[]) ?? []);
}

export type { Profile, ProfileInput };
