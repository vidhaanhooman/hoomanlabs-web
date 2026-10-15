"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { CheckIcon, ClipboardTextIcon, PhoneIncomingIcon, PlayIcon, WarningIcon, XIcon } from "@phosphor-icons/react"

import { CONSOLE, HeroConsole } from "@/components/product-page/hero-console"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * The /platform/quality hero visual, two panes on the landscape backdrop.
 * Left, one call's transcript: Maya Patel calls Halden Energy's billing line
 * and agrees a payment date with Ria. Right, the call's scorecard with five
 * judges, one of each kind. On view the judges resolve one by one; when the
 * code judge fails ("Disclosure read"), the turn where the disclosure should
 * have been read lights up in the transcript with a fault marker (the fault
 * finder). The team review stays pending in the queue. Plays once, then
 * holds. Reduced motion: finished. Sample data (Halden Energy).
 */

const DESIGN_H = 660
const STEP_MS = 900
/** Beat at which each judge resolves; the code judge (index 2) fails. */
const FAULT_STEP = 2
const LAST = 4
const FAULT_TURN = 4

const FAIL = "text-[oklch(0.72_0.17_25)]"
const AMBER = "text-[oklch(0.82_0.13_80)]"
const LABEL = "font-mono text-[10.5px] tracking-wide text-(--ui-muted) uppercase"

const TURNS: { who: "Maya" | "Ria"; t: string; at: string }[] = [
  { who: "Maya", at: "0:04", t: "Hi, I got a reminder about my bill, but I can't pay it until payday." },
  { who: "Ria", at: "0:11", t: "Thanks for calling, Maya. Your March bill is $86.40. When is payday?" },
  { who: "Maya", at: "0:19", t: "The 3rd. Could I pay it on the 4th?" },
  { who: "Ria", at: "0:24", t: "Yes, that's fine. I've set the 4th as your payment date." },
  { who: "Maya", at: "0:31", t: "Great. Will I get a reminder?" },
  { who: "Ria", at: "0:35", t: "I'll text you a confirmation now, and call the day before." },
  { who: "Maya", at: "0:42", t: "Perfect, thank you." },
  { who: "Ria", at: "0:45", t: "You're welcome, Maya. Have a good evening." },
]

type Judge = { kind: string; rule: string; pass: boolean | null; detail: string; turn?: number }

const JUDGES: Judge[] = [
  { kind: "LLM judge", rule: "Polite and on-policy", pass: true, detail: "Courteous throughout; stayed on billing." },
  { kind: "Classifier", rule: "Customer sentiment: improved", pass: true, detail: "Worried → relieved · 0.92 confidence" },
  { kind: "Code judge", rule: "Disclosure read", pass: false, detail: "Not heard before the date was agreed.", turn: FAULT_TURN },
  { kind: "Audio judge", rule: "No talk-over", pass: true, detail: "Stopped cleanly when cut in" },
  { kind: "Team review", rule: "Pending", pass: null, detail: "In the review queue" },
]

