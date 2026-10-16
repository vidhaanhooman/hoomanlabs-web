"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { ArrowsLeftRightIcon, ChatTextIcon, CheckIcon, DatabaseIcon, LightningIcon, MicrophoneSlashIcon, PhoneDisconnectIcon, PhoneIcon, SpeakerHighIcon, UserIcon, WebhooksLogoIcon } from "@phosphor-icons/react"

import { DemoPanel, Phone } from "@/components/channels/demo-shell"
import { MeshStage } from "@/components/layout/art-stage"
import { integrationsPage as c } from "@/content/pages/integrations"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * The first three sections of /platform/integrations, each its own scene on
 * a photo stage (like Channels), in the tabbed split panel: the rows are
 * tabs, and the scene moves through them until someone picks one.
 *
 * - Connect: Maya's iPhone mid-call, with three callouts pinned to it:
 *   context loaded before, a tool used during (the SMS lands on her phone),
 *   the CRM updated after.
 * - Actions: a code editor (or, on MCP, an assistant chat) beside an
 *   iPhone showing the incoming call it starts.
 * - Webhooks: a deliveries panel with the call's timeline and each event
 *   received, and the selected event's payload floating beside it.
 *
 * Fictional data (Maya Patel, Halden Energy). Paths, event names and
 * payloads are illustrative until checked against the API reference.
 */

const DOCS = "https://docs.hoomanlabs.com"
const CYCLE_MS = 3800
const STAGE = "flex h-[34rem] items-center justify-center px-4 sm:h-[36rem]"
const CARD = "rounded-2xl bg-[#0e0e10]/92 text-[#f2f2f3] shadow-[0_24px_50px_-22px_oklch(0.1_0.03_50/0.8)] ring-1 ring-white/10 backdrop-blur"

/** Tabs that move on by themselves (once seen) until someone picks one. */
function useCycle(ids: string[]) {
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { amount: 0.4, once: true })
  const reduce = usePrefersReducedMotion()
  const [active, setActive] = useState(ids[0])
  const [held, setHeld] = useState(false)
  useEffect(() => {
    if (!seen || reduce || held) return
    const t = setTimeout(() => setActive((a) => ids[(ids.indexOf(a) + 1) % ids.length]), CYCLE_MS)
    return () => clearTimeout(t)
  }, [seen, reduce, held, active, ids])
  const pick = (id: string) => {
    setHeld(true)
    setActive(id)
  }
  return { ref, active, pick }
}

const ids = (rows: { id: string }[]) => rows.map((r) => r.id)
const CONNECT_IDS = ids(c.sections.connect.rows)
const ACTION_IDS = ids(c.sections.actions.rows)
const HOOK_IDS = ids(c.sections.webhooks.rows)

/* =============================================================== connect */

const CALLOUTS = [
  { id: "before", when: "Before the call", title: "Account loaded", detail: "GET /accounts/482913", note: "Maya Patel · $86.40 due Friday", icon: UserIcon },
  { id: "during", when: "During the call · tool", title: "Payment link sent", detail: "send_payment_link · 0.4 s", note: "Arrives on Maya's phone by SMS", icon: LightningIcon },
  { id: "workflow", when: "After the call · workflow", title: "CRM updated", detail: "PATCH /crm/contacts/482913", note: "Outcome: promise to pay, Friday", icon: DatabaseIcon },
]

