"use client"

import { useState } from "react"

import { PostCard } from "@/components/blog/post-card"
import { categories, type Post } from "@/content/blog"
import { cn } from "@/lib/utils"

/** All posts with category chips (the directory's chip style). */
export function PostGrid({ posts }: { posts: Post[] }) {
  const [cat, setCat] = useState<(typeof categories)[number]>("All")
  const shown = cat === "All" ? posts : posts.filter((p) => p.category === cat)
  const present = categories.filter((c) => c === "All" || posts.some((p) => p.category === c))

  return (
    <>
      <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
        {present.map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={cat === k}
            onClick={() => setCat(k)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-small transition-colors",
              cat === k ? "border-foreground bg-foreground text-background" : "border-line text-ink-secondary hover:border-line-strong hover:text-foreground"
            )}
          >
            {k}
          </button>
        ))}
      </div>
      <ul className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </ul>
      {shown.length === 0 && <p className="mt-8 text-small text-ink-muted">No posts in this topic yet.</p>}
    </>
  )
}
