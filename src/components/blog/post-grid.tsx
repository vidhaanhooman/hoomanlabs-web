"use client"

import { useRef, useState } from "react"
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react"

import { PostCard } from "@/components/blog/post-card"
import { TOPICS, type Post } from "@/content/blog"
import { cn } from "@/lib/utils"

const PER_PAGE = 9

/**
 * All posts with topic chips (the directory's chip style): All, Blogs, Use
 * cases, Customer stories. "All" leaves out the featured post, which sits
 * above; a topic shows every post in it. Nine posts a page (three rows),
 * with the pager centred under the grid; changing topic goes back to page 1.
 */
export function PostGrid({ posts, featured }: { posts: Post[]; featured?: string }) {
  const [cat, setCat] = useState("All")
  const [page, setPage] = useState(0)
  const top = useRef<HTMLDivElement>(null)
  const shown = cat === "All" ? posts.filter((p) => p.slug !== featured) : posts.filter((p) => p.category === cat)
  const pages = Math.max(1, Math.ceil(shown.length / PER_PAGE))
  const current = Math.min(page, pages - 1)

  const go = (n: number) => {
    setPage(n)
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <>
      <div ref={top} role="group" aria-label="Filter by topic" className="flex scroll-mt-24 flex-wrap gap-2">
        {["All", ...TOPICS].map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={cat === k}
            onClick={() => {
              setCat(k)
              setPage(0)
            }}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-small transition-colors",
              cat === k ? "border-foreground bg-foreground text-background" : "border-line text-ink-secondary hover:border-line-strong hover:text-foreground"
            )}
          >
            {k}
          </button>
        ))}
      </div>
      <ul className="mt-8 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {shown.slice(current * PER_PAGE, (current + 1) * PER_PAGE).map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </ul>
      {shown.length === 0 && <p className="mt-8 text-small text-ink-muted">Nothing in {cat.toLowerCase()} yet. Check back soon.</p>}
      {pages > 1 && (
        <nav aria-label="Pages" className="mt-12 flex items-center justify-center gap-2 border-t border-line pt-6 text-small text-ink-secondary">
          <button type="button" aria-label="Previous page" disabled={current === 0} onClick={() => go(current - 1)} className="grid size-9 place-items-center rounded-full transition-colors hover:bg-secondary hover:text-foreground disabled:pointer-events-none disabled:opacity-40">
            <CaretLeftIcon className="size-4" />
          </button>
          <span className="rounded-full bg-surface px-3.5 py-1.5 text-foreground tabular-nums">
            {current + 1} of {pages}
          </span>
          <button type="button" aria-label="Next page" disabled={current === pages - 1} onClick={() => go(current + 1)} className="grid size-9 place-items-center rounded-full transition-colors hover:bg-secondary hover:text-foreground disabled:pointer-events-none disabled:opacity-40">
            <CaretRightIcon className="size-4" />
          </button>
        </nav>
      )}
    </>
  )
}
