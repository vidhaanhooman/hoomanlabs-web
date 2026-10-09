"use client"

import { useEffect, useRef } from "react"
import { useInView } from "motion/react"

/**
 * Radial "voice bloom": a ring of fine lines drawn on canvas.
 * - idle: breathes slowly
 * - playing: lines stretch with the voice level (`level()` returns 0..1)
 * - ringing: three soft pulses, like an incoming call
 * Lines inside the played arc are brighter, so the ring doubles as progress.
 * Pauses off-screen; one static frame under reduced motion.
 */
export function VoiceBloom({
  level,
  progress,
  mode,
  reduce,
  onAmp,
  className,
}: {
  level: () => number
  progress: number
  mode: "idle" | "playing" | "ringing"
  reduce: boolean
  /** Called every frame with the smoothed voice level (0..1); ringing pulse included. */
  onAmp?: (amp: number) => void
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const inView = useInView(canvasRef, { amount: 0.1 })
  // Keep fast-changing inputs in refs so the draw loop never restarts.
  const live = useRef({ level, progress, mode, onAmp })
  useEffect(() => {
    live.current = { level, progress, mode, onAmp }
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      const { width } = canvas.getBoundingClientRect()
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(width * dpr)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const N = 220
    let amp = 0
    let raf = 0
    let ringStart = 0

    const draw = (t: number) => {
      const { level, progress, mode, onAmp } = live.current
      const size = canvas.width
      const c = size / 2
      const r0 = size * 0.24
      const maxLen = size * 0.25

      const target = mode === "playing" ? level() : 0
      amp += (target - amp) * 0.18
      if (mode === "ringing" && !ringStart) ringStart = t
      if (mode !== "ringing") ringStart = 0
      const ringPulse =
        mode === "ringing" && t - ringStart < 2700 ? Math.max(0, Math.sin(((t - ringStart) / 1000) * Math.PI * 2.2)) : 0
      onAmp?.(Math.max(amp, ringPulse))

      ctx.clearRect(0, 0, size, size)
      ctx.lineCap = "round"
      ctx.lineWidth = 2.2 * dpr

      for (let i = 0; i < N; i++) {
        const a = (i / N) * Math.PI * 2 - Math.PI / 2
        const n =
          0.5 +
          0.5 * Math.sin(i * 0.37 + t * 0.0021) * Math.cos(i * 0.11 - t * 0.0013) +
          0.15 * Math.sin(i * 1.7 + t * 0.006)
        const shape = Math.max(0.2, Math.min(1, n))
        const breath = 0.16 + 0.06 * Math.sin(t * 0.0015 + i * 0.02) * shape

        let len: number
        if (mode === "ringing") {
          const e = (t - ringStart) / 1000
          const pulse = e < 2.7 ? Math.max(0, Math.sin(e * Math.PI * 2.2)) : 0.15
          len = maxLen * (0.12 + pulse * 0.55 * shape)
        } else {
          len = maxLen * (breath + shape * amp * 1.1)
        }

        const played = mode === "playing" || progress > 0 ? i / N < progress : false
        const alpha = mode === "ringing" ? 0.9 : played ? 0.95 : 0.42
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`
        const cos = Math.cos(a)
        const sin = Math.sin(a)
        ctx.beginPath()
        ctx.moveTo(c + cos * r0, c + sin * r0)
        ctx.lineTo(c + cos * (r0 + len), c + sin * (r0 + len))
        ctx.stroke()
      }
    }

    if (reduce || !inView) {
      draw(0)
    } else {
      const loop = (t: number) => {
        draw(t)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [reduce, inView])

  return <canvas ref={canvasRef} aria-hidden className={className} />
}
