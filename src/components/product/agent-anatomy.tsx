"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { useMotionValueEvent, useScroll } from "motion/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import {
  BookOpenTextIcon,
  CheckIcon,
  GitBranchIcon,
  LightningIcon,
  PlayIcon,
  SpeakerHighIcon,
  TrayArrowDownIcon,
  TrayArrowUpIcon,
  type Icon,
} from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

/**
 * Everything an agent needs, explained on one screen (/lab/v3): a large,
 * static prompt editor with a small numbered marker right beside each part
 * that matters, and a callout card for each in one column on the right, joined
 * to its marker by a hairline that leaves the editor level with the marker. Hovering (or
 * focusing) a card spotlights its part: the rest of the editor dims.
 * Below lg the cards become a numbered list under the editor; tapping one
 * spotlights the same way. On large screens the editor stays pinned while
 * you scroll, and the cards arrive one by one (each spotlighting its part);
 * after the last, all stay and the spotlight clears. Sample content
 * (fictional Halden Energy agent).
 */

type Mark = { n: number; side: "left" | "right"; title: string; body: string; icon: Icon }

const MARKS: Mark[] = [
  { n: 1, side: "right", title: "Pre-call context", body: "Filled in before the first ring.", icon: TrayArrowDownIcon },
  { n: 2, side: "right", title: "Conditions", body: "Branch the call in CEL, inline.", icon: GitBranchIcon },
  { n: 3, side: "right", title: "Knowledge base", body: "Answers cited from your documents.", icon: BookOpenTextIcon },
  { n: 4, side: "right", title: "Tools", body: "Payments, tickets and messages.", icon: LightningIcon },
  { n: 5, side: "right", title: "After the call", body: "Summary, CRM update and QA score.", icon: TrayArrowUpIcon },
  { n: 6, side: "right", title: "Voice & languages", body: "en-GB voice, 30 languages.", icon: SpeakerHighIcon },
]

/* ------------------------------------------------------------ editor */

/** A small marker right beside the part it explains. */
function Marker({ n }: { n: number }) {
  return (
    <span data-marker={n} aria-hidden className="mx-1 inline-grid size-4 shrink-0 translate-y-[-1px] place-items-center rounded-full bg-white align-middle font-mono text-[9.5px] text-black">
      {n}
    </span>
  )
}

const Var = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-[4px] bg-[oklch(0.72_0.14_295/0.18)] px-1 py-px font-mono text-[0.92em] text-[oklch(0.86_0.08_295)]">{`{{${children}}}`}</span>
)
const op = "text-[oklch(0.72_0.14_295)]"
const vr = "text-[oklch(0.78_0.11_240)]"

