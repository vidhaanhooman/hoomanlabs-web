"use client"

import { TestStepScreen } from "@/components/product/workflow-screens"
import { ProductPanel } from "@/components/sections/how-it-works-v3"
import { workflowsPage as c } from "@/content/pages/workflows"

const DOCS = "https://docs.hoomanlabs.com"

/** Build and test, in the homepage's split ProductPanel. */
export function TestPanel() {
  return <ProductPanel id="workflows-test" {...c.panels.test} link="Read about testing" linkHref={DOCS} media="start" screen={(cls) => <TestStepScreen className={cls} />} />
}
