"use client"

import { useEffect, useState } from "react"
import { XIcon } from "@phosphor-icons/react"

import { HeroCallCard } from "@/components/lab/hero-call-card"
import { cn } from "@/lib/utils"

/**
 * Floating "Talk to an agent" button, bottom right. Opens the same call card
 * as the hero (play a sample, or get the call) in a panel above it. Appears
 * once the `after` element (the hero's call card by default) has scrolled out
 * of view, and steps aside while the `hideOver` element is on screen.
 */
export function VoiceWidget({
  after = "listen",
  hideOver,
}: {
  /** Show once this element has scrolled out of view. */
  after?: string
  /** Hide while this element (e.g. a full talk-to-an-agent section) is on screen. */
  hideOver?: string
} = {}) {
  const [open, setOpen] = useState(false)
  const [past, setPast] = useState(false)
  const [covered, setCovered] = useState(false)

  useEffect(() => {
    const io: IntersectionObserver[] = []
    const watch = (id: string | undefined, set: (inView: boolean) => void) => {
      const el = id && document.getElementById(id)
      if (!el) return
      const o = new IntersectionObserver(([e]) => set(e.isIntersecting), { threshold: 0 })
      o.observe(el)
      io.push(o)
    }
    watch(after, (v) => setPast(!v))
    watch(hideOver, setCovered)
    return () => io.forEach((o) => o.disconnect())
  }, [after, hideOver])

  const shown = past && !covered
  if (!shown && !open) return null
  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open && (
        <div
          role="dialog"
          aria-label="Talk to an agent"
          className="max-h-[calc(100svh-6rem)] w-[min(calc(100vw-2rem),46rem)] overflow-y-auto rounded-[2rem] bg-background shadow-[0_40px_100px_-30px_oklch(0_0_0/0.45)] motion-safe:animate-[reveal-blur_300ms_var(--ease-out)_both]"
        >
          <HeroCallCard />
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={cn(
          "flex h-12 items-center gap-2.5 rounded-full bg-foreground pr-5 pl-2 text-small font-medium text-background shadow-[0_16px_40px_-16px_oklch(0_0_0/0.6)] transition-transform duration-150 ease-(--ease-out) active:scale-[0.97]",
          open && "pr-2"
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
        {!open && "Talk to an agent"}
      </button>
    </div>
  )
}
