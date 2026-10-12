"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import {
  BookOpenTextIcon,
  CheckCircleIcon,
  CheckIcon,
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
 * Everything an agent needs, at once (/lab/v3): a bento on a painting with
 * the prompt as the large centre card. Pre-call and voice sit left,
 * knowledge base and tools right, post-call across the bottom; short
 * connectors run into the prompt. Each card is tagged Before / During /
 * After and animates in once, in turn, when the section comes into view.
 * Sample content (fictional Halden Energy billing agent).
 */

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

const fadeIn = "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:duration-500"

function Pending({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2">
      <CircleNotchIcon className="size-3.5 text-(--ui-muted) motion-safe:animate-spin" aria-hidden />
      <span className="shimmer-text">{children}</span>
    </span>
  )
}

const Var = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-[4px] bg-[oklch(0.72_0.14_295/0.18)] px-1 py-px font-mono text-[11.5px] text-[oklch(0.86_0.08_295)]">{children}</span>
)
const Tool = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-[4px] bg-[oklch(0.82_0.12_80/0.14)] px-1 py-px font-mono text-[11.5px] text-[oklch(0.86_0.1_80)]">{children}</span>
)

type Phase = "Before" | "During" | "After"

/** A dark product card with its phase tag, title and an optional connector into the prompt. */
function Card({
  phase,
  title,
  icon: Ico,
  link,
  className,
  children,
}: {
  phase: Phase
  title: string
  icon: Icon
  /** Where a short connector leaves the card toward the prompt (large screens). */
  link?: "right" | "left" | "top"
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("ui-dark relative flex flex-col rounded-lg border border-white/5 text-[13px] leading-[1.55] shadow-[0_30px_70px_-40px_oklch(0.2_0.03_120/0.7)]", className)}>
      <div className="flex items-center gap-2.5 border-b border-(--ui-line) px-4 py-3">
        <Ico className="size-4 text-(--ui-muted)" aria-hidden />
        <span className="truncate font-medium">{title}</span>
        <span className="ml-auto shrink-0 font-mono text-[10.5px] tracking-wide text-(--ui-muted) uppercase">{phase}</span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">{children}</div>
      {link && <Connector side={link} />}
    </div>
  )
}

/** A short dashed link across the grid gap, with a dot running along it. */
function Connector({ side }: { side: "right" | "left" | "top" }) {
  const vertical = side === "top"
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute hidden lg:block",
        side === "right" && "top-1/2 left-full h-px w-5 border-t border-dashed border-white/35",
        side === "left" && "top-1/2 right-full h-px w-5 border-t border-dashed border-white/35",
        vertical && "bottom-full left-1/2 h-5 w-px border-l border-dashed border-white/35"
      )}
    >
      <span
        className={cn(
          "absolute size-1.5 rounded-full bg-white shadow-[0_0_8px_white]",
          vertical ? "-left-[3.5px] motion-safe:animate-[flow-y_1.8s_ease-in-out_infinite_alternate]" : "-top-[3.5px] motion-safe:animate-[flow-x_1.8s_ease-in-out_infinite_alternate]",
          side === "left" && "motion-safe:[animation-direction:alternate-reverse]"
        )}
      />
    </span>
  )
}

/* ------------------------------------------------------------ cards */

const MAPPING = [
  ["context.name", "Maya"],
  ["context.account", "HE-48213"],
  ["context.balance", "£86.40"],
  ["context.lastCall", "12 Feb · meter reading"],
] as const

function PreCall({ go }: { go: boolean }) {
  const n = useReveal(go, MAPPING.length + 1, 450, 300)
  return (
    <Card phase="Before" title="Pre-call context" icon={TrayArrowDownIcon} link="right">
      <span className="text-(--ui-muted)">Looks the caller up in HubSpot and billing before the first ring.</span>
      <dl className="flex flex-col rounded-md border border-(--ui-line)">
        {MAPPING.map(([k, v], i) => (
          <div key={k} className="flex items-center justify-between gap-3 border-b border-(--ui-line) px-3 py-2 last:border-0">
            <dt>
              <Var>{`{{${k}}}`}</Var>
            </dt>
            <dd className="truncate text-right">{i < n ? <span className={fadeIn}>{v}</span> : i === n ? <Pending>Fetching</Pending> : <span className="text-(--ui-muted)">…</span>}</dd>
          </div>
        ))}
      </dl>
      <span className={cn("mt-auto flex items-center gap-1.5 text-[12px] text-(--ui-muted) transition-opacity duration-500", n > MAPPING.length ? "opacity-100" : "opacity-0")}>
        <CheckCircleIcon weight="fill" className="size-3.5 text-(--ui-live)" aria-hidden />
        Ready in 140 ms
      </span>
    </Card>
  )
}

