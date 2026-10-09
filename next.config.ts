import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // The four product pages were folded into /platform (deprecated, not permanent yet).
  async redirects() {
    return ["voice-ai", "chat-agents", "telephony", "qa", "lab/voice-ai"].map((path) => ({
      source: `/${path}`,
      destination: "/platform",
      permanent: false,
    }))
  },
  partialPrefetching: true,
  turbopack: {
    // Pin the root: a stray lockfile in the home directory confuses detection.
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
