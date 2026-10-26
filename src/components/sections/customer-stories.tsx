import { Suspense } from "react"
import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { IndustrySurface } from "@/components/sections/industry-surfaces"
import { CustomerLogo, customerIn } from "@/components/sections/logos"
import { postHref, type Post } from "@/content/blog"
import { industries, industryHref, type Industry } from "@/content/industries"
import { getPosts } from "@/lib/blog"
import { cn } from "@/lib/utils"

/**
 * Homepage customer stories and industries, in the site's own language
 * (panels, hairlines, product-style rows; no imagery).
 *
 * CustomerStories: the three newest published stories from Sanity as cards:
 * the customer's logo, the result as a big figure, and the quote. Publishing a story in Sanity is all it takes; the block
 * hides until there is one.
 *
 * IndustryJobs: the six industries as a 3 × 2 grid, each card showing the
 * tool that industry lives in with the agent's work inside it.
 */

/** Customers with a story who aren't in the logo grid (matched by name). */
const WORDMARKS = ["Holiday Tribe"]

const squash = (t: string) => t.toLowerCase().replace(/[^a-z0-9]/g, "")
const companyOf = (p: Post) => customerIn(p.title) ?? WORDMARKS.find((n) => squash(p.title).includes(squash(n)))

/**
 * What each story leads with, until stories carry these fields in Sanity:
 * the result as a figure and what it measures, and the quote. Anything
 * missing falls back to the story (title, impact quote).
 */
const STORY: Record<string, { value: string; label: string; quote: string; by: string }> = {
  GIVA: {
    value: "70%",
    label: "of support queries automated",
    quote: "When I first talked to Hooman, I instantly knew that this was the future of customer calls.",
    by: "Ishendra Agarwal, Founder and CEO, GIVA",
  },
  SaffronStays: {
    value: "2%",
    label: "of calls missed, down from 50%",
    quote: "Villa owners specifically mentioned how impressed they were with the voice agent.",
    by: "SaffronStays team",
  },
  "Holiday Tribe": {
    value: "Seconds",
    label: "to call a web lead, down from 90 minutes",
    quote: "We were able to scale lead handling without scaling headcount.",
    by: "Narendra B., Product Manager, Holiday Tribe",
  },
}

/** Logo heights on the cards, tuned so each reads at the same weight as the wordmarks. */
// GIVA's caps fill its box, so it sits smaller; SaffronStays carries an icon and a tagline, so its box runs taller.
const LOGO_H: Record<string, string> = {
  GIVA: "h-[17px]",
  SaffronStays: "h-[30px]",
}

function Logo({ company }: { company?: string }) {
  if (company && !WORDMARKS.includes(company))
    return <CustomerLogo name={company} className={cn("w-auto [filter:brightness(0)] dark:[filter:brightness(0)_invert(1)]", LOGO_H[company] ?? "h-6")} />
  return <span className="text-[19px] leading-none font-medium tracking-tight">{company ?? "Customer"}</span>
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

export function CustomerStories() {
  return (
    <Suspense fallback={null}>
      <Stories />
    </Suspense>
  )
}

/** A customer story card: logo, the result as a big figure, the quote, and a link to the story. */
function StoryCard({ post }: { post: Post }) {
  const company = companyOf(post)
  const s = company ? STORY[company] : undefined
  const quote = s?.quote ?? post.quote?.text
  const by = s?.by ?? post.quote?.by
  return (
    <Link
      href={postHref(post.slug)}
      aria-label={`${company ?? "Customer"} story: ${post.title}`}
      className="group/story flex w-full flex-col gap-8 rounded-md bg-surface p-7 outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="flex h-[30px] items-center justify-between gap-4">
        <Logo company={company} />
        <ArrowRightIcon className="size-4 shrink-0 text-ink-muted transition-[translate,color] group-hover/story:translate-x-0.5 group-hover/story:text-foreground" />
      </div>
      <div className="flex flex-col gap-1.5">
        {s ? (
          <>
            <span className="text-display font-normal tabular-nums">{s.value}</span>
            <span className="text-body text-ink-secondary">{s.label}</span>
          </>
        ) : (
          <span className="line-clamp-2 text-h3 font-normal text-balance">{post.title}</span>
        )}
      </div>
      {quote && (
        <figure className="mt-auto flex flex-col gap-2 border-t border-line pt-5">
          <blockquote className="line-clamp-3 min-h-[3lh] text-small">“{quote}”</blockquote>
          {by && <figcaption className="truncate text-label text-ink-muted">{by}</figcaption>}
        </figure>
      )}
    </Link>
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
        <ul className="mt-10 grid gap-3 md:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug} className="flex min-w-0">
              <StoryCard post={p} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

/** Longer lines on the homepage where the Solutions one-liner is very short. */
const CARD_LINE: Record<string, string> = {
  healthcare: "Every patient call answered and every slot filled, even after hours.",
  "consumer-ai": "A voice for your app's users that helps them right in the moment, at any scale.",
}

const ORDER = ["education", "e-commerce", "logistics", "healthcare", "bfsi", "consumer-ai"]

/**
 * An industry card, after the "Everywhere you work" row on cursor.com: the
 * industry and its one-liner, then the tool it already lives in with the
 * agent's work inside it (industry-surfaces.tsx). The whole card links to it.
 */
function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <Link
      href={industryHref(industry.slug)}
      aria-label={`${industry.name}: ${industry.card}`}
      className="group/ind flex w-full flex-col gap-5 rounded-md bg-surface p-3 pt-5 outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="flex flex-col px-2">
        <h3 className="flex items-center justify-between gap-3 text-body font-normal">
          {industry.name}
          <ArrowRightIcon className="size-3.5 text-ink-muted transition-[translate,color] group-hover/ind:translate-x-0.5 group-hover/ind:text-foreground" />
        </h3>
        <p className="line-clamp-2 min-h-[2lh] text-body text-ink-secondary">{CARD_LINE[industry.slug] ?? industry.card}</p>
      </div>
      <IndustrySurface slug={industry.slug} />
    </Link>
  )
}

export function IndustryJobs() {
  const list = ORDER.map((slug) => industries.find((x) => x.slug === slug)).filter((x) => x !== undefined)
  return (
    <Section id="v3-industries">
      <Container>
        <Heading title="Agents on the job, in every industry." line="The same platform, set up for the calls each industry runs on." />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((x) => (
            <li key={x.slug} className="flex min-w-0">
              <IndustryCard industry={x} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
