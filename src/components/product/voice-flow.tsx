"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { flow } from "@/content/voice-ai-lab"
import { cn } from "@/lib/utils"

/**
 * Voice AI hero: calls in, results out. Calls travel from their source into
 * the agent and out into an outcome lane; each lane keeps a running count.
 * Desktop draws the paths in SVG on a fixed 1000x400 canvas (HTML labels sit
 * at matching percentages); mobile stacks the same three columns.
 */

const W = 1000
const H = 400
const SRC_X = 230
const AGENT_L = 420
const AGENT_R = 580
const LANE_X = 740
const ROWS = [90, 200, 310]
const MID = 200

const inPath = (y: number) => `M${SRC_X},${y} C${SRC_X + 110},${y} ${AGENT_L - 110},${MID} ${AGENT_L},${MID}`
const outPath = (y: number) => `M${AGENT_R},${MID} C${AGENT_R + 90},${MID} ${LANE_X - 90},${y} ${LANE_X},${y}`
const fullPath = (a: number, b: number) =>
  `${inPath(ROWS[a])} L${AGENT_R},${MID} C${AGENT_R + 90},${MID} ${LANE_X - 90},${ROWS[b]} ${LANE_X},${ROWS[b]}`

// One loop of calls: [source row, lane row]. Mostly resolved, as in the shares.
const CALLS: [number, number][] = [
  [0, 0], [1, 0], [0, 1], [2, 0], [1, 0], [0, 0], [1, 2], [0, 0], [2, 0], [1, 1],
]
const DUR = 3.6 // seconds per call
const GAP = DUR / CALLS.length

const START = [8412, 1663, 1066]

function useCounts() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const reduce = usePrefersReducedMotion()
  const [counts, setCounts] = useState(START)
  useEffect(() => {
    if (!inView || reduce) return
    let i = 0
    // A call lands every GAP seconds; credit its lane.
    const t = setInterval(() => {
      const lane = CALLS[i % CALLS.length][1]
      i++
      setCounts((c) => c.map((n, j) => (j === lane ? n + 1 : n)))
    }, GAP * 1000)
    return () => clearInterval(t)
  }, [inView, reduce])
  return { ref, counts, animate: inView && !reduce }
}

function Node({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div {...props} className={cn("rounded-md border border-line bg-background px-3 py-2 shadow-xs", className)} />
  )
}

function Agent() {
  return (
    <Node className="flex flex-col items-center gap-2 px-4 py-4 text-center">
      <span className="ui-wave flex h-5 items-end gap-[3px]" aria-hidden>
        {[10, 18, 13, 16, 9].map((h, i) => (
          <span key={i} className="w-[3px] rounded-full bg-foreground" style={{ height: h }} />
        ))}
      </span>
      <span className="text-small font-medium">Voice agent</span>
      <span className="text-label text-ink-muted">Context · tools · any language</span>
    </Node>
  )
}

function Lane({ i, count }: { i: number; count: number }) {
  const lane = flow.lanes[i]
  return (
    <Node className="flex items-center justify-between gap-3">
      <span className="text-small">{lane.label}</span>
      <span className="flex items-baseline gap-2">
        <span className="font-mono text-label text-ink-muted tabular-nums">{lane.share}%</span>
        <span className="font-mono text-small tabular-nums">{count.toLocaleString("en-GB")}</span>
      </span>
    </Node>
  )
}

export function VoiceFlow({ className }: { className?: string }) {
  const { ref, counts, animate } = useCounts()

  return (
    <div ref={ref} className={cn("flex flex-col gap-8", className)}>
      {/* Desktop: drawn pipeline */}
      <div className="relative hidden aspect-[1000/400] w-full lg:block">
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden>
          {ROWS.map((y) => (
            <path key={`i${y}`} d={inPath(y)} fill="none" className="stroke-line-strong" strokeWidth={1} />
          ))}
          {ROWS.map((y) => (
            <path key={`o${y}`} d={outPath(y)} fill="none" className="stroke-line-strong" strokeWidth={1} />
          ))}
          {animate &&
            CALLS.map(([a, b], i) => (
              <circle key={i} r={4} className="fill-foreground" opacity={0}>
                <animateMotion dur={`${DUR}s`} begin={`${i * GAP}s`} repeatCount="indefinite" path={fullPath(a, b)} />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.08;0.92;1"
                  dur={`${DUR}s`}
                  begin={`${i * GAP}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
        </svg>

        <p className="absolute top-0 left-0 font-mono text-label text-ink-muted">Calls in</p>
        {flow.sources.map((s, i) => (
          <Node
            key={s}
            className="absolute left-0 -translate-y-1/2 text-small"
            style={{ top: `${(ROWS[i] / H) * 100}%`, width: `${(SRC_X / W) * 100}%` }}
          >
            {s}
          </Node>
        ))}

        <div
          className="absolute -translate-y-1/2"
          style={{ top: "50%", left: `${(AGENT_L / W) * 100}%`, width: `${((AGENT_R - AGENT_L) / W) * 100}%` }}
        >
          <Agent />
        </div>

        <p className="absolute top-0 right-0 font-mono text-label text-ink-muted">Results out</p>
        {flow.lanes.map((l, i) => (
          <div
            key={l.id}
            className="absolute right-0 -translate-y-1/2"
            style={{ top: `${(ROWS[i] / H) * 100}%`, left: `${(LANE_X / W) * 100}%` }}
          >
            <Lane i={i} count={counts[i]} />
          </div>
        ))}
      </div>

      {/* Mobile and tablet: stacked */}
      <div className="flex flex-col gap-3 lg:hidden">
        <p className="font-mono text-label text-ink-muted">Calls in</p>
        <div className="flex flex-wrap gap-2">
          {flow.sources.map((s) => (
            <Node key={s} className="text-small">
              {s}
            </Node>
          ))}
        </div>
        <span aria-hidden className="mx-auto h-6 w-px bg-line-strong" />
        <Agent />
        <span aria-hidden className="mx-auto h-6 w-px bg-line-strong" />
        <p className="font-mono text-label text-ink-muted">Results out</p>
        {flow.lanes.map((l, i) => (
          <Lane key={l.id} i={i} count={counts[i]} />
        ))}
      </div>

      {/* Business impact */}
      <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 lg:grid-cols-4">
        {flow.impact.map((m) => (
          <div key={m.label} className="flex flex-col gap-1">
            <dt className="order-2 text-small text-ink-secondary">{m.label}</dt>
            <dd className="text-h3 font-normal tabular-nums">{m.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
