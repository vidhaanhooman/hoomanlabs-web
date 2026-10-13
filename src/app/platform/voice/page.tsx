import type { Metadata } from "next"

import { VoicePage } from "@/components/voice-page"

export const metadata: Metadata = {
  title: "AI voice agents that sound human, in every language",
  description:
    "Natural voices, human turn-taking and native Indian languages, fast enough that conversations flow. Mid-call language switching, noise reduction and failover built in.",
}

export default function Voice() {
  return <VoicePage />
}
