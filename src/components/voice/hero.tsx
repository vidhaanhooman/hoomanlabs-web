"use client"

import { PauseIcon, PlayIcon } from "@phosphor-icons/react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { HeroCopy } from "@/components/product-page/page-bits"
import { FROSTED, HERO_CARD, HeroConsole } from "@/components/product-page/hero-console"
import { useSample } from "@/components/voice/use-sample"
import { voicePage as c } from "@/content/pages/voice"
import { cn } from "@/lib/utils"

/**
 * Voice hero: just the player, floating on the sea backdrop. A wide dark
 * card plays our real recording (Ria's guest-feedback call): a big play
 * button, the recording's actual waveform (PEAKS, measured from the audio),
 * filling as it plays and clickable to jump; the line being spoken shows
 * under it once the timed transcript is added (TRANSCRIPT). Above it, a row
 * of small voice pills (Ria selected) — decorative and aria-hidden; the play
 * and seek controls are real.
 */

const DESIGN_H = 460

/** The voices; names and tones as in the studio section below. */
const VOICES = [
  { name: "Ria", tone: "Warm, calm", on: true },
  { name: "Arjun", tone: "Upbeat" },
  { name: "Meena", tone: "Patient" },
  { name: "Kabir", tone: "Crisp" },
]

/** 160 loudness points measured from public/audio/calls/feedback-en.mp3. */
const PEAKS = [
  0.63, 0.57, 0.56, 0.71, 0.51, 0.66, 0.56, 0.47, 0.38, 0.54, 0.4, 0.47, 0.4, 0.63, 0.52, 0.07, 0.14, 0.24, 0.17, 0, 0.77, 0.71, 0.76, 0.51, 0.51, 0.43, 0.35, 0, 0, 0.01,
  0.01, 0.01, 0.29, 0.06, 0.28, 0.04, 0.01, 0.55, 0.58, 0.39, 0.7, 0.58, 0.55, 0.41, 0.41, 0.32, 0.61, 0.62, 0.57, 0.49, 0.34, 0.35, 0.52, 0.21, 0.01, 0.01, 0, 0.02, 0.19,
  0.32, 0.34, 0.4, 0.28, 0.17, 0.38, 0.16, 0.25, 0.26, 0.28, 0.28, 0.4, 0.09, 0.24, 0.33, 0.13, 0.18, 0.22, 0.23, 0.23, 0.27, 0.32, 0.25, 0.11, 0.25, 0.3, 0.23, 0.1, 0.21,
  0.32, 0.29, 0.19, 0.26, 0.25, 0.18, 0.22, 0.17, 0.24, 0.23, 0.15, 0.17, 0.19, 0.17, 0.17, 0.12, 0.24, 0.3, 0.18, 0.07, 0, 0, 0.03, 0.04, 0.66, 0.59, 0.4, 0.49, 0.15,
  0.61, 0.6, 0.61, 0.42, 0.41, 0.24, 0.65, 0.53, 0.44, 0.57, 0.6, 0.3, 0.3, 0.51, 0.51, 0.21, 0.64, 0.71, 0.44, 0.4, 0.5, 0.24, 0.41, 0.46, 0.5, 0.46, 0.46, 0.26, 0.04,
  0.28, 0.01, 0.04, 0.06, 0.01, 1, 0.76, 0.67, 0.22, 0.01, 0.27, 0.12, 0, 0,
]
const DURATION = 81.4

/**
 * The call's timed transcript (seconds from start). Empty until the real
 * transcript is added; the console then shows the line being spoken.
 */
const TRANSCRIPT: { t: number; who: "Ria" | "Guest"; text: string }[] = []

