import type { Metadata } from "next"

import { AgentsPage } from "@/components/agents-page"

export const metadata: Metadata = {
  title: "AI Voice Agent Builder for Customer Calls",
  description:
    "Build AI voice agents that follow your process, use your data and take action in your systems, then test and publish safely.",
}

export default function Agents() {
  return <AgentsPage />
}
