/**
 * The blog's copy and post shape. Posts are written in Sanity and loaded by
 * lib/blog.ts, in three topics: articles (blogPost), customer stories
 * (blogPost with company fields, or customerStory) and use cases (useCase).
 * Every post's body is Portable Text, rendered by
 * components/blog/post-body.tsx, where h1/h2 headings become the table of
 * contents; stories and use cases get their sections as headings.
 */

/** A Portable Text block, as Sanity stores it (headings, paragraphs, lists, images, audio). */
export type PortableBlock = {
  _type: string
  _key?: string
  style?: string
  listItem?: string
  children?: { _type?: string; text?: string; marks?: string[] }[]
  [key: string]: unknown
}

/** The blog's topics, in the order the filter chips show them. */
export const TOPICS = ["Blogs", "Use cases", "Customer stories"] as const
export type Topic = (typeof TOPICS)[number]

export type Post = {
  /** Sanity document id. */
  id: string
  slug: string
  title: string
  excerpt: string
  category: Topic
  /** ISO date-time it was published. */
  date: string
  minutes: number
  author: { name: string; role?: string }
  cover: { src: string; width: number; height: number; alt: string } | null
  seo: { title?: string; description?: string; keywords?: string[] }
  /** Only loaded for a single post's page. */
  body?: PortableBlock[]
  /** Customer stories: the brand colour from Sanity (hex, no #) and the industry. */
  color?: string
  industry?: string
  /** Stories and use cases: the panel beside the text (company facts, results, a call to action). */
  aside?: PostAside
}

export type PostAside = {
  company?: string
  about?: string
  facts: { label: string; value: string }[]
  results: { value: string; label: string }[]
  website?: string
  cta?: { text?: string; label: string; href: string }
}

export const blogPage = {
  seo: {
    title: "Blog",
    description: "Notes from the HoomanLabs team on AI voice agents, real calls, testing and building for India.",
  },
  title: "Notes from the team.",
  line: "What we're learning building AI employees that talk to customers on real phone lines.",
}

export const postHref = (slug: string) => `/blog/${slug}`
export const formatDate = (iso: string) => new Date(iso.length === 10 ? `${iso}T00:00:00Z` : iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })
/** Turns a heading into an anchor id for the table of contents. */
export const anchor = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
/** A Portable Text block's plain text (for headings and the table of contents). */
export const blockText = (b: PortableBlock) => (b.children ?? []).map((c) => c.text ?? "").join("")
type Tag = "h2" | "h3" | "h4"
const isHeading = (b: PortableBlock) => b._type === "block" && !b.listItem && /^h[1-4]$/.test(b.style ?? "")

/**
 * How a post's headings render. Writers use levels differently (some posts
 * only use h3 or h4), so levels are relative: the highest level used at
 * least twice is the post's sections (rendered as h2, and its table of
 * contents); lower levels step down from there. h1 counts as h2 (the page
 * title is the only h1), and a lone heading above the sections also shows
 * as h2.
 */
export function headingTags(body?: PortableBlock[] | null): Record<string, Tag> {
  const blocks = (body ?? []).filter(isHeading)
  const groups = [["h1", "h2"], ["h3"], ["h4"]].filter((g) => blocks.some((b) => g.includes(b.style!)))
  const size = (g: string[]) => blocks.filter((b) => g.includes(b.style!)).length
  const top = Math.max(0, groups.findIndex((g) => size(g) >= 2))
  const map: Record<string, Tag> = {}
  groups.forEach((g, i) => g.forEach((s) => (map[s] = i <= top ? "h2" : i - top === 1 ? "h3" : "h4")))
  return map
}

/** The table of contents: the post's section headings (those rendered as h2). */
export const tocHeadings = (body?: PortableBlock[] | null) => {
  const tags = headingTags(body)
  return (body ?? []).filter((b) => isHeading(b) && tags[b.style!] === "h2").map(blockText).filter(Boolean)
}
