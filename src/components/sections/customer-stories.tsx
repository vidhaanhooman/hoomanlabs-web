import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { IndustryRail, type RailItem } from "@/components/sections/industry-rail"
import { CustomerLogo, customerIn } from "@/components/sections/logos"
import { postHref, type Post } from "@/content/blog"
import { industries, industryHref } from "@/content/industries"
import { getPosts } from "@/lib/blog"
import { cn } from "@/lib/utils"

/**
 * Homepage customer stories and industries, in the site's own language
 * (one kind of card for both: a darkened photo with white words).
 *
 * CustomerStories: the three newest published stories from Sanity in a
 * staggered grid, with one figure in each open cell; each story card:
 * the customer's photo dimmed evenly, with their logo large in white, the
 * and the result (after vapi.ai's case-study cards). Publishing a story in Sanity is all it takes; the block
 * hides until there is one.
 *
 * IndustryJobs: the six industries as expanding photo strips (IndustryRail).
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
  GIVA: "h-[24px]",
  SaffronStays: "h-[40px]",
}

const LOGO_H: Record<string, string> = {
  GIVA: "h-[17px]",
  SaffronStays: "h-[30px]",
}

/** Each story card's photo: the customer's world (public/art/stories). Stand-ins until the customers' own photos arrive. */
const PHOTO: Record<string, string> = {
  GIVA: "/art/stories/giva-band.webp",
  SaffronStays: "/art/stories/saffronstays-band.webp",
  "Holiday Tribe": "/art/stories/holiday-tribe-band.webp",
}

function Logo({ company, onPhoto = false, large = false }: { company?: string; onPhoto?: boolean; large?: boolean }) {
  if (company && !WORDMARKS.includes(company))
    return (
      <CustomerLogo
        name={company}
        className={cn(
          "w-auto",
          onPhoto ? "[filter:brightness(0)_invert(1)]" : "[filter:brightness(0)] dark:[filter:brightness(0)_invert(1)]",
          large ? (LOGO_LG[company] ?? "h-8") : (LOGO_H[company] ?? "h-6"),
        )}
      />
    )
  return <span className={cn("leading-none font-medium tracking-tight", large ? "text-[28px]" : "text-[19px]")}>{company ?? "Customer"}</span>
}

export function CustomerStories() {
  return (
    <Suspense fallback={null}>
      <Stories />
    </Suspense>
  )
}

/** A customer story card, after vapi.ai's case-study cards: the photo dimmed, a large white logo, and the result. */
function StoryCard({ post }: { post: Post }) {
  const company = companyOf(post)
  const s = company ? STORY[company] : undefined
  const photo = company ? PHOTO[company] : undefined
  return (
    <Link
      href={postHref(post.slug)}
      aria-label={`${company ?? "Customer"} story: ${post.title}`}
      className="group/story relative isolate flex aspect-[4/3] w-full flex-col justify-end overflow-hidden rounded-lg bg-[#121212] p-7 text-white outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {/* After the case-study cards on vapi.ai: the photo dimmed evenly and softened by a light blur, the words in white over it */}
      {photo && (
        <Image
          src={photo}
          alt=""
          fill
          sizes="(min-width: 768px) 30vw, 90vw"
          className="-z-20 object-cover transition-transform duration-[900ms] ease-(--ease-out) group-hover/story:scale-[1.04] motion-reduce:transition-none"
        />
      )}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-[oklch(0.12_0_0/0.58)] backdrop-blur-[3px] transition-colors duration-500 group-hover/story:bg-[oklch(0.12_0_0/0.5)]"
      />
      <span className="flex flex-col gap-3">
        <span className="mb-1 flex h-9 items-center">
          <Logo company={company} onPhoto large />
        </span>
        <span className="line-clamp-2 text-h3 leading-snug font-normal text-balance">{s?.result ?? post.title}</span>
      </span>
    </Link>
  )
}

/** The grid's open cells: one figure each, kept minimal (a number and what it measures). */
const FIGURES = [
  { who: "Holiday Tribe", value: "35%", label: "of the sales team's time saved" },
  { who: "GIVA", value: "90%", label: "customer satisfaction, kept while automating" },
  { who: "Across customers", value: "1.5M", label: "conversations handled every week" },
]

/** Where each story card and each figure sits in the staggered 3 × 2 grid (desktop). */
const STORY_SLOT = ["md:col-start-1 md:row-start-1", "md:col-start-3 md:row-start-1", "md:col-start-2 md:row-start-2"]
const FIGURE_SLOT = ["md:col-start-2 md:row-start-1", "md:col-start-1 md:row-start-2", "md:col-start-3 md:row-start-2"]

/** One figure in an outlined cell. */
function FigureCell({ figure, className }: { figure: (typeof FIGURES)[number]; className?: string }) {
  return (
    <li className={cn("hidden aspect-[4/3] flex-col justify-between rounded-lg border border-line p-7 md:flex", className)}>
      <span className="font-mono text-label text-ink-muted">{figure.who}</span>
      <span className="flex flex-col gap-1.5">
        <span className="text-display leading-none font-normal tabular-nums">{figure.value}</span>
        <span className="text-body text-ink-secondary">{figure.label}</span>
      </span>
    </li>
  )
}

async function Stories() {
  const posts = (await getPosts().catch(() => [])).filter((p) => p.category === "Customer stories").slice(0, 3)
  if (!posts.length) return null
  return (
    <Section id="v3-stories">
      <Container>
        <Heading
          title="Already on the job."
          line="Real deployments with the numbers to show for it, from support lines to sales teams."
          link={{ href: "/blog", label: "All customer stories" }}
        />
        {/* A staggered 3 × 2 grid: the three stories, with one figure in each open cell */}
        <ul className="mt-(--heading-gap,2.5rem) grid gap-(--card-gap,0.75rem) md:grid-cols-3">
          {posts.map((p, i) => (
            <li key={p.slug} className={cn("flex min-w-0", STORY_SLOT[i])}>
              <StoryCard post={p} />
            </li>
          ))}
          {FIGURES.map((f, i) => (
            <FigureCell key={f.label} figure={f} className={FIGURE_SLOT[i]} />
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

/** Each industry's photo for its rail card (public/art/industries). */
const RAIL_ART: Record<string, string> = {
  education: "/art/industries/education-rail.webp",
  "e-commerce": "/art/industries/e-commerce-rail.webp",
  logistics: "/art/industries/logistics-rail.webp",
  healthcare: "/art/industries/healthcare-rail.webp",
  bfsi: "/art/industries/bfsi-rail.webp",
  "consumer-ai": "/art/industries/consumer-ai-rail.webp",
}

export function IndustryJobs() {
  const items: RailItem[] = ORDER.map((slug) => industries.find((x) => x.slug === slug))
    .filter((x) => x !== undefined)
    .map((x) => ({
      slug: x.slug,
      name: x.name,
      line: CARD_LINE[x.slug] ?? x.card,
      tags: x.jobs.slice(0, 2).map((j) => j.name),
      href: industryHref(x.slug),
      src: RAIL_ART[x.slug] ?? "",
    }))
  return (
    <Section id="v3-industries" spacing="none">
      <IndustryRail title="Agents on the job, in every industry." line="The same platform, set up for the calls each industry runs on." items={items} />
    </Section>
  )
}
