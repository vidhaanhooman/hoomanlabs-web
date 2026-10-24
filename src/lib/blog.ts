import { cacheLife, cacheTag } from "next/cache"

import type { PortableBlock, Post, PostAside, Topic } from "@/content/blog"
import { imageFrom, sanityQuery, type SanityImage } from "@/lib/sanity"

/**
 * The blog's data, from Sanity. Cached (tag "blog"): a publish in Sanity
 * calls app/api/revalidate, which refreshes the tag; otherwise entries
 * refresh hourly. A failed request throws, so a deploy or refresh never
 * caches an empty blog.
 *
 * Three document types feed the blog's three topics:
 * - blogPost: articles (a Portable Text body), or customer stories when it
 *   has the company fields (problem, solution, impact) instead of a body;
 * - customerStory: customer stories;
 * - useCase: use cases.
 * Stories and use cases are turned into a Portable Text body (their
 * sections as headings) plus a side panel, so every post shares one page.
 * Only published posts appear: a slug, a past publish date and some content.
 */

type Section = { heading?: string; body?: PortableBlock[] }

type Raw = {
  _id: string
  _type: "blogPost" | "customerStory" | "useCase"
  slug: string
  title: string
  excerpt?: string
  publishedAt: string
  story: boolean
  author?: { name?: string; bio?: string }
  image?: SanityImage
  seo?: { metaTitle?: string; metaDescription?: string; keywords?: string[] }
  words?: (number | null)[]
  // Articles
  content?: PortableBlock[]
  // Customer stories saved as blogPost
  aboutCompany?: string
  campanySize?: string
  founded?: string
  headquarters?: string
  industry?: string
  companyWebsite?: string
  companyProblemTitle?: string
  companyProblem?: PortableBlock[]
  companySolutionTitle?: string
  companySolution?: PortableBlock[]
  companyImpactTitle?: string
  companyImpact?: PortableBlock[]
  impactQuote?: string
  impactQuoteAuthor?: string
  conclusion?: string
  // customerStory
  about?: Section
  company?: { foundedIn?: string; headquarters?: string; industry?: string; size?: string; name?: string; website?: string }
  problem?: Section
  solution?: Section
  impact?: Section
  results?: string
  // useCase
  summary?: { lead?: string; points?: string }
  howItWorks?: Section
  implementation?: Section
  faqs?: Section
  sidebarCta?: { text?: string; buttonLabel?: string; buttonHref?: string }
}

const words = (field: string) => `length(string::split(pt::text(${field}), " "))`
const LIVE = `_type in ["blogPost", "customerStory", "useCase"] && defined(slug.current) && defined(publishedAt) && publishedAt <= now()
  && (_type != "blogPost" || count(content) > 0 || count(companyProblem) > 0)`
const FIELDS = `
  _id,
  _type,
  "slug": slug.current,
  title,
  "excerpt": coalesce(excerpt, summary.lead),
  publishedAt,
  "story": _type == "customerStory" || (_type == "blogPost" && coalesce(count(content), 0) == 0),
  "author": author->{name, bio},
  "image": coalesce(featuredImage, thumbnail, heroImage),
  seo,
  "words": [${["content", "companyProblem", "companySolution", "companyImpact", "about.body", "problem.body", "solution.body", "impact.body", "howItWorks.body", "implementation.body"].map(words).join(", ")}]
`

// Sanity holds a few drafts-in-progress published as tests (e.g. the use case "test-ignore"); they stay off the site.
const isTest = (slug: string) => /(^|-)(test|ignore)(-|$)/i.test(slug)

const topicOf = (r: Raw): Topic => (r._type === "useCase" ? "Use cases" : r.story ? "Customer stories" : "Blogs")

