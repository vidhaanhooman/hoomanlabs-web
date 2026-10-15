import type { Metadata } from "next"

import { SecurityPage } from "@/components/security-page"
import { securityPage } from "@/content/pages/security"

/** /platform/security: Security & Reliability. */
export const metadata: Metadata = {
  title: securityPage.seo.title,
  description: securityPage.seo.description,
}

export default function Security() {
  return <SecurityPage />
}
