import { blogPage, postHref, posts } from "@/content/blog"
import { SITE_URL } from "@/lib/site"

/** The blog's RSS feed. Static data only, so it prerenders at build time. */

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

export function GET() {
  const items = [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE_URL}${postHref(p.slug)}</link>
      <guid>${SITE_URL}${postHref(p.slug)}</guid>
      <pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate>
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
