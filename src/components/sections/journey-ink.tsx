"use client"

import { useEffect, useId, useRef, useState } from "react"
import { useInView } from "motion/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * Hero journey, ink-and-wash direction (/lab/v3, inbound only for now).
 * A sketchbook page: the route and each step's sketch draw themselves in ink,
 * then a gouache wash blooms into the sketch and its UI label appears. The
 * branch not taken stays a faint pencil line. At the end the page is a
 * finished coloured drawing; it holds, fades back to paper and redraws.
 *
 * Reduced motion: the finished drawing. Below md the route runs downward.
 */

const INK = "oklch(0.27 0.02 260)"

/* Sketches in local coords (about ±55 around 0,0). Each path is drawn twice,
   the second slightly offset and fainter, for a pen-on-paper feel. */
const SKETCH = {
  phone: [
    "M-30,-10 C-34,-30 -20,-40 -10,-36 L-4,-22 C-2,-17 -6,-14 -10,-12 C-8,0 0,8 12,10 C14,6 17,2 22,4 L36,10 C40,20 30,34 10,30 C-12,26 -28,8 -30,-10 Z",
    "M24,-30 C30,-26 32,-20 30,-14",
    "M33,-40 C43,-31 45,-19 41,-8",
  ],
  record: [
    "M-42,-22 L-14,-22 L-8,-31 L42,-31 L42,31 L-42,31 Z",
    "M-29,-6 L27,-6",
    "M-29,7 L14,7",
    "M-29,19 L21,19",
  ],
  bubble: [
    "M-40,-26 C-40,-34 -34,-38 -26,-38 L28,-38 C36,-38 42,-34 42,-26 L42,4 C42,12 36,16 28,16 L-6,16 L-22,32 L-18,16 L-26,16 C-34,16 -40,12 -40,4 Z",
    "M-26,-20 L26,-20",
    "M-26,-5 L12,-5",
  ],
  talk: [
    "M-44,-30 L4,-30 C10,-30 12,-26 12,-20 L12,-2 C12,4 8,6 4,6 L-20,6 L-30,18 L-28,6 L-44,6 C-50,6 -52,2 -52,-4 L-52,-22 C-52,-28 -50,-30 -44,-30 Z",
    "M-4,0 L40,0 C46,0 50,4 50,10 L50,28 C50,34 46,36 40,36 L30,36 L32,48 L20,36 L-4,36 C-10,36 -12,32 -12,26 L-12,10 C-12,4 -10,0 -4,0 Z",
  ],
  ticket: [
    "M-46,-23 L46,-23 L46,-8 C37,-8 37,8 46,8 L46,23 L-46,23 L-46,8 C-37,8 -37,-8 -46,-8 Z",
    "M-30,-6 L4,-6",
    "M-30,7 L-6,7",
  ],
  tick: ["M-16,1 L-5,12 L17,-13", "M-26,0 C-26,-16 -14,-27 0,-27 C15,-27 26,-15 26,0 C26,15 14,26 0,26 C-15,26 -26,14 -26,0"],
}

type StepDef = {
  sketch: keyof typeof SKETCH
  wash: string
  /** Position on the desktop page (viewBox 1200 × 480). */
  x: number
  y: number
  /** Label sits above high sketches, below low ones. */
  label: "above" | "below"
  title: string
  detail: string
  /** Route drawn into this step (desktop). */
  route?: string
}

const STEPS: StepDef[] = [
  {
    sketch: "phone",
    wash: "oklch(0.8 0.1 150)",
    x: 120,
    y: 200,
    label: "above",
    title: "Call comes in",
    detail: "+44 20 7946 0958 · billing line",
  },
  {
    sketch: "record",
    wash: "oklch(0.84 0.11 82)",
    x: 360,
    y: 300,
    label: "below",
    title: "Context retrieved",
    detail: "Maya Patel · £86.40 due 4 Mar",
    route: "M168,222 C228,252 258,300 302,302",
  },
  {
    sketch: "bubble",
    wash: "oklch(0.78 0.08 235)",
    x: 600,
    y: 200,
    label: "above",
    title: "Contextual greeting",
    detail: "“Hi Maya, is this about your March bill?”",
    route: "M418,296 C478,282 500,210 548,204",
  },
  {
    sketch: "talk",
    wash: "oklch(0.76 0.09 295)",
    x: 840,
    y: 300,
    label: "below",
    title: "Conversation",
    detail: "Duplicate charge · refund needs approval",
    route: "M658,210 C718,230 742,300 782,300",
  },
  {
    sketch: "ticket",
    wash: "oklch(0.74 0.13 42)",
    x: 1080,
    y: 200,
    label: "above",
    title: "Ticket to CRM",
    detail: "If unresolved · #TCK-2291 sent to Zendesk",
    route: "M902,292 C962,270 990,212 1026,204",
  },
]

