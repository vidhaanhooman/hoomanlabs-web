"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { ArrowClockwiseIcon, PhoneCallIcon, ProhibitIcon } from "@phosphor-icons/react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { campaignsPage as c } from "@/content/pages/campaigns"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * "A campaign, running", full width on the console's charcoal canvas: eight
 * contacts worked through with three calls at a time. Each row moves from
 * queued to calling (in a slot, from a rotating caller ID) to its outcome;
 * no-answers, voicemails and busy lines get a retry time from the policy;
 * DND and already-contacted numbers are skipped before dialling. Counters
 * and caller-ID use update as it runs; the retry policy floats over the
 * canvas edge, as in the hero. Plays once when on screen, then holds.
 * Reduced motion: finished state. Below lg: the finished run as a list.
 * Sample data.
 */

type Tone = "good" | "warn" | "skip"
type Contact = { name: string; start: number; end: number; outcome: string; retry?: string; tone: Tone }

/** Hand-scheduled across three slots (ticks). Skips resolve at `start` with no call. */
const CONTACTS: Contact[] = [
  { name: "Maya Patel", start: 1, end: 4, outcome: "Promise to pay · 4 Mar", tone: "good" },
  { name: "Daniel Brooks", start: 1, end: 3, outcome: "No answer", retry: "Retry 2:30 pm", tone: "warn" },
  { name: "Leo Grant", start: 2, end: 2, outcome: "DND · skipped", tone: "skip" },
  { name: "Sara Kim", start: 2, end: 5, outcome: "Paid on the call", tone: "good" },
  { name: "Omar Haddad", start: 3, end: 5, outcome: "Voicemail", retry: "Retry tomorrow 10:00", tone: "warn" },
  { name: "Nina Park", start: 4, end: 4, outcome: "Already contacted · skipped", tone: "skip" },
  { name: "Ravi Shah", start: 4, end: 6, outcome: "Busy", retry: "Retry in 30 min", tone: "warn" },
  { name: "Emma Stone", start: 5, end: 8, outcome: "Callback booked · Thu 10:30", tone: "good" },
]
const LAST = 9
const TICK_MS = 900
const NUMBERS = ["+1 555 0100", "+1 555 0101", "+1 555 0102"]

const DESIGN_W = 1100
const DESIGN_H = 640
const FLOAT = "absolute z-10 flex flex-col gap-2.5 rounded-lg border border-line bg-background p-4 text-small shadow-[0_1px_2px_oklch(0.2_0_0/0.06),0_16px_40px_-16px_oklch(0.2_0.02_260/0.3)]"

const CHIP: Record<Tone, string> = {
  good: "bg-[oklch(0.74_0.16_150/0.2)] text-[oklch(0.85_0.12_150)]",
  warn: "bg-[oklch(0.8_0.12_75/0.18)] text-[oklch(0.86_0.1_80)]",
  skip: "bg-white/8 text-white/55",
}

const called = CONTACTS.filter((x) => x.tone !== "skip")
/** Which caller ID each call goes out from: they take turns. */
const fromOf = (x: Contact) => NUMBERS[called.indexOf(x) % NUMBERS.length]

