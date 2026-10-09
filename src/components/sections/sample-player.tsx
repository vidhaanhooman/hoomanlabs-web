"use client"

import { useEffect, useRef, useState } from "react"
import { PauseIcon, PlayIcon } from "@phosphor-icons/react"

import type { UseCaseCall } from "@/content/demo-calls"
import { cn } from "@/lib/utils"

/**
 * Glass sample player for the painted hero: a slim frosted pill with a play
 * button, the agent and use case, a fine waveform and the time. While playing,
 * the current transcript line replaces the label inside the pill. Plays the
 * recording when one exists, otherwise a silent timed transcript preview.
 */

/** Deterministic bar heights (no hydration drift). */
const BARS = Array.from({ length: 28 }, (_, i) => 4 + Math.round(10 * Math.abs(Math.sin(i * 1.3) * Math.cos(i * 0.45))))

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`

export function SamplePlayer({ call, className }: { call: UseCaseCall; className?: string }) {
  const [t, setT] = useState(0)
  const [playing, setPlaying] = useState(false)
  const stopRef = useRef<() => void>(() => {})

  // Stop and reset whenever the use case changes or the player unmounts.
  useEffect(() => {
    return () => stopRef.current()
  }, [call.id])

  function toggle() {
    if (playing) return stopRef.current()
    let timer: ReturnType<typeof setInterval> | undefined
    const audio = new Audio(call.src)
    const stop = () => {
      clearInterval(timer)
      audio.pause()
      setPlaying(false)
      setT(0)
    }
    stopRef.current = stop
    setPlaying(true)
    audio.addEventListener("timeupdate", () => setT(audio.currentTime))
    audio.addEventListener("ended", stop)
    audio.play().catch(() => {
      const start = performance.now()
      timer = setInterval(() => {
        const now = (performance.now() - start) / 1000
        if (now >= call.duration) return stop()
        setT(now)
      }, 150)
    })
  }

  const line = playing ? [...call.lines].reverse().find((l) => l.t <= t) : undefined
  const progress = playing ? t / call.duration : 0

  return (
    <div
      className={cn(
        "flex h-12 w-full max-w-xl items-center gap-3 rounded-full border border-white/50 bg-background/75 pr-4 pl-1.5 shadow-[0_20px_50px_-24px_oklch(0.2_0.03_150/0.55)] backdrop-blur-xl",
        className
      )}
    >
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause sample" : `Play a sample ${call.useCase.toLowerCase()} call`}
        className="grid size-9 shrink-0 place-items-center rounded-full border border-line-strong bg-background text-foreground outline-none transition-transform duration-150 ease-(--ease-out) hover:scale-105 focus-visible:ring-2 focus-visible:ring-foreground/30 active:scale-95"
      >
        {playing ? <PauseIcon weight="fill" className="size-3.5" /> : <PlayIcon weight="fill" className="size-3.5" />}
      </button>

      <p className="min-w-0 flex-1 truncate text-left text-small" aria-live="polite">
        {line ? (
          <>
            <span className="mr-1.5 text-ink-muted">{line.speaker === "agent" ? call.agent : "Caller"}</span>
            {line.text}
          </>
        ) : (
          <>
            Hear {call.agent} handle {call.useCase.toLowerCase()}
            <span className="text-ink-muted"> · {call.language}</span>
          </>
        )}
      </p>

      {/* Waveform: fills with progress; bars breathe while playing */}
      <span aria-hidden className={cn("hidden h-4 items-center gap-[2px] sm:flex", playing && "ui-wave")}>
        {BARS.map((h, i) => (
          <span
            key={i}
            className={cn(
              "w-[2px] rounded-full transition-colors duration-200",
              i / BARS.length < progress ? "bg-foreground" : "bg-foreground/25"
            )}
            style={{ height: h }}
          />
        ))}
      </span>

      <span className="shrink-0 font-mono text-label text-ink-muted tabular-nums">
        {fmt(playing ? t : 0)} / {fmt(call.duration)}
      </span>
    </div>
  )
}
