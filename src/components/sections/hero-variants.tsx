"use client"

import { useState } from "react"

import { Journey } from "@/components/sections/journey"
import { InkJourney } from "@/components/sections/journey-ink"
import { cn } from "@/lib/utils"

const VARIANTS = [
  { id: "window", label: "Product window" },
  { id: "ink", label: "Ink & wash" },
] as const

/** Lab-only: compare hero journey directions on /lab/v3. */
export function HeroVariants() {
  const [v, setV] = useState<(typeof VARIANTS)[number]["id"]>("window")
  return (
    <div className="flex flex-col gap-3">
      <div role="tablist" aria-label="Hero variant" className="flex w-fit items-center gap-1 rounded-full border border-dashed border-line-strong p-1">
        <span className="px-2 font-mono text-[11px] text-ink-muted">Lab</span>
        {VARIANTS.map((x) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            aria-selected={v === x.id}
            onClick={() => setV(x.id)}
            className={cn(
              "rounded-full px-3 py-1 text-[12px] transition-colors",
              v === x.id ? "bg-foreground text-background" : "text-ink-secondary hover:text-foreground"
            )}
          >
            {x.label}
          </button>
        ))}
      </div>
      {v === "window" ? <Journey /> : <InkJourney />}
    </div>
  )
}
