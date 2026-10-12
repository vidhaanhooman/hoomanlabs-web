"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { useMotionValueEvent, useScroll } from "motion/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { ArrowsSplitIcon, FlowArrowIcon, LightningIcon, TrayArrowUpIcon, type Icon } from "@phosphor-icons/react"

import { WorkflowCanvas } from "@/components/product/flow-canvas"
import { cn } from "@/lib/utils"

/**
 * The workflow, explained like the agent section (/lab/v3): the running
 * canvas (top to bottom) on the right with numbered markers on its nodes, and
 * a callout card for each in one column on the left, level with its marker
 * and joined by a straight hairline. Hovering or focusing a card spotlights
 * its nodes. On large screens the canvas stays pinned while you scroll and
 * the cards arrive one by one, each spotlighting its nodes. Below lg (and for
 * reduced motion) the cards list under it.
 */

type Mark = { n: number; node: string; nodes: string[]; title: string; body: string; icon: Icon }

const MARKS: Mark[] = [
  { n: 1, node: "in", nodes: ["in"], title: "Triggers", body: "Start a run when a call ends or a form arrives.", icon: LightningIcon },
  { n: 2, node: "cb", nodes: ["cb", "cbp"], title: "Branches", body: "Take a different path on what the call found.", icon: ArrowsSplitIcon },
  { n: 3, node: "push", nodes: ["det", "push", "sum", "summ", "end", "rec"], title: "Actions", body: "Update the CRM, book callbacks, send summaries.", icon: FlowArrowIcon },
  { n: 4, node: "out", nodes: ["out"], title: "Results", body: "Everything written back in about a second.", icon: TrayArrowUpIcon },
]
const MARK_NODES = Object.fromEntries(MARKS.map((m) => [m.node, m.n]))
/** Scroll steps: one per card, then one with all shown and no spotlight. */
const STEPS = MARKS.length + 1

const CARD = 324
const GAP = 12
const MIN_SPACE = 12

type Pos = { n: number; y: number; top: number; h: number }

function CalloutCard({
  m,
  on,
  onFocus,
  className,
  style,
  number = false,
  cardRef,
}: {
  m: Mark
  on: boolean
  onFocus: (n: number | null) => void
  className?: string
  style?: React.CSSProperties
  number?: boolean
  cardRef?: (el: HTMLButtonElement | null) => void
}) {
  return (
    <button
      ref={cardRef}
      type="button"
      onMouseEnter={() => onFocus(m.n)}
      onMouseLeave={() => onFocus(null)}
      onFocus={() => onFocus(m.n)}
      onBlur={() => onFocus(null)}
      aria-pressed={on}
      className={cn(
        "flex overflow-hidden rounded-lg border bg-surface text-left transition-[border-color,background-color,box-shadow,opacity,transform] duration-300",
        on ? "border-line-strong bg-background shadow-[0_10px_30px_-18px_oklch(0.2_0.02_260/0.5)]" : "border-line hover:border-line-strong",
        className
      )}
      style={style}
    >
      <span className="flex gap-2.5 p-3">
        <span aria-hidden className={cn("relative grid size-8 shrink-0 place-items-center rounded-md border border-line bg-background", on ? "text-foreground" : "text-ink-secondary")}>
          <m.icon className="size-4" />
          {number && (
            <span className="absolute -right-1.5 -bottom-1.5 grid size-4 place-items-center rounded-full bg-foreground font-mono text-[9.5px] text-background">{m.n}</span>
          )}
        </span>
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="text-body font-medium">{m.title}</span>
          <span className="text-small text-ink-secondary">{m.body}</span>
        </span>
      </span>
    </button>
  )
}