export function ConnectScene() {
  const { ref, active, pick } = useCycle(CONNECT_IDS)
  return (
    <DemoPanel id="integrations-connect" {...c.sections.connect} active={active} onPick={pick} link="Read about tools" linkHref={DOCS}>
      <div ref={ref} aria-hidden>
        <MeshStage image="/art/product/post-call-backdrop.webp" className={STAGE}>
          <div className="relative flex items-center gap-10">
            <Phone bar="light" screen="bg-black/65 text-white backdrop-blur-2xl">
              <CallScreen step={active} />
            </Phone>
            {/* Callouts, pinned to the phone by fine lines */}
            <ol className="hidden w-[15.5rem] flex-col gap-4 md:flex">
              {CALLOUTS.map((x) => {
                const on = x.id === active
                return (
                  <li key={x.id} className={cn("relative transition-opacity duration-500", on ? "opacity-100" : "opacity-45")}>
                    <span aria-hidden className={cn("absolute top-1/2 -left-10 h-px w-10 transition-colors duration-500", on ? "bg-white/70" : "bg-white/25")} />
                    <span aria-hidden className={cn("absolute top-1/2 -left-[2.65rem] size-1.5 -translate-y-1/2 rounded-full", on ? "bg-white" : "bg-white/40")} />
                    <div className={cn(CARD, "flex gap-3 p-3.5")}>
                      <span className={cn("grid size-8 shrink-0 place-items-center rounded-full", on ? "bg-[oklch(0.74_0.16_150/0.18)] text-[oklch(0.82_0.14_150)]" : "bg-white/8 text-white/70")}>
                        <x.icon weight="fill" className="size-4" />
                      </span>
                      <span className="flex min-w-0 flex-col gap-0.5 leading-snug">
                        <span className="text-[11px] text-white/50">{x.when}</span>
                        <span className="text-[13.5px]">{x.title}</span>
                        <span className="truncate font-mono text-[11px] text-white/45">{x.detail}</span>
                        <span className="text-[11.5px] text-white/65">{x.note}</span>
                      </span>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </MeshStage>
      </div>
    </DemoPanel>
  )
}

/** Maya's iPhone during the call; what's on screen follows the step. */
function CallScreen({ step }: { step: string }) {
  const ended = step === "workflow"
  const lines: Record<string, [string, string][]> = {
    before: [["Ria", "Hi Maya, I can see your March bill is $86.40, due Friday."]],
    during: [
      ["Maya", "Can you text me a link to pay?"],
      ["Ria", "Sent. It's on your phone now."],
    ],
    workflow: [],
  }
  return (
    <div className="relative flex flex-1 flex-col items-center px-6 pt-16 text-center">
      {/* The SMS the tool sent, as an iOS banner */}
      <div className={cn("absolute inset-x-3 top-12 z-10 flex gap-2.5 rounded-2xl bg-white/85 p-2.5 text-left text-black shadow-lg backdrop-blur transition-[opacity,translate] duration-500", step === "during" ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0")}>
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#34c759] text-white">
          <ChatTextIcon weight="fill" className="size-4.5" />
        </span>
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="flex justify-between text-[11.5px] font-semibold">
            Halden Energy <span className="font-normal text-black/45">now</span>
          </span>
          <span className="text-[11.5px] text-black/75">Pay your March bill of $86.40: halden.example/pay</span>
        </span>
      </div>

      <div className={cn("flex flex-col items-center transition-opacity duration-500", step === "during" && "opacity-20")}>
        <span className="text-[13px] text-white/70">{ended ? "Call ended" : step === "before" ? "0:08" : "1:42"}</span>
        <span className="mt-0.5 text-[26px] leading-tight font-light">Halden Energy</span>
        <span className="text-[12.5px] text-white/60">Ria · Billing</span>
      </div>

      {ended ? (
        <div className="mt-8 flex w-full flex-col gap-2 rounded-2xl bg-white/12 p-4 text-left text-[12.5px]">
          <span className="text-[11px] text-white/55">4:11 · today</span>
          <span>Promise to pay on Friday</span>
          <span className="text-white/60">Summary sent to Halden&apos;s CRM</span>
        </div>
      ) : (
        <div className="mt-6 flex h-[7.5rem] w-full flex-col justify-end gap-1.5 text-left text-[12px] leading-snug">
          {lines[step].map(([who, line]) => (
            <p key={line} className="rounded-2xl bg-white/14 px-3 py-2 motion-safe:animate-[lang-in_400ms_ease-out]">
              <span className="block text-[10px] text-white/55">{who}</span>
              {line}
            </p>
          ))}
        </div>
      )}

      <div className="mt-auto mb-7 flex gap-5">
        {[MicrophoneSlashIcon, SpeakerHighIcon].map((I, i) => (
          <span key={i} className="grid size-12 place-items-center rounded-full bg-white/18">
            <I weight="fill" className="size-5" />
          </span>
        ))}
        <span className={cn("grid size-12 place-items-center rounded-full", ended ? "bg-white/18" : "bg-[#ff3b30]")}>
          <PhoneDisconnectIcon weight="fill" className="size-5" />
        </span>
      </div>
    </div>
  )
}

/* =============================================================== actions */

const CODE: [string, string][][] = [
  [["// When a bill goes overdue, call the customer", "text-white/40"]],
  [["onOverdue", "text-[#82aaff]"], ["(", ""], ["async", "text-[#c792ea]"], [" (account) => {", ""]],
  [["  await ", "text-[#c792ea]"], ["hooman.calls.", ""], ["create", "text-[#82aaff]"], ["({", ""]],
  [["    agent: ", ""], ['"ria-billing"', "text-[#c3e88d]"], [",", ""]],
  [["    phone: account.phone,", ""]],
  [["    context: { bill: account.balance },", ""]],
  [["  })", ""]],
  [["})", ""]],
]

export function ActionsScene() {
  const { ref, active, pick } = useCycle(ACTION_IDS)
  const mcp = active === "mcp"
  return (
    <DemoPanel id="integrations-actions" {...c.sections.actions} active={active} onPick={pick} media="start" link="Read the API reference" linkHref={DOCS}>
      <div ref={ref} aria-hidden>
        <MeshStage image="/art/product/integrations-backdrop.webp" className={STAGE}>
          <div className="relative flex w-full max-w-[40rem] items-center justify-center">
            {/* Editor, or the assistant on MCP */}
            <div key={active} className="hidden w-[24rem] shrink-0 overflow-hidden rounded-xl bg-[#0d0d0f]/95 text-[12px] text-[#e6e6e8] shadow-[0_30px_60px_-28px_oklch(0.1_0.03_250/0.8)] ring-1 ring-white/10 motion-safe:animate-[lang-in_400ms_ease-out] sm:block">
              <div className="flex h-9 items-center gap-2 border-b border-white/8 px-3">
                <span className="flex gap-1.5">
                  {["#ff5f57", "#febc2e", "#28c840"].map((col) => (
                    <span key={col} className="size-2.5 rounded-full" style={{ background: col }} />
                  ))}
                </span>
                <span className="ml-2 text-[11.5px] text-white/60">{mcp ? "Assistant · connected to Hooman" : "crm-hooks.ts"}</span>
              </div>
              {mcp ? (
                <div className="flex flex-col gap-3 p-4 text-[12.5px] leading-snug">
                  <p className="max-w-[85%] self-end rounded-2xl rounded-br-md bg-white px-3 py-2 text-black">Call Maya Patel about her March bill, with the billing agent.</p>
                  <span className="flex items-center gap-1.5 self-start rounded-full bg-white/8 px-2.5 py-1 text-[11px] text-white/70">
                    <LightningIcon weight="fill" className="size-3 text-[#ffcb6b]" />
                    Used Hooman · start_call
                  </span>
                  <p className="max-w-[90%] self-start rounded-2xl rounded-bl-md bg-white/8 px-3 py-2">Calling Maya now with Ria. I&apos;ll share the outcome when the call ends.</p>
                </div>
              ) : (
                <pre className="px-0 py-3 font-mono text-[11.5px] leading-[1.8]">
                  {CODE.map((parts, i) => (
                    <div key={i} className="flex">
                      <span className="w-9 shrink-0 pr-3 text-right text-white/25 select-none">{i + 1}</span>
                      <span>
                        {parts.map(([t, tone], j) => (
                          <span key={j} className={tone}>
                            {t}
                          </span>
                        ))}
                      </span>
                    </div>
                  ))}
                </pre>
              )}
              <div className="flex items-center gap-2 border-t border-white/8 px-3 py-2 text-[11px] text-white/55">
                <span className="size-1.5 rounded-full bg-[#28c840]" />
                {mcp ? "Tool call succeeded" : "201 Created · call queued"}
              </div>
            </div>

            {/* The call it starts, on Maya's iPhone */}
            <div className="relative z-10 sm:-ml-12">
              <Phone bar="light" className="[--s:0.7] sm:[--s:0.72]" screen="bg-black/55 text-white backdrop-blur-2xl">
                <div className="flex flex-1 flex-col items-center px-6 pt-20 text-center">
                  <span className="text-[13px] text-white/65">mobile</span>
                  <span className="mt-1 text-[30px] leading-tight font-light">Halden Energy</span>
                  <span className="mt-1 text-[13px] text-white/60">calling…</span>
                  <div className="mt-auto mb-14 flex w-full justify-between px-4">
                    <span className="flex flex-col items-center gap-2 text-[12px]">
                      <span className="grid size-16 place-items-center rounded-full bg-[#ff3b30]">
                        <PhoneDisconnectIcon weight="fill" className="size-7" />
                      </span>
                      Decline
                    </span>
                    <span className="flex flex-col items-center gap-2 text-[12px]">
                      <span className="relative grid size-16 place-items-center rounded-full bg-[#34c759]">
                        <span className="absolute inset-0 rounded-full border-2 border-[#34c759] motion-safe:animate-ping" />
                        <PhoneIcon weight="fill" className="size-7" />
                      </span>
                      Accept
                    </span>
                  </div>
                </div>
              </Phone>
            </div>
          </div>
        </MeshStage>
      </div>
    </DemoPanel>
  )
}

/* ============================================================== webhooks */

const EVENTS = [
  { name: "call.started", at: "0:00", x: 0, kind: "call" },
  { name: "call.mid_call", at: "1:14", x: 29, kind: "mid" },
  { name: "transfer.initiated", at: "2:37", x: 62, kind: "transfer" },
  { name: "transfer.started", at: "2:43", x: 65, kind: "transfer" },
  { name: "transfer.ended", at: "4:08", x: 97, kind: "transfer" },
  { name: "call.ended", at: "4:11", x: 100, kind: "call" },
]
const PICKED: Record<string, string> = { call: "call.ended", mid: "call.mid_call", transfer: "transfer.started" }
const PAYLOAD: Record<string, [string, string][]> = {
  "call.ended": [
    ["outcome", '"promise_to_pay"'],
    ["summary", '"Agreed to pay on Friday"'],
    ["duration", "251"],
  ],
  "call.mid_call": [
    ["promise_date", '"Fri 7 Mar"'],
    ["captured_at", '"1:14"'],
    ["live", "true"],
  ],
  "transfer.started": [
    ["to", '"Priya Shah · Billing team"'],
    ["reason", '"Wants to dispute a fee"'],
  ],
}
const DOT: Record<string, string> = { call: "bg-[#28c840]", mid: "bg-[#ffcb6b]", transfer: "bg-[#82aaff]" }

export function WebhooksScene() {
  const { ref, active, pick } = useCycle(HOOK_IDS)
  const picked = PICKED[active]
  return (
    <DemoPanel id="integrations-webhooks" {...c.sections.webhooks} active={active} onPick={pick} link="Read about webhooks" linkHref={DOCS}>
      <div ref={ref} aria-hidden>
        <MeshStage image="/art/product/workflows-backdrop.webp" className={STAGE}>
          <div className="relative w-full max-w-[33rem]">
            <div className={cn(CARD, "overflow-hidden text-[12.5px]")}>
              <div className="flex items-center justify-between gap-3 border-b border-white/8 px-4 py-3">
                <span className="flex items-center gap-2">
                  <WebhooksLogoIcon className="size-4 text-white/60" />
                  Webhook deliveries
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-[#28c840]/15 px-2 py-0.5 text-[11px] text-[#7ee2a8]">
                  <span className="size-1.5 rounded-full bg-current" />
                  Active
                </span>
              </div>
              <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5 font-mono text-[11.5px] text-white/55">
                POST <span className="text-white/85">https://hooks.halden.example/hooman</span>
              </div>

              {/* The call's timeline, with where each event fires */}
              <div className="border-b border-white/8 px-4 pt-4 pb-7">
                <div className="flex justify-between text-[11px] text-white/50">
                  <span>Call with Maya Patel</span>
                  <span className="font-mono">4:11</span>
                </div>
                <div className="relative mx-1.5 mt-3 h-1 rounded-full bg-white/10">
                  <span className="absolute inset-y-0 left-[62%] w-[35%] rounded-full bg-[#82aaff]/35" />
                  {EVENTS.map((e) => (
                    <span key={e.name} className={cn("absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-[3px] ring-[#0e0e10] transition-opacity", DOT[e.kind], e.kind === active ? "opacity-100" : "opacity-40")} style={{ left: `${e.x}%` }} />
                  ))}
                  <span className="absolute top-3 left-[29%] -translate-x-1/2 text-[10.5px] text-white/45">Mid-call</span>
                  <span className="absolute top-3 left-[80%] -translate-x-1/2 text-[10.5px] text-white/45">Transfer to Priya</span>
                </div>
              </div>

              <ul className="flex flex-col py-1.5">
                {EVENTS.map((e) => {
                  const on = e.name === picked
                  return (
                    <li key={e.name} className={cn("mx-1.5 flex items-center gap-3 rounded-lg px-2.5 py-2 transition-colors", on && "bg-white/8")}>
                      <span className={cn("size-1.5 shrink-0 rounded-full", DOT[e.kind])} />
                      <span className={cn("font-mono text-[12px]", !on && e.kind !== active && "text-white/55")}>{e.name}</span>
                      <span className="ml-auto font-mono text-[11px] text-white/40 tabular-nums">{e.at}</span>
                      <span className="flex items-center gap-1 rounded-full bg-[#28c840]/12 px-1.5 py-px text-[10.5px] text-[#7ee2a8]">
                        <CheckIcon weight="bold" className="size-2.5" />
                        200
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* The selected event's payload */}
            <div key={picked} className={cn(CARD, "absolute -right-6 -bottom-8 hidden w-[15.5rem] p-3.5 motion-safe:animate-[lang-in_400ms_ease-out] lg:block")}>
              <span className="flex items-center gap-1.5 text-[11px] text-white/55">
                {active === "transfer" ? <ArrowsLeftRightIcon className="size-3" /> : <WebhooksLogoIcon className="size-3" />}
                {picked}
              </span>
              <pre className="mt-2 font-mono text-[11px] leading-[1.7]">
                <span className="text-white/45">{"{"}</span>
                {PAYLOAD[picked].map(([k, v]) => (
                  <div key={k} className="pl-3">
                    <span className="text-[#82aaff]">&quot;{k}&quot;</span>
                    <span className="text-white/45">: </span>
                    <span className={v.startsWith('"') ? "text-[#c3e88d]" : "text-[#f78c6c]"}>{v}</span>
                  </div>
                ))}
                <span className="text-white/45">{"}"}</span>
              </pre>
            </div>
          </div>
        </MeshStage>
      </div>
    </DemoPanel>
  )
}
