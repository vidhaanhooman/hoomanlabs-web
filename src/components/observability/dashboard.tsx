import { cn } from "@/lib/utils"

/**
 * The console's calling dashboard, recreated for recall: the calling funnel
 * (six stages, each with its bar, share of attempted, and the conversion
 * from the stage before), calls over time (a line per stage), and the
 * disposition (the split bar and end reasons, grouped by whether a call was
 * ever dialled). Dark, in the product UI, in one neutral ramp with the
 * outcome (Success) as the only accent. Sample numbers only.
 */

type Stage = { name: string; value: number; tone: string }

/** A neutral ramp, brighter further down the funnel; Success takes the live accent. */
const gray = (p: number) => `color-mix(in oklch, var(--ui-text) ${p}%, transparent)`

export const STAGES: Stage[] = [
  { name: "Calls attempted", value: 12480, tone: gray(28) },
  { name: "Calls dialled", value: 12451, tone: gray(38) },
  { name: "Calls connected", value: 6102, tone: gray(50) },
  { name: "Human answered", value: 3904, tone: gray(62) },
  { name: "Engaged", value: 3320, tone: gray(78) },
  { name: "Success", value: 2410, tone: "var(--ui-live)" },
]

const fmt = (n: number) => n.toLocaleString("en-US")
const pct = (a: number, b: number) => `${((a / b) * 100).toFixed(1)}%`