export function RunStory() {
  const { label, title, line, rows } = c.run
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { amount: 0.35, once: true })
  const reduce = usePrefersReducedMotion()
  const [tick, setTick] = useState(0)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => setScale(Math.min(1.12, el.clientWidth / DESIGN_W))
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!seen || reduce || tick >= LAST) return
    const t = setTimeout(() => setTick((v) => v + 1), TICK_MS)
    return () => clearTimeout(t)
  }, [seen, reduce, tick])

  const t = reduce ? LAST : tick
  const calling = called.filter((x) => x.start <= t && t < x.end)
  const state = (x: Contact) => (t < x.start ? "queued" : x.tone === "skip" || t >= x.end ? "done" : "calling")
  const done = CONTACTS.filter((x) => state(x) === "done")
  const counts = {
    called: called.filter((x) => x.start <= t).length,
    reached: done.filter((x) => x.tone === "good").length,
    retrying: done.filter((x) => x.tone === "warn").length,
    skipped: done.filter((x) => x.tone === "skip").length,
  }
  const activeNumbers = new Set(calling.map(fromOf))

  return (
    <Section id="campaigns-run">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <span className="font-mono text-label text-ink-muted">{label}</span>
          <h2 className="text-h2 font-normal">{title}</h2>
          <p className="text-body text-ink-secondary">{line}</p>
        </div>

        <div ref={ref} className="relative mt-10 hidden lg:block" style={{ height: DESIGN_H * scale }}>
          <div className="absolute top-0 left-0 px-[55px] py-8" style={{ width: DESIGN_W, transform: `scale(${scale})`, transformOrigin: "0 0" }}>
            <div className="grid h-[576px] grid-cols-[1fr_17rem] gap-6 overflow-hidden rounded-xl border border-black/10 bg-[oklch(0.23_0.005_260)] bg-[radial-gradient(circle,oklch(1_0_0/0.09)_1px,transparent_1px)] [background-size:18px_18px] p-7 text-[12.5px] text-[oklch(0.95_0_0)] shadow-[0_40px_80px_-40px_oklch(0.2_0.02_260/0.45)]">
              {/* The list being worked through */}
              <div className="flex min-w-0 flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span>March payment reminders</span>
                  <span className="flex items-center gap-1.5 rounded-full bg-white/8 px-2.5 py-0.5 text-[11px]">
                    <span className={cn("size-1.5 rounded-full bg-[oklch(0.78_0.15_150)]", t < LAST && "motion-safe:animate-pulse")} />
                    {t < LAST ? "Running" : "Pass complete"}
                  </span>
                  <span className="ml-auto flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className={cn("rounded-md border px-2 py-0.5 font-mono text-[10.5px] transition-colors", i < calling.length ? "border-white/70 text-white" : "border-white/15 text-white/40")}>
                        Slot {i + 1}
                      </span>
                    ))}
                  </span>
                </div>
                <ol className="flex flex-col overflow-hidden rounded-lg border border-white/12 bg-[oklch(0.28_0.005_260)]">
                  {CONTACTS.map((x) => {
                    const s = state(x)
                    return (
                      <li key={x.name} className={cn("grid h-[52px] grid-cols-[9.5rem_1fr_7.5rem] items-center gap-3 border-b border-white/8 px-4 transition-colors duration-300 last:border-0", s === "calling" && "bg-white/6")}>
                        <span className={cn("transition-opacity", s === "queued" && "opacity-45")}>{x.name}</span>
                        <span className="flex items-center gap-2">
                          {s === "queued" && <span className="text-white/40">Queued</span>}
                          {s === "calling" && (
                            <span className="flex items-center gap-2">
                              <PhoneCallIcon weight="fill" className="size-3.5 text-[oklch(0.78_0.15_150)] motion-safe:animate-pulse" />
                              Calling
                            </span>
                          )}
                          {s === "done" && (
                            <>
                              <span className={cn("flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] motion-safe:animate-[reveal-blur_300ms_var(--ease-out)_both]", CHIP[x.tone])}>
                                {x.tone === "skip" && <ProhibitIcon className="size-3" />}
                                {x.outcome}
                              </span>
                              {x.retry && (
                                <span className="flex items-center gap-1 text-[11px] text-white/60">
                                  <ArrowClockwiseIcon className="size-3" />
                                  {x.retry}
                                </span>
                              )}
                            </>
                          )}
                        </span>
                        <span className="text-right font-mono text-[10.5px] text-white/45">{x.tone !== "skip" && s !== "queued" ? fromOf(x) : ""}</span>
                      </li>
                    )
                  })}
                </ol>
              </div>

              {/* Counters and caller IDs */}
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    ["Called", counts.called],
                    ["Reached", counts.reached],
                    ["Retrying", counts.retrying],
                    ["Skipped", counts.skipped],
                  ].map(([k, v]) => (
                    <div key={k} className="flex flex-col gap-1 rounded-lg border border-white/12 bg-[oklch(0.28_0.005_260)] px-3 py-2.5">
                      <span className="text-[11px] text-white/55">{k}</span>
                      <span className="text-[20px] tabular-nums">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2 rounded-lg border border-white/12 bg-[oklch(0.28_0.005_260)] p-3">
                  <span className="text-[11px] text-white/55">Caller IDs · rotating</span>
                  {NUMBERS.map((n) => (
                    <span key={n} className={cn("flex items-center justify-between font-mono text-[11.5px] transition-colors", activeNumbers.has(n) ? "text-white" : "text-white/40")}>
                      {n}
                      <span className={cn("size-1.5 rounded-full transition-colors", activeNumbers.has(n) ? "bg-[oklch(0.78_0.15_150)]" : "bg-white/15")} />
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* The retry policy, floating over the canvas edge */}
            <div className={cn(FLOAT, "right-0 bottom-0 w-[19rem]")}>
              <span className="text-label text-ink-muted">Retry policy</span>
              {[
                ["No answer", "after 2 hours"],
                ["Voicemail", "next day, 10:00"],
                ["Busy", "after 30 minutes"],
                ["Attempts", "up to 3"],
              ].map(([k, v]) => (
                <span key={k} className="flex justify-between">
                  <span className="text-ink-muted">{k}</span>
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Below lg: the finished run as a list */}
        <ol className="mt-8 flex flex-col gap-2 lg:hidden">
          {CONTACTS.map((x) => (
            <li key={x.name} className="flex flex-col gap-1.5 rounded-xl bg-[oklch(0.23_0.005_260)] p-4 text-small text-[oklch(0.95_0_0)]">
              <span>{x.name}</span>
              <span className="flex flex-wrap items-center gap-2">
                <span className={cn("rounded-full px-2 py-0.5 text-[11px]", CHIP[x.tone])}>{x.outcome}</span>
                {x.retry && <span className="text-[11px] text-white/60">{x.retry}</span>}
              </span>
            </li>
          ))}
        </ol>

        <ul className="mt-10 grid gap-6 sm:grid-cols-3">
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
