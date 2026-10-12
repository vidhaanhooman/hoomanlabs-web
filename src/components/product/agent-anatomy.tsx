"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { BookOpenTextIcon, CheckIcon, PlayIcon, SpeakerHighIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

/**
 * Everything an agent needs, explained on one screen (/lab/v3): a large,
 * static prompt editor with a small numbered marker right beside each part
 * that matters, and a callout card for each, three a side, level with its
 * marker and joined to the editor's edge by a hairline. Hovering (or
 * focusing) a card spotlights its part: the rest of the editor dims.
 * Below lg the cards become a numbered list under the editor; tapping one
 * spotlights the same way. Sample content (fictional Halden Energy agent).
 */

type Mark = { n: number; side: "left" | "right"; title: string; body: string }

const MARKS: Mark[] = [
  { n: 1, side: "left", title: "Pre-call context", body: "Filled in before the first ring, from your CRM and billing." },
  { n: 2, side: "left", title: "Conditions", body: "Branch the call in CEL, right inside the prompt." },
  { n: 3, side: "right", title: "Knowledge base", body: "Answers cited from your own documents." },
  { n: 4, side: "right", title: "Tools", body: "Payments, tickets and messages, called by name." },
  { n: 5, side: "left", title: "After the call", body: "Summary, CRM update and a QA score, automatically." },
  { n: 6, side: "right", title: "Voice & languages", body: "A warm en-GB voice, 30 languages, natural turn-taking." },
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
        <div className={cn("relative rounded-md bg-[oklch(0.72_0.14_295/0.1)] px-4 py-3 font-mono text-[12px] leading-[1.8] ring-1 ring-[oklch(0.72_0.14_295/0.3)]", dim(2, 4))}>
          <div>
            <span className={op}>{"{{ "}</span>
            <span className={vr}>context.balance</span>
            <span className={op}>{" > 0 && !"}</span>
            <span className={vr}>context.promiseToPay</span>
            <span className={op}> ?</span>
            <Marker n={2} />
          </div>
          <div className="pl-4 text-(--ui-text)/85">
            &quot;&quot;&quot;Offer to take the payment now with <span className="text-[oklch(0.82_0.12_80)]">[take_payment]</span>
            <Marker n={4} />. If they can&rsquo;t pay in full, offer a plan of up to three instalments.&quot;&quot;&quot;
          </div>
          <div className="pl-4 text-(--ui-text)/85">
            <span className={op}>: </span>&quot;&quot;&quot;Confirm nothing is owed.&quot;&quot;&quot;<span className={op}>{" }}"}</span>
          </div>
          <span className="absolute -top-2.5 right-3 flex items-center gap-1 rounded-full border border-(--ui-line) bg-(--ui-bg) px-2 py-0.5 font-sans text-[11px]">
            <CheckIcon weight="bold" className="size-3 text-(--ui-live)" aria-hidden />
            Valid CEL
          </span>
        </div>
      </div>

      {/* Post-call */}
      <div className={cn("flex flex-wrap items-center gap-x-5 gap-y-1.5 border-t border-(--ui-line) bg-(--ui-panel) px-8 py-3 text-[12px] text-(--ui-muted) @3xl:px-12", dim(5))}>
        <span className="flex items-center font-mono text-[11px] tracking-wide uppercase">
          After the call
          <Marker n={5} />
        </span>
        {["Summary written", "HubSpot updated", "Ticket #TCK-2291", "QA 4.6 / 5"].map((t) => (
          <span key={t} className="flex items-center gap-1.5 text-(--ui-text)/85">
            <CheckIcon weight="bold" className="size-3 text-(--ui-live)" aria-hidden />
            {t}
          </span>
        ))}
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
        "flex gap-2.5 rounded-lg border bg-surface p-3.5 text-left transition-[border-color,background-color,box-shadow] duration-200",
        on ? "border-line-strong bg-background shadow-[0_10px_30px_-18px_oklch(0.2_0.02_260/0.5)]" : "border-line hover:border-line-strong",
        className
      )}
      style={style}
    >
      {number && <span className="grid size-5 shrink-0 place-items-center rounded-full bg-foreground font-mono text-[10.5px] text-background">{m.n}</span>}
      <span className="flex flex-col gap-0.5">
        <span className="text-body font-medium">{m.title}</span>
        <span className="text-small text-ink-secondary">{m.body}</span>
      </span>
    </button>
  )
}

