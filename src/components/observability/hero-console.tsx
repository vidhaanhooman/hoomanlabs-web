"use client"

import { BellIcon, ChatCircleIcon, PhoneIcon, WrenchIcon } from "@phosphor-icons/react"

import { CONSOLE, HeroConsole } from "@/components/product-page/hero-console"
import { cn } from "@/lib/utils"
import { UiPill } from "@/components/product/ui-window"

/**
 * The /platform/observability hero: a large console on the misty-lake backdrop with the live overview, one look
 * at all three parts of the page: the day's numbers (dashboards), what's firing (alerts) and the conversations happening now,
 * with the latest failed action (logs). The calling funnel stays in the
 * Dashboards section below. Static. Sample numbers.
 */

const DESIGN_W = 1100
const DESIGN_H = 560

const KPIS: [string, string, string][] = [
  ["Conversations today", "1,284", "+6% vs last week"],
  ["Resolved without a person", "81%", "+2 pts"],
  ["Average handle time", "2:41", "−0:09"],
  ["QA pass rate", "93%", "Target 95%"],
]

const LIVE: { who: string; via: "phone" | "chat"; what: string; at: string; state: string }[] = [
  { who: "Maya Patel", via: "phone", what: "Inbound · Billing", at: "0:42", state: "Talking" },
  { who: "Omar Haddad", via: "phone", what: "Outbound · Bill reminder", at: "1:18", state: "Talking" },
  { who: "Sara Kim", via: "chat", what: "Website chat · Meter reading", at: "3:05", state: "Talking" },
  { who: "Daniel Brooks", via: "phone", what: "Inbound · Moving home", at: "4:27", state: "Resolved" },
  { who: "Asha Menon", via: "phone", what: "Outbound · Payment plan", at: "2:56", state: "Transferred" },
]

/** Sample conversations per hour, 8:00 to now (the last hour is still filling). */
const HOURS = [42, 88, 131, 156, 140, 118, 126, 149, 137, 104, 61]

const FAIL = "text-(--fail)"

export function ObservabilityConsole() {
  return (
    <HeroConsole image="/art/product/observability-backdrop.webp" designW={DESIGN_W} designH={DESIGN_H}>
      <div className={CONSOLE}>
        {/* Title bar */}
        <div className="flex h-12 shrink-0 items-center gap-3 border-b border-(--ui-line) px-5">
          <span className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-2.5 rounded-full bg-white/10" />
            ))}
          </span>
          <span className="ml-1">Overview · Halden Energy</span>
          <span className="ml-auto flex items-center gap-1.5 rounded-full bg-(--ui-raised) px-2.5 py-0.5 text-[12px]">
            <span className="size-1.5 rounded-full bg-(--ui-live)" />
            Live
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5">
          {/* Today's numbers */}
          <div className="grid grid-cols-4 gap-4">
            {KPIS.map(([k, v, d]) => (
              <div key={k} className="flex flex-col gap-1.5 rounded-lg border border-(--ui-line) bg-(--ui-panel) p-3.5">
                <span className="text-[11px] text-(--ui-muted)">{k}</span>
                <span className="font-mono text-[24px] leading-none tabular-nums">{v}</span>
                <span className="text-[10.5px] text-(--ui-muted)">{d}</span>
              </div>
            ))}
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-[1.45fr_1fr] gap-4">
            {/* Happening now */}
            <div className="flex flex-col rounded-lg border border-(--ui-line) bg-(--ui-panel)">
              <span className="flex items-center justify-between px-3.5 pt-3 pb-2 text-[11px] text-(--ui-muted)">
                Happening now
                <span>3 live · 2 just ended</span>
              </span>
              {LIVE.map((x) => (
                <div key={x.who} className="grid grid-cols-[1.25rem_1fr_3rem_5.5rem] items-center gap-3 border-t border-(--ui-line) px-3.5 py-2.5 text-[12.5px]">
                  {x.via === "phone" ? <PhoneIcon className="size-3.5 text-(--ui-muted)" /> : <ChatCircleIcon className="size-3.5 text-(--ui-muted)" />}
                  <span className="flex min-w-0 flex-col leading-tight">
                    <span className="truncate">{x.who}</span>
                    <span className="truncate text-[11px] text-(--ui-muted)">{x.what}</span>
                  </span>
                  <span className="font-mono text-[11px] text-(--ui-muted) tabular-nums">{x.at}</span>
                  <span className="flex justify-end">
                    {x.state === "Talking" ? (
                      <span className="flex items-center gap-1.5 text-[11px] text-(--ui-live)">
                        <span className="size-1.5 rounded-full bg-current" />
                        Talking
                      </span>
                    ) : (
                      <span className="rounded-md bg-(--ui-raised) px-2 py-0.5 text-[11px] text-(--ui-muted)">{x.state}</span>
                    )}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex min-h-0 flex-col gap-4">
              {/* What's firing */}
              <div className="flex flex-col gap-2 rounded-lg border border-(--ui-line) bg-(--ui-panel) p-3.5">
                <span className="flex items-center justify-between text-[11px] text-(--ui-muted)">
                  Alerts
                  <span className={cn("flex items-center gap-1", FAIL)}>
                    <BellIcon weight="fill" className="size-3" />1 firing
                  </span>
                </span>
                <span className="text-[12.5px]">“Waits for every digit” below 95%</span>
                <span className="text-[11px] text-(--ui-muted)">QA threshold · fired 10:14 · #billing-qa</span>
              </div>

              {/* The latest failed action, from the log */}
              <div className="flex flex-col gap-2 rounded-lg border border-(--ui-line) bg-(--ui-panel) p-3.5">
                <span className="text-[11px] text-(--ui-muted)">From the log · Maya Patel · 0:22</span>
                <span className="flex items-center gap-2 text-[12.5px]">
                  <WrenchIcon className="size-3.5 text-(--ui-muted)" />
                  <span className="font-mono">take_payment</span>
                  <UiPill tone="fail" dot={false} className="px-1.5 py-px text-[10.5px]">
                    Failed
                  </UiPill>
                </span>
                <span className="text-[11px] text-(--ui-muted)">Card number incomplete · agent cut in</span>
              </div>

              {/* Today, by the hour: fills the column, the current hour still filling */}
              <div className="flex min-h-0 flex-1 flex-col gap-2 rounded-lg border border-(--ui-line) bg-(--ui-panel) p-3.5">
                <span className="flex items-center justify-between text-[11px] text-(--ui-muted)">
                  Conversations by hour
                  <span>8:00 – now</span>
                </span>
                <div className="flex min-h-0 flex-1 items-end gap-1.5">
                  {HOURS.map((v, i) => (
                    <span key={i} className={cn("flex-1 rounded-sm", i === HOURS.length - 1 ? "bg-(--ok)/40" : "bg-(--ui-text)/25")} style={{ height: `${(v / 160) * 100}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroConsole>
  )
}
