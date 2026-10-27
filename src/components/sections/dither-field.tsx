"use client"

import { useEffect, useRef } from "react"

/** A soft glow, in the card's own units: centre (0–1 of width and height), radius (of the width) and strength (0–1). */
export type Glow = { x: number; y: number; r: number; k: number }

const BAYER = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
]

/** Frames per second while moving: low on purpose, so the dots step rather than glide. */
const FPS = 12

/**
 * A gradient drawn as ordered (Bayer) dither: the glows are summed into a
 * field, and each small cell is lit in the given colour where the field beats
 * its threshold, so the colour falls off in a pattern of dots rather than a
 * smooth fade, optionally recoloured by a sweep of colours. The glows drift
 * slowly on their own paths while the card is on screen (still for reduced
 * motion); redrawn on resize.
 *
 * With `row`, the field spans the nearest `[data-dither-row]` ancestor rather
 * than the card: each card draws the whole row's field, shifted by its own
 * place in the row, so one gradient carries on across a row of cards (and
 * follows them as they grow and shrink).
 */
export function DitherField({
  color,
  colors,
  glows,
  cell = 6,
  row = false,
  className,
}: {
  color: string
  /** Optional colours swept left to right across the dots, in place of the single colour. */
  colors?: string[]
  glows: Glow[]
  cell?: number
  row?: boolean
  className?: string
}) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    const card = canvas.parentElement
    const span = row ? canvas.closest<HTMLElement>("[data-dither-row]") : null
    let w = 0
    let h = 0
    const size = () => {
      const nw = span ? span.clientWidth : canvas.clientWidth
      const nh = span && card ? card.clientHeight : canvas.clientHeight
      if (nw === w && nh === h) return false
      w = nw
      h = nh
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      if (span) {
        canvas.style.width = `${w}px`
        canvas.style.height = `${h}px`
      }
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      return true
    }
    // In a row, line the canvas up with the row's left edge
    const place = () => {
      if (!span || !card) return
      const x = span.getBoundingClientRect().left - card.getBoundingClientRect().left - card.clientLeft
      canvas.style.transform = `translateX(${x}px)`
    }
    const draw = (t: number) => {
      if (!w || !h) return
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = color
      const dot = cell - 1
      // Each glow wanders on its own slow loop, and breathes a little in size
      const moved = glows.map((g, n) => ({
        x: g.x + Math.sin(t * 0.00031 + n * 2.1) * 0.14,
        y: g.y + Math.cos(t * 0.00023 + n * 1.3) * 0.12,
        r: g.r * (1 + Math.sin(t * 0.00041 + n) * 0.08),
        k: g.k,
      }))
      for (let j = 0, y = 0; y < h; j++, y += cell) {
        for (let i = 0, x = 0; x < w; i++, x += cell) {
          let v = 0
          for (const g of moved) {
            const d = Math.hypot(x / w - g.x, ((y / h - g.y) * h) / w) / g.r
            if (d < 1) v += g.k * (1 - d) * (1 - d)
          }
          if (v * 64 > BAYER[j % 8][i % 8] + 0.5) ctx.fillRect(x, y, dot, dot)
        }
      }
      if (colors && colors.length > 1) {
        // Recolour the lit dots with a left-to-right sweep
        const sweep = ctx.createLinearGradient(0, 0, w, 0)
        colors.forEach((c, n) => sweep.addColorStop(n / (colors.length - 1), c))
        ctx.globalCompositeOperation = "source-in"
        ctx.fillStyle = sweep
        ctx.fillRect(0, 0, w, h)
        ctx.globalCompositeOperation = "source-over"
      }
    }

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let raf = 0
    let last = 0
    let visible = false
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick)
      if (t - last < 1000 / FPS) return
      last = t
      draw(t)
    }
    const start = () => {
      if (!still && visible && !raf) raf = requestAnimationFrame(tick)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    size()
    place()
    draw(0)
    const ro = new ResizeObserver(() => {
      place()
      if (size()) draw(last)
    })
    ro.observe(span && card ? card : canvas)
    if (span) ro.observe(span)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) start()
      else stop()
    })
    io.observe(canvas)
    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
    }
  }, [color, colors, glows, cell, row])

  return <canvas ref={ref} aria-hidden className={className} />
}
