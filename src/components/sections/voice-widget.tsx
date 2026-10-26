"use client"

import { useEffect, useState } from "react"
import { XIcon } from "@phosphor-icons/react"

import { HeroCallCard } from "@/components/lab/hero-call-card"
import { cn } from "@/lib/utils"

/**
 * Floating "Talk to an agent" button, bottom right. Opens the same call card
 * as the "Talk to an agent" section (flat layout: play a sample, or get the
 * call) in a panel above it. Appears
 * once the `after` element (the hero's call card by default) has scrolled out
 * of view, steps aside while a `hideOver` element is on screen, and shrinks
 * to its round icon over `compactOver` elements (e.g. rows of photo cards)
 * so it doesn't cover them.
 */
export function VoiceWidget({
  after = "listen",
  hideOver = [],
  compactOver = [],
}: {
  /** Show once this element has scrolled out of view; "" shows it from the start. */
  after?: string
  /** Hide while any of these elements (e.g. a full talk-to-an-agent section) is on screen. */
  hideOver?: string | string[]
  /** Shrink to the icon while any of these elements is on screen. */
  compactOver?: string[]
} = {}) {
  const [open, setOpen] = useState(false)
  // No `after` (empty): shown from the start.
  const [past, setPast] = useState(!after)
  const [covered, setCovered] = useState(false)
  const [compact, setCompact] = useState(false)
  const hide = (Array.isArray(hideOver) ? hideOver : [hideOver]).join(" ")
  const shrink = compactOver.join(" ")

  useEffect(() => {
    const io: IntersectionObserver[] = []
    /** Calls `set` with whether any of the elements (space-separated ids) is on screen. */
    const watch = (ids: string, set: (inView: boolean) => void) => {
      const seen = new Map<Element, boolean>()
      const els = ids
        .split(" ")
        .map((id) => id && document.getElementById(id))
        .filter((el): el is HTMLElement => !!el)
      if (!els.length) return
      const o = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => seen.set(e.target, e.isIntersecting))
          set([...seen.values()].some(Boolean))
        },
        { threshold: 0 }
      )
      els.forEach((el) => o.observe(el))
      io.push(o)
    }
    watch(after, (v) => setPast(!v))
    watch(hide, setCovered)
    watch(shrink, setCompact)
    return () => io.forEach((o) => o.disconnect())
  }, [after, hide, shrink])

  const shown = past && !covered
  if (!shown && !open) return null
  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open && (
        <div
          role="dialog"
          aria-label="Talk to an agent"
          className="max-h-[calc(100svh-6rem)] w-[min(calc(100vw-2rem),36rem)] overflow-y-auto rounded-md border border-line bg-background shadow-[0_40px_100px_-30px_oklch(0_0_0/0.45)] motion-safe:animate-[reveal-blur_300ms_var(--ease-out)_both]"
        >
          <HeroCallCard plain compact />
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close" : "Talk to an agent"}
        className={cn(
          "flex h-12 items-center gap-2.5 rounded-full bg-foreground pr-5 pl-2 text-small font-medium text-background shadow-[0_16px_40px_-16px_oklch(0_0_0/0.6)] transition-transform duration-150 ease-(--ease-out) active:scale-[0.97]",
          (open || compact) && "pr-2"
        )}
      >
        <span className="grid size-8 place-items-center rounded-full bg-background/15">
          {open ? (
            <XIcon className="size-4" />
          ) : (
            <span className="ui-wave flex h-3.5 items-end gap-[2px]" aria-hidden>
              {[6, 11, 8, 13, 7].map((h, i) => (
                <span key={i} className="w-[2px] rounded-full bg-background" style={{ height: h }} />
              ))}
            </span>
          )}
        </span>
        {!open && !compact && "Talk to an agent"}
      </button>
    </div>
  )
}
