import type { Metadata } from "next"

import { ObservabilityPage } from "@/components/observability-page"
import { observabilityPage } from "@/content/pages/observability"

export const metadata: Metadata = {
  title: observabilityPage.seo.title,
  description: observabilityPage.seo.description,
}

export default function Observability() {
  return <ObservabilityPage />
}
