"use client"

import { ProductPanel } from "@/components/sections/how-it-works-v3"
import { NeverAgainScreen, SpotCheckScreen, SuiteScreen, TryItScreen } from "@/components/product/testing-screens"
import { testingPage as c } from "@/content/pages/testing"

const DOCS = "https://docs.hoomanlabs.com"

/** Split panels in the homepage's ProductPanel, alternating sides. */
export function TestingPanels() {
  const { checks, suites, never, try: tryIt } = c.panels
  return (
    <>
      <ProductPanel id="testing-checks" {...checks} link="Read about spot checks" linkHref={DOCS} screen={(cls) => <SpotCheckScreen className={cls} />} />
      <ProductPanel id="testing-suites" {...suites} link="Read about test suites" linkHref={DOCS} media="start" screen={(cls) => <SuiteScreen className={cls} />} />
      <ProductPanel id="testing-never" {...never} link="Read about never-again tests" linkHref={DOCS} screen={(cls) => <NeverAgainScreen className={cls} />} />
      <ProductPanel id="testing-try" {...tryIt} link="Read about testing your Hooman" linkHref={DOCS} media="start" screen={(cls) => <TryItScreen className={cls} />} />
    </>
  )
}
