import { CheckIcon, ClockIcon, FileCsvIcon, PhoneCallIcon } from "@phosphor-icons/react/dist/ssr"

import { UiCard, UiLabel, UiPill, UiWindow } from "@/components/product/ui-window"
import { cn } from "@/lib/utils"

/**
 * Screens for /platform/campaigns, recreated from the console in its dark
 * style (each takes the window class from the page; content keeps to the
 * part left visible when the window runs past the stage's right edge).
 * Fictional data (Halden Energy). SAMPLE figures.
 */

function Ok({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1 text-[11px] text-(--ui-live)">
      <CheckIcon weight="bold" className="size-3" />
      {children}
    </span>
  )
}

/** Hero: a campaign mid-run. */
export function CampaignOverviewScreen({ className }: { className: string }) {
  const stats = [
    ["Called", "1,284"],
    ["Picked up", "822"],
    ["Promise to pay", "391"],
    ["Retrying", "146"],
  ]
  const rows = [
    { name: "Maya Patel", outcome: "Promise to pay · 4 Mar", tone: "good" },
    { name: "Daniel Brooks", outcome: "No answer · retry 2:30 pm", tone: "warn" },
    { name: "Sara Kim", outcome: "Paid on the call", tone: "good" },
    { name: "Leo Grant", outcome: "DND · skipped", tone: "muted" },
  ]
  return (
    <UiWindow className={className} title="March payment reminders" aside={<UiPill live>Running · 3 slots</UiPill>}>
      <div className="grid grid-cols-4 gap-2">
        {stats.map(([k, v]) => (
          <UiCard key={k} className="gap-1 p-3">
            <span className="text-[11px] text-(--ui-muted)">{k}</span>
            <span className="text-[18px] tabular-nums">{v}</span>
          </UiCard>
        ))}
      </div>
      <UiCard className="gap-0 p-0">
        {rows.map((r) => (
          <div key={r.name} className="flex items-center gap-3 border-b border-(--ui-line) px-3.5 py-2.5 last:border-0">
            <PhoneCallIcon weight="fill" className="size-3.5 text-(--ui-muted)" />
            <span className="w-32">{r.name}</span>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[11px]",
                r.tone === "good" && "bg-[oklch(0.74_0.16_150/0.18)] text-[oklch(0.85_0.12_150)]",
                r.tone === "warn" && "bg-[oklch(0.8_0.12_75/0.18)] text-[oklch(0.86_0.1_80)]",
                r.tone === "muted" && "bg-(--ui-raised) text-(--ui-muted)"
              )}
            >
              {r.outcome}
            </span>
          </div>
        ))}
      </UiCard>
    </UiWindow>
  )
}

