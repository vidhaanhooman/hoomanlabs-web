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
 * CustomerStories: the three newest published stories from Sanity as cards:
 * the customer's photo, darkened, with their logo and tags and the result as
 * a headline, like the industry cards. Publishing a story in Sanity is all it takes; the block
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
  GIVA: { result: "70% of support queries automated", tags: "D2C jewellery · Support" },
  SaffronStays: { result: "Missed calls down from 50% to 2%", tags: "Villa stays · Sales and inbound" },
  "Holiday Tribe": { result: "Web leads called in seconds, not 90 minutes", tags: "Travel · Lead qualification" },
}

/** Logo heights on the cards, tuned so each reads at the same weight as the wordmarks. */
// GIVA's caps fill its box, so it sits smaller; SaffronStays carries an icon and a tagline, so its box runs taller.
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

function Logo({ company, onPhoto = false }: { company?: string; onPhoto?: boolean }) {
  if (company && !WORDMARKS.includes(company))
    return (
      <CustomerLogo
        name={company}
        className={cn("w-auto", onPhoto ? "[filter:brightness(0)_invert(1)]" : "[filter:brightness(0)] dark:[filter:brightness(0)_invert(1)]", LOGO_H[company] ?? "h-6")}
      />
    )
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

/** A customer story card, the same kind as the industry cards: the photo darkened, the logo and tags along the top, the result in white at the bottom. */
function StoryCard({ post }: { post: Post }) {
  const company = companyOf(post)
  const s = company ? STORY[company] : undefined
  const photo = company ? PHOTO[company] : undefined
  return (
    <Link
      href={postHref(post.slug)}
      aria-label={`${company ?? "Customer"} story: ${post.title}`}
      className="group/rail relative isolate flex h-[24rem] w-full flex-col justify-between overflow-hidden rounded-lg bg-[#161616] p-7 text-white outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {/* Built like the industry cards below: the photo darkened, the words in white at the bottom left */}
      {photo && (
        <Image
          src={photo}
          alt=""
          fill
          sizes="(min-width: 768px) 30vw, 90vw"
          className="-z-20 object-cover [filter:brightness(0.85)_saturate(0.9)] transition-transform duration-[900ms] ease-(--ease-out) group-hover/rail:scale-[1.04] motion-reduce:transition-none"
        />
      )}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,oklch(0.1_0_0/0.9),oklch(0.1_0_0/0.72)_55%,oklch(0.1_0_0/0.55)),linear-gradient(to_top,oklch(0.1_0_0/0.45),transparent_60%)]"
      />
      <span className="flex min-h-[30px] items-start justify-between gap-4">
        <Logo company={company} onPhoto />
        {(s?.tags ?? post.industry) && (
          <span className="max-w-[55%] pt-1 text-right font-mono text-[11px] leading-snug tracking-wide text-white/80">{s?.tags ?? post.industry}</span>
        )}
      </span>
      <span className="line-clamp-3 max-w-[22rem] text-h3 leading-snug font-normal text-balance">{s?.result ?? post.title}</span>
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
        <ul className="mt-(--heading-gap,2.5rem) grid gap-(--card-gap,0.75rem) md:grid-cols-3">
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
