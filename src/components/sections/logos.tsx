import {
  siAirbnb,
  siAsana,
  siAtlassian,
  siDeliveroo,
  siDoordash,
  siDropbox,
  siFigma,
  siHubspot,
  siShopify,
  siSpotify,
  siStripe,
  siZendesk,
  type SimpleIcon,
} from "simple-icons"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { logos } from "@/content/draft"

// SAMPLE logos to judge the treatment. Replace with real customers (with
// permission) before anything ships.
// 12 logos = 2 rows of 6 on desktop.
const SAMPLE_LOGOS: SimpleIcon[] = [
  siShopify,
  siAirbnb,
  siStripe,
  siHubspot,
  siDoordash,
  siSpotify,
  siFigma,
  siAtlassian,
  siDropbox,
  siDeliveroo,
  siAsana,
  siZendesk,
]

/**
 * Logo wall, directly under the hero. Greyscale at rest; each logo takes its
 * brand colour on hover (pointer devices only, so taps don't leave it coloured).
 */
export function Logos() {
  return (
    <Section id="logos" spacing="none" className="pb-(--section-pad)">
      <Container>
        <p className="text-center text-small text-ink-muted">{logos.label}</p>
        <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-3 lg:grid-cols-6">
          {SAMPLE_LOGOS.map((icon) => (
            <li key={icon.slug}>
              <span
                style={{ "--brand": `#${icon.hex}` } as React.CSSProperties}
                className="group/logo flex h-14 items-center justify-center gap-2.5 text-ink-muted transition-colors duration-200 ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground"
              >
                <svg
                  role="img"
                  aria-label={icon.title}
                  viewBox="0 0 24 24"
                  className="size-6 shrink-0 fill-current transition-colors duration-200 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover/logo:fill-(--brand)"
                >
                  <path d={icon.path} />
                </svg>
                <span aria-hidden className="text-body font-medium tracking-[-0.01em]">
                  {icon.title}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
