"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import {
  BookOpenTextIcon,
  CheckCircleIcon,
  CircleNotchIcon,
  LightningIcon,
  SpeakerHighIcon,
  TrayArrowDownIcon,
  TrayArrowUpIcon,
  type Icon,
} from "@phosphor-icons/react"

import { PromptEditor } from "@/components/product/prompt-editor"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * Everything an agent needs, at once (/lab/v3), on a painting. Two strict
 * rows: Before / During / After (pre-call, the prompt, post-call) at equal
 * height, then three identical tiles for what the prompt draws on
 * (knowledge base, tools, voice). The cards light up one at a time, in
 * order, once the section is on screen; each settles before the next.
 * Sample content (fictional Halden Energy billing agent).
 */

/* Order the cards play in, and how long each holds the spotlight. */
const ORDER = ["pre", "prompt", "kb", "tools", "voice", "post"] as const
type Part = (typeof ORDER)[number]
const HOLD: Record<Part, number> = { pre: 3200, prompt: 5200, kb: 3000, tools: 2600, voice: 2200, post: 4200 }

/* ------------------------------------------------------------ helpers */

/** Counts 0 → total once `start` is true, one step every `ms`, after `delay`. */
function useReveal(start: boolean, total: number, ms: number, delay = 0) {
  const reduce = usePrefersReducedMotion()
  const [n, setN] = useState(0)
  useEffect(() => {
    if (reduce || !start || n >= total) return
    const t = setTimeout(() => setN((v) => v + 1), n === 0 ? delay : ms)
    return () => clearTimeout(t)
  }, [reduce, start, n, total, ms, delay])
  return reduce ? total : n
}

const fadeIn = "motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500"

function Pending({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2">
      <CircleNotchIcon className="size-3.5 text-(--ui-muted) motion-safe:animate-spin" aria-hidden />
      <span className="shimmer-text">{children}</span>
    </span>
  )
}

/** A neutral code pill (variables, tool names) for the cards around the editor. */
const Code = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-[4px] bg-white/[0.06] px-1 py-px font-mono text-[11.5px] text-(--ui-text)/85">{children}</span>
)

/** One card frame for everything: title, phase, and a green edge while it's playing. */
function Card({
  title,
  phase,
  icon: Ico,
  active,
  className,
  children,
}: {
  title: string
  phase: "Before" | "During" | "After"
  icon: Icon
  active: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "ui-dark flex flex-col overflow-hidden rounded-lg border text-[13px] leading-[1.55] shadow-[0_30px_70px_-40px_oklch(0.2_0.03_120/0.7)] transition-[border-color] duration-500",
        active ? "border-(--ui-live)/45" : "border-white/5",
        className
      )}
    >
      <div className="flex h-11 shrink-0 items-center gap-2.5 border-b border-(--ui-line) px-4">
        <Ico className={cn("size-4 transition-colors duration-500", active ? "text-(--ui-live)" : "text-(--ui-muted)")} aria-hidden />
        <span className="truncate font-medium">{title}</span>
        <span className="ml-auto shrink-0 font-mono text-[10.5px] tracking-wide text-(--ui-muted) uppercase">{phase}</span>
      </div>
      {children}
    </div>
  )
}

/* ------------------------------------------------------------ top row */

const MAPPING = [
  ["context.name", "Maya"],
  ["context.account", "HE-48213"],
  ["context.balance", "£86.40"],
  ["context.lastCall", "12 Feb"],
] as const

function PreCall({ go, active }: { go: boolean; active: boolean }) {
  const n = useReveal(go, MAPPING.length + 1, 450, 250)
  return (
    <Card title="Pre-call context" phase="Before" icon={TrayArrowDownIcon} active={active} className="h-full">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <span className="text-(--ui-muted)">Looks the caller up in your CRM and billing before the first ring.</span>
        <dl className="flex flex-col">
          {MAPPING.map(([k, v], i) => (
            <div key={k} className="flex items-center justify-between gap-3 border-b border-(--ui-line) py-2.5 last:border-0">
              <dt>
                <Code>{k}</Code>
              </dt>
              <dd className="truncate text-right">{i < n ? <span className={fadeIn}>{v}</span> : i === n && go ? <Pending>Fetching</Pending> : <span className="text-(--ui-muted)">…</span>}</dd>
            </div>
          ))}
        </dl>
        <span className={cn("flex items-center gap-1.5 text-[12px] text-(--ui-muted) transition-opacity duration-500", n > MAPPING.length ? "opacity-100" : "opacity-0")}>
          <CheckCircleIcon weight="fill" className="size-3.5 text-(--ui-live)" aria-hidden />
          Ready in 140 ms
        </span>
      </div>
    </Card>
  )
}

const ACTIONS = [
  ["CRM updated", "HubSpot"],
  ["Ticket created", "#TCK-2291"],
  ["Webhook sent", "200"],
  ["QA score", "4.6 / 5"],
] as const
const SUMMARY = "Double charge on 4 March confirmed. Refund needs approval, so a ticket was raised and the reference texted."

