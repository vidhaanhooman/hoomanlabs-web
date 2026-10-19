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
      // Use cases no longer have their own pages; old links go to /solutions.
      // Renamed industries go to their new page.
      ...["payment-collections", "appointment-booking", "lead-qualification", "support", "renewals", "surveys", "travel"].map((slug) => ({
        source: `/solutions/${slug}`,
        destination: "/solutions",
        permanent: false,
      })),
      { source: "/solutions/retail", destination: "/solutions/e-commerce", permanent: false },
      { source: "/solutions/financial-services", destination: "/solutions/bfsi", permanent: false },
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
