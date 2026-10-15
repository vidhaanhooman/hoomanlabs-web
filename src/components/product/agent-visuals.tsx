import { CheckIcon, LightningIcon } from "@phosphor-icons/react/dist/ssr"

import { UiCard, UiPill, UiWindow } from "@/components/product/ui-window"
import { cn } from "@/lib/utils"

/**
 * Deep-dive visuals for /platform/agents (sample Halden Energy billing
 * agent). Node colours follow the console's "Add node" menu.
 */

const NODE = {
  branch: "oklch(0.6 0.16 295)",
  ai: "oklch(0.6 0.14 240)",
  fixed: "oklch(0.72 0.14 70)",
  api: "oklch(0.6 0.14 150)",
  human: "oklch(0.62 0.13 160)",
  end: "oklch(0.6 0.18 25)",
}

/** The billing flow as a light diagram: white step boxes on a dotted canvas. */
export function FlowsDiagram() {
  const W = 168
  const H = 52
  const steps = [
    { id: "start", x: 8, y: 92, kind: "Branch", name: "Check account", c: NODE.branch },
    { id: "talk", x: 214, y: 20, kind: "AI conversation", name: "Billing conversation", c: NODE.ai },
    { id: "disclose", x: 214, y: 164, kind: "Fixed conversation", name: "Compliance disclosure", c: NODE.fixed },
    { id: "pay", x: 420, y: 20, kind: "API", name: "Take payment", c: NODE.api },
    { id: "human", x: 420, y: 164, kind: "Transfer to human", name: "Transfer to billing", c: NODE.human },
    { id: "end", x: 626, y: 92, kind: "End call", name: "End call", c: NODE.end },
  ]
  const by = Object.fromEntries(steps.map((n) => [n.id, n]))
  const edges: [string, string, string?][] = [
    ["start", "talk", "balance due"],
    ["start", "disclose", "disputed"],
    ["talk", "pay"],
    ["disclose", "human"],
    ["pay", "end"],
    ["human", "end"],
  ]
  return (
    <svg aria-hidden viewBox="0 0 802 236" className="h-auto w-full">
      {edges.map(([a, b, label]) => {
        const p = by[a]
        const q = by[b]
        const x1 = p.x + W
        const y1 = p.y + H / 2
        const x2 = q.x
        const y2 = q.y + H / 2
        const mx = (x1 + x2) / 2
        return (
          <g key={a + b}>
            <path d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`} fill="none" stroke="var(--line-strong)" strokeWidth="1.5" />
            {label && (
              <text x={x1 + 6} y={y2 < y1 ? y1 - 10 : y1 + 20} fontSize="11" fill="var(--ink-muted)" fontFamily="var(--font-mono)">
                {label}
              </text>
            )}
          </g>
        )
      })}
      {steps.map((n) => (
        <foreignObject key={n.id} x={n.x} y={n.y} width={W} height={H}>
          <div className="flex h-full flex-col justify-center gap-0.5 rounded-md border border-line-strong bg-background px-3 shadow-[0_6px_16px_-10px_oklch(0.2_0_0/0.35)]">
            <span className="flex items-center gap-1.5 text-[10.5px] text-ink-muted">
              <span className="size-1.5 rounded-full" style={{ background: n.c }} />
              {n.kind}
            </span>
            <span className="truncate text-[12.5px] text-foreground">{n.name}</span>
          </div>
        </foreignObject>
      ))}
    </svg>
  )
}

function Line({ who, text, dim = false }: { who: string; text: string; dim?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-[10px] tracking-wide text-(--ui-muted) uppercase">{who}</span>
      <span className={cn("text-[13px]", dim ? "text-(--ui-text)/70" : "text-(--ui-text)")}>{text}</span>
    </div>
  )
}

/** A live call where the payment runs in the background while Ria keeps talking. */
export function LiveCallScreen({ className }: { className: string }) {
  return (
    <UiWindow className={className} title="Live call · Maya Patel" aside={<UiPill live>00:42</UiPill>}>
      <Line who="Caller" text="Can I just pay the $86.40 now?" dim />
      <Line who="Ria" text="Of course. I'm setting that up, one moment." />
      <UiCard className="border-[oklch(0.74_0.16_150/0.35)]">
        <div className="flex items-center gap-2">
          <LightningIcon weight="fill" className="size-3.5 text-[oklch(0.82_0.12_80)]" />
          <span className="font-medium">Take payment</span>
          <span className="font-mono text-[11px] text-(--ui-muted)">POST /payments</span>
          <span className="ml-auto flex items-center gap-1 text-(--ui-live)">
            <CheckIcon weight="bold" className="size-3" />
            1.2s
          </span>
        </div>
        <span className="text-[11px] text-(--ui-muted)">Ran in the background while Ria kept talking</span>
      </UiCard>
      <Line who="Ria" text="Done. $86.40 is paid and your receipt is on its way." />
    </UiWindow>
  )
}
