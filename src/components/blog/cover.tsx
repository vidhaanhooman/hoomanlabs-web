import { BuildingsIcon, CodeIcon, CubeIcon, TranslateIcon, UsersThreeIcon } from "@phosphor-icons/react/dist/ssr"
import type { Icon } from "@phosphor-icons/react"

import { Halftone } from "@/components/layout/halftone"
import type { Category, Post } from "@/content/blog"
import { cn } from "@/lib/utils"

/**
 * A post's cover until real artwork exists: the site's dotted tile (as on
 * the Channels device tiles), light or graphite by category, with the
 * category's mark and the title set small inside it, so every card reads
 * as one family without stock images.
 */

const LOOK: Record<Category, { icon: Icon; focus: string; tone: "light" | "graphite" }> = {
  Product: { icon: CubeIcon, focus: "18% 22%", tone: "light" },
  Engineering: { icon: CodeIcon, focus: "82% 20%", tone: "graphite" },
  "Voice AI": { icon: TranslateIcon, focus: "20% 80%", tone: "light" },
  Customers: { icon: UsersThreeIcon, focus: "80% 82%", tone: "graphite" },
  Company: { icon: BuildingsIcon, focus: "50% 18%", tone: "light" },
}

export function Cover({ post, size = "card", className }: { post: Post; size?: "card" | "feature" | "hero"; className?: string }) {
  const look = LOOK[post.category]
  return (
    <div
      aria-hidden
      className={cn(
        "relative isolate flex overflow-hidden rounded-md border border-line bg-surface",
        size === "card" && "aspect-[16/10] p-5",
        size === "feature" && "aspect-[16/10] p-8 lg:aspect-auto lg:h-full",
        size === "hero" && "aspect-[21/9] p-8 sm:p-12",
        look.tone === "graphite" && "dark graphite border-transparent",
        className
      )}
    >
      <Halftone focus={look.focus} />
      <div className="flex w-full flex-col justify-between text-foreground">
        <span className="grid size-10 place-items-center rounded-lg border border-line bg-background">
          <look.icon className="size-5 text-ink-secondary" />
        </span>
        <span className={cn("max-w-[22ch] font-normal text-balance", size === "card" ? "text-[17px] leading-snug" : "text-h3")}>{post.title}</span>
      </div>
    </div>
  )
}
