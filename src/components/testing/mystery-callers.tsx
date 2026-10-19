"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { CheckIcon, UserIcon, XIcon } from "@phosphor-icons/react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { UiCard, UiLabel, UiPill, UiWindow } from "@/components/product/ui-window"
import { testingPage as c } from "@/content/pages/testing"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * "Simulated customers talk to your Hooman before real ones do"
 * (simulations and test suites in one). Where the hero shows the whole
 * suite, this shows depth: one simulated conversation, in the product UI.
 * Three columns: the persona you created, the conversation as it plays,
 * and its scorecard (the checklist, then the expected outcome) filling in.
 * It fails on the turn where Ria interrupts the card number, the same
 * turn Spot checks & replay fixes further down. Plays once when on screen;
 * reduced motion shows the finished scorecard. Sample data.
 */

const TURNS: [string, string, boolean?][] = [
  ["Ria", "Hi, this is Ria from Halden Energy. Am I speaking with Maya?"],
  ["Customer", "Yes, it's Maya. I want to pay my bill."],
  ["Ria", "Thanks, Maya. Your bill is $62.10. Shall I take your card number?"],
  ["Customer", "Sure. It's four, two, seven… one…"],
  ["Ria", "Thanks. And the expiry date?", true],
]
const CHECKS: { label: string; pass: boolean; at: number; note?: string }[] = [
  { label: "Confirms who it's talking to", pass: true, at: 1 },
  { label: "Reads the correct amount", pass: true, at: 3 },
  { label: "Waits for every digit", pass: false, at: 5, note: "Interrupted at turn 5" },
]
const STEP_MS = 1100
const LAST = TURNS.length + 1

export function MysteryCallers() {
  const { label, title, line, rows } = c.callers
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { amount: 0.35, once: true })
  const reduce = usePrefersReducedMotion()
  const [step, setStep] = useState(0)
  const s = reduce ? LAST : step

  useEffect(() => {
    if (!seen || reduce || step >= LAST) return
    const t = setTimeout(() => setStep((x) => x + 1), STEP_MS)
    return () => clearTimeout(t)
  }, [seen, reduce, step])

  const done = s >= LAST
  return (
    <Section id="testing-callers">
      <Container>
        <div className="flex max-w-[48rem] flex-col gap-3">
          <span className="font-mono text-label text-ink-muted">{label}</span>
          <h2 className="text-h2 font-normal">{title}</h2>
          <p className="text-body text-ink-secondary">{line}</p>
        </div>

        <div ref={ref} className="mt-10">
          <UiWindow
            className="rounded-xl border border-black/10 dark:border-white/10 shadow-[0_40px_80px_-40px_oklch(0.2_0.02_260/0.45)] [&>div:first-child]:pr-4 [&>div:last-child]:pr-5 [&>div:last-child]:[mask-image:none]"
            title="Billing suite · Ria · v13 draft"
            aside={<UiPill live={!done}>{done ? "1 to fix" : "Simulating"}</UiPill>}
          >
            <div className="grid gap-4 lg:grid-cols-[1fr_1.5fr_1.1fr]">
              {/* The persona */}
              <UiCard>
                <UiLabel>Persona</UiLabel>
                <span className="flex items-center gap-2.5">
                  <span className="grid size-9 place-items-center rounded-full bg-(--ui-raised)">
                    <UserIcon className="size-4" />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-[13.5px]">Reads numbers slowly</span>
                    <span className="text-[11px] text-(--ui-muted)">1 of 12 personas in the suite</span>
                  </span>
                </span>
                <dl className="mt-1 flex flex-col gap-1.5 text-[12px]">
                  {[
                    ["Behaviour", "Patient, pauses between digits"],
                    ["Goal", "Pay the March bill by card"],
                    ["Data", "Maya Patel · $62.10"],
                  ].map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[4.5rem_1fr] gap-2">
                      <dt className="text-(--ui-muted)">{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </UiCard>

              {/* The conversation */}
              <UiCard className="gap-2">
                <UiLabel>Conversation</UiLabel>
                {TURNS.map(([who, text, flag], i) => (
                  <div key={i} className={cn("grid grid-cols-[2rem_4.5rem_1fr] items-baseline gap-2 text-[12.5px] transition-opacity duration-500", s > i ? "opacity-100" : "opacity-0")}>
                    <span className="font-mono text-[10.5px] text-(--ui-muted)">T{i + 1}</span>
                    <span className="text-[11px] text-(--ui-muted)">{who}</span>
                    <span className={cn(flag && done && "underline decoration-(--fail) decoration-wavy underline-offset-4")}>{text}</span>
                  </div>
                ))}
              </UiCard>

              {/* The scorecard */}
              <UiCard className="gap-2">
                <UiLabel>Scorecard</UiLabel>
                {CHECKS.map((ch) => {
                  const shown = s > ch.at
                  return (
                    <span key={ch.label} className="flex items-start gap-2 text-[12.5px]">
                      <span className={cn("mt-0.5 grid size-4 shrink-0 place-items-center rounded-full", !shown ? "bg-(--ui-raised)" : ch.pass ? "bg-(--ok)/18" : "bg-(--fail)/18")}>
                        {shown && (ch.pass ? <CheckIcon weight="bold" className="size-2.5 text-(--ui-live)" /> : <XIcon weight="bold" className="size-2.5 text-(--fail-fg)" />)}
                      </span>
                      <span className="flex flex-col leading-snug">
                        <span className={cn(!shown && "text-(--ui-muted)")}>{ch.label}</span>
                        {shown && ch.note && <span className="text-[11px] text-(--fail-fg)">{ch.note}</span>}
                      </span>
                    </span>
                  )
                })}
                <div className="mt-2 flex flex-col gap-1 border-t border-(--ui-line) pt-3 text-[12.5px]">
                  <span className="text-[11px] text-(--ui-muted)">Expected outcome</span>
                  <span className="flex items-center justify-between gap-2">
                    Payment taken
                    <span className={cn("text-[11px]", done ? "text-(--fail-fg)" : "text-(--ui-muted)")}>{done ? "Not reached" : "Waiting"}</span>
                  </span>
                </div>
              </UiCard>
            </div>
          </UiWindow>
        </div>

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
