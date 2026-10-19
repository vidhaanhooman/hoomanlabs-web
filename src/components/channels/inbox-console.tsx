"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import {
  ChatCircleTextIcon,
  CheckIcon,
  ClockCounterClockwiseIcon,
  DeviceMobileIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  PhoneTransferIcon,
  WhatsappLogoIcon,
  type Icon,
} from "@phosphor-icons/react"

import { CONSOLE, HeroConsole } from "@/components/product-page/hero-console"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * The /platform/channels hero visual: a large Inbox console on a mesh
 * gradient. Channels on the left,
 * every live conversation in one list (calls, chats and app sessions), and
 * the selected customer's timeline on the right: Maya's Monday call, then
 * her Tuesday chat, with Ria remembering. On view a new call rings in and
 * Ria's reply to Maya types out, then it holds. Framed and scaled by
 * HeroConsole. Reduced motion: finished. Sample data (Halden Energy).
 */

const DESIGN_H = 660

type Live = { icon: Icon; who: string; ch: string; said: string; state: React.ReactNode; on?: boolean }

function Bars() {
  return (
    <span className="flex h-3 items-end gap-[2px]">
      {["h-1.5", "h-3", "h-2", "h-2.5"].map((h, i) => (
        <span key={i} className={cn("w-[2px] rounded-full bg-(--ui-text) opacity-70 motion-safe:animate-pulse", h, i % 2 && "[animation-delay:300ms]")} />
      ))}
    </span>
  )
}

function Dots() {
  return (
    <span className="flex gap-[3px]">
      {[0, 1, 2].map((i) => (
        <span key={i} className={cn("size-1 rounded-full bg-(--ui-muted) motion-safe:animate-pulse", i === 1 && "[animation-delay:200ms]", i === 2 && "[animation-delay:400ms]")} />
      ))}
    </span>
  )
}

const LIVE: Live[] = [
  { icon: ChatCircleTextIcon, who: "Maya Patel", ch: "Website chat", said: "Did the change go through?", state: <Dots />, on: true },
  { icon: DeviceMobileIcon, who: "Ravi Menon", ch: "App", said: "Why is my bill higher this month?", state: <><Bars />0:38</> },
  { icon: PhoneTransferIcon, who: "Priya Shah", ch: "Phone", said: "I want to dispute my March bill.", state: "To Daniel · Billing" },
  { icon: PhoneIcon, who: "Arjun Rao", ch: "Phone", said: "Can I get a copy of my statement?", state: <><Bars />1:12</> },
  { icon: ChatCircleTextIcon, who: "Lena Fischer", ch: "Website chat", said: "Do you cover Park Road?", state: <Dots /> },
]

const REPLY = "Yes, Maya. It's set for Friday, $86.40. Would you like a reminder the day before?"

