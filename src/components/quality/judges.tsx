"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { CheckIcon, CodeIcon, ListChecksIcon, SparkleIcon, WaveformIcon, XIcon, type Icon } from "@phosphor-icons/react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { qualityPage as c } from "@/content/pages/quality"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * "Advanced metrics" with four judges, full width on the console's charcoal
 * canvas: the four kinds of judge side by side (LLM, classifier, code and
 * audio; human review has its own section), each with what it's for, an example rule and a tiny sample
 * result from Maya Patel's call in the hero. On view the cards' results
 * land one by one, then the scorecard they add up to; then it holds. Below
 * lg: a list. Reduced motion: finished. Sample data (Halden Energy).
 */

type Result = { tone: "pass" | "fail" | "pending"; text: string }
type Judge = { id: string; icon: Icon; kind: string; forWhat: string; example: React.ReactNode; reads: string; result: Result }

const MONO = "rounded-md bg-black/25 px-2.5 py-2 font-mono text-[11px] leading-relaxed text-(--ui-text)"

const JUDGES: Judge[] = [
  {
    id: "llm",
    icon: SparkleIcon,
    kind: "LLM judge",
    forWhat: "For nuance",
    example: <span>&ldquo;Was Ria polite, and did she stay within the billing policy?&rdquo;</span>,
    reads: "Transcript, prompt, tool data, audio",
    result: { tone: "pass", text: "Pass" },
  },
  {
    id: "classifier",
    icon: ListChecksIcon,
    kind: "Classifier judge",
    forWhat: "For consistency",
    example: <span>Customer sentiment: worse, same or improved?</span>,
    reads: "Same answer format, every call",
    result: { tone: "pass", text: "Improved · 0.92" },
  },
  {
    id: "code",
    icon: CodeIcon,
    kind: "Code judge",
    forWhat: "For hard rules",
    example: <span className={cn(MONO, "block")}>return said(DISCLOSURE)</span>,
    reads: "No AI involved",
    result: { tone: "fail", text: "Fail · turn 4" },
  },
  {
    id: "audio",
    icon: WaveformIcon,
    kind: "Audio judge",
    forWhat: "For how it sounded",
    example: <span>Echo, loudness, background voices and talk-over.</span>,
    reads: "The recording itself",
    result: { tone: "pass", text: "Pass" },
  },
]
const LAST = JUDGES.length + 1 // the scorecard total lands after the four results
const BEAT_MS = 650

const TONE = {
  pass: "bg-(--ok)/18 text-(--ok-fg)",
  fail: "bg-(--fail)/18 text-(--fail-fg)",
  pending: "bg-(--warn)/18 text-(--warn-fg)",
}

function ResultPill({ r }: { r: Result }) {
  return (
    <span className={cn("flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-[11px]", TONE[r.tone])}>
      {r.tone === "pass" && <CheckIcon weight="bold" className="size-3" />}
      {r.tone === "fail" && <XIcon weight="bold" className="size-3" />}
      {r.tone === "pending" && <span className="size-1.5 rounded-full bg-current" />}
      {r.text}
    </span>
  )
}

export function Judges() {
  const { label, title, line, rows } = c.judges
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { amount: 0.35, once: true })
  const reduce = usePrefersReducedMotion()
  const [beat, setBeat] = useState(-1)

  useEffect(() => {
    if (!seen || reduce || beat >= LAST) return
    const t = setTimeout(() => setBeat((b) => b + 1), beat < 0 ? 400 : BEAT_MS)
    return () => clearTimeout(t)
  }, [seen, reduce, beat])

  const b = reduce ? LAST : beat

  return (
    <Section id="quality-judges" className="ui-scope">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <span className="font-mono text-label text-ink-muted">{label}</span>
          <h2 className="text-h2 font-normal">{title}</h2>
          <p className="text-body text-ink-secondary">{line}</p>
        </div>

        {/* lg+: the four judges on the charcoal canvas, adding up to one scorecard */}
        <div
          ref={ref}
          aria-hidden
          className="relative mt-10 hidden overflow-hidden rounded-xl border border-black/10 dark:border-(--ui-line) bg-(--ui-panel) bg-[radial-gradient(circle,oklch(1_0_0/0.09)_1px,transparent_1px)] [background-size:18px_18px] p-8 text-[12.5px] leading-[1.5] text-(--ui-text) shadow-[0_40px_80px_-40px_oklch(0.2_0.02_260/0.45)] lg:block xl:p-10"
        >
          <div className="mb-5 flex items-center gap-3 font-mono text-[10.5px] text-(--ui-muted)/60">
            <span>Scorecard · Billing calls</span>
            <span>·</span>
            <span>Maya Patel · today, 18:42</span>
          </div>

          <ol className="grid grid-cols-4 gap-3">
            {JUDGES.map((j, i) => {
              const landed = b > i
              return (
                <li
                  key={j.id}
                  className={cn(
                    "flex flex-col gap-3 rounded-xl border bg-(--ui-raised) p-4 transition-[border-color,opacity] duration-500 ease-(--ease-out)",
                    landed ? "border-white/20" : "border-(--ui-line)",
                    b >= 0 && !landed && b !== i && "opacity-60"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <j.icon weight="fill" className="size-4 shrink-0 text-(--data)" />
                    <span className="text-[13px]">{j.kind}</span>
                  </span>
                  <span className="font-mono text-[10.5px] tracking-wide text-(--ui-muted) uppercase">{j.forWhat}</span>
                  <div className="min-h-[4.5rem] text-(--ui-text)">{j.example}</div>
                  <span className="text-[11px] text-(--ui-muted)/60">{j.reads}</span>
                  <div className="mt-auto border-t border-(--ui-line) pt-3">
                    <span className={cn("block transition-[opacity,translate] duration-500 ease-(--ease-out)", landed ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0")}>
                      <ResultPill r={j.result} />
                    </span>
                  </div>
                </li>
              )
            })}
          </ol>

          {/* What they add up to */}
          <div
            className={cn(
              "mt-3 flex items-center gap-4 rounded-xl border border-white/15 bg-(--ui-raised) px-4 py-3 transition-opacity duration-500",
              b >= LAST ? "opacity-100" : "opacity-40"
            )}
          >
            <span className="text-[13px]">One scorecard</span>
            <span className="flex items-center gap-1.5 text-(--ui-muted)">
              <span className="text-(--ui-text) tabular-nums">3</span> pass
              <span className="text-(--ui-muted)/60">·</span>
              <span className="text-(--ui-text) tabular-nums">1</span> fail
            </span>
            <span className="ml-auto flex items-center gap-1.5 text-(--ui-muted)">
              Fault finder points to
              <span className="rounded bg-(--fail)/18 px-1.5 font-mono text-[11px] text-(--fail-fg)">turn 4</span>
            </span>
          </div>
        </div>

        {/* Below lg: the judges as a list */}
        <ol className="mt-8 flex flex-col gap-3 lg:hidden">
          {JUDGES.map((j) => (
            <li key={j.id} className="flex flex-col gap-2 rounded-xl bg-(--ui-panel) p-4 text-small text-(--ui-text)">
              <span className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2">
                  <j.icon weight="fill" className="size-4 shrink-0 text-(--data)" />
                  {j.kind}
                </span>
                <span className="font-mono text-label text-(--ui-muted)">{j.forWhat}</span>
              </span>
              <span className="text-(--ui-muted)">{j.example}</span>
              <ResultPill r={j.result} />
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
