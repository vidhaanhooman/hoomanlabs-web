"use client"

import { useRef } from "react"

import { cn } from "@/lib/utils"

/**
 * A one-time code as separate digit boxes: typing moves to the next box,
 * Backspace on an empty box moves back, and pasting a code fills them all.
 */
export function OtpInput({ value, onChange, length = 6, label }: { value: string; onChange: (v: string) => void; length?: number; label: string }) {
  const refs = useRef<(HTMLInputElement | null)[]>([])
  const digits = Array.from({ length }, (_, i) => value[i] ?? "")
  const focus = (i: number) => refs.current[Math.max(0, Math.min(length - 1, i))]?.focus()

  const set = (i: number, raw: string) => {
    const typed = raw.replace(/\D/g, "")
    if (!typed) return
    const next = (value.slice(0, i) + typed).slice(0, length)
    onChange(next)
    focus(next.length)
  }

  return (
    <div role="group" aria-label={label} className="flex gap-2">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el
          }}
          value={d}
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          aria-label={`${label}, digit ${i + 1}`}
          autoFocus={i === 0}
          maxLength={length}
          onChange={(e) => set(i, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Backspace") {
              e.preventDefault()
              const at = d ? i : i - 1
              if (at < 0) return
              onChange(value.slice(0, at))
              focus(at)
            } else if (e.key === "ArrowLeft") focus(i - 1)
            else if (e.key === "ArrowRight") focus(i + 1)
          }}
          onFocus={(e) => e.target.select()}
          className={cn(
            "h-12 w-full min-w-0 rounded-lg border bg-background text-center font-mono text-h4 text-foreground outline-none transition-[border-color] duration-150 focus-visible:border-foreground",
            d ? "border-foreground/60" : "border-line-strong"
          )}
        />
      ))}
    </div>
  )
}
