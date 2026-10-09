"use client"

import { useEffect, useRef, useState } from "react"
import { PauseIcon, PhoneCallIcon, PlayIcon } from "@phosphor-icons/react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { COUNTRIES, flagFor } from "@/components/sections/listen-experience"
import { useCaseCalls, type UseCaseCall } from "@/content/demo-calls"
import { cn } from "@/lib/utils"

/**
 * The hero's one card: pick a use case, listen to a sample, get the call.
 * Frosted to sit on the painted hero. The sample plays the recording when one
 * exists, otherwise a silent timed transcript preview. "Call me" posts to
 * /api/callback (same contract as the Listen panel); on success the listening
 * area becomes the calling state.
 */

/** ISO country -> dialling code we support; used to preselect from /api/geo. */
const BY_ISO: Record<string, string> = { IN: "+91", GB: "+44", US: "+1", ES: "+34" }

/** Digits a full national number has, and how to group them while typing. */
const FORMAT: Record<string, { length: number; groups: number[] }> = {
  "+91": { length: 10, groups: [5, 5] },
  "+44": { length: 10, groups: [4, 6] },
  "+1": { length: 10, groups: [3, 3, 4] },
  "+34": { length: 9, groups: [3, 3, 3] },
}

const LANG: Record<string, string> = { English: "EN", Hindi: "HI", Spanish: "ES" }

/** Deterministic bar heights (no hydration drift). */
const BARS = Array.from({ length: 36 }, (_, i) => {
  const env = 0.35 + 0.65 * Math.sin((Math.PI * (i + 0.5)) / 36)
  return Math.round(4 + 18 * env * (0.45 + 0.55 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6))))
})

function group(digits: string, groups: number[]) {
  const out: string[] = []
  let i = 0
  for (const g of groups) {
    if (i >= digits.length) break
    out.push(digits.slice(i, i + g))
    i += g
  }
  return out.join(" ")
}

