"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { ArrowDownLeftIcon, ArrowUpRightIcon, CheckIcon, PhoneIcon } from "@phosphor-icons/react"

import { HERO_CARD, HeroConsole } from "@/components/product-page/hero-console"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * The /platform/integrations hero visual, two cards floating on the lake
 * backdrop. Left, Maya Patel's contact record in the CRM, the place your team
 * works: as the call's data lands, its fields change from the old value to
 * the new one (stage, promise date, next action, summary, last contact).
 * Right, the call's traffic in both directions: what the Hooman read from
 * your systems during the call, then what it wrote back after it ended, each
 * with the system and timing. On view the reads land, the call ends, the
 * writes land and the record updates to match, then it holds. Reduced
 * motion: the final state. Sample data (Halden Energy); systems shown as
 * letter tiles, field names and timings illustrative.
 */

const DESIGN_H = 480
const BEAT_MS = 1000
const ROW_H = 46

type Sys = "zoho" | "cal" | "desk" | "db"
const SYS: Record<Sys, { tile: string; hue: number; name: string }> = {
  zoho: { tile: "Z", hue: 25, name: "Zoho CRM" },
  cal: { tile: "G", hue: 245, name: "Google Calendar" },
  desk: { tile: "F", hue: 150, name: "Freshdesk" },
  db: { tile: "D", hue: 295, name: "Your database" },
}

/** The call's traffic, in order. `step` is when the row lands. */
const READS: { step: number; at: string; sys: Sys; what: string; value: string }[] = [
  { step: 0, at: "0:08", sys: "zoho", what: "Looked up the balance", value: "$86.40" },
  { step: 1, at: "0:31", sys: "db", what: "Found the last payment", value: "2 Feb" },
  { step: 2, at: "1:12", sys: "cal", what: "Checked free callback slots", value: "Thu 10:30" },
]
const ENDED = 3
const WRITES: { step: number; sys: Sys; what: string; ms: string }[] = [
  { step: 4, sys: "zoho", what: "Stage, promise date, summary", ms: "120 ms" },
  { step: 5, sys: "cal", what: "Callback booked · Thu 10:30", ms: "140 ms" },
  { step: 6, sys: "desk", what: "Ticket closed with the summary", ms: "96 ms" },
  { step: 7, sys: "db", what: "Row added with transcript", ms: "42 ms" },
]
const LAST = 7

/** The record's fields: the old value until `step`, then the new one. */
const FIELDS: { label: string; from: string; to: string; step: number }[] = [
  { label: "Stage", from: "Overdue", to: "Promise to pay", step: 4 },
  { label: "Promise date", from: "—", to: "4 March 2026", step: 4 },
  { label: "Amount", from: "$86.40", to: "$86.40", step: 99 },
  { label: "Next action", from: "—", to: "Callback · Thu 10:30", step: 5 },
  { label: "Last contact", from: "2 March · Email", to: "Today 14:02 · Phone", step: ENDED },
  { label: "Call summary", from: "—", to: "Agreed to pay after payday.", step: 4 },
]

function Tile({ sys }: { sys: Sys }) {
  const t = SYS[sys]
  return (
    <span
      className="grid size-7 shrink-0 place-items-center rounded-md font-mono text-[11px]"
      style={{ background: `oklch(0.4 0.06 ${t.hue} / 0.45)`, color: `oklch(0.9 0.06 ${t.hue})` }}
    >
      {t.tile}
    </span>
  )
}

function Dir({ write }: { write?: boolean }) {
  return (
    <span
      className={cn(
        "flex w-[62px] shrink-0 items-center justify-center gap-1 rounded-full border py-0.5 text-[11px]",
        write ? "border-(--ui-live)/40 bg-(--ui-live)/12 text-(--ui-text)" : "border-(--ui-line) text-(--ui-muted)"
      )}
    >
      {write ? <ArrowUpRightIcon weight="bold" className="size-3 text-(--ui-live)" /> : <ArrowDownLeftIcon weight="bold" className="size-3" />}
      {write ? "Write" : "Read"}
    </span>
  )
}