/** The calling funnel: six stages in a row. */
export function Funnel({ compact = false }: { compact?: boolean }) {
  const top = STAGES[0].value
  return (
    <div className="rounded-lg border border-(--ui-line) bg-(--ui-panel) p-3.5">
      <span className="flex items-center justify-between text-[11px] text-(--ui-muted)">
        Calling funnel
        <span className="rounded-md bg-(--ui-raised) px-2 py-0.5">Success: 1 outcome</span>
      </span>
      <div className="mt-3 grid grid-cols-6">
        {STAGES.map((s, i) => (
          <div key={s.name} className={cn("relative flex min-w-0 flex-col gap-1 pr-3", i > 0 && "border-l border-(--ui-line) pl-3")}>
            <span className="flex items-center gap-1 text-[10px] text-(--ui-muted)">
              <span className="size-1.5 rounded-full" style={{ background: s.tone }} />
              Stage {i + 1}
            </span>
            <span className={cn("truncate", compact ? "text-[10.5px]" : "text-[11.5px]")}>{s.name}</span>
            <span className={cn("font-mono leading-none tabular-nums", compact ? "text-[15px]" : "text-[22px]")}>{fmt(s.value)}</span>
            <span className="mt-1.5 h-[3px] rounded-full bg-(--ui-raised)">
              <span className="block h-full rounded-full" style={{ width: `${(s.value / top) * 100}%`, background: s.tone }} />
            </span>
            {i > 0 && <span className="font-mono text-[9.5px] text-(--ui-muted)">{pct(s.value, top)} of attempted</span>}
            {i > 0 && (
              <span className="absolute -left-[1.4rem] bottom-[-0.9rem] rounded-full border border-(--ui-line) bg-(--ui-raised) px-1.5 font-mono text-[9px] text-(--ui-muted)">
                {pct(s.value, STAGES[i - 1].value)}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* A month of calls per stage, as smooth-ish lines (deterministic sample data). */
const DAYS = 30
const series = STAGES.map((s, i) =>
  Array.from({ length: DAYS }, (_, t) => {
    const wave = 1 + 0.14 * Math.sin(t / 3.2 + i * 0.4) + 0.06 * Math.sin(t / 1.4)
    const tail = t > DAYS - 3 ? 0.55 + (DAYS - 1 - t) * 0.2 : 1
    return (s.value / DAYS) * wave * tail
  }),
)
const MAX = Math.max(...series.flat()) * 1.15

/** Calls over time: one line per stage, with the legend. */
export function OverTime({ height = 150 }: { height?: number }) {
  const W = 600
  const path = (pts: number[]) => pts.map((v, t) => `${t === 0 ? "M" : "L"} ${(t / (DAYS - 1)) * W} ${height - (v / MAX) * height}`).join(" ")
  return (
    <div className="flex flex-col rounded-lg border border-(--ui-line) bg-(--ui-panel) p-3.5">
      <span className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-(--ui-muted)">
        Calls over time
        <span className="flex flex-wrap gap-2.5 text-[10px]">
          {STAGES.map((s) => (
            <span key={s.name} className="flex items-center gap-1">
              <span className="size-1.5 rounded-full" style={{ background: s.tone }} />
              {s.name.replace("Calls ", "").replace(/^./, (c) => c.toUpperCase())}
            </span>
          ))}
        </span>
      </span>
      <svg viewBox={`0 0 ${W} ${height}`} preserveAspectRatio="none" className="mt-3 w-full" style={{ height }}>
        {[0.25, 0.5, 0.75].map((y) => (
          <line key={y} x1={0} x2={W} y1={height * y} y2={height * y} stroke="oklch(1 0 0 / 0.06)" strokeWidth={1} />
        ))}
        {series.map((pts, i) => (
          <path key={i} d={path(pts)} fill="none" stroke={STAGES[i].tone} strokeWidth={1.6} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <span className="mt-1.5 flex justify-between font-mono text-[9.5px] text-(--ui-muted)">
        <span>1 Mar</span>
        <span>15 Mar</span>
        <span>30 Mar</span>
      </span>
    </div>
  )
}

const DISPOSITION: { group: string; rows: [string, string, number][] }[] = [
  {
    group: "Never dialled",
    rows: [
      ["Initiation failed", "init_failed", 26],
      ["Blocked", "forbidden", 3],
    ],
  },
  {
    group: "Dialled, not connected",
    rows: [
      ["Busy", "busy", 3404],
      ["No answer", "no-answer", 2795],
      ["Failed", "failed", 112],
      ["Stream failed", "failed-stream", 38],
    ],
  },
  { group: "Connected", rows: [] },
]

/** Disposition: the split bar and the end reasons, grouped. */
export function Disposition() {
  const total = STAGES[0].value
  const connected = STAGES[2].value
  return (
    <div className="rounded-lg border border-(--ui-line) bg-(--ui-panel) p-3.5 text-[11.5px]">
      <span className="text-[11px] text-(--ui-muted)">Disposition</span>
      <span className="mt-1 flex items-baseline gap-1.5">
        <span className="font-mono text-[16px] tabular-nums">{fmt(total)}</span>
        <span className="text-[10.5px] text-(--ui-muted)">calls attempted</span>
      </span>
      <span className="mt-2 flex h-1.5 overflow-hidden rounded-full">
        <span className="bg-(--ui-text)/25" style={{ width: `${((total - connected) / total) * 100}%` }} />
        <span className="flex-1 bg-(--ui-text)/70" />
      </span>
      <div className="mt-3 grid grid-cols-[1fr_4.5rem_4rem] gap-x-3 font-mono text-[10px] text-(--ui-muted)">
        <span>End reason</span>
        <span className="text-right">Calls</span>
        <span className="text-right">% of attempted</span>
      </div>
      {DISPOSITION.map((g) => (
        <div key={g.group}>
          <div className="mt-2 grid grid-cols-[1fr_4.5rem_4rem] gap-x-3">
            <span className="flex items-center gap-1.5">
              <span className={cn("size-1.5 rounded-full", g.group === "Connected" ? "bg-(--ui-text)/70" : "bg-(--ui-text)/25")} />
              {g.group}
            </span>
            {g.group === "Connected" && (
              <>
                <span className="text-right font-mono tabular-nums">{fmt(connected)}</span>
                <span className="text-right font-mono tabular-nums">{pct(connected, total)}</span>
              </>
            )}
          </div>
          {g.rows.map(([name, code, n]) => (
            <div key={name} className="grid grid-cols-[1fr_4.5rem_4rem] gap-x-3 border-b border-(--ui-line) py-1 pl-3 last:border-0">
              <span className="truncate">
                {name} <span className="font-mono text-[9.5px] text-(--ui-muted)">{code}</span>
              </span>
              <span className="text-right font-mono tabular-nums">{fmt(n)}</span>
              <span className="text-right font-mono text-(--ui-muted) tabular-nums">{pct(n, total)}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
