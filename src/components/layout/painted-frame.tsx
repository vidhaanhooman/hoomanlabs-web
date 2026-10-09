"use client"

import { useEffect, useId, useRef } from "react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * A rounded frame on a painted texture that behaves like water under the
 * pointer: the paint ripples (an SVG turbulence + displacement filter whose
 * strength eases in on hover), rings spread from the cursor as it moves, and
 * the content floats a little. DOM is written directly, so no re-renders.
 * Touch and reduced motion get the still painting.
 */

const MAX_DISPLACE = 16 // px of distortion at full hover
const RING_EVERY_MS = 180

export function PaintedFrame({
  texture,
  className,
  children,
}: {
  texture: { src: string; filter?: string }
  className?: string
  children: React.ReactNode
}) {
  const id = useId().replace(/:/g, "")
  const ref = useRef<HTMLDivElement>(null)
  const ringsRef = useRef<HTMLDivElement>(null)
  const dispRef = useRef<SVGFEDisplacementMapElement>(null)
  const target = useRef(0)
  const current = useRef(0)
  const raf = useRef<number | null>(null)
  const lastRing = useRef(0)
  const reduce = usePrefersReducedMotion()

  // Ease the ripple strength toward its target each frame, then stop.
  function tick() {
    current.current += (target.current - current.current) * 0.08
    dispRef.current?.setAttribute("scale", current.current.toFixed(2))
    if (Math.abs(target.current - current.current) > 0.05) raf.current = requestAnimationFrame(tick)
    else raf.current = null
  }
  function ease(to: number) {
    target.current = to
    if (raf.current == null) raf.current = requestAnimationFrame(tick)
  }
  useEffect(() => () => {
    if (raf.current != null) cancelAnimationFrame(raf.current)
  }, [])

  function ring(x: number, y: number) {
    const host = ringsRef.current
    if (!host) return
    const el = document.createElement("span")
    el.className = "painted-ring"
    el.style.left = `${x}px`
    el.style.top = `${y}px`
    host.appendChild(el)
    el.addEventListener("animationend", () => el.remove())
  }

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch" || reduce) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    el.style.setProperty("--px", String(x / r.width - 0.5))
    el.style.setProperty("--py", String(y / r.height - 0.5))
    el.dataset.active = ""
    ease(MAX_DISPLACE)
    const now = performance.now()
    if (now - lastRing.current > RING_EVERY_MS) {
      lastRing.current = now
      ring(x, y)
    }
  }

  function onLeave() {
    const el = ref.current
    if (!el) return
    el.style.setProperty("--px", "0")
    el.style.setProperty("--py", "0")
    delete el.dataset.active
    ease(0)
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("painted-frame relative isolate overflow-hidden rounded-md", className)}
    >
      {/* The water: slowly drifting turbulence displaces the paint. */}
      <svg aria-hidden className="pointer-events-none absolute size-0">
        <filter id={`water-${id}`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.022" numOctaves="2" seed="3" result="noise">
            {!reduce && (
              <animate
                attributeName="baseFrequency"
                dur="9s"
                values="0.008 0.022; 0.011 0.03; 0.008 0.022"
                repeatCount="indefinite"
              />
            )}
          </feTurbulence>
          <feDisplacementMap ref={dispRef} in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <span
        aria-hidden
        className="painted-frame-art absolute -inset-[6%] -z-20 bg-cover bg-center"
        style={{
          backgroundImage: `url(${texture.src})`,
          filter: `${texture.filter ?? ""} url(#water-${id})`.trim(),
        }}
      />
      <div ref={ringsRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" />
      <div className="painted-frame-content w-full">{children}</div>
    </div>
  )
}
