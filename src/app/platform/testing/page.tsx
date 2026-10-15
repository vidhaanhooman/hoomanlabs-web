import type { Metadata } from "next"

import { TestingPage } from "@/components/testing-page"
import { testingPage } from "@/content/pages/testing"

export const metadata: Metadata = {
  title: testingPage.seo.title,
  description: testingPage.seo.description,
}

export default function Testing() {
  return <TestingPage />
}
