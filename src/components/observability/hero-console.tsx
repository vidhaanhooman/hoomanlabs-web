"use client"

import { Disposition, Funnel, OverTime } from "@/components/observability/dashboard"
import { CONSOLE, HeroConsole } from "@/components/product-page/hero-console"
import { cn } from "@/lib/utils"

/**
 * The /platform/observability hero: a large console on the backdrop (the
 * mesh gradient until a photo is chosen) with the console's calling
 * dashboard: prebuilt views as tabs, the calling funnel, calls over time
 * and the disposition. Static. Sample numbers.
 */

const DESIGN_W = 1100
const DESIGN_H = 620

export function ObservabilityConsole() {
  return (
    <HeroConsole designW={DESIGN_W} designH={DESIGN_H}>
      <div className={CONSOLE}>
        {/* Title bar with the prebuilt views */}
        <div className="flex h-12 shrink-0 items-center gap-3 border-b border-(--ui-line) px-5">
          <span className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-2.5 rounded-full bg-white/10" />
            ))}
          </span>
          <span className="ml-1">Dashboards · Billing</span>
          <span className="ml-6 flex gap-1 rounded-lg bg-(--ui-raised) p-0.5 text-[12px]">
            {["Inbound", "Outbound", "Campaigns", "Tools", "Custom"].map((t, i) => (
              <span key={t} className={cn("rounded-md px-3 py-1", i === 1 ? "bg-(--ui-panel) text-(--ui-text)" : "text-(--ui-muted)")}>
                {t}
              </span>
            ))}
          </span>
          <span className="ml-auto flex items-center gap-1.5 rounded-full bg-(--ui-raised) px-2.5 py-0.5 text-[12px]">
            <span className="size-1.5 rounded-full bg-(--ui-live)" />
            Last 30 days
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5">
          <Funnel />
          <div className="grid flex-1 grid-cols-[1.45fr_1fr] gap-4">
            <OverTime height={190} />
            <Disposition />
          </div>
        </div>
      </div>
    </HeroConsole>
  )
}
