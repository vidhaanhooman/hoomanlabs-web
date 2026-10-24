import { Suspense } from "react"
import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { logos } from "@/content/draft"
import { postHref, type Post } from "@/content/blog"
import { getPosts } from "@/lib/blog"
import { cn } from "@/lib/utils"

/**
 * Customer logos (public/logos), grey and faded at rest (greyscale, lower
 * opacity), full colour on hover; white silhouettes in dark mode. White-only files use a dark copy
 * (giva-dark.svg), the festive StayVista file a wordmark-only copy, and
 * ShopDeck / Mosaic copies whose letter holes are real cut-outs, not pale
 * fills (shopdeck-mono.svg, mosaic-mono.svg), so they grey cleanly. `crop` is the logo's drawn area in its own
 * viewBox units (several files carry wide empty margins), and the display
 * width grows with √aspect so wide wordmarks and compact marks carry about
 * the same visual weight. Customers without a file show a text wordmark.
 */
/** `full`: the file's own viewBox size; `crop`: the drawn logo inside it. */
type Customer = {
  name: string
  src?: string
  full?: [number, number]
  crop?: [number, number, number, number]
  /** Optical size nudge for logos that read small at the shared weight. */
  scale?: number
  /** Other names a customer story might use for this company. */
  aliases?: string[]
  /** Has light shapes inside (white cut-outs, pale fills): grey it by tone,
   *  not as a flat silhouette, so the inner detail survives. */
  detail?: boolean
  className?: string
}

const CUSTOMERS: Customer[] = [
  { name: "Lenskart", src: "/logos/Lenskart.svg", full: [159.56, 22.11], crop: [0, 0, 159.56, 22.11] },
  { name: "GIVA", src: "/logos/giva-dark.svg", full: [848, 273], crop: [10.6, 16.9, 826.6, 239.5] },
  { name: "Pristyn Care", aliases: ["Pristyn"], src: "/logos/Pristyn.svg", full: [3840, 950], crop: [0, 0, 3840, 946.2], scale: 1.2 },
  { name: "Mosaic Wellness", aliases: ["Mosaic"], src: "/logos/mosaic-mono.svg", full: [1969, 1969], crop: [0, 728.5, 1969, 513.5], detail: true },
  { name: "Be10x", aliases: ["Be 10x"], src: "/logos/Be10X.svg", full: [639, 361], crop: [0, 0, 639, 361] },
  { name: "StayVista", aliases: ["Stay Vista"], src: "/logos/stayvista-wordmark.svg", full: [187, 85], crop: [0, 0, 187, 85] },
  { name: "SaffronStays", aliases: ["Saffron Stays"], src: "/logos/SaffronStays_vector.svg", full: [410, 120], crop: [21.4, 13.1, 372.4, 92.1], scale: 1.2 },
  { name: "ShopDeck", src: "/logos/shopdeck-mono.svg", full: [2168, 725], crop: [0, 155.8, 2168, 413.7], detail: true },
  { name: "Vedantu", src: "/logos/Vedantu_idqes6hbls_0.svg", full: [210.8, 80], crop: [19, 6.5, 172.5, 47] },
  { name: "ShareChat", src: "/logos/ShareChat_idbYpuBuC1_0.svg", full: [1390.35, 375.16], crop: [0, 0, 1390.3, 375.2], detail: true },
]

/** Display width for a logo of this aspect ratio, in px. */
const width = (w: number, h: number, scale = 1) => Math.round(44 * scale * Math.sqrt(w / h))

/**
 * Grey and faded at rest, so the row reads as detail; the logo under the
 * pointer comes to full colour.
 * Flat logos become one even grey (a silhouette); logos with inner detail
 * are greyed by tone instead, and a little darker so they match the rest.
 */
// Class names are written out in full so Tailwind can find them.
// In dark mode the silhouettes are inverted to white; on hover the logo shows
// in colour, with its lightness flipped (dark ink turns light) but its hue
// kept, so brand colours read on the dark page.
const BASE =
  "transition-[opacity,filter] duration-200 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover/logo:opacity-100 [@media(hover:hover)_and_(pointer:fine)]:group-hover/logo:[filter:none] dark:[@media(hover:hover)_and_(pointer:fine)]:group-hover/logo:[filter:invert(1)_hue-rotate(180deg)]"
const TONE = cn("opacity-45 [filter:grayscale(1)_brightness(0)] dark:opacity-55 dark:[filter:grayscale(1)_brightness(0)_invert(1)]", BASE)
const TONE_DETAIL = cn("opacity-60 [filter:grayscale(1)_contrast(1.15)_brightness(0.7)] dark:opacity-65 dark:[filter:grayscale(1)_contrast(1.15)_brightness(0.7)_invert(1)]", BASE)

