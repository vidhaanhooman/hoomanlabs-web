"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import {
  BookOpenTextIcon,
  CheckIcon,
  FileTextIcon,
  FlowArrowIcon,
  LightningIcon,
  PhoneIcon,
  PlayIcon,
  TableIcon,
  TranslateIcon,
  UserSoundIcon,
  type Icon,
} from "@phosphor-icons/react"

import { CONSOLE, HeroConsole } from "@/components/product-page/hero-console"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * The /platform/agents hero visual: a large agent console on the canyon
 * backdrop. Left, the agent's sections; middle, Ria's job description with
 * the knowledge and skills she can use; right, a live test call. On view the
 * call plays: when Ria answers from the refund policy, that document lights
 * up in the middle; when she takes the payment, the take_payment skill
 * lights up. Then it holds. Reduced motion: finished. Sample data (Halden
 * Energy, Ria, Maya Patel).
 */

const DESIGN_H = 660
const BEAT_MS = 1300

type Beat = { who: "ria" | "maya"; text: string } | { tool: "knowledge" | "skill" }

const CALL: Beat[] = [
  { who: "ria", text: "Hi Maya, it's Ria from Halden Energy. How can I help?" },
  { who: "maya", text: "If I switch plans, do I get a refund?" },
  { tool: "knowledge" },
  { who: "ria", text: "Yes. Within 14 days the exit fee is waived, and any credit is refunded." },
  { who: "maya", text: "OK. Can I just pay the $86.40 now?" },
  { tool: "skill" },
  { who: "ria", text: "Done. It's paid, and your receipt is on its way." },
]
const KNOWLEDGE_AT = CALL.findIndex((b) => "tool" in b && b.tool === "knowledge")
const SKILL_AT = CALL.findIndex((b) => "tool" in b && b.tool === "skill")

const NAV: { icon: Icon; name: string; n?: string; on?: boolean }[] = [
  { icon: FileTextIcon, name: "Job description", on: true },
  { icon: BookOpenTextIcon, name: "Knowledge", n: "3" },
  { icon: TableIcon, name: "Data tables", n: "2" },
  { icon: LightningIcon, name: "Skills", n: "4" },
  { icon: FlowArrowIcon, name: "Flows", n: "2" },
  { icon: UserSoundIcon, name: "Voice" },
  { icon: TranslateIcon, name: "Languages", n: "6" },
]

const KNOWLEDGE = ["Refund policy.pdf", "Tariffs 2026.pdf", "Billing FAQ · website"]
const SKILLS: [string, string][] = [
  ["take_payment", "Stripe"],
  ["book_callback", "Google Calendar"],
  ["update_record", "Zoho CRM"],
  ["transfer_to_team", "Billing team"],
]

function Var({ children }: { children: React.ReactNode }) {
  return <span className="rounded bg-(--data)/18 px-1 font-mono text-[12px] text-(--data)">{children}</span>
}

