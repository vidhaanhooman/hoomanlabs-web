"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

/**
 * A row of cards that scrolls sideways (snapping card by card), with a
 * heading and previous / next buttons above it. The row bleeds to the
 * page's right edge so the next card peeks in. Trackpad, touch and the
 * buttons all scroll it; the buttons dim at either end.
 */
export function HScroll({ title, children }: { title: string; children: React.ReactNode }) {
  const row = useRef<HTMLUListElement>(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  useEffect(() => {
    const el = row.current
    if (!el) return
    const update = () => setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 4 })
    update()
    el.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      el.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  const go = (dir: 1 | -1) => {
    const el = row.current
    const card = el?.firstElementChild as HTMLElement | null
    if (!el || !card) return
    el.scrollBy({ left: dir * (card.offsetWidth + 12), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })
  }

  const btn =
    "grid size-10 place-items-center rounded-full border border-line-strong text-foreground transition-[opacity,background-color] duration-150 hover:bg-surface disabled:pointer-events-none disabled:opacity-35"

  return (
    <>
      <div className="flex items-end justify-between gap-x-8 gap-y-4">
        <h2 className="max-w-[44rem] text-h2 font-normal">{title}</h2>
        <div className="flex shrink-0 gap-2">
          <button type="button" aria-label="Previous" disabled={edge.start} onClick={() => go(-1)} className={btn}>
            <ArrowLeftIcon className="size-4" />
          </button>
          <button type="button" aria-label="Next" disabled={edge.end} onClick={() => go(1)} className={btn}>
            <ArrowRightIcon className="size-4" />
          </button>
        </div>
      </div>
      <ul
        ref={row}
        className={cn(
          "mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          // Bleed to the right edge of the page, keeping the left aligned with the container.
          "-mr-(--gutter) pr-(--gutter)",
          "*:w-[min(82vw,26rem)] *:shrink-0 *:snap-start"
        )}
      >
        {children}
      </ul>
    </>
  )
}
