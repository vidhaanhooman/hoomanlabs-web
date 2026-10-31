"use client"

import { Children, useEffect, useLayoutEffect, useRef, useState } from "react"
import Link from "next/link"
import { DownloadSimpleIcon } from "@phosphor-icons/react"

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
          <button type="button" onClick={() => window.print()} className={buttonVariants()}>
            <DownloadSimpleIcon className="size-4" />
            Download PDF
          </button>
        </div>
      </div>
      <p className="deck-ui -mt-3 text-small text-ink-muted">{slides.length} slides · 16:9. In the print dialog, choose Save as PDF.</p>

      <div ref={ref} className="flex flex-col gap-6">
        {slides.map((s, i) => (
          <div key={i} className="deck-page relative overflow-hidden rounded-lg border border-line" style={{ height: H * scale }}>
            <div className="deck-scale absolute top-0 left-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${scale})` }}>
              {s}
              {/* The page number, counted here so added slides renumber the deck; drawn to read on any slide */}
              {i > 0 && (
                <span className="pointer-events-none absolute right-[128px] bottom-[56px] font-mono text-[18px] text-white tabular-nums opacity-70 mix-blend-difference">
                  {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
