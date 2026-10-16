"use client"

import { PronunciationScreen } from "@/components/product/voice-visuals"
import { ProductPanel } from "@/components/sections/how-it-works-v3"
import { voicePage as c } from "@/content/pages/voice"

const DOCS = "https://docs.hoomanlabs.com"

/** Say-it-right, in the homepage's split ProductPanel. */
export function SayRightPanel() {
  return <ProductPanel id="voice-say" {...c.sayRight} link="Read about pronunciation" linkHref={DOCS} screen={(cls) => <PronunciationScreen className={cls} />} />
}
