"use client"

import { useLayoutEffect, useRef, useState } from "react"

import { MeshStage } from "@/components/layout/art-stage"
import { cn } from "@/lib/utils"

/**
 * The product-page hero frame: a backdrop (a drifting landscape, or the mesh
 * gradient without one) with a large product console centred on it. The
 * console is laid out at a design size and scaled to fit; below md it keeps
 * a readable scale and crops on the right. Each page passes its console
 * (design-size markup, with its own motion) as children.
 */
export function HeroConsole({
  image,
  designW = 1100,
  designH,
  children,
}: {
  image?: string
  designW?: number
  designH: number
  children: React.ReactNode
}) {
  const box = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [crop, setCrop] = useState(false)

  useLayoutEffect(() => {
    const el = box.current
    if (!el) return
    const fit = () => {
      const s = el.clientWidth / designW
      setCrop(s < 0.6)
      setScale(Math.max(0.6, Math.min(1.1, s)))
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [designW])

  return (
    <MeshStage image={image} className="px-4 py-8 sm:p-[5%]">
      <div ref={box} className="relative" style={{ height: designH * scale }}>
        <div
          className={cn("absolute top-0", crop ? "left-0" : "left-1/2")}
          style={{ width: designW, height: designH, transform: `${crop ? "" : "translateX(-50%) "}scale(${scale})`, transformOrigin: crop ? "0 0" : "50% 0" }}
        >
          {children}
        </div>
      </div>
    </MeshStage>
  )
}

// The card styles live in a plain module so server components can use them too.
export { CONSOLE, FROSTED, HERO_CARD } from "@/lib/hero-styles"
