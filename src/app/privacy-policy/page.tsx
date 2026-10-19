import type { Metadata } from "next"

import { LegalPage } from "@/components/legal/legal-page"
import { privacyPage as c } from "@/content/privacy"

export const metadata: Metadata = { title: c.seo.title, description: c.seo.description }

export default function PrivacyPolicy() {
  return <LegalPage id="privacy" sections={c.sections} />
}
