import {
  BrainIcon,
  ChartLineIcon,
  EarIcon,
  HashIcon,
  MicrophoneIcon,
  ShieldCheckIcon,
  SpeakerHighIcon,
  TimerIcon,
  TranslateIcon,
  VoicemailIcon,
} from "@phosphor-icons/react/dist/ssr"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { HeroCallCard } from "@/components/lab/hero-call-card"
import { FeatureGrid, FeaturePanel, IntegrationsStrip, PageHero, Pillars, Proof, ScriptWall, TrustRow, WorksWith } from "@/components/product-page/blocks"
import { Faq } from "@/components/product-page/faq"
import { LanguageScreen, LatencyBar, TurnTimeline, VoiceStudioScreen, VoicesScreen } from "@/components/product/voice-visuals"
import { FinalCta } from "@/components/sections/final-cta"
import { Logos } from "@/components/sections/logos"
import { voicePage as c } from "@/content/pages/voice"

/**
 * /platform/voice, in the product-page structure: hero with the voice
 * studio, logos, three parts, the language wall, four deep-dives (voices,
 * turn-taking, languages, speed), hear it live, a compact grid, providers, reliability, proof,
 * FAQ, neighbouring pages and the closing CTA.
 */

const PILLAR_ICONS = [SpeakerHighIcon, EarIcon, TranslateIcon]
const GRID_ICONS = [HashIcon, VoicemailIcon, TimerIcon, ChartLineIcon]
const TRUST_ICONS = [BrainIcon, SpeakerHighIcon, MicrophoneIcon, ShieldCheckIcon]

export function VoicePage() {
  return (
    <>
      <PageHero id="voice-hero" crumb={c.crumb} title={c.title} line={c.line} cta screen={(cls) => <VoiceStudioScreen className={cls} />} />
      <Logos label="Trusted by 100+ teams" />
      <Pillars id="voice-pillars" items={c.pillars.map((p, i) => ({ ...p, icon: PILLAR_ICONS[i] }))} />
      <ScriptWall id="voice-wall" title={c.wall.title} items={c.wall.items} />

      <FeaturePanel id="voice-sound" q={c.sound} screen={(cls) => <VoicesScreen className={cls} />} />
      <FeaturePanel
        id="voice-turns"
        q={c.turns}
        flip
        screen={() => (
          <div className="absolute inset-0 flex items-center bg-background p-6 sm:p-10">
            <TurnTimeline />
          </div>
        )}
      />
      <FeaturePanel id="voice-languages" q={c.languages} screen={(cls) => <LanguageScreen className={cls} />} />
      <FeaturePanel
        id="voice-speed"
        q={c.speed}
        flip
        screen={() => (
          <div className="absolute inset-0 flex items-center bg-background p-6 sm:p-10">
            <LatencyBar />
          </div>
        )}
      />

      {/* Hear it: the same demo widget as the homepage */}
      <Section id="voice-hear">
        <Container>
          <div className="flex max-w-[44rem] flex-col gap-3">
            <h2 className="text-h2 font-normal">{c.hear.title}</h2>
            <p className="text-body text-ink-secondary">{c.hear.line}</p>
          </div>
          <div className="mt-10">
            <HeroCallCard plain />
          </div>
        </Container>
      </Section>

      <FeatureGrid id="voice-grid" title={c.grid.title} items={c.grid.items.map((f, i) => ({ ...f, icon: GRID_ICONS[i] }))} />
      <IntegrationsStrip id="voice-providers" title={c.providers.title} line={c.providers.line} logos={c.providers.names.map((name) => ({ name }))} more="integrations" />
      <TrustRow id="voice-reliability" title={c.reliability.title} items={c.reliability.items.map((t, i) => ({ ...t, icon: TRUST_ICONS[i] }))} more="security" />
      <Proof id="voice-proof" {...c.proof} placeholder />
      <Faq id="voice-faq" items={c.faq} />
      <WorksWith id="voice-related" pages={c.related} />
      <FinalCta id="voice-cta" title="Hear your Hooman before your customers do." />
    </>
  )
}
