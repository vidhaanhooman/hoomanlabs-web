import type { Metadata } from "next"

import { QualityPage } from "@/components/quality-page"
import { qualityPage } from "@/content/pages/quality"

export const metadata: Metadata = {
  title: qualityPage.seo.title,
  description: qualityPage.seo.description,
}

export default function Quality() {
  return <QualityPage />
}
