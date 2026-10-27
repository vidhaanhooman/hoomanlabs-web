import { Suspense } from "react"
import Link from "next/link"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { DitherField, type Glow } from "@/components/sections/dither-field"
import { IndustryRail, type RailItem } from "@/components/sections/industry-rail"
import { CustomerLogo, customerIn } from "@/components/sections/logos"
import { postHref, type Post } from "@/content/blog"
import { industries, industryHref } from "@/content/industries"
import { getPosts } from "@/lib/blog"
import { cn } from "@/lib/utils"

/**
 * Homepage customer stories and industries.
 *
 * CustomerStories: the three newest published stories from Sanity in one row;
 * each story card is the page's own surface with one moving dither gradient
 * running across all three tops, the customer's logo and the result. Publishing a story in Sanity is all it takes; the block hides until
 * there is one.
 *
 * IndustryJobs: the six industries as expanding strips (IndustryRail), with
 * the same moving dither gradient running across the row.
 */

/** Customers with a story who aren't in the logo grid (matched by name). */
const WORDMARKS = ["Holiday Tribe"]

const squash = (t: string) => t.toLowerCase().replace(/[^a-z0-9]/g, "")
const companyOf = (p: Post) => customerIn(p.title) ?? WORDMARKS.find((n) => squash(p.title).includes(squash(n)))

/**
 * What each story leads with, until stories carry these fields in Sanity:
 * the result as a headline and the industry and use case as a tag. Anything
 * missing falls back to the story (title, industry).
 */
const STORY: Record<string, { result: string; tags: string }> = {
  GIVA: {
    result: "70% of support queries automated",
    tags: "D2C jewellery · Support",
  },
  SaffronStays: {
    result: "Missed calls down from 50% to 2%",
    tags: "Villa stays · Sales and inbound",
  },
  "Holiday Tribe": {
    result: "Web leads called in seconds, not 90 minutes",
    tags: "Travel · Lead qualification",
  },
}

/** Logo heights on the cards, tuned so each reads at the same weight as the wordmarks. */
// GIVA's caps fill its box, so it sits smaller; SaffronStays carries an icon and a tagline, so its box runs taller.
/** The same, at the story cards' larger size. */
const LOGO_LG: Record<string, string> = {
  GIVA: "h-[20px]",
  SaffronStays: "h-[33px]",
}

const LOGO_H: Record<string, string> = {
  GIVA: "h-[17px]",
  SaffronStays: "h-[30px]",
}

/** Each customer's hue (oklch), for their stretch of the shared gradient. */
const HUE: Record<string, number> = { GIVA: 15, SaffronStays: 65, "Holiday Tribe": 235 }
const tint = (hue: number) => `oklch(0.72 0.13 ${hue})`

/** The shared field's glows, in row units: one rising from the top of each card. */
const ROW_GLOWS: Glow[] = [
  { x: 1 / 6, y: -0.05, r: 0.24, k: 0.85 },
  { x: 3 / 6, y: -0.05, r: 0.24, k: 0.85 },
  { x: 5 / 6, y: -0.05, r: 0.24, k: 0.85 },
]

/**
 * One moving dither gradient running across a whole row of cards, seen
 * through each card like a window (DitherField's row mode), so the dots carry
 * on across the gaps. Faded out before the words, and a mid-tone at partial
 * strength so it reads on the light and the dark surface. Used by the stories
 * and the industries alike.
 */
const ROW_FIELD = "absolute top-0 left-0 -z-10 opacity-75 [mask-image:linear-gradient(to_bottom,black,transparent_72%)] dark:opacity-60"

function Logo({ company, large = false }: { company?: string; large?: boolean }) {
  if (company && !WORDMARKS.includes(company))
    return (
      <CustomerLogo
        name={company}
        className={cn("w-auto", "[filter:brightness(0)] dark:[filter:brightness(0)_invert(1)]", large ? (LOGO_LG[company] ?? "h-8") : (LOGO_H[company] ?? "h-6"))}
      />
    )
  return <span className={cn("leading-none font-medium tracking-tight", large ? "text-[23px]" : "text-[19px]")}>{company ?? "Customer"}</span>
}

