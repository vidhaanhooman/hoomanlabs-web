"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * Node-graph canvases recreated from the product, each playing a short story
 * step by step: the agent builder walks a live call through its nodes (the
 * editor beside it follows), and the workflow runs after a call ends, node by
 * node, until the results are synced. SVG on a fixed viewBox, so the graph
 * scales with its tile. Reduced motion shows the finished state.
 * Fictional demo data.
 */

type Kind = "input" | "js" | "http" | "cond" | "output" | "agent"
type Node = { id: string; x: number; y: number; label: string; kind: Kind; tabs: string[] }
type Edge = { from: string; to: string; label?: string; dashed?: boolean }
type State = "idle" | "active" | "done"

const H = 52
const LIVE = "oklch(0.78 0.15 150)"

const BG =
  "bg-[oklch(0.13_0_0)] [background-image:radial-gradient(oklch(1_0_0/0.09)_1px,transparent_1px)] [background-size:16px_16px]"

function path(a: Node, b: Node, w: number) {
  const x1 = a.x + w
  const y1 = a.y + H / 2
  const x2 = b.x
  const y2 = b.y + H / 2
  const dx = Math.max(30, (x2 - x1) / 2)
  return `M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`
}

/** Runs a step counter while the canvas is on screen. */
function useSteps(count: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.35 })
  const reduce = usePrefersReducedMotion()
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (!inView || reduce) return
    const t = setInterval(() => setStep((s) => (s + 1) % count), ms)
    return () => clearInterval(t)
  }, [inView, reduce, count, ms])
  return { ref, step: reduce ? count - 1 : step }
}