/** The branch not taken: a faint pencil line to an uncoloured tick. */
const OTHER = { x: 1080, y: 395, route: "M902,316 C962,336 1000,388 1048,392", label: "Resolved · call closed" }

const STEP_MS = 2300
const HOLD_MS = 4200
const RESET_MS = 900

/** Grainy paper, generated (no image file). */
const PAPER = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .35 0 0 0 0 .3 0 0 0 0 .22 0 0 0 .09 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`

/* ------------------------------------------------------------ pieces */

function Filters({ id }: { id: string }) {
  return (
    <defs>
      {/* A little wobble on every ink line */}
      <filter id={`${id}-ink`} x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3" />
        <feDisplacementMap in="SourceGraphic" scale="2.2" />
      </filter>
      {/* Bled, uneven edges for the washes */}
      <filter id={`${id}-wash`} x="-30%" y="-30%" width="160%" height="160%">
        <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" seed="8" />
        <feDisplacementMap in="SourceGraphic" scale="18" />
        <feGaussianBlur stdDeviation="1.2" />
      </filter>
    </defs>
  )
}

/** One sketch: wash behind, ink drawn on top. `on` starts the sequence. */
function Sketch({ kind, wash, on, filter, faint }: { kind: keyof typeof SKETCH; wash?: string; on: boolean; filter: string; faint?: boolean }) {
  const ease = "cubic-bezier(0.22, 1, 0.36, 1)"
  return (
    <g>
      {wash && (
        <g filter={`url(#${filter}-wash)`} style={{ mixBlendMode: "multiply" }}>
          <ellipse
            cx={4}
            cy={2}
            rx={58}
            ry={48}
            fill={wash}
            className="motion-reduce:transition-none"
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              transform: on ? "scale(1)" : "scale(0.1)",
              opacity: on ? 0.7 : 0,
              transition: on ? `transform 1000ms ${ease} 650ms, opacity 500ms ease 650ms` : "transform 500ms ease, opacity 500ms ease",
            }}
          />
        </g>
      )}
      <g filter={`url(#${filter}-ink)`} fill="none" strokeLinecap="round" strokeLinejoin="round">
        {SKETCH[kind].map((d, i) =>
          [0, 1].map((pass) => (
            <path
              key={`${i}-${pass}`}
              d={d}
              pathLength={1}
              stroke={faint ? "oklch(0.55 0.01 260)" : INK}
              strokeWidth={pass ? 1 : 1.7}
              strokeDasharray={faint ? "0.02 0.025" : "1 1"}
              transform={pass ? "translate(1.2 -0.8)" : undefined}
              opacity={faint ? 0.5 : pass ? 0.35 : 1}
              className="motion-reduce:transition-none"
              style={
                faint
                  ? undefined
                  : {
                      strokeDashoffset: on ? 0 : 1,
                      opacity: on ? (pass ? 0.35 : 1) : 0,
                      transition: on
                        ? `stroke-dashoffset 700ms ease-out ${200 + i * 120}ms, opacity 1ms linear ${200 + i * 120}ms`
                        : "stroke-dashoffset 400ms ease, opacity 400ms ease",
                    }
              }
            />
          ))
        )}
      </g>
    </g>
  )
}

function Label({ step, on, className, style }: { step: Pick<StepDef, "title" | "detail">; on: boolean; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={cn("flex flex-col gap-0.5 transition-[opacity,transform] duration-500 ease-(--ease-out) motion-reduce:transition-none", className)}
      style={{ ...style, opacity: on ? 1 : 0, transitionDelay: on ? "1100ms" : "0ms" }}
    >
      <span className="text-small font-medium text-[oklch(0.27_0.02_260)]">{step.title}</span>
      <span className="font-mono text-[11px] leading-snug text-[oklch(0.45_0.02_260)]">{step.detail}</span>
    </div>
  )
}

/* ------------------------------------------------------------ component */

