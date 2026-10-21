import type { Metadata } from "next"

import { PricingPage } from "@/components/pricing-page"
import { pricingPage as c } from "@/content/pricing"

export const metadata: Metadata = {
  title: c.seo.title,
  description: c.seo.description,
  alternates: { canonical: c.seo.canonical },
  openGraph: { type: "website", url: c.seo.canonical, title: c.seo.title, description: c.seo.description, siteName: "HoomanLabs" },
  twitter: { card: "summary_large_image", title: c.seo.title, description: c.seo.description },
}

export default function Pricing() {
  return <PricingPage />
}
