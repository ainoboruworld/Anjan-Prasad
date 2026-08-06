/** Centralised query keys - one source of truth for cache identity. */
export const queryKeys = {
  blogs: ["blogs"] as const,
  blog: (slug: string) => ["blog", slug] as const,
  media: ["media"] as const,
  profile: (userId: string) => ["profile", userId] as const,
  bookings: (email: string) => ["bookings", email] as const,
};
