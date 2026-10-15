"use client"

import { useCallback, useEffect, useRef, useState } from "react"

/**
 * One sample player for the Voice page. Plays the sample call (SAMPLE: the
 * one real recording we have) and can mix generated background sound under
 * it: a soft office murmur ("office") or louder street noise ("street"),
 * made in the browser with Web Audio, so the Ambience and Clear line
 * switches are audible without extra files.
 */

export const SAMPLE_SRC = "/audio/calls/feedback-en.mp3"

/** Fired when any sample starts, so every other player on the page pauses. */
const ONE_AT_A_TIME = "hooman-sample-play"

type Bed = "none" | "office" | "street"
const GAIN: Record<Bed, number> = { none: 0, office: 0.035, street: 0.16 }

function noiseBuffer(ctx: AudioContext) {
  // Brown-ish noise: smoother than white, closer to a room or a road.
  const len = ctx.sampleRate * 2
  const buf = ctx.createBuffer(1, len, ctx.sampleRate)
  const d = buf.getChannelData(0)
  let last = 0
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1
    last = (last + 0.02 * w) / 1.02
    d[i] = last * 3.5
  }
  return buf
}

export function useSample() {
  const audio = useRef<HTMLAudioElement | null>(null)
  const ctx = useRef<AudioContext | null>(null)
  const gain = useRef<GainNode | null>(null)
  const filter = useRef<BiquadFilterNode | null>(null)
  const bed = useRef<Bed>("none")
  const [playing, setPlaying] = useState<string | null>(null)
  const [time, setTime] = useState(0)

  useEffect(() => {
    const a = new Audio(SAMPLE_SRC)
    a.preload = "none"
    const tick = () => setTime(a.currentTime)
    const end = () => setPlaying(null)
    a.addEventListener("timeupdate", tick)
    a.addEventListener("ended", end)
    audio.current = a
    const others = (e: Event) => {
      if ((e as CustomEvent).detail !== a) {
        a.pause()
        setPlaying(null)
      }
    }
    window.addEventListener(ONE_AT_A_TIME, others)
    return () => {
      window.removeEventListener(ONE_AT_A_TIME, others)
      a.pause()
      a.removeEventListener("timeupdate", tick)
      a.removeEventListener("ended", end)
      ctx.current?.close()
    }
  }, [])

  // Build the noise bed on first use (it needs a user gesture to start).
  const ensureBed = useCallback(() => {
    if (ctx.current) return
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const c = new Ctx()
    const src = c.createBufferSource()
    src.buffer = noiseBuffer(c)
    src.loop = true
    const f = c.createBiquadFilter()
    const g = c.createGain()
    g.gain.value = 0
    src.connect(f).connect(g).connect(c.destination)
    src.start()
    ctx.current = c
    gain.current = g
    filter.current = f
  }, [])

  const applyBed = useCallback((b: Bed, on: boolean) => {
    const c = ctx.current
    if (!c || !gain.current || !filter.current) return
    filter.current.type = b === "street" ? "bandpass" : "lowpass"
    filter.current.frequency.value = b === "street" ? 700 : 500
    gain.current.gain.setTargetAtTime(on ? GAIN[b] : 0, c.currentTime, 0.15)
  }, [])

  /** Set the background bed; heard only while something is playing. */
  const setBed = useCallback(
    (b: Bed) => {
      bed.current = b
      applyBed(b, playing !== null)
    },
    [applyBed, playing]
  )

  /** Play or pause the sample for `id` (a voice, a demo); one at a time. */
  const toggle = useCallback(
    (id: string, withBed?: Bed) => {
      const a = audio.current
      if (!a) return
      ensureBed()
      ctx.current?.resume()
      if (withBed) bed.current = withBed
      if (playing === id) {
        a.pause()
        setPlaying(null)
        applyBed(bed.current, false)
        return
      }
      // A different sample starts from the top; the same one resumes.
      if (a.ended || (playing !== null && playing !== id)) a.currentTime = 0
      window.dispatchEvent(new CustomEvent(ONE_AT_A_TIME, { detail: a }))
      a.play().catch(() => setPlaying(null))
      setPlaying(id)
      applyBed(bed.current, true)
    },
    [applyBed, ensureBed, playing]
  )

  useEffect(() => {
    if (playing === null) applyBed(bed.current, false)
  }, [playing, applyBed])

  /** Jump to `t` seconds in the sample. */
  const seek = useCallback((t: number) => {
    const a = audio.current
    if (!a) return
    a.currentTime = t
    setTime(t)
  }, [])

  return { playing, time, toggle, setBed, seek }
}
