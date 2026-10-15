"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { CheckIcon, XIcon } from "@phosphor-icons/react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { testingPage as c } from "@/content/pages/testing"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * "Simulated customers call before real ones do", full width on the
 * console's charcoal canvas (as on Channels): five mystery callers, each a
 * persona (rushed, angry, elderly, switches language, reads numbers slowly),
 * hold a short exchange with Ria, then their checklist ticks one item at a
 * time and the outcome lands. The callers start one after another. One fails
 * (interrupted while the caller read a card number), as in the hero run.
 * Plays once when on screen, then holds. Below lg: a list. Reduced motion:
 * finished. Sample data (Halden Energy, Ria).
 */

type Caller = {
  id: string
  persona: string
  scenario: string
  say: [string, string][]
  checks: [string, boolean][]
  outcome: string
  passed: boolean
}

const CALLERS: Caller[] = [
  {
    id: "rushed",
    persona: "Rushed",
    scenario: "Update a phone number",
    say: [
      ["Caller", "Two minutes, that's all I have. New number is 555 0142."],
      ["Ria", "Done. Your number is now 555 0142."],
    ],
    checks: [
      ["Verified identity", true],
      ["Confirmed the new number", true],
      ["Kept it short", true],
    ],
    outcome: "Passed · 4 turns",
    passed: true,
  },
  {
    id: "angry",
    persona: "Angry",
    scenario: "Wants a refund",
    say: [
      ["Caller", "You charged me twice. I want my money back."],
      ["Ria", "I'm sorry. I can see both charges, and I'll refund $86.40 now."],
    ],
    checks: [
      ["Stayed calm", true],
      ["Verified identity", true],
      ["Correct amount", true],
    ],
    outcome: "Passed · 9 turns",
    passed: true,
  },
  {
    id: "elderly",
    persona: "Elderly",
    scenario: "Asks to repeat",
    say: [
      ["Caller", "Sorry, could you say that again, a bit slower?"],
      ["Ria", "Of course. Your bill is $62.10, due on the 4th."],
    ],
    checks: [
      ["Repeated clearly", true],
      ["Read disclosure", true],
      ["Correct amount", true],
    ],
    outcome: "Passed · 12 turns",
    passed: true,
  },
  {
    id: "language",
    persona: "Switches language",
    scenario: "Moves to Hindi",
    say: [
      ["Caller", "Kya aap Hindi mein bata sakte hain?"],
      ["Ria", "Haan, zaroor. Aapka bill ₹1,240 ka hai."],
    ],
    checks: [
      ["Replied in Hindi", true],
      ["Kept the account details", true],
      ["Correct amount", true],
    ],
    outcome: "Passed · 7 turns",
    passed: true,
  },
  {
    id: "numbers",
    persona: "Reads numbers slowly",
    scenario: "Pays by card",
    say: [
      ["Caller", "It's four, two, seven… one…"],
      ["Ria", "Thanks. And the expiry date?"],
    ],
    checks: [
      ["Verified identity", true],
      ["Read disclosure", true],
      ["Waited for every digit", false],
    ],
    outcome: "Failed · interrupted at turn 6",
    passed: false,
  },
]

/** Each caller: two lines, three checks, then the outcome. */
const STEPS = 6
const STAGGER = 1
const LAST = (CALLERS.length - 1) * STAGGER + STEPS - 1
const BEAT_MS = 700

const GREEN = "text-[oklch(0.78_0.15_150)]"
const AMBER = "text-[oklch(0.8_0.14_70)]"

