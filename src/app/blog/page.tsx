import type { Metadata } from "next"

import { BlogPage } from "@/components/blog-page"
import { blogPage } from "@/content/blog"

export const metadata: Metadata = {
  title: blogPage.seo.title,
  description: blogPage.seo.description,
  alternates: { types: { "application/rss+xml": "/blog/rss.xml" } },
}

export default function Blog() {
  return <BlogPage />
}
