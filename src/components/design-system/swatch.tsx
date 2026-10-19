"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

/**
 * One colour token on /components: a chip filled with the variable, its name,
 * and the value it resolves to where it sits (so the same swatch inside a
 * `.dark` or `.ui-dark` box shows that theme's value). Read live, so it can't
 * drift from globals.css.
 */
export function Swatch({ token, note, className }: { token: string; note?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState("")

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // color-mix in oklch makes the browser report the value in oklch, the way
    // globals.css writes it, rather than the lab() it computes internally.
    const read = () => {
      el.style.color = `color-mix(in oklch, var(${token}) 100%, transparent 0%)`
      const v = getComputedStyle(el).color
      setValue(v.replace(/(\d+\.\d{3})\d+/g, "$1").replace(/ 0\.000 none/, " 0 0").replace(/ none/g, " 0"))
    }
    read()
    // Re-read when the page theme flips.
    const mo = new MutationObserver(read)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => mo.disconnect()
  }, [token])

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span ref={ref} className="size-9 shrink-0 rounded-md border border-black/10 dark:border-white/10" style={{ background: `var(${token})` }} />
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="truncate font-mono text-[12px]">{token}</span>
        <span className="truncate font-mono text-[11px] opacity-60">{value || "—"}</span>
        {note && <span className="truncate text-[11px] opacity-60">{note}</span>}
      </span>
    </div>
  )
}

/** A literal colour (accents used inside product screens), with its name. */
export function Literal({ value, name }: { value: string; name: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="size-9 shrink-0 rounded-md border border-black/10 dark:border-white/10" style={{ background: value }} />
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="truncate text-[12px]">{name}</span>
        <span className="truncate font-mono text-[11px] opacity-60">{value}</span>
      </span>
    </div>
  )
}
