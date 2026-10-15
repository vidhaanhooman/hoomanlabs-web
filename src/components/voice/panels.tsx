"use client"

import { PronunciationScreen, TurnTraceScreen } from "@/components/product/voice-visuals"
import { ProductPanel } from "@/components/sections/how-it-works-v3"
import { voicePage as c } from "@/content/pages/voice"

const DOCS = "https://docs.hoomanlabs.com"

/** Say-it-right and speed, in the homepage's split ProductPanel. */
export function SayRightPanel() {
  return <ProductPanel id="voice-say" {...c.sayRight} link="Read about pronunciation" linkHref={DOCS} screen={(cls) => <PronunciationScreen className={cls} />} />
}

export function SpeedPanel() {
  return <ProductPanel id="voice-speed" {...c.speed} link="Read about latency" linkHref={DOCS} media="start" screen={(cls) => <TurnTraceScreen className={cls} />} />
}
