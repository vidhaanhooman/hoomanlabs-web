import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { logos } from "@/content/draft"
import { cn } from "@/lib/utils"

/**
 * Customer logos. Until the official logo files are added (drop SVGs in
 * public/logos/ and set `src`), each customer shows as a typographic
 * wordmark in one muted grey, so the row reads as a set.
 */
type Customer = { name: string; src?: string; className?: string }

const CUSTOMERS: Customer[] = [
  { name: "Vedantu", className: "font-semibold tracking-[-0.02em]" },
  { name: "GIVA", className: "font-semibold tracking-[0.18em]" },
  { name: "Pristyn Care", className: "font-medium tracking-[-0.01em]" },
  { name: "Mosaic Wellness", className: "font-normal tracking-[-0.01em]" },
  { name: "Be10x", className: "font-bold tracking-[-0.03em]" },
  { name: "StayVista", className: "font-medium tracking-[-0.02em]" },
  { name: "SaffronStays", className: "font-medium italic tracking-[-0.01em]" },
  { name: "ShopDeck", className: "font-semibold tracking-[-0.02em]" },
  { name: "ShareChat", className: "font-bold tracking-[-0.02em]" },
]

/** Logo row, directly under the hero. Muted at rest, full ink on hover. */
export function Logos({ label = logos.label }: { label?: string } = {}) {
  return (
    <Section id="logos" spacing="none" className="pb-(--section-pad)">
      <Container>
        <p className="text-center text-small text-ink-muted">{label}</p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 lg:flex-nowrap lg:justify-between lg:gap-x-6">
          {CUSTOMERS.map((c) => (
            <li key={c.name} className="flex h-10 items-center">
              {c.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.src} alt={c.name} className="h-7 w-auto opacity-60 grayscale transition-opacity hover:opacity-100" />
              ) : (
                <span
                  className={cn(
                    "text-[1.3rem] whitespace-nowrap lg:text-[1.2rem] text-ink-muted transition-colors duration-200 ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground",
                    c.className
                  )}
                >
                  {c.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
