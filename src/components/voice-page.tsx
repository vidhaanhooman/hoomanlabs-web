import { Faq } from "@/components/product-page/faq"
import { Definition, NextStep } from "@/components/product-page/page-bits"
import { Languages } from "@/components/voice/languages"
import { NodeTuning } from "@/components/voice/node-tuning"
import { SayRightPanel } from "@/components/voice/panels"
import { VoiceHero } from "@/components/voice/hero"
import { Studio } from "@/components/voice/studio"
import { Turns } from "@/components/voice/turns"
import { voicePage as c } from "@/content/pages/voice"

/**
 * /platform/voice, following the content sheet in the homepage's language
 * (like Agents and Workflows): floating hero, definition and proof,
 * the voice studio you can hear, turn-taking (full width), languages with a
 * the language wall, pronunciation, tuning per node (providers sit as a strip under languages), FAQ,
 * next step. SAMPLE audio and latency.
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
      <Definition id="voice-definition" text={c.definition} proof={c.proof} placeholder />
      <Studio />
      <Turns />
      <Languages />
      <SayRightPanel />
      <NodeTuning />
      <Faq id="voice-faq" items={c.faq} />
      <NextStep id="voice-next" related={c.related} />
    </div>
  )
}
