import { ArrowCounterClockwiseIcon, BellIcon, CheckIcon, FlaskIcon, PlusIcon, XIcon } from "@phosphor-icons/react"

import { Funnel, OverTime } from "@/components/observability/dashboard"
import { UiCard, UiLabel, UiPill, UiWindow } from "@/components/product/ui-window"
import { cn } from "@/lib/utils"

/**
 * Screens for /platform/quality, recreated from the console in its dark
 * style (each takes the window class from the page; content keeps to the
 * part left visible when the window runs past the stage's right edge, and
 * the hovered row as `focus` where it reacts). Static otherwise. Fictional data (Halden Energy, Ria, Maya Patel).
 */

const FAIL = "text-[oklch(0.72_0.17_25)]"

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


const fade = (focus: string, ids: string[]) => cn("transition-opacity duration-300", focus !== "all" && !ids.includes(focus) && "opacity-35")

/** Post-conversation analytics: the summary, extracted fields and classification of one conversation. */
export function AnalyticsScreen({ className, focus }: { className: string; focus: string }) {
  return (
    <UiWindow className={className} title="Maya Patel · analysis" aside={<UiPill>Re-run analysis</UiPill>}>
      <UiCard className={fade(focus, ["summary"])}>
        <UiLabel>Summary</UiLabel>
        <p className="text-[12.5px]">Maya can&apos;t pay the $86.40 March bill until payday. Agreed to pay on 4 March; confirmation sent by SMS and a reminder set.</p>
      </UiCard>
      <UiCard className={fade(focus, ["extract"])}>
        <UiLabel>Extracted</UiLabel>
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
      <UiCard className={fade(focus, ["classify"])}>
        <UiLabel>Classified</UiLabel>
        <div className="flex flex-wrap gap-1.5 text-[11.5px]">
          <span className="rounded-full bg-[oklch(0.74_0.16_150/0.2)] px-2.5 py-0.5 text-[oklch(0.85_0.12_150)]">Outcome · Promise to pay</span>
          <span className="rounded-full bg-(--ui-raised) px-2.5 py-0.5">Category · Billing</span>
          <span className="rounded-full bg-(--ui-raised) px-2.5 py-0.5">Sentiment · Improved</span>
        </div>
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

/** Failure modes: failed metrics grouped into patterns, the turn behind the top one, and its fix. */
export function FailureModesScreen({ className, focus }: { className: string; focus: string }) {
  const modes: [string, string, string, number][] = [
    ["Cuts in while numbers are read", "Waits for every digit", "Code judge", 14],
    ["Reads the wrong amount", "Correct amount", "LLM judge", 6],
    ["Repeats the same question", "No repetition", "Classifier judge", 3],
  ]
  return (
    <UiWindow className={className} title="Failure modes · last 7 days" aside={<UiPill>23 failed conversations</UiPill>}>
      <UiCard className={cn("gap-0 p-0", fade(focus, ["modes"]))}>
        <div className="grid grid-cols-[1fr_8rem_3rem] gap-3 border-b border-(--ui-line) px-3.5 py-2 font-mono text-[10.5px] text-(--ui-muted)">
          <span>failure mode</span>
          <span>metric</span>
          <span className="text-right">count</span>
        </div>
        {modes.map(([name, metric, judge, n], i) => (
          <div key={name} className={cn("grid grid-cols-[1fr_8rem_3rem] items-center gap-3 border-b border-(--ui-line) px-3.5 py-2 last:border-0", i === 0 && "bg-(--ui-raised)/60")}>
            <span>{name}</span>
            <span className="flex flex-col leading-tight">
              <span className="truncate text-[11.5px]">{metric}</span>
              <span className="text-[10.5px] text-(--ui-muted)">{judge}</span>
            </span>
            <span className="text-right font-mono tabular-nums">{n}</span>
          </div>
        ))}
      </UiCard>
      <UiCard className={cn("gap-2", fade(focus, ["turn"]))}>
        <UiLabel>The turn behind it · Maya Patel</UiLabel>
        <span className="grid grid-cols-[3rem_1fr] gap-2 text-[12.5px]">
          <span className="text-[11px] text-(--ui-muted)">Maya</span>
          <span className="text-(--ui-muted)">It&apos;s four, two, seven… one…</span>
          <span className="text-[11px] text-(--ui-muted)">Ria</span>
          <span className="underline decoration-[oklch(0.72_0.17_25)] decoration-wavy underline-offset-4">Thanks. And the expiry date?</span>
        </span>
      </UiCard>
      <UiCard className={cn("flex-row flex-wrap items-center gap-2 py-3", fade(focus, ["fix"]))}>
        <span className="flex items-center gap-1 rounded-md border border-(--ui-line) px-2 py-1 text-[11px]">
          <ArrowCounterClockwiseIcon className="size-3" />
          Replay on fix
        </span>
        <span className="flex items-center gap-1 rounded-md border border-(--ui-line) px-2 py-1 text-[11px]">
          <FlaskIcon className="size-3" />
          Save as scenario
        </span>
        <span className="ml-auto">
          <Pass>Fixed in v13 · 0 since</Pass>
        </span>
      </UiCard>
    </UiWindow>
  )
}

const VIEWS = ["Inbound", "Outbound", "Campaigns", "Tools", "Custom"]

function ViewTabs({ active }: { active: string }) {
  return (
    <div className="flex flex-wrap gap-1 self-start rounded-lg bg-(--ui-raised) p-0.5 text-[11.5px]">
      {VIEWS.map((t) => (
        <span key={t} className={cn("rounded-md px-2.5 py-1", t === active ? "bg-(--ui-panel) text-(--ui-text)" : "text-(--ui-muted)", t === "Custom" && "border-l border-(--ui-line)")}>
          {t}
        </span>
      ))}
    </div>
  )
}

/**
 * Dashboards: a prebuilt view (tabs over the calling funnel and calls over
 * time); hovering "Custom dashboards and widgets" switches to a dashboard
 * of your own, built from widgets of different kinds, with Add widget.
 */
export function DashboardScreen({ className, focus }: { className: string; focus: string }) {
  if (focus === "custom") return <CustomDashboardScreen className={className} />
  return (
    <UiWindow className={className} title="Dashboards · Billing" aside={<UiPill>Last 30 days</UiPill>}>
      <ViewTabs active="Outbound" />
      <Funnel compact />
      <OverTime height={92} />
      <UiCard className="flex-row items-center gap-2 border-dashed py-2.5">
        <PlusIcon className="size-3.5" />
        <span className="text-[12px]">New dashboard · build your own from widgets</span>
      </UiCard>
    </UiWindow>
  )
}

function CustomDashboardScreen({ className }: { className: string }) {
  const trend = [31, 33, 32, 35, 34, 37, 38, 36, 39, 41]
  const modes: [string, number][] = [
    ["Cuts in on numbers", 14],
    ["Wrong amount", 6],
    ["Repeats a question", 3],
  ]
  return (
    <UiWindow className={className} title="Collections · my dashboard" aside={<UiPill>Custom · 4 widgets</UiPill>}>
      <ViewTabs active="Custom" />
      <div className="grid grid-cols-2 gap-3">
        {/* Line widget */}
        <UiCard className="gap-2">
          <UiLabel>Promise to pay rate</UiLabel>
          <span className="text-[18px] leading-none tabular-nums">41%</span>
          <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-8 w-full">
            <polyline points={trend.map((v, i) => `${(i / (trend.length - 1)) * 100},${30 - (v - 28) * 2}`).join(" ")} fill="none" stroke="#f5c04e" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
          </svg>
        </UiCard>
        {/* Number widget */}
        <UiCard className="gap-2">
          <UiLabel>QA pass rate</UiLabel>
          <span className="text-[18px] leading-none tabular-nums">93%</span>
          <span className="h-1.5 rounded-full bg-(--ui-raised)">
            <span className="block h-full w-[93%] rounded-full bg-(--ui-live)" />
          </span>
          <span className="text-[11px] text-(--ui-muted)">Target 95%</span>
        </UiCard>
        {/* Bar widget */}
        <UiCard className="gap-2">
          <UiLabel>Top failure modes</UiLabel>
          {modes.map(([k, n]) => (
            <span key={k} className="grid grid-cols-[1fr_2rem] items-center gap-2 text-[11.5px]">
              <span className="flex flex-col gap-0.5">
                {k}
                <span className="h-1 rounded-full bg-(--ui-raised)">
                  <span className="block h-full rounded-full bg-(--ui-text)/70" style={{ width: `${(n / 14) * 100}%` }} />
                </span>
              </span>
              <span className="text-right font-mono tabular-nums">{n}</span>
            </span>
          ))}
        </UiCard>
        {/* Adding a widget */}
        <UiCard className="gap-2 border-dashed">
          <span className="flex items-center gap-1.5 text-[12px]">
            <PlusIcon className="size-3.5" />
            Add widget
          </span>
          <div className="flex flex-wrap gap-1.5">
            {["Line", "Number", "Bar", "Table"].map((w, i) => (
              <span key={w} className={cn("rounded-md border px-2 py-0.5 text-[11px]", i === 0 ? "border-white/40 bg-white/10" : "border-(--ui-line) text-(--ui-muted)")}>
                {w}
              </span>
            ))}
          </div>
          <span className="text-[11px] text-(--ui-muted)">Any metric, outcome or extracted field</span>
        </UiCard>
      </div>
    </UiWindow>
  )
}

/** Alerts: presets, QA metric thresholds and custom alerts, with one that's fired. */
export function AlertsScreen({ className, focus }: { className: string; focus: string }) {
  const alerts: { id: string; type: string; when: string; to: string; fired?: string }[] = [
    { id: "presets", type: "Preset", when: "Conversations drop 30% vs last week", to: "Email" },
    { id: "presets", type: "Preset", when: "A tool fails on over 5% of calls", to: "Email" },
    { id: "qa", type: "QA threshold", when: "“Waits for every digit” below 95%", to: "#billing-qa", fired: "Fired 10:14" },
    { id: "custom", type: "Custom", when: "Promise to pay under 35% on March reminders", to: "#billing" },
  ]
  return (
    <UiWindow className={className} title="Alerts · Billing" aside={<UiPill live>1 firing</UiPill>}>
      <UiCard className="gap-0 p-0">
        <div className="grid grid-cols-[6.5rem_1fr_6rem] gap-3 border-b border-(--ui-line) px-3.5 py-2 font-mono text-[10.5px] text-(--ui-muted)">
          <span>type</span>
          <span>when</span>
          <span>send to</span>
        </div>
        {alerts.map((a) => (
          <div key={a.when} className={cn("grid grid-cols-[6.5rem_1fr_6rem] items-center gap-3 border-b border-(--ui-line) px-3.5 py-2.5 last:border-0", fade(focus, [a.id]))}>
            <span className="text-(--ui-muted)">{a.type}</span>
            <span className="flex flex-col leading-snug">
              <span>{a.when}</span>
              {a.fired && (
                <span className={cn("flex items-center gap-1 text-[11px]", FAIL)}>
                  <BellIcon weight="fill" className="size-3" />
                  {a.fired}
                </span>
              )}
            </span>
            <span className="truncate font-mono text-[11px] text-(--ui-muted)">{a.to}</span>
          </div>
        ))}
      </UiCard>
      <UiCard className={cn("border-dashed", fade(focus, ["custom"]))}>
        <span className="flex items-center gap-1.5 text-[12.5px]">
          <PlusIcon className="size-3.5" />
          New alert · any metric, any condition
        </span>
      </UiCard>
    </UiWindow>
  )
}
