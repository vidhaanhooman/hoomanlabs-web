"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * Node-graph canvases recreated from the product: the workflow editor and the
 * agent flow builder. Drawn in SVG on a fixed viewBox so the whole graph
 * scales with its tile. Dots travel along the edges (and the agent flow walks
 * its nodes) while visible; reduced motion shows the still graph.
 * Fictional demo data.
 */

type Kind = "input" | "js" | "http" | "cond" | "output" | "agent"
type Node = { id: string; x: number; y: number; label: string; kind: Kind; tabs: string[]; issue?: "warn" | "error" }
type Edge = { from: string; to: string; label?: string; dashed?: boolean }

const W_NODE = 176
const H_NODE = 52

const BG =
  "bg-[oklch(0.13_0_0)] [background-image:radial-gradient(oklch(1_0_0/0.09)_1px,transparent_1px)] [background-size:16px_16px]"

function edgePath(a: Node, b: Node, w = W_NODE, h = H_NODE) {
  const x1 = a.x + w
  const y1 = a.y + h / 2
  const x2 = b.x
  const y2 = b.y + h / 2
  const dx = Math.max(40, (x2 - x1) / 2)
  return `M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`
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
      <g fill="none" stroke="oklch(0.72 0.14 295)" strokeWidth={1.5} strokeLinecap="round">
        <path d={`M${x + 2},${y - 5} L${x + 6.5},${y + 1} L${x + 11},${y - 5} M${x + 6.5},${y + 1} L${x + 6.5},${y + 6}`} />
      </g>
    )
  if (kind === "output")
    return (
      <path
        d={`M${x + 11},${y - 4} A6 6 0 1 0 ${x + 12},${y + 3}`}
        fill="none"
        stroke="oklch(0.74 0.16 150)"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    )
  // input (bolt) and agent (sparkle) share the blue
  if (kind === "input")
    return <path d={`M${x + 7},${y - 7} L${x + 2},${y + 1} L${x + 6},${y + 1} L${x + 5},${y + 7} L${x + 11},${y - 1} L${x + 7},${y - 1} Z`} fill="oklch(0.7 0.14 250)" />
  return (
    <path
      d={`M${x + 6.5},${y - 7} L${x + 8.3},${y - 1.8} L${x + 13},${y} L${x + 8.3},${y + 1.8} L${x + 6.5},${y + 7} L${x + 4.7},${y + 1.8} L${x},${y} L${x + 4.7},${y - 1.8} Z`}
      fill="oklch(0.7 0.14 250)"
    />
  )
}

function NodeBox({ n, active, w = W_NODE }: { n: Node; active?: boolean; w?: number }) {
  return (
    <g transform={`translate(${n.x},${n.y})`}>
      <rect
        width={w}
        height={H_NODE}
        rx={7}
        fill="oklch(0.17 0 0)"
        stroke={n.issue === "error" ? "oklch(0.6 0.2 25)" : active ? "oklch(0.92 0 0)" : "oklch(0.32 0 0)"}
        strokeWidth={active ? 1.6 : 1}
        style={{ transition: "stroke 400ms" }}
      />
      <text x={12} y={21} fontSize={10} fill="oklch(0.55 0 0)">
        ›
      </text>
      <Icon kind={n.kind} x={24} y={17} />
      <text x={44} y={21.5} fontSize={12.5} fill="oklch(0.93 0 0)">
        {n.label.length > 19 ? `${n.label.slice(0, 18)}…` : n.label}
      </text>
      {n.tabs.map((t, i) => (
        <text key={t} x={12 + i * (n.tabs.length > 3 ? 40 : 46)} y={41} fontSize={10.5} fill="oklch(0.6 0 0)">
          {t}
        </text>
      ))}
      {n.issue && (
        <text x={w - 22} y={41} fontSize={10} fill={n.issue === "error" ? "oklch(0.65 0.2 25)" : "oklch(0.78 0.15 70)"}>
          {n.issue === "error" ? "⊘" : "⚠"} 1
        </text>
      )}
      {/* ports */}
      <circle cx={0} cy={H_NODE / 2} r={3} fill="oklch(0.17 0 0)" stroke="oklch(0.6 0 0)" />
      <circle cx={w} cy={H_NODE / 2} r={3} fill="oklch(0.17 0 0)" stroke="oklch(0.6 0 0)" />
    </g>
  )
}

function EdgeLabel({ x, y, text }: { x: number; y: number; text: string }) {
  const w = text.length * 6.4 + 10
  return (
    <g transform={`translate(${x - w / 2},${y - 8})`}>
      <rect width={w} height={16} rx={3} fill="oklch(0.15 0 0)" stroke="oklch(0.35 0 0)" />
      <text x={w / 2} y={11.5} fontSize={9.5} textAnchor="middle" fill="oklch(0.75 0 0)" fontFamily="var(--font-mono, monospace)">
        {text}
      </text>
    </g>
  )
}

function useLive<T extends Element>() {
  const ref = useRef<T>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const reduce = usePrefersReducedMotion()
  return { ref, live: inView && !reduce }
}