export function MysteryCallers() {
  const { label, title, line, rows } = c.callers
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { amount: 0.35, once: true })
  const reduce = usePrefersReducedMotion()
  const [beat, setBeat] = useState(-1)

  useEffect(() => {
    if (!seen || reduce || beat >= LAST) return
    const t = setTimeout(() => setBeat((b) => b + 1), beat < 0 ? 300 : BEAT_MS)
    return () => clearTimeout(t)
  }, [seen, reduce, beat])

  const b = reduce ? LAST : beat
  const finished = b >= LAST
  const passed = CALLERS.filter((x, i) => x.passed && b - i * STAGGER >= STEPS - 1).length
  const ended = CALLERS.filter((_, i) => b - i * STAGGER >= STEPS - 1).length

  return (
    <Section id="testing-callers">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <span className="font-mono text-label text-ink-muted">{label}</span>
          <h2 className="text-h2 font-normal">{title}</h2>
          <p className="text-body text-ink-secondary">{line}</p>
        </div>

        <div
          ref={ref}
          className="relative mt-10 hidden overflow-hidden rounded-xl border border-black/10 bg-[oklch(0.23_0.005_260)] bg-[radial-gradient(circle,oklch(1_0_0/0.09)_1px,transparent_1px)] [background-size:18px_18px] p-8 text-[oklch(0.95_0_0)] shadow-[0_40px_80px_-40px_oklch(0.2_0.02_260/0.45)] lg:block"
        >
          <div className="flex items-center justify-between font-mono text-[10.5px] text-white/45">
            <span>Mystery callers · Ria, Billing · v13 draft</span>
            <span className="tabular-nums">{finished ? `${passed} of ${CALLERS.length} passed · 1 to fix` : `${ended} of ${CALLERS.length} finished`}</span>
          </div>

          <div className="mt-5 grid grid-cols-5 gap-3">
            {CALLERS.map((x, i) => {
              const p = b - i * STAGGER
              const started = p >= 0
              const active = started && p < STEPS - 1
              const done = p >= STEPS - 1
              return (
                <div
                  key={x.id}
                  className={cn(
                    "flex flex-col gap-3 rounded-xl border bg-[oklch(0.28_0.005_260)] p-4 text-[12px] leading-[1.5] transition-[opacity,border-color,box-shadow] duration-500 ease-(--ease-out)",
                    active ? "border-white/70 shadow-[0_0_0_3px_oklch(1_0_0/0.08)]" : "border-white/15",
                    !started && "opacity-45"
                  )}
                >
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-2">
                      <span className="font-mono text-[10px] tracking-wide text-white/50 uppercase">Persona</span>
                      <span className="ml-auto">
                        {active && <span className="block size-1.5 rounded-full bg-[oklch(0.78_0.15_150)] motion-safe:animate-pulse" />}
                      </span>
                    </span>
                    <span className="text-[13px]">{x.persona}</span>
                    <span className="text-white/55">{x.scenario}</span>
                  </div>

                  {/* The exchange */}
                  <div className="flex min-h-[7.5rem] flex-col gap-2 border-t border-white/10 pt-3">
                    {x.say.map(([who, t], j) => (
                      <p
                        key={t}
                        className={cn(
                          "transition-[opacity,translate] duration-500 ease-(--ease-out)",
                          p >= j ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
                          who === "Ria" ? "text-white" : "text-white/65"
                        )}
                      >
                        <span className="text-white/45">{who}: </span>
                        {t}
                      </p>
                    ))}
                  </div>

                  {/* The checklist */}
                  <ul className="flex flex-col gap-1.5 border-t border-white/10 pt-3">
                    {x.checks.map(([check, ok], j) => {
                      const ticked = p >= 2 + j
                      return (
                        <li key={check} className={cn("flex items-start gap-2 transition-colors duration-300", ticked ? "text-white/90" : "text-white/40")}>
                          <span className="mt-[3px] grid size-3.5 shrink-0 place-items-center">
                            {ticked ? (
                              ok ? (
                                <CheckIcon weight="bold" className={cn("size-3.5", GREEN)} />
                              ) : (
                                <XIcon weight="bold" className={cn("size-3.5", AMBER)} />
                              )
                            ) : (
                              <span className="size-2.5 rounded-full border border-white/25" />
                            )}
                          </span>
                          {check}
                        </li>
                      )
                    })}
                  </ul>

                  <span
                    className={cn(
                      "self-start rounded-full px-2 py-0.5 text-[11px] transition-[opacity,translate] duration-500",
                      x.passed ? "bg-[oklch(0.74_0.16_150/0.2)] text-[oklch(0.85_0.12_150)]" : "bg-[oklch(0.8_0.14_70/0.18)] text-[oklch(0.88_0.1_70)]",
                      done ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                    )}
                  >
                    {x.outcome}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Below lg: the callers as a list */}
        <ol className="mt-8 flex flex-col gap-3 lg:hidden">
          {CALLERS.map((x) => (
            <li key={x.id} className="flex flex-col gap-1.5 rounded-xl bg-[oklch(0.23_0.005_260)] p-4 text-small text-[oklch(0.95_0_0)]">
              <span className="flex items-center justify-between gap-3 font-mono text-label text-white/55">
                {x.persona}
                <span className={x.passed ? "text-[oklch(0.85_0.12_150)]" : "text-[oklch(0.88_0.1_70)]"}>{x.outcome}</span>
              </span>
              <span>{x.scenario}</span>
              <span className="text-white/60">{x.checks.map(([check, ok]) => `${check} ${ok ? "✓" : "✕"}`).join(" · ")}</span>
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