export function AgentConsole() {
  const box = useRef<HTMLDivElement>(null)
  const seen = useInView(box, { amount: 0.3, once: true })
  const reduce = usePrefersReducedMotion()
  const [beat, setBeat] = useState(-1)

  useEffect(() => {
    if (!seen || reduce || beat >= CALL.length - 1) return
    const t = setTimeout(() => setBeat((b) => b + 1), beat < 0 ? 600 : BEAT_MS)
    return () => clearTimeout(t)
  }, [seen, reduce, beat])

  const b = reduce ? CALL.length - 1 : beat
  const knowOn = b === KNOWLEDGE_AT || b === KNOWLEDGE_AT + 1
  const skillOn = b === SKILL_AT || b === SKILL_AT + 1
  const done = b >= CALL.length - 1

  return (
    <HeroConsole image="/art/product/agents-backdrop.webp" designH={DESIGN_H}>
      <div ref={box} aria-hidden className={CONSOLE}>
        {/* Title bar */}
        <div className="flex h-11 shrink-0 items-center gap-3 border-b border-(--ui-line) px-4 text-(--ui-muted)">
          <span className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-2.5 rounded-full bg-white/10" />
            ))}
          </span>
          <span className="ml-2">Agents</span>
          <span>/</span>
          <span className="text-(--ui-text)">Ria · Billing</span>
          <span className="rounded-full bg-(--ui-raised) px-2.5 py-0.5 text-[12px]">Published · v12</span>
          <span className="ml-auto flex items-center gap-1.5 rounded-md border border-(--ui-line) px-3 py-1 text-[12px] text-(--ui-text)">
            <PlayIcon weight="fill" className="size-3" />
            Test call
          </span>
          <span className="rounded-md bg-(--ui-text) px-3 py-1 text-[12px] text-(--ui-bg)">Publish</span>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[200px_1fr_360px]">
          {/* The agent's sections */}
          <div className="flex flex-col gap-1 border-r border-(--ui-line) p-3">
            <span className="flex items-center gap-2.5 px-2 pt-1 pb-3">
              <span className="grid size-8 place-items-center rounded-full bg-(--ok)/18 text-[12px] text-(--ok-fg)">R</span>
              <span className="flex flex-col leading-tight">
                <span>Ria</span>
                <span className="text-[11px] text-(--ui-muted)">Billing · Halden Energy</span>
              </span>
            </span>
            {NAV.map((n) => (
              <span key={n.name} className={cn("flex items-center gap-2.5 rounded-md px-2 py-2", n.on && "bg-(--ui-raised)")}>
                <n.icon className="size-4 text-(--ui-muted)" />
                {n.name}
                {n.n && <span className="ml-auto text-[12px] text-(--ui-muted) tabular-nums">{n.n}</span>}
              </span>
            ))}
            <span className="mt-auto flex flex-col gap-1 rounded-lg border border-(--ui-line) bg-(--ui-panel) p-3 text-[12px]">
              <span className="text-(--ui-muted)">This week</span>
              <span className="flex justify-between">
                Calls <span className="tabular-nums">4,812</span>
              </span>
              <span className="flex justify-between">
                Resolved <span className="tabular-nums">87%</span>
              </span>
            </span>
          </div>

          {/* The job, and what Ria can use */}
          <div className="flex min-w-0 flex-col gap-4 border-r border-(--ui-line) p-5">
            <div className="flex items-baseline justify-between">
              <span className="text-[15px]">Job description</span>
              <span className="text-[11.5px] text-(--ui-muted)">Saved · 2 min ago</span>
            </div>
            <div className="flex flex-col gap-3 rounded-lg border border-(--ui-line) bg-(--ui-panel) p-4 text-[13px] leading-relaxed text-(--ui-text)">
              <p>
                You are Ria, a billing assistant for Halden Energy. Greet <Var>{"{{customer.name}}"}</Var> by name and help with bills, refunds and payments.
              </p>
              <p>
                If they owe <Var>{"{{balance}}"}</Var>, offer to take the payment on the call. Answer policy questions only from the knowledge base.
              </p>
              <p className="text-(--ui-muted)">Hand over to the billing team for disputes, and always send a summary.</p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10.5px] tracking-wide text-(--ui-muted) uppercase">Knowledge</span>
              <div className="flex flex-wrap gap-2">
                {KNOWLEDGE.map((k, i) => (
                  <span
                    key={k}
                    className={cn(
                      "flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[12px] transition-[border-color,background-color,box-shadow] duration-500",
                      i === 0 && knowOn ? "border-white/70 bg-white/10 shadow-[0_0_24px_-6px_oklch(1_0_0/0.35)]" : "border-(--ui-line)"
                    )}
                  >
                    <BookOpenTextIcon className="size-3.5 text-(--ui-muted)" />
                    {k}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10.5px] tracking-wide text-(--ui-muted) uppercase">Skills</span>
              <div className="grid grid-cols-2 gap-2">
                {SKILLS.map(([name, via], i) => (
                  <span
                    key={name}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg border px-3 py-2.5 transition-[border-color,background-color,box-shadow] duration-500",
                      i === 0 && skillOn ? "border-white/70 bg-white/10 shadow-[0_0_24px_-6px_oklch(1_0_0/0.35)]" : "border-(--ui-line) bg-(--ui-panel)"
                    )}
                  >
                    <LightningIcon weight="fill" className="size-3.5 text-(--warn-fg)" />
                    <span className="flex min-w-0 flex-col leading-tight">
                      <span className="font-mono text-[12px]">{name}</span>
                      <span className="text-[11px] text-(--ui-muted)">{via}</span>
                    </span>
                    <span className="ml-auto h-4 w-7 rounded-full bg-(--ui-live)/80 p-0.5">
                      <span className="ml-auto block size-3 rounded-full bg-white" />
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* A live test call */}
          <div className="flex min-w-0 flex-col">
            <div className="flex items-center gap-2 border-b border-(--ui-line) px-4 py-3">
              <PhoneIcon className="size-4 text-(--ui-muted)" />
              <span>Test call · Maya Patel</span>
              <span className="ml-auto flex items-center gap-1.5 text-[12px] text-(--ui-muted)">
                <span className={cn("size-1.5 rounded-full", done ? "bg-(--ui-muted)" : "bg-(--ui-live)")} />
                {done ? "Ended · 0:48" : "Live"}
              </span>
            </div>
            <div className="flex flex-col gap-2.5 p-4">
              {CALL.map((c, i) => {
                const shown = i <= b
                const cls = cn("transition-[opacity,translate] duration-500", shown ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0")
                if ("tool" in c)
                  return (
                    <span key={i} className={cn(cls, "flex items-center gap-2 self-center rounded-full border border-(--ui-line) px-2.5 py-1 text-[11.5px] text-(--ui-muted)")}>
                      {c.tool === "knowledge" ? (
                        <>
                          <BookOpenTextIcon className="size-3.5" />
                          Refund policy.pdf · section 3
                        </>
                      ) : (
                        <>
                          <LightningIcon weight="fill" className="size-3.5 text-(--warn-fg)" />
                          <span className="font-mono">take_payment</span> · $86.40
                          <CheckIcon weight="bold" className="size-3 text-(--ui-live)" />
                          1.2s
                        </>
                      )}
                    </span>
                  )
                return (
                  <span
                    key={i}
                    className={cn(
                      cls,
                      "max-w-[85%] rounded-2xl px-3.5 py-2 text-[12.5px]",
                      c.who === "maya" ? "self-end rounded-br-sm bg-(--ui-text) text-(--ui-bg)" : "self-start rounded-bl-sm bg-(--ui-raised)"
                    )}
                  >
                    {c.text}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </HeroConsole>
  )
}