export function WorkflowAnatomy() {
  const box = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLDivElement>(null)
  const cards = useRef<Record<number, HTMLButtonElement | null>>({})
  const [pos, setPos] = useState<Pos[]>([])
  const [edge, setEdge] = useState({ left: 0 })
  const reduce = usePrefersReducedMotion()
  // Scroll through a tall track while the canvas stays pinned; each step brings in the next card.
  const track = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)
  const { scrollYProgress } = useScroll({ target: track, offset: ["start 96px", "end end"] })
  useMotionValueEvent(scrollYProgress, "change", (v) => setStep(Math.min(STEPS, Math.floor(v * (STEPS + 0.5)))))
  const st = reduce ? STEPS : step
  const shown = (n: number) => n <= st
  const scrollFocus = st >= 1 && st <= MARKS.length ? st : null
  const [hover, setHover] = useState<number | null>(null)

  // Marker positions, and each card centred on its marker (nudged down only if two would overlap).
  useLayoutEffect(() => {
    const root = box.current
    const cv = canvas.current
    if (!root || !cv) return
    const measure = () => {
      const r = root.getBoundingClientRect()
      const c = cv.getBoundingClientRect()
      setEdge({ left: c.left - r.left })
      let floor = c.top - r.top
      const next = MARKS.map((m) => {
        const b = cv.querySelector(`[data-marker="${m.n}"]`)?.getBoundingClientRect()
        return { m, y: b ? b.top - r.top + b.height / 2 : 0 }
      })
        .sort((a, b) => a.y - b.y)
        .map(({ m, y }) => {
          const h = cards.current[m.n]?.offsetHeight ?? 64
          const top = Math.max(y - h / 2, floor)
          floor = top + h + MIN_SPACE
          return { n: m.n, y, top, h }
        })
      setPos(next)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(root)
    document.fonts?.ready.then(measure)
    return () => ro.disconnect()
  }, [])

  const at = (n: number) => pos.find((p) => p.n === n)
  const focus = hover ?? scrollFocus
  const lit = focus ? MARKS[focus - 1].nodes : null

  return (
    <div>
      <div ref={track} className={cn(!reduce && "lg:h-[340vh]")}>
      <div className={cn(!reduce && "lg:sticky lg:top-24")}>
      <div ref={box} className="relative lg:grid lg:grid-cols-[19.5rem_minmax(0,1fr)] lg:gap-x-16">
        <div aria-hidden className="hidden lg:block" />
        <div ref={canvas} aria-hidden className="flex items-center overflow-hidden rounded-lg bg-[oklch(0.13_0_0)] shadow-[0_40px_100px_-50px_oklch(0.2_0.02_260/0.6)]">
          <WorkflowCanvas vertical marks={MARK_NODES} markSide="left" focus={lit} className="w-full px-4 pt-11 pb-4" />
        </div>

        {/* Hairlines: straight across from each marker into its card */}
        <svg aria-hidden className="pointer-events-none absolute inset-0 hidden size-full overflow-visible lg:block">
          {pos.map((p) => {
            const x0 = edge.left
            const x1 = CARD - GAP
            const y1 = Math.min(Math.max(p.y, p.top + 12), p.top + p.h - 12)
            const dx = (x1 - x0) / 2
            return (
              <path
                key={p.n}
                d={`M${x0},${p.y} C${x0 + dx},${p.y} ${x1 - dx},${y1} ${x1},${y1}`}
                pathLength={1}
                fill="none"
                strokeDasharray="1 1"
                className={cn("transition-[stroke,stroke-dashoffset] duration-700 ease-(--ease-out)", focus === p.n ? "stroke-foreground/50" : "stroke-line-strong")}
                style={{ strokeDashoffset: shown(p.n) ? 0 : 1 }}
              />
            )
          })}
        </svg>

        {MARKS.map((m) => {
          const p = at(m.n)
          return (
            <CalloutCard
              key={m.n}
              m={m}
              on={focus === m.n}
              onFocus={setHover}
              cardRef={(el) => {
                cards.current[m.n] = el
              }}
              className={cn("absolute left-0 hidden lg:flex", p && shown(m.n) ? "opacity-100" : "pointer-events-none -translate-x-3 opacity-0")}
              style={{ top: p?.top ?? 0, width: CARD - GAP }}
            />
          )
        })}
      </div>
      </div>
      </div>

      <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:hidden">
        {MARKS.map((m) => (
          <li key={m.n} className="flex">
            <CalloutCard m={m} on={hover === m.n} onFocus={setHover} number className="w-full" />
          </li>
        ))}
      </ol>
    </div>
  )
}
