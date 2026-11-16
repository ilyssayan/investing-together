import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Test builds can go to a separate folder (NEXT_DIST_DIR=.next-check) so
  // they never disturb a running dev server, which uses .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  cacheComponents: true,
  // Video thumbnails and source-article preview images.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "image.cnbcfm.com" },
    ],
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