function Logo({ c, size = 1, className = c.detail ? TONE_DETAIL : TONE }: { c: Customer; size?: number; className?: string }) {
  if (!c.src || !c.crop || !c.full) {
    return <span className={cn("text-[1.2rem] whitespace-nowrap text-foreground", className, c.className)}>{c.name}</span>
  }
  const [x, y, w, h] = c.crop
  const px = width(w, h, (c.scale ?? 1) * size)
  return (
    <svg role="img" aria-label={c.name} viewBox={`${x} ${y} ${w} ${h}`} width={px} height={Math.round((px * h) / w)} className={className}>
      {/* The file is drawn at its own size; the viewBox crops to the logo. */}
      <image href={c.src} x={0} y={0} width={c.full[0]} height={c.full[1]} />
    </svg>
  )
}

/**
 * One customer's logo by name, at the row's balanced size times `size`.
 * Pass `className` to replace the faded tone (e.g. white over art).
 */
export function CustomerLogo({ name, size, className }: { name: string; size?: number; className?: string }) {
  const c = CUSTOMERS.find((x) => x.name === name)
  return c ? <Logo c={c} size={size} className={className} /> : null
}

// Matching ignores case, spaces and punctuation ("SaffronStays" = "Saffron Stays").
const squash = (t: string) => t.toLowerCase().replace(/[^a-z0-9]/g, "")

/**
 * Each customer's newest published story, by name: a story whose title
 * names the company (or one of its aliases) links that logo. Publishing a
 * story in Sanity is all it takes.
 */
/** The grid customer a title names (by name or alias), if any. */
export function customerIn(title: string) {
  return CUSTOMERS.find((c) => [c.name, ...(c.aliases ?? [])].map(squash).some((n) => squash(title).includes(n)))?.name
}

function storyLinks(posts: Post[]) {
  const stories = posts.filter((p) => p.category === "Customer stories")
  const links: Record<string, string> = {}
  for (const c of CUSTOMERS) {
    const names = [c.name, ...(c.aliases ?? [])].map(squash)
    const story = stories.find((p) => names.some((n) => squash(p.title).includes(n)))
    if (story) links[c.name] = postHref(story.slug)
  }
  return links
}

const CELL = "group/logo relative flex h-20 items-center justify-center bg-background transition-colors duration-200 hover:bg-surface sm:h-24"
// Hover only where there's a real pointer; keyboard focus gets the same reveal.
// Class names are written out in full so Tailwind can find them.
const LIFT =
  "transition-[translate] duration-300 ease-(--ease-out) [@media(hover:hover)_and_(pointer:fine)]:group-hover/logo:-translate-y-2.5 group-focus-visible/logo:-translate-y-2.5 motion-reduce:transition-none motion-reduce:translate-y-0!"
const REVEAL =
  "translate-y-1.5 opacity-0 transition-[opacity,translate] duration-300 ease-(--ease-out) [@media(hover:hover)_and_(pointer:fine)]:group-hover/logo:translate-y-0 [@media(hover:hover)_and_(pointer:fine)]:group-hover/logo:opacity-100 group-focus-visible/logo:translate-y-0 group-focus-visible/logo:opacity-100 motion-reduce:translate-y-0"
const NUDGE = "transition-[translate] duration-300 [@media(hover:hover)_and_(pointer:fine)]:group-hover/logo:translate-x-0.5"

function Grid({ links }: { links: Record<string, string> }) {
  return (
    <ul className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-5">
      {CUSTOMERS.map((c) => {
        const href = links[c.name]
        if (!href)
          return (
            <li key={c.name} className={CELL}>
              <Logo c={c} />
            </li>
          )
        // A customer with a story: the logo lifts and "Read story" slides in under it.
        return (
          <li key={c.name} className="flex">
            <Link href={href} aria-label={`${c.name}: read the customer story`} className={cn(CELL, "w-full outline-none focus-visible:bg-surface")}>
              <span className={LIFT}>
                <Logo c={c} className={cn(c.detail ? TONE_DETAIL : TONE, "group-focus-visible/logo:opacity-100 group-focus-visible/logo:[filter:none]")} />
              </span>
              <span aria-hidden className={cn("absolute bottom-3 inline-flex items-center gap-1 text-label text-foreground sm:bottom-4", REVEAL)}>
                Read story
                <ArrowRightIcon className={cn("size-3", NUDGE)} />
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

/** The grid with story links; without them (Sanity unreachable) it's the plain grid. */
async function LinkedGrid() {
  const posts = await getPosts().catch(() => [])
  return <Grid links={storyLinks(posts)} />
}

/**
 * Logo grid, directly under the hero. Customers with a published story
 * (Sanity) link to it: on hover the logo lifts and "Read story" slides in.
 */
export function Logos({ label = logos.label }: { label?: string } = {}) {
  return (
    <Section id="logos" spacing="none" className="pb-(--section-pad)">
      <Container>
        <p className="text-center text-small font-semibold text-ink-muted">{label}</p>
        {/* A hairline grid of ten logos: 5 × 2 (2 columns on phones) */}
        <Suspense fallback={<Grid links={{}} />}>
          <LinkedGrid />
        </Suspense>
      </Container>
    </Section>
  )
}
