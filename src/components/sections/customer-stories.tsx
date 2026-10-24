import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { GRAIN } from "@/components/layout/art-stage"
import { CustomerLogo, customerIn } from "@/components/sections/logos"
import { HScroll } from "@/components/sections/h-scroll"
import { StoryReveal } from "@/components/sections/story-reveal"
import { postHref, type Post } from "@/content/blog"
import { industries, industryHref } from "@/content/industries"
import { getPosts } from "@/lib/blog"
import { cn } from "@/lib/utils"

/**
 * Homepage customer stories, under the logo grid: the three newest
 * published stories from Sanity. Each card is the customer's cover art (a
 * motion-blurred landscape in their colour, panning slowly along its streaks
 * and leaning in on hover) with film grain
 * and their logo in white; customers without art get a drifting gradient in
 * their brand colour (Sanity's colour code) pulled towards the site palette.
 * On hover the logo lifts and the story's one-liner and use cases slide up
 * inside the card. On touch screens the details always show. Publishing a
 * story in Sanity is all it takes (the stories block hides until there is
 * one). IndustryJobs reuses the same cards for the Solutions pages. Cards
 * come in from blur, one after another, as they scroll into view.
 */

/** What each customer uses agents for, until stories carry a use-case field in Sanity. */
const USE_CASES: Record<string, string[]> = {
  "Holiday Tribe": ["Lead qualification", "Inbound sales"],
  GIVA: ["Customer support", "Order updates"],
  SaffronStays: ["Guest calls", "Owner engagement"],
}

/** Each customer's cover art (motion-blurred landscapes in their colour), in public/art/stories. */
const ART: Record<string, { src: string; flow: [string, string]; shade?: number }> = {
  // `flow`: which way the art pans, following its streaks (sideways, or GIVA's rising diagonal).
  "Holiday Tribe": { src: "/art/stories/holiday-tribe.webp", flow: ["4%", "0.5%"] },
  GIVA: { src: "/art/stories/giva.webp", flow: ["3.5%", "-3%"] },
  SaffronStays: { src: "/art/stories/saffronstays.webp", flow: ["4%", "0%"] },
}

/** Customers with a story but no logo in the grid, shown as a wordmark. */
const WORDMARKS = ["Holiday Tribe"]

const squash = (t: string) => t.toLowerCase().replace(/[^a-z0-9]/g, "")
const companyOf = (p: Post) => customerIn(p.title) ?? WORDMARKS.find((n) => squash(p.title).includes(squash(n)))

/**
 * The site's gouache palette (sage, ochre, sienna, teal, dusk): each card's
 * brand colour is pulled towards two of these, so the three cards feel like
 * one family with the rest of the site's art.
 */
const EARTH = ["oklch(0.68 0.06 150)", "oklch(0.76 0.12 80)", "oklch(0.56 0.11 45)", "oklch(0.55 0.06 200)", "oklch(0.48 0.06 265)"]
const mix = (c: string, e: string, p: number) => `color-mix(in oklch, ${c} ${p}%, ${e})`

/** Drifting blobs: where each sits, how far it wanders, and how long a sweep takes. */
const BLOBS = [
  { at: "-left-[20%] -top-[30%] size-[85%]", x: "18%", y: "14%", s: "17s", d: "0s" },
  { at: "-right-[25%] -top-[10%] size-[80%]", x: "-16%", y: "18%", s: "21s", d: "-6s" },
  { at: "-bottom-[35%] left-[15%] size-[90%]", x: "14%", y: "-16%", s: "19s", d: "-11s" },
]

