"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { CheckCircleIcon, PlayIcon } from "@phosphor-icons/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * Recreated prompt editor (agent builder), in the platform's style: a
 * Preview / Text toolbar, a structured prompt with variable pills and tool
 * references, and an inline CEL expression that writes itself in once the
 * editor is on screen, then validates. "Text" shows the same prompt raw.
 * Content is a sample (fictional Halden Energy billing agent).
 */

type Seg = string | { v: string } | { tool: string }
type Block = { h: string } | { p: Seg[] } | { ul: Seg[][] } | { ol: Seg[][] } | { cel: true }

const DOC: Block[] = [
  { h: "Identity & role" },
  {
    p: [
      "You are Ria, a virtual assistant answering billing calls for Halden Energy. Your one job is to resolve the reason for the call: explain a charge, take a payment, agree a plan or raise a refund. You are warm, clear and brief, never pushy.",
    ],
  },
  { h: "What you know at the start (provided to you, do not ask for these)" },
  {
    ul: [
      ["The customer's account is: ", { v: "context.account" }],
      ["Their open balance is ", { v: "context.balance" }, ", due ", { v: "context.dueDate" }],
      ["Today's date is ", { v: "context.currentDate" }, ". Use these as facts; never read them out raw."],
    ],
  },
  { h: "Objective" },
  { p: ["Resolve it in one call. Done means a payment is taken, a plan is agreed, a refund is raised, or the customer is transferred to the billing team."] },
  { h: "Conversation flow" },
  {
    ol: [
      ["Greet them by name and say why you think they're calling, tied to their account."],
      ["If they mention a charge they don't recognise, check it with tool ", { tool: "get_payments" }, " and explain it in one line."],
      ["Otherwise, follow the instructions for this account's status:"],
    ],
  },
  { cel: true },
  {
    ol: [
      ["Refunds over £50 need approval. Say so in one line, then use tool ", { tool: "create_ticket" }, " with a short summary and text them the reference."],
    ],
  },
]

const CEL = `{{ context.balance > 0 && !context.promiseToPay ? """The account has an overdue balance of {{context.balance}}. Offer to take the payment now with tool [take_payment]. If they can't pay in full, offer a plan of up to three instalments and read it back before confirming.""" : """The account is up to date. Answer their question and confirm nothing is owed.""" }}`

/** Light syntax colouring for the CEL block: tokens with a colour each, worked out once. */
const TOKEN = /(\{\{|\}\}|"""|context\.\w+|\[[a-z_]+\]|&&|\|\||\?|:|>|!)/g
const CEL_TOKENS = (() => {
  let inString = false
  let at = 0
  return CEL.split(TOKEN)
    .filter(Boolean)
    .map((t) => {
      const start = at
      at += t.length
      if (t === '"""') {
        inString = !inString
        return { t, start, cls: "text-[oklch(0.78_0.1_150)]" }
      }
      const cls =
        t === "{{" || t === "}}"
          ? "text-[oklch(0.72_0.14_295)]"
          : /^context\./.test(t)
            ? "text-[oklch(0.78_0.11_240)]"
            : /^\[/.test(t)
              ? "text-[oklch(0.82_0.12_80)]"
              : inString
                ? "text-(--ui-text)/85"
                : "text-[oklch(0.72_0.14_295)]"
      return { t, start, cls }
    })
})()

/** The first `chars` characters of the expression, coloured. */
function Cel({ chars }: { chars: number }) {
  return (
    <>
      {CEL_TOKENS.filter((k) => k.start < chars).map((k) => (
        <span key={k.start} className={k.cls}>
          {k.t.slice(0, chars - k.start)}
        </span>
      ))}
    </>
  )
}

/** Numbered lists continue across the CEL block. */
const OL_START = (() => {
  let n = 0
  return DOC.map((b) => {
    const start = n + 1
    if ("ol" in b) n += b.ol.length
    return start
  })
})()

