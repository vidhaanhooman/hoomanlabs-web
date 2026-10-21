"use client"

import { BankIcon, CalendarCheckIcon, CheckIcon, DeviceMobileIcon, GraduationCapIcon, PhoneIcon, ShoppingCartIcon, TruckIcon, type Icon } from "@phosphor-icons/react"

import { ProductPanel } from "@/components/sections/how-it-works-v3"
import type { Industry } from "@/content/industries"
import { cn } from "@/lib/utils"

/**
 * The three changes, in the homepage's ProductPanel: the changes as rows on
 * the left; on the right the product's call view. Its list holds one call
 * per change, top to bottom in the rows' order, and the active row's call
 * plays out live: the waveform runs, the customer's words come in one by
 * one, Ria's actions spin and tick, then the outcome lands and the call
 * reads Done. No names or figures, black and grey only.
 */
export function ChangesPanel({ industry: x }: { industry: Industry }) {
  const rows = x.solves.map((sv, i) => ({ id: `c${i}`, title: sv.title, body: sv.body }))
  return (
    <ProductPanel
      id="industry-changes"
      label="How Ria fixes it"
      title={`Three changes for ${x.name} teams.`}
      rows={rows}
      screen={(cls, focus) => <CallScreen className={cls} focus={focus} industry={x} />}
    />
  )
}

/** Timings (ms) for the live call. */
const WORD_MS = 55
const STEP_MS = 520

function CallScreen({ className, focus, industry: x }: { className: string; focus: string; industry: Industry }) {
  const active = Math.max(
    0,
    x.solves.findIndex((_, i) => focus === `c${i}`),
  )
  const sv = x.solves[active]
  const words = sv.moment.text.split(" ")
  const quoteEnd = 250 + words.length * WORD_MS
  const actions = sv.done.detail.split(" · ").map((a) => a.charAt(0).toUpperCase() + a.slice(1))
  const actionsStart = quoteEnd + 300
  const outcomeAt = actionsStart + actions.length * STEP_MS + 200

  return (
    <div aria-hidden className={cn("ui-dark flex flex-col overflow-hidden bg-[oklch(0.13_0_0)]", className)}>
      <div className="flex h-9 shrink-0 items-center gap-2 border-b border-(--ui-line) px-3 text-[11px] text-(--ui-muted)">
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2 rounded-full bg-white/10" />
          ))}
        </span>
        <span className="ml-1 text-(--ui-text)">Calls · {x.name}</span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[34%_1fr] pr-[22%]">
        {/* The call list: one call per change, in the rows' order */}
        <ul className="flex flex-col gap-1 border-r border-(--ui-line) p-2.5">
          {x.solves.map((c, i) => (
            <li key={c.title} className={cn("flex flex-col gap-1 rounded-md px-3 py-2.5 transition-colors duration-300", i === active ? "bg-(--ui-raised)" : "opacity-50")}>
              <span className="flex items-center justify-between font-mono text-[10px] tracking-wide text-(--ui-muted) uppercase">
                Call {i + 1}
                {i === active && <PhoneIcon weight="fill" className="size-3 text-(--ui-text)" />}
              </span>
              <span className="truncate text-[12px] text-(--ui-text)">{c.done.title}</span>
            </li>
          ))}
        </ul>

        {/* The active call, played out; keyed so it replays on every change */}
        <div key={active} className="flex min-w-0 flex-col gap-5 p-5 pb-[14%]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10.5px] tracking-wide text-(--ui-muted) uppercase">Call {active + 1}</span>
            <span className="relative flex h-6 items-center">
              <span className="call-out flex items-center gap-2 text-[11px] text-(--ui-text)" style={{ "--d": `${outcomeAt}ms` } as React.CSSProperties}>
                <span className="flex h-4 items-center gap-[3px]">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span key={i} className="call-wave h-full w-[3px] rounded-full bg-(--ui-text)" style={{ "--i": i } as React.CSSProperties} />
                  ))}
                </span>
                Live
              </span>
              <span className="call-in absolute right-0 flex items-center gap-1.5 text-[11px] text-(--ui-muted)" style={{ "--d": `${outcomeAt}ms` } as React.CSSProperties}>
                <CheckIcon weight="bold" className="size-3" />
                Done
              </span>
            </span>
          </div>

          {/* What was said, word by word */}
          <div className="flex flex-col gap-1.5">
            <span className="call-in text-[11px] text-(--ui-muted)" style={{ "--d": "100ms" } as React.CSSProperties}>
              {sv.moment.who}
            </span>
            <p className="text-[15px] leading-snug text-(--ui-text)">
              {words.map((w, i) => (
                <span key={i} className="call-in inline-block" style={{ "--d": `${250 + i * WORD_MS}ms` } as React.CSSProperties}>
                  {i === 0 ? "“" : ""}
                  {w}
                  {i === words.length - 1 ? "”" : ""}&nbsp;
                </span>
              ))}
            </p>
          </div>

          {/* What Ria does, each spinning, then ticked */}
          <ul className="flex flex-col gap-2 border-t border-(--ui-line) pt-4">
            {actions.map((a, i) => {
              const at = actionsStart + i * STEP_MS
              return (
                <li key={a} className="call-in flex items-center gap-2.5 text-[12.5px] text-(--ui-muted)" style={{ "--d": `${at}ms` } as React.CSSProperties}>
                  <span className="relative grid size-4 shrink-0 place-items-center">
                    <span className="call-out absolute inset-0" style={{ "--d": `${at + STEP_MS - 120}ms` } as React.CSSProperties}>
                      <span className="call-spin block size-full rounded-full border-[1.5px] border-(--ui-line) border-t-(--ui-text)" />
                    </span>
                    <CheckIcon weight="bold" className="call-in size-3.5 text-(--ui-text)" style={{ "--d": `${at + STEP_MS - 120}ms` } as React.CSSProperties} />
                  </span>
                  {a}
                </li>
              )
            })}
          </ul>

          {/* The industry's own record, written back as the call ends */}
          <Record slug={x.slug} title={sv.done.title} from={actionsStart} at={outcomeAt} />
        </div>
      </div>
    </div>
  )
}

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties

