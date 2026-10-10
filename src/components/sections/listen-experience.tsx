"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { PauseIcon, PhoneCallIcon, PlayIcon } from "@phosphor-icons/react"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { VoiceBloom } from "@/components/sections/voice-bloom"
import { useCaseCalls, type UseCaseCall } from "@/content/demo-calls"
import { listen } from "@/content/draft"
import { useCallPlayback } from "@/hooks/use-call-playback"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"
import { ES, GB, IN, US } from "country-flag-icons/react/3x2"

/**
 * Lit windows in the valley paintings, as % of the 3:2 image (measured from
 * listen-night.png; all four scenes share the same composition).
 */
const WINDOWS = [
  { x: 7.0, y: 63.6, s: 1 },
  { x: 10.2, y: 65.4, s: 1.4 },
  { x: 18.2, y: 67.3, s: 1 },
  { x: 39.4, y: 62.8, s: 0.6 },
  { x: 85.4, y: 68.0, s: 1 },
  { x: 92.5, y: 66.7, s: 1.4 },
  { x: 95.5, y: 66.1, s: 0.7 },
]
/** The window that "rings" when a callback is requested (nearest house, left). */
const RING_WINDOW = 1

/**
 * Hear it, in the same split-panel proportions as Build/Test:
 * - left third: heading, use cases, callback
 * - right two thirds (16:11): painted backdrop with the voice bloom, the line
 *   being spoken and progress
 * On mobile: copy and use cases, then the visual, then the callback.
 *
 * Backdrops (`backdrop` prop): "sound" painted colour texture per use case (current) or "valley" time-of-day scenes (previous).
 */
export function ListenExperience({ backdrop = "sound" }: { backdrop?: "sound" | "valley" }) {
  const [index, setIndex] = useState(0)
  const [ringing, setRinging] = useState(false)
  const call = useCaseCalls[index]
  const reduce = usePrefersReducedMotion()
  const windowsRef = useRef<HTMLDivElement>(null)
  const glowBase = useRef(call.scene.glow)
  useEffect(() => {
    glowBase.current = call.scene.glow
  }, [call.scene.glow])

  // Written straight to the DOM every frame (no React re-render).
  function onAmp(amp: number) {
    windowsRef.current?.style.setProperty("--glow", String(Math.min(1, glowBase.current + amp * 0.85)))
  }

  function pick(i: number) {
    setRinging(false)
    setIndex(i)
  }

  return (
    <Container>
      <Panel className="grid gap-8 p-4 sm:p-6 lg:grid-cols-3 lg:grid-rows-[1fr_auto] lg:gap-x-0 lg:gap-y-6 lg:p-3">
        {/* Copy + use cases */}
        <div className="flex flex-col gap-6 px-2 pt-4 sm:px-4 lg:col-start-1 lg:row-start-1 lg:self-end lg:px-10 lg:pt-10">
          <h2 className="text-h3 font-normal">
            {listen.title}
            <span className="block text-ink-secondary">{listen.body}</span>
          </h2>
          <UseCasePicker index={index} onChange={pick} />
        </div>

        {/* Visual */}
        <div className="relative isolate aspect-[4/5] overflow-hidden rounded-md sm:aspect-[4/3] lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:aspect-[16/11]">
          {backdrop === "sound" ? (
            <div aria-hidden className="absolute inset-0 -z-10 bg-[oklch(0.3_0.02_150)]">
              {useCaseCalls.map((c, i) => (
                <Image
                  key={c.id}
                  src={c.sound.art}
                  alt=""
                  fill
                  sizes="(min-width: 1300px) 860px, (min-width: 1024px) 66vw, 100vw"
                  style={c.sound.filter ? { filter: c.sound.filter } : undefined}
                  className={cn(
                    "object-cover transition-opacity duration-700 ease-(--ease-in-out) motion-reduce:duration-0",
                    i === index ? "opacity-100" : "opacity-0"
                  )}
                />
              ))}
              <div className="absolute inset-0 bg-[oklch(0.2_0.02_250/0.38)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_60%_at_50%_50%,oklch(0.18_0.02_250/0.45),transparent)]" />
            </div>
          ) : (
            <div aria-hidden className="absolute inset-0 -z-10 [container-type:size]">
              <div className="absolute top-1/2 left-1/2 aspect-[3/2] w-[max(100cqw,150cqh)] -translate-1/2">
                {useCaseCalls.map((c, i) => (
                  <Image
                    key={c.id}
                    src={c.scene.art}
                    alt=""
                    fill
                    sizes="(min-width: 1300px) 860px, (min-width: 1024px) 66vw, 100vw"
                    className={cn(
                      "object-cover transition-opacity duration-900 ease-(--ease-in-out) motion-reduce:duration-0",
                      i === index ? "opacity-100" : "opacity-0"
                    )}
                  />
                ))}
                <div ref={windowsRef} className={cn("absolute inset-0 [--glow:0.2]", ringing && "listen-ringing")}>
                  {WINDOWS.map((w, i) => (
                    <span
                      key={i}
                      className={cn(
                        "absolute size-[1.1%] -translate-1/2 rounded-full bg-[oklch(0.86_0.15_75)] opacity-(--glow) mix-blend-screen blur-[3px]",
                        i === RING_WINDOW && "listen-ring-window"
                      )}
                      style={{ left: `${w.x}%`, top: `${w.y}%`, scale: w.s }}
                    />
                  ))}
                </div>
              </div>
              <div
                className="absolute inset-0 transition-opacity duration-900 ease-(--ease-in-out)"
                style={{
                  opacity: call.scene.scrim + 0.2,
                  background:
                    "radial-gradient(ellipse 45% 62% at 50% 50%, oklch(0.17 0.02 250 / 0.85), oklch(0.17 0.02 250 / 0.35) 70%, transparent)",
                }}
              />
            </div>
          )}

          <Stage key={call.id} call={call} reduce={reduce} ringing={ringing} setRinging={setRinging} onAmp={onAmp} />
        </div>

        {/* Callback */}
        <div className="px-2 pb-4 sm:px-4 lg:col-start-1 lg:row-start-2 lg:px-10 lg:pb-10">
          <Callback call={call} ringing={ringing} onCall={() => setRinging(true)} />
        </div>
      </Panel>
    </Container>
  )
}