const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`

export function VoiceHero() {
  const { playing, time, toggle, seek } = useSample()
  const on = playing === "hero"
  const progress = Math.min(1, time / DURATION)
  const line = [...TRANSCRIPT].reverse().find((l) => l.t <= time)
  const next = TRANSCRIPT.find((l) => l.t > time)

  const jump = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    seek(((e.clientX - r.left) / r.width) * DURATION)
    if (!on) toggle("hero")
  }

  return (
    <Section id="voice-hero" spacing="none" className="pt-10 pb-(--section-pad) md:pt-16">
      <Container>
        <HeroCopy crumb={c.crumb} title={c.title} line={c.line} link={{ label: "Pick a voice", href: "#voice-studio" }} />
      </Container>

      {/* Just the player, floating on the sea, playing a real call */}
      <Container className="reveal mt-10 md:mt-14">
        <HeroConsole image="/art/product/voice-backdrop.webp" designH={DESIGN_H}>
          <div className="relative size-full">
            {/* The voices (decorative) */}
            <div aria-hidden className="absolute inset-x-0 top-4 flex justify-center gap-2.5">
              {VOICES.map((v) => (
                <span
                  key={v.name}
                  className={cn(FROSTED, "flex items-center gap-2 rounded-full py-1.5 pr-3.5 pl-1.5", v.on && "border-white/45 bg-[oklch(0.16_0.005_260/0.8)]")}
                >
                  <span
                    className={cn(
                      "grid size-6 place-items-center rounded-full text-[11px]",
                      v.on ? "bg-(--ok)/18 text-(--ok-fg)" : "bg-white/12 text-white/75"
                    )}
                  >
                    {v.name[0]}
                  </span>
                  <span>{v.name}</span>
                  <span className="text-white/60">{v.tone}</span>
                </span>
              ))}
            </div>

            {/* The player: our real recording */}
            <div className={cn(HERO_CARD, "absolute top-[78px] left-[100px] flex w-[900px] flex-col gap-6 p-7")}>
              <div className="flex items-center gap-5">
                <button
                  type="button"
                  onClick={() => toggle("hero")}
                  aria-label={on ? "Pause the call" : "Play the call"}
                  className="grid size-16 shrink-0 cursor-pointer place-items-center rounded-full bg-white text-black transition-transform active:scale-95"
                >
                  {on ? <PauseIcon weight="fill" className="size-6" /> : <PlayIcon weight="fill" className="size-6" />}
                </button>
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="flex items-center gap-2.5">
                    <span className="text-[17px] text-(--ui-text)">Ria calls a guest after their stay</span>
                    <span className="rounded-full bg-(--ui-raised) px-2.5 py-0.5 text-[11px] text-(--ui-text)">Real recording</span>
                  </span>
                  <span className="text-[12.5px] text-(--ui-muted)">Ria · warm, calm · English (India)</span>
                </span>
                <span className="ml-auto font-mono text-[12.5px] text-(--ui-muted) tabular-nums">
                  {clock(time)} / {clock(DURATION)}
                </span>
              </div>

              {/* The recording's real waveform; click to jump */}
              <button type="button" onClick={jump} aria-label="Seek in the call" className="group flex h-[120px] cursor-pointer items-center gap-[2px]">
                {PEAKS.map((pk, i) => (
                  <span
                    key={i}
                    className={cn("flex-1 rounded-full transition-colors duration-150", i / PEAKS.length < progress ? "bg-(--ui-text)" : "bg-white/22 group-hover:bg-white/30")}
                    style={{ height: `${Math.max(4, pk * 100)}%` }}
                  />
                ))}
              </button>

              {/* The line being spoken */}
              <div className="min-h-[3.75rem] border-t border-(--ui-line) pt-4" aria-live="polite">
                <span aria-hidden className="mb-1.5 block font-mono text-[10.5px] tracking-wide text-(--ui-muted) uppercase">
                  Transcript
                </span>
                {TRANSCRIPT.length ? (
                  <div key={line?.t ?? -1} className="flex flex-col gap-1 motion-safe:animate-[reveal-blur_300ms_var(--ease-out)_both]">
                    <p className="text-[15px] text-(--ui-text)">
                      <span className="text-(--ui-muted)">{(line ?? TRANSCRIPT[0]).who}: </span>
                      {(line ?? TRANSCRIPT[0]).text}
                    </p>
                    {next && line && <p className="text-[12px] text-(--ui-muted)">Next · {next.who}</p>}
                  </div>
                ) : (
                  <p className="text-[13px] text-(--ui-muted)">Press play to hear Ria. The live transcript shows here.</p>
                )}
              </div>
            </div>
          </div>
        </HeroConsole>
      </Container>
    </Section>
  )
}
