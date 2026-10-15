import type { Metadata } from "next"

import { CampaignsPage } from "@/components/campaigns-page"
import { campaignsPage } from "@/content/pages/campaigns"

export const metadata: Metadata = {
  title: campaignsPage.seo.title,
  description: campaignsPage.seo.description,
}

export default function Campaigns() {
  return <CampaignsPage />
}
