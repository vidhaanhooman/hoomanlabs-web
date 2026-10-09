"use client"

import Link from "next/link"
import { useState } from "react"
import { motion } from "motion/react"
import {
  ChatsCircleIcon,
  PhoneIcon,
  ShieldCheckIcon,
  WaveformIcon,
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
import { productList, type ProductSlug } from "@/content/products"
import { cn } from "@/lib/utils"

const ITEM =
  "inline-flex h-9 items-center rounded-full px-3 text-small text-ink-secondary transition-colors duration-150 hover:text-foreground"

const ICONS: Record<ProductSlug, Icon> = {
  "voice-ai": WaveformIcon,
  "chat-agents": ChatsCircleIcon,
  qa: ShieldCheckIcon,
  telephony: PhoneIcon,
}

/**
 * Desktop nav. "Product" opens a 2x2 grid of products (icon, name, one line)
 * with a highlight that slides between items.
 */
export function MainNav() {
  const [hovered, setHovered] = useState<ProductSlug | null>(null)

  return (
    <NavigationMenu aria-label="Main" className="hidden flex-1 justify-start lg:flex">
      <NavigationMenuList className="justify-start gap-1">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-9 rounded-full bg-transparent px-3 text-small font-normal text-ink-secondary hover:bg-transparent hover:text-foreground focus:bg-transparent data-open:bg-transparent data-open:text-foreground data-popup-open:bg-transparent data-popup-open:text-foreground">
            Product
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[28rem] p-2">
              <ul className="grid grid-cols-2 gap-0.5" onMouseLeave={() => setHovered(null)}>
                {productList.map((product) => {
                  const ProductIcon = ICONS[product.slug]
                  return (
                    <li key={product.slug} className="relative">
                      {hovered === product.slug && (
                        <motion.span
                          layoutId="product-menu-highlight"
                          aria-hidden
                          className="absolute inset-0 rounded-md bg-secondary"
                          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                        />
                      )}
                      <NavigationMenuLink
                        render={<Link href={`/${product.slug}`} />}
                        onMouseEnter={() => setHovered(product.slug)}
                        onFocus={() => setHovered(product.slug)}
                        className="relative z-10 h-full items-start gap-3 rounded-md px-3 py-3 hover:bg-transparent focus:bg-transparent data-active:bg-transparent"
                      >
                        <span
                          className={cn(
                            "grid size-8 shrink-0 place-items-center rounded-md border border-line bg-background transition-colors duration-150",
                            hovered === product.slug ? "text-foreground" : "text-ink-secondary"
                          )}
                        >
                          <ProductIcon className="size-4" aria-hidden />
                        </span>
                        <span className="flex flex-col gap-0.5">
                          <span className="text-small font-medium text-foreground">{product.name}</span>
                          <span className="text-small leading-snug text-ink-muted">{product.summary}</span>
                        </span>
                      </NavigationMenuLink>
                    </li>
                  )
                })}
              </ul>
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
