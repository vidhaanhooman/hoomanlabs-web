import Image from "next/image"
import { BuildingsIcon, CodeIcon, CubeIcon, TranslateIcon, UsersThreeIcon } from "@phosphor-icons/react/dist/ssr"
import type { Icon } from "@phosphor-icons/react"

import type { Category, Post } from "@/content/blog"
import { FROSTED } from "@/lib/hero-styles"
import { cn } from "@/lib/utils"

/**
 * A post's cover: one of the site's earthy landscape photos per category
 * (public/art/blog), with the category as a small frosted chip. The title
 * isn't repeated on the cover: cards, the featured post and the post page
 * all set it beside or above the cover.
 */

const LOOK: Record<Category, { icon: Icon; image: string }> = {
  Product: { icon: CubeIcon, image: "/art/blog/product.webp" },
  Engineering: { icon: CodeIcon, image: "/art/blog/engineering.webp" },
  "Voice AI": { icon: TranslateIcon, image: "/art/blog/voice-ai.webp" },
  Customers: { icon: UsersThreeIcon, image: "/art/blog/customers.webp" },
  Company: { icon: BuildingsIcon, image: "/art/blog/company.webp" },
}

export function Cover({ post, size = "card", className }: { post: Post; size?: "card" | "feature" | "hero"; className?: string }) {
  const look = LOOK[post.category]
  return (
    <div
      aria-hidden
      className={cn(
        "relative isolate overflow-hidden rounded-md border border-line bg-surface",
        size === "card" && "aspect-[16/10]",
        size === "feature" && "aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-80",
        size === "hero" && "aspect-[21/9]",
        className
      )}
    >
      <Image
        src={look.image}
        alt=""
        fill
        sizes={size === "card" ? "(min-width: 1024px) 33vw, 100vw" : "(min-width: 1024px) 66vw, 100vw"}
        priority={size === "hero"}
        className="object-cover dark:brightness-[0.85]"
      />
      <span className={cn(FROSTED, "absolute flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px]", size === "card" ? "top-3 left-3" : "top-5 left-5")}>
        <look.icon className="size-3.5" />
        {post.category}
      </span>
    </div>
  )
}
