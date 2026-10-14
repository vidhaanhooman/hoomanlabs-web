import { cn } from "@/lib/utils"

/**
 * A Flow, recreated from the console's canvas: agent, condition and code
 * nodes with their tabs, ports and wires, dashed loop-backs, one condition's
 * If / Else, and the selected node outlined. Fictional Halden Energy billing
 * flow. The SVG fills its box from the left and is cropped on the right, as
 * if the canvas carries on.
 */

type Kind = "agent" | "cond" | "js"
type N = { id: string; x: number; y: number; label: string; kind: Kind }

const W = 250
const H = 52

const NODES: N[] = [
  { id: "identify", x: 20, y: 90, label: "identify_caller", kind: "agent" },
  { id: "collect", x: 20, y: 200, label: "collect_account_number", kind: "agent" },
  { id: "verify", x: 20, y: 310, label: "verify_identity", kind: "agent" },
  { id: "routing", x: 330, y: 120, label: "routing", kind: "agent" },
  { id: "disputed", x: 330, y: 230, label: "is_disputed", kind: "cond" },
  { id: "fetch", x: 330, y: 340, label: "fetch_account", kind: "js" },
  { id: "disclosure", x: 640, y: 40, label: "dispute_disclosure", kind: "agent" },
  { id: "payment", x: 640, y: 150, label: "take_payment_flow", kind: "agent" },
  { id: "plan", x: 640, y: 260, label: "payment_plan", kind: "agent" },
  { id: "transfer", x: 640, y: 370, label: "transfer_to_billing", kind: "agent" },
  { id: "end", x: 950, y: 200, label: "end_call", kind: "agent" },
]

const EDGES: { from: string; to: string; label?: string; on?: boolean }[] = [
  { from: "identify", to: "routing" },
  { from: "verify", to: "routing" },
  { from: "collect", to: "fetch" },
  { from: "routing", to: "disputed" },
  { from: "routing", to: "plan" },
  { from: "disputed", to: "disclosure", label: "If", on: true },
  { from: "disputed", to: "payment", label: "Else" },
  { from: "fetch", to: "transfer" },
  { from: "payment", to: "end" },
  { from: "plan", to: "end" },
]

const SELECTED = "disclosure"
const by = Object.fromEntries(NODES.map((n) => [n.id, n]))
const LINE = "oklch(1 0 0 / 0.26)"

function wire(a: N, b: N) {
  const x1 = a.x + W
  const y1 = a.y + 16
  const x2 = b.x
  const y2 = b.y + H / 2
  const mx = (x1 + x2) / 2
  return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`
}

function Icon({ kind, x, y }: { kind: Kind; x: number; y: number }) {
  if (kind === "js")
    return (
      <g>
        <rect x={x} y={y - 6} width={13} height={12} rx={2.5} fill="oklch(0.78 0.15 75)" />
        <text x={x + 6.5} y={y + 3} fontSize={6.5} fontWeight={700} textAnchor="middle" fill="oklch(0.2 0 0)">
          JS
        </text>
      </g>
    )
  if (kind === "cond")
    return (
      <path d={`M${x + 2},${y - 5} L${x + 6.5},${y + 1} L${x + 11},${y - 5} M${x + 6.5},${y + 1} L${x + 6.5},${y + 6}`} fill="none" stroke="oklch(0.68 0.16 290)" strokeWidth={1.6} strokeLinecap="round" />
    )
  return <path d={`M${x + 6.5},${y - 6} L${x + 8},${y - 1.5} L${x + 12.5},${y} L${x + 8},${y + 1.5} L${x + 6.5},${y + 6} L${x + 5},${y + 1.5} L${x + 0.5},${y} L${x + 5},${y - 1.5} Z`} fill="oklch(0.68 0.13 245)" />
}

function Node({ n }: { n: N }) {
  const sel = n.id === SELECTED
  const tabs = n.kind === "agent" ? ["Prompt", "Tools", "Voice", "Turn"] : ["Config"]
  return (
    <g transform={`translate(${n.x},${n.y})`}>
      <rect width={W} height={H} rx={8} fill="oklch(0.17 0 0)" stroke={sel ? "oklch(0.95 0 0)" : "oklch(1 0 0 / 0.14)"} strokeWidth={sel ? 1.4 : 1} />
      <text x={12} y={20} fontSize={10} fill="oklch(1 0 0 / 0.4)">
        ›
      </text>
      <Icon kind={n.kind} x={22} y={16} />
      <text x={41} y={20} fontSize={11} fill="oklch(0.95 0 0)">
        {n.label}
      </text>
      <text x={W - 34} y={20} fontSize={10} fill="oklch(1 0 0 / 0.4)">
        ✎ ···
      </text>
      {tabs.map((t, i) => (
        <text key={t} x={12 + i * 40} y={41} fontSize={10} fill="oklch(1 0 0 / 0.55)">
          {t}
        </text>
      ))}
      {/* ports */}
      <circle cx={0} cy={H / 2} r={3} fill="oklch(0.17 0 0)" stroke="oklch(1 0 0 / 0.45)" />
      {[16, 26, 36].slice(0, n.kind === "cond" ? 2 : 3).map((y) => (
        <circle key={y} cx={W} cy={y} r={3} fill="oklch(0.17 0 0)" stroke="oklch(1 0 0 / 0.45)" />
      ))}
    </g>
  )
}

export function FlowMapScreen({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("ui-dark absolute inset-0 overflow-hidden bg-[oklch(0.12_0_0)] font-sans", className)}>
      <svg viewBox="0 0 1220 520" preserveAspectRatio="xMinYMid slice" className="size-full">
        {/* dashed loop-backs, routed under the canvas */}
        {[
          "M270,252 h14 v228 h-276 v-232 h12",
          "M270,362 h24 v130 h-286",
          "M580,382 h20 v110 h-310",
          "M890,312 h20 v196 h-930",
        ].map((d) => (
          <path key={d} d={d} fill="none" stroke="oklch(1 0 0 / 0.16)" strokeDasharray="4 4" />
        ))}
        {EDGES.map((e) => (
          <path key={e.from + e.to} d={wire(by[e.from], by[e.to])} fill="none" stroke={e.on ? "oklch(0.95 0 0)" : LINE} strokeWidth={e.on ? 1.4 : 1.1} markerEnd={e.on ? "url(#flow-arrow)" : undefined} />
        ))}
        <defs>
          <marker id="flow-arrow" viewBox="0 0 8 8" refX={7} refY={4} markerWidth={7} markerHeight={7} orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="oklch(0.95 0 0)" />
          </marker>
        </defs>
        {EDGES.filter((e) => e.label).map((e) => {
          const a = by[e.from]
          const b = by[e.to]
          const x = (a.x + W + b.x) / 2
          const y = (a.y + 16 + b.y + H / 2) / 2
          return (
            <g key={`l-${e.to}`} transform={`translate(${x - 16},${y - 9})`}>
              <rect width={32} height={18} rx={4} fill="oklch(0.2 0 0)" stroke="oklch(1 0 0 / 0.2)" />
              <text x={16} y={12.5} fontSize={9.5} textAnchor="middle" fill="oklch(1 0 0 / 0.75)" fontFamily="var(--font-mono)">
                {e.label}
              </text>
            </g>
          )
        })}
        {NODES.map((n) => (
          <Node key={n.id} n={n} />
        ))}
      </svg>
    </div>
  )
}
