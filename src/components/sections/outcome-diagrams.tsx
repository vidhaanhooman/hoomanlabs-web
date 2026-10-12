"use client"

import { useRef } from "react"
import { useInView } from "motion/react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * Outcomes as three ruled columns, each with a fine line diagram that draws
 * itself in when the section scrolls into view: a curve rising from "Before"
 * to "After" (experience), funnel rings (growth), many inputs converging into
 * one line (efficiency). Hairline grid with small crosshair marks at the
 * intersections.
 */

const ITEMS = [
  {
    title: "Better customer experience",
    body: "Every call answered in under a second, in the caller's language. Problems get solved on the first call, and people only reach your team when they need to.",
    Diagram: CurveDiagram,
  },
  {
    title: "Growth across the funnel",
    body: "Reach new leads within minutes, follow up on every missed call and win back lapsed customers, at a volume no team could dial by hand.",
    Diagram: FunnelDiagram,
  },
  {
    title: "More done with the same team",
    body: "Reminders, bookings, collections and verification run on their own. Your people spend their time on the conversations that need judgment.",
    Diagram: ConvergeDiagram,
  },
]

export function OutcomeDiagrams() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const reduce = usePrefersReducedMotion()
  const drawn = inView || reduce

  return (
    <Section id="sl-outcomes">
      <Container>
        <h2 className="max-w-[34ch] text-display font-normal">
          Voice and chat agents built to move your support, sales and operations numbers.
        </h2>

        <div ref={ref} className="relative mt-12 grid border-y border-line md:grid-cols-3">
          {/* crosshair marks where the rules meet */}
          {[0, 1, 2, 3].map((i) => (
            <span key={`t${i}`} aria-hidden className="absolute -top-[3px] hidden size-[5px] -translate-x-1/2 bg-foreground md:block" style={{ left: `${(i / 3) * 100}%` }} />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <span key={`b${i}`} aria-hidden className="absolute -bottom-[3px] hidden size-[5px] -translate-x-1/2 bg-foreground md:block" style={{ left: `${(i / 3) * 100}%` }} />
          ))}

          {ITEMS.map(({ title, body, Diagram }, i) => (
            <div
              key={title}
              className={cn(
                "flex flex-col gap-10 px-2 py-10 sm:px-6 lg:px-10",
                i > 0 && "border-t border-line md:border-t-0 md:border-l"
              )}
            >
              <div aria-hidden className="flex h-56 items-center justify-center">
                <Diagram drawn={drawn} delay={i * 0.25} />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-h4 font-normal">{title}</h3>
                <p className="max-w-[40ch] text-body text-ink-secondary">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ------------------------------------------------------------ diagrams */

type DiagramProps = { drawn: boolean; delay: number }

/** A path that draws itself in via stroke-dashoffset. */
function Draw({
  d,
  drawn,
  delay,
  dur = 1.4,
  dotted,
  className,
}: {
  d: string
  drawn: boolean
  delay: number
  dur?: number
  dotted?: boolean
  className?: string
}) {
  return (
    <path
      d={d}
      pathLength={1}
      fill="none"
      className={cn("stroke-foreground", className)}
      strokeWidth={dotted ? 1.4 : 1.4}
      strokeLinecap="round"
      strokeDasharray={dotted ? "0.006 0.012" : "1 1"}
      strokeDashoffset={dotted ? 0 : drawn ? 0 : 1}
      opacity={dotted ? (drawn ? 0.55 : 0) : 1}
      style={{
        transition: dotted
          ? `opacity 600ms ease ${delay + 0.3}s`
          : `stroke-dashoffset ${dur}s cubic-bezier(0.23,1,0.32,1) ${delay}s`,
      }}
    />
  )
}

function Fade({ drawn, delay, children }: { drawn: boolean; delay: number; children: React.ReactNode }) {
  return (
    <g opacity={drawn ? 1 : 0} style={{ transition: `opacity 500ms ease ${delay}s` }}>
      {children}
    </g>
  )
}

function CurveDiagram({ drawn, delay }: DiagramProps) {
  return (
    <svg viewBox="0 0 280 200" className="h-full w-auto max-w-full">
      <Draw d="M10,180 C70,175 95,170 140,130 C185,95 220,95 270,92" drawn={drawn} delay={delay} dotted />
      <Draw d="M10,180 C60,178 80,150 120,105 C150,70 175,40 200,30 C225,20 250,18 270,18" drawn={drawn} delay={delay} />
      <Fade drawn={drawn} delay={delay + 0.7}>
        <circle cx={131} cy={92} r={4} className="fill-background stroke-foreground" strokeWidth={1.4} />
        <text x={108} y={74} fontSize={11} className="fill-ink-muted">
          Before
        </text>
      </Fade>
      <Fade drawn={drawn} delay={delay + 1.1}>
        <circle cx={205} cy={28} r={4} className="fill-foreground" />
        <text x={186} y={12} fontSize={11} className="fill-foreground">
          After
        </text>
      </Fade>
    </svg>
  )
}

function FunnelDiagram({ drawn, delay }: DiagramProps) {
  // Nested circles sharing a left tangent: the funnel narrowing to conversions.
  const R = 90
  const cx = 140
  const cy = 100
  const rings = [90, 72, 56, 42]
  return (
    <svg viewBox="0 0 280 200" className="h-full w-auto max-w-full">
      <Draw d={`M20,${cy} L260,${cy}`} drawn={drawn} delay={delay} dotted />
      {rings.map((r, i) => {
        const x = cx - R + r // left edges aligned
        return (
          <Draw
            key={r}
            d={`M${x - r},${cy} a${r},${r} 0 1,0 ${r * 2},0 a${r},${r} 0 1,0 ${-r * 2},0`}
            drawn={drawn}
            delay={delay + i * 0.18}
            className={i === 0 ? undefined : "stroke-ink-muted"}
          />
        )
      })}
      <Fade drawn={drawn} delay={delay + 1}>
        <circle cx={cx - R} cy={cy} r={3.2} className="fill-foreground" />
        <circle cx={cx + R} cy={cy} r={3.2} className="fill-foreground" />
        {rings.slice(1).map((r) => (
          <circle key={r} cx={cx - R + 2 * r} cy={cy} r={1.8} className="fill-ink-muted" />
        ))}
      </Fade>
    </svg>
  )
}

function ConvergeDiagram({ drawn, delay }: DiagramProps) {
  const hub = { x: 150, y: 100 }
  const ins = [
    { x: 40, y: 20, dotted: true },
    { x: 40, y: 100, dotted: false },
    { x: 40, y: 180, dotted: true },
  ]
  return (
    <svg viewBox="0 0 280 200" className="h-full w-auto max-w-full">
      {ins.map((p, i) =>
        p.dotted ? (
          <Draw key={i} d={`M${p.x},${p.y} L${hub.x},${hub.y}`} drawn={drawn} delay={delay + i * 0.15} dotted />
        ) : (
          <Draw key={i} d={`M${p.x},${p.y} L${hub.x - 6},${hub.y}`} drawn={drawn} delay={delay} />
        )
      )}
      <Draw d={`M${hub.x + 6},${hub.y} L250,${hub.y}`} drawn={drawn} delay={delay + 0.6} />
      <Fade drawn={drawn} delay={delay + 0.2}>
        {ins.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={4} className="fill-background stroke-foreground" strokeWidth={1.4} />
        ))}
      </Fade>
      <Fade drawn={drawn} delay={delay + 0.9}>
        <circle cx={hub.x} cy={hub.y} r={3.5} className="fill-foreground" />
        <circle cx={250} cy={hub.y} r={4} className="fill-background stroke-foreground" strokeWidth={1.4} />
      </Fade>
    </svg>
  )
}
