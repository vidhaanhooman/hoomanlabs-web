import { Faq } from "@/components/product-page/faq"
import { Definition, NextStep } from "@/components/product-page/page-bits"
import { Logos } from "@/components/sections/logos"
import { TwoWayCta } from "@/components/sections/two-way-cta"
import { MysteryCallers } from "@/components/testing/mystery-callers"
import { TestingPanels } from "@/components/testing/panels"
import { TestingHero } from "@/components/testing/sections"
import { testingPage as c } from "@/content/pages/testing"

/**
 * /platform/testing, following the content sheet in the homepage's
 * language (like the other product pages): floating hero, logos,
 * definition, mystery callers (full width), spot checks, test suites and
 * versions, never-again tests, try it now, FAQ, next step and the two-way
 * close.
 */

/** The homepage's roomier section spacing. */
const ROOMY = {
  "--section-gap": "clamp(3.25rem, 2.25rem + 3vw, 5rem)",
  "--section-pad": "calc(var(--section-gap) / 2)",
} as React.CSSProperties

export function TestingPage() {
  return (
    <div style={ROOMY}>
      <TestingHero />
      <Logos label="Trusted by 100+ teams" />
      <Definition id="testing-definition" text={c.definition} />
      <MysteryCallers />
      <TestingPanels />
      <Faq id="testing-faq" items={c.faq} />
      <NextStep id="testing-next" related={c.related} />
      <TwoWayCta />
    </div>
  )
}
