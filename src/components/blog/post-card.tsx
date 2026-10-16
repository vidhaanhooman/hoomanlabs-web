import Link from "next/link"

import { Cover } from "@/components/blog/cover"
import { formatDate, postHref, type Post } from "@/content/blog"

/** A post in a grid: cover, category · date · reading time, title and excerpt. */
export function PostMeta({ post }: { post: Post }) {
  return (
    <span className="flex flex-wrap items-center gap-x-2 text-label text-ink-muted">
      <span className="text-ink-secondary">{post.category}</span>
      <span aria-hidden>·</span>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden>·</span>
      <span>{post.minutes} min read</span>
    </span>
  )
}

export function PostCard({ post }: { post: Post }) {
  return (
    <li>
      <Link href={postHref(post.slug)} className="group flex flex-col gap-4">
        <Cover post={post} className="transition-transform duration-300 ease-(--ease-out) group-hover:-translate-y-0.5" />
        <span className="flex flex-col gap-2">
          <PostMeta post={post} />
          <span className="text-h4 font-normal group-hover:underline group-hover:underline-offset-4">{post.title}</span>
          <span className="line-clamp-2 text-small text-ink-secondary">{post.excerpt}</span>
        </span>
      </Link>
    </li>
  )
}