const mask = (d: string) => d.slice(0, 2) + "•".repeat(Math.max(0, d.length - 5)) + d.slice(-3)
const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`

export function HeroCallCard() {
  const [index, setIndex] = useState(0)
  const call = useCaseCalls[index]

  // Sample
  const [t, setT] = useState(0)
  const [playing, setPlaying] = useState(false)
  const stopRef = useRef<() => void>(() => {})

  // Callback form
  const [country, setCountry] = useState(COUNTRIES[0].code)
  const [digits, setDigits] = useState("")
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const [calling, setCalling] = useState<string | null>(null)
  const [late, setLate] = useState(false)
  const touchedCountry = useRef(false)
  const honeypot = useRef<HTMLInputElement>(null)
  const fmt = FORMAT[country]
  const valid = digits.length === fmt.length

  useEffect(() => () => stopRef.current(), [index])

  useEffect(() => {
    fetch("/api/geo")
      .then((r) => r.json())
      .then((d: { country?: string }) => {
        const code = d.country ? BY_ISO[d.country] : undefined
        if (code && !touchedCountry.current) setCountry(code)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!calling) return
    const timer = setTimeout(() => setLate(true), 30_000)
    return () => clearTimeout(timer)
  }, [calling])

  function toggleSample() {
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

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (sending || !valid) return
    if (!consent) return setError("Tick the box to get the call.")
    setError(null)
    setSending(true)
    try {
      const res = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country, phone: digits, useCase: call.id, consent, website: honeypot.current?.value ?? "" }),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (!res.ok || !data.ok) return setError(data.error ?? "We couldn't place the call. Please try again.")
      stopRef.current()
      setLate(false)
      setCalling(`${country} ${mask(digits)}`)
    } catch {
      setError("We couldn't place the call. Please try again.")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl rounded-[2rem] border border-white/50 bg-background/80 p-3 text-left shadow-[0_40px_100px_-40px_oklch(0.2_0.03_150/0.65)] backdrop-blur-xl sm:p-4">
      {/* 1 Pick */}
      <div className="flex justify-center px-2 pt-1 pb-3">
        <div
          role="radiogroup"
          aria-label="Use case"
          className="flex max-w-full gap-1 overflow-x-auto rounded-full bg-secondary p-1 [scrollbar-width:none]"
        >
          {useCaseCalls.map((c, i) => (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={i === index}
              onClick={() => {
                setIndex(i)
                setCalling(null)
              }}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-small whitespace-nowrap outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-foreground/30",
                i === index ? "bg-background text-foreground shadow-xs" : "text-ink-secondary hover:text-foreground"
              )}
            >
              {c.useCase}
              <span className="font-mono text-[10px] text-ink-muted">{LANG[c.language] ?? c.language}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2 Listen (or the calling state) */}
      <div className="rounded-[1.5rem] border border-line bg-background p-4 sm:p-5">
        {calling ? (
          <Calling call={call} number={calling} late={late} onReset={() => setCalling(null)} />
        ) : (
          <Listen call={call} t={t} playing={playing} onToggle={toggleSample} />
        )}
      </div>

      {/* 3 Get the call */}
      {!calling && (
        <form onSubmit={submit} noValidate className="relative px-1 pt-4">
          <input
            ref={honeypot}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="absolute -left-[9999px] size-px opacity-0"
          />
          <p className="px-1 pb-2 text-small text-ink-secondary">Or get this call on your phone</p>
          <div
            className={cn(
              "flex h-14 items-center rounded-full border bg-background pr-1.5 transition-colors focus-within:border-foreground/45",
              error && consent ? "border-destructive/60" : "border-line-strong"
            )}
          >
            <Select
              value={country}
              onValueChange={(v) => {
                if (!v) return
                touchedCountry.current = true
                setCountry(v)
                setDigits((d) => d.slice(0, FORMAT[v].length))
              }}
            >
              <SelectTrigger
                aria-label="Country code"
                className="shrink-0 rounded-none border-0 bg-transparent py-0 pr-1.5 pl-5 text-body focus-visible:ring-0 data-[size=default]:h-full"
              >
                <SelectValue>
                  {(v: string) => {
                    const Flag = flagFor(v)
                    return (
                      <span className="flex items-center gap-2">
                        {Flag && <Flag aria-hidden className="h-3.5 w-5 rounded-[2px] ring-1 ring-black/10" />}
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
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder={group("0".repeat(fmt.length), fmt.groups)}
              aria-label="Phone number"
              value={group(digits, fmt.groups)}
              onChange={(e) => {
                setDigits(e.target.value.replace(/\D/g, "").slice(0, fmt.length))
                setError(null)
              }}
              aria-invalid={error ? true : undefined}
              className="min-w-0 flex-1 bg-transparent px-2 text-body-lg tabular-nums outline-none placeholder:text-ink-muted"
            />
            <CallButton className="hidden h-11 px-6 sm:inline-flex" sending={sending} ready={valid} />
          </div>
          <CallButton className="mt-2 flex h-12 w-full sm:hidden" sending={sending} ready={valid} />

          <label className="flex cursor-pointer items-center gap-2.5 px-2 pt-3 pb-1 text-small text-ink-secondary">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked)
                setError(null)
              }}
              className="size-4 shrink-0 accent-foreground"
            />
            {error ? (
              <span className="text-destructive">{error}</span>
            ) : (
              <span>I agree to one demo call from {call.agent} to this number. No spam.</span>
            )}
          </label>
        </form>
      )}
    </div>
  )
}

/* ------------------------------------------------------------ parts */

function Listen({ call, t, playing, onToggle }: { call: UseCaseCall; t: number; playing: boolean; onToggle: () => void }) {
  const progress = playing ? t / call.duration : 0
  // Index of the line being spoken; -1 before play.
  const current = playing ? call.lines.findLastIndex((l) => l.t <= t) : -1
  const listRef = useRef<HTMLOListElement>(null)

  // Keep the current line in view inside the transcript.
  useEffect(() => {
    const list = listRef.current
    const el = list?.children[current] as HTMLElement | undefined
    if (list && el) list.scrollTo({ top: el.offsetTop - list.clientHeight / 2 + el.clientHeight / 2, behavior: "smooth" })
  }, [current])

  return (
    <div className="grid gap-5 md:grid-cols-[15rem_1fr] md:gap-6">
      {/* Left: play */}
      <div className="flex flex-col items-center justify-center gap-4 text-center md:border-r md:border-line md:pr-6">
        <p className="text-small text-ink-secondary">
          <span className="font-medium text-foreground">{call.agent}</span> · {call.useCase} agent
          <span className="block text-ink-muted">
            {call.direction} · {call.language}
          </span>
        </p>
        <span className="relative grid size-16 shrink-0 place-items-center">
          {playing && <span className="absolute inset-0 rounded-full bg-foreground/10 motion-safe:animate-ping" />}
          <button
            type="button"
            onClick={onToggle}
            aria-label={playing ? "Pause sample" : `Play a sample ${call.useCase.toLowerCase()} call`}
            className="relative grid size-16 place-items-center rounded-full bg-foreground text-background shadow-[0_10px_24px_-10px_oklch(0_0_0/0.5)] outline-none transition-transform duration-150 ease-(--ease-out) hover:scale-105 focus-visible:ring-2 focus-visible:ring-foreground/30 active:scale-95"
          >
            {playing ? <PauseIcon weight="fill" className="size-5" /> : <PlayIcon weight="fill" className="ml-0.5 size-5" />}
          </button>
        </span>
        {/* Waveform scrubber: played part solid, with the time at each end */}
        <div className="flex w-full flex-col gap-1.5">
          <span aria-hidden className={cn("flex h-7 w-full items-center gap-[3px]", playing && "ui-wave")}>
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
          <span className="flex justify-between font-mono text-[11px] text-ink-muted tabular-nums">
            <span>{clock(playing ? t : 0)}</span>
            <span>{clock(call.duration)}</span>
          </span>
        </div>
      </div>

      {/* Right: the full transcript, current line highlighted */}
      <ol
        ref={listRef}
        aria-label="Transcript"
        className="relative flex max-h-36 flex-col gap-2.5 overflow-y-auto md:max-h-64 pr-1 [scrollbar-width:thin]"
      >
        {current === -1 ? (
          <li className="flex h-full min-h-24 items-center justify-center text-center text-small text-ink-muted">
            Press play. The transcript appears as {call.agent} talks.
          </li>
        ) : (
          call.lines.slice(0, current + 1).map((l, i) => (
            <li
              key={l.t}
              className={cn(
                "flex gap-3 text-small leading-snug transition-colors duration-500 motion-safe:animate-[reveal-blur_450ms_var(--ease-out)_both]",
                i === current ? "text-foreground" : "text-ink-muted"
              )}
            >
              <span className={cn("w-11 shrink-0 text-label", i === current ? "font-medium text-foreground" : "text-ink-muted")}>
                {l.speaker === "agent" ? "Agent" : "User"}
              </span>
              <span>{l.text}</span>
            </li>
          ))
        )}
      </ol>
    </div>
  )
}

function Calling({ call, number, late, onReset }: { call: UseCaseCall; number: string; late: boolean; onReset: () => void }) {
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center gap-4 py-6 text-center">
      <span className="relative grid size-20 place-items-center">
        <span className="absolute inset-0 rounded-full bg-foreground/10 motion-safe:animate-ping" />
        <span className="absolute inset-2 rounded-full bg-foreground/10" />
        <span className="relative grid size-14 place-items-center rounded-full bg-foreground text-background">
          <PhoneCallIcon weight="fill" className="size-6" aria-hidden />
        </span>
      </span>
      <div className="flex flex-col gap-1">
        <p className="text-h4 font-normal">
          {call.agent} is calling {number}
        </p>
        <p className="text-small text-ink-secondary">
          {call.useCase} · {call.language}. Answer when your phone rings, usually within 10 seconds.
        </p>
      </div>
      <button type="button" onClick={onReset} className="text-small font-medium underline-offset-4 hover:underline">
        {late ? "Didn't get it? Try again" : "Use another number"}
      </button>
    </div>
  )
}

function CallButton({ className, sending, ready }: { className?: string; sending: boolean; ready: boolean }) {
  return (
    <button
      type="submit"
      disabled={sending || !ready}
      aria-busy={sending || undefined}
      className={cn(
        "shrink-0 items-center justify-center gap-2 rounded-full text-body font-medium transition-[transform,background-color,color] duration-200 ease-(--ease-out) active:scale-[0.97]",
        ready ? "bg-primary text-primary-foreground" : "border border-line-strong bg-background text-ink-muted",
        className
      )}
    >
      <PhoneCallIcon weight="fill" className="size-4" aria-hidden />
      {sending ? "Calling…" : "Call me"}
    </button>
  )
}