function Editor({ focus }: { focus: number | null }) {
  /** Dim a block unless it belongs to the spotlit part. */
  const dim = (...parts: number[]) => cn("transition-opacity duration-300", focus !== null && !parts.includes(focus) && "opacity-25")
  return (
    <div className="ui-dark @container overflow-hidden rounded-lg text-[13px] leading-[1.7] shadow-[0_40px_100px_-50px_oklch(0.2_0.02_260/0.6)] lg:text-[14px]">
      {/* Toolbar */}
      <div className="flex h-12 items-center gap-3 border-b border-(--ui-line) px-4">
        <div className={cn("flex gap-0.5 rounded-md bg-(--ui-raised) p-0.5 text-[12.5px]", dim())}>
          <span className="rounded-[5px] bg-(--ui-bg) px-3 py-1 shadow-xs">Preview</span>
          <span className="px-3 py-1 text-(--ui-muted)">Text</span>
        </div>
        <span className={cn("ml-auto flex items-center text-[12px]", dim(6))}>
          <span className="flex items-center gap-1.5 rounded-full border border-(--ui-line) bg-(--ui-raised) px-2.5 py-1">
            <SpeakerHighIcon className="size-3.5 text-(--ui-muted)" aria-hidden />
            Ria · en-GB
          </span>
          <Marker n={6} />
        </span>
        <span className={cn("flex items-center gap-1.5 text-[12px] text-(--ui-muted)", dim())}>
          <PlayIcon className="size-3" aria-hidden />
          Test
        </span>
      </div>

      {/* Prompt */}
      <div className="flex flex-col gap-2.5 px-8 py-6 @3xl:px-12">
        <div className={cn("flex flex-col gap-2.5", dim())}>
          <h4 className="font-medium">Identity &amp; role</h4>
          <p className="text-(--ui-text)/85">
            You are Ria, a virtual assistant answering billing calls for Halden Energy. Resolve the reason for the call in one go: explain a charge, take a payment, agree a plan or raise a refund. Warm, clear and brief.
          </p>
        </div>

        <div className={cn("flex flex-col gap-2.5 pt-2", dim(1))}>
          <h4 className="font-medium">What you know at the start</h4>
          <ul className="flex list-disc flex-col gap-1 pl-5 text-(--ui-text)/85 marker:text-(--ui-muted)">
            <li>
              The customer is <Var>context.name</Var>, account <Var>context.account</Var>
            </li>
            <li>
              Their open balance is <Var>context.balance</Var>
              <Marker n={1} />, due <Var>context.dueDate</Var>
            </li>
          </ul>
        </div>

        <h4 className={cn("pt-2 font-medium", dim())}>Conversation flow</h4>
        <ol className="flex list-decimal flex-col gap-1.5 pl-5 text-(--ui-text)/85 marker:text-(--ui-muted)">
          <li className={dim()}>Greet them by name and say why you think they&rsquo;re calling.</li>
          <li className={dim(3)}>
            If they ask about refunds or charges, answer from the knowledge base and cite it{" "}
            <span className="inline-flex items-center gap-1 rounded-full border border-(--ui-line) px-2 py-px align-middle text-[11.5px] text-(--ui-muted)">
              <BookOpenTextIcon className="size-3" aria-hidden />
              Refund policy §3
            </span>
            <Marker n={3} />
          </li>
          <li className={dim()}>Otherwise, follow the instructions for this account&rsquo;s status:</li>
        </ol>
        <div className={cn("relative rounded-md bg-[oklch(0.72_0.14_295/0.1)] px-4 py-3 font-mono text-[12px] leading-[1.8] ring-1 ring-[oklch(0.72_0.14_295/0.3)]", dim(2))}>
          <div>
            <span className={op}>{"{{ "}</span>
            <span className={vr}>context.balance</span>
            <span className={op}>{" > 0 && !"}</span>
            <span className={vr}>context.promiseToPay</span>
            <span className={op}> ?</span>
            <Marker n={2} />
          </div>
          <div className="pl-4 text-(--ui-text)/85">
            &quot;&quot;&quot;Offer to take the payment now. If they can&rsquo;t pay in full, offer a plan of up to three instalments.&quot;&quot;&quot;
          </div>
          <div className="pl-4 text-(--ui-text)/85">
            <span className={op}>: </span>&quot;&quot;&quot;Confirm nothing is owed.&quot;&quot;&quot;<span className={op}>{" }}"}</span>
          </div>
          <span className="absolute -top-2.5 right-3 flex items-center gap-1 rounded-full border border-(--ui-line) bg-(--ui-bg) px-2 py-0.5 font-sans text-[11px]">
            <CheckIcon weight="bold" className="size-3 text-(--ui-live)" aria-hidden />
            Valid CEL
          </span>
        </div>
        <ol start={4} className="flex list-decimal flex-col gap-1.5 pl-5 text-(--ui-text)/85 marker:text-(--ui-muted)">
          <li className={dim(4)}>
            To take a payment, use <span className="rounded-[3px] font-mono text-[0.92em] text-[oklch(0.82_0.12_80)]">[take_payment]</span>
            <Marker n={4} /> and read the amount back first.
          </li>
        </ol>

        <div className={cn("flex flex-col gap-2.5 pt-2", dim(5))}>
          <h4 className="font-medium">After the call</h4>
          <p className="text-(--ui-text)/85">
            Write a two-line summary, update the CRM and score the call
            <Marker n={5} />
          </p>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------ callouts */

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
        "flex overflow-hidden rounded-lg border bg-surface text-left transition-[border-color,background-color,box-shadow] duration-200",
        on ? "border-line-strong bg-background shadow-[0_10px_30px_-18px_oklch(0.2_0.02_260/0.5)]" : "border-line hover:border-line-strong",
        className
      )}
      style={style}
    >
      <span className="flex gap-2.5 p-3">
        <span
          aria-hidden
          className={cn(
            "relative grid size-8 shrink-0 place-items-center rounded-md border border-line bg-background transition-colors duration-200",
            on ? "text-foreground" : "text-ink-secondary"
          )}
        >
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

/* ------------------------------------------------------------ layout */

/** Callout column width and spacing (px). */
const CARD = 324
const GAP = 12
const MIN_SPACE = 12

type Pos = { n: number; y: number; top: number; h: number }

/** The order cards arrive in: top to bottom through the editor. */
const ORDER = [6, 1, 3, 2, 4, 5]
/** Scroll steps: one per card, then one with all shown and no spotlight. */
const STEPS = ORDER.length + 1

