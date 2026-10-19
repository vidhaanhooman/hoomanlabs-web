import type { Metadata } from "next"

import { LegalPage } from "@/components/legal/legal-page"
import { termsPage as c } from "@/content/terms"

export const metadata: Metadata = { title: c.seo.title, description: c.seo.description }

export default function Terms() {
  return <LegalPage id="terms" sections={c.sections} />
}
