"use client"

import Image from "next/image"
import { useId, useState } from "react"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Placeholder } from "@/components/layout/placeholder"
import { Section } from "@/components/layout/section"
import { AgentConfigScreen } from "@/components/product/agent-config-screen"
import { AnalyticsScreen } from "@/components/product/analytics-screen"
import { CampaignScreen } from "@/components/product/campaign-screen"
import { KnowledgeScreen } from "@/components/product/knowledge-screen"
import { SimulationRunScreen } from "@/components/product/simulation-run-screen"
import { ToolsScreen } from "@/components/product/tools-screen"
import type { ProductStage as Stage, StageVisual } from "@/content/products"
import type { SectionId } from "@/content/sections"
import { cn } from "@/lib/utils"

/** Window position inside the painted backdrop (same as the home split panels). */
const WINDOW = "absolute inset-x-[7%] top-[9%] bottom-[12%] z-10"
const CHROME = "rounded-md border border-black/10 shadow-[0_20px_50px_-24px_oklch(0.25_0.03_150/0.55)]"

/** Renders a stage visual (recreated screen or placeholder) at the given position. */
export function StageScreen({ visual, className = WINDOW }: { visual: StageVisual; className?: string }) {
  const cls = `${className} ${CHROME}`
  if (typeof visual === "object") {
    return <Placeholder variant="frame" label={visual.placeholder} className={className} />
  }
  switch (visual) {
    case "agent-config":
      return <AgentConfigScreen className={cls} />
    case "knowledge":
      return <KnowledgeScreen className={cls} />
    case "tools":
      return <ToolsScreen className={cls} />
    case "analytics":
      return <AnalyticsScreen className={cls} />
    case "simulation":
      return <SimulationRunScreen className={cls} />
    case "campaign":
      return <CampaignScreen className={cls} />
  }
}

/**
 * One lifecycle stage (Build / Ship / Improve) as a split panel: label,
 * headline and intro over an expanding list of items on one side; the
 * painted backdrop with the open item's screen on the other.
 */
export function ProductStage({ stage, media = "end" }: { stage: Stage; media?: "start" | "end" }) {
  const [open, setOpen] = useState(0)
  const baseId = useId()
  const item = stage.items[open]

  return (
    <Section id={`product-${stage.id}` as SectionId} spacing="tight">
      <Container>
        <Panel className="grid items-center gap-8 p-4 sm:p-6 lg:grid-cols-3 lg:gap-0 lg:p-3">
          {/* Copy + items */}
          <div className={cn("flex flex-col gap-6 px-2 pt-4 sm:px-4 lg:px-10 lg:py-10", media === "start" && "lg:order-2")}>
            <div className="flex flex-col gap-3">
              <p className="text-small text-ink-muted">{stage.label}</p>
              <h2 className="text-h3 font-normal">{stage.headline}</h2>
              <p className="text-small text-ink-secondary">{stage.body}</p>
            </div>

            <ul className="flex flex-col">
              {stage.items.map((it, i) => {
                const active = i === open
                const panelId = `${baseId}-${i}`
                return (
                  <li key={it.title} className="border-t border-line last:border-b">
                    <button
                      type="button"
                      aria-expanded={active}
                      aria-controls={panelId}
                      onClick={() => setOpen(i)}
                      className={cn(
                        "flex w-full items-center gap-2 py-3 text-left text-body transition-colors duration-200",
                        active ? "text-foreground" : "text-ink-muted hover:text-foreground"
                      )}
                    >
                      {it.title}
                      {it.beta && (
                        <span className="rounded-full border border-line-strong px-1.5 py-px text-label text-ink-secondary">
                          Beta
                        </span>
                      )}
                    </button>
                    <div
                      id={panelId}
                      role="region"
                      aria-label={it.title}
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-300 ease-(--ease-out) motion-reduce:transition-none",
                        active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <p className="overflow-hidden text-small text-ink-secondary">
                        <span className="block max-w-[44ch] pb-4">{it.body}</span>
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Painted backdrop + the open item's screen */}
          <div
            className={cn(
              "relative isolate aspect-[4/3] overflow-hidden rounded-md lg:col-span-2 lg:aspect-[16/11]",
              media === "start" && "lg:order-1"
            )}
          >
            <Image
              src={stage.backdrop}
              alt=""
              fill
              sizes="(min-width: 1300px) 860px, (min-width: 1024px) 66vw, 100vw"
              className="-z-10 object-cover"
            />
            <div key={item.title} className="absolute inset-0 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300">
              <StageScreen visual={item.visual} />
            </div>
          </div>
        </Panel>
      </Container>
    </Section>
  )
}
