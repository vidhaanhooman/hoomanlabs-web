import { Suspense } from "react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { LogoMark } from "@/components/layout/wordmark"
import { FloatCard, FloatPanel } from "@/components/sections/float-card"
import { IndustryRail, type RailItem } from "@/components/sections/industry-rail"
import { CustomerLogo, customerIn } from "@/components/sections/logos"
import { postHref, type Post } from "@/content/blog"
import { industries, industryHref } from "@/content/industries"
import { getPosts } from "@/lib/blog"
import { cn } from "@/lib/utils"

/**
 * Homepage customer stories and industries, one kind of card for both
 * (FloatCard): a soft, blurred photo with a piece of product UI on it and
 * the words below.
 *
 * CustomerStories: the three newest published stories from Sanity in a
 * staggered grid, with one figure in each open cell; each card floats a panel
 * with the customer's logo and their headline figure.
 * Publishing a story in Sanity is all it takes; the block hides until there
 * is one.
 *
 * IndustryJobs: the six industries as expanding strips (IndustryRail), each
 * floating its day's figures from the industry page's product screen.
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
const LOGO_H: Record<string, string> = {
  GIVA: "h-[17px]",
  SaffronStays: "h-[30px]",
}

/** Each story card's photo, blurred behind its panel (public/art/stories). Stand-ins until the customers' own photos arrive. */
const PHOTO: Record<string, string> = {
  GIVA: "/art/stories/giva-band.webp",
  SaffronStays: "/art/stories/saffronstays-band.webp",
  "Holiday Tribe": "/art/stories/holiday-tribe-band.webp",
}

/** A customer's logo in black, for the white panels (a wordmark for those without a logo file). */
function Logo({ company }: { company?: string }) {
  if (company && !WORDMARKS.includes(company)) return <CustomerLogo name={company} className={cn("w-auto [filter:brightness(0)]", LOGO_H[company] ?? "h-6")} />
  return <span className="text-[17px] leading-none font-medium tracking-tight">{company ?? "Customer"}</span>
}

export function CustomerStories() {
  return (
    <Suspense fallback={null}>
      <Stories />
    </Suspense>
  )
}

/** Each story's headline figure, shown on its card's panel. */
const STAT: Record<string, { value: string; label: string }> = {
  GIVA: { value: "70%", label: "of support queries automated" },
  SaffronStays: { value: "2%", label: "of calls missed, down from 50%" },
  "Holiday Tribe": { value: "35%", label: "of the sales team's time saved" },
}

/** Each card's own colour, washed over its blurred photo: muted and mid-toned, so white panels and words both read on them. */
const STORY_TINT: Record<string, string> = {
  GIVA: "#a08478",
  SaffronStays: "#7f8a5c",
  "Holiday Tribe": "#6f8295",
}

/** A customer story: the customer's photo blurred, a panel with their logo and figure, the result and tags below. */
function StoryCard({ post }: { post: Post }) {
  const company = companyOf(post)
  const s = company ? STORY[company] : undefined
  const stat = company ? STAT[company] : undefined
  return (
    <FloatCard
      href={postHref(post.slug)}
      label={`${company ?? "Customer"} story: ${post.title}`}
      src={(company && PHOTO[company]) || ""}
      tint={(company && STORY_TINT[company]) || "#8a8a8a"}
      className="aspect-[4/3]"
      title={s?.result ?? post.title}
      line={s?.tags ?? post.title}
    >
      <FloatPanel className="gap-3 p-3">
        <span className="flex items-center justify-between px-1 pt-1">
          <span className="flex h-6 items-center text-[#111]">
            <Logo company={company} />
          </span>
          <span className="grid size-5 place-items-center rounded-full bg-[#111] text-white">
            <svg viewBox="0 0 12 12" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M2.5 6.2 5 8.5l4.5-5" />
            </svg>
          </span>
        </span>
        {stat && (
          <span className="flex flex-col gap-1.5 rounded-md bg-[#f3f3f3] px-4 py-4">
            <span className="text-[34px] leading-none tracking-tight tabular-nums">{stat.value}</span>
            <span className="text-[12px] leading-snug text-[#666]">{stat.label}</span>
          </span>
        )}
      </FloatPanel>
    </FloatCard>
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

/** One figure in an outlined cell, as tall as the story card beside it. */
function FigureCell({ figure, className }: { figure: (typeof FIGURES)[number]; className?: string }) {
  return (
    <li className={cn("hidden flex-col justify-between rounded-xl border border-line p-7 md:flex", className)}>
      <span className="font-mono text-label text-ink-muted">{figure.who}</span>
      <span className="flex flex-col gap-2">
        <span className="text-display leading-none font-normal tabular-nums">{figure.value}</span>
        <span className="text-h4 text-ink-secondary">{figure.label}</span>
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
        <ul className="mt-(--heading-gap,2.5rem) grid gap-(--card-gap,0.75rem) gap-y-10 md:grid-cols-3 md:gap-y-(--card-gap,0.75rem)">
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

/** Each industry's photo, blurred behind its card's panel (public/art/industries). */
const RAIL_ART: Record<string, string> = {
  education: "/art/industries/education-rail.webp",
  "e-commerce": "/art/industries/e-commerce-rail.webp",
  logistics: "/art/industries/logistics-rail.webp",
  healthcare: "/art/industries/healthcare-rail.webp",
  bfsi: "/art/industries/bfsi-rail.webp",
  "consumer-ai": "/art/industries/consumer-ai-rail.webp",
}

/** The industry's day in three rows (after the reference's stacked list): the middle one solid, the others faded behind. */
function DayStack({ stats }: { stats: { label: string; value: string }[] }) {
  return (
    <span className="flex flex-col gap-2">
      {stats.slice(0, 3).map((st, i) =>
        i === 1 ? (
          <FloatPanel key={st.label} className="flex-row items-center gap-3 px-3 py-3.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#111] text-white">
              <LogoMark className="size-3.5" />
            </span>
            <span className="flex-1 text-[13px]">{st.label}</span>
            <span className="text-[22px] leading-none tabular-nums">{st.value}</span>
          </FloatPanel>
        ) : (
          <span key={st.label} className="flex items-center gap-3 rounded-lg bg-white/35 px-3 py-3 text-[#111]/45 backdrop-blur-sm">
            <span className="size-8 shrink-0 rounded-full bg-[#111]/12" />
            <span className="flex-1 text-[13px]">{st.label}</span>
            <span className="text-[20px] leading-none tabular-nums">{st.value}</span>
          </span>
        ),
      )}
    </span>
  )
}

/** Each industry strip's own colour, washed over its blurred photo. */
const RAIL_TINT: Record<string, string> = {
  education: "#6f8295",
  "e-commerce": "#a08478",
  logistics: "#8a7f62",
  healthcare: "#5f857a",
  bfsi: "#6e6f8f",
  "consumer-ai": "#7f8a5c",
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
      tint: RAIL_TINT[x.slug] ?? "#8a8a8a",
      panel: <DayStack stats={x.screen.stats} />,
    }))
  return (
    <Section id="v3-industries" spacing="none">
      <IndustryRail title="Agents on the job, in every industry." line="The same platform, set up for the calls each industry runs on." items={items} />
    </Section>
  )
}
