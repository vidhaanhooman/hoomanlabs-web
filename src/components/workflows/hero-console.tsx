"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import {
  AlarmIcon,
  ChatTextIcon,
  CheckIcon,
  DatabaseIcon,
  GitBranchIcon,
  PhoneCallIcon,
  PhoneTransferIcon,
  PlayIcon,
  ReceiptIcon,
  SparkleIcon,
  type Icon,
} from "@phosphor-icons/react"

import { CONSOLE, HeroConsole } from "@/components/product-page/hero-console"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * The /platform/workflows hero visual, two panes on the landscape backdrop.
 * Left, the after_billing_call canvas as a real automation: the call ends,
 * an AI step reads it and pulls out what was agreed, a branch picks the path
 * from that outcome (the paths not taken stay dim and are marked skipped),
 * and the chosen path does the follow-up: update the CRM, confirm by SMS,
 * set a reminder call for the day before. Right, the run for Maya Patel:
 * the line from the call the AI acted on, what it understood, and each
 * action as it lands. Nobody wraps the call up by hand. Plays once on view,
 * then holds. Reduced motion: finished. Sample data (Halden Energy).
 */

const DESIGN_H = 640
const STEP_MS = 950
const LAST = 7

/* --- the canvas: one coordinate box (px) shared by the nodes and the SVG --- */
const CW = 740
const CH = 500

type Node = {
  id: string
  x: number
  y: number
  w: number
  h: number
  kind: string
  icon: Icon
  tint: string
  name: string
  sub: string
  took?: string
  run: number
  done: number
  /** a branch not taken: drawn dim, marked skipped once the branch decides */
  skip?: boolean
}

const AMBER = "text-[oklch(0.8_0.13_80)]"
const VIOLET = "text-[oklch(0.78_0.12_295)]"
const BLUE = "text-[oklch(0.8_0.1_245)]"

const NODES: Node[] = [
  { id: "trigger", x: 0, y: 215, w: 150, h: 70, kind: "Trigger", icon: PhoneCallIcon, tint: AMBER, name: "call.ended", sub: "Billing line · 3:42", took: "0.0s", run: 0, done: 0 },
  { id: "ai", x: 185, y: 196, w: 175, h: 108, kind: "AI step", icon: SparkleIcon, tint: VIOLET, name: "Understand the call", sub: "Outcome, date, amount", took: "1.1s", run: 1, done: 3 },
  { id: "branch", x: 395, y: 221, w: 125, h: 58, kind: "Branch", icon: GitBranchIcon, tint: VIOLET, name: "By outcome", sub: "", took: "0.0s", run: 3, done: 4 },
  { id: "paid", x: 565, y: 18, w: 175, h: 62, kind: "If paid", icon: ReceiptIcon, tint: BLUE, name: "send_receipt", sub: "Email · PDF", run: 99, done: 99, skip: true },
  { id: "crm", x: 565, y: 135, w: 175, h: 64, kind: "Action", icon: DatabaseIcon, tint: BLUE, name: "update_record", sub: "Zoho CRM · pay_by", took: "0.4s", run: 4, done: 5 },
  { id: "sms", x: 565, y: 218, w: 175, h: 64, kind: "Action", icon: ChatTextIcon, tint: BLUE, name: "send_SMS", sub: "Confirmation to Maya", took: "0.6s", run: 5, done: 6 },
  { id: "remind", x: 565, y: 301, w: 175, h: 64, kind: "Action", icon: AlarmIcon, tint: BLUE, name: "reminder_call", sub: "3 March, 10:00", took: "0.3s", run: 6, done: 7 },
  { id: "dispute", x: 565, y: 420, w: 175, h: 62, kind: "If dispute", icon: PhoneTransferIcon, tint: BLUE, name: "transfer_to_team", sub: "Billing team", run: 99, done: 99, skip: true },
]
const at = (id: string) => NODES.find((n) => n.id === id)!
const right = (n: Node) => [n.x + n.w, n.y + n.h / 2] as const
const left = (n: Node) => [n.x, n.y + n.h / 2] as const

function curve(a: readonly [number, number], b: readonly [number, number]) {
  const dx = Math.max(24, (b[0] - a[0]) / 2)
  return `M${a[0]} ${a[1]} C${a[0] + dx} ${a[1]}, ${b[0] - dx} ${b[1]}, ${b[0]} ${b[1]}`
}

/** Connectors, each with the step it fills on (skipped paths never fill). */
const EDGES: { d: string; on: number; skip?: boolean }[] = [
  { d: curve(right(at("trigger")), left(at("ai"))), on: 1 },
  { d: curve(right(at("ai")), left(at("branch"))), on: 3 },
  ...["crm", "sms", "remind"].map((id) => ({ d: curve(right(at("branch")), left(at(id))), on: 4 })),
  ...["paid", "dispute"].map((id) => ({ d: curve(right(at("branch")), left(at(id))), on: 99, skip: true })),
]

