"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { listBookings } from "@/services/profile/profileService";

/** Server state: the signed-in user's bookings, cached via TanStack Query. */
export function useBookings(email: string | undefined) {
  return useQuery({
    queryKey: queryKeys.bookings(email ?? "anon"),
    enabled: Boolean(email),
    queryFn: async () => {
      const { data } = await listBookings(email!);
      return data ?? [];
    },
  });
}
