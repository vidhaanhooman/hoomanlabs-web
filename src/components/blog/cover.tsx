import Image from "next/image"
import { BriefcaseIcon, NewspaperIcon, UsersThreeIcon } from "@phosphor-icons/react/dist/ssr"
import type { Icon } from "@phosphor-icons/react"

import type { Post, Topic } from "@/content/blog"
import { FROSTED } from "@/lib/hero-styles"
import { cn } from "@/lib/utils"

/**
 * A post's cover: its featured image from Sanity when it has one, otherwise
 * one of the site's earthy landscape photos (public/art/blog) with the
 * category as a small frosted chip. The title isn't repeated on the cover:
 * cards, the featured post and the post page all set it beside or above.
 */

const LOOK: Record<Topic, { icon: Icon; image: string }> = {
  Blogs: { icon: NewspaperIcon, image: "/art/blog/product.webp" },
  "Use cases": { icon: BriefcaseIcon, image: "/art/blog/voice-ai.webp" },
  "Customer stories": { icon: UsersThreeIcon, image: "/art/blog/customers.webp" },
}

export function Cover({ post, size = "card", className }: { post: Post; size?: "card" | "feature" | "hero"; className?: string }) {
  const look = LOOK[post.category]
  const sizes = size === "card" ? "(min-width: 1024px) 33vw, 100vw" : "(min-width: 1024px) 66vw, 100vw"
  return (
    <div
      aria-hidden={!post.cover}
      className={cn(
        "relative isolate overflow-hidden rounded-md border border-line bg-surface",
        size === "card" && "aspect-[16/10]",
        size === "feature" && "aspect-[16/10]",
        // Sanity covers are 16:10 graphics (often with text), so they keep their shape; the art crops wide.
        size === "hero" && (post.cover ? "aspect-[16/10]" : "aspect-[21/9]"),
        className
      )}
    >
      {post.cover ? (
        <Image src={post.cover.src} alt={size === "hero" ? post.cover.alt : ""} fill sizes={sizes} priority={size === "hero"} className="object-cover" />
      ) : (
        <>
          <Image src={look.image} alt="" fill sizes={sizes} priority={size === "hero"} className="object-cover dark:brightness-[0.85]" />
          <span className={cn(FROSTED, "absolute flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px]", size === "card" ? "top-3 left-3" : "top-5 left-5")}>
            <look.icon className="size-3.5" />
            {post.category}
          </span>
        </>
      )}
    </div>
  )
}
