"use client"

import { useRef, useState } from "react"
import { PhoneCallIcon } from "@phosphor-icons/react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { COUNTRIES, flagFor } from "@/components/sections/listen-experience"
import { useCaseCalls } from "@/content/demo-calls"
import { cn } from "@/lib/utils"

/**
 * Hero call box: pick a use case, enter a number, get the demo call. Posts to
 * /api/callback (same contract as the Listen panel). Each use case has a fixed
 * language, shown next to the number.
 */
export function HeroCall() {
  const [index, setIndex] = useState(0)
  const [country, setCountry] = useState(COUNTRIES[0].code)
  const [phone, setPhone] = useState("")
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const [ringing, setRinging] = useState(false)
  const honeypot = useRef<HTMLInputElement>(null)
  const call = useCaseCalls[index]

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (sending) return
    const digits = phone.replace(/\D/g, "")
    if (digits.length < 7 || digits.length > 15) return setError("Enter a valid phone number.")
    if (!consent) return setError("Please agree to receive the call.")
    setError(null)
    setSending(true)
    try {
      const res = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country, phone, useCase: call.id, consent, website: honeypot.current?.value ?? "" }),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (!res.ok || !data.ok) return setError(data.error ?? "We couldn't place the call right now. Please try again.")
      setRinging(true)
    } catch {
      setError("We couldn't place the call right now. Please try again.")
    } finally {
      setSending(false)
    }
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="relative mx-auto w-full max-w-xl rounded-[1.75rem] border border-line bg-surface p-2 text-left shadow-[0_10px_30px_-18px_oklch(0_0_0/0.25)]"
    >
      <input
        ref={honeypot}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] size-px opacity-0"
      />

      {/* Use case */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 pr-1 pb-2 pl-4">
        <span className="text-small text-ink-secondary">Hear it on your use case</span>
        <div role="radiogroup" aria-label="Use case" className="flex max-w-full gap-0.5 overflow-x-auto rounded-full bg-secondary p-0.5 [scrollbar-width:none]">
          {useCaseCalls.map((c, i) => (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={i === index}
              onClick={() => {
                setIndex(i)
                setRinging(false)
              }}
              className={cn(
                "shrink-0 rounded-full px-3 py-1 text-small whitespace-nowrap transition-colors duration-150",
                i === index ? "bg-background text-foreground shadow-xs" : "text-ink-secondary hover:text-foreground"
              )}
            >
              {c.useCase}
            </button>
          ))}
        </div>
      </div>

      {/* Number + call */}
      <div className="flex h-12 items-center rounded-full border border-line-strong bg-background pr-1 transition-colors focus-within:border-foreground/45">
        <Select value={country} onValueChange={(v) => v && setCountry(v)}>
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
          placeholder="Your phone number"
          aria-label="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          aria-invalid={error ? true : undefined}
          className="min-w-0 flex-1 bg-transparent px-2 text-body outline-none placeholder:text-ink-muted"
        />
        <span className="hidden border-l border-line px-3 text-small text-ink-secondary sm:block">{call.language}</span>
        <button
          type="submit"
          disabled={sending}
          aria-busy={sending || undefined}
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-primary px-5 text-small font-medium text-primary-foreground transition-[transform,opacity] duration-150 ease-(--ease-out) active:scale-[0.97] disabled:opacity-70"
        >
          <PhoneCallIcon weight="fill" className="size-4" aria-hidden />
          {sending ? "Calling…" : "Call me"}
        </button>
      </div>

      <div className="flex flex-col gap-1 px-4 pt-2.5 pb-1.5">
        <label className="flex items-start gap-2 text-label text-ink-secondary">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-px size-3.5 shrink-0 accent-foreground"
          />
          I agree to receive one automated demo call. Our {call.useCase.toLowerCase()} agent, {call.agent}, calls in about 10
          seconds.
        </label>
        {error && <p className="text-label text-destructive">{error}</p>}
        {ringing && (
          <p role="status" className="text-label text-foreground">
            {call.agent} is calling you now. Answer when your phone rings.
          </p>
        )}
      </div>
    </form>
  )
}