function Segs({ segs }: { segs: Seg[] }) {
  return (
    <>
      {segs.map((s, i) =>
        typeof s === "string" ? (
          <span key={i}>{s}</span>
        ) : "v" in s ? (
          <span key={i} className="rounded-[4px] bg-[oklch(0.72_0.14_295/0.18)] px-1 py-px font-mono text-[0.92em] text-[oklch(0.86_0.08_295)]">
            <span className="text-[oklch(0.72_0.14_295)]">{"{{"}</span>
            {s.v}
            <span className="text-[oklch(0.72_0.14_295)]">{"}}"}</span>
          </span>
        ) : (
          <span key={i} className="rounded-[4px] bg-[oklch(0.82_0.12_80/0.14)] px-1 py-px font-mono text-[0.92em] text-[oklch(0.86_0.1_80)]">
            [{s.tool}]
          </span>
        )
      )}
    </>
  )
}

function raw(segs: Seg[]) {
  return segs.map((s) => (typeof s === "string" ? s : "v" in s ? `{{${s.v}}}` : `[${s.tool}]`)).join("")
}

const RAW = (() => {
  let n = 0
  return DOC.map((b) => {
    if ("h" in b) return `## ${b.h}`
    if ("p" in b) return raw(b.p)
    if ("ul" in b) return b.ul.map((l) => `- ${raw(l)}`).join("\n")
    if ("ol" in b) return b.ol.map((l) => `${++n}. ${raw(l)}`).join("\n")
    return CEL
  }).join("\n\n")
})()

const TYPE_MS = 14

/** Where each interesting reference ends in the expression (for `onReference`). */
const REFS = [...CEL.matchAll(/context\.\w+|\[[a-z_]+\]/g)].map((m) => ({ ref: m[0], end: m.index! + m[0].length }))

