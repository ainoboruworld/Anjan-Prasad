"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { listMediaFeatures } from "@/services/media/mediaService";

/** Server state: featured media items, cached via TanStack Query. */
export function useMediaFeatures() {
  return useQuery({
    queryKey: queryKeys.media,
    queryFn: listMediaFeatures,
  });
}
