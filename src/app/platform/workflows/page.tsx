import type { Metadata } from "next"

import { WorkflowsPage } from "@/components/workflows-page"
import { workflowsPage } from "@/content/pages/workflows"

export const metadata: Metadata = {
  title: workflowsPage.seo.title,
  description: workflowsPage.seo.description,
}

export default function Workflows() {
  return <WorkflowsPage />
}
