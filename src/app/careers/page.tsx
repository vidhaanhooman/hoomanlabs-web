import type { Metadata } from "next"

import { CareersPage } from "@/components/careers-page"
import { careersPage } from "@/content/careers"

export const metadata: Metadata = {
  title: careersPage.seo.title,
  description: careersPage.seo.description,
}

export default function Careers() {
  return <CareersPage />
}
