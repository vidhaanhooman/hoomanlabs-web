import type { Metadata } from "next"

import { VoiceAiLabPage } from "@/components/voice-ai-lab-page"

export const metadata: Metadata = { title: "Lab: Voice AI (draft)" }

/** The next /voice-ai: pipeline hero, use cases, full-control stages, integrations. */
export default function VoiceAiLab() {
  return <VoiceAiLabPage />
}
