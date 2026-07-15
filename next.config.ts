import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Legacy IA → the ecosystem IA.
    return [
      { source: "/business-advisory", destination: "/consulting", permanent: true },
      { source: "/counselling", destination: "/contact", permanent: true },
      { source: "/resources/blogs", destination: "/knowledge-hub", permanent: true },
      { source: "/resources/case-studies", destination: "/case-studies", permanent: true },
      { source: "/resources/featured-media", destination: "/media", permanent: true },
      { source: "/resources", destination: "/knowledge-hub", permanent: true },
    ];
  },
};

export default nextConfig;
