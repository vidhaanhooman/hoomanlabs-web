"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"

/**
 * Hero backdrop experiment: layered artwork with parallax depth.
 *
 * - Pointer (mouse/pen): layers shift by depth toward the cursor, spring-smoothed.
 * - Scroll (all devices, the only input on touch): layers drift vertically by depth.
 * - Reduced motion: static composition. The markup is identical either way (the
 *   preference is unknown on the server); movement is gated by `enabled` after
 *   hydration, so there is no hydration mismatch.
 *
 * Pointer and scroll live in motion values, never React state, so moving the
 * mouse doesn't re-render. Layers are animated via a transform string so the
 * work stays on the compositor.
 *
 * Artwork: public/hero/parallax/ (see docs/parallax-art-prompts.md).
 */

const POINTER_RANGE = 22 // px of travel for a depth-1 layer at the frame edge
const SCROLL_RANGE = 28 // px of vertical drift for a depth-1 layer across the scroll

type ArtLayer = {
  src: string
  depth: number
  /** Optional CSS mask, e.g. to show only one band of a full-scene image. */
  mask?: string
}

// Back to front. The ridge + hills band is taken from the master scene (masked
// below its sky) until dedicated 03-ridge / 04-hills layers exist.
const LAYERS: ArtLayer[] = [
  { src: "/hero/parallax/01-sky.png", depth: 0.1 },
  { src: "/hero/parallax/02-clouds.png", depth: 0.3 },
  {
    src: "/hero/parallax/00-master.png",
    depth: 0.55,
    mask: "linear-gradient(to bottom, transparent 33%, black 43%)",
  },
  { src: "/hero/parallax/05-slope.png", depth: 1 },
  { src: "/hero/parallax/06-foreground.png", depth: 1.4 },
]

// Layers render at 112% of the stage width (inset -6%); the stage tops out at
// the 1300px container.
const SIZES = "(min-width: 1300px) 1460px, 112vw"

export function HeroParallaxStage({
  className,
  floats,
  children,
}: {
  className?: string
  /** Items that ride a parallax layer at the given depth (0 far, 1 near). */
  floats?: { key: string; depth: number; node: React.ReactNode }[]
  children?: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const spring = { stiffness: 90, damping: 20, mass: 0.6 }
  const sx = useSpring(px, spring)
  const sy = useSpring(py, spring)

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const scroll = useTransform(scrollYProgress, [0, 1], [-1, 1])

  // 1 = move, 0 = hold still. Flipped after hydration from the motion preference.
  const enabled = useMotionValue(1)
  useEffect(() => {
    enabled.set(reduce ? 0 : 1)
  }, [reduce, enabled])

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch" || reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    px.set(((e.clientX - r.left) / r.width) * 2 - 1)
    py.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }

  function onPointerLeave() {
    px.set(0)
    py.set(0)
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn("relative isolate overflow-hidden rounded-md bg-placeholder", className)}
    >
      <div aria-hidden className="absolute inset-0">
        {LAYERS.map((layer) => (
          <Layer
            key={layer.src}
            depth={layer.depth}
            sx={sx}
            sy={sy}
            scroll={scroll}
            enabled={enabled}
          >
            <LayerImage layer={layer} />
          </Layer>
        ))}
      </div>
      {floats?.map((f) => (
        <Layer key={f.key} depth={f.depth} sx={sx} sy={sy} scroll={scroll} enabled={enabled}>
          {f.node}
        </Layer>
      ))}

      {children}
    </div>
  )
}

function LayerImage({ layer }: { layer: ArtLayer }) {
  return (
    <div
      className="absolute inset-0"
      style={layer.mask ? { maskImage: layer.mask, WebkitMaskImage: layer.mask } : undefined}
    >
      <Image src={layer.src} alt="" fill sizes={SIZES} loading="eager" className="object-cover" />
    </div>
  )
}

function Layer({
  depth,
  sx,
  sy,
  scroll,
  enabled,
  children,
}: {
  depth: number
  sx: MotionValue<number>
  sy: MotionValue<number>
  scroll: MotionValue<number>
  enabled: MotionValue<number>
  children: React.ReactNode
}) {
  // Layers move *against* the pointer so the scene reads as depth behind the frame.
  const x = useTransform(
    [sx, enabled] as MotionValue<number>[],
    ([v, on]: number[]) => -v * POINTER_RANGE * depth * on
  )
  const y = useTransform(
    [sy, scroll, enabled] as MotionValue<number>[],
    ([p, s, on]: number[]) => (-p * POINTER_RANGE * depth * 0.6 + s * SCROLL_RANGE * depth) * on
  )
  const transform = useMotionTemplate`translate3d(${x}px, ${y}px, 0)`

  return (
    <motion.div className="absolute inset-[-6%] will-change-transform" style={{ transform }}>
      {children}
    </motion.div>
  )
}
