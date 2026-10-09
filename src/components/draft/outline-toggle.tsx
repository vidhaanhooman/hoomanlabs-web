"use client"

import { useEffect, useState } from "react"

/**
 * Draft-only control: toggles section outlines + name/status labels so
 * feedback can reference sections by name. Rendered only while any section
 * is still "draft" (see layout.tsx).
 */
export function OutlineToggle() {
  const [on, setOn] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.outline = on ? "on" : "off"
  }, [on])

  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => setOn((v) => !v)}
      className="fixed right-4 bottom-4 z-50 rounded-full border border-line-strong bg-background px-3.5 py-2 font-mono text-[12px] text-foreground transition-transform duration-150 ease-(--ease-out) active:scale-[0.97]"
    >
      Sections: {on ? "on" : "off"}
    </button>
  )
}
