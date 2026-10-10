import type { Metadata } from "next"

import { AgentsPage } from "@/components/agents-page"

export const metadata: Metadata = {
  title: "Agents",
  description: "Build voice and chat agents with full control over prompt, flow, context, voices and actions.",
}

export default function Agents() {
  return <AgentsPage />
}