export function AgentAnatomy() {
  const track = useRef<HTMLDivElement>(null)
  const box = useRef<HTMLDivElement>(null)
  const editor = useRef<HTMLDivElement>(null)
  const cards = useRef<Record<number, HTMLButtonElement | null>>({})
  const [pos, setPos] = useState<Pos[]>([])
  const [edge, setEdge] = useState({ left: 0, right: 0, width: 0 })
  const [hover, setHover] = useState<number | null>(null)
  const reduce = usePrefersReducedMotion()

  // Scroll through a tall track while the editor stays pinned; each step brings in the next card.
  const [step, setStep] = useState(0)
  const { scrollYProgress } = useScroll({ target: track, offset: ["start 96px", "end end"] })
  useMotionValueEvent(scrollYProgress, "change", (v) => setStep(Math.min(STEPS, Math.floor(v * (STEPS + 0.5)))))
  const s = reduce ? STEPS : step
  const shown = (n: number) => ORDER.indexOf(n) < s
  const scrollFocus = s >= 1 && s <= ORDER.length ? ORDER[s - 1] : null
  const focus = hover ?? scrollFocus

  // Marker positions relative to the box, and each card's top placed level with
  // its marker (pushed down if the card above on the same side would overlap).
  useLayoutEffect(() => {
    const root = box.current
    const ed = editor.current
    if (!root || !ed) return
    const measure = () => {
      const r = root.getBoundingClientRect()
      const e = ed.getBoundingClientRect()
      setEdge({ left: e.left - r.left, right: e.right - r.left, width: r.width })
      const ys = MARKS.map((m) => {
        const b = ed.querySelector<HTMLElement>(`[data-marker="${m.n}"]`)?.getBoundingClientRect()
        return { m, y: b ? b.top - r.top + b.height / 2 : 0 }
      })
      // One column on the right: each card centred on its marker so every line is a
      // straight horizontal; cards are only nudged down if they would overlap.
      const order = ys.sort((a, b) => a.y - b.y)
      let floor = e.top - r.top
      const next: Pos[] = order.map(({ m, y }) => {
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

  return (
    <div>
      {/* Tall track on large screens; the stage inside stays pinned while it scrolls past */}
      <div ref={track} className={cn(!reduce && "lg:h-[480vh]")}>
        <div className={cn(!reduce && "lg:sticky lg:top-24")}>
          <div ref={box} className="relative lg:grid lg:grid-cols-[minmax(0,1fr)_19.5rem] lg:gap-x-16 lg:pt-4 lg:pb-14">
            <div ref={editor}>
              <Editor focus={focus} />
            </div>
            <div aria-hidden className="hidden lg:block" />

            {/* Hairlines: straight across from each marker into its card */}
            <svg aria-hidden className="pointer-events-none absolute inset-0 hidden size-full overflow-visible lg:block">
              {pos.map((p) => {
                const x0 = edge.right
                const x1 = edge.width - (CARD - GAP)
                // Straight across at the marker's height (kept inside the card if it was nudged).
                const y1 = Math.min(Math.max(p.y, p.top + 12), p.top + p.h - 12)
                const dx = (x1 - x0) / 2
                return (
                  <path
                    key={`l${p.n}`}
                    d={`M${x0},${p.y} C${x0 + dx},${p.y} ${x1 - dx},${y1} ${x1},${y1}`}
                    pathLength={1}
                    fill="none"
                    strokeDasharray="1 1"
                    className={cn(
                      "transition-[stroke,stroke-dashoffset] duration-500 ease-(--ease-out)",
                      focus === p.n ? "stroke-foreground/50" : "stroke-line-strong"
                    )}
                    style={{ strokeDashoffset: shown(p.n) ? 0 : 1 }}
                  />
                )
              })}
            </svg>

            {/* Callout cards, arriving one by one */}
            {MARKS.map((m) => {
              const p = at(m.n)
              const on = shown(m.n)
              return (
                <CalloutCard
                  key={m.n}
                  m={m}
                  on={focus === m.n}
                  onFocus={setHover}
                  cardRef={(el) => {
                    cards.current[m.n] = el
                  }}
                  className={cn(
                    "absolute hidden transition-[opacity,transform,border-color,background-color,box-shadow] duration-500 ease-(--ease-out) lg:flex",
                    p && on ? "opacity-100" : "pointer-events-none opacity-0",
                    !on && "translate-x-4",
                    "right-0"
                  )}
                  style={{ top: p?.top ?? 0, width: CARD - GAP }}
                />
              )
            })}
          </div>
        </div>
      </div>

      {/* Narrow screens: the cards as a list */}
      <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:hidden">
        {MARKS.map((m) => (
          <li key={m.n} className="flex">
            <CalloutCard m={m} on={hover === m.n} onFocus={setHover} number className="w-full" />
          </li>
        ))}
      </ol>
    </div>
  )
}
