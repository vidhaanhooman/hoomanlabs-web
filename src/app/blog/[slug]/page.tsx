import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { PostPage } from "@/components/blog/post-page"
import { getPost, getPosts } from "@/lib/blog"

/**
 * /blog/[slug]: one page per post from Sanity, all prerendered; a post
 * published after the build renders on its first visit and is then cached.
 * The params read sits inside Suspense, as on the other [slug] routes, so
 * navigations stay instant.
 */

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = await getPost(slug)
  if (!p) return {}
  const title = p.seo.title || p.title
  const description = p.seo.description || p.excerpt
  return {
    title,
    description,
    keywords: p.seo.keywords,
    openGraph: {
      type: "article",
      title,
      description,
      publishedTime: p.date,
      authors: [p.author.name],
      images: p.cover ? [{ url: p.cover.src, width: p.cover.width, height: p.cover.height, alt: p.cover.alt }] : undefined,
    },
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
  const [p, posts] = await Promise.all([getPost(slug), getPosts()])
  if (!p) notFound()
  return <PostPage post={p} posts={posts} />
}