// Portable Text built from a story's or use case's fields.
const heading = (text: string): PortableBlock => ({ _type: "block", style: "h2", children: [{ _type: "span", text, marks: [] }] })
const paragraphs = (text?: string): PortableBlock[] =>
  (text ?? "")
    .split(/\n{2,}/)
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => ({ _type: "block", style: "normal", children: [{ _type: "span", text: t, marks: [] }] }))
const section = (title: string | undefined, fallback: string, blocks?: PortableBlock[]) => (blocks?.length ? [heading(title?.trim() || fallback), ...blocks] : [])
const lines = (text?: string) =>
  (text ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
const fact = (label: string, value?: string) => (value?.trim() ? [{ label, value: value.trim() }] : [])
// Every block needs a unique key for rendering; keep Sanity's, number the rest.
const keyed = (blocks: PortableBlock[]) => blocks.map((b, i) => ({ ...b, _key: b._key ? `${b._key}-${i}` : `b${i}` }))

/** A post's body and side panel, by type. */
function shape(r: Raw): { body?: PortableBlock[]; aside?: PostAside } {
  if (r._type === "useCase") {
    const points = lines(r.summary?.points)
    return {
      body: keyed([
        ...(r.summary?.lead || points.length ? [{ _type: "summary", lead: r.summary?.lead, points }] : []),
        ...section(r.problem?.heading, "The problem", r.problem?.body),
        ...section(r.howItWorks?.heading, "How it works", r.howItWorks?.body),
        ...section(r.implementation?.heading, "Implementation", r.implementation?.body),
        ...section(r.faqs?.heading, "Questions", r.faqs?.body),
      ]),
      aside: r.sidebarCta?.buttonLabel && r.sidebarCta.buttonHref ? { facts: [], results: [], cta: { text: r.sidebarCta.text, label: r.sidebarCta.buttonLabel, href: r.sidebarCta.buttonHref } } : undefined,
    }
  }
  if (r._type === "customerStory") {
    return {
      body: keyed([
        ...section(r.about?.heading, "About the company", r.about?.body),
        ...section(r.problem?.heading, "The problem", r.problem?.body),
        ...section(r.solution?.heading, "The solution", r.solution?.body),
        ...section(r.impact?.heading, "The impact", r.impact?.body),
      ]),
      aside: {
        company: r.company?.name,
        website: r.company?.website,
        facts: [...fact("Industry", r.company?.industry), ...fact("Company size", r.company?.size), ...fact("Founded", r.company?.foundedIn), ...fact("Headquarters", r.company?.headquarters)],
        // "70% | of support queries automated", one per line.
        results: lines(r.results).map((l) => {
          const [value, ...label] = l.split("|")
          return { value: value.trim(), label: label.join("|").trim() }
        }),
      },
    }
  }
  if (r.story) {
    return {
      body: keyed([
        ...section(r.companyProblemTitle, "The problem", r.companyProblem),
        ...section(r.companySolutionTitle, "The solution", r.companySolution),
        ...section(r.companyImpactTitle, "The impact", r.companyImpact),
        ...(r.impactQuote ? [{ _type: "pullQuote", text: r.impactQuote, author: r.impactQuoteAuthor }] : []),
        ...section("Conclusion", "Conclusion", paragraphs(r.conclusion)),
      ]),
      aside: {
        about: r.aboutCompany,
        website: r.companyWebsite,
        facts: [...fact("Industry", r.industry), ...fact("Company size", r.campanySize), ...fact("Founded", r.founded), ...fact("Headquarters", r.headquarters)],
        results: [],
      },
    }
  }
  return { body: r.content ?? undefined }
}

function toPost(r: Raw, full = false): Post {
  const cover = imageFrom(r.image)
  const total = (r.words ?? []).reduce<number>((n, w) => n + (w ?? 0), 0)
  return {
    id: r._id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt ?? "",
    category: topicOf(r),
    date: r.publishedAt,
    // About 220 words a minute, at least a minute.
    minutes: Math.max(1, Math.round(total / 220)),
    author: { name: r.author?.name ?? "HoomanLabs team" },
    cover: cover && { src: cover.src, width: cover.width, height: cover.height, alt: cover.alt || r.title },
    seo: { title: r.seo?.metaTitle, description: r.seo?.metaDescription, keywords: r.seo?.keywords },
    ...(full ? shape(r) : {}),
  }
}

/**
 * Every live post, newest first (without bodies). A story kept in both
 * blogPost and customerStory shows once, as the blogPost.
 */
export async function getPosts(): Promise<Post[]> {
  "use cache"
  cacheTag("blog")
  cacheLife("hours")
  const rows = await sanityQuery<Raw[]>(`*[${LIVE}] | order(publishedAt desc){${FIELDS}}`)
  const rank = { blogPost: 0, useCase: 1, customerStory: 2 }
  const seen = new Set<string>()
  const kept = new Set<string>()
  for (const r of [...rows].sort((a, b) => rank[a._type] - rank[b._type])) {
    const title = r.title?.trim().toLowerCase()
    if (isTest(r.slug) || !title || seen.has(title)) continue
    seen.add(title)
    kept.add(r._id)
  }
  return rows.filter((r) => kept.has(r._id)).map((r) => toPost(r))
}

/** One live post with its body (and side panel), or null. */
export async function getPost(slug: string): Promise<Post | null> {
  "use cache"
  cacheTag("blog", `blog:${slug}`)
  cacheLife("hours")
  const listed = (await getPosts()).find((p) => p.slug === slug)
  if (!listed) return null
  const row = await sanityQuery<Raw | null>(`*[_id == $id][0]{..., ${FIELDS}}`, { id: listed.id })
  return row ? toPost(row, true) : null
}
