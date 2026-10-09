"use client"

import { useEffect, useRef, useState } from "react"
import { PhoneCallIcon } from "@phosphor-icons/react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { COUNTRIES, flagFor } from "@/components/sections/listen-experience"
import { useCaseCalls } from "@/content/demo-calls"
import { cn } from "@/lib/utils"

/**
 * Hero call box: pick a use case, enter a number, get the demo call. Posts to
 * /api/callback (same contract as the Listen panel). After a successful
 * request the box turns into a small "calling you" card.
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

/** "9876543210" -> "98•••••210" for the calling card. */
const mask = (d: string) => d.slice(0, 2) + "•".repeat(Math.max(0, d.length - 5)) + d.slice(-3)

export function HeroCall({
  glass = false,
  onCalling,
  onUseCase,
}: {
  glass?: boolean
  /** The agent's name while a demo call is on its way, else null. */
  onCalling?: (agent: string | null) => void
  /** The selected use case changed (index into useCaseCalls). */
  onUseCase?: (index: number) => void
}) {
  const [index, setIndex] = useState(0)
  const [country, setCountry] = useState(COUNTRIES[0].code)
  const [digits, setDigits] = useState("")
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const [calling, setCalling] = useState<string | null>(null)
  const [late, setLate] = useState(false)
  const touchedCountry = useRef(false)
  const honeypot = useRef<HTMLInputElement>(null)
  const call = useCaseCalls[index]
  const fmt = FORMAT[country]
  const valid = digits.length === fmt.length

  // Preselect the visitor's dialling code (only if they haven't picked one).
  useEffect(() => {
    fetch("/api/geo")
      .then((r) => r.json())
      .then((d: { country?: string }) => {
        const code = d.country ? BY_ISO[d.country] : undefined
        if (code && !touchedCountry.current) setCountry(code)
      })
      .catch(() => {})
  }, [])

  // Offer a retry if the call hasn't arrived after 30 seconds.
  useEffect(() => {
    if (!calling) return
    const t = setTimeout(() => setLate(true), 30_000)
    return () => clearTimeout(t)
  }, [calling])

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
      setLate(false)
      setCalling(`${country} ${mask(digits)}`)
      onCalling?.(call.agent)
    } catch {
      setError("We couldn't place the call. Please try again.")
    } finally {
      setSending(false)
    }
  }

  // `glass`: frosted, for sitting on the painted hero.
  const shell = cn(
    "relative mx-auto w-full max-w-xl rounded-[1.75rem] border p-2 text-left",
    glass
      ? "border-white/50 bg-background/80 shadow-[0_30px_80px_-30px_oklch(0.2_0.03_150/0.6)] backdrop-blur-xl"
      : "border-line bg-surface shadow-[0_10px_30px_-18px_oklch(0_0_0/0.25)]"
  )

  /* ------------------------------------------------ calling state */
  if (calling) {
    return (
      <div className={shell} role="status" aria-live="polite">
        <div className="flex items-center gap-4 rounded-[1.4rem] bg-background p-4">
          <span className="relative grid size-12 shrink-0 place-items-center">
            <span className="absolute inset-0 rounded-full bg-foreground/15 motion-safe:animate-ping" />
            <span className="relative grid size-12 place-items-center rounded-full bg-foreground text-background">
              <PhoneCallIcon weight="fill" className="size-5" aria-hidden />
            </span>
          </span>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-body font-medium">
              {call.agent} is calling {calling}
            </span>
            <span className="text-small text-ink-secondary">
              {call.useCase} · {call.language}. Answer when your phone rings.
            </span>
          </div>
          <span className="ui-wave hidden h-5 items-end gap-[3px] sm:flex" aria-hidden>
            {[8, 14, 10, 16, 9].map((h, i) => (
              <span key={i} className="w-[3px] rounded-full bg-foreground" style={{ height: h }} />
            ))}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3 px-4 pt-2.5 pb-1.5 text-label text-ink-secondary">
          <span>{late ? "Didn't get it?" : "It usually takes about 10 seconds."}</span>
          <button
            type="button"
            onClick={() => {
              setCalling(null)
              onCalling?.(null)
            }}
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            {late ? "Try again" : "Use another number"}
          </button>
        </div>
      </div>
    )
  }

  /* ------------------------------------------------ form */
  return (
    <form onSubmit={submit} noValidate className={shell}>
      <input
        ref={honeypot}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] size-px opacity-0"
      />

      {/* Use case, with its language */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 pr-1 pb-2 pl-4">
        <span className="text-small text-ink-secondary">Pick a use case</span>
        <div
          role="radiogroup"
          aria-label="Use case"
          className="flex max-w-full gap-0.5 overflow-x-auto rounded-full bg-secondary p-0.5 [scrollbar-width:none]"
        >
          {useCaseCalls.map((c, i) => (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={i === index}
              onClick={() => {
                setIndex(i)
                onUseCase?.(i)
              }}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-small whitespace-nowrap outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-foreground/30",
                i === index ? "bg-background text-foreground shadow-xs" : "text-ink-secondary hover:text-foreground"
              )}
            >
              {c.useCase}
              {i === index && <span className="font-mono text-[10px] text-ink-muted">{LANG[c.language] ?? c.language}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Number + call */}
      <div
        className={cn(
          "flex h-12 items-center rounded-full border bg-background pr-1 transition-colors focus-within:border-foreground/45",
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
            className="shrink-0 rounded-none border-0 bg-transparent py-0 pr-1.5 pl-4 text-small focus-visible:ring-0 data-[size=default]:h-full"
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
          className="min-w-0 flex-1 bg-transparent px-2 text-body tabular-nums outline-none placeholder:text-ink-muted"
        />
        <CallButton className="hidden h-10 px-5 sm:inline-flex" sending={sending} disabled={!valid} />
      </div>
      {/* Narrow screens: the button gets its own full-width row. */}
      <CallButton className="mt-2 flex h-11 w-full sm:hidden" sending={sending} disabled={!valid} />

      {/* One line: consent (an error replaces the wording, the box stays) */}
      <label className="flex items-center gap-2 px-4 pt-2.5 pb-1.5 text-label text-ink-secondary">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked)
            setError(null)
          }}
          className="size-3.5 shrink-0 accent-foreground"
        />
        {error ? (
          <span className="text-destructive">{error}</span>
        ) : (
          <span>One demo call from {call.agent} to this number. No spam.</span>
        )}
      </label>
    </form>
  )
}

function CallButton({ className, sending, disabled }: { className?: string; sending: boolean; disabled: boolean }) {
  return (
    <button
      type="submit"
      disabled={sending || disabled}
      aria-busy={sending || undefined}
      className={cn(
        "shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-small font-medium text-primary-foreground transition-[transform,opacity] duration-150 ease-(--ease-out) active:scale-[0.97] disabled:opacity-40",
        className
      )}
    >
      <PhoneCallIcon weight="fill" className="size-4" aria-hidden />
      {sending ? "Calling…" : "Call me"}
    </button>
  )
}