/* ------------------------------------------------------------ layout */

/** Callout column width and spacing (px). */
const CARD = 224
const GAP = 12
const MIN_SPACE = 12

type Pos = { n: number; y: number; top: number }

export function AgentAnatomy() {
  const box = useRef<HTMLDivElement>(null)
  const editor = useRef<HTMLDivElement>(null)
  const cards = useRef<Record<number, HTMLButtonElement | null>>({})
  const [pos, setPos] = useState<Pos[]>([])
  const [edge, setEdge] = useState({ left: 0, right: 0 })
  const [focus, setFocus] = useState<number | null>(null)

  // Marker positions relative to the section, and each card's top placed level
  // with its marker (pushed down if the card above on the same side would overlap).
  useLayoutEffect(() => {
    const root = box.current
    const ed = editor.current
    if (!root || !ed) return
    const measure = () => {
      const r = root.getBoundingClientRect()
      const e = ed.getBoundingClientRect()
      setEdge({ left: e.left - r.left, right: e.right - r.left })
      const ys = MARKS.map((m) => {
        const b = ed.querySelector<HTMLElement>(`[data-marker="${m.n}"]`)?.getBoundingClientRect()
        return { m, y: b ? b.top - r.top + b.height / 2 : 0 }
      })
      const next: Pos[] = []
      for (const side of ["left", "right"] as const) {
        let floor = 0
        ys.filter((p) => p.m.side === side)
          .sort((a, b) => a.y - b.y)
          .forEach(({ m, y }) => {
            const h = cards.current[m.n]?.offsetHeight ?? 80
            const top = Math.max(y - 22, floor)
            floor = top + h + MIN_SPACE
            next.push({ n: m.n, y, top })
          })
      }
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
      <div ref={box} className="relative lg:grid lg:grid-cols-[14rem_minmax(0,1fr)_14rem] lg:gap-x-12 lg:py-4">
        <div aria-hidden className="hidden lg:block" />
        <div ref={editor}>
          <Editor focus={focus} />
        </div>
        <div aria-hidden className="hidden lg:block" />

        {/* Hairlines: from each card to the editor's edge, level with its marker */}
        {pos.map((p) => {
          const m = MARKS[p.n - 1]
          const style =
            m.side === "left"
              ? { top: p.y, left: CARD - GAP, right: `calc(100% - ${edge.left}px)` }
              : { top: p.y, left: edge.right, right: CARD - GAP }
          return (
            <span
              key={`l${p.n}`}
              aria-hidden
              className={cn("absolute hidden h-px transition-colors duration-200 lg:block", focus === p.n ? "bg-foreground/50" : "bg-line-strong")}
              style={style}
            />
          )
        })}

        {/* Callout cards, three a side */}
        {MARKS.map((m) => {
          const p = at(m.n)
          return (
            <CalloutCard
              key={m.n}
              m={m}
              on={focus === m.n}
              onFocus={setFocus}
              cardRef={(el) => {
                cards.current[m.n] = el
              }}
              className={cn("absolute hidden lg:flex", p ? "opacity-100" : "opacity-0", m.side === "left" ? "left-0" : "right-0")}
              style={{ top: p?.top ?? 0, width: CARD - GAP }}
            />
          )
        })}
      </div>

      {/* Narrow screens: the cards as a list */}
      <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:hidden">
        {MARKS.map((m) => (
          <li key={m.n} className="flex">
            <CalloutCard m={m} on={focus === m.n} onFocus={setFocus} number className="w-full" />
          </li>
        ))}
      </ol>
    </div>
  )
}