/** Use cases as a quiet list (light panel). */
function UseCasePicker({ index, onChange }: { index: number; onChange: (i: number) => void }) {
  return (
    <div role="radiogroup" aria-label="Use case" className="flex flex-col">
      {useCaseCalls.map((c, i) => {
        const active = i === index
        return (
          <button
            key={c.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(i)}
            className={cn(
              "flex items-center justify-between gap-4 border-t border-line py-2.5 text-left transition-colors duration-200 last:border-b",
              active ? "text-foreground" : "text-ink-muted hover:text-foreground"
            )}
          >
            <span className="flex items-center gap-2.5">
              <span
                aria-hidden
                className={cn(
                  "size-1.5 shrink-0 rounded-full bg-foreground transition-opacity duration-200",
                  active ? "opacity-100" : "opacity-0"
                )}
              />
              <span className="text-body">{c.useCase}</span>
            </span>
            <span className="text-small text-ink-muted">{c.language}</span>
          </button>
        )
      })}
    </div>
  )
}

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`

/** The visual: bloom + play, the line being spoken, progress. */
function Stage({
  call,
  reduce,
  ringing,
  setRinging,
  onAmp,
}: {
  call: UseCaseCall
  reduce: boolean
  ringing: boolean
  setRinging: (v: boolean) => void
  onAmp: (amp: number) => void
}) {
  const { playing, time, hasAudio, toggle, seek, audioProps } = useCallPlayback(call.src, call.duration)
  const analyser = useRef<{ node: AnalyserNode; data: Uint8Array<ArrayBuffer> } | null>(null)

  const progress = Math.min(1, time / call.duration)
  const started = playing || time > 0
  const lineIndex = call.lines.reduce((acc, l, i) => (l.t <= time ? i : acc), 0)
  const line = call.lines[lineIndex]
  const lineEnd = call.lines[lineIndex + 1]?.t ?? call.duration
  const words = line.text.split(" ")
  const spoken = started
    ? Math.min(words.length, Math.floor(((time - line.t) / ((lineEnd - line.t) * 0.85)) * words.length) + 1)
    : 0
  const speaking = playing && spoken < words.length

  const speakingRef = useRef(speaking)
  useEffect(() => {
    speakingRef.current = speaking
  }, [speaking])

  // Real audio level while a real file plays; otherwise a synthetic envelope
  // that follows the transcript's word timing.
  function level() {
    const a = analyser.current
    const el = audioProps.ref.current
    if (a && el && !el.paused && el.readyState >= 2) {
      a.node.getByteTimeDomainData(a.data)
      let peak = 0
      for (const v of a.data) peak = Math.max(peak, Math.abs(v - 128))
      return Math.min(1, peak / 64)
    }
    if (!speakingRef.current) return 0.08
    const t = performance.now() / 1000
    return 0.5 + 0.5 * Math.abs(Math.sin(t * 9.1)) * Math.abs(Math.sin(t * 3.7 + 1))
  }

  async function onPlay() {
    setRinging(false)
    const el = audioProps.ref.current
    if (hasAudio && el && !analyser.current) {
      try {
        const ctx = new AudioContext()
        const src = ctx.createMediaElementSource(el)
        const node = ctx.createAnalyser()
        node.fftSize = 256
        src.connect(node)
        node.connect(ctx.destination)
        analyser.current = { node, data: new Uint8Array(node.fftSize) }
      } catch {
        // Fall back to the synthetic level.
      }
    }
    await toggle()
  }

  const mode = ringing ? "ringing" : playing ? "playing" : "idle"

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-6 py-8 text-center">
      <audio {...audioProps} />

      <div className="relative aspect-square w-[min(48%,13rem)]">
        <VoiceBloom
          level={level}
          progress={progress}
          mode={mode}
          reduce={reduce}
          onAmp={onAmp}
          className="absolute inset-0 size-full"
        />
        <button
          type="button"
          onClick={ringing ? () => setRinging(false) : onPlay}
          aria-label={ringing ? "Dismiss call" : playing ? `Pause ${call.useCase} call` : `Play ${call.useCase} call`}
          className="absolute top-1/2 left-1/2 grid size-14 -translate-1/2 place-items-center rounded-full bg-white text-[oklch(0.16_0_0)] shadow-[0_14px_36px_-16px_oklch(0_0_0/0.8)] transition-transform duration-150 ease-(--ease-out) active:scale-[0.95]"
        >
          {ringing ? (
            <PhoneCallIcon weight="fill" className="size-5" />
          ) : playing ? (
            <PauseIcon weight="fill" className="size-5" />
          ) : (
            <PlayIcon weight="fill" className="size-5 translate-x-0.5" />
          )}
        </button>
      </div>

      <div className="flex min-h-20 w-full max-w-md flex-col items-center gap-1" aria-live="polite">
        <p className="text-label text-white/70">
          {ringing
            ? "Incoming call"
            : `${line.speaker === "agent" ? `${call.agent}, agent` : "Caller"} · ${call.direction} · ${call.language}`}
        </p>
        {ringing ? (
          <p className="text-body-lg text-white">Pick up, it&apos;s {call.agent}.</p>
        ) : (
          <>
            <p
              key={`${call.id}-${lineIndex}`}
              className="text-body text-balance sm:text-body-lg motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300"
            >
              {words.map((w, i) => (
                <span
                  key={i}
                  className={cn("transition-colors duration-200", started && i < spoken ? "text-white" : "text-white/50")}
                >
                  {w}{" "}
                </span>
              ))}
            </p>
            {line.translation && <p className="text-small text-white/70">{line.translation}</p>}
          </>
        )}
      </div>

      <div className="flex w-full max-w-xs items-center gap-3 text-white/70">
        <span className="font-mono text-label tabular-nums">{fmt(time)}</span>
        <div className="relative h-5 flex-1">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/30" />
          <div className="absolute top-1/2 left-0 h-px -translate-y-1/2 bg-white" style={{ width: `${progress * 100}%` }} />
          <input
            type="range"
            min={0}
            max={call.duration}
            step={0.1}
            value={time}
            onChange={(e) => seek(Number(e.target.value))}
            aria-label={`Seek ${call.useCase} call`}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </div>
        <span className="font-mono text-label tabular-nums">{fmt(call.duration)}</span>
      </div>
      {!hasAudio && <p className="text-label text-white/55">Transcript preview. Audio coming soon.</p>}
    </div>
  )
}

/** India first: it's the default. Flags are SVG icons (no emoji). */
export const COUNTRIES = [
  { code: "+91", name: "India", Flag: IN },
  { code: "+44", name: "United Kingdom", Flag: GB },
  { code: "+1", name: "United States", Flag: US },
  { code: "+34", name: "Spain", Flag: ES },
]
export const flagFor = (code: string) => COUNTRIES.find((c) => c.code === code)?.Flag

/**
 * Callback form (light, on the panel). Posts to /api/callback, which creates
 * a HoomanLabs task server-side so the demo agent calls the visitor back.
 * Pressing "Call me" with a number is the request (and consent) for the call.
 * The ringing state only plays after the server confirms.
 */
function Callback({ call, ringing, onCall }: { call: UseCaseCall; ringing: boolean; onCall: () => void }) {
  const [country, setCountry] = useState(COUNTRIES[0].code)
  const [phone, setPhone] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const honeypot = useRef<HTMLInputElement>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (sending) return
    const digits = phone.replace(/\D/g, "")
    if (digits.length < 7 || digits.length > 15) return setError("Enter a valid phone number.")
    setError(null)
    setSending(true)
    try {
      const res = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country, phone, useCase: call.id, consent: true, website: honeypot.current?.value ?? "" }),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (!res.ok || !data.ok) {
        setError(data.error ?? "We couldn't place the call right now. Please try again.")
        return
      }
      onCall()
    } catch {
      setError("We couldn't place the call right now. Please try again.")
    } finally {
      setSending(false)
    }
  }

  return (
    <form onSubmit={submit} noValidate className="relative flex flex-col gap-2.5">
      {/* Honeypot for bots: hidden from people and assistive tech. */}
      <input
        ref={honeypot}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] size-px opacity-0"
      />
      <label htmlFor="callback-phone" className="text-small font-medium">
        Get this call on your phone
      </label>
      <div className="flex h-11 overflow-hidden rounded-full border border-line-strong bg-background transition-colors duration-150 focus-within:border-foreground/45">
        <Select value={country} onValueChange={(v) => v && setCountry(v)}>
          <SelectTrigger
            aria-label="Country code"
            className="shrink-0 rounded-none border-0 bg-transparent py-0 pr-1.5 pl-3.5 text-small focus-visible:ring-0 focus-visible:outline-none data-[size=default]:h-full"
          >
            <SelectValue>
              {(v: string) => {
                const Flag = flagFor(v)
                return (
                  <span className="flex items-center gap-1.5">
                    {Flag && <Flag aria-hidden className="h-3 w-[1.125rem] rounded-[2px] ring-1 ring-black/10" />}
                    {v}
                  </span>
                )
              }}
            </SelectValue>
          </SelectTrigger>
          <SelectContent align="start" alignItemWithTrigger={false} sideOffset={8} className="min-w-52">
            {COUNTRIES.map((c) => (
              <SelectItem key={c.code} value={c.code} className="py-1.5">
                <c.Flag aria-hidden className="h-3 w-[1.125rem] shrink-0 rounded-[2px] ring-1 ring-black/10" />
                <span className="flex-1">{c.name}</span>
                <span className="text-ink-muted tabular-nums">{c.code}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <input
          id="callback-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="Your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "callback-error" : undefined}
          className="min-w-0 flex-1 bg-transparent px-2 text-body outline-none placeholder:text-ink-muted"
        />
      </div>
      <button
        type="submit"
        disabled={sending}
        aria-busy={sending || undefined}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-body font-medium text-primary-foreground transition-[transform,opacity] duration-150 ease-(--ease-out) active:scale-[0.97] disabled:opacity-70"
      >
        <PhoneCallIcon weight="fill" className="size-4" aria-hidden />
        {sending ? "Requesting call…" : `Call me with ${call.agent}`}
      </button>
      {error && (
        <p id="callback-error" className="text-small text-destructive">
          {error}
        </p>
      )}
      {ringing && (
        <p role="status" className="text-small text-ink-secondary">
          {call.agent} is calling you now. Answer when your phone rings.
        </p>
      )}
    </form>
  )
}
