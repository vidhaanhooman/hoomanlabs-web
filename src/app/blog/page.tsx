import type { Metadata } from "next"

import { BlogPage } from "@/components/blog-page"
import { blogPage } from "@/content/blog"
import { getPosts } from "@/lib/blog"

export const metadata: Metadata = {
  title: blogPage.seo.title,
  description: blogPage.seo.description,
  alternates: { types: { "application/rss+xml": "/blog/rss.xml" } },
}

/** /blog: posts from Sanity (cached; refreshed on publish), so the page prerenders. */
export default async function Blog() {
  const posts = await getPosts()
  return <BlogPage posts={posts} />
}
