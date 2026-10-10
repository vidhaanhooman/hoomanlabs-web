"use client"

import { useEffect, useRef, useState } from "react"
import { PauseIcon, PlayIcon } from "@phosphor-icons/react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { voiceSamples } from "@/content/landing"
import { cn } from "@/lib/utils"

type Item = (typeof voiceSamples.items)[number]

/** Deterministic bar heights per card (no hydration drift). */
const bars = (seed: number) =>
  Array.from({ length: 40 }, (_, i) => {
    const env = 0.35 + 0.65 * Math.sin((Math.PI * (i + 0.5)) / 40)
    return Math.round(4 + 22 * env * (0.4 + 0.6 * Math.abs(Math.sin(i * 1.7 + seed) * Math.cos(i * 0.6 + seed))))
  })

const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`

/**
 * Audio A/B cards: turn detection, noise reduction, voicemail detection. Each
 * plays one clip with a two-way switch; switching while playing swaps the
 * clip at the same moment, so the difference is heard directly. Only one card
 * plays at a time.
 */
export function VoiceSamples() {
  const [playing, setPlaying] = useState<string | null>(null)
  return (
    <Section id="voice-samples">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <h2 className="text-h2 font-normal">{voiceSamples.title}</h2>
          <p className="text-body text-ink-secondary">{voiceSamples.body}</p>
        </div>
        <ul className="mt-10 grid gap-3 md:grid-cols-3">
          {voiceSamples.items.map((it, i) => (
            <li key={it.id} className="flex">
              <SampleCard item={it} seed={i * 2.3} active={playing === it.id} onPlay={(on) => setPlaying(on ? it.id : null)} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

function SampleCard({
  item,
  seed,
  active,
  onPlay,
}: {
  item: Item
  seed: number
  active: boolean
  onPlay: (on: boolean) => void
}) {
  const audio = useRef<HTMLAudioElement | null>(null)
  const [side, setSide] = useState<"a" | "b">("b")
  const [t, setT] = useState(0)
  const [duration, setDuration] = useState(0)
  const [missing, setMissing] = useState(false)
  const [BARS] = useState(() => bars(seed))

  // One audio element per card, created on the client.
  useEffect(() => {
    const el = new Audio(item[side].src)
    el.preload = "metadata"
    el.addEventListener("loadedmetadata", () => setDuration(el.duration))
    el.addEventListener("timeupdate", () => setT(el.currentTime))
    el.addEventListener("ended", () => {
      setT(0)
      onPlay(false)
    })
    el.addEventListener("error", () => setMissing(true))
    audio.current = el
    return () => {
      el.pause()
      audio.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- created once; src swaps happen in switchTo
  }, [])

  // Another card started: stop this one.
  useEffect(() => {
    if (!active) audio.current?.pause()
  }, [active])

  function toggle() {
    const el = audio.current
    if (!el || missing) return
    if (active) {
      el.pause()
      onPlay(false)
    } else {
      el.play().then(() => onPlay(true)).catch(() => setMissing(true))
    }
  }

  function switchTo(next: "a" | "b") {
    if (next === side) return
    setSide(next)
    const el = audio.current
    if (!el) return
    const at = el.currentTime
    const wasPlaying = active
    el.src = item[next].src
    el.currentTime = at
    if (wasPlaying) el.play().catch(() => setMissing(true))
  }

  const progress = duration ? t / duration : 0

  return (
    <article className="flex w-full flex-col gap-5 rounded-md bg-surface p-5 sm:p-6">
      <div className="flex flex-col gap-1.5">
        <h3 className="text-h4 font-normal">{item.title}</h3>
        <p className="text-small text-ink-secondary">{item.body}</p>
      </div>

      <div className="mt-auto flex flex-col gap-4 rounded-md border border-line bg-background p-4">
        {/* A / B switch */}
        <div role="radiogroup" aria-label={`${item.title} version`} className="flex self-start rounded-full bg-secondary p-0.5">
          {(["a", "b"] as const).map((k) => (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={side === k}
              onClick={() => switchTo(k)}
              className={cn(
                "rounded-full px-3.5 py-1 text-small outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-foreground/30",
                side === k ? "bg-background text-foreground shadow-xs" : "text-ink-secondary hover:text-foreground"
              )}
            >
              {item[k].label}
            </button>
          ))}
        </div>

        {/* Player */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            disabled={missing}
            aria-label={active ? `Pause ${item.title} sample` : `Play ${item.title} sample`}
            className="grid size-11 shrink-0 place-items-center rounded-full bg-foreground text-background outline-none transition-transform duration-150 ease-(--ease-out) hover:scale-105 focus-visible:ring-2 focus-visible:ring-foreground/30 active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
          >
            {active ? <PauseIcon weight="fill" className="size-4" /> : <PlayIcon weight="fill" className="ml-0.5 size-4" />}
          </button>
          <span aria-hidden className={cn("flex h-8 flex-1 items-center gap-[2px]", active && "ui-wave")}>
            {BARS.map((h, i) => (
              <span
                key={i}
                className={cn(
                  "flex-1 rounded-full transition-colors duration-200",
                  i / BARS.length < progress ? "bg-foreground" : "bg-foreground/15"
                )}
                style={{ height: h }}
              />
            ))}
          </span>
        </div>

        {/* Transcript: what was said and what the agent did */}
        <ol className="flex flex-col gap-1.5 border-t border-line pt-3 text-small leading-snug">
          {item[side].transcript.map((l, i, all) => {
            const next = all[i + 1]?.t ?? Infinity
            const now = active && t >= l.t && t < next
            const dim = active && t < l.t
            return (
              <li
                key={`${side}-${i}`}
                className={cn("flex gap-2 transition-opacity duration-300", dim ? "opacity-35" : "opacity-100")}
              >
                {l.who === "action" ? (
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-label",
                      side === "b" ? "border-[oklch(0.62_0.15_150/0.4)] text-foreground" : "border-[oklch(0.65_0.18_30/0.4)] text-foreground"
                    )}
                  >
                    <span
                      className={cn("size-1.5 rounded-full", side === "b" ? "bg-[oklch(0.62_0.15_150)]" : "bg-[oklch(0.65_0.18_30)]")}
                    />
                    {l.text}
                  </span>
                ) : (
                  <>
                    <span className={cn("w-11 shrink-0 text-label", now ? "text-foreground" : "text-ink-muted")}>
                      {l.who === "agent" ? "Agent" : "User"}
                    </span>
                    <span className={now ? "text-foreground" : "text-ink-secondary"}>{l.text}</span>
                  </>
                )}
              </li>
            )
          })}
        </ol>

        <div className="flex items-center justify-between gap-3 text-label text-ink-muted">
          <span>{missing ? "Sample coming soon" : item[side].note}</span>
          <span className="shrink-0 font-mono tabular-nums">{duration ? `${clock(t)} / ${clock(duration)}` : ""}</span>
        </div>
      </div>
    </article>
  )
}
