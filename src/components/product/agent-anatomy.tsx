"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { BookOpenTextIcon, CheckIcon, PlayIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

/**
 * Everything an agent needs, explained on one screen (/lab/v3): a large,
 * static prompt editor with numbered markers in its margins, and callouts on
 * either side that line up with each marker, joined by a straight hairline
 * (lines never cross the text). Below lg the callouts become a numbered list
 * under the editor. Sample content (fictional Halden Energy billing agent).
 */

type Mark = { n: number; side: "left" | "right"; title: string; body: string }

const MARKS: Mark[] = [
  { n: 1, side: "left", title: "Pre-call context", body: "Values filled in before the first ring, from your CRM and billing." },
  { n: 2, side: "left", title: "Conditions", body: "Branch the call in CEL, right inside the prompt. Checked as you type." },
  { n: 3, side: "right", title: "Knowledge base", body: "Answers come from your own documents, with the source cited." },
  { n: 4, side: "right", title: "Tools", body: "Called by name to take payments, raise tickets and send messages." },
  { n: 5, side: "right", title: "After the call", body: "Summary written, CRM updated and the call scored, automatically." },
]

/* ------------------------------------------------------------ editor bits */

const Var = ({ children, mark }: { children: React.ReactNode; mark?: number }) => (
  <span
    data-mark={mark}
    className={cn(
      "rounded-[4px] bg-[oklch(0.72_0.14_295/0.18)] px-1 py-px font-mono text-[0.92em] text-[oklch(0.86_0.08_295)]",
      mark && "ring-1 ring-white/35"
    )}
  >
    {`{{${children}}}`}
  </span>
)
const Tool = ({ children, mark }: { children: React.ReactNode; mark?: number }) => (
  <span data-mark={mark} className={cn("text-[oklch(0.82_0.12_80)]", mark && "rounded-[3px] ring-1 ring-white/35")}>
    [{children}]
  </span>
)
const op = "text-[oklch(0.72_0.14_295)]"
const vr = "text-[oklch(0.78_0.11_240)]"