export function InboxConsole() {
  const box = useRef<HTMLDivElement>(null)
  const seen = useInView(box, { amount: 0.3, once: true })
  const reduce = usePrefersReducedMotion()
  const [ring, setRing] = useState(0) // 0 hidden, 1 ringing, 2 answered
  const [typed, setTyped] = useState(0)

  // A new call rings in, then is answered; then Ria's reply types out.
  useEffect(() => {
    if (!seen || reduce) return
    const a = setTimeout(() => setRing(1), 900)
    const b = setTimeout(() => setRing(2), 2600)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [seen, reduce])
  useEffect(() => {
    if (!seen || reduce || typed >= REPLY.length) return
    const t = setTimeout(() => setTyped((n) => Math.min(REPLY.length, n + 2)), typed === 0 ? 1800 : 28)
    return () => clearTimeout(t)
  }, [seen, reduce, typed])

  const r = reduce ? 2 : ring
  const shown = reduce ? REPLY.length : typed

  return (
    <HeroConsole image="/art/product/channels-mountains.webp" designH={DESIGN_H}>
      <div ref={box} aria-hidden className={CONSOLE}>
        {/* Title bar */}
        <div className="flex h-11 shrink-0 items-center gap-3 border-b border-(--ui-line) px-4 text-(--ui-muted)">
          <span className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-2.5 rounded-full bg-white/10" />
            ))}
          </span>
          <span className="ml-2 text-(--ui-text)">Inbox</span>
          <span>·</span>
          <span>Ria · Billing</span>
          <span className="ml-auto flex items-center gap-2 rounded-md border border-(--ui-line) px-2.5 py-1 text-[12px]">
            <MagnifyingGlassIcon className="size-3.5" />
            Search conversations
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-(--ui-raised) px-2.5 py-0.5 text-[12px] text-(--ui-text)">
            <span className="size-1.5 rounded-full bg-(--ui-live)" />
            {r >= 1 ? 6 : 5} live
          </span>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[210px_400px_1fr]">
          {/* Channels */}
          <div className="flex flex-col gap-1 border-r border-(--ui-line) p-3">
            <span className="px-2 pt-1 pb-2 font-mono text-[10.5px] tracking-wide text-(--ui-muted) uppercase">Channels</span>
            {(
              [
                [PhoneIcon, "Phone lines", r >= 1 ? "3" : "2", true],
                [ChatCircleTextIcon, "Website", "2", false],
                [DeviceMobileIcon, "In-app voice", "1", false],
              ] as const
            ).map(([Ico, name, n, sel]) => (
              <span key={name} className={cn("flex items-center gap-2.5 rounded-md px-2 py-2", sel ? "bg-(--ui-raised)" : "")}>
                <Ico className="size-4 text-(--ui-muted)" />
                {name}
                <span className="ml-auto text-[12px] text-(--ui-muted) tabular-nums">{n}</span>
              </span>
            ))}
            <span className="flex items-center gap-2.5 rounded-md px-2 py-2 text-(--ui-muted) opacity-60">
              <WhatsappLogoIcon className="size-4" />
              WhatsApp
              <span className="ml-auto text-[11px]">Soon</span>
            </span>

            <span className="mt-6 px-2 pb-2 font-mono text-[10.5px] tracking-wide text-(--ui-muted) uppercase">Today</span>
            {[
              ["Calls", "1,906"],
              ["Chats", "642"],
              ["Answered", "100%"],
            ].map(([k, v]) => (
              <span key={k} className="flex items-center justify-between px-2 py-1.5">
                <span className="text-(--ui-muted)">{k}</span>
                <span className="tabular-nums">{v}</span>
              </span>
            ))}

            <span className="mt-auto flex items-center gap-2.5 rounded-lg border border-(--ui-line) bg-(--ui-panel) p-2.5">
              <span className="grid size-7 place-items-center rounded-full bg-(--ok)/18 text-[11px] text-(--ok-fg)">R</span>
              <span className="flex flex-col leading-tight">
                <span>Ria</span>
                <span className="text-[11px] text-(--ui-muted)">One agent, every channel</span>
              </span>
            </span>
          </div>

          {/* Live now */}
          <div className="flex flex-col border-r border-(--ui-line)">
            <div className="flex items-center gap-2 border-b border-(--ui-line) px-4 py-3">
              <span>Live now</span>
              <span className="ml-auto flex gap-1 text-[11.5px]">
                {["All", "Phone", "Web", "App"].map((f, i) => (
                  <span key={f} className={cn("rounded-full px-2.5 py-0.5", i === 0 ? "bg-(--ui-raised) text-(--ui-text)" : "text-(--ui-muted)")}>
                    {f}
                  </span>
                ))}
              </span>
            </div>
            <div className="flex flex-col p-2">
              {/* The new call, ringing in */}
              <div className={cn("grid transition-[grid-template-rows,opacity] duration-500", r >= 1 ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                <div className="overflow-hidden">
                  <LiveRow
                    l={{
                      icon: PhoneIcon,
                      who: "Sam Okafor",
                      ch: "Phone · new",
                      said: r >= 2 ? "Hi, I'm calling about my direct debit." : "Incoming call",
                      state: r >= 2 ? <><Bars />0:04</> : <span className="text-(--ui-live)">Ringing</span>,
                    }}
                  />
                </div>
              </div>
              {LIVE.map((l) => (
                <LiveRow key={l.who} l={l} />
              ))}
            </div>
          </div>

          {/* Maya's timeline */}
          <div className="flex min-w-0 flex-col">
            <div className="flex items-center gap-3 border-b border-(--ui-line) px-5 py-3">
              <span className="grid size-8 place-items-center rounded-full bg-(--ui-raised) text-[12px]">MP</span>
              <span className="flex flex-col leading-tight">
                <span>Maya Patel</span>
                <span className="text-[11.5px] text-(--ui-muted)">Halden Energy · customer since 2021</span>
              </span>
              <span className="ml-auto flex items-center gap-1.5 rounded-full bg-(--ui-raised) px-2.5 py-0.5 text-[11.5px]">
                <ClockCounterClockwiseIcon className="size-3.5" />
                One memory
              </span>
            </div>

            <div className="flex flex-col gap-4 p-5">
              {/* Monday's call */}
              <div className="flex gap-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-full border border-(--ui-line) bg-(--ui-panel)">
                  <PhoneIcon className="size-3.5 text-(--ui-muted)" />
                </span>
                <div className="flex flex-1 flex-col gap-2 rounded-lg border border-(--ui-line) bg-(--ui-panel) p-3.5">
                  <span className="flex items-center justify-between text-[12px] text-(--ui-muted)">
                    <span>Monday 10:02 · Phone call · 3:42</span>
                    <span className="flex items-center gap-1 text-(--ui-live)">
                      <CheckIcon weight="bold" className="size-3" />
                      Payment moved
                    </span>
                  </span>
                  <span>Asked to move this month&apos;s payment. Moved to Friday 7 March, $86.40.</span>
                </div>
              </div>

              {/* Tuesday's chat, live */}
              <div className="flex gap-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-full border border-(--ui-line) bg-(--ui-panel)">
                  <ChatCircleTextIcon className="size-3.5 text-(--ui-muted)" />
                </span>
                <div className="flex flex-1 flex-col gap-3">
                  <span className="flex items-center gap-2 text-[12px] text-(--ui-muted)">
                    Tuesday 18:40 · Website chat
                    <span className="flex items-center gap-1 text-(--ui-live)">
                      <span className="size-1.5 rounded-full bg-(--ui-live)" />
                      Live
                    </span>
                  </span>
                  <span className="max-w-[80%] self-start rounded-2xl rounded-bl-sm bg-(--ui-raised) px-3.5 py-2">Hi, did the change to my payment go through?</span>

                  <span className="flex items-center gap-2 self-end rounded-md border border-dashed border-(--ui-line) px-2.5 py-1 text-[11.5px] text-(--ui-muted)">
                    <ClockCounterClockwiseIcon className="size-3.5" />
                    Ria remembers · Monday&apos;s call · payment moved to Friday
                  </span>

                  <span className={cn("max-w-[80%] self-end rounded-2xl rounded-br-sm bg-(--ui-text) px-3.5 py-2 text-(--ui-bg) transition-opacity duration-300", shown > 0 ? "opacity-100" : "opacity-0")}>
                    {REPLY.slice(0, Math.max(1, shown))}
                    {shown > 0 && shown < REPLY.length && <span className="ml-0.5 inline-block h-3.5 w-px translate-y-0.5 animate-pulse bg-black" />}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-auto flex items-center gap-2 border-t border-(--ui-line) px-5 py-3 text-[12px] text-(--ui-muted)">
              {shown < REPLY.length ? (
                <>
                  <Dots />
                  Ria is replying
                </>
              ) : (
                <>
                  <CheckIcon weight="bold" className="size-3 text-(--ui-live)" />
                  Answered in 2s · same Ria as Monday&apos;s call
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </HeroConsole>
  )
}

function LiveRow({ l }: { l: Live }) {
  return (
    <div className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5", l.on && "bg-(--ui-raised)")}>
      <span className="grid size-8 shrink-0 place-items-center rounded-md bg-(--ui-panel)">
        <l.icon className="size-4 text-(--ui-muted)" />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="flex items-baseline gap-2">
          <span>{l.who}</span>
          <span className="text-[11px] text-(--ui-muted)">{l.ch}</span>
        </span>
        <span className="truncate text-[12px] text-(--ui-muted)">{l.said}</span>
      </span>
      <span className="ml-auto flex shrink-0 items-center gap-2 text-[11.5px] text-(--ui-muted) tabular-nums">{l.state}</span>
    </div>
  )
}
