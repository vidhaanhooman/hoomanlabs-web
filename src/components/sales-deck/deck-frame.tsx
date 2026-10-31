"use client"

import { Children, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import Link from "next/link"
import { CaretLeftIcon, CaretRightIcon, DownloadSimpleIcon, PlayIcon, XIcon } from "@phosphor-icons/react"

import { DECK_VARS } from "@/components/sales-deck/kit"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const W = 1920
const H = 1080

/**
 * Shows the deck's 1920 × 1080 slides scaled to the window, one under the
 * other, with a toolbar: the two stories, the client version (hides every
 * "Data needed" label) and Download PDF, which opens the print dialog; there,
 * Save as PDF gives one slide per page at full size.
 *
 * Each slide makes an entrance when it comes into view: its headline, tags
 * and tiles (marked deck-anim) blur up in order. Without script, in reduced
 * motion and on paper, everything simply shows.
 *
 * Present (from the toolbar, or from any slide) shows one slide at a time,
 * full screen: arrow keys, space or a click move on, Esc leaves. Each slide
 * comes in with a short fade and then plays its entrance.
 */
export function DeckFrame({ story, children }: { story: "a" | "b"; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.5)
  const [client, setClient] = useState(false)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => setScale(el.clientWidth / W)
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Mark each slide as it comes into view, so its parts make their entrance
  const [motion, setMotion] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    setMotion(true)
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && e.target.setAttribute("data-in", "")), { threshold: 0.45 })
    el.querySelectorAll(".deck-page").forEach((p) => io.observe(p))
    return () => io.disconnect()
  }, [])

  const slides = Children.toArray(children)
  const [present, setPresent] = useState<number | null>(null)
  const stopPresenting = useCallback(() => setPresent(null), [])

  return (
    <div
      data-client={client || undefined}
      data-motion={motion || undefined}
      className="deck mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-(--gutter) py-10"
      style={DECK_VARS}
    >
      {/* Print: one 1920 × 1080 page per slide, nothing else */}
      <style>{`
        .deck[data-client] .deck-need { display: none !important; }
        .deck[data-motion] .deck-page:not([data-in]) .deck-anim { opacity: 0; }
        .deck[data-motion] .deck-page[data-in] .deck-anim { animation: deck-in 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both; animation-delay: calc(var(--i, 0) * 90ms + 120ms); }
        @keyframes deck-in { from { opacity: 0; filter: blur(10px); translate: 0 18px; } }
        .deck-present-slide { animation: deck-slide 0.55s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
        .deck-present .deck-anim { opacity: 1; animation: deck-in 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both; animation-delay: calc(var(--i, 0) * 110ms + 280ms); }
        @keyframes deck-slide { from { opacity: 0; scale: 0.985; filter: blur(4px); } }
        @media (prefers-reduced-motion: reduce) { .deck-present-slide, .deck-present .deck-anim { animation: none; } }
        @media print {
          @page { size: ${W}px ${H}px; margin: 0; }
          html, body { background: #FDFDFD !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          body > :not(main) { display: none !important; }
          .deck { max-width: none !important; padding: 0 !important; gap: 0 !important; }
          .deck-ui { display: none !important; }
          .deck-page { width: ${W}px !important; height: ${H}px !important; border: 0 !important; border-radius: 0 !important; break-after: page; break-inside: avoid; }
          .deck-scale { transform: none !important; }
          .deck-anim { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      <div className="deck-ui flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-h3 font-normal">Sales deck</h1>
          <nav className="flex gap-1 rounded-full bg-placeholder p-1 text-small">
            {(
              [
                ["b", "/sales-deck", "Story B · Challenger teaching"],
                ["a", "/sales-deck/a", "Story A · Strategic narrative"],
              ] as const
            ).map(([id, href, label]) => (
              <Link
                key={id}
                href={href}
                aria-current={story === id ? "page" : undefined}
                className={cn("rounded-full px-3 py-1.5 transition-colors", story === id ? "bg-background text-foreground shadow-xs" : "text-ink-secondary hover:text-foreground")}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex cursor-pointer items-center gap-2 text-small text-ink-secondary">
            <input type="checkbox" checked={client} onChange={(e) => setClient(e.target.checked)} className="size-4 accent-foreground" />
            Client version (hide “Data needed”)
          </label>
          <button type="button" onClick={() => setPresent(0)} className={buttonVariants({ variant: "outline" })}>
            <PlayIcon className="size-4" weight="fill" />
            Present
          </button>
          <button type="button" onClick={() => window.print()} className={buttonVariants()}>
            <DownloadSimpleIcon className="size-4" />
            Download PDF
          </button>
        </div>
      </div>
      <p className="deck-ui -mt-3 text-small text-ink-muted">{slides.length} slides · 16:9. In the print dialog, choose Save as PDF.</p>

      <div ref={ref} className="flex flex-col gap-6">
        {slides.map((s, i) => (
          <div key={i} className="deck-page group/page relative overflow-hidden rounded-lg border border-line" style={{ height: H * scale }}>
            <div className="deck-scale absolute top-0 left-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${scale})` }}>
              {s}
              {/* The page number, counted here so added slides renumber the deck; drawn to read on any slide */}
              {i > 0 && (
                <span className="pointer-events-none absolute right-[64px] bottom-[48px] font-mono text-[15px] text-white tabular-nums opacity-70 mix-blend-difference">
                  {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setPresent(i)}
              className="deck-ui absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1.5 text-small text-white opacity-0 backdrop-blur-sm transition-opacity group-hover/page:opacity-100 focus-visible:opacity-100"
            >
              <PlayIcon className="size-3.5" weight="fill" />
              Present from here
            </button>
          </div>
        ))}
      </div>

      {present !== null && <Present slides={slides} start={present} onClose={stopPresenting} />}
    </div>
  )
}

