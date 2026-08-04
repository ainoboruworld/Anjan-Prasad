import { QueryClient } from "@tanstack/react-query";

/**
 * Shared TanStack Query configuration. Server state (blogs, media, profile,
 * bookings) is cached here — separate from UI state (component `useState`),
 * auth state (AuthProvider), and theme state (next-themes).
 */
export function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
}