function Icon({ kind, x, y }: { kind: Kind; x: number; y: number }) {
  if (kind === "js")
    return (
      <g>
        <rect x={x} y={y - 6} width={13} height={13} rx={2.5} fill="oklch(0.83 0.16 85)" />
        <text x={x + 6.5} y={y + 4} fontSize={7} fontWeight={700} textAnchor="middle" fill="oklch(0.2 0 0)">
          JS
        </text>
      </g>
    )
  if (kind === "http")
    return (
      <g fill="none" stroke="oklch(0.85 0 0)" strokeWidth={1.3}>
        <circle cx={x + 6.5} cy={y + 0.5} r={6} />
        <ellipse cx={x + 6.5} cy={y + 0.5} rx={2.6} ry={6} />
        <line x1={x + 0.5} y1={y + 0.5} x2={x + 12.5} y2={y + 0.5} />
      </g>
    )
  if (kind === "cond")
    return (
      <path
        d={`M${x + 2},${y - 5} L${x + 6.5},${y + 1} L${x + 11},${y - 5} M${x + 6.5},${y + 1} L${x + 6.5},${y + 6}`}
        fill="none"
        stroke="oklch(0.72 0.14 295)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    )
  if (kind === "output")
    return (
      <path d={`M${x + 11},${y - 4} A6 6 0 1 0 ${x + 12},${y + 3}`} fill="none" stroke={LIVE} strokeWidth={1.6} strokeLinecap="round" />
    )
  if (kind === "input")
    return <path d={`M${x + 7},${y - 7} L${x + 2},${y + 1} L${x + 6},${y + 1} L${x + 5},${y + 7} L${x + 11},${y - 1} L${x + 7},${y - 1} Z`} fill="oklch(0.7 0.14 250)" />
  return (
    <path
      d={`M${x + 6.5},${y - 7} L${x + 8.3},${y - 1.8} L${x + 13},${y} L${x + 8.3},${y + 1.8} L${x + 6.5},${y + 7} L${x + 4.7},${y + 1.8} L${x},${y} L${x + 4.7},${y - 1.8} Z`}
      fill="oklch(0.7 0.14 250)"
    />
  )
}

function NodeBox({ n, w, state }: { n: Node; w: number; state: State }) {
  const max = Math.floor((w - 56) / 7)
  return (
    <g transform={`translate(${n.x},${n.y})`} opacity={state === "idle" ? 0.55 : 1} style={{ transition: "opacity 400ms" }}>
      <rect
        width={w}
        height={H}
        rx={7}
        fill="oklch(0.17 0 0)"
        stroke={state === "active" ? "oklch(0.95 0 0)" : state === "done" ? "oklch(0.5 0.08 150)" : "oklch(0.32 0 0)"}
        strokeWidth={state === "active" ? 1.6 : 1}
        style={{ transition: "stroke 400ms" }}
      />
      <Icon kind={n.kind} x={12} y={17} />
      <text x={32} y={21.5} fontSize={12.5} fill="oklch(0.93 0 0)">
        {n.label.length > max ? `${n.label.slice(0, max - 1)}…` : n.label}
      </text>
      {n.tabs.map((t, i) => (
        <text key={t} x={12 + i * (n.tabs.length > 3 ? 38 : 46)} y={41} fontSize={10.5} fill="oklch(0.6 0 0)">
          {t}
        </text>
      ))}
      {/* state badge */}
      {state === "active" && (
        <g transform={`translate(${w - 14},14)`}>
          <circle r={4} fill={LIVE}>
            <animate attributeName="r" values="3;5.5;3" dur="1.1s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.4;1" dur="1.1s" repeatCount="indefinite" />
          </circle>
        </g>
      )}
      {state === "done" && (
        <g transform={`translate(${w - 14},14)`}>
          <circle r={6} fill="oklch(0.4 0.1 150)" />
          <path d="M-2.5,0 L-0.5,2 L3,-2" fill="none" stroke="oklch(0.95 0 0)" strokeWidth={1.4} strokeLinecap="round" />
        </g>
      )}
      <circle cx={0} cy={H / 2} r={3} fill="oklch(0.17 0 0)" stroke="oklch(0.6 0 0)" />
      <circle cx={w} cy={H / 2} r={3} fill="oklch(0.17 0 0)" stroke="oklch(0.6 0 0)" />
    </g>
  )
}

function EdgeLabel({ x, y, text, on }: { x: number; y: number; text: string; on?: boolean }) {
  const w = text.length * 6.4 + 10
  return (
    <g transform={`translate(${x - w / 2},${y - 8})`}>
      <rect width={w} height={16} rx={3} fill="oklch(0.15 0 0)" stroke={on ? LIVE : "oklch(0.35 0 0)"} style={{ transition: "stroke 400ms" }} />
      <text x={w / 2} y={11.5} fontSize={9.5} textAnchor="middle" fill={on ? LIVE : "oklch(0.75 0 0)"} fontFamily="var(--font-mono, monospace)">
        {text}
      </text>
    </g>
  )
}

/** An edge: grey when idle, flowing dashes while active, solid once passed. */
function EdgeLine({ d, state, dashed }: { d: string; state: State; dashed?: boolean }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={state === "idle" ? "oklch(0.36 0 0)" : state === "active" ? LIVE : "oklch(0.55 0.06 150)"}
      strokeWidth={state === "active" ? 1.8 : 1.1}
      strokeDasharray={state === "active" ? "6 5" : dashed ? "4 4" : undefined}
      className={state === "active" ? "flow-dash" : undefined}
      style={{ transition: "stroke 300ms" }}
    />
  )
}

/* ------------------------------------------------------------ workflow */

