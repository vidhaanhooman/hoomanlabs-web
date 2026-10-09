"use client"

import Link from "next/link"
import { useState } from "react"
import { motion } from "motion/react"
import {
  ArrowRightIcon,
  ChatsCircleIcon,
  FlaskIcon,
  FlowArrowIcon,
  PlugsConnectedIcon,
  RobotIcon,
  ShieldCheckIcon,
  type Icon,
} from "@phosphor-icons/react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { nav } from "@/content/draft"
import { componentHref, components, type ComponentId } from "@/content/platform"
import { cn } from "@/lib/utils"

const ITEM =
  "inline-flex h-9 items-center rounded-full px-3 text-small text-ink-secondary transition-colors duration-150 hover:text-foreground"

const ICONS: Record<ComponentId, Icon> = {
  agents: RobotIcon,
  workflow: FlowArrowIcon,
  simulations: FlaskIcon,
  qa: ShieldCheckIcon,
  channels: ChatsCircleIcon,
  tools: PlugsConnectedIcon,
}

const GROUPS = ["Build & test", "Connect"] as const

/**
 * Desktop nav. "Platform" opens the platform's components in two groups
 * (Build & test, Connect), each with icon, name and one line, plus a link to
 * the overview. A highlight slides between items.
 */
export function MainNav() {
  const [hovered, setHovered] = useState<ComponentId | null>(null)

  return (
    <NavigationMenu aria-label="Main" className="hidden flex-1 justify-start lg:flex">
      <NavigationMenuList className="justify-start gap-1">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-9 rounded-full bg-transparent px-3 text-small font-normal text-ink-secondary hover:bg-transparent hover:text-foreground focus:bg-transparent data-open:bg-transparent data-open:text-foreground data-popup-open:bg-transparent data-popup-open:text-foreground">
            Platform
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[44rem] grid-cols-2 gap-2 p-2" onMouseLeave={() => setHovered(null)}>
              {GROUPS.map((group) => (
                <div key={group} className="flex flex-col">
                  <p className="px-3 pt-2 pb-1 text-label text-ink-muted">{group}</p>
                  <ul className="flex flex-col gap-0.5">
                    {components
                      .filter((c) => c.group === group)
                      .map((c) => {
                        const ItemIcon = ICONS[c.id]
                        return (
                          <li key={c.id} className="relative">
                            {hovered === c.id && (
                              <motion.span
                                layoutId="product-menu-highlight"
                                aria-hidden
                                className="absolute inset-0 rounded-md bg-secondary"
                                transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                              />
                            )}
                            <NavigationMenuLink
                              render={<Link href={componentHref(c.id)} />}
                              onMouseEnter={() => setHovered(c.id)}
                              onFocus={() => setHovered(c.id)}
                              className="relative z-10 h-full items-start gap-3 rounded-md px-3 py-2.5 hover:bg-transparent focus:bg-transparent data-active:bg-transparent"
                            >
                              <span
                                className={cn(
                                  "grid size-8 shrink-0 place-items-center rounded-md border border-line bg-background transition-colors duration-150",
                                  hovered === c.id ? "text-foreground" : "text-ink-secondary"
                                )}
                              >
                                <ItemIcon className="size-4" aria-hidden />
                              </span>
                              <span className="flex flex-col gap-0.5">
                                <span className="text-small font-medium text-foreground">{c.name}</span>
                                <span className="text-small leading-snug text-ink-muted">{c.summary}</span>
                              </span>
                            </NavigationMenuLink>
                          </li>
                        )
                      })}
                  </ul>
                  {group === "Connect" && (
                    <NavigationMenuLink
                      render={<Link href="/platform" />}
                      className="mt-auto flex-row items-center gap-1.5 rounded-md px-3 py-2.5 text-small text-ink-secondary hover:bg-transparent hover:text-foreground focus:bg-transparent"
                    >
                      Platform overview
                      <ArrowRightIcon className="size-3.5" aria-hidden />
                    </NavigationMenuLink>
                  )}
                </div>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {nav.links.map((link) => (
          <NavigationMenuItem key={link.label}>
            <Link href={link.href} className={ITEM}>
              {link.label}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
