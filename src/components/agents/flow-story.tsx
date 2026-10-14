"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { CheckIcon, LockSimpleIcon } from "@phosphor-icons/react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { agentsPage as c } from "@/content/pages/agents"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * Flow, full width: one call moving through a flow on the console's black
 * canvas. As the call plays, a dot travels the wire and the next node lights
 * up; at is_disputed the If branch is taken and Else fades; the disclosure
 * is a fixed step. The call itself floats over the canvas edge in light
 * cards, as in the hero: the current exchange, and the data that routed it.
 * The three features sit underneath. Plays once when on screen, then holds;
 * hovering a node shows that moment. Below lg: the call as a list. Reduced
 * motion: finished state. Sample data (Maya Patel, Ria).
 */

const VW = 1000
const VH = 600
const NW = 150
const NH = 56

type Kind = "agent" | "cond"
type FNode = { id: string; label: string; kind: Kind; x: number; y: number; fixed?: boolean }

// Left to right, stepping down; the transcript card sits over the bottom right.
const NODES: FNode[] = [
  { id: "identify", label: "identify_caller", kind: "agent", x: 35, y: 90 },
  { id: "routing", label: "routing", kind: "agent", x: 230, y: 150 },
  { id: "disputed", label: "is_disputed", kind: "cond", x: 425, y: 210 },
  { id: "disclosure", label: "disclosure", kind: "agent", x: 620, y: 270, fixed: true },
  { id: "transfer", label: "transfer", kind: "agent", x: 815, y: 270 },
]
const ELSE: FNode = { id: "payment", label: "take_payment", kind: "agent", x: 620, y: 90 }
const by = Object.fromEntries([...NODES, ELSE].map((n) => [n.id, n]))

/** Ports: in on the left edge, out on the right (a condition has two outs). */
const inPort = (n: FNode) => [n.x, n.y + NH / 2] as const
const outPort = (n: FNode, k = 0) => [n.x + NW, n.y + NH / 2 + k] as const
const wire = ([x1, y1]: readonly [number, number], [x2, y2]: readonly [number, number]) => {
  const dx = Math.max(30, (x2 - x1) / 2)
  return `M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`
}
const WIRES = [
  wire(outPort(by.identify), inPort(by.routing)),
  wire(outPort(by.routing), inPort(by.disputed)),
  wire(outPort(by.disputed, 9), inPort(by.disclosure)),
  wire(outPort(by.disclosure), inPort(by.transfer)),
]
const ELSE_D = wire(outPort(by.disputed, -9), inPort(ELSE))
const PORTS: (readonly [number, number])[] = [
  ...NODES.map(inPort),
  ...[by.identify, by.routing, by.disclosure, by.transfer].map((n) => outPort(n)),
  outPort(by.disputed, 9),
  outPort(by.disputed, -9),
  inPort(ELSE),
  outPort(ELSE),
]
// Dashed loop-backs under the flow, as on the console's canvas.
const LOOPS = [
  `M${by.disputed.x + NW / 2},${by.disputed.y + NH} V420 H${by.identify.x + NW / 2} V${by.identify.y + NH}`,
  `M${by.routing.x + NW / 2},${by.routing.y + NH} V380 H${by.identify.x + NW / 2 + 24} V${by.identify.y + NH}`,
]

type Say = { who: "Ria" | "Caller"; text: string }
const BEATS: { node: string; say: Say[]; fixed?: boolean; event?: string }[] = [
  {
    node: "identify",
    say: [
      { who: "Ria", text: "Hi, this is Ria from Halden Energy. Could you confirm your account number?" },
      { who: "Caller", text: "Sure, it's HLD-482913." },
    ],
  },
  { node: "routing", event: "account HLD-482913 · dispute_open = true", say: [{ who: "Ria", text: "Thanks, Maya. I can see your March bill." }] },
  { node: "disputed", event: "If → disputed bill path", say: [{ who: "Caller", text: "The reading on it looks far too high." }] },
  { node: "disclosure", fixed: true, say: [{ who: "Ria", text: "Before we continue: this call is recorded, and disputes are reviewed within 10 working days." }] },
  { node: "transfer", say: [{ who: "Ria", text: "I'm connecting you to Priya in billing; she has the details." }] },
]
const LAST = BEATS.length - 1
const BEAT_MS = 2400

/** The canvas and its cards are laid out once at this size and scaled to fit, so nothing reflows. */
const DESIGN_W = 1100
const DESIGN_H = 658

const FLOAT =
  "absolute z-10 flex flex-col gap-2.5 rounded-lg border border-line bg-background p-4 text-small shadow-[0_1px_2px_oklch(0.2_0_0/0.06),0_16px_40px_-16px_oklch(0.2_0.02_260/0.3)]"