export function QualityConsole() {
  const box = useRef<HTMLDivElement>(null)
  const seen = useInView(box, { amount: 0.3, once: true })
  const reduce = usePrefersReducedMotion()
  const [step, setStep] = useState(-1)

  useEffect(() => {
    if (!seen || reduce || step >= LAST) return
    const t = setTimeout(() => setStep((s) => s + 1), step < 0 ? 800 : STEP_MS)
    return () => clearTimeout(t)
  }, [seen, reduce, step])

  const s = reduce ? LAST : step
  const faulted = s >= FAULT_STEP
  const done = s >= LAST

  return (
    <HeroConsole image="/art/product/ai-qa-backdrop.webp" designH={DESIGN_H}>
      <div ref={box} aria-hidden className={CONSOLE}>
        {/* Title bar */}
        <div className="flex h-11 shrink-0 items-center gap-3 border-b border-(--ui-line) px-4 text-(--ui-muted)">
          <span className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-2.5 rounded-full bg-white/10" />
            ))}
          </span>
          <span className="ml-2">Conversations</span>
          <span>/</span>
          <span className="text-(--ui-text)">Maya Patel</span>
          <span className="flex items-center gap-1.5 rounded-full bg-(--ui-raised) px-2.5 py-0.5 text-[12px]">
            <PhoneIncomingIcon className="size-3" />
            Billing line · Ria
          </span>
          <span className="ml-auto text-[12px]">Today, 18:42</span>
          <span className="flex items-center gap-1.5 rounded-md border border-(--ui-line) px-3 py-1 text-[12px] text-(--ui-text)">
            <PlayIcon weight="fill" className="size-3" />
            Recording 0:48
          </span>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[1fr_330px]">
          {/* The transcript */}
          <div className="flex min-h-0 min-w-0 flex-col overflow-hidden border-r border-(--ui-line) bg-(--ui-bg)">
            {/* The call's turns as a strip, the faulty one marked */}
            <div className="flex h-11 shrink-0 items-center gap-3 border-b border-(--ui-line) px-5">
              <span className={LABEL}>Transcript</span>
              <span className="flex flex-1 items-center gap-1">
                {TURNS.map((t, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition-colors duration-500",
                      faulted && i + 1 === FAULT_TURN ? "bg-[oklch(0.72_0.17_25)]" : t.who === "Ria" ? "bg-white/30" : "bg-white/12"
                    )}
                  />
                ))}
              </span>
              <span className="text-[12px] text-(--ui-muted) tabular-nums">8 turns</span>
            </div>

            <div className="flex flex-col gap-2 px-6 py-4">
              {TURNS.map((t, i) => {
                const n = i + 1
                const fault = faulted && n === FAULT_TURN
                const ria = t.who === "Ria"
                return (
                  <div key={n} className={cn("relative flex gap-3", ria && "flex-row-reverse")}>
                    <span className="w-6 shrink-0 pt-2 text-center font-mono text-[10.5px] text-(--ui-muted) tabular-nums">{n}</span>
                    <div
                      className={cn(
                        "flex max-w-[68%] flex-col rounded-lg border px-3.5 py-1.5 transition-[border-color,background-color,box-shadow] duration-500",
                        ria ? "bg-(--ui-raised)" : "bg-(--ui-panel)",
                        fault ? "border-[oklch(0.72_0.17_25/0.7)] bg-[oklch(0.72_0.17_25/0.1)] shadow-[0_0_0_3px_oklch(0.72_0.17_25/0.12)]" : "border-(--ui-line)"
                      )}
                    >
                      <span className="flex items-center gap-2 text-[10.5px] leading-[1.6] text-(--ui-muted)">
                        {t.who}
                        <span className="font-mono text-[10.5px] tabular-nums">{t.at}</span>
                      </span>
                      <span className="text-[13px]">{t.t}</span>
                    </div>
                    {/* Fault finder: the turn behind the failed judge */}
                    {n === FAULT_TURN && (
                      <span
                        className={cn(
                          "flex items-center gap-1.5 self-center rounded-full bg-[oklch(0.72_0.17_25/0.18)] px-2.5 py-1 text-[11px] whitespace-nowrap text-[oklch(0.85_0.1_25)] transition-[opacity,translate] duration-500",
                          fault ? "translate-x-0 opacity-100" : "translate-x-1 opacity-0"
                        )}
                      >
                        <WarningIcon weight="fill" className="size-3" />
                        Fault · turn {FAULT_TURN}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>

            <p
              className={cn(
                "mx-6 mt-auto mb-4 flex items-center gap-2 rounded-md border border-(--ui-line) bg-(--ui-panel) px-3.5 py-2.5 text-[12px] text-(--ui-muted) transition-opacity duration-500",
                faulted ? "opacity-100" : "opacity-0"
              )}
            >
              <XIcon weight="bold" className={cn("size-3 shrink-0", FAIL)} />
              Expected at turn {FAULT_TURN}: the payment-date disclosure. Ria planned it, but Maya cut in first.
            </p>
          </div>

          {/* The scorecard */}
          <div className="flex min-h-0 min-w-0 flex-col">
            <div className="flex h-11 shrink-0 items-center gap-2 border-b border-(--ui-line) px-4">
              <ClipboardTextIcon className="size-4 text-(--ui-muted)" />
              <span>Scorecard · Billing calls</span>
              <span className="ml-auto flex items-center gap-1.5 text-[12px] text-(--ui-muted)">
                <span className={cn("size-1.5 rounded-full", done ? "bg-(--ui-muted)" : "bg-(--ui-live)", s >= 0 && !done && "animate-pulse")} />
                {done ? "Scored" : s < 0 ? "Queued" : "Scoring"}
              </span>
            </div>

            <div className="flex flex-col gap-2 p-3">
              {JUDGES.map((j, i) => {
                const resolved = s >= i
                const running = s === i - 1 && seen && !done
                const fail = resolved && j.pass === false
                return (
                  <div
                    key={j.kind}
                    className={cn(
                      "flex flex-col gap-1 rounded-lg border bg-(--ui-panel) px-3.5 py-2.5 transition-[border-color,opacity] duration-500",
                      fail ? "border-[oklch(0.72_0.17_25/0.55)]" : "border-(--ui-line)",
                      !resolved && !running && "opacity-55"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className={LABEL}>{j.kind}</span>
                      <span className="ml-auto flex items-center gap-1 text-[11.5px]">
                        {!resolved ? (
                          running ? (
                            <>
                              <span className="size-1.5 animate-pulse rounded-full bg-(--ui-live)" />
                              <span className="text-(--ui-muted)">Scoring</span>
                            </>
                          ) : (
                            <span className="text-(--ui-muted)">Queued</span>
                          )
                        ) : j.pass === true ? (
                          <span className="flex items-center gap-1 text-(--ui-live)">
                            <CheckIcon weight="bold" className="size-3" />
                            Pass
                          </span>
                        ) : j.pass === false ? (
                          <span className={cn("flex items-center gap-1", FAIL)}>
                            <XIcon weight="bold" className="size-3" />
                            Fail
                          </span>
                        ) : (
                          <span className={cn("flex items-center gap-1.5", AMBER)}>
                            <span className="size-1.5 rounded-full bg-current" />
                            Pending
                          </span>
                        )}
                      </span>
                    </span>
                    <span className="text-[13px]">{j.rule}</span>
                    <span className={cn("flex items-center gap-2 text-[11.5px] text-(--ui-muted) transition-opacity duration-500", resolved ? "opacity-100" : "opacity-0")}>
                      <span className="min-w-0 truncate">{j.detail}</span>
                      {j.turn && <span className="ml-auto shrink-0 rounded bg-[oklch(0.72_0.17_25/0.18)] px-1.5 font-mono text-[10.5px] text-[oklch(0.85_0.1_25)]">turn {j.turn}</span>}
                    </span>
                  </div>
                )
              })}
            </div>

            <div
              className={cn(
                "mt-auto flex items-center gap-2 border-t border-(--ui-line) px-4 py-3 text-[12px] text-(--ui-muted) transition-opacity duration-500",
                done ? "opacity-100" : "opacity-0"
              )}
            >
              <span className="text-(--ui-text) tabular-nums">Score 3/4</span>
              · 1 issue · turn {FAULT_TURN}
              <span className="ml-auto">1 review pending</span>
            </div>
          </div>
        </div>
      </div>
    </HeroConsole>
  )
}
