"use client"

import { ProductPanel } from "@/components/sections/how-it-works-v3"
import { AbScreen, ReplayScreen } from "@/components/product/testing-screens"
import { TryItScreen } from "@/components/testing/try-it"
import { testingPage as c } from "@/content/pages/testing"

const DOCS = "https://docs.hoomanlabs.com"

/** Try it now, first: build an agent and talk to it on a web call. */
export function TryPanel() {
  return <ProductPanel id="testing-try" {...c.try} link="Read about testing your Hooman" linkHref={DOCS} screen={(cls, f) => <TryItScreen className={cls} focus={f} />} />
}

/** Spot checks & replay, then A/B testing, alternating sides. */
export function TestingPanels() {
  const { checks, ab } = c.panels
  return (
    <>
      <ProductPanel id="testing-checks" {...checks} link="Read about spot checks" linkHref={DOCS} media="start" screen={(cls, f) => <ReplayScreen className={cls} focus={f} />} />
      <ProductPanel id="testing-ab" {...ab} link="Read about A/B testing" linkHref={DOCS} screen={(cls, f) => <AbScreen className={cls} focus={f} />} />
    </>
  )
}