export function PromptEditor({
  className,
  play,
  title,
  onReference,
}: {
  className?: string
  /** Start writing the expression when true (default: once the editor is on screen). */
  play?: boolean
  /** A title at the start of the toolbar (the insert hints are hidden when set). */
  title?: React.ReactNode
  /** Called as the expression finishes writing a variable or tool, e.g. "context.balance", "[take_payment]". */
  onReference?: (ref: string) => void
}) {
  const [view, setView] = useState<"preview" | "text">("preview")
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { amount: 0.45, once: true })
  const inView = play ?? seen
  const reduce = usePrefersReducedMotion()
  const [typed, setTyped] = useState(0)
  const body = useRef<HTMLDivElement>(null)
  const cel = useRef<HTMLDivElement>(null)
  const shown = reduce ? CEL.length : typed
  const valid = shown >= CEL.length

  // Bring the expression into view as it starts (it sits below the fold in short editors).
  useEffect(() => {
    if (!inView || view !== "preview") return
    const b = body.current
    const c = cel.current
    if (!b || !c || b.scrollHeight <= b.clientHeight) return
    const t = setTimeout(() => b.scrollTo({ top: c.offsetTop - 56, behavior: reduce ? "auto" : "smooth" }), 350)
    return () => clearTimeout(t)
  }, [inView, view, reduce])

  // Once written, make sure the whole expression is in view.
  useEffect(() => {
    const b = body.current
    const c = cel.current
    if (!valid || view !== "preview" || !b || !c) return
    const bottom = c.offsetTop + c.offsetHeight + 24 - b.clientHeight
    if (bottom > b.scrollTop) b.scrollTo({ top: bottom, behavior: reduce ? "auto" : "smooth" })
  }, [valid, view, reduce])

  // Write the expression in, a few characters at a time, once on screen.
  // Each step reports any variable or tool it just completed.
  const report = useRef(onReference)
  useEffect(() => {
    report.current = onReference
  })
  useEffect(() => {
    if (reduce || !inView || typed >= CEL.length) return
    const t = setTimeout(() => {
      const next = Math.min(CEL.length, typed + 3)
      REFS.filter((r) => r.end > typed && r.end <= next).forEach((r) => report.current?.(r.ref))
      setTyped(next)
    }, typed === 0 ? 500 : TYPE_MS)
    return () => clearTimeout(t)
  }, [reduce, inView, typed])

  return (
    <div ref={ref} className={cn("ui-dark @container flex flex-col overflow-hidden text-[13px] leading-[1.7] @3xl:text-[14px]", className)}>
      {/* Toolbar */}
      <div className={cn("flex h-12 shrink-0 items-center gap-3 border-b border-(--ui-line)", title ? "px-4" : "px-3")}>
        {title}
        <div role="tablist" aria-label="Prompt view" className={cn("flex gap-0.5 rounded-md bg-(--ui-raised) p-0.5", title && "ml-auto")}>
          {(["preview", "text"] as const).map((v) => (
            <button
              key={v}
              type="button"
              role="tab"
              aria-selected={view === v}
              onClick={() => setView(v)}
              className={cn(
                "rounded-[5px] px-3 py-1 text-[12.5px] capitalize transition-colors",
                view === v ? "bg-(--ui-bg) text-(--ui-text) shadow-xs" : "text-(--ui-muted) hover:text-(--ui-text)"
              )}
            >
              {v}
            </button>
          ))}
        </div>
        <div className={cn("ml-auto hidden items-center gap-4 text-[12px] text-(--ui-muted)", !title && "@2xl:flex")}>
          <span>Type to insert</span>
          <span className="flex items-center gap-1.5">
            <kbd className="rounded border border-(--ui-line) bg-(--ui-raised) px-1.5 font-mono text-[11px]">`</kbd>
            tools
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="rounded border border-(--ui-line) bg-(--ui-raised) px-1.5 font-mono text-[11px] text-[oklch(0.72_0.14_295)]">{"{{"}</kbd>
            variables and conditional expressions
          </span>
        </div>
        <span className={cn("flex items-center gap-1.5 text-[12px] text-(--ui-muted)", title ? "pl-1" : "ml-auto @2xl:ml-0")}>
          <PlayIcon className="size-3" aria-hidden />
          Test
        </span>
      </div>

      {/* Body */}
      <div
        ref={body}
        className="relative min-h-0 flex-1 overflow-hidden px-5 py-5 @3xl:px-7"
        style={{ maskImage: "linear-gradient(to bottom, black 88%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, black 88%, transparent)" }}
      >
        {view === "text" ? (
          <pre className="font-mono text-[12.5px] leading-[1.75] whitespace-pre-wrap text-(--ui-text)/85">{RAW}</pre>
        ) : (
          <div className="flex flex-col gap-2.5">
            {DOC.map((b, i) => {
              if ("h" in b)
                return (
                  <h4 key={i} className={cn("text-[1.05em] font-medium", i > 0 && "pt-2")}>
                    {b.h}
                  </h4>
                )
              if ("p" in b)
                return (
                  <p key={i} className="text-(--ui-text)/85">
                    <Segs segs={b.p} />
                  </p>
                )
              if ("ul" in b)
                return (
                  <ul key={i} className="flex list-disc flex-col gap-1 pl-5 text-(--ui-text)/85 marker:text-(--ui-muted)">
                    {b.ul.map((l, j) => (
                      <li key={j}>
                        <Segs segs={l} />
                      </li>
                    ))}
                  </ul>
                )
              if ("ol" in b) {
                return (
                  <ol key={i} start={OL_START[i]} className="flex list-decimal flex-col gap-1 pl-5 text-(--ui-text)/85 marker:text-(--ui-muted)">
                    {b.ol.map((l, j) => (
                      <li key={j}>
                        <Segs segs={l} />
                      </li>
                    ))}
                  </ol>
                )
              }
              return (
                <div key={i} ref={cel} className="relative rounded-md bg-[oklch(0.72_0.14_295/0.1)] px-3.5 py-3 font-mono text-[12.5px] leading-[1.75] ring-1 ring-[oklch(0.72_0.14_295/0.25)]">
                  <Cel chars={shown} />
                  {!valid && <span className="ml-px inline-block h-[1.1em] w-px translate-y-[3px] bg-(--ui-text) motion-safe:animate-[blink_1s_steps(1)_infinite]" />}
                  <span
                    className={cn(
                      "absolute -top-2.5 right-3 flex items-center gap-1 rounded-full border border-(--ui-line) bg-(--ui-bg) px-2 py-0.5 font-sans text-[11px] transition-opacity duration-500",
                      valid ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <CheckCircleIcon weight="fill" className="size-3.5 text-(--ui-live)" aria-hidden />
                    Valid CEL
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
