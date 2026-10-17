"use client"

import { HumanQaScreen, LearnScreen, TransferScreen } from "@/components/product/human-ai-screens"
import { ProductPanel } from "@/components/sections/how-it-works-v3"
import { humanAiPage as c } from "@/content/pages/human-ai"

const DOCS = "https://docs.hoomanlabs.com"

/** /platform/human-ai's three sections, alternating sides: transfer with context, QA of human calls, learning from transfers. */
export function HumanAiPanels() {
  const { transfer, qa, learn } = c
  return (
    <>
      <ProductPanel id="human-ai-transfer" {...transfer} link="Read about handoffs" linkHref={DOCS} screen={(cls, f) => <TransferScreen className={cls} focus={f} />} />
      <ProductPanel id="human-ai-qa" {...qa} link="See QA" linkHref="/platform/quality" media="start" screen={(cls, f) => <HumanQaScreen className={cls} focus={f} />} />
      <ProductPanel id="human-ai-learn" {...learn} link="Read about learning from transfers" linkHref={DOCS} screen={(cls, f) => <LearnScreen className={cls} focus={f} />} />
    </>
  )
}
