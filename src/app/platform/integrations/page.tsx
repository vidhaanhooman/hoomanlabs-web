import type { Metadata } from "next"

import { IntegrationsPage } from "@/components/integrations-page"
import { integrationsPage } from "@/content/pages/integrations"

export const metadata: Metadata = {
  title: integrationsPage.seo.title,
  description: integrationsPage.seo.description,
}

export default function Integrations() {
  return <IntegrationsPage />
}