/** The card's backdrop: the customer's art, drifting slowly, with grain; or the colour gradient when there's no art. */
function Backdrop({ art, hex, i }: { art?: (typeof ART)[string]; hex?: string; i: number }) {
  if (!art) return <Gradient hex={hex} i={i} />
  return (
    <span aria-hidden className="absolute inset-0 -z-10 overflow-hidden bg-surface">
      {/* Leans in on hover (a slow zoom); inside it, the art keeps flowing along its streaks */}
      <span className={cn("absolute inset-0", LEAN)}>
        <span
          className="story-flow absolute -inset-[8%]"
          style={{ "--flow-x": art.flow[0], "--flow-y": art.flow[1], "--flow-d": `${i * -6}s`, "--flow-s": `${17 + i * 2}s` } as React.CSSProperties}
        >
          <Image src={art.src} alt="" fill sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 100vw" className="object-cover" />
        </span>
      </span>
      {/* A shade so the white mark always reads (sharper, lighter photos need more) */}
      <span className="absolute inset-0 bg-black" style={{ opacity: art.shade ?? 0.15 }} />
      <span className="grain-flicker absolute -inset-[20px] opacity-[0.4] mix-blend-overlay" style={{ backgroundImage: GRAIN, backgroundSize: "160px 160px" }} />
    </span>
  )
}

function Gradient({ hex, i }: { hex?: string; i: number }) {
  const c = hex ? `#${hex}` : EARTH[i % EARTH.length]
  const a = EARTH[i % EARTH.length]
  const b = EARTH[(i + 2) % EARTH.length]
  const tones = [mix(c, "white", 70), mix(c, a, 55), mix(c, b, 45)]
  return (
    <span aria-hidden className="absolute inset-0 -z-10 overflow-hidden" style={{ background: mix(c, a, 70) }}>
      {BLOBS.map((o, k) => (
        <span
          key={k}
          className={cn("story-blob absolute rounded-full blur-3xl", o.at)}
          style={{ background: tones[k], "--blob-x": o.x, "--blob-y": o.y, "--blob-s": o.s, "--blob-d": o.d } as React.CSSProperties}
        />
      ))}
      {/* Film grain over the colour, shifting like running film */}
      <span className="grain-flicker absolute -inset-[20px] opacity-[0.5] mix-blend-overlay" style={{ backgroundImage: GRAIN, backgroundSize: "160px 160px" }} />
    </span>
  )
}

// Hover only where there's a real pointer; keyboard focus gets the same reveal; touch shows the details.
const LEAN =
  "transition-[scale] duration-[1200ms] ease-(--ease-out) [@media(hover:hover)_and_(pointer:fine)]:group-hover/story:scale-[1.07] group-focus-visible/story:scale-[1.07] motion-reduce:transition-none motion-reduce:scale-100!"
const LIFT =
  "transition-[translate] duration-500 ease-(--ease-out) [@media(hover:hover)_and_(pointer:fine)]:group-hover/story:-translate-y-10 group-focus-visible/story:-translate-y-10 [@media(hover:none)]:-translate-y-10 motion-reduce:transition-none"
const DETAILS =
  "translate-y-4 opacity-0 transition-[opacity,translate] duration-500 ease-(--ease-out) [@media(hover:hover)_and_(pointer:fine)]:group-hover/story:translate-y-0 [@media(hover:hover)_and_(pointer:fine)]:group-hover/story:opacity-100 group-focus-visible/story:translate-y-0 group-focus-visible/story:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100 motion-reduce:translate-y-0"
const SCRIM =
  "opacity-0 transition-opacity duration-500 [@media(hover:hover)_and_(pointer:fine)]:group-hover/story:opacity-100 group-focus-visible/story:opacity-100 [@media(hover:none)]:opacity-100"

/**
 * One card: art (or gradient) behind a white mark (a logo or a name); on
 * hover the art leans in, the mark lifts and a one-liner with small tags
 * slides up. Shared by the customer stories and the industries.
 */
