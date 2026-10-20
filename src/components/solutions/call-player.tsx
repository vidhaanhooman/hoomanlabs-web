"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowCounterClockwiseIcon, CheckCircleIcon, PauseIcon, PlayIcon } from "@phosphor-icons/react"

import { HERO_CARD } from "@/components/product-page/hero-console"
import { ONE_AT_A_TIME, useSample } from "@/components/voice/use-sample"
import type { SolutionCall } from "@/content/solutions"
import { cn } from "@/lib/utils"

/**
 * One call, as a dark player card (the Voice hero's language): play and
 * restart, who is calling for whom, the language and direction, a seek bar
 * of simple level bars (decorative, not measured from the audio), the
 * transcript with the line being spoken lit (translations under non-English
 * lines) and the outcome once the call ends. A call with `audio` plays the
 * real recording through useSample (one player at a time across the page);
 * without it, a silent transcript preview runs a clock through the lines at
 * their `t`, clearly labelled. Either way the bar is a keyboard slider
 * (arrows step 5s, Home/End) and the current line is announced politely.
 */

export type Playback = { on: boolean; time: number; toggle: () => void; seek: (t: number) => void; restart: () => void }

export const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`

/** Simple, even-looking level bars (a pattern, not the recording's peaks). */
const BARS = Array.from({ length: 72 }, (_, i) => Math.round(28 + 62 * Math.abs(Math.sin(i * 1.31) * Math.cos(i * 0.23))))

/** The real recording, through the shared sample player. */
export function useAudioPlayback(id: string, src: string, duration: number, autoPlay: boolean): Playback {
  const { playing, time, toggle, seek } = useSample(src)
  const on = playing === id
  // Start on mount when asked (a click elsewhere chose this call). After
  // useSample's own effect, so the audio element exists.
  useEffect(() => {
    if (autoPlay) toggle(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return {
    on,
    time: Math.min(time, duration),
    toggle: () => toggle(id),
    seek,
    restart: () => {
      seek(0)
      if (!on) toggle(id)
    },
  }
}

/** A silent clock through the transcript, paused by any other player starting. */
export function usePreviewPlayback(duration: number, autoPlay: boolean): Playback {
  const [on, setOn] = useState(autoPlay)
  const [time, setTime] = useState(0)
  const token = useRef({})

  // Starting on mount still pauses anything else that is playing.
  useEffect(() => {
    if (autoPlay) window.dispatchEvent(new CustomEvent(ONE_AT_A_TIME, { detail: token.current }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const others = (e: Event) => {
      if ((e as CustomEvent).detail !== token.current) setOn(false)
    }
    window.addEventListener(ONE_AT_A_TIME, others)
    return () => window.removeEventListener(ONE_AT_A_TIME, others)
  }, [])

  useEffect(() => {
    if (!on) return
    let last = performance.now()
    const id = window.setInterval(() => {
      const now = performance.now()
      const dt = (now - last) / 1000
      last = now
      setTime((t) => {
        const next = t + dt
        if (next >= duration) {
          setOn(false)
          return duration
        }
        return next
      })
    }, 100)
    return () => window.clearInterval(id)
  }, [on, duration])

  const start = useCallback(() => {
    window.dispatchEvent(new CustomEvent(ONE_AT_A_TIME, { detail: token.current }))
    setOn(true)
  }, [])

  return {
    on,
    time,
    toggle: () => {
      if (on) return setOn(false)
      if (time >= duration) setTime(0)
      start()
    },
    seek: (t) => setTime(Math.max(0, Math.min(duration, t))),
    restart: () => {
      setTime(0)
      start()
    },
  }
}

export function CallPlayer({ call, id, autoPlay = false, className }: { call: SolutionCall; id: string; autoPlay?: boolean; className?: string }) {
  return call.audio ? <AudioCall call={call} id={id} src={call.audio} autoPlay={autoPlay} className={className} /> : <PreviewCall call={call} autoPlay={autoPlay} className={className} />
}

function AudioCall({ call, id, src, autoPlay, className }: { call: SolutionCall; id: string; src: string; autoPlay: boolean; className?: string }) {
  const p = useAudioPlayback(id, src, call.duration, autoPlay)
  return <PlayerView call={call} p={p} className={className} />
}

function PreviewCall({ call, autoPlay, className }: { call: SolutionCall; autoPlay: boolean; className?: string }) {
  const p = usePreviewPlayback(call.duration, autoPlay)
  return <PlayerView call={call} p={p} className={className} />
}

function PlayerView({ call, p, className }: { call: SolutionCall; p: Playback; className?: string }) {
  const { on, time, toggle, seek, restart } = p
  const real = !!call.audio
  const progress = Math.min(1, time / call.duration)
  const ended = time >= call.duration - 0.3
  const started = on || time > 0
  const current = started ? [...call.lines].reverse().find((l) => l.t <= time) : undefined
  const who = (w: "agent" | "caller") => (w === "agent" ? call.agent : "Customer")

  const jump = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    seek(((e.clientX - r.left) / r.width) * call.duration)
  }
  const keys = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step: Record<string, number> = { ArrowRight: 5, ArrowUp: 5, ArrowLeft: -5, ArrowDown: -5 }
    if (e.key in step) seek(Math.max(0, Math.min(call.duration, time + step[e.key])))
    else if (e.key === "Home") seek(0)
    else if (e.key === "End") seek(call.duration)
    else if (e.key === " " || e.key === "Enter") toggle()
    else return
    e.preventDefault()
  }

  return (
    <div className={cn(HERO_CARD, "flex flex-col gap-5 p-5 sm:p-7", className)}>
      {/* Controls and who */}
      <div className="flex items-start gap-4 sm:items-center">
        <button
          type="button"
          onClick={toggle}
          aria-label={on ? "Pause the call" : real ? "Play the call" : "Play the transcript preview"}
          className="grid size-12 shrink-0 cursor-pointer place-items-center rounded-full bg-white text-black transition-transform focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none active:scale-95 sm:size-14"
        >
          {on ? <PauseIcon weight="fill" className="size-5" /> : <PlayIcon weight="fill" className="size-5" />}
        </button>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="text-[15px] text-(--ui-text) sm:text-[16px]">{call.title}</span>
          <span className="text-[12.5px] text-(--ui-muted)">
            {call.agent} · {call.company}
          </span>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <span className="font-mono text-[12px] text-(--ui-muted) tabular-nums">
            {clock(time)} / {clock(call.duration)}
          </span>
          <button
            type="button"
            onClick={restart}
            aria-label="Restart the call"
            className="grid size-7 cursor-pointer place-items-center rounded-full text-(--ui-muted) transition-colors hover:bg-(--ui-raised) hover:text-(--ui-text) focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
          >
            <ArrowCounterClockwiseIcon className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="-mt-1 flex flex-wrap gap-1.5 text-[11px] sm:pl-[4.5rem]">
        <span className="rounded-full bg-(--ui-raised) px-2.5 py-0.5 text-(--ui-text)">{real ? "Real recording" : "Transcript preview · recording coming soon"}</span>
        <span className="rounded-full border border-(--ui-line) px-2.5 py-0.5 text-(--ui-muted)">{call.language}</span>
        <span className="rounded-full border border-(--ui-line) px-2.5 py-0.5 text-(--ui-muted)">{call.direction}</span>
      </div>

      {/* Seek bar of simple level bars */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="Position in the call"
        aria-valuemin={0}
        aria-valuemax={Math.round(call.duration)}
        aria-valuenow={Math.round(time)}
        aria-valuetext={`${clock(time)} of ${clock(call.duration)}`}
        onPointerDown={jump}
        onKeyDown={keys}
        className="group flex h-14 cursor-pointer touch-none items-center gap-[2px] rounded-sm focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-4 focus-visible:ring-offset-(--ui-bg) focus-visible:outline-none sm:h-16"
      >
        {BARS.map((h, i) => (
          <span
            key={i}
            aria-hidden
            className={cn("min-w-px flex-1 rounded-full transition-colors duration-150", i / BARS.length < progress ? "bg-(--ui-text)" : "bg-white/20 group-hover:bg-white/28")}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>

      {/* Transcript, current line lit */}
      <div className="border-t border-(--ui-line) pt-4">
        <span aria-hidden className="mb-2.5 block font-mono text-[10.5px] tracking-wide text-(--ui-muted) uppercase">
          Transcript
        </span>
        <ol className="flex flex-col gap-2.5">
          {call.lines.map((l) => {
            const lit = current === l
            return (
              <li key={l.t} className={cn("flex flex-col gap-0.5 transition-colors duration-200", lit ? "text-(--ui-text)" : started ? "text-(--ui-muted)/70" : "text-(--ui-muted)")}>
                <p className="text-[13.5px] leading-[1.5]">
                  <span className={cn("mr-1.5 font-mono text-[11px]", lit ? "text-(--ui-live)" : "text-(--ui-muted)")}>{who(l.who)}</span>
                  {l.text}
                </p>
                {l.translation && <p className="text-[12px] text-(--ui-muted)">{l.translation}</p>}
              </li>
            )
          })}
        </ol>
        <p className="sr-only" aria-live="polite">
          {current ? `${who(current.who)}: ${current.translation ?? current.text}` : ""}
          {ended ? ` Outcome: ${call.outcome}` : ""}
        </p>
      </div>

      {/* Outcome, once it ends */}
      <div className="flex min-h-7 items-center">
        {ended ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-(--ui-raised) px-3 py-1 text-[12px] text-(--ui-text) motion-safe:animate-[reveal-blur_300ms_var(--ease-out)_both]">
            <CheckCircleIcon weight="fill" className="size-3.5 text-(--ui-live)" />
            {call.outcome}
          </span>
        ) : (
          <span className="text-[12px] text-(--ui-muted)">Outcome shows when the call ends.</span>
        )}
      </div>
    </div>
  )
}