/* ------------------------------------------------------------ workflow */

const WF_NODES: Node[] = [
  { id: "in", x: 10, y: 194, label: "Input", kind: "input", tabs: ["Config", "Settings"] },
  { id: "auth", x: 210, y: 194, label: "AUTH", kind: "js", tabs: ["Inputs", "Config", "Settings"], issue: "warn" },
  { id: "det", x: 420, y: 28, label: "detractor_payload", kind: "js", tabs: ["Inputs", "Config", "Settings"] },
  { id: "cb", x: 420, y: 112, label: "check_callback", kind: "cond", tabs: ["Inputs", "Config", "Settings"] },
  { id: "end", x: 420, y: 194, label: "call_end", kind: "http", tabs: ["Inputs", "Config", "Settings"], issue: "warn" },
  { id: "rec", x: 420, y: 276, label: "recording", kind: "http", tabs: ["Inputs", "Config", "Settings"], issue: "error" },
  { id: "sum", x: 420, y: 360, label: "summary_payload", kind: "js", tabs: ["Inputs", "Config", "Settings"] },
  { id: "push", x: 630, y: 28, label: "push_detractor", kind: "http", tabs: ["Inputs", "Config", "Settings"] },
  { id: "cbp", x: 630, y: 112, label: "callback_payload", kind: "js", tabs: ["Inputs", "Config", "Settings"] },
  { id: "summ", x: 630, y: 360, label: "summary", kind: "http", tabs: ["Inputs", "Config", "Settings"], issue: "warn" },
  { id: "out", x: 820, y: 194, label: "Output", kind: "output", tabs: ["Inputs", "Config"] },
]

const WF_EDGES: Edge[] = [
  { from: "in", to: "auth" },
  { from: "auth", to: "det" },
  { from: "auth", to: "cb" },
  { from: "auth", to: "end" },
  { from: "auth", to: "rec" },
  { from: "auth", to: "sum" },
  { from: "det", to: "push", label: "If" },
  { from: "cb", to: "cbp", label: "If" },
  { from: "sum", to: "summ" },
  { from: "push", to: "out" },
  { from: "cbp", to: "out" },
  { from: "end", to: "out" },
  { from: "rec", to: "out" },
  { from: "summ", to: "out" },
]

/** Routes a "run" takes through the graph; one dot per route, staggered. */
const WF_ROUTES = [
  ["in", "auth", "end", "out"],
  ["in", "auth", "sum", "summ", "out"],
  ["in", "auth", "cb", "cbp", "out"],
  ["in", "auth", "det", "push", "out"],
]

export function WorkflowCanvas({ className }: { className?: string }) {
  const { ref, live } = useLive<HTMLDivElement>()
  const byId = Object.fromEntries(WF_NODES.map((n) => [n.id, n]))
  const route = (ids: string[]) =>
    ids
      .slice(1)
      .map((id, i) => edgePath(byId[ids[i]], byId[id]))
      .map((d, i) => (i === 0 ? d : d.replace(/^M[^C]+/, "L" + d.match(/^M([^C]+)/)![1].trim() + " ")))
      .join(" ")
  return (
    <div ref={ref} aria-hidden className={cn("overflow-hidden", BG, className)}>
      <svg viewBox="0 0 1006 440" className="block h-auto w-full font-sans">
        <g fill="none" stroke="oklch(0.45 0 0)" strokeWidth={1.1}>
          {WF_EDGES.map((e) => (
            <path key={`${e.from}-${e.to}`} d={edgePath(byId[e.from], byId[e.to])} />
          ))}
        </g>
        {WF_EDGES.filter((e) => e.label).map((e) => {
          const a = byId[e.from]
          const b = byId[e.to]
          return <EdgeLabel key={`l-${e.from}`} x={(a.x + W_NODE + b.x) / 2} y={(a.y + b.y) / 2 + H_NODE / 2} text={e.label!} />
        })}
        {WF_NODES.map((n) => (
          <NodeBox key={n.id} n={n} />
        ))}
        {live &&
          WF_ROUTES.map((r, i) => (
            <circle key={i} r={3.5} fill="oklch(0.85 0.12 150)" opacity={0}>
              <animateMotion dur="4.8s" begin={`${i * 1.2}s`} repeatCount="indefinite" path={route(r)} />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.05;0.92;1" dur="4.8s" begin={`${i * 1.2}s`} repeatCount="indefinite" />
            </circle>
          ))}
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------ agent builder */

const AG_W = 236
const AG_NODES: Node[] = [
  { id: "start", x: 20, y: 30, label: "Start", kind: "agent", tabs: ["Prompt", "Tools", "Voice", "Turn"] },
  { id: "cond", x: 150, y: 170, label: "order_identification_condition", kind: "cond", tabs: ["Config"] },
  { id: "ident", x: 470, y: 40, label: "order_identification", kind: "agent", tabs: ["Prompt", "Tools", "Voice", "Turn"] },
  { id: "verify", x: 440, y: 300, label: "collect_and_verify_number", kind: "agent", tabs: ["Prompt", "Tools", "Voice", "Turn"] },
  { id: "route", x: 520, y: 180, label: "routing", kind: "agent", tabs: ["Prompt", "Tools", "Voice", "Turn"] },
  { id: "fetch", x: 90, y: 400, label: "fetch_order_history", kind: "js", tabs: ["Config"] },
]

const AG_EDGES: Edge[] = [
  { from: "start", to: "cond", label: "get_orders" },
  { from: "cond", to: "ident" },
  { from: "cond", to: "verify" },
  { from: "verify", to: "ident" },
  { from: "ident", to: "route" },
  { from: "verify", to: "fetch", dashed: true },
]

const AG_WALK = ["start", "cond", "verify", "ident", "route"]

export function AgentFlowCanvas({ className }: { className?: string }) {
  const { ref, live } = useLive<HTMLDivElement>()
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (!live) return
    const t = setInterval(() => setStep((s) => (s + 1) % AG_WALK.length), 1400)
    return () => clearInterval(t)
  }, [live])
  const byId = Object.fromEntries(AG_NODES.map((n) => [n.id, n]))
  const active = AG_WALK[step]
  return (
    <div ref={ref} aria-hidden className={cn("overflow-hidden", BG, className)}>
      <svg viewBox="0 0 780 480" className="block h-full w-full font-sans" preserveAspectRatio="xMidYMid meet">
        <g fill="none" strokeWidth={1.1}>
          {AG_EDGES.map((e) => (
            <path
              key={`${e.from}-${e.to}`}
              d={edgePath(byId[e.from], byId[e.to], AG_W)}
              stroke={AG_WALK[step - 1] === e.from && active === e.to ? "oklch(0.85 0.12 150)" : "oklch(0.45 0 0)"}
              strokeDasharray={e.dashed ? "4 4" : undefined}
              style={{ transition: "stroke 400ms" }}
            />
          ))}
        </g>
        <EdgeLabel x={byId.start.x + AG_W + 20} y={115} text="get_orders" />
        {AG_NODES.map((n) => (
          <NodeBox key={n.id} n={n} w={AG_W} active={live && n.id === active} />
        ))}
      </svg>
    </div>
  )
}

