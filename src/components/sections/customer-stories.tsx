import { Suspense } from "react"
import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { IndustrySurface } from "@/components/sections/industry-surfaces"
import { CustomerLogo, customerIn } from "@/components/sections/logos"
import { StorySwitcher, type StoryItem } from "@/components/sections/story-switcher"
import { postHref, type Post } from "@/content/blog"
import { industries, industryHref, type Industry } from "@/content/industries"
import { getPosts } from "@/lib/blog"
import { cn } from "@/lib/utils"

/**
 * Homepage customer stories and industries, in the site's own language
 * (panels, hairlines, product-style rows; no imagery).
 *
 * CustomerStories: the three newest published stories from Sanity in one
 * panel (StorySwitcher), customers' logos as tabs, each story's quote, result
 * and facts below. Publishing a story in Sanity is all it takes; the block
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
 * the result as a figure and what it measures, the quote, and the facts.
 * Anything missing falls back to the story (title, industry, impact quote).
 */
const STORY: Record<string, { value: string; label: string; quote: string; by: string; industry: string; useCase: string }> = {
  GIVA: {
    value: "70%",
    label: "of support queries automated",
    quote: "When I first talked to Hooman, I instantly knew that this was the future of customer calls.",
    by: "Ishendra Agarwal, Founder and CEO, GIVA",
    industry: "D2C jewellery",
    useCase: "Support",
  },
  SaffronStays: {
    value: "2%",
    label: "of calls missed, down from 50%",
    quote: "Villa owners specifically mentioned how impressed they were with the voice agent.",
    by: "SaffronStays team",
    industry: "Villa stays",
    useCase: "Sales and inbound",
  },
  "Holiday Tribe": {
    value: "Seconds",
    label: "to call a web lead, down from 90 minutes",
    quote: "We were able to scale lead handling without scaling headcount.",
    by: "Narendra B., Product Manager, Holiday Tribe",
    industry: "Travel",
    useCase: "Lead qualification",
  },
}

/** Logo heights in the tabs, tuned so each reads at the same weight as the wordmarks. */
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

async function Stories() {
  const posts = (await getPosts().catch(() => [])).filter((p) => p.category === "Customer stories").slice(0, 3)
  if (!posts.length) return null
  const items: StoryItem[] = posts.map((p) => {
    const company = companyOf(p)
    const s = company ? STORY[company] : undefined
    return {
      slug: p.slug,
      href: postHref(p.slug),
      company: company ?? "customer",
      logo: <Logo company={company} />,
      value: s?.value ?? "",
      label: s?.label ?? p.title,
      quote: s?.quote ?? p.quote?.text,
      by: s?.by ?? p.quote?.by,
      facts: [
        ["Industry", s?.industry ?? p.industry ?? "—"],
        ["Use case", s?.useCase ?? "—"],
      ],
    }
  })
  return (
    <Section id="v3-stories">
      <Container>
        <Heading
          title="Already on the job."
          line="Real deployments with the numbers to show for it, from support lines to sales teams."
          link={{ href: "/blog", label: "All customer stories" }}
        />
        <div className="mt-10">
          <StorySwitcher items={items} />
        </div>
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
