import { Faq } from "@/components/product-page/faq"
import { Definition, NextStep } from "@/components/product-page/page-bits"
import { Logos } from "@/components/sections/logos"
import { TwoWayCta } from "@/components/sections/two-way-cta"
import { Languages } from "@/components/voice/languages"
import { SayRightPanel, SpeedPanel } from "@/components/voice/panels"
import { VoiceHero } from "@/components/voice/hero"
import { VoiceTrio } from "@/components/voice/sections"
import { SpeechLayer } from "@/components/voice/speech-layer"
import { Studio } from "@/components/voice/studio"
import { Turns } from "@/components/voice/turns"
import { voicePage as c } from "@/content/pages/voice"

/**
 * /platform/voice, following the content sheet in the homepage's language
 * (like Agents and Workflows): floating hero, logos, definition and proof,
 * the voice studio you can hear, turn-taking (full width), languages with a
 * clear-line before/after, pronunciation, speed, tuning and failover, the
 * speech layer under the hood (speech-to-text and text-to-speech), FAQ,
 * next step and the two-way close. SAMPLE audio and latency.
 */

/** The homepage's roomier section spacing. */
const ROOMY = {
  "--section-gap": "clamp(3.25rem, 2.25rem + 3vw, 5rem)",
  "--section-pad": "calc(var(--section-gap) / 2)",
} as React.CSSProperties

export function VoicePage() {
  return (
    <div style={ROOMY}>
      <VoiceHero />
      <Logos label="Trusted by 100+ teams" />
      <Definition id="voice-definition" text={c.definition} proof={c.proof} placeholder />
      <Studio />
      <Turns />
      <Languages />
      <SayRightPanel />
      <SpeedPanel />
      <VoiceTrio />
      <SpeechLayer />
      <Faq id="voice-faq" items={c.faq} />
      <NextStep id="voice-next" related={c.related} />
      <TwoWayCta />
    </div>
  )
}
