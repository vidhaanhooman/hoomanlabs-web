import { CheckIcon, PlayIcon, SparkleIcon, WarningIcon, XIcon } from "@phosphor-icons/react"

import { UiCard, UiLabel, UiPill, UiWindow } from "@/components/product/ui-window"
import { cn } from "@/lib/utils"

/**
 * Screens for /platform/quality, recreated from the console in its dark
 * style (each takes the window class from the page; content keeps to the
 * part left visible when the window runs past the stage's right edge).
 * Static on purpose. Fictional data (Halden Energy, Ria, Maya Patel).
 */

const FAIL = "text-[oklch(0.72_0.17_25)]"
const FAIL_PILL = "rounded bg-[oklch(0.72_0.17_25/0.18)] px-1.5 font-mono text-[10.5px] text-[oklch(0.85_0.1_25)]"

function Pass({ children = "Pass" }: { children?: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1 text-[11px] text-(--ui-live)">
      <CheckIcon weight="bold" className="size-3" />
      {children}
    </span>
  )
}

function Fail({ children = "Fail" }: { children?: React.ReactNode }) {
  return (
    <span className={cn("flex items-center gap-1 text-[11px]", FAIL)}>
      <XIcon weight="bold" className="size-3" />
      {children}
    </span>
  )
}

/** Fault finder: the failed score, the turn behind it and its trace. */
export function FaultScreen({ className }: { className: string }) {
  const stages: [string, number][] = [
    ["End of speech", 180],
    ["First token", 420],
    ["Tool · get_balance", 610],
    ["Voice", 160],
  ]
  const total = stages.reduce((a, [, v]) => a + v, 0)
  return (
    <UiWindow className={className} title="Maya Patel · turn 4" aside={<UiPill>Debug</UiPill>}>
      <UiCard>
        <div className="flex items-center justify-between">
          <UiLabel>Code judge · Disclosure read</UiLabel>
          <Fail />
        </div>
        <p className="text-[12.5px]">
          <span className="text-(--ui-muted)">Ria: </span>
          <span className="rounded bg-[oklch(0.72_0.17_25/0.2)] px-0.5">Yes, that&apos;s fine. I&apos;ve set the 4th as your payment date.</span>
        </p>
        <span className="flex items-center gap-2 text-[11px] text-(--ui-muted)">
          <WarningIcon weight="fill" className={cn("size-3", FAIL)} />
          Payment-date disclosure not heard by the caller
          <span className={FAIL_PILL}>turn 4</span>
        </span>
      </UiCard>
      <UiCard>
        <div className="flex items-center justify-between">
          <UiLabel>Turn trace</UiLabel>
          <span className="font-mono text-[11px] text-(--ui-muted)">{total} ms</span>
        </div>
        {stages.map(([name, ms]) => (
          <div key={name} className="grid grid-cols-[8.5rem_1fr_3.5rem] items-center gap-3">
            <span className="text-(--ui-muted)">{name}</span>
            <span className="h-1.5 rounded-full bg-(--ui-raised)">
              <span className={cn("block h-full rounded-full", ms > 500 ? "bg-[oklch(0.8_0.14_80)]" : "bg-(--ui-text)/50")} style={{ width: `${(ms / 700) * 100}%` }} />
            </span>
            <span className="text-right font-mono text-[11px] text-(--ui-muted)">{ms} ms</span>
          </div>
        ))}
      </UiCard>
      <UiCard>
        <UiLabel>Heard vs said</UiLabel>
        <div className="grid grid-cols-[4.5rem_1fr] gap-x-3 gap-y-1.5 text-[12px]">
          <span className="text-(--ui-muted)">Planned</span>
          <span>
            I&apos;ve set the 4th as your payment date. <span className="rounded bg-[oklch(0.72_0.17_25/0.2)] px-0.5">If it&apos;s missed, a $5 late fee applies, and you can change the date any time.</span>
          </span>
          <span className="text-(--ui-muted)">Heard</span>
          <span>
            I&apos;ve set the 4th as your payment date.<span className="text-(--ui-muted)"> · Maya cut in</span>
          </span>
        </div>
      </UiCard>
    </UiWindow>
  )
}