export function CustomerStories() {
  return (
    <Suspense fallback={null}>
      <Stories />
    </Suspense>
  )
}

/** A customer story card: the page's surface with its stretch of the shared gradient across the top, the customer's logo and the result. */
function StoryCard({ post, colors }: { post: Post; colors: string[] }) {
  const company = companyOf(post)
  const s = company ? STORY[company] : undefined
  return (
    <Link
      href={postHref(post.slug)}
      aria-label={`${company ?? "Customer"} story: ${post.title}`}
      className="group/story relative isolate flex aspect-[4/3] w-full flex-col justify-end overflow-hidden rounded-lg border border-line bg-surface p-6 outline-none transition-colors hover:border-line-strong focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <DitherField color={colors[0]} colors={colors} glows={ROW_GLOWS} row className={ROW_FIELD} />
      <span className="flex flex-col gap-3">
        <span className="mb-0.5 flex h-8 items-center">
          <Logo company={company} large />
        </span>
        <span className="line-clamp-2 text-h4 leading-snug font-normal text-balance">{s?.result ?? post.title}</span>
      </span>
    </Link>
  )
}

async function Stories() {
  const posts = (await getPosts().catch(() => [])).filter((p) => p.category === "Customer stories").slice(0, 3)
  if (!posts.length) return null
  const colors = posts.map((p) => tint(HUE[companyOf(p) ?? ""] ?? 260))
  return (
    <Section id="v3-stories">
      <Container>
        <Heading
          title="Already on the job."
          line="Real deployments with the numbers to show for it, from support lines to sales teams."
          link={{ href: "/blog", label: "All customer stories" }}
        />
        <ul data-dither-row className="mt-(--heading-gap,2.5rem) grid gap-(--card-gap,0.75rem) md:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug} className="flex min-w-0">
              <StoryCard post={p} colors={colors} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

/** A section heading in the site's pattern: title and line on the left, a link on the right. */
function Heading({ title, line, link }: { title: string; line: string; link?: { href: string; label: string } }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
      <div className="flex max-w-[44rem] flex-col gap-3">
        <h2 className="text-h2 font-normal">{title}</h2>
        <p className="text-body text-ink-secondary">{line}</p>
      </div>
      {link && <TextLink href={link.href}>{link.label}</TextLink>}
    </div>
  )
}

/** Longer lines on the homepage where the Solutions one-liner is very short. */
const CARD_LINE: Record<string, string> = {
  healthcare: "Every patient call answered and every slot filled, even after hours.",
  "consumer-ai": "A voice for your app's users that helps them right in the moment, at any scale.",
}

const ORDER = ["education", "e-commerce", "logistics", "healthcare", "bfsi", "consumer-ai"]

/** The industries' shared gradient: the stories' three hues, swept across the row. */
const RAIL_COLORS = [HUE["Holiday Tribe"], HUE.GIVA, HUE.SaffronStays].map(tint)

export function IndustryJobs() {
  const items: RailItem[] = ORDER.map((slug) => industries.find((x) => x.slug === slug))
    .filter((x) => x !== undefined)
    .map((x) => ({
      slug: x.slug,
      name: x.name,
      line: CARD_LINE[x.slug] ?? x.card,
      tags: x.jobs.slice(0, 2).map((j) => j.name),
      href: industryHref(x.slug),
    }))
  return (
    <Section id="v3-industries" spacing="none">
      <IndustryRail
        title="Agents on the job, in every industry."
        line="The same platform, set up for the calls each industry runs on."
        items={items}
        field={{ colors: RAIL_COLORS, glows: ROW_GLOWS, className: ROW_FIELD }}
      />
    </Section>
  )
}
