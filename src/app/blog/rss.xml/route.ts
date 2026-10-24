import { blogPage, postHref } from "@/content/blog"
import { getPosts } from "@/lib/blog"
import { SITE_URL } from "@/lib/site"

/** The blog's RSS feed, from Sanity (cached with the blog, refreshed on publish). */

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

export async function GET() {
  const posts = await getPosts()
  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE_URL}${postHref(p.slug)}</link>
      <guid>${SITE_URL}${postHref(p.slug)}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <category>${esc(p.category)}</category>
      <description>${esc(p.excerpt)}</description>
    </item>`
    )
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>HoomanLabs Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>${esc(blogPage.seo.description)}</description>
${items}
  </channel>
</rss>
`
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } })
}