export function IntegrationsConsole() {
  const box = useRef<HTMLDivElement>(null)
  const seen = useInView(box, { amount: 0.3, once: true })
  const reduce = usePrefersReducedMotion()
  const [beat, setBeat] = useState(-1)

  useEffect(() => {
    if (!seen || reduce || beat >= LAST) return
    const id = setTimeout(() => setBeat((x) => x + 1), beat < 0 ? 700 : BEAT_MS)
    return () => clearTimeout(id)
  }, [seen, reduce, beat])

  const b = reduce ? LAST : beat
  const ended = b >= ENDED
  const show = (step: number) => cn(!reduce && "transition-[opacity,translate] duration-500", b >= step ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0")

  return (
    <HeroConsole image="/art/product/integrations-backdrop.webp" designH={DESIGN_H}>
      {/* Transparent stage: ui-dark only for its tokens, so the backdrop shows through. */}
      <div ref={box} aria-hidden className="ui-dark relative size-full" style={{ background: "transparent" }}>
        {/* The record, where your team works */}
        <div className={cn(HERO_CARD, "absolute top-0 left-10 flex h-[480px] w-[420px] flex-col")}>
          <div className="flex h-11 shrink-0 items-center gap-2.5 border-b border-(--ui-line) px-4">
            <Tile sys="zoho" />
            <span>Zoho CRM</span>
            <span className="text-(--ui-muted)">· Contacts</span>
            <span className={cn("ml-auto flex items-center gap-1.5 text-[12px] text-(--ui-muted) transition-opacity duration-500", b >= 4 ? "opacity-100" : "opacity-0")}>
              <span className="size-1.5 rounded-full bg-(--ui-live)" />
              Updated just now
            </span>
          </div>
          <div className="flex items-center gap-3 px-5 pt-5 pb-4">
            <span className="grid size-11 place-items-center rounded-full bg-(--ui-raised) text-[14px]">MP</span>
            <span className="flex flex-col leading-tight">
              <span className="text-[17px]">Maya Patel</span>
              <span className="text-[12px] text-(--ui-muted)">Halden Energy · account 4471</span>
            </span>
          </div>
          <div className="flex flex-col border-t border-(--ui-line)">
            {FIELDS.map((f) => {
              const changed = b >= f.step
              const fresh = changed && b < f.step + 2 && !reduce
              return (
                <div key={f.label} className="grid grid-cols-[120px_1fr] items-start gap-3 border-b border-(--ui-line) px-5 py-3">
                  <span className="text-[12px] text-(--ui-muted)">{f.label}</span>
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span
                      className={cn(
                        "-mx-1.5 w-fit rounded px-1.5 transition-colors duration-700",
                        fresh ? "bg-(--ui-live)/20" : "bg-transparent",
                        f.label === "Stage" && changed && "text-[oklch(0.85_0.12_150)]"
                      )}
                    >
                      {changed ? f.to : f.from}
                    </span>
                    {changed && f.from !== f.to && f.from !== "—" && <span className="text-[11px] text-(--ui-muted) line-through decoration-white/30">{f.from}</span>}
                  </span>
                </div>
              )
            })}
          </div>
          <div className="mt-auto flex items-center gap-2 px-5 py-3 text-[12px] text-(--ui-muted)">
            <CheckIcon weight="bold" className={cn("size-3 text-(--ui-live) transition-opacity", b >= 4 ? "opacity-100" : "opacity-0")} />
            Written by Ria from call_7Q2 · no manual entry
          </div>
        </div>

        {/* Both directions: reads during the call, writes after it */}
        <div className={cn(HERO_CARD, "absolute top-0 right-10 flex h-[480px] w-[580px] flex-col")}>
          <div className="flex h-11 shrink-0 items-center justify-between border-b border-(--ui-line) px-4">
            <span className="flex items-center gap-2">
              <PhoneIcon className="size-4 text-(--ui-muted)" />
              Call with Maya Patel
            </span>
            <span className="flex items-center gap-1.5 text-[12px] text-(--ui-muted)">
              <span className={cn("size-1.5 rounded-full", ended ? "bg-(--ui-muted)" : "bg-(--ui-live) motion-safe:animate-pulse")} />
              {ended ? "Ended · 3:42" : b < 0 ? "Ringing" : "Live"}
            </span>
          </div>

          <div className="flex flex-col px-4 pt-3">
            <span className="pb-1 font-mono text-[10.5px] tracking-wide text-(--ui-muted) uppercase">During the call · reads</span>
            {READS.map((r) => (
              <div key={r.what} className={cn("flex items-center gap-3", show(r.step))} style={{ height: ROW_H }}>
                <span className="w-9 shrink-0 font-mono text-[11px] text-(--ui-muted) tabular-nums">{r.at}</span>
                <Dir />
                <Tile sys={r.sys} />
                <span className="flex min-w-0 flex-col leading-tight">
                  <span className="truncate text-[12.5px]">{r.what}</span>
                  <span className="text-[11px] text-(--ui-muted)">{SYS[r.sys].name}</span>
                </span>
                <span className="ml-auto shrink-0 font-mono text-[12px]">{r.value}</span>
              </div>
            ))}

            <div className={cn("my-2 flex items-center gap-3 text-[11.5px] text-(--ui-muted)", show(ENDED))}>
              <span className="h-px flex-1 bg-(--ui-line)" />
              Call ended · 3:42
              <span className="h-px flex-1 bg-(--ui-line)" />
            </div>

            <span className={cn("pb-1 font-mono text-[10.5px] tracking-wide text-(--ui-muted) uppercase", show(ENDED))}>After the call · writes</span>
            {WRITES.map((w) => (
              <div key={w.what} className={cn("flex items-center gap-3", show(w.step))} style={{ height: ROW_H }}>
                <span className="w-9 shrink-0" />
                <Dir write />
                <Tile sys={w.sys} />
                <span className="flex min-w-0 flex-col leading-tight">
                  <span className="truncate text-[12.5px]">{w.what}</span>
                  <span className="text-[11px] text-(--ui-muted)">{SYS[w.sys].name}</span>
                </span>
                <span className="ml-auto flex shrink-0 items-center gap-1.5 font-mono text-[11.5px] text-(--ui-muted) tabular-nums">
                  <CheckIcon weight="bold" className="size-3 text-(--ui-live)" />
                  {w.ms}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </HeroConsole>
  )
}