/** Outreach: a list uploaded, its columns mapped into each call. */
export function ListUploadScreen({ className }: { className: string }) {
  const cols = ["name", "phone", "balance", "due_date", "plan"]
  const rows = [
    ["Maya Patel", "+1 555 01•• •••", "$86.40", "4 Mar", "Fixed 12m"],
    ["Daniel Brooks", "+1 555 01•• •••", "$142.10", "6 Mar", "Flex"],
    ["Sara Kim", "+1 555 01•• •••", "$59.00", "4 Mar", "Fixed 12m"],
  ]
  return (
    <UiWindow className={className} title="New campaign · upload" aside={<UiPill>312 contacts</UiPill>}>
      <UiCard>
        <span className="flex items-center gap-2">
          <FileCsvIcon className="size-4" />
          march_reminders.csv
          <span className="ml-auto">
            <Ok>Columns mapped</Ok>
          </span>
        </span>
        <div className="overflow-hidden rounded-md border border-(--ui-line)">
          <div className="grid grid-cols-5 bg-(--ui-raised) px-3 py-1.5 font-mono text-[10.5px] text-(--ui-muted)">
            {cols.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
          {rows.map((r) => (
            <div key={r[0]} className="grid grid-cols-5 border-t border-(--ui-line) px-3 py-1.5 text-[11.5px]">
              {r.map((v, i) => (
                <span key={i} className={cn("truncate", i === 1 && "text-(--ui-muted)")}>
                  {v}
                </span>
              ))}
            </div>
          ))}
        </div>
      </UiCard>
      <UiCard>
        <UiLabel>In every call&apos;s briefing</UiLabel>
        <p className="text-[12.5px]">
          Hi <span className="rounded bg-[oklch(0.72_0.14_295/0.2)] px-1 font-mono text-[11.5px]">{"{{name}}"}</span>, a quick reminder that{" "}
          <span className="rounded bg-[oklch(0.72_0.14_295/0.2)] px-1 font-mono text-[11.5px]">{"{{balance}}"}</span> is due on{" "}
          <span className="rounded bg-[oklch(0.72_0.14_295/0.2)] px-1 font-mono text-[11.5px]">{"{{due_date}}"}</span>.
        </p>
      </UiCard>
    </UiWindow>
  )
}

/** Always-on: calls added through the API, dialled in seconds. */
export function RealtimeQueueScreen({ className }: { className: string }) {
  const log = [
    ["10:02:11", "Task added · new lead from website", "API"],
    ["10:02:14", "Calling Arjun Mehta", "3s"],
    ["10:05:40", "Task added · missed payment", "Workflow"],
    ["10:05:42", "Calling Sara Kim", "2s"],
  ]
  return (
    <UiWindow className={className} title="New leads · always on" aside={<UiPill live>Listening</UiPill>}>
      <UiCard>
        <UiLabel>Add a call</UiLabel>
        <pre className="font-mono text-[11.5px] leading-relaxed">
          {`POST /v1/campaigns/new-leads/tasks
{ "phone": "+1 555 0142",
  "context": { "name": "Arjun", "source": "website" } }`}
        </pre>
      </UiCard>
      <UiCard>
        <UiLabel>Queue</UiLabel>
        {log.map(([t, e, s]) => (
          <div key={t} className="flex items-center gap-3 text-[11.5px]">
            <span className="font-mono text-(--ui-muted)">{t}</span>
            <span>{e}</span>
            <span className="ml-auto text-[11px] text-(--ui-muted)">{s}</span>
          </div>
        ))}
      </UiCard>
    </UiWindow>
  )
}

/** A/B: live traffic split between two versions. */
export function SplitTestScreen({ className }: { className: string }) {
  const arms = [
    { name: "Ria · v12", note: "Current script", share: 50, pickup: 61, promise: 44 },
    { name: "Ria · v13", note: "Shorter opening", share: 50, pickup: 66, promise: 52, lead: true },
  ]
  return (
    <UiWindow className={className} title="March reminders · A/B" aside={<UiPill>50 / 50 split</UiPill>}>
      {arms.map((a) => (
        <UiCard key={a.name} className={cn(a.lead && "border-[oklch(0.74_0.16_150/0.35)]")}>
          <div className="flex items-center justify-between">
            <span className="flex flex-col">
              <span className="text-[13px]">{a.name}</span>
              <span className="text-[11px] text-(--ui-muted)">{a.note}</span>
            </span>
            {a.lead && <Ok>Ahead</Ok>}
          </div>
          {[
            ["Pickup", a.pickup],
            ["Promise to pay", a.promise],
          ].map(([k, v]) => (
            <div key={k} className="grid grid-cols-[7rem_1fr_2.5rem] items-center gap-3 text-[11.5px]">
              <span className="text-(--ui-muted)">{k}</span>
              <span className="h-1.5 rounded-full bg-(--ui-raised)">
                <span className="block h-full rounded-full bg-(--ui-text)/80" style={{ width: `${v}%` }} />
              </span>
              <span className="text-right font-mono tabular-nums">{v}%</span>
            </div>
          ))}
        </UiCard>
      ))}
      <span className="flex items-center gap-1.5 px-1 text-[11px] text-(--ui-muted)">
        <ClockIcon className="size-3" />
        Edited live 2 hours ago · no calls dropped
      </span>
    </UiWindow>
  )
}
