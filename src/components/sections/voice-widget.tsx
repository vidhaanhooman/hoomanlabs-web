"use client"

import { useEffect, useState } from "react"
import { XIcon } from "@phosphor-icons/react"

import { HeroCallCard } from "@/components/lab/hero-call-card"
import { cn } from "@/lib/utils"

/**
 * Floating "Talk to an agent" button, bottom right. Opens the same call card
 * as the hero (play a sample, or get the call) in a panel above it. Appears
 * once the hero's call card has scrolled out of view.
 */
export function VoiceWidget() {
  const [open, setOpen] = useState(false)
  const [shown, setShown] = useState(false)

  // Only offer the widget once the hero's own call card is off screen.
  useEffect(() => {
    const hero = document.getElementById("listen")
    if (!hero) return
    const io = new IntersectionObserver(([e]) => setShown(!e.isIntersecting), { threshold: 0 })
    io.observe(hero)
    return () => io.disconnect()
  }, [])

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
