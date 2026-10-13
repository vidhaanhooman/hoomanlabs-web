"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRightIcon } from "@phosphor-icons/react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { nav } from "@/content/draft"
import { menuHref, menuMedia, platformFeatured, platformMenu } from "@/content/platform"
import { cn } from "@/lib/utils"

const ITEM =
  "inline-flex h-9 items-center rounded-full px-3 text-small text-ink-secondary transition-colors duration-150 hover:text-foreground"

/**
 * Desktop nav. "Platform" opens the menu from the content sheet: the
 * overview link on top, then three groups (Build, Reach, Trust), each with
 * one line and its pages as chips, and the featured page (Human + AI) with
 * the image slot on the right.
 */
export function MainNav() {

  return (
    <NavigationMenu aria-label="Main" className="hidden flex-1 justify-start lg:flex">
      <NavigationMenuList className="justify-start gap-1">
        <NavigationMenuItem>
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
                  <NavigationMenuLink
                    render={<Link href={menuHref(platformFeatured)} />}
                    className="group/feat flex-col items-stretch gap-2 rounded-md p-0 hover:bg-transparent focus:bg-transparent"
                  >
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
        <video
          src={menuMedia.src}
          poster={menuMedia.poster}
          aria-label={menuMedia.alt}
          autoPlay
          muted
          loop
          playsInline
          className="size-full object-cover motion-reduce:hidden"
        />
      </div>
    )
  return (
    <div className={frame}>
      <Image src={menuMedia.src} alt={menuMedia.alt} fill sizes="22rem" className="object-cover" />
    </div>
  )
}
