"use client"

import { useEffect, useState } from "react"

import { SpacingOverlay } from "@/components/draft/spacing-overlay"

/**
 * Draft-only control: toggles section outlines + name/status labels so
 * feedback can reference sections by name, plus the spacing overlay
 * (section padding, container gutters and element gaps against the
 * design-system tokens, mismatches in red; click an element to inspect
 * it). Rendered only while any section is still "draft" (see layout.tsx).
 */
export function OutlineToggle() {
  const [on, setOn] = useState(false)
  const [off, setOff] = useState(0)

  useEffect(() => {
    document.documentElement.dataset.outline = on ? "on" : "off"
  }, [on])

  return (
    <>
      {on && <SpacingOverlay onCount={setOff} />}
      <button
        type="button"
        data-outline-toggle
        aria-pressed={on}
        onClick={() => setOn((v) => !v)}
        className="fixed bottom-4 left-20 z-50 flex items-center gap-2 rounded-full border border-line-strong bg-background px-3.5 py-2 font-mono text-[12px] text-foreground transition-transform duration-150 ease-(--ease-out) active:scale-[0.97]"
      >
        Sections: {on ? "on" : "off"}
        {on && (
          <span className={off ? "rounded-full bg-[oklch(0.63_0.22_25)] px-1.5 text-white" : "text-ink-muted"}>
            {off ? `${off} off-token` : "all on token"}
          </span>
        )}
      </button>
    </>
  )
}