function JobTile({
  href,
  label,
  mark,
  line,
  tags,
  art,
  hex,
  index,
}: {
  href: string
  label: string
  mark: React.ReactNode
  line: string
  tags: string[]
  art?: (typeof ART)[string]
  hex?: string
  index: number
}) {
  return (
    <StoryReveal index={index}>
      <Link
        href={href}
        aria-label={label}
        className="group/story relative isolate flex aspect-[4/3] overflow-hidden rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Backdrop art={art} hex={hex} i={index} />

        {/* The mark, centred; lifts to make room for the details */}
        <span className={cn("absolute inset-0 grid place-items-center", LIFT)}>{mark}</span>

        {/* Details: the one-liner and tags, over a soft scrim */}
        <span aria-hidden className={cn("absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/55 via-black/25 to-transparent", SCRIM)} />
        <span className={cn("absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5 text-white", DETAILS)}>
          <span className="line-clamp-2 text-body leading-snug">{line}</span>
          <span className="flex items-end justify-between gap-3">
            <span className="flex flex-wrap gap-1.5">
              {tags.map((u) => (
                <span key={u} className="rounded-full bg-white/15 px-2.5 py-0.5 text-[12px] backdrop-blur-sm">
                  {u}
                </span>
              ))}
            </span>
            <ArrowRightIcon aria-hidden className="size-4 shrink-0" />
          </span>
        </span>
      </Link>
    </StoryReveal>
  )
}

const WORDMARK = "font-medium tracking-tight text-white drop-shadow-[0_1px_8px_oklch(0_0_0/0.15)]"

function StoryCard({ post, index }: { post: Post; index: number }) {
  const company = companyOf(post)
  const hasLogo = company && !WORDMARKS.includes(company)
  return (
    <JobTile
      href={postHref(post.slug)}
      label={`${company ?? "Customer"} story: ${post.title}`}
      mark={
        hasLogo ? (
          <CustomerLogo name={company} size={2} className="[filter:brightness(0)_invert(1)] drop-shadow-[0_1px_8px_oklch(0_0_0/0.15)]" />
        ) : (
          <span className={cn("text-h2", WORDMARK)}>{company ?? "Customer story"}</span>
        )
      }
      line={post.title}
      tags={(company && USE_CASES[company]) || (post.industry ? [post.industry] : [])}
      art={company ? ART[company] : undefined}
      hex={post.color}
      index={index}
    />
  )
}

/** Each industry's card art (motion-blurred scenes, public/art/industries), panning sideways along the blur. */
const industryArt = (slug: string) => ({ src: `/art/industries/${slug}.webp`, flow: ["3%", "0%"] as [string, string], shade: 0.3 })

export function CustomerStories() {
  return (
    <Section id="v3-stories">
      <Container>
        <Suspense fallback={null}>
          <Stories />
        </Suspense>
      </Container>
    </Section>
  )
}

/**
 * "Agents on the job, in every industry.": the same cards, one per
 * Solutions page over that industry's photo, in a sideways-scrolling row
 * (just above the closing CTA).
 */
export function IndustryJobs() {
  return (
    <Section id="v3-industries">
      <Container>
        <HScroll title="Agents on the job, in every industry.">
          {industries.map((x, i) => (
            <JobTile
              key={x.slug}
              href={industryHref(x.slug)}
              label={`${x.name}: ${x.card}`}
              mark={<span className={cn("text-h2", WORDMARK)}>{x.name}</span>}
              line={x.card}
              tags={x.jobs.slice(0, 2).map((j) => j.name)}
              art={industryArt(x.slug)}
              index={i % 3}
            />
          ))}
        </HScroll>
      </Container>
    </Section>
  )
}

async function Stories() {
  const stories = (await getPosts().catch(() => [])).filter((p) => p.category === "Customer stories").slice(0, 3)
  if (!stories.length) return null
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div className="flex max-w-[44rem] flex-col gap-3">
          <h2 className="text-h2 font-normal">Already on the job.</h2>
          <p className="text-body text-ink-secondary">How teams put agents on their busiest calls, and what changed.</p>
        </div>
        <TextLink href="/blog">All stories</TextLink>
      </div>
      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((p, i) => (
          <StoryCard key={p.slug} post={p} index={i} />
        ))}
      </ul>
    </>
  )
}
