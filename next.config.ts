import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // The four product pages were folded into /platform (deprecated, not permanent yet).
  async redirects() {
    return [
      ...["voice-ai", "chat-agents", "telephony", "qa", "lab/voice-ai"].map((path) => ({
        source: `/${path}`,
        destination: "/platform",
        permanent: false,
      })),
      // The v3 homepage was promoted to /.
      { source: "/lab/v3", destination: "/", permanent: false },
      // The Product Designer role closed; send old links to the open careers list.
      { source: "/careers/product-designer", destination: "/careers", permanent: false },
      { source: "/privacy", destination: "/privacy-policy", permanent: false },
      // Use cases no longer have their own pages: send old links to their card on /solutions.
      ...["payment-collections", "appointment-booking", "lead-qualification", "support", "renewals", "surveys"].map((slug) => ({
        source: `/solutions/${slug}`,
        destination: `/solutions#${slug}`,
        permanent: false,
      })),
    ]
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