const SETTINGS = ["Turn detection", "Noise reduction", "Switch language with the caller"]

function Voice({ go }: { go: boolean }) {
  const n = useReveal(go, SETTINGS.length, 450, 1200)
  return (
    <Card phase="During" title="Voice & languages" icon={SpeakerHighIcon} link="right">
      <div className="flex items-center gap-3 rounded-md border border-(--ui-live)/40 bg-(--ui-live)/[0.07] px-3 py-2">
        <span className="flex flex-1 flex-col">
          <span>Ria</span>
          <span className="text-[11.5px] text-(--ui-muted)">Warm · en-GB</span>
        </span>
        <span className="ui-wave flex h-4 items-end gap-[2px]" aria-hidden>
          {[6, 12, 8, 14, 7, 10].map((h, k) => (
            <span key={k} className="w-[2px] rounded-full bg-(--ui-live)" style={{ height: h }} />
          ))}
        </span>
      </div>
      <ul className="flex flex-col">
        {SETTINGS.map((s, i) => (
          <li key={s} className="flex items-center justify-between gap-3 py-1.5">
            <span className="text-(--ui-text)/85">{s}</span>
            <span className={cn("relative h-[18px] w-8 shrink-0 rounded-full transition-colors duration-300", i < n ? "bg-(--ui-live)" : "bg-(--ui-raised)")}>
              <span className={cn("absolute top-0.5 left-0.5 size-3.5 rounded-full bg-(--ui-text) transition-transform duration-300", i < n && "translate-x-3.5")} />
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-1.5 text-[11.5px]">
        {["English", "Hindi", "Spanish", "+ 27 more"].map((l) => (
          <span key={l} className="rounded-full border border-(--ui-line) px-2 py-0.5 text-(--ui-muted)">
            {l}
          </span>
        ))}
      </div>
    </Card>
  )
}

const ANSWER = "Duplicate-charge refunds reach the card in 3 to 5 working days. Over £50 needs billing approval first."

function Knowledge({ go }: { go: boolean }) {
  const words = ANSWER.split(" ")
  const w = useReveal(go, words.length + 1, 70, 900)
  return (
    <Card phase="During" title="Knowledge base" icon={BookOpenTextIcon} link="left">
      <div className="flex flex-wrap gap-1.5 text-[12px]">
        {["Tariffs 2026.pdf", "Refund policy", "Help centre"].map((d) => (
          <span key={d} className="flex items-center gap-1 rounded-md border border-(--ui-line) bg-(--ui-raised) px-2 py-0.5">
            <CheckIcon weight="bold" className="size-3 text-(--ui-live)" aria-hidden />
            {d}
          </span>
        ))}
      </div>
      <span className="self-end rounded-md bg-(--ui-raised) px-2.5 py-1">How long do refunds take?</span>
      <p className="min-h-[3em] text-(--ui-text)/90">{words.slice(0, w).join(" ")}</p>
      <span
        className={cn(
          "mt-auto flex w-fit items-center gap-1.5 rounded-full border border-(--ui-line) px-2.5 py-0.5 text-[11.5px] text-(--ui-muted) transition-opacity duration-500",
          w > words.length ? "opacity-100" : "opacity-0"
        )}
      >
        <BookOpenTextIcon className="size-3.5" aria-hidden />
        Refund policy · section 3
      </span>
    </Card>
  )
}

const TOOLS = [
  ["take_payment", "amount, method"],
  ["create_ticket", "summary, priority"],
  ["send_sms", "to, text"],
] as const

function Tools({ go }: { go: boolean }) {
  const n = useReveal(go, 3, 900, 1600)
  return (
    <Card phase="During" title="Tools" icon={LightningIcon} link="left">
      <ul className="flex flex-col gap-1.5">
        {TOOLS.map(([t, args], i) => (
          <li
            key={t}
            className={cn(
              "flex items-center justify-between gap-3 rounded-md border px-3 py-2 transition-colors duration-500",
              i === 0 && n >= 1 ? "border-(--ui-live)/45" : "border-(--ui-line)"
            )}
          >
            <Tool>{t}</Tool>
            <span className="truncate font-mono text-[11px] text-(--ui-muted)">({args})</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto rounded-md border border-(--ui-line) bg-(--ui-bg) px-3 py-2 font-mono text-[11.5px]">
        {n < 2 ? (
          <span className="text-(--ui-muted)">Test run</span>
        ) : n === 2 ? (
          <span className="font-sans text-[12px]">
            <Pending>Running take_payment</Pending>
          </span>
        ) : (
          <span className={cn("flex items-center gap-1.5 text-(--ui-live)", fadeIn)}>
            <CheckCircleIcon weight="fill" className="size-3.5" aria-hidden />
            200 OK · 310 ms <span className="text-(--ui-muted)">R-55120</span>
          </span>
        )}
      </div>
    </Card>
  )
}

const FIELDS = [
  ["intent", "Duplicate charge"],
  ["sentiment", "Calm"],
  ["outcome", "Refund ticket raised"],
] as const
const SUMMARY = "Maya called about a double charge on 4 March. Two charges of £86.40 confirmed; refund needs approval, so a ticket was raised and the reference texted."
const ACTIONS = [
  ["CRM updated", "HubSpot"],
  ["Ticket created", "Zendesk · #TCK-2291"],
  ["Webhook delivered", "POST /calls/completed"],
  ["QA score", "4.6 / 5"],
] as const

function PostCall({ go }: { go: boolean }) {
  const f = useReveal(go, FIELDS.length, 450, 2200)
  const words = SUMMARY.split(" ")
  const w = useReveal(f >= FIELDS.length, words.length, 45, 200)
  const a = useReveal(w >= words.length, ACTIONS.length, 450, 200)
  return (
    <Card phase="After" title="Post-call" icon={TrayArrowUpIcon} link="top">
      <div className="grid gap-4 md:grid-cols-[1fr_1.3fr_1fr]">
        <dl className="flex flex-col rounded-md border border-(--ui-line)">
          {FIELDS.map(([k, v], i) => (
            <div key={k} className="flex items-center justify-between gap-3 border-b border-(--ui-line) px-3 py-2 last:border-0">
              <dt className="font-mono text-[11.5px] text-(--ui-muted)">{k}</dt>
              <dd className="truncate">{i < f ? <span className={fadeIn}>{v}</span> : <span className="text-(--ui-muted)">…</span>}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-col gap-1">
          <span className="text-[11.5px] text-(--ui-muted)">Summary</span>
          <p className="min-h-[4.6em] text-(--ui-text)/90">{words.slice(0, w).join(" ")}</p>
        </div>
        <ul className="grid grid-cols-2 gap-1.5 md:grid-cols-1">
          {ACTIONS.map(([t, d], i) => (
            <li key={t} className="flex items-center gap-2.5">
              {i < a ? (
                <CheckCircleIcon weight="fill" className="size-4 shrink-0 text-(--ui-live) motion-safe:animate-in motion-safe:zoom-in-50" aria-hidden />
              ) : (
                <span className="size-4 shrink-0 rounded-full border border-(--ui-line)" />
              )}
              <span className="flex min-w-0 flex-col leading-tight">
                <span className={i < a ? "" : "text-(--ui-muted)"}>{t}</span>
                <span className="truncate font-mono text-[11px] text-(--ui-muted)">{d}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}

/* ------------------------------------------------------------ bento */

export function AgentJourney() {
  const ref = useRef<HTMLDivElement>(null)
  const go = useInView(ref, { amount: 0.25, once: true })
  return (
    <div ref={ref} className="relative isolate overflow-hidden rounded-xl">
      <Image src="/art/backdrops/home-build.png" alt="" fill sizes="(min-width: 1300px) 1300px, 100vw" className="-z-10 object-cover" />
      <div className="grid gap-5 px-3 py-10 sm:px-8 sm:py-14 lg:grid-cols-12 lg:px-12 lg:py-16">
        <div className="flex flex-col gap-5 lg:col-span-3">
          <PreCall go={go} />
          <Voice go={go} />
        </div>
        <div className="flex flex-col gap-1.5 lg:col-span-6">
          <div className="overflow-hidden rounded-lg border border-white/5 shadow-[0_40px_90px_-40px_oklch(0.2_0.03_120/0.75)]">
            <PromptEditor className="h-[34rem] lg:h-full lg:min-h-[36rem]" />
          </div>
        </div>
        <div className="flex flex-col gap-5 lg:col-span-3">
          <Knowledge go={go} />
          <Tools go={go} />
        </div>
        <div className="lg:col-span-12 lg:mt-0">
          <PostCall go={go} />
        </div>
      </div>
    </div>
  )
}
