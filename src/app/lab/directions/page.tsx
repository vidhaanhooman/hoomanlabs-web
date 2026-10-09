import type { Metadata } from "next"

import { Container } from "@/components/layout/container"
import { ColorField, StageField, VoiceField } from "@/components/lab/direction-backgrounds"
import { ConversationScreen } from "@/components/product/conversation-screen"
import { STAGE_CLASS } from "@/components/sections/hero"
import { UseCaseVignette, type UseCaseVisual } from "@/components/sections/use-case-visuals"
import { hero } from "@/content/draft"

export const metadata: Metadata = { title: "Lab: visual directions (draft)" }

/** Smaller than the live hero frame so each background has room to show. */
const FRAME = "absolute inset-x-[6%] top-[10%] bottom-[12%] z-10 sm:inset-x-[12%] lg:inset-x-[17%] lg:top-[12%] lg:bottom-[14%]"
const CHROME = "rounded-md border border-white/10 shadow-[0_30px_80px_-30px_oklch(0_0_0/0.8)]"
const TILES: UseCaseVisual[] = ["collections", "booking", "support"]

const DIRECTIONS = [
  {
    n: "1",
    name: "Voice as the visual",
    note: "Sound is the brand: emitting rings and a breathing dotted waveform behind the UI. Move the cursor over the hero. Tiles are crops of the same system: rings, waveform, spectrogram.",
    hero: <VoiceField />,
    tiles: [
      <VoiceField key="a" variant="rings" center="12% 18%" />,
      <VoiceField key="b" variant="wave" />,
      <VoiceField key="c" variant="spectrogram" />,
    ],
  },
  {
    n: "2",
    name: "Monochrome stage",
    note: "Near-black stages with a soft top light, a faint dot grid and grain. The product UI is the only thing on stage.",
    hero: <StageField />,
    tiles: [
      <StageField key="a" glow="15% 0%" />,
      <StageField key="b" glow="85% 10%" />,
      <StageField key="c" glow="50% 100%" />,
    ],
  },
  {
    n: "3",
    name: "Grainy colour field",
    note: "One brand hue (deep green here) as a slow-drifting, grainy gradient. Warmer and more brand-led; needs a brand colour decision.",
    hero: <ColorField />,
    tiles: [<ColorField key="a" seed={0} />, <ColorField key="b" seed={1} />, <ColorField key="c" seed={2} />],
  },
]

/** Three candidate directions stacked: hero stage + one row of use-case tiles each. */
export default function Directions() {
  return (
    <div className="pt-16 pb-24 md:pt-24">
      <Container>
        <p className="font-mono text-label text-ink-muted">Lab · visual directions</p>
        <h1 className="mt-3 max-w-[30ch] text-h2 font-normal">{hero.headline}</h1>
      </Container>

      {DIRECTIONS.map((d) => (
        <section key={d.n} className="mt-20">
          <Container>
            <div className="flex items-center justify-between border-t border-line pt-4 font-mono text-label text-ink-muted">
              <span>Direction {d.n}</span>
              <span>{d.name}</span>
            </div>
            <p className="mt-4 mb-8 max-w-[64ch] text-small text-ink-secondary">{d.note}</p>

            <div className={`relative isolate overflow-hidden rounded-md ${STAGE_CLASS}`}>
              {d.hero}
              <ConversationScreen className={`${FRAME} ${CHROME}`} />
            </div>

            <ul className="mt-6 grid gap-6 sm:grid-cols-3">
              {TILES.map((t, i) => (
                <li
                  key={t}
                  className="relative isolate flex aspect-[16/11] items-center justify-center overflow-hidden rounded-md p-6"
                >
                  {d.tiles[i]}
                  <UseCaseVignette kind={t} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ))}
    </div>
  )
}
