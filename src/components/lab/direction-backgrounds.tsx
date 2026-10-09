"use client"

import { useRef } from "react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * Lab: three candidate visual directions, drawn in code. Each renders as an
 * absolutely positioned layer behind a dark product UI.
 *
 * 1 VoiceField: sound as the visual (emitting rings + dotted waveform)
 * 2 StageField: monochrome stage (near-black, soft glow, dot grid, grain)
 * 3 ColorField: grainy colour field in one brand hue, slowly drifting
 */

/** Film grain as an SVG noise tile. */
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

function Grain({ opacity = 0.18 }: { opacity?: number }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 mix-blend-overlay"
      style={{ backgroundImage: GRAIN, opacity }}
    />
  )
}

/* ------------------------------------------------------------ 1 voice */

export type VoiceVariant = "hero" | "rings" | "wave" | "spectrogram"

/** Round to 3 decimals so server and client render identical attributes. */
const r3 = (v: number) => Math.round(v * 1000) / 1000

/** Deterministic amplitude envelope for column i of n (no hydration drift). */
const amp = (i: number, n: number, seed = 0, floor = 0) => {
  const x = i / n
  const env = floor + (1 - floor) * Math.sin(Math.PI * x) ** 1.4
  const wob = 0.55 + 0.45 * Math.abs(Math.sin(i * 0.9 + seed) * Math.cos(i * 0.37 + seed * 2))
  return env * wob
}

