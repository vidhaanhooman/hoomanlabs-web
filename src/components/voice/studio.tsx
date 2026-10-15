"use client"

import { useState } from "react"
import { PauseIcon, PlayIcon } from "@phosphor-icons/react"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { useSample } from "@/components/voice/use-sample"
import { voicePage as c } from "@/content/pages/voice"
import { STAGE } from "@/lib/recipes"
import { cn } from "@/lib/utils"

/**
 * Voice studio, in the homepage's split panel: the three features beside a
 * light studio card you can use. Play a voice, see its tuning, and switch
 * the office ambience on to hear it under the call. SAMPLE: every voice
 * plays the one real recording.
 */

const VOICES = [
  { name: "Ria", tone: "Warm, calm", lang: "EN · HI", use: "Collections", tuning: { speed: 45, warmth: 80, stability: 70 } },
  { name: "Arjun", tone: "Upbeat", lang: "EN · HI", use: "Sales", tuning: { speed: 62, warmth: 60, stability: 55 } },
  { name: "Meena", tone: "Patient", lang: "TA · EN", use: "Support", tuning: { speed: 38, warmth: 75, stability: 80 } },
  { name: "Kabir", tone: "Crisp", lang: "HI · MR", use: "Reminders", tuning: { speed: 55, warmth: 50, stability: 75 } },
]

function Slider({ label, pct }: { label: string; pct: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="flex justify-between text-label">
        <span className="text-ink-muted">{label}</span>
        <span className="tabular-nums">{pct}%</span>
      </span>
      <span className="relative h-1.5 rounded-full bg-surface">
        <span className="absolute inset-y-0 left-0 rounded-full bg-foreground transition-[width] duration-500" style={{ width: `${pct}%` }} />
      </span>
    </div>
  )
}

export function Studio() {
  const { label, title, rows } = c.studio
  const { playing, toggle, setBed } = useSample()
  const [voice, setVoice] = useState(0)
  const [ambience, setAmbience] = useState(false)
  const v = VOICES[voice]

  const flipAmbience = () => {
    const next = !ambience
    setAmbience(next)
    setBed(next ? "office" : "none")
  }

  return (
    <Section id="voice-studio" spacing="tight">
      <Container>
        <Panel className="grid items-center gap-8 p-4 sm:p-6 lg:grid-cols-3 lg:gap-0 lg:p-3">
          <div className="flex flex-col gap-5 px-2 pt-4 sm:px-4 lg:px-10 lg:py-10">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-label text-ink-muted">{label}</span>
              <h2 className="text-h3 font-normal">{title}</h2>
            </div>
            <ul className="flex flex-col border-t border-line">
              {rows.map((r) => (
                <li key={r.id} className="flex flex-col gap-1 border-b border-line py-4">
                  <span className="text-body">{r.title}</span>
                  <span className="text-small text-ink-secondary">{r.body}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={cn(STAGE, "flex items-center justify-center p-5 sm:p-10 lg:col-span-2 lg:min-h-[34rem]")}>
            <div className="flex w-full max-w-xl flex-col overflow-hidden rounded-xl border border-line bg-background text-small shadow-[0_1px_2px_oklch(0.2_0_0/0.05),0_24px_48px_-24px_oklch(0.2_0.02_260/0.3)]">
              <div className="flex items-center justify-between border-b border-line px-5 py-3 text-label text-ink-muted">
                <span>Voice studio · Billing agent</span>
                <span>Sample audio</span>
              </div>
              <ul className="flex flex-col p-2">
                {VOICES.map((x, i) => {
                  const id = `voice-${x.name}`
                  const on = playing === id
                  return (
                    <li key={x.name}>
                      <div className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors", i === voice ? "bg-surface" : "hover:bg-surface/60")}>
                        <button
                          type="button"
                          onClick={() => {
                            setVoice(i)
                            toggle(id)
                          }}
                          aria-label={on ? `Pause ${x.name}` : `Play ${x.name}`}
                          className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full bg-foreground text-background transition-transform active:scale-95"
                        >
                          {on ? <PauseIcon weight="fill" className="size-3.5" /> : <PlayIcon weight="fill" className="size-3.5" />}
                        </button>
                        <button type="button" onClick={() => setVoice(i)} className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 text-left">
                          <span className="flex flex-col">
                            <span className="text-body">{x.name}</span>
                            <span className="text-label text-ink-muted">{x.tone}</span>
                          </span>
                          <span className="ml-auto font-mono text-label text-ink-muted">{x.lang}</span>
                          <span className="w-24 text-right text-label">{x.use}</span>
                        </button>
                      </div>
                    </li>
                  )
                })}
              </ul>
              <div className="grid gap-4 border-t border-line px-5 py-4 sm:grid-cols-3">
                <Slider label="Speed" pct={v.tuning.speed} />
                <Slider label="Warmth" pct={v.tuning.warmth} />
                <Slider label="Stability" pct={v.tuning.stability} />
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-line bg-surface px-5 py-3">
                <span className="flex flex-col">
                  <span>Ambience · office</span>
                  <span className="text-label text-ink-muted">Play a voice, then switch it on to hear the room.</span>
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={ambience}
                  aria-label="Office ambience"
                  onClick={flipAmbience}
                  className={cn("relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors", ambience ? "bg-foreground" : "bg-line-strong")}
                >
                  <span className={cn("absolute top-0.5 size-5 rounded-full bg-background shadow transition-[left]", ambience ? "left-[1.375rem]" : "left-0.5")} />
                </button>
              </div>
            </div>
          </div>
        </Panel>
      </Container>
    </Section>
  )
}
