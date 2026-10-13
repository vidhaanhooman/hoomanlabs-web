import type { Metadata } from "next"

import { AgentsPage } from "@/components/agents-page"

export const metadata: Metadata = {
  title: "AI Voice Agents that follow your rules",
  description:
    "The most configurable AI voice agent for enterprise: write the job, connect your knowledge and systems, and your Hooman handles every call your way.",
}

export default function Agents() {
  return <AgentsPage />
}
