"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRightIcon, BagIcon, BankIcon, BookOpenTextIcon, ClockCounterClockwiseIcon, CodeIcon, GraduationCapIcon, NewspaperIcon, PlugsConnectedIcon, SparkleIcon, StethoscopeIcon, TruckIcon } from "@phosphor-icons/react"
import type { Icon } from "@phosphor-icons/react"

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { nav } from "@/content/draft"
import { industries, industryHref, type Industry } from "@/content/industries"
import { menuHref, menuMedia, platformFeatured, platformMenu } from "@/content/platform"
import { cn } from "@/lib/utils"

const INDUSTRY_ICON: Record<Industry["icon"], Icon> = { graduation: GraduationCapIcon, bank: BankIcon, truck: TruckIcon, bag: BagIcon, stethoscope: StethoscopeIcon, sparkle: SparkleIcon }

const RESOURCE_ICON: Record<(typeof nav.resources)[number]["icon"], Icon> = { docs: BookOpenTextIcon, api: CodeIcon, mcp: PlugsConnectedIcon, blog: NewspaperIcon, changelog: ClockCounterClockwiseIcon }

// A compact menu row (Solutions, Resources): a small icon tile and the name.
const MENU_ROW = "flex-row items-center gap-2.5 rounded-md px-2 py-1.5 text-small text-foreground hover:bg-secondary focus:bg-secondary"
const MENU_ICON = "grid size-7 shrink-0 place-items-center rounded-md border border-line text-foreground"

const ITEM = "inline-flex h-9 items-center rounded-full px-3 text-small text-ink-secondary transition-colors duration-150 hover:text-foreground"

/**
 * Desktop nav. "Platform" opens the menu from the content sheet: the
 * overview link on top, then three groups (Build, Reach, Trust), each with
 * one line and its pages as chips, and the featured page (Human + AI) with
 * the image slot on the right. "Solutions" opens the six industries (there
 * is no overview page) and "Resources" opens docs, the API reference, the
 * MCP server, the blog and the changelog, both as compact lists: a small
 * icon and the name.
 *
 * The menu never stays stuck open: however it was opened (hover, click or
 * keyboard), it closes once the mouse has been outside both the trigger and
 * the panel for a moment (time to cross the gap) and as soon as the page
 * scrolls. Escape and clicking outside close it as before.
 */
const LEAVE_MS = 180
const SLACK = 16

