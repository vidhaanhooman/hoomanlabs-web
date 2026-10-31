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
      { source: "/SalesDeck", destination: "/sales-deck", permanent: false },
      // Solutions has no overview pages; old hub and use-case links go home.
      // Renamed industries go to their new page.
      ...["payment-collections", "appointment-booking", "lead-qualification", "support", "renewals", "surveys"].map((slug) => ({
        source: `/solutions/${slug}`,
        destination: "/",
        permanent: false,
      })),
      { source: "/solutions/travel", destination: "/", permanent: false },
      { source: "/solutions/use-cases", destination: "/", permanent: false },
      { source: "/solutions", destination: "/", permanent: false },
      { source: "/solutions/retail", destination: "/solutions/e-commerce", permanent: false },
      { source: "/solutions/financial-services", destination: "/solutions/bfsi", permanent: false },
    ]
  },
  partialPrefetching: true,
  // Blog images come from Sanity's image CDN (this project only).
  images: {
    remotePatterns: [new URL("https://cdn.sanity.io/images/zqtjnm8g/**")],
  },
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
