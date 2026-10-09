import { ArrowRightIcon, CheckIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"

/**
 * One small result card per use case, in the same dark UI language as the
 * hero: what the agent produced on the call. Each shows the result
 * the agent produced, not a person. Fictional demo data.
 */

export type UseCaseVisual = "collections" | "booking" | "leads" | "support" | "renewals" | "surveys"

/**
 * Graphite: a lighter dark grey instead of pure black, with
 * softer hairlines, so dark cards don't read as heavy slabs on a light page.
 */
const CHARCOAL = "dark graphite"

/** The result card for a use case: charcoal by default, "light" or "dark" (pure) on request. */
export function UseCaseVignette({
  kind,
  theme = "charcoal",
}: {
  kind: UseCaseVisual
  theme?: "charcoal" | "light" | "dark"
}) {
  const Visual = VISUALS[kind]
  return (
    <div className={cn("text-[12px] leading-snug text-foreground", theme === "charcoal" && CHARCOAL, theme === "dark" && "dark")}>
      <Visual />
    </div>
  )
}

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("flex flex-col rounded-lg border border-line-strong bg-linear-to-b from-surface to-background to-40% p-3 shadow-[inset_0_1px_0_oklch(1_0_0/0.07),0_14px_32px_-14px_oklch(0_0_0/0.35)]", className)}>
      {children}
    </div>
  )
}

function Row({ k, v, className }: { k: string; v: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center justify-between gap-3 border-t border-line py-1.5 first:border-0", className)}>
      <span className="text-ink-muted">{k}</span>
      <span>{v}</span>
    </div>
  )
}

function Done({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-foreground px-2 py-0.5 text-[10px] text-background",
        className
      )}
    >
      <CheckIcon weight="bold" className="size-2.5" />
      {children}
    </span>
  )
}

function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border border-line-strong bg-background px-2 py-0.5 text-[10px] text-ink-secondary", className)}>
      {children}
    </span>
  )
}

const WAVE = [5, 9, 7, 11, 6, 10, 8]
function Wave() {
  return (
    <span className="flex h-3 items-center gap-[2px]">
      {WAVE.map((h, i) => (
        <span key={i} className="w-[2px] rounded-full bg-foreground" style={{ height: h }} />
      ))}
    </span>
  )
}

/* ------------------------------------------------------------ visuals */

function Collections() {
  return (
    <div className="flex w-60 flex-col items-start gap-2">
      <Chip>
        <Wave /> Reminder call · 1:12
      </Chip>
      <Card className="w-full">
        <span className="mb-1 font-medium">March bill</span>
        <Row k="Amount" v="£86.00" />
        <Row k="Due" v="28 Mar" />
        <Row k="Outcome" v={<Done>Promise to pay · Fri</Done>} />
      </Card>
    </div>
  )
}

function Booking() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
  return (
    <div className="flex w-64 flex-col gap-2">
      <Card className="w-full">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-medium">This week</span>
          <span className="text-ink-muted">Dr. Rao</span>
        </div>
        <div className="grid grid-cols-5 gap-1 text-center">
          {days.map((d) => (
            <span key={d} className="text-[10px] text-ink-muted">
              {d}
            </span>
          ))}
          {Array.from({ length: 15 }, (_, i) => (
            <span
              key={i}
              className={cn(
                "h-4 rounded-sm",
                i === 8 ? "bg-foreground" : [1, 5, 12].includes(i) ? "bg-line-strong" : "bg-surface"
              )}
            />
          ))}
        </div>
      </Card>
      <Done className="self-end">Booked · Thu 10:00</Done>
    </div>
  )
}

function Leads() {
  return (
    <div className="flex w-64 flex-col gap-2">
      <div className="flex items-center gap-2">
        <Chip>New lead · 2 min ago</Chip>
        <ArrowRightIcon className="size-3 text-ink-muted" />
        <Done>Qualified</Done>
      </div>
      <Card className="w-full">
        <span className="mb-1 font-medium">Northwind Ltd</span>
        <Row k="Budget" v={<CheckIcon weight="bold" className="size-3" />} />
        <Row k="Timeline" v="This quarter" />
        <Row k="Next" v="Sales call · Tue 3pm" />
      </Card>
    </div>
  )
}

function Support() {
  return (
    <Card className="w-64 gap-0 p-2">
      <div className="flex items-baseline gap-2 px-1 pt-1 pb-2">
        <span className="text-[24px] leading-none font-normal tabular-nums">3</span>
        <span className="text-ink-muted">
          waiting, down from <span className="line-through">12</span>
        </span>
      </div>
      {[
        { t: "Where is my order?", done: true },
        { t: "Change delivery address", done: true },
        { t: "Damaged item, refund", done: false },
      ].map((r) => (
        <div key={r.t} className="flex items-center justify-between gap-2 border-t border-line px-1 py-1.5">
          <span className="truncate">{r.t}</span>
          {r.done ? <Done>Resolved</Done> : <Chip>To your team</Chip>}
        </div>
      ))}
    </Card>
  )
}

function Renewals() {
  return (
    <div className="relative h-44 w-72">
      <Card className="absolute top-0 left-0 w-52">
        <span className="mb-1 font-medium">Plan renewal</span>
        <Row k="Plan" v="Gold · 12 months" />
        <Row k="Status" v={<Done>Renewed</Done>} />
      </Card>
      <Card className="absolute right-0 bottom-0 w-48 p-2.5">
        <span className="text-ink-muted">Flagged at risk</span>
        <span className="mt-0.5 font-medium">2 accounts · callback set</span>
      </Card>
    </div>
  )
}

function Surveys() {
  return (
    <div className="flex w-64 flex-col gap-2">
      <Card className="w-full">
        <span className="mb-2 text-ink-muted">How likely are you to recommend us?</span>
        <div className="grid grid-cols-11 gap-0.5 text-center text-[9px]">
          {Array.from({ length: 11 }, (_, i) => (
            <span
              key={i}
              className={cn("rounded-sm py-0.5", i === 9 ? "bg-foreground text-background" : "bg-surface text-ink-muted")}
            >
              {i}
            </span>
          ))}
        </div>
      </Card>
      <Card className="w-4/5 self-end p-2.5">
        <span>&ldquo;Quick, polite, and in Hindi.&rdquo;</span>
        <span className="mt-0.5 text-ink-muted">Logged to your CRM</span>
      </Card>
    </div>
  )
}

const VISUALS: Record<UseCaseVisual, () => React.ReactNode> = {
  collections: Collections,
  booking: Booking,
  leads: Leads,
  support: Support,
  renewals: Renewals,
  surveys: Surveys,
}
