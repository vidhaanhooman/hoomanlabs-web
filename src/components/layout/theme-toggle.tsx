"use client"

import { useSyncExternalStore } from "react"
import { MoonIcon, SunIcon } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { THEME_KEY } from "@/lib/theme"

/** The light/dark switch in the header (see lib/theme for how it's applied). */

function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange)
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
  return () => mo.disconnect()
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("dark"),
    () => false
  )

  const toggle = () => {
    const next = !dark
    // Switch instantly: pause colour transitions for one frame so nothing
    // animates from the old theme's colours.
    const root = document.documentElement
    root.classList.add("theme-switching")
    root.classList.toggle("dark", next)
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("theme-switching")))
    try {
      localStorage.setItem(THEME_KEY, next ? "dark" : "light")
    } catch {}
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} aria-pressed={dark}>
      {dark ? <SunIcon className="size-[18px]" /> : <MoonIcon className="size-[18px]" />}
    </Button>
  )
}
