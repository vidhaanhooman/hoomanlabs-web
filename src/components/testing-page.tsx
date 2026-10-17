import { Faq } from "@/components/product-page/faq"
import { Definition, NextStep } from "@/components/product-page/page-bits"
import { MysteryCallers } from "@/components/testing/mystery-callers"
import { TestingPanels, TryPanel } from "@/components/testing/panels"
import { TestingHero } from "@/components/testing/sections"
import { testingPage as c } from "@/content/pages/testing"

/**
 * /platform/testing, following the content sheet in the homepage's
 * language (like the other product pages): floating hero, definition, then
 * try it now (a web call), simulations and test suites (full width), spot
 * checks and replay, A/B testing (inbound and outbound), FAQ, next step.
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
      <Definition id="testing-definition" text={c.definition} />
      <TryPanel />
      <MysteryCallers />
      <TestingPanels />
      <Faq id="testing-faq" items={c.faq} />
      <NextStep id="testing-next" related={c.related} />
    </div>
  )
}