/** Audits and alerts: a sampled run, and the alerts watching it. */
export function AuditScreen({ className }: { className: string }) {
  /** Scorecard, pass rate, alert line; an alert is sent below the line. */
  const metrics: [string, number, number][] = [
    ["Polite and on-policy", 98, 90],
    ["Disclosure read", 91, 95],
    ["No repetition loops", 99, 95],
    ["Customer sentiment", 94, 85],
  ]
  return (
    <UiWindow className={className} title="Monitor & QA · audits" aside={<UiPill live>Running</UiPill>}>
      <UiCard>
        <div className="flex items-center justify-between">
          <UiLabel>Audit · billing calls</UiLabel>
          <span className="text-[11px] text-(--ui-muted)">Random sample · 500 calls</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["Agent: Ria · Billing", "Campaign: March reminders", "Last 7 days", "Duration > 30s"].map((f) => (
            <span key={f} className="rounded-md border border-(--ui-line) bg-(--ui-raised) px-2 py-0.5 text-[11px]">
              {f}
            </span>
          ))}
        </div>
      </UiCard>
      <UiCard className="gap-0 p-0">
        <div className="grid grid-cols-[1fr_4rem_5.5rem] gap-3 border-b border-(--ui-line) px-3.5 py-2 text-[11px] text-(--ui-muted)">
          <span>Scorecard</span>
          <span className="text-right">Pass rate</span>
          <span className="text-right">Alert below</span>
        </div>
        {metrics.map(([name, rate, line]) => (
          <div key={name} className="grid grid-cols-[1fr_4rem_5.5rem] items-center gap-3 border-b border-(--ui-line) px-3.5 py-2.5 last:border-0">
            <span>{name}</span>
            <span className={cn("text-right font-mono text-[11.5px]", rate < line && FAIL)}>{rate}%</span>
            <span className="flex justify-end">{rate < line ? <Fail>{line}% · sent</Fail> : <span className="font-mono text-[11px] text-(--ui-muted)">{line}%</span>}</span>
          </div>
        ))}
      </UiCard>
      <UiCard>
        <div className="flex items-center justify-between">
          <UiLabel>Watchtower</UiLabel>
          <span className="text-[11px] text-(--ui-muted)">Email · qa-team@</span>
        </div>
        {[
          ["Pickup rate below 40%", "Watching"],
          ["Call volume up 50% in an hour", "Watching"],
          ["Disclosure read pass rate below 95%", "Triggered 09:12"],
        ].map(([rule, state]) => (
          <div key={rule} className="flex items-center justify-between gap-3">
            <span>{rule}</span>
            <span className={cn("text-[11px]", state.startsWith("Triggered") ? FAIL : "text-(--ui-muted)")}>{state}</span>
          </div>
        ))}
      </UiCard>
    </UiWindow>
  )
}