/** Full-screen presenting: one slide at a time, fitted to the screen. */
function Present({ slides, start, onClose }: { slides: React.ReactNode[]; start: number; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [at, setAt] = useState(start)
  const [fit, setFit] = useState(1)
  const [idle, setIdle] = useState(false)
  const last = slides.length - 1
  const go = useCallback((d: number) => setAt((a) => Math.min(last, Math.max(0, a + d))), [last])

  // Full screen while presenting; leaving full screen ends it
  useEffect(() => {
    const el = ref.current
    el?.requestFullscreen?.().catch(() => {})
    const onChange = () => !document.fullscreenElement && onClose()
    document.addEventListener("fullscreenchange", onChange)
    return () => {
      document.removeEventListener("fullscreenchange", onChange)
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
    }
  }, [onClose])

  // Fit the slide to the screen
  useLayoutEffect(() => {
    const size = () => setFit(Math.min(window.innerWidth / W, window.innerHeight / H))
    size()
    window.addEventListener("resize", size)
    return () => window.removeEventListener("resize", size)
  }, [])

  // Keys: next, previous, first, last, leave
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", "PageDown", " ", "Enter"].includes(e.key)) go(1)
      else if (["ArrowLeft", "ArrowUp", "PageUp", "Backspace"].includes(e.key)) go(-1)
      else if (e.key === "Home") setAt(0)
      else if (e.key === "End") setAt(last)
      else if (e.key === "Escape") onClose()
      else return
      e.preventDefault()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go, last, onClose])

  // Hide the pointer and controls when the mouse rests
  useEffect(() => {
    let t = window.setTimeout(() => setIdle(true), 2000)
    const wake = () => {
      setIdle(false)
      window.clearTimeout(t)
      t = window.setTimeout(() => setIdle(true), 2000)
    }
    window.addEventListener("mousemove", wake)
    return () => {
      window.removeEventListener("mousemove", wake)
      window.clearTimeout(t)
    }
  }, [])

  return (
    <div ref={ref} className={cn("deck-present fixed inset-0 z-[100] grid place-items-center bg-black", idle && "cursor-none")}>
      {/* Click the left third to go back, anywhere else to go on */}
      <div
        className="relative overflow-hidden"
        style={{ width: W * fit, height: H * fit }}
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          go(e.clientX - r.left < r.width / 3 ? -1 : 1)
        }}
      >
        <div key={at} className="deck-present-slide absolute top-0 left-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${fit})` }}>
          {slides[at]}
          {at > 0 && (
            <span className="pointer-events-none absolute right-[64px] bottom-[48px] font-mono text-[15px] text-white tabular-nums opacity-70 mix-blend-difference">
              {String(at + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          )}
        </div>
      </div>

      {/* Progress along the foot */}
      <span className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
        <span className="block h-full bg-white/60 transition-[width] duration-500" style={{ width: `${((at + 1) / slides.length) * 100}%` }} />
      </span>

      <div
        className={cn(
          "absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-white/10 p-1 text-small text-white backdrop-blur-md transition-opacity duration-300",
          idle ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => go(-1)}
          disabled={at === 0}
          className="grid size-8 place-items-center rounded-full hover:bg-white/15 disabled:opacity-30"
        >
          <CaretLeftIcon className="size-4" />
        </button>
        <span className="px-2 font-mono tabular-nums">
          {at + 1} / {slides.length}
        </span>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => go(1)}
          disabled={at === last}
          className="grid size-8 place-items-center rounded-full hover:bg-white/15 disabled:opacity-30"
        >
          <CaretRightIcon className="size-4" />
        </button>
        <button type="button" aria-label="Stop presenting" onClick={onClose} className="ml-1 grid size-8 place-items-center rounded-full hover:bg-white/15">
          <XIcon className="size-4" />
        </button>
      </div>
    </div>
  )
}
