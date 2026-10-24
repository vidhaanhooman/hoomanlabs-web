"use client"

import Image from "next/image"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

import { cn } from "@/lib/utils"

/**
 * A painted-photo stage for product heroes, in the spirit of Cursor's
 * agent imagery: the image softened (a light blur, a little more colour),
 * heavy film grain laid over it, and a gentle vignette, so it reads as
 * atmosphere and the dark product window on top stays the subject.
 * Children are positioned inside the frame.
 */

export const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")"

export function ArtStage({
  src,
  className,
  position = "center",
  priority = false,
  children,
}: {
  src: string
  className?: string
  /** object-position for the image, e.g. "right" to keep its subject in view. */
  position?: string
  priority?: boolean
  children?: React.ReactNode
}) {
  return (
    <div className={cn("relative isolate overflow-hidden rounded-xl", className)}>
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes="(min-width: 1300px) 1240px, 100vw"
        className="-z-30 scale-[1.03] object-cover blur-[1.5px] saturate-[1.1]"
        style={{ objectPosition: position }}
      />
      {/* Film grain */}
      <span aria-hidden className="pointer-events-none absolute inset-0 -z-20 opacity-[0.32] mix-blend-overlay" style={{ backgroundImage: GRAIN, backgroundSize: "180px 180px" }} />
      {/* Vignette */}
      <span aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_55%,oklch(0.15_0.02_60/0.35))]" />
      {children}
    </div>
  )
}

/**
 * The same frame for heroes where the product UI is the subject and the
 * backdrop is only atmosphere: a soft mesh of dusk colours (muted teal,
 * peach, amber, a little rose) under the film grain. Give it a `video` (a
 * short silent loop, played muted on repeat) or an `image` (given a slow,
 * endless drift) and that moves behind the grain instead; the mesh stays as
 * the colour while it loads. Reduced motion: the video's poster frame, and
 * the image holds still.
 */
export function MeshStage({
  className,
  image,
  video,
  poster,
  position = "center",
  children,
}: {
  className?: string
  image?: string
  video?: string
  /** A still frame of the video, shown while it loads and for reduced motion. */
  poster?: string
  position?: string
  children?: React.ReactNode
}) {
  const reduce = usePrefersReducedMotion()
  return (
    <div
      className={cn("relative isolate overflow-hidden rounded-xl bg-[oklch(0.86_0.04_65)]", className)}
      style={{
        backgroundImage: [
          "radial-gradient(55% 65% at 12% 18%, oklch(0.74 0.06 225) 0%, transparent 70%)",
          "radial-gradient(50% 60% at 88% 12%, oklch(0.86 0.08 50) 0%, transparent 70%)",
          "radial-gradient(60% 55% at 70% 95%, oklch(0.78 0.12 62) 0%, transparent 70%)",
          "radial-gradient(45% 50% at 8% 92%, oklch(0.72 0.08 20) 0%, transparent 70%)",
          "radial-gradient(40% 40% at 50% 45%, oklch(0.9 0.05 75) 0%, transparent 70%)",
        ].join(","),
      }}
    >
      {video ? (
        <video
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-30 size-full scale-[1.03] object-cover blur-[1px] saturate-[1.1]"
          style={{ objectPosition: position }}
          src={reduce ? undefined : video}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : image ? (
        <span aria-hidden className="backdrop-drift pointer-events-none absolute -inset-[4%] -z-30">
          <Image src={image} alt="" fill sizes="(min-width: 1300px) 1240px, 100vw" className="object-cover blur-[1.5px] saturate-[1.1]" style={{ objectPosition: position }} />
        </span>
      ) : null}
      {/* Film grain: a fine layer that flickers like running film, and a coarser one for body */}
      <span aria-hidden className="grain-flicker pointer-events-none absolute -inset-[20px] -z-20 opacity-[0.55] mix-blend-overlay" style={{ backgroundImage: GRAIN, backgroundSize: "160px 160px" }} />
      <span aria-hidden className="pointer-events-none absolute inset-0 -z-20 opacity-[0.3] mix-blend-soft-light" style={{ backgroundImage: GRAIN, backgroundSize: "260px 260px" }} />
      {(image || video) && <span aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_55%,oklch(0.15_0.02_60/0.35))]" />}
      {children}
    </div>
  )
}