function PostCall({ go, active }: { go: boolean; active: boolean }) {
  const words = SUMMARY.split(" ")
  const w = useReveal(go, words.length, 45, 250)
  const a = useReveal(w >= words.length, ACTIONS.length, 450, 250)
  return (
    <Card title="Post-call" phase="After" icon={TrayArrowUpIcon} active={active} className="h-full">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <span className="text-(--ui-muted)">After goodbye: summarise, act, score.</span>
        <div className="flex flex-col gap-1">
          <span className="text-[11.5px] text-(--ui-muted)">Summary</span>
          <p className="min-h-[4.7em] text-(--ui-text)/90">{w ? words.slice(0, w).join(" ") : <span className="text-(--ui-muted)">…</span>}</p>
        </div>
        <ul className="flex flex-col">
          {ACTIONS.map(([t, d], i) => (
            <li key={t} className="flex items-center gap-2.5 border-b border-(--ui-line) py-2 last:border-0">
              {i < a ? (
                <CheckCircleIcon weight="fill" className="size-4 shrink-0 text-(--ui-live) motion-safe:animate-in motion-safe:zoom-in-50" aria-hidden />
              ) : (
                <span className="size-4 shrink-0 rounded-full border border-(--ui-line)" />
              )}
              <span className={cn("flex-1", i >= a && "text-(--ui-muted)")}>{t}</span>
              <span className="font-mono text-[11.5px] text-(--ui-muted)">{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}

/* ------------------------------------------------------------ bottom tiles */

/** A tile: one line that resolves from working to done, and a quiet detail. */
function Tile({
  title,
  icon,
  go,
  active,
  pending,
  result,
  detail,
}: {
  title: string
  icon: Icon
  go: boolean
  active: boolean
  pending: string
  result: React.ReactNode
  detail: string
}) {
  const n = useReveal(go, 1, 0, 1300)
  return (
    <Card title={title} phase="During" icon={icon} active={active}>
      <div className="flex flex-col gap-1.5 p-4">
        <span className="min-h-[1.55em]">
          {n ? <span className={cn("flex items-center gap-2", fadeIn)}>{result}</span> : go ? <Pending>{pending}</Pending> : <span className="text-(--ui-muted)">…</span>}
        </span>
        <span className="text-[12px] text-(--ui-muted)">{detail}</span>
      </div>
    </Card>
  )
}

/* ------------------------------------------------------------ section */

export function AgentJourney() {
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { amount: 0.3, once: true })
  const reduce = usePrefersReducedMotion()
  // -1 before it starts; then the index in ORDER now playing; ORDER.length when all are done.
  const [at, setAt] = useState(-1)
  const now = reduce ? ORDER.length : at

  useEffect(() => {
    if (reduce || !seen || at >= ORDER.length) return
    const t = setTimeout(() => setAt((v) => v + 1), at < 0 ? 300 : HOLD[ORDER[at]])
    return () => clearTimeout(t)
  }, [reduce, seen, at])

  const go = (p: Part) => now >= ORDER.indexOf(p)
  const active = (p: Part) => now === ORDER.indexOf(p)

  return (
    <div ref={ref} className="relative isolate overflow-hidden rounded-xl">
      <Image src="/art/backdrops/home-build.png" alt="" fill sizes="(min-width: 1300px) 1300px, 100vw" className="-z-10 object-cover" />
      <div className="flex flex-col gap-5 px-3 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        {/* Before / During / After */}
        <div className="grid gap-5 lg:h-[30rem] lg:grid-cols-12">
          <div className="lg:col-span-3">
            <PreCall go={go("pre")} active={active("pre")} />
          </div>
          <div
            className={cn(
              "h-[30rem] overflow-hidden rounded-lg border shadow-[0_40px_90px_-40px_oklch(0.2_0.03_120/0.75)] transition-[border-color] duration-500 lg:col-span-6 lg:h-auto",
              active("prompt") ? "border-(--ui-live)/45" : "border-white/5"
            )}
          >
            <PromptEditor className="h-full" play={go("prompt")} />
          </div>
          <div className="lg:col-span-3">
            <PostCall go={go("post")} active={active("post")} />
          </div>
        </div>

        {/* What the prompt draws on */}
        <div className="grid gap-5 md:grid-cols-3">
          <Tile
            title="Knowledge base"
            icon={BookOpenTextIcon}
            go={go("kb")}
            active={active("kb")}
            pending="Searching 3 sources"
            result={
              <>
                <BookOpenTextIcon className="size-4 shrink-0 text-(--ui-live)" aria-hidden />
                “3 to 5 working days”
                <span className="truncate text-[12px] text-(--ui-muted)">Refund policy §3</span>
              </>
            }
            detail="Tariffs, policies and your help centre, cited in every answer."
          />
          <Tile
            title="Tools"
            icon={LightningIcon}
            go={go("tools")}
            active={active("tools")}
            pending="Running take_payment"
            result={
              <>
                <CheckCircleIcon weight="fill" className="size-4 shrink-0 text-(--ui-live)" aria-hidden />
                <Code>take_payment</Code>
                <span className="text-[12px] text-(--ui-muted)">200 OK · 310 ms</span>
              </>
            }
            detail="Payments, tickets and messages, on your own systems."
          />
          <Tile
            title="Voice & languages"
            icon={SpeakerHighIcon}
            go={go("voice")}
            active={active("voice")}
            pending="Loading voice"
            result={
              <>
                <span className="ui-wave flex h-4 items-end gap-[2px]" aria-hidden>
                  {[6, 12, 8, 14, 7].map((h, k) => (
                    <span key={k} className="w-[2px] rounded-full bg-(--ui-live)" style={{ height: h }} />
                  ))}
                </span>
                Ria
                <span className="text-[12px] text-(--ui-muted)">Warm · en-GB</span>
              </>
            }
            detail="30 languages, turn detection and noise reduction on."
          />
        </div>
      </div>
    </div>
  )
}