/** The node editor panel beside the canvas (Start node, Prompt tab). */
export function AgentNodeEditor({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("ui-dark flex flex-col overflow-hidden text-[11px] leading-snug", className)}>
      <div className="flex items-center gap-2 border-b border-(--ui-line) px-3.5 py-2.5">
        <span className="text-[oklch(0.7_0.14_250)]">✦</span>
        <span className="text-[13px] font-medium text-(--ui-text)">Start</span>
        <span className="font-mono text-(--ui-muted)">id: start</span>
      </div>
      <div className="flex gap-4 border-b border-(--ui-line) px-3.5 pt-2">
        {["Prompt", "Tools", "Voice", "Turn"].map((t, i) => (
          <span
            key={t}
            className={cn("pb-2", i === 0 ? "border-b border-(--ui-text) text-(--ui-text)" : "text-(--ui-muted)")}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-3 overflow-hidden p-3.5">
        <div className="rounded-md border border-(--ui-line) bg-(--ui-panel) p-3">
          <div className="mb-1.5 flex items-center gap-2">
            <span className="font-medium text-(--ui-text)">Global instructions</span>
            <span className="rounded-full bg-[oklch(0.3_0.08_280)] px-1.5 text-[10px] text-[oklch(0.82_0.08_280)]">Read only</span>
          </div>
          <p className="text-[12px] font-medium text-(--ui-text)">Role</p>
          <p className="text-(--ui-muted)">
            You are Ria, an AI customer service agent for Halden Energy. You take inbound calls and help customers with
            their bills and orders.
          </p>
        </div>
        <div>
          <p className="font-medium text-(--ui-text)">Node instructions</p>
          <p className="text-(--ui-muted)">Applies to this node only, on top of the global instructions.</p>
        </div>
        <div className="flex flex-col gap-1.5 rounded-md border border-(--ui-line) bg-(--ui-panel) p-3">
          <p className="text-[13px] font-medium text-(--ui-text)">Call Flow.</p>
          <p className="font-medium text-(--ui-text)">STEP 1 : Introduction and language</p>
          <ul className="list-disc pl-4 text-(--ui-muted)">
            <li>Greet, say who you are, and ask which language they are comfortable in.</li>
            <li>If they name a language, continue in it.</li>
          </ul>
          <p className="font-medium text-(--ui-text)">STEP 2 : Ask the problem</p>
          <div className="flex gap-2 rounded bg-(--ui-raised) px-2 py-1 font-mono text-[10.5px]">
            <span className="text-(--ui-muted)">IF</span>
            <span className="text-[oklch(0.75_0.12_250)]">
              has(context.calls) <span className="text-(--ui-muted)">&amp;&amp;</span> context.calls &gt;= 1
            </span>
          </div>
          <p className="text-(--ui-muted)">Acknowledge the earlier call and ask whether this is the same concern.</p>
        </div>
      </div>
    </div>
  )
}