function Editor() {
  return (
    <div className="ui-dark overflow-hidden rounded-lg text-[13px] leading-[1.7] shadow-[0_40px_100px_-50px_oklch(0.2_0.02_260/0.6)] @container lg:text-[14px]">
      {/* Toolbar */}
      <div className="flex h-12 items-center gap-3 border-b border-(--ui-line) px-4">
        <div className="flex gap-0.5 rounded-md bg-(--ui-raised) p-0.5 text-[12.5px]">
          <span className="rounded-[5px] bg-(--ui-bg) px-3 py-1 shadow-xs">Preview</span>
          <span className="px-3 py-1 text-(--ui-muted)">Text</span>
        </div>
        <span className="hidden text-[12px] text-(--ui-muted) @2xl:inline">Billing assistant · v5</span>
        <span className="ml-auto flex items-center gap-1.5 text-[12px] text-(--ui-muted)">
          <PlayIcon className="size-3" aria-hidden />
          Test
        </span>
      </div>

      {/* Prompt */}
      <div className="flex flex-col gap-2.5 px-8 py-6 @3xl:px-12">
        <h4 className="font-medium">Identity &amp; role</h4>
        <p className="text-(--ui-text)/85">
          You are Ria, a virtual assistant answering billing calls for Halden Energy. Resolve the reason for the call in one go: explain a charge, take a payment, agree a plan or raise a refund. Warm, clear and brief.
        </p>

        <h4 className="pt-2 font-medium">What you know at the start</h4>
        <ul className="flex list-disc flex-col gap-1 pl-5 text-(--ui-text)/85 marker:text-(--ui-muted)">
          <li>
            The customer is <Var>context.name</Var>, account <Var>context.account</Var>
          </li>
          <li>
            Their open balance is <Var mark={1}>context.balance</Var>, due <Var>context.dueDate</Var>
          </li>
        </ul>

        <h4 className="pt-2 font-medium">Conversation flow</h4>
        <ol className="flex list-decimal flex-col gap-1.5 pl-5 text-(--ui-text)/85 marker:text-(--ui-muted)">
          <li>Greet them by name and say why you think they&rsquo;re calling.</li>
          <li>
            If they ask about refunds or charges, answer from the knowledge base and cite it{" "}
            <span data-mark={3} className="inline-flex items-center gap-1 rounded-full px-2 py-px align-middle text-[11.5px] text-(--ui-muted) ring-1 ring-white/35">
              <BookOpenTextIcon className="size-3" aria-hidden />
              Refund policy §3
            </span>
          </li>
          <li>Otherwise, follow the instructions for this account&rsquo;s status:</li>
        </ol>
        <div
          data-mark={2}
          className="relative rounded-md bg-[oklch(0.72_0.14_295/0.1)] px-4 py-3 font-mono text-[12px] leading-[1.8] ring-1 ring-[oklch(0.72_0.14_295/0.3)]"
        >
          <div>
            <span className={op}>{"{{ "}</span>
            <span className={vr}>context.balance</span>
            <span className={op}>{" > 0 && !"}</span>
            <span className={vr}>context.promiseToPay</span>
            <span className={op}> ?</span>
          </div>
          <div className="pl-4 text-(--ui-text)/85">
            &quot;&quot;&quot;Offer to take the payment now with <Tool mark={4}>take_payment</Tool>. If they can&rsquo;t pay in full, offer a plan of up to three
            instalments.&quot;&quot;&quot;
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
      <div data-mark={5} className="flex flex-wrap items-center gap-x-5 gap-y-1.5 border-t border-(--ui-line) bg-(--ui-panel) px-8 py-3 text-[12px] text-(--ui-muted) @3xl:px-12">
        <span className="font-mono text-[11px] tracking-wide uppercase">After the call</span>
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

/* ------------------------------------------------------------ layout */

function Num({ n, className }: { n: number; className?: string }) {
  return (
    <span className={cn("grid size-5 shrink-0 place-items-center rounded-full bg-foreground font-mono text-[10.5px] text-background", className)}>
      {n}
    </span>
  )
}

type Pos = { n: number; y: number; x: number }

/** Callout column width and the gap before a line starts (px). */
const CALLOUT = 224
const GAP = 12

export function AgentAnatomy() {
  const box = useRef<HTMLDivElement>(null)
  const editor = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<Pos[]>([])
  const [edge, setEdge] = useState({ left: 0, right: 0 })

  // Where each marked element sits, relative to the section; re-measured on resize.
  useLayoutEffect(() => {
    const root = box.current
    const ed = editor.current
    if (!root || !ed) return
    const measure = () => {
      const r = root.getBoundingClientRect()
      const e = ed.getBoundingClientRect()
      setEdge({ left: e.left - r.left, right: e.right - r.left })
      setPos(
        MARKS.map((m) => {
          const el = ed.querySelector<HTMLElement>(`[data-mark="${m.n}"]`)
          const b = el?.getBoundingClientRect()
          const y = b ? b.top - r.top + Math.min(b.height / 2, 12) : 0
          return { n: m.n, y, x: m.side === "left" ? e.left - r.left : e.right - r.left }
        })
      )
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
      <div ref={box} className="relative lg:grid lg:grid-cols-[14rem_minmax(0,1fr)_14rem] lg:gap-x-12 lg:pb-16">
        <div aria-hidden className="hidden lg:block" />
        <div ref={editor}>
          <Editor />
        </div>
        <div aria-hidden className="hidden lg:block" />

        {/* Hairlines: from each callout's inner edge straight to its marker */}
        {pos.map((p) => {
          const m = MARKS[p.n - 1]
          const style =
            m.side === "left"
              ? { top: p.y, left: CALLOUT + GAP, right: `calc(100% - ${edge.left + 10}px)` }
              : { top: p.y, left: edge.right - 10, right: CALLOUT + GAP }
          return <span key={`l${p.n}`} aria-hidden className="absolute hidden h-px bg-line-strong lg:block" style={style} />
        })}

        {/* Markers in the editor's margins, over the line ends */}
        {pos.map((p) => {
          const m = MARKS[p.n - 1]
          return (
            <span
              key={p.n}
              aria-hidden
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ top: p.y, left: m.side === "left" ? edge.left + 14 : edge.right - 14 }}
            >
              <Num n={p.n} className="bg-white text-black" />
            </span>
          )
        })}

        {/* Callouts, each level with its marker */}
        {MARKS.map((m) => {
          const p = at(m.n)
          return (
            <div
              key={m.n}
              className={cn(
                "absolute hidden -translate-y-[0.7rem] transition-opacity duration-300 lg:flex",
                p ? "opacity-100" : "opacity-0",
                m.side === "left" ? "left-0 flex-row-reverse text-right" : "right-0"
              )}
              style={{ top: p?.y ?? 0, width: CALLOUT }}
            >
              <div className={cn("flex gap-2.5", m.side === "left" && "flex-row-reverse")}>
                <Num n={m.n} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-body font-medium">{m.title}</span>
                  <span className="text-small text-ink-secondary">{m.body}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Narrow screens: the callouts as a list */}
      <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:hidden">
        {MARKS.map((m) => (
          <li key={m.n} className="flex gap-2.5">
            <Num n={m.n} />
            <div className="flex flex-col gap-0.5">
              <span className="text-body font-medium">{m.title}</span>
              <span className="text-small text-ink-secondary">{m.body}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