export function MainNav() {
  const [value, setValue] = useState<string | null>(null)
  const root = useRef<HTMLElement>(null)

  // While open: close once a mouse has been outside the trigger and the
  // panel for LEAVE_MS, and as soon as the page scrolls.
  useEffect(() => {
    if (!value) return
    let timer: ReturnType<typeof setTimeout> | null = null
    // Inside = over the trigger or the panel, with a little slack around each.
    const over = (el: Element | null | undefined, x: number, y: number) => {
      const r = el?.getBoundingClientRect()
      return !!r && x >= r.left - SLACK && x <= r.right + SLACK && y >= r.top - SLACK && y <= r.bottom + SLACK
    }
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      const open = root.current?.querySelector('[data-slot="navigation-menu-trigger"][data-popup-open]')
      const content = document.querySelector('[data-slot="navigation-menu-content"]')
      if (over(open, e.clientX, e.clientY) || over(content, e.clientX, e.clientY)) {
        if (timer) clearTimeout(timer)
        timer = null
      } else if (!timer) timer = setTimeout(() => setValue(null), LEAVE_MS)
    }
    const close = () => setValue(null)
    document.addEventListener("pointermove", move, { passive: true })
    window.addEventListener("scroll", close, { passive: true })
    return () => {
      if (timer) clearTimeout(timer)
      document.removeEventListener("pointermove", move)
      window.removeEventListener("scroll", close)
    }
  }, [value])

  return (
    <NavigationMenu ref={root} aria-label="Main" value={value} onValueChange={(v) => setValue((v as string | null) ?? null)} className="hidden flex-1 justify-start lg:flex">
      <NavigationMenuList className="justify-start gap-1">
        <NavigationMenuItem value="platform">
          <NavigationMenuTrigger className="h-9 rounded-full bg-transparent px-3 text-small font-normal text-ink-secondary hover:bg-transparent hover:text-foreground focus:bg-transparent data-open:bg-transparent data-open:text-foreground data-popup-open:bg-transparent data-popup-open:text-foreground">
            Platform
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex w-[min(68rem,calc(100vw-3rem))] flex-col p-6">
              <NavigationMenuLink
                render={<Link href="/platform" />}
                className="group/ov w-fit flex-row items-center gap-2 p-0 text-h4 font-normal text-foreground hover:bg-transparent focus:bg-transparent"
              >
                Platform overview
                <ArrowRightIcon className="size-4 transition-transform group-hover/ov:translate-x-0.5" aria-hidden />
              </NavigationMenuLink>

              <div className="mt-5 grid grid-cols-[1fr_1fr_1fr_17rem] border-t border-line-strong pt-6">
                {platformMenu.map(({ group, line, pages }) => (
                  <div key={group} className="flex flex-col gap-1 pr-6">
                    <p className="text-body text-foreground">{group}</p>
                    <p className="text-small text-ink-muted">{line}</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {pages.map((p) => (
                        <li key={p.id}>
                          <NavigationMenuLink
                            render={<Link href={menuHref(p)} title={p.blurb} />}
                            className="h-8 flex-row items-center rounded-full border border-line px-3 py-0 text-small text-foreground transition-colors hover:border-line-strong hover:bg-secondary focus:bg-secondary"
                          >
                            {p.name}
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Featured: Human + AI, with the image slot */}
                <div className="border-l border-line pl-6">
                  <NavigationMenuLink render={<Link href={menuHref(platformFeatured)} />} className="group/feat flex-col items-stretch gap-2 rounded-md p-0 hover:bg-transparent focus:bg-transparent">
                    <MenuMediaSlot />
                    <span className="flex items-center justify-between gap-2 text-body text-foreground">
                      {platformFeatured.name}
                      <ArrowRightIcon className="size-4 transition-transform group-hover/feat:translate-x-0.5" aria-hidden />
                    </span>
                    <span className="text-small leading-snug text-ink-muted">{platformFeatured.blurb}</span>
                  </NavigationMenuLink>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem value="solutions">
          <NavigationMenuTrigger className="h-9 rounded-full bg-transparent px-3 text-small font-normal text-ink-secondary hover:bg-transparent hover:text-foreground focus:bg-transparent data-open:bg-transparent data-open:text-foreground data-popup-open:bg-transparent data-popup-open:text-foreground">
            Solutions
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex w-[min(30rem,calc(100vw-3rem))] flex-col p-2">
              <ul className="grid grid-cols-2 gap-x-2 gap-y-0.5">
                {industries.map((x) => (
                  <li key={x.slug}>
                    <NavigationMenuLink render={<Link href={industryHref(x.slug)} />} className={MENU_ROW}>
                      <span className={MENU_ICON}>
                        {(() => {
                          const I = INDUSTRY_ICON[x.icon]
                          return <I aria-hidden className="size-4" />
                        })()}
                      </span>
                      {x.name}
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {nav.links
          .filter((link) => link.href !== "/solutions")
          .map((link) => (
            <NavigationMenuItem key={link.label}>
              <Link href={link.href} className={ITEM}>
                {link.label}
              </Link>
            </NavigationMenuItem>
          ))}

        <NavigationMenuItem value="resources">
          <NavigationMenuTrigger className="h-9 rounded-full bg-transparent px-3 text-small font-normal text-ink-secondary hover:bg-transparent hover:text-foreground focus:bg-transparent data-open:bg-transparent data-open:text-foreground data-popup-open:bg-transparent data-popup-open:text-foreground">
            Resources
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex w-56 flex-col gap-0.5 p-2">
              {nav.resources.map((r) => {
                const I = RESOURCE_ICON[r.icon]
                return (
                  <li key={r.label}>
                    <NavigationMenuLink render={<Link href={r.href} />} className={MENU_ROW}>
                      <span className={MENU_ICON}>
                        <I aria-hidden className="size-4" />
                      </span>
                      {r.label}
                    </NavigationMenuLink>
                  </li>
                )
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

/** Image or video slot in the menu; a placeholder until `menuMedia` is set. */
function MenuMediaSlot() {
  const frame = "relative aspect-video overflow-hidden rounded-md border border-line bg-surface"
  if (!menuMedia)
    return (
      <div className={cn(frame, "grid place-items-center text-label text-ink-muted")} role="img" aria-label="Placeholder: image or video">
        Image or video, 16:9
      </div>
    )
  if (menuMedia.type === "video")
    return (
      <div className={frame}>
        <video src={menuMedia.src} poster={menuMedia.poster} aria-label={menuMedia.alt} autoPlay muted loop playsInline className="size-full object-cover motion-reduce:hidden" />
      </div>
    )
  return (
    <div className={frame}>
      <Image src={menuMedia.src} alt={menuMedia.alt} fill sizes="22rem" className="object-cover" />
    </div>
  )
}
