import type { Metadata } from "next"

import { HumanAiPage } from "@/components/human-ai-page"
import { humanAiPage } from "@/content/pages/human-ai"

export const metadata: Metadata = {
  title: humanAiPage.seo.title,
  description: humanAiPage.seo.description,
}

export default function HumanAi() {
  return <HumanAiPage />
}
