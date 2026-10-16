"use client"

import { useEffect, useState } from "react"
import { CheckIcon, LinkSimpleIcon } from "@phosphor-icons/react"

import { anchor } from "@/content/blog"
import { cn } from "@/lib/utils"

/**
 * The post's table of contents (its h2s), sticky beside the text on large
 * screens, with the heading you're reading highlighted, and a copy-link
 * button for sharing.
 */
export function Toc({ headings }: { headings: string[] }) {
  const [active, setActive] = useState(headings[0] ? anchor(headings[0]) : "")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const els = headings.map((h) => document.getElementById(anchor(h))).filter((e): e is HTMLElement => !!e)
    const onScroll = () => {
      // The last heading above the upper third of the screen is the current one.
      let current = els[0]?.id ?? ""
      for (const el of els) if (el.getBoundingClientRect().top < window.innerHeight * 0.33) current = el.id
      setActive(current)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [headings])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href.split("#")[0])
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {}
  }

  return (
    <nav aria-label="On this page" className="flex flex-col gap-6 text-small">
      {headings.length > 0 && (
        <div className="flex flex-col gap-3">
          <span className="font-mono text-label text-ink-muted">On this page</span>
          <ul className="flex flex-col gap-2 border-l border-line">
            {headings.map((h) => {
              const id = anchor(h)
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? "location" : undefined}
                    className={cn("-ml-px block border-l py-0.5 pl-3 transition-colors", active === id ? "border-foreground text-foreground" : "border-transparent text-ink-muted hover:text-foreground")}
                  >
                    {h}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      )}
      <button type="button" onClick={copy} className="flex w-fit items-center gap-2 rounded-full border border-line px-3 py-1.5 text-ink-secondary transition-colors hover:border-line-strong hover:text-foreground">
        {copied ? <CheckIcon className="size-3.5" /> : <LinkSimpleIcon className="size-3.5" />}
        {copied ? "Link copied" : "Copy link"}
      </button>
    </nav>
  )
}