/** Review desk and human team QA: one queue, AI and people side by side. */
export function ReviewScreen({ className }: { className: string }) {
  const queue: [string, string, string, boolean][] = [
    ["Maya Patel", "Ria · AI", "Disclosure read", false],
    ["Arjun Rao", "Priya · human team", "Polite and on-policy", true],
    ["Leah Brooks", "Ria · AI", "No talk-over", true],
  ]
  return (
    <UiWindow className={className} title="Monitor & QA · reviews" aside={<UiPill>3 to review</UiPill>}>
      <UiCard className="gap-0 p-0">
        <div className="grid grid-cols-[6.5rem_8.5rem_1fr_3rem] gap-3 border-b border-(--ui-line) px-3.5 py-2 text-[11px] text-(--ui-muted)">
          <span>Customer</span>
          <span>Handled by</span>
          <span>Scorecard</span>
          <span className="text-right">AI</span>
        </div>
        {queue.map(([who, by, metric, ok]) => (
          <div key={who} className="grid grid-cols-[6.5rem_8.5rem_1fr_3rem] items-center gap-3 border-b border-(--ui-line) px-3.5 py-2.5 last:border-0">
            <span>{who}</span>
            <span className="text-(--ui-muted)">{by}</span>
            <span className="truncate">{metric}</span>
            <span className="flex justify-end">{ok ? <CheckIcon weight="bold" className="size-3 text-(--ui-live)" /> : <XIcon weight="bold" className={cn("size-3", FAIL)} />}</span>
          </div>
        ))}
      </UiCard>
      <UiCard>
        <div className="flex items-center justify-between">
          <UiLabel>Review · Maya Patel</UiLabel>
          <span className="text-[11px] text-(--ui-muted)">Team review</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[
            ["Missed disclosure", true],
            ["Ignored question", false],
            ["Cut off by noise", false],
            ["Repetition", false],
            ["Mispronounced", false],
          ].map(([tag, on]) => (
            <span
              key={tag as string}
              className={cn("rounded-full border px-2.5 py-0.5 text-[11px]", on ? "border-white/40 bg-white/10 text-(--ui-text)" : "border-(--ui-line) text-(--ui-muted)")}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 pt-1 text-[11px]">
          {[
            ["AI review", <Fail key="a">Fail</Fail>],
            ["Self review", <span key="s" className="text-(--ui-muted)">Not needed</span>],
            ["Team review", <Fail key="t">Fail · agreed</Fail>],
          ].map(([k, v]) => (
            <span key={k as string} className="flex flex-col gap-1 rounded-md bg-(--ui-raised) px-2.5 py-2">
              <span className="text-(--ui-muted)">{k}</span>
              {v}
            </span>
          ))}
        </div>
      </UiCard>
      <UiCard>
        <div className="flex items-center justify-between">
          <UiLabel>Human team QA · upload</UiLabel>
          <Pass>214 recordings scored</Pass>
        </div>
        <span className="text-[12px] text-(--ui-muted)">calls_march_human_team.csv · same scorecard as Ria</span>
      </UiCard>
    </UiWindow>
  )
}

/** Call record: recording, transcript with actions inline, health. */
export function CallRecordScreen({ className }: { className: string }) {
  const health: [string, string, boolean][] = [
    ["Responsiveness", "0.9s", true],
    ["Pacing", "152 wpm", true],
    ["Talk ratio", "46%", true],
    ["Interruptions", "1", true],
  ]
  return (
    <UiWindow className={className} title="Conversations · Maya Patel" aside={<UiPill>Promise to pay</UiPill>}>
      <UiCard>
        <div className="flex items-center gap-3">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-(--ui-raised)">
            <PlayIcon weight="fill" className="size-3" />
          </span>
          <span className="flex h-6 flex-1 items-center gap-[3px]">
            {Array.from({ length: 48 }, (_, i) => (
              <span key={i} className={cn("w-[3px] rounded-full", i < 18 ? "bg-(--ui-text)/70" : "bg-(--ui-text)/25")} style={{ height: `${25 + ((i * 37) % 70)}%` }} />
            ))}
          </span>
          <span className="font-mono text-[11px] text-(--ui-muted)">0:18 / 0:48</span>
        </div>
      </UiCard>
      <UiCard>
        <UiLabel>Transcript</UiLabel>
        <p>
          <span className="text-(--ui-muted)">Ria: </span>Thanks for calling, Maya. Your March bill is $86.40.
        </p>
        <span className="flex items-center gap-2 rounded-md bg-(--ui-raised) px-2.5 py-1.5 font-mono text-[11px]">
          <CheckIcon weight="bold" className="size-3 text-(--ui-live)" />
          get_balance · Halden billing · 310 ms
        </span>
        <p>
          <span className="text-(--ui-muted)">Maya: </span>The 3rd. Could I pay it on the 4th?
        </p>
        <span className="flex items-center gap-2 rounded-md bg-(--ui-raised) px-2.5 py-1.5 font-mono text-[11px]">
          <CheckIcon weight="bold" className="size-3 text-(--ui-live)" />
          set_payment_date · 2026-03-04 · 240 ms
        </span>
      </UiCard>
      <UiCard>
        <div className="flex items-center justify-between">
          <UiLabel>Call health check</UiLabel>
          <Pass>In typical range</Pass>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {health.map(([k, v]) => (
            <span key={k} className="flex flex-col gap-0.5 rounded-md bg-(--ui-raised) px-2.5 py-2">
              <span className="text-[10.5px] text-(--ui-muted)">{k}</span>
              <span className="font-mono text-[12px]">{v}</span>
            </span>
          ))}
        </div>
      </UiCard>
    </UiWindow>
  )
}

/** Debrief: the summary, the outcome, fields and the checklist. */
export function DebriefScreen({ className }: { className: string }) {
  return (
    <UiWindow className={className} title="Maya Patel · details" aside={<UiPill>Re-run analysis</UiPill>}>
      <UiCard>
        <div className="flex items-center justify-between">
          <UiLabel>Debrief</UiLabel>
          <span className="rounded-full bg-[oklch(0.74_0.16_150/0.2)] px-2 py-0.5 text-[10.5px] text-[oklch(0.85_0.12_150)]">Promise to pay</span>
        </div>
        <p className="text-[12.5px]">Maya can&apos;t pay the $86.40 March bill until payday. Agreed to pay on 4 March; confirmation sent by SMS and a reminder call set.</p>
      </UiCard>
      <UiCard>
        <UiLabel>Data capture</UiLabel>
        <div className="grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-1.5">
          {[
            ["pay_by", "2026-03-04"],
            ["amount", "86.40 USD"],
            ["reason", "Waiting for payday"],
            ["contact_pref", "SMS"],
          ].map(([k, v]) => (
            <span key={k} className="contents">
              <span className="font-mono text-[11.5px] text-(--ui-muted)">{k}</span>
              <span className="font-mono text-[11.5px]">{v}</span>
            </span>
          ))}
        </div>
      </UiCard>
      <UiCard>
        <UiLabel>Call checklist</UiLabel>
        {[
          ["Identity verified?", "Yes"],
          ["Payment date agreed?", "Yes"],
          ["Asked for a payment plan?", "No"],
        ].map(([q, a]) => (
          <div key={q} className="flex items-center justify-between gap-3">
            <span>{q}</span>
            <span className="font-mono text-[11.5px] text-(--ui-muted)">{a}</span>
          </div>
        ))}
      </UiCard>
    </UiWindow>
  )
}

/** Ask AI: a plain-language question across every call. */
export function AskScreen({ className }: { className: string }) {
  const reasons: [string, number][] = [
    ["Waiting for payday", 46],
    ["Bill higher than expected", 27],
    ["Disputes a meter reading", 15],
    ["Other", 12],
  ]
  return (
    <UiWindow className={className} title="Conversations · Ask AI" aside={<UiPill>1,912 calls this week</UiPill>}>
      <UiCard>
        <UiLabel>You asked</UiLabel>
        <p className="text-[13px]">Why did customers ask to pay late this week?</p>
      </UiCard>
      <UiCard>
        <span className="flex items-center gap-1.5">
          <SparkleIcon weight="fill" className="size-3.5 text-[oklch(0.78_0.12_295)]" />
          <UiLabel>Answer · from 318 calls</UiLabel>
        </span>
        <p className="text-[12.5px]">Most were waiting for payday, usually a date in the first week of the month. About a quarter said the bill was higher than expected.</p>
        {reasons.map(([k, pct]) => (
          <div key={k} className="grid grid-cols-[11rem_1fr_2.5rem] items-center gap-3">
            <span className="text-(--ui-muted)">{k}</span>
            <span className="h-1.5 rounded-full bg-(--ui-raised)">
              <span className="block h-full rounded-full bg-[oklch(0.78_0.12_295)]" style={{ width: `${pct * 2}%` }} />
            </span>
            <span className="text-right font-mono text-[11px] text-(--ui-muted)">{pct}%</span>
          </div>
        ))}
      </UiCard>
      <UiCard className="gap-0 p-0">
        {[
          ["Maya Patel", "I get paid on the 3rd, so could I pay on the 4th?"],
          ["Arjun Rao", "It's about double last month's bill."],
        ].map(([who, quote]) => (
          <div key={who} className="flex items-center gap-3 border-b border-(--ui-line) px-3.5 py-2.5 last:border-0">
            <span className="w-20 shrink-0">{who}</span>
            <span className="truncate text-(--ui-muted)">&ldquo;{quote}&rdquo;</span>
          </div>
        ))}
      </UiCard>
    </UiWindow>
  )
}

/** Insights and custom dashboards: widgets picked from any metric. */
export function DashboardScreen({ className }: { className: string }) {
  const bars = [42, 55, 48, 61, 58, 70, 66]
  const days = ["M", "T", "W", "T", "F", "S", "S"]
  return (
    <UiWindow className={className} title="Insights · Billing team" aside={<UiPill>Export report</UiPill>}>
      <div className="grid grid-cols-3 gap-3">
        {[
          ["Calls", "1,912"],
          ["Promise to pay", "38%"],
          ["Scorecard pass", "93%"],
        ].map(([k, v]) => (
          <UiCard key={k} className="gap-1">
            <UiLabel>{k}</UiLabel>
            <span className="text-[18px] tabular-nums">{v}</span>
          </UiCard>
        ))}
      </div>
      <UiCard>
        <div className="flex items-center justify-between">
          <UiLabel>Promises to pay · this week</UiLabel>
          <span className="text-[11px] text-(--ui-muted)">Widget</span>
        </div>
        <div className="flex h-28 items-end gap-2">
          {bars.map((h, i) => (
            <span key={i} className="flex flex-1 flex-col items-center gap-1">
              <span className="w-full max-w-8 rounded-sm bg-(--ui-text)/35" style={{ height: `${h * 1.3}px` }} />
              <span className="text-[10px] text-(--ui-muted)">{days[i]}</span>
            </span>
          ))}
        </div>
      </UiCard>
      <UiCard className="border-dashed">
        <UiLabel>Add widget</UiLabel>
        <div className="flex flex-wrap gap-1.5">
          {["Outcomes", "Scorecard pass rate", "Call volume", "Pickup rate", "Avg duration"].map((m, i) => (
            <span key={m} className={cn("rounded-md border px-2 py-0.5 text-[11px]", i === 1 ? "border-white/40 bg-white/10" : "border-(--ui-line) text-(--ui-muted)")}>
              {m}
            </span>
          ))}
        </div>
      </UiCard>
    </UiWindow>
  )
}
