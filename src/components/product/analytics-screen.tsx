import { Label, Pill, ScreenBar, ScreenShell } from "@/components/product/ui-bits"

// Fictional demo data.
const SPLIT = [
  { label: "Resolved", pct: 71.4, color: "bg-(--ui-live)" },
  { label: "Callback", pct: 13.8, color: "bg-[oklch(0.8_0.14_80)]" },
  { label: "Transferred", pct: 9.1, color: "bg-(--ui-text)/60" },
  { label: "Unresolved", pct: 5.7, color: "bg-[oklch(0.68_0.19_25)]" },
]

const RECENT: { who: string; channel: string; time: string; outcome: string; tone: "live" | "warn" | "muted" | "bad" }[] = [
  { who: "Daniel Okafor", channel: "Voice", time: "3m 12s", outcome: "Resolved", tone: "live" },
  { who: "Sofia Marin", channel: "Chat", time: "1m 48s", outcome: "Resolved", tone: "live" },
  { who: "Rahul Mehta", channel: "Voice", time: "4m 05s", outcome: "Callback", tone: "warn" },
  { who: "Emily Clarke", channel: "WhatsApp", time: "2m 31s", outcome: "Transferred", tone: "muted" },
  { who: "Jonas Berg", channel: "Voice", time: "0m 54s", outcome: "Resolved", tone: "live" },
]

/** Measure panel: outcome split plus recent conversations. Static on purpose. */
export function AnalyticsScreen({ className }: { className?: string }) {
  return (
    <ScreenShell className={className}>
      <ScreenBar>
        <span className="min-w-0 truncate font-medium">Conversations</span>
        <span className="ml-auto text-(--ui-muted)">Last 7 days</span>
      </ScreenBar>

      <div className="shrink-0 border-b border-(--ui-line) px-4 py-3">
        <Label>Outcomes</Label>
        <div className="mt-2 flex h-2 gap-0.5 overflow-hidden rounded-full" aria-hidden>
          {SPLIT.map((s) => (
            <span key={s.label} className={s.color} style={{ width: `${s.pct}%` }} />
          ))}
        </div>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {SPLIT.map((s) => (
            <li key={s.label} className="flex items-center gap-1.5 text-[12px]">
              <span className={`size-2 rounded-full ${s.color}`} aria-hidden />
              {s.label}
              <span className="font-mono text-(--ui-muted) tabular-nums">{s.pct}%</span>
            </li>
          ))}
        </ul>
      </div>

      <ul className="min-h-0 flex-1 overflow-hidden px-4">
        {RECENT.map((r) => (
          <li key={r.who} className="flex items-center gap-3 border-b border-(--ui-line) py-2">
            <span className="min-w-0 flex-1 truncate">{r.who}</span>
            <span className="hidden text-(--ui-muted) @sm:inline">{r.channel}</span>
            <span className="hidden font-mono text-(--ui-muted) tabular-nums @md:inline">{r.time}</span>
            <Pill tone={r.tone}>{r.outcome}</Pill>
          </li>
        ))}
      </ul>
    </ScreenShell>
  )
}
