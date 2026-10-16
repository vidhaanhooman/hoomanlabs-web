import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { PostPage } from "@/components/blog/post-page"
import { postBySlug, posts } from "@/content/blog"

/**
 * /blog/[slug]: one page per post, all prerendered. The params read sits
 * inside Suspense, as on the other [slug] routes, so navigations stay instant.
 */

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = postBySlug(slug)
  if (!p) return {}
  return {
    title: p.title,
    description: p.excerpt,
    openGraph: { type: "article", title: p.title, description: p.excerpt, publishedTime: p.date, authors: [p.author.name] },
  }
}

export default function BlogPost({ params }: Props) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <PostContent params={params} />
    </Suspense>
  )
}

async function PostContent({ params }: Props) {
  const { slug } = await params
  const p = postBySlug(slug)
  if (!p) notFound()
  return <PostPage post={p} />
}