export function InkJourney() {
  const id = useId().replace(/:/g, "")
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const reduce = usePrefersReducedMotion()
  // -1 = blank page; then 0..last as each step is drawn.
  const [step, setStep] = useState(-1)
  const last = STEPS.length - 1
  const at = reduce ? last : step

  useEffect(() => {
    if (reduce || !inView) return
    const t = setTimeout(
      () => setStep((s) => (s === last ? -1 : s + 1)),
      step === last ? HOLD_MS : step === -1 ? RESET_MS : STEP_MS
    )
    return () => clearTimeout(t)
  }, [step, reduce, inView, last])

  const routeOn = (i: number) => i <= at

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-xl border border-[oklch(0.88_0.02_80)] bg-[oklch(0.975_0.014_85)] px-4 py-8 sm:px-8 sm:py-10"
      style={{ backgroundImage: PAPER }}
    >
      <div className="mb-2 flex items-center justify-between font-mono text-[11px] text-[oklch(0.5_0.02_260)]">
        <span className="hidden sm:inline">Inbound call · billing line</span>
        <span aria-live="polite">{at < 0 ? "…" : `${at + 1} / ${STEPS.length} · ${STEPS[at].title}`}</span>
      </div>

      {/* Desktop page */}
      <div className="relative hidden aspect-[1200/480] md:block">
        <svg viewBox="0 0 1200 480" className="absolute inset-0 size-full overflow-visible" aria-hidden>
          <Filters id={id} />

          {/* Pencil branch, always faintly there */}
          <path d={OTHER.route} fill="none" stroke="oklch(0.55 0.01 260)" strokeWidth={1.2} strokeDasharray="3 5" opacity={0.5} />
          <g transform={`translate(${OTHER.x} ${OTHER.y}) scale(0.7)`}>
            <Sketch kind="tick" on={false} filter={id} faint />
          </g>

          {/* Inked route, segment by segment */}
          {STEPS.map(
            (s, i) =>
              s.route && (
                <g key={`r${i}`} filter={`url(#${id}-ink)`}>
                  <path
                    d={s.route}
                    pathLength={1}
                    fill="none"
                    stroke={INK}
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeDasharray="1 1"
                    className="motion-reduce:transition-none"
                    style={{
                      strokeDashoffset: routeOn(i) ? 0 : 1,
                      opacity: routeOn(i) ? 1 : 0,
                      transition: routeOn(i) ? "stroke-dashoffset 600ms ease-in-out" : "stroke-dashoffset 400ms ease, opacity 400ms ease",
                    }}
                  />
                </g>
              )
          )}

          {STEPS.map((s, i) => (
            <g key={s.title} transform={`translate(${s.x} ${s.y})`}>
              <Sketch kind={s.sketch} wash={s.wash} on={i <= at} filter={id} />
            </g>
          ))}
        </svg>

        {/* Crisp labels over the drawing */}
        {STEPS.map((s, i) => (
          <Label
            key={s.title}
            step={s}
            on={i <= at}
            className={cn("absolute w-56 -translate-x-1/2 text-center", s.label === "above" ? "-translate-y-full" : "")}
            style={{ left: `${(s.x / 1200) * 100}%`, top: `${((s.label === "above" ? s.y - 62 : s.y + 62) / 480) * 100}%` }}
          />
        ))}
        <span
          className="absolute -translate-x-1/2 font-mono text-[11px] whitespace-nowrap text-[oklch(0.55_0.01_260)]"
          style={{ left: `${(OTHER.x / 1200) * 100}%`, top: `${((OTHER.y + 28) / 480) * 100}%` }}
        >
          {OTHER.label}
        </span>
      </div>

      {/* Mobile: the route runs down the page */}
      <ol className="flex flex-col md:hidden">
        {STEPS.map((s, i) => (
          <li key={s.title} className="relative flex items-center gap-4 py-3">
            {i < last && (
              <span
                aria-hidden
                className="absolute top-[4.25rem] bottom-[-0.75rem] left-10 w-[1.5px] origin-top bg-[oklch(0.27_0.02_260)] transition-transform duration-500 motion-reduce:transition-none"
                style={{ transform: `scaleY(${i + 1 <= at ? 1 : 0})` }}
              />
            )}
            <svg viewBox="-62 -52 124 104" className="size-20 shrink-0 overflow-visible" aria-hidden>
              <Filters id={`${id}m${i}`} />
              <Sketch kind={s.sketch} wash={s.wash} on={i <= at} filter={`${id}m${i}`} />
            </svg>
            <Label step={s} on={i <= at} />
          </li>
        ))}
      </ol>
    </div>
  )
}
