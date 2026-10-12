"use client"

import { useEffect } from "react"

import { CAL } from "@/content/draft"

/**
 * Cal.com booking pop-up for every "Book a demo" button. Loads Cal's embed
 * script once (their element-click snippet), then opens the booking modal
 * for any click on an element marked `data-demo`. The links keep the Cal
 * page as their href, so they still work if the script is slow or blocked.
 */

type CalFn = ((...args: unknown[]) => void) & {
  loaded?: boolean
  ns: Record<string, (...args: unknown[]) => void>
  q?: unknown[]
  config?: Record<string, unknown>
}

declare global {
  interface Window {
    Cal?: CalFn
  }
}

/** Cal's embed loader, as given in their snippet. */
function loadCal() {
  ;(function (C: Window & typeof globalThis, A: string, L: string) {
    const p = (a: { q: unknown[] }, ar: unknown) => {
      a.q.push(ar)
    }
    const d = C.document
    C.Cal =
      C.Cal ||
      (function (...ar: unknown[]) {
        const cal = C.Cal as CalFn & { q: unknown[] }
        if (!cal.loaded) {
          cal.ns = {}
          cal.q = cal.q || []
          d.head.appendChild(d.createElement("script")).src = A
          cal.loaded = true
        }
        if (ar[0] === L) {
          const api = function (...args: unknown[]) {
            p(api as unknown as { q: unknown[] }, args)
          } as unknown as ((...a: unknown[]) => void) & { q: unknown[] }
          const namespace = ar[1]
          api.q = api.q || []
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api
            p(cal.ns[namespace] as unknown as { q: unknown[] }, ar)
            p(cal, ["initNamespace", namespace])
          } else p(cal, ar)
          return
        }
        p(cal, ar)
      } as CalFn)
  })(window, "https://app.cal.com/embed/embed.js", "init")
}

export function CalBooking() {
  useEffect(() => {
    loadCal()
    const Cal = window.Cal!
    Cal("init", CAL.namespace, { origin: "https://app.cal.com" })
    Cal.config = Cal.config || {}
    Cal.config.forwardQueryParams = true
    Cal.ns[CAL.namespace]("ui", { hideEventTypeDetails: false, layout: "month_view" })

    // Capture phase, so the modal opens before the link would navigate.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const el = (e.target as Element | null)?.closest?.("[data-demo]")
      if (!el) return
      const open = window.Cal?.ns?.[CAL.namespace]
      if (!open) return
      e.preventDefault()
      open("modal", { calLink: CAL.link, config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" } })
    }
    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [])
  return null
}
