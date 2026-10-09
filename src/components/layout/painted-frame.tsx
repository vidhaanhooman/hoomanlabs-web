"use client"

import { useRef } from "react"

import { cn } from "@/lib/utils"

/**
 * A rounded frame on a painted texture that responds to the pointer: the
 * painting drifts against the cursor (a little depth), a soft light follows
 * it, and the content lifts. Writes CSS variables straight to the DOM, so no
 * re-renders. Touch and reduced motion get the still painting.
 */
export function PaintedFrame({
  texture,
  className,
  children,
}: {
  texture: { src: string; filter?: string }
  className?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch") return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty("--px", String(x - 0.5))
    el.style.setProperty("--py", String(y - 0.5))
    el.style.setProperty("--lx", `${x * 100}%`)
    el.style.setProperty("--ly", `${y * 100}%`)
    el.dataset.active = ""
  }

  function onLeave() {
    const el = ref.current
    if (!el) return
    el.style.setProperty("--px", "0")
    el.style.setProperty("--py", "0")
    delete el.dataset.active
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("painted-frame group/frame relative isolate overflow-hidden rounded-md", className)}
    >
      <span
        aria-hidden
        className="painted-frame-art absolute -inset-[6%] -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${texture.src})`, filter: texture.filter }}
      />
      <span aria-hidden className="painted-frame-light pointer-events-none absolute inset-0 -z-10" />
      <div className="painted-frame-content w-full">{children}</div>
    </div>
  )
}
