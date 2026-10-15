"use client"

import { useState } from "react"
import { PauseIcon, PlayIcon } from "@phosphor-icons/react"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { useSample } from "@/components/voice/use-sample"
import { voicePage as c } from "@/content/pages/voice"
import { cn } from "@/lib/utils"

/**
 * "Speaks like your customers do": the language wall (one sentence in each
 * script) beside two cards: a Hinglish exchange tagged as it switches, with
 * the boosted keywords; and Clear line, a before/after you can hear (street
 * noise mixed in when off). The five features sit underneath. SAMPLE audio.
 */

function Seg({ lang, children }: { lang: "HI" | "EN"; children: React.ReactNode }) {
  return (
    <span className={cn("rounded-md px-1.5 py-0.5", lang === "HI" ? "bg-[oklch(0.95_0.04_70)]" : "bg-[oklch(0.95_0.03_245)]")}>
      {children}
      <span className="ml-1.5 font-mono text-[10px] text-ink-muted">{lang}</span>
    </span>
  )
}

export function Languages() {
  const { label, title, line, rows } = c.languages
  const { playing, toggle, setBed } = useSample()
  const [clear, setClear] = useState(false)
  const on = playing === "clear-line"

  const pick = (v: boolean) => {
    setClear(v)
    setBed(v ? "none" : "street")
  }

  return (
    <Section id="voice-languages">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <span className="font-mono text-label text-ink-muted">{label}</span>
          <h2 className="text-h2 font-normal">{title}</h2>
          <p className="text-body text-ink-secondary">{line}</p>
        </div>

        <div className="mt-10 grid gap-3 lg:grid-cols-[1.35fr_1fr]">
          {/* The wall */}
          <Panel className="p-6 sm:p-8">
            <ul className="grid gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
              {c.wall.items.map((it) => (
                <li key={it.lang} className="flex flex-col gap-1.5 border-b border-line py-4">
                  <span className="font-mono text-label text-ink-muted">{it.lang}</span>
                  <span lang={it.lang === "English" ? "en" : undefined} className="text-h4 leading-snug font-normal">
                    {it.text}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>

          <div className="flex flex-col gap-3">
            {/* Code-switch and keyword boost */}
            <Panel className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
              <span className="text-h4 font-normal">Switches mid-sentence</span>
              <div className="flex flex-col gap-3 rounded-md border border-line bg-background p-4 text-small leading-loose">
                <p>
                  <span className="text-ink-muted">Caller: </span>
                  <Seg lang="HI">Main Friday ko pay kar sakta hoon,</Seg> <Seg lang="EN">or should I pay now?</Seg>
                </p>
                <p>
                  <span className="text-ink-muted">Ria: </span>
                  <Seg lang="HI">Bilkul, Friday chalega.</Seg> <Seg lang="EN">I&apos;ll send a reminder on Thursday.</Seg>
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 text-label">
                <span className="text-ink-muted">Keyword boost:</span>
                {["Halden", "HLD-482913", "Green Fixed 12m"].map((k) => (
                  <span key={k} className="rounded-md border border-line bg-background px-2 py-0.5 font-mono">
                    {k}
                  </span>
                ))}
              </div>
            </Panel>

            {/* Clear line, before and after */}
            <Panel className="flex flex-col gap-4 p-6 sm:p-7">
              <span className="flex items-baseline justify-between gap-3">
                <span className="text-h4 font-normal">Clear line</span>
                <span className="text-label text-ink-muted">Busy street · sample audio</span>
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggle("clear-line", clear ? "none" : "street")}
                  aria-label={on ? "Pause the sample" : "Play the sample"}
                  className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full bg-foreground text-background transition-transform active:scale-95"
                >
                  {on ? <PauseIcon weight="fill" className="size-4" /> : <PlayIcon weight="fill" className="size-4" />}
                </button>
                <div role="radiogroup" aria-label="Noise reduction" className="flex rounded-full bg-background p-1 text-small">
                  {[
                    { v: false, t: "Noise reduction off" },
                    { v: true, t: "On" },
                  ].map((o) => (
                    <button
                      key={o.t}
                      type="button"
                      role="radio"
                      aria-checked={clear === o.v}
                      onClick={() => pick(o.v)}
                      className={cn("cursor-pointer rounded-full px-3.5 py-1.5 transition-colors", clear === o.v ? "bg-foreground text-background" : "text-ink-secondary hover:text-foreground")}
                    >
                      {o.t}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-small text-ink-secondary">
                {clear ? "Only the caller's voice comes through." : "Traffic reaches the line. Switch it on while it plays."}
              </p>
            </Panel>
          </div>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {rows.map((r) => (
            <li key={r.id} className="flex flex-col gap-1 border-t border-line pt-4">
              <span className="text-body">{r.title}</span>
              <span className="text-small text-ink-secondary">{r.body}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