/** Each industry's record: what it is, where it lives, and its picture. */
const RECORDS: Record<string, { icon: Icon; label: string; system: string }> = {
  "e-commerce": { icon: ShoppingCartIcon, label: "Order", system: "Store" },
  bfsi: { icon: BankIcon, label: "Loan account", system: "Loan system" },
  education: { icon: GraduationCapIcon, label: "Enquiry", system: "CRM" },
  logistics: { icon: TruckIcon, label: "Delivery", system: "Route plan" },
  healthcare: { icon: CalendarCheckIcon, label: "Doctor's week", system: "Calendar" },
  "consumer-ai": { icon: DeviceMobileIcon, label: "In the app", system: "Your product" },
}

/**
 * The record the call updates, drawn for its industry (a cart, a loan's
 * instalments, an enquiry's stages, a delivery route, a week of slots, the
 * app's talk button). It rises in as Ria starts acting; at the end its last
 * step fills and the status turns into the outcome.
 */
function Record({ slug, title, from, at }: { slug: string; title: string; from: number; at: number }) {
  const r = RECORDS[slug] ?? RECORDS.bfsi
  const I = r.icon
  const fill = "call-in absolute inset-0 rounded-[inherit] bg-(--ui-text)"
  return (
    <div className="call-in flex flex-col gap-3.5 rounded-md border border-(--ui-line) bg-(--ui-panel) p-4" style={d(from)}>
      <div className="flex items-center justify-between text-[11px] text-(--ui-muted)">
        <span className="flex items-center gap-1.5 text-(--ui-text)">
          <I className="size-3.5" />
          {r.label}
        </span>
        {r.system}
      </div>

      {slug === "e-commerce" && (
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-9 rounded-md bg-(--ui-raised)" />
          ))}
          <span className="ml-1 flex flex-1 flex-col gap-1.5">
            <span className="h-1.5 w-3/4 rounded-full bg-(--ui-raised)" />
            <span className="h-1.5 w-1/2 rounded-full bg-(--ui-raised)" />
          </span>
        </div>
      )}

      {slug === "bfsi" && (
        <div className="flex gap-1">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className={cn("relative h-2 flex-1 rounded-full", i < 8 ? "bg-(--ui-text)/70" : "bg-(--ui-raised)")}>
              {i === 8 && <span className={fill} style={d(at)} />}
            </span>
          ))}
        </div>
      )}

      {(slug === "education" || slug === "logistics") && (
        <div className="flex items-center">
          {(slug === "education" ? ["Enquiry", "Qualified", "Booked"] : ["Warehouse", "On route", "Door"]).map((step, i, all) => (
            <span key={step} className={cn("flex items-center", i < all.length - 1 && "flex-1")}>
              <span className="flex flex-col items-start gap-1.5">
                <span className={cn("relative size-3 rounded-full", i < 2 ? "bg-(--ui-text)/70" : "bg-(--ui-raised)")}>{i === 2 && <span className={fill} style={d(at)} />}</span>
                <span className="text-[10px] text-(--ui-muted)">{step}</span>
              </span>
              {i < all.length - 1 && <span className="mx-2 mb-4 h-px flex-1 bg-(--ui-line)" />}
            </span>
          ))}
        </div>
      )}

      {slug === "healthcare" && (
        <div className="grid grid-cols-5 gap-1.5">
          {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, c) => (
            <span key={day} className="flex flex-col gap-1">
              <span className="text-[10px] text-(--ui-muted)">{day}</span>
              {[0, 1].map((row) => (
                <span key={row} className={cn("relative h-3 rounded-sm", (c + row) % 3 === 0 ? "bg-(--ui-text)/45" : "bg-(--ui-raised)")}>
                  {c === 3 && row === 1 && <span className={fill} style={d(at)} />}
                </span>
              ))}
            </span>
          ))}
        </div>
      )}

      {slug === "consumer-ai" && (
        <div className="flex items-center gap-3">
          <span className="flex flex-1 flex-col gap-1.5">
            <span className="h-1.5 w-2/3 rounded-full bg-(--ui-raised)" />
            <span className="h-1.5 w-1/2 rounded-full bg-(--ui-raised)" />
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-(--ui-text) px-3 py-1.5 text-[10.5px] text-(--ui-bg)">
            <PhoneIcon weight="fill" className="size-3" />
            Tap to talk
          </span>
        </div>
      )}

      {/* Status: updating while Ria acts, then the outcome */}
      <div className="relative h-9 border-t border-(--ui-line) text-[12.5px]">
        <span className="call-out absolute inset-x-0 top-3 bottom-0 flex items-center text-(--ui-muted)" style={d(at)}>
          Updating…
        </span>
        <span className="call-in absolute inset-x-0 top-3 bottom-0 flex min-w-0 items-center gap-2 text-(--ui-text)" style={d(at)}>
          <span className="grid size-4 shrink-0 place-items-center rounded-full bg-(--ui-text) text-(--ui-bg)">
            <CheckIcon weight="bold" className="size-2.5" />
          </span>
          <span className="truncate">
            {title} <span className="text-(--ui-muted)">· written back before the call ended</span>
          </span>
        </span>
      </div>
    </div>
  )
}
