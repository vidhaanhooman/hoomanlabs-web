"use client"

import { useRef } from "react"

import { Wordmark } from "@/components/layout/wordmark"

/**
 * Giant footer wordmark with a pointer spotlight (see .footer-spot in
 * globals.css). Pointer position is written straight to CSS variables on the
 * element, so moving the mouse never re-renders React. Decorative only: the
 * real, labelled logo sits in the footer above.
 */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null)

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch") return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--spot-x", `${((e.clientX - r.left) / r.width) * 100}%`)
    el.style.setProperty("--spot-y", `${((e.clientY - r.top) / r.height) * 100}%`)
    el.dataset.active = ""
  }

  function onPointerLeave() {
    delete ref.current?.dataset.active
  }

  return (
    <div
      ref={ref}
      aria-hidden
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="footer-spot relative -mb-[1.5%] select-none"
    >
      <Wordmark className="h-auto w-full text-foreground/[0.07]" />
      <div className="footer-spot-light absolute inset-0">
        <Wordmark className="h-auto w-full text-foreground" />
      </div>
    </div>
  )
}