export function VoiceField({
  variant = "hero",
  center = "50% 50%",
  className,
}: {
  variant?: VoiceVariant
  /** Ring centre for the "rings" variant, as "x% y%". */
  center?: string
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = usePrefersReducedMotion()
  const [px, py] = center.split(" ").map((v) => parseFloat(v) / 100)
  const cx = px * 1600
  const cy = py * 900

  const onMove = (e: React.PointerEvent) => {
    if (reduce || variant !== "hero" || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty("--mx", `${((e.clientX - r.left) / r.width - 0.5) * 30}px`)
    ref.current.style.setProperty("--my", `${((e.clientY - r.top) / r.height - 0.5) * 20}px`)
  }

  const showRings = variant === "hero" || variant === "rings"
  const showWave = variant === "hero" || variant === "wave"
  const ringX = variant === "hero" ? 800 : cx
  const ringY = variant === "hero" ? 450 : cy

  return (
    <div
      ref={ref}
      aria-hidden
      onPointerMove={onMove}
      className={cn("absolute inset-0 -z-10 overflow-hidden bg-[oklch(0.15_0_0)]", className)}
    >
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full transition-transform duration-700 ease-(--ease-out)"
        style={{ transform: "translate(var(--mx, 0px), var(--my, 0px))" }}
      >
        {showRings && (
          <g fill="none" stroke="white">
            {Array.from({ length: 16 }, (_, i) => (
              <circle key={i} cx={ringX} cy={ringY} r={70 + i * 52} strokeOpacity={r3(0.2 - i * 0.01)} strokeWidth={1} />
            ))}
            {!reduce &&
              [0, 1, 2].map((i) => (
                <circle key={`e${i}`} cx={ringX} cy={ringY} r={70} strokeWidth={1.2} strokeOpacity={0}>
                  <animate attributeName="r" values="70;900" dur="6s" begin={`${i * 2}s`} repeatCount="indefinite" />
                  <animate
                    attributeName="stroke-opacity"
                    values="0.45;0"
                    dur="6s"
                    begin={`${i * 2}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
          </g>
        )}

        {showWave && <DottedWave y={variant === "hero" ? 450 : 450} reduce={reduce} />}

        {variant === "spectrogram" && <Spectrogram />}
      </svg>
      <Grain opacity={0.12} />
    </div>
  )
}

/** A band of dot columns whose heights follow an amplitude envelope; columns breathe. */
function DottedWave({ y, reduce }: { y: number; reduce: boolean }) {
  const COLS = 96
  const GAP = 16
  const x0 = (1600 - (COLS - 1) * GAP) / 2
  return (
    <g fill="white">
      {Array.from({ length: COLS }, (_, i) => {
        const a = amp(i, COLS, 1.3, 0.35)
        const dots = Math.max(1, Math.round(a * 11))
        return (
          <g
            key={i}
            className={reduce ? undefined : "voice-col"}
            style={{ animationDelay: `${-(i % 12) * 110}ms`, transformOrigin: `${x0 + i * GAP}px ${y}px` }}
          >
            {Array.from({ length: dots * 2 - 1 }, (_, j) => {
              const k = j - (dots - 1)
              return (
                <circle
                  key={j}
                  cx={x0 + i * GAP}
                  cy={y + k * 13}
                  r={2.1}
                  fillOpacity={r3(0.85 - (Math.abs(k) / dots) * 0.65)}
                />
              )
            })}
          </g>
        )
      })}
    </g>
  )
}

/** Time x frequency grid of dots; brightness follows a few harmonic bands. */
function Spectrogram() {
  const COLS = 64
  const ROWS = 30
  return (
    <g fill="white">
      {Array.from({ length: COLS }, (_, i) =>
        Array.from({ length: ROWS }, (_, j) => {
          const band = Math.max(0, Math.cos((j - 6 - Math.sin(i * 0.25) * 3) * 0.5)) * 0.7
          const band2 = Math.max(0, Math.cos((j - 17 - Math.cos(i * 0.18) * 2) * 0.6)) * 0.45
          const v = Math.min(1, (band + band2) * amp(i, COLS, 0.4) + 0.04)
          return <circle key={`${i}-${j}`} cx={60 + i * 23.5} cy={870 - j * 28} r={3.2} fillOpacity={r3(v)} />
        })
      )}
    </g>
  )
}

/* ------------------------------------------------------------ 2 stage */

export function StageField({ glow = "50% 0%", className }: { glow?: string; className?: string }) {
  return (
    <div aria-hidden className={cn("absolute inset-0 -z-10 overflow-hidden bg-[oklch(0.14_0_0)]", className)}>
      <span
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse 70% 60% at ${glow}, oklch(1 0 0 / 14%), transparent 70%)` }}
      />
      <span
        className="absolute inset-0 bg-size-[18px_18px] opacity-50"
        style={{
          backgroundImage: "radial-gradient(circle, oklch(1 0 0 / 22%) 0.8px, transparent 1px)",
          maskImage: `radial-gradient(ellipse 80% 80% at ${glow}, black, transparent 80%)`,
        }}
      />
      <Grain opacity={0.1} />
    </div>
  )
}

/* ------------------------------------------------------------ 3 colour */

/** Deep green brand hue with teal and ink, slowly drifting. */
export function ColorField({ seed = 0, className }: { seed?: number; className?: string }) {
  const p = [
    [20 + seed * 13, 25],
    [80 - seed * 9, 30],
    [55, 85 - seed * 7],
  ]
  return (
    <div aria-hidden className={cn("absolute inset-0 -z-10 overflow-hidden bg-[oklch(0.22_0.04_170)]", className)}>
      <span
        className="color-drift absolute -inset-[20%]"
        style={{
          background: [
            `radial-gradient(circle at ${p[0][0]}% ${p[0][1]}%, oklch(0.62 0.13 160) 0%, transparent 38%)`,
            `radial-gradient(circle at ${p[1][0]}% ${p[1][1]}%, oklch(0.55 0.1 210) 0%, transparent 40%)`,
            `radial-gradient(circle at ${p[2][0]}% ${p[2][1]}%, oklch(0.7 0.12 120) 0%, transparent 35%)`,
          ].join(","),
          filter: "blur(40px)",
        }}
      />
      <Grain opacity={0.35} />
    </div>
  )
}
