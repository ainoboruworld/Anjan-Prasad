import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Remote hosts for optimised <Image> — Sanity CDN and YouTube thumbnails.
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
  async redirects() {
    // Legacy IA → the current IA.
    return [
      { source: "/corporate-training", destination: "/business-advisory", permanent: true },
      { source: "/counselling", destination: "/contact", permanent: true },
      { source: "/resources/blogs", destination: "/knowledge-hub/blogs", permanent: true },
      { source: "/resources/case-studies", destination: "/case-studies", permanent: true },
      { source: "/resources/featured-media", destination: "/media", permanent: true },
      { source: "/resources", destination: "/knowledge-hub", permanent: true },
    ];
  },
};

export default nextConfig;