const WF_W = 180
const WF_NODES: (Node & { stage: number })[] = [
  { id: "in", x: 20, y: 188, label: "call.ended", kind: "input", tabs: ["Config", "Settings"], stage: 0 },
  { id: "auth", x: 265, y: 188, label: "AUTH", kind: "js", tabs: ["Inputs", "Config"], stage: 1 },
  { id: "det", x: 510, y: 24, label: "detractor_payload", kind: "js", tabs: ["Inputs", "Config"], stage: 2 },
  { id: "cb", x: 510, y: 106, label: "check_callback", kind: "cond", tabs: ["Inputs", "Config"], stage: 2 },
  { id: "end", x: 510, y: 188, label: "call_end", kind: "http", tabs: ["Inputs", "Config"], stage: 2 },
  { id: "rec", x: 510, y: 270, label: "recording", kind: "http", tabs: ["Inputs", "Config"], stage: 2 },
  { id: "sum", x: 510, y: 352, label: "summary_payload", kind: "js", tabs: ["Inputs", "Config"], stage: 2 },
  { id: "push", x: 755, y: 24, label: "push_to_CRM", kind: "http", tabs: ["Inputs", "Config"], stage: 3 },
  { id: "cbp", x: 755, y: 106, label: "book_callback", kind: "http", tabs: ["Inputs", "Config"], stage: 3 },
  { id: "summ", x: 755, y: 352, label: "send_summary", kind: "http", tabs: ["Inputs", "Config"], stage: 3 },
  { id: "out", x: 1000, y: 188, label: "Output", kind: "output", tabs: ["Inputs", "Config"], stage: 4 },
]

const WF_EDGES: Edge[] = [
  { from: "in", to: "auth" },
  { from: "auth", to: "det" },
  { from: "auth", to: "cb" },
  { from: "auth", to: "end" },
  { from: "auth", to: "rec" },
  { from: "auth", to: "sum" },
  { from: "det", to: "push" },
  { from: "cb", to: "cbp", label: "If" },
  { from: "sum", to: "summ" },
  { from: "push", to: "out" },
  { from: "cbp", to: "out" },
  { from: "end", to: "out" },
  { from: "rec", to: "out" },
  { from: "summ", to: "out" },
]

const WF_STATUS = [
  "Call with Priya ended · 3:42",
  "Authenticating",
  "5 steps running in parallel",
  "Updating CRM, booking callback, sending summary",
  "Writing results",
  "Done in 1.4s · CRM updated · callback Fri 10:00 · summary sent",
]

