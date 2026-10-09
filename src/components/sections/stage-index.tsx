"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

/**
 * Sticky stage index (Fin-inspired "reason picker"): shows which stage you're
 * in and jumps between them. Pill bottom-left on desktop, bar under the header
 * on mobile. Only visible while the stages are on screen.
 */
export function StageIndex({ stages }: { stages: { id: string; label: string }[] }) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const els = stages.map((s) => document.getElementById(`product-${s.id}`)).filter(Boolean) as HTMLElement[]
    if (!els.length) return
    const visible = new Map<string, number>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0)
        // The stage covering the most of the viewport wins; none -> hide.
        let best: string | null = null
        let ratio = 0
        visible.forEach((r, id) => {
          if (r > ratio) {
            ratio = r
            best = id
          }
        })
        setActive(best ? (best as string).replace("product-", "") : null)
      },
      { threshold: [0, 0.15, 0.3, 0.5, 0.75, 1] }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [stages])

  const shown = active !== null

  return (
    <nav
      aria-label="Page stages"
      className={cn(
        "fixed z-30 transition-[opacity,transform] duration-300 ease-(--ease-out)",
        "inset-x-0 top-16 border-b border-line bg-background/90 backdrop-blur-sm lg:inset-x-auto lg:top-auto lg:bottom-6 lg:left-6 lg:rounded-full lg:border",
        shown ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0 lg:translate-y-2"
      )}
    >
      <ul className="flex items-center justify-center gap-1 p-1.5">
        {stages.map((s) => (
          <li key={s.id}>
            <a
              href={`#product-${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              className={cn(
                "inline-flex h-8 items-center rounded-full px-3.5 text-small transition-colors duration-200",
                active === s.id ? "bg-foreground text-background" : "text-ink-secondary hover:text-foreground"
              )}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
