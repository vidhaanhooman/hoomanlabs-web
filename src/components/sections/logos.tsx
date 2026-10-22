import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { logos } from "@/content/draft"
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
  /** Has light shapes inside (white cut-outs, pale fills): grey it by tone,
   *  not as a flat silhouette, so the inner detail survives. */
  detail?: boolean
  className?: string
}

const CUSTOMERS: Customer[] = [
  { name: "Lenskart", src: "/logos/Lenskart.svg", full: [159.56, 22.11], crop: [0, 0, 159.56, 22.11] },
  { name: "GIVA", src: "/logos/giva-dark.svg", full: [848, 273], crop: [10.6, 16.9, 826.6, 239.5] },
  { name: "Pristyn Care", src: "/logos/Pristyn.svg", full: [3840, 950], crop: [0, 0, 3840, 946.2], scale: 1.2 },
  { name: "Mosaic Wellness", src: "/logos/mosaic-mono.svg", full: [1969, 1969], crop: [0, 728.5, 1969, 513.5], detail: true },
  { name: "Be10x", src: "/logos/Be10X.svg", full: [639, 361], crop: [0, 0, 639, 361] },
  { name: "StayVista", src: "/logos/stayvista-wordmark.svg", full: [187, 85], crop: [0, 0, 187, 85] },
  { name: "SaffronStays", src: "/logos/SaffronStays_vector.svg", full: [410, 120], crop: [24.7, 16.4, 368.1, 85.6], scale: 1.2 },
  { name: "ShopDeck", src: "/logos/shopdeck-mono.svg", full: [2168, 725], crop: [0, 155.8, 2168, 413.7], detail: true },
  { name: "Vedantu", src: "/logos/Vedantu_idqes6hbls_0.svg", full: [210.8, 80], crop: [19, 6.5, 172.5, 47] },
  { name: "ShareChat", src: "/logos/ShareChat_idbYpuBuC1_0.svg", full: [1390.35, 375.16], crop: [0, 0, 1390.3, 375.2], detail: true },
]

/** Display width for a logo of this aspect ratio, in px. */
const width = (w: number, h: number, scale = 1) => Math.round(50 * scale * Math.sqrt(w / h))

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

/** Logo grid, directly under the hero. */
export function Logos({ label = logos.label }: { label?: string } = {}) {
  return (
    <Section id="logos" spacing="none" className="pb-(--section-pad)">
      <Container>
        <p className="text-center text-small text-ink-muted">{label}</p>
        {/* A hairline grid of ten logos: 5 × 2 (2 columns on phones) */}
        <ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-5">
          {CUSTOMERS.map((c) => (
            <li key={c.name} className="group/logo flex h-24 items-center justify-center bg-background transition-colors duration-200 hover:bg-surface sm:h-28">
              <Logo c={c} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