export function WorkflowCanvas({ className }: { className?: string }) {
  const { ref, step } = useSteps(WF_STATUS.length + 1, 1200)
  const stage = Math.min(step, WF_STATUS.length - 1)
  const byId = Object.fromEntries(WF_NODES.map((n) => [n.id, n]))
  const nodeState = (s: number): State => (s < stage ? "done" : s === stage ? (stage === 5 ? "done" : "active") : "idle")
  return (
    <div ref={ref} aria-hidden className={cn("relative overflow-hidden", BG, className)}>
      <div className="absolute top-2.5 left-3 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 font-mono text-[10px] text-white/80 backdrop-blur">
        <span className={cn("size-1.5 rounded-full", stage === 5 ? "bg-[oklch(0.78_0.15_150)]" : "bg-[oklch(0.8_0.14_80)] motion-safe:animate-pulse")} />
        <span key={stage} className="motion-safe:animate-[reveal-blur_350ms_var(--ease-out)_both]">
          {WF_STATUS[stage]}
        </span>
      </div>
      <svg viewBox="0 0 1200 430" className="block h-auto w-full font-sans">
        {WF_EDGES.map((e) => (
          <EdgeLine key={`${e.from}-${e.to}`} d={path(byId[e.from], byId[e.to], WF_W)} state={nodeState(byId[e.to].stage)} />
        ))}
        {WF_EDGES.filter((e) => e.label).map((e) => {
          const a = byId[e.from]
          const b = byId[e.to]
          return (
            <EdgeLabel key={`l-${e.from}`} x={(a.x + WF_W + b.x) / 2} y={(a.y + b.y) / 2 + H / 2} text={e.label!} on={stage >= b.stage} />
          )
        })}
        {WF_NODES.map((n) => (
          <NodeBox key={n.id} n={n} w={WF_W} state={nodeState(n.stage)} />
        ))}
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------ agent builder */

const AG_W = 172
const AG_NODES: Node[] = [
  { id: "start", x: 20, y: 214, label: "Start", kind: "agent", tabs: ["Prompt", "Tools", "Voice", "Turn"] },
  { id: "cond", x: 252, y: 214, label: "order_on_file?", kind: "cond", tabs: ["Config"] },
  { id: "verify", x: 484, y: 350, label: "collect_and_verify", kind: "agent", tabs: ["Prompt", "Tools", "Voice", "Turn"] },
  { id: "fetch", x: 484, y: 452, label: "fetch_order_history", kind: "js", tabs: ["Config"] },
  { id: "ident", x: 716, y: 90, label: "order_identification", kind: "agent", tabs: ["Prompt", "Tools", "Voice", "Turn"] },
  { id: "route", x: 920, y: 214, label: "routing", kind: "agent", tabs: ["Prompt", "Tools", "Voice", "Turn"] },
]

const AG_EDGES: Edge[] = [
  { from: "start", to: "cond" },
  { from: "cond", to: "ident", label: "found" },
  { from: "cond", to: "verify", label: "missing" },
  { from: "verify", to: "ident" },
  { from: "ident", to: "route" },
]

type Beat = {
  node: string
  /** Edge that leads into this node, for the flowing highlight. */
  via?: string
  tab: string
  title: string
  lines: string[]
  code?: string
  say?: { who: "Agent" | "User" | "Tool"; text: string }
}

const BEATS: Beat[] = [
  {
    node: "start",
    tab: "Prompt",
    title: "STEP 1 : Introduction and language",
    lines: ["Greet, say who you are, and ask which language they are comfortable in.", "If they name a language, continue in it."],
    say: { who: "Agent", text: "Hi, this is Ria from Halden. Which language is easiest for you?" },
  },
  {
    node: "cond",
    via: "start>cond",
    tab: "Config",
    title: "Is there an order on file?",
    lines: ["Found: confirm the order.", "Missing: collect and verify the number first."],
    code: "has(context.order_id)",
    say: { who: "Tool", text: "get_orders · no order linked to this caller" },
  },
  {
    node: "verify",
    via: "cond>verify",
    tab: "Prompt",
    title: "Collect and verify the number",
    lines: ["Ask for the registered mobile number and read it back.", "Then look up their recent orders."],
    say: { who: "User", text: "It's 98765 43210." },
  },
  {
    node: "fetch",
    tab: "Tools",
    title: "fetch_order_history",
    lines: ["Runs mid-call with the verified number."],
    code: "orders = fetch(customer.phone)",
    say: { who: "Tool", text: "fetch_order_history · 2 orders found" },
  },
  {
    node: "ident",
    via: "verify>ident",
    tab: "Prompt",
    title: "Confirm the order",
    lines: ["Name the most recent order and ask if the call is about it."],
    say: { who: "Agent", text: "I can see your March order of two frames. Is it about that one?" },
  },
  {
    node: "route",
    via: "ident>route",
    tab: "Prompt",
    title: "Route the call",
    lines: ["Send delivery issues to the delivery flow, refunds to billing."],
    say: { who: "Agent", text: "It's out for delivery today. I'll text you the tracking link now." },
  },
]

/** Agent builder: editor (follows the active node) + flow canvas, playing one call. */
export function AgentBuilder({ className }: { className?: string }) {
  const { ref, step } = useSteps(BEATS.length + 1, 1900)
  const idx = Math.min(step, BEATS.length - 1)
  const beat = BEATS[idx]
  const reached = new Set(BEATS.slice(0, idx + 1).map((b) => b.node))
  const byId = Object.fromEntries(AG_NODES.map((n) => [n.id, n]))
  const nodeState = (id: string): State => (id === beat.node ? "active" : reached.has(id) ? "done" : "idle")
  const edgeState = (e: Edge): State => {
    const key = `${e.from}>${e.to}`
    if (beat.via === key) return "active"
    return BEATS.slice(0, idx).some((b) => b.via === key) ? "done" : "idle"
  }
  const n = byId[beat.node]
  const tabs = n.kind === "agent" ? ["Prompt", "Tools", "Voice", "Turn"] : ["Config"]

  return (
    <div ref={ref} aria-hidden className={cn("grid overflow-hidden md:grid-cols-[21rem_1fr]", className)}>
      {/* Editor: follows the active node */}
      <div className="ui-dark hidden flex-col overflow-hidden border-r border-white/10 text-[11px] leading-snug md:flex">
        <div className="flex items-center gap-2 border-b border-(--ui-line) px-3.5 py-2.5">
          <span className={n.kind === "cond" ? "text-[oklch(0.72_0.14_295)]" : n.kind === "js" ? "text-[oklch(0.83_0.16_85)]" : "text-[oklch(0.7_0.14_250)]"}>
            {n.kind === "cond" ? "⑂" : n.kind === "js" ? "JS" : "✦"}
          </span>
          <span className="text-[13px] font-medium text-(--ui-text)">
            {n.label}
          </span>
          <span className="font-mono text-(--ui-muted)">id: {n.id}</span>
        </div>
        <div className="flex gap-4 border-b border-(--ui-line) px-3.5 pt-2">
          {tabs.map((t) => (
            <span key={t} className={cn("pb-2", t === beat.tab ? "border-b border-(--ui-text) text-(--ui-text)" : "text-(--ui-muted)")}>
              {t}
            </span>
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-3.5">
          <div className="flex flex-col gap-1.5 rounded-md border border-(--ui-line) bg-(--ui-panel) p-3">
            <p className="text-[12.5px] font-medium text-(--ui-text)">{beat.title}</p>
            <ul className="list-disc pl-4 text-(--ui-muted)">
              {beat.lines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            {beat.code && (
              <div className="mt-1 flex gap-2 rounded bg-(--ui-raised) px-2 py-1 font-mono text-[10.5px]">
                <span className="text-(--ui-muted)">{n.kind === "cond" ? "IF" : "fn"}</span>
                <span className="text-[oklch(0.75_0.12_250)]">{beat.code}</span>
              </div>
            )}
          </div>
          {/* Live call: what's happening at this step */}
          <div className="mt-auto flex flex-col gap-1.5 rounded-md border border-(--ui-line) p-3">
            <span className="flex items-center gap-1.5 text-[10px] text-(--ui-muted)">
              <span className="size-1.5 rounded-full bg-[oklch(0.78_0.15_150)] motion-safe:animate-pulse" />
              Live call · step {idx + 1} of {BEATS.length}
            </span>
            {beat.say && (
              <p className="text-[12px] text-(--ui-text)">
                <span className="mr-1.5 text-(--ui-muted)">{beat.say.who}</span>
                {beat.say.text}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className={cn("relative aspect-[1110/530] md:aspect-auto", BG)}>
        <svg viewBox="0 0 1110 530" className="absolute inset-0 size-full font-sans" preserveAspectRatio="xMidYMid meet">
          {AG_EDGES.map((e) => (
            <EdgeLine key={`${e.from}-${e.to}`} d={path(byId[e.from], byId[e.to], AG_W)} state={edgeState(e)} />
          ))}
          {/* tool call: verify -> fetch, straight down */}
          <EdgeLine
            d={`M${byId.verify.x + AG_W / 2},${byId.verify.y + H} L${byId.fetch.x + AG_W / 2},${byId.fetch.y}`}
            state={beat.node === "fetch" ? "active" : idx > 3 ? "done" : "idle"}
            dashed
          />
          {AG_EDGES.filter((e) => e.label).map((e) => {
            const a = byId[e.from]
            const b = byId[e.to]
            return (
              <EdgeLabel
                key={`l-${e.from}-${e.to}`}
                x={(a.x + AG_W + b.x) / 2}
                y={(a.y + b.y) / 2 + H / 2}
                text={e.label!}
                on={edgeState(e) !== "idle"}
              />
            )
          })}
          {AG_NODES.map((node) => (
            <NodeBox key={node.id} n={node} w={AG_W} state={nodeState(node.id)} />
          ))}
        </svg>
      </div>
    </div>
  )
}