/* --- the run, in step with the canvas --- */
const UNDERSTOOD: [string, string][] = [
  ["Outcome", "Promise to pay"],
  ["Pay by", "4 March"],
  ["Amount", "$86.40"],
  ["Why", "Maya named a date, after payday"],
]
const LOG: { step: number; time: string; text: string }[] = [
  { step: 4, time: "14:02:12", text: "Branch · promise to pay" },
  { step: 5, time: "14:02:13", text: "Zoho CRM · pay_by set to 4 March" },
  { step: 6, time: "14:02:13", text: "SMS sent · confirmation" },
  { step: 7, time: "14:02:13", text: "Reminder call set · 3 March, 10:00" },
]

const LABEL = "font-mono text-[10.5px] tracking-wide text-(--ui-muted) uppercase"

export function WorkflowConsole() {
  const box = useRef<HTMLDivElement>(null)
  const seen = useInView(box, { amount: 0.3, once: true })
  const reduce = usePrefersReducedMotion()
  const [step, setStep] = useState(-1)

  useEffect(() => {
    if (!seen || reduce || step >= LAST) return
    const t = setTimeout(() => setStep((s) => s + 1), step < 0 ? 700 : STEP_MS)
    return () => clearTimeout(t)
  }, [seen, reduce, step])

  const s = reduce ? LAST : step
  const done = s >= LAST
  const decided = s >= 4

  return (
    <HeroConsole image="/art/product/workflows-backdrop.webp" designH={DESIGN_H}>
      <div ref={box} aria-hidden className={CONSOLE}>
        {/* Title bar */}
        <div className="flex h-11 shrink-0 items-center gap-3 border-b border-(--ui-line) px-4 text-(--ui-muted)">
          <span className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-2.5 rounded-full bg-white/10" />
            ))}
          </span>
          <span className="ml-2">Workflows</span>
          <span>/</span>
          <span className="font-mono text-[12.5px] text-(--ui-text)">after_billing_call</span>
          <span className="flex items-center gap-1.5 rounded-full bg-(--ui-raised) px-2.5 py-0.5 text-[12px]">
            <span className="size-1.5 rounded-full bg-(--ui-live)" />
            Live · runs after every billing call
          </span>
          <span className="ml-auto text-[12px]">
            Runs today <span className="text-(--ui-text) tabular-nums">1,284</span>
          </span>
          <span className="flex items-center gap-1.5 rounded-md border border-(--ui-line) px-3 py-1 text-[12px] text-(--ui-text)">
            <PlayIcon weight="fill" className="size-3" />
            Test run
          </span>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[1fr_330px]">
          {/* The canvas */}
          <div
            className="relative min-w-0 border-r border-(--ui-line) bg-(--ui-bg)"
            style={{ backgroundImage: "radial-gradient(oklch(1 0 0 / 0.09) 1px, transparent 1px)", backgroundSize: "16px 16px" }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: CW, height: CH }}>
              <svg className="absolute inset-0" width={CW} height={CH} viewBox={`0 0 ${CW} ${CH}`} fill="none">
                {EDGES.map((e, i) => (
                  <g key={i}>
                    <path d={e.d} stroke="oklch(1 0 0 / 0.14)" strokeWidth={1.5} strokeDasharray={e.skip ? "4 5" : undefined} />
                    {!e.skip && (
                      <path
                        d={e.d}
                        pathLength={1}
                        stroke="oklch(1 0 0 / 0.8)"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeDasharray="1 1"
                        strokeDashoffset={s >= e.on ? 0 : 1}
                        style={{ transition: reduce ? "none" : "stroke-dashoffset 700ms cubic-bezier(0.4, 0, 0.2, 1)" }}
                      />
                    )}
                  </g>
                ))}
              </svg>

              {/* The path the branch chose */}
              <span
                className={cn(
                  "absolute flex items-center gap-1.5 text-[11px] text-(--ui-muted) transition-opacity duration-500",
                  decided ? "opacity-100" : "opacity-0"
                )}
                style={{ left: 565, top: 112 }}
              >
                <span className="size-1.5 rounded-full bg-(--ui-live)" />
                If promise to pay
              </span>

              {NODES.map((n) => {
                const running = s >= n.run && s < n.done
                const ok = s >= n.done
                return (
                  <div
                    key={n.id}
                    className={cn(
                      "absolute flex flex-col justify-center gap-1 rounded-lg border bg-(--ui-panel) px-3 transition-[border-color,box-shadow,opacity] duration-500",
                      n.skip
                        ? cn("border-dashed border-(--ui-line)", decided ? "opacity-40" : "opacity-70")
                        : ok
                          ? "border-white/45"
                          : running
                            ? "border-white/70 shadow-[0_0_24px_-6px_oklch(1_0_0/0.35)]"
                            : "border-(--ui-line)"
                    )}
                    style={{ left: n.x, top: n.y, width: n.w, height: n.h }}
                  >
                    <span className="flex items-center gap-1.5 text-[11px] text-(--ui-muted)">
                      <n.icon weight="fill" className={cn("size-3.5", n.tint)} />
                      {n.kind}
                      <span className={cn("ml-auto flex items-center gap-1 transition-opacity duration-300", ok || running || (n.skip && decided) ? "opacity-100" : "opacity-0")}>
                        {n.skip ? (
                          "Skipped"
                        ) : ok ? (
                          <>
                            <CheckIcon weight="bold" className="size-3 text-(--ui-live)" />
                            <span className="tabular-nums">{n.took}</span>
                          </>
                        ) : (
                          <>
                            <span className="size-1.5 animate-pulse rounded-full bg-(--ui-live)" />
                            Running
                          </>
                        )}
                      </span>
                    </span>
                    <span className={cn("truncate", n.kind === "AI step" || n.kind === "Branch" ? "text-[13px]" : "font-mono text-[12.5px]")}>{n.name}</span>
                    {n.sub && <span className="truncate text-[11.5px] text-(--ui-muted)">{n.sub}</span>}
                    {/* What the AI step pulled out, inside the node */}
                    {n.id === "ai" && (
                      <span className={cn("flex flex-wrap gap-1 pt-0.5 transition-opacity duration-500", s >= 2 ? "opacity-100" : "opacity-0")}>
                        {["promise_to_pay", "4 Mar", "$86.40"].map((t) => (
                          <span key={t} className="rounded bg-[oklch(0.78_0.12_295/0.18)] px-1.5 font-mono text-[10.5px] text-[oklch(0.86_0.08_295)]">
                            {t}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* The run */}
          <div className="flex min-w-0 flex-col">
            <div className="flex h-11 shrink-0 items-center gap-2 border-b border-(--ui-line) px-4">
              <PlayIcon className="size-4 text-(--ui-muted)" />
              <span>Run · Maya Patel</span>
              <span className="ml-auto flex items-center gap-1.5 text-[12px] text-(--ui-muted)">
                <span className={cn("size-1.5 rounded-full", done ? "bg-(--ui-muted)" : "bg-(--ui-live)")} />
                {done ? "Done · 2.1s" : s < 0 ? "Waiting" : "Running"}
              </span>
            </div>

            <div className="flex flex-col gap-4 p-4">
              {/* The line from the call the AI acted on */}
              <div className="flex flex-col gap-2">
                <span className={LABEL}>From the call · 3:42</span>
                <p className="rounded-lg border border-(--ui-line) bg-(--ui-panel) px-3.5 py-2.5 text-[12.5px] leading-relaxed">
                  <span className="text-(--ui-muted)">Maya: </span>I get paid on the 3rd, so{" "}
                  <span className={cn("rounded px-0.5 transition-colors duration-500", s >= 1 ? "bg-[oklch(0.78_0.12_295/0.28)] text-white" : "")}>I&apos;ll pay the $86.40 on the 4th</span>.
                </p>
              </div>

              {/* What it understood */}
              <div className={cn("flex flex-col gap-2 transition-[opacity,translate] duration-500", s >= 2 ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0")}>
                <span className={cn(LABEL, "flex items-center gap-1.5")}>
                  <SparkleIcon weight="fill" className={cn("size-3", VIOLET)} />
                  AI understood
                </span>
                <div className="flex flex-col gap-1.5 rounded-lg border border-(--ui-line) bg-(--ui-panel) px-3.5 py-3 text-[12.5px]">
                  {UNDERSTOOD.map(([k, v]) => (
                    <span key={k} className="flex justify-between gap-3">
                      <span className="text-(--ui-muted)">{k}</span>
                      <span className="text-right">{v}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* What it did */}
              <div className="flex flex-col gap-2">
                <span className={cn(LABEL, "transition-opacity duration-500", decided ? "opacity-100" : "opacity-0")}>Then it did</span>
                {LOG.map((l) => (
                  <span
                    key={l.text}
                    className={cn("flex items-baseline gap-3 text-[12.5px] transition-[opacity,translate] duration-500", s >= l.step ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0")}
                  >
                    <CheckIcon weight="bold" className="size-3 shrink-0 translate-y-0.5 text-(--ui-live)" />
                    <span>{l.text}</span>
                    <span className="ml-auto shrink-0 font-mono text-[10.5px] text-(--ui-muted) tabular-nums">{l.time}</span>
                  </span>
                ))}
              </div>
            </div>

            <div
              className={cn(
                "mt-auto flex items-center gap-2 border-t border-(--ui-line) px-4 py-3 text-[12px] text-(--ui-muted) transition-opacity duration-500",
                done ? "opacity-100" : "opacity-0"
              )}
            >
              <CheckIcon weight="bold" className="size-3 text-(--ui-live)" />
              Done in 2.1s · no manual wrap-up
            </div>
          </div>
        </div>
      </div>
    </HeroConsole>
  )
}