function NodeCard({ n, state }: { n: FNode; state: "idle" | "active" | "done" | "faded" }) {
  const tabs = n.kind === "agent" ? ["Prompt", "Tools", "Voice", "Turn"] : ["Config"]
  return (
    <div
      className={cn(
        "absolute flex flex-col justify-center gap-2 rounded-lg border bg-[oklch(0.28_0.005_260)] px-3 text-[11.5px] leading-none text-[oklch(0.95_0_0)] transition-[opacity,border-color,box-shadow] duration-500 ease-(--ease-out)",
        state === "active" ? "border-white/85 shadow-[0_0_0_3px_oklch(1_0_0/0.12),0_0_40px_-6px_oklch(1_0_0/0.25)]" : "border-white/15 shadow-[0_8px_24px_-14px_oklch(0_0_0/0.5)]",
        state === "idle" && "opacity-50",
        state === "faded" && "border-dashed opacity-35"
      )}
      style={{ left: `${(n.x / VW) * 100}%`, top: `${(n.y / VH) * 100}%`, width: `${(NW / VW) * 100}%`, height: `${(NH / VH) * 100}%` }}
    >
      <span className="flex items-center gap-1.5">
        <span className="text-white/40">›</span>
        <span className={n.kind === "cond" ? "text-[oklch(0.72_0.14_295)]" : "text-[oklch(0.72_0.12_245)]"}>{n.kind === "cond" ? "⑂" : "✦"}</span>
        <span className="truncate">{n.label}</span>
        <span className="ml-auto flex items-center gap-1.5">
          {state === "active" && <span className="size-1.5 rounded-full bg-[oklch(0.78_0.15_150)] motion-safe:animate-pulse" />}
          {state === "done" && <CheckIcon weight="bold" className="size-3 text-[oklch(0.78_0.15_150)]" />}
          {n.fixed && <LockSimpleIcon className="size-3 text-white/45" />}
        </span>
      </span>
      <span className="flex gap-1.5 text-[10px] text-white/55">
        {tabs.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </span>
    </div>
  )
}

export function FlowStory() {
  const { label, title, rows } = c.panels.flow
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { amount: 0.35, once: true })
  const reduce = usePrefersReducedMotion()
  const [played, setPlayed] = useState(-1)
  const [hover, setHover] = useState<number | null>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => setScale(Math.min(1.12, el.clientWidth / DESIGN_W))
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!seen || reduce || played >= LAST) return
    const t = setTimeout(() => setPlayed((p) => p + 1), played < 0 ? 300 : BEAT_MS)
    return () => clearTimeout(t)
  }, [seen, reduce, played])

  const step = hover ?? (reduce ? LAST : played)
  const beat = BEATS[Math.max(0, step)]
  const activeId = step >= 0 ? beat.node : null
  const reached = new Set(BEATS.slice(0, step + 1).map((b) => b.node))
  const state = (id: string) => (id === activeId ? "active" : reached.has(id) ? "done" : "idle")
  const branchTaken = step >= 2

  return (
    <Section id="agents-flows">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <span className="font-mono text-label text-ink-muted">{label}</span>
          <h2 className="text-h2 font-normal">{title}</h2>
        </div>

        {/* Canvas with the call floating over its edges (lg up) */}
        <div ref={ref} className="relative mt-10 hidden lg:block" style={{ height: DESIGN_H * scale }}>
          <div className="absolute top-0 left-0 px-[55px] py-8" style={{ width: DESIGN_W, transform: `scale(${scale})`, transformOrigin: "0 0" }}>
          <div className="relative aspect-[1000/600] overflow-hidden rounded-xl border border-black/10 bg-[oklch(0.23_0.005_260)] bg-[radial-gradient(circle,oklch(1_0_0/0.09)_1px,transparent_1px)] [background-size:18px_18px] shadow-[0_40px_80px_-40px_oklch(0.2_0.02_260/0.45)]">
            <svg aria-hidden viewBox={`0 0 ${VW} ${VH}`} className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid meet">
              {LOOPS.map((d) => (
                <path key={d} d={d} fill="none" stroke="oklch(1 0 0 / 0.12)" strokeDasharray="4 5" />
              ))}
              <path d={ELSE_D} fill="none" stroke="oklch(1 0 0 / 0.3)" strokeWidth={1.2} strokeDasharray="4 5" opacity={branchTaken ? 0.4 : 1} className="transition-opacity duration-500" />
              {WIRES.map((d, i) => {
                const travelled = step >= i + 1
                const live = step === i + 1 && hover === null && !reduce
                return (
                  <g key={d}>
                    <path d={d} fill="none" stroke="oklch(1 0 0 / 0.24)" strokeWidth={1.3} />
                    <path
                      d={d}
                      fill="none"
                      stroke="oklch(0.95 0 0)"
                      strokeWidth={1.5}
                      pathLength={1}
                      strokeDasharray="1 1"
                      style={{ strokeDashoffset: travelled ? 0 : 1, transition: "stroke-dashoffset 900ms var(--ease-out)" }}
                    />
                    {live && (
                      <circle r={3.5} fill="oklch(0.95 0 0)">
                        <animateMotion dur="0.9s" repeatCount="1" fill="freeze" path={d} />
                      </circle>
                    )}
                  </g>
                )
              })}
              {[
                { t: "If", x: (by.disputed.x + NW + by.disclosure.x) / 2, y: (by.disputed.y + NH / 2 + 9 + by.disclosure.y + NH / 2) / 2, on: branchTaken },
                { t: "Else", x: (by.disputed.x + NW + ELSE.x) / 2, y: (by.disputed.y + NH / 2 - 9 + ELSE.y + NH / 2) / 2, on: false },
              ].map((l) => (
                <g key={l.t} transform={`translate(${l.x},${l.y})`} opacity={l.t === "Else" && branchTaken ? 0.45 : 1}>
                  <rect x={-17} y={-10} width={34} height={20} rx={5} fill="oklch(0.26 0.005 260)" stroke={l.on ? "oklch(0.95 0 0)" : "oklch(1 0 0 / 0.25)"} />
                  <text y={4} textAnchor="middle" fontSize={10.5} fontFamily="var(--font-mono)" fill="oklch(0.95 0 0)">
                    {l.t}
                  </text>
                </g>
              ))}
            </svg>

            {NODES.map((n, i) => (
              <div key={n.id} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
                <NodeCard n={n} state={state(n.id)} />
              </div>
            ))}
            <NodeCard n={ELSE} state={branchTaken ? "faded" : "idle"} />
            {/* Ports above the nodes, on their edges */}
            <svg aria-hidden viewBox={`0 0 ${VW} ${VH}`} className="pointer-events-none absolute inset-0 size-full" preserveAspectRatio="xMidYMid meet">
              {PORTS.map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r={3.5} fill="oklch(0.28 0.005 260)" stroke="oklch(1 0 0 / 0.55)" strokeWidth={1.1} />
              ))}
            </svg>
          </div>

          {/* The transcript, floating over the canvas edge as in the hero */}
          <div className={cn(FLOAT, "right-0 bottom-0 h-[17rem] w-[22rem] gap-0 p-0")}>
            <div className="flex items-center justify-between border-b border-line px-4 py-3 text-label text-ink-muted">
              <span>Live call · Maya Patel</span>
              <span className="flex items-center gap-1.5 text-foreground">
                <span className="size-1.5 rounded-full bg-[oklch(0.6_0.15_150)]" />
                01:12
              </span>
            </div>
            <ol
              className="flex min-h-0 flex-1 flex-col justify-end gap-3 overflow-hidden px-4 py-3"
              style={{ maskImage: "linear-gradient(to bottom, transparent, black 30%)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 30%)" }}
            >
              {BEATS.slice(0, Math.max(1, step + 1)).flatMap((b, i) => {
                const current = i === Math.max(0, step)
                const items = [
                  ...(b.event ? [<span key="e" className="w-fit rounded-md border border-line bg-surface px-2 py-0.5 font-mono text-[11px] text-ink-secondary">{b.event}</span>] : []),
                  ...b.say.map((x) => (
                    <p key={x.text}>
                      <span className="text-ink-muted">{x.who}: </span>
                      <span className={x.who === "Caller" ? "text-ink-secondary" : ""}>{x.text}</span>
                    </p>
                  )),
                  ...(b.fixed
                    ? [
                        <span key="f" className="flex w-fit items-center gap-1.5 rounded-md bg-foreground px-2 py-1 text-[11px] text-background">
                          <LockSimpleIcon className="size-3" />
                          Fixed step · read word for word
                        </span>,
                      ]
                    : []),
                ]
                return [
                  <li
                    key={b.node}
                    className={cn("flex shrink-0 flex-col gap-1.5 text-small transition-opacity duration-300", current ? "opacity-100 motion-safe:animate-[reveal-blur_400ms_var(--ease-out)_both]" : "opacity-50")}
                  >
                    {items}
                    <span className="font-mono text-[10px] text-ink-muted">{by[b.node].label}</span>
                  </li>,
                ]
              })}
            </ol>
          </div>
          </div>
        </div>

        {/* Below lg: the call as a list */}
        <ol className="mt-8 flex flex-col gap-3 lg:hidden">
          {BEATS.map((b) => (
            <li key={b.node} className="flex flex-col gap-2 rounded-xl bg-[oklch(0.12_0_0)] p-4 text-small text-[oklch(0.95_0_0)]">
              <span className="font-mono text-label text-white/55">{by[b.node].label}</span>
              {b.say.map((s) => (
                <span key={s.text}>
                  <span className="text-white/55">{s.who}: </span>
                  {s.text}
                </span>
              ))}
              {b.fixed && <span className="w-fit rounded-md bg-white px-2 py-1 text-[11px] text-black">Fixed step · read word for word</span>}
            </li>
          ))}
        </ol>

        {/* The three features, underneath */}
        <ul className="mt-10 grid gap-6 sm:grid-cols-3">
          {rows.map((r) => (
            <li key={r.id} className="flex flex-col gap-1 border-t border-line pt-4">
              <span className="text-body">{r.title}</span>
              <span className="text-small text-ink-secondary">{r.body}</span>
            </li>
          ))}
        </ul>
        <TextLink href="https://docs.hoomanlabs.com" className="mt-6">
          Read about flows
        </TextLink>
      </Container>
    </Section>
  )
}
