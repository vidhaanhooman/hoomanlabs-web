import type { Metadata } from "next"

import { SolutionsPage } from "@/components/solutions-page"
import { solutionsHub } from "@/content/solutions"

export const metadata: Metadata = {
  title: solutionsHub.seo.title,
  description: solutionsHub.seo.description,
}

export default function Solutions() {
  return <SolutionsPage />
}
