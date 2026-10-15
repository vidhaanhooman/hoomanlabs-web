import type { Metadata } from "next"

import { VoicePage } from "@/components/voice-page"
import { voicePage } from "@/content/pages/voice"

export const metadata: Metadata = {
  title: voicePage.seo.title,
  description: voicePage.seo.description,
}

export default function Voice() {
  return <VoicePage />
}
