import Image from "next/image"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { AnalyticsScreen } from "@/components/product/analytics-screen"
import { CampaignScreen } from "@/components/product/campaign-screen"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { panels } from "@/content/draft"

/**
 * Breaks the split-panel rhythm: two panels side by side, unequal widths
 * (7/5), copy on top, visual below. Visuals sit on abstract painted colour
 * fields (not landscapes) so the page doesn't repeat the hero's scenery.
 */
export function DeployMeasure() {
  const items = [
    {
      ...panels.deploy,
      Screen: CampaignScreen,
      backdrop: "/art/backdrops/home-deploy.png",
      span: "lg:col-span-7",
      sizes: "(min-width: 1300px) 700px, (min-width: 1024px) 55vw, 100vw",
    },
    {
      ...panels.measure,
      Screen: AnalyticsScreen,
      backdrop: "/art/backdrops/home-measure.png",
      span: "lg:col-span-5",
      sizes: "(min-width: 1300px) 500px, (min-width: 1024px) 40vw, 100vw",
    },
  ]
  return (
    <Section id="deploy-measure" spacing="tight">
      <Container className="grid gap-3 lg:grid-cols-12">
        {items.map((item) => (
          <Panel key={item.title} className={`flex flex-col gap-8 p-4 sm:p-6 lg:p-8 ${item.span}`}>
            <div className="flex flex-col gap-5">
              <h2 className="max-w-[34ch] text-h3 font-normal">
                {item.title}
                <span className="block text-ink-secondary">{item.body}</span>
              </h2>
              <TextLink href="#">{item.link}</TextLink>
            </div>
            <div className="relative isolate flex flex-1 flex-col overflow-hidden rounded-md p-4 sm:p-6 lg:p-7">
              <Image src={item.backdrop} alt="" fill sizes={item.sizes} className="-z-10 object-cover" />
              <item.Screen className="min-h-72 flex-1 rounded-md border border-black/10 shadow-[0_20px_50px_-24px_oklch(0.25_0.03_150/0.55)] sm:min-h-80" />
            </div>
          </Panel>
        ))}
      </Container>
    </Section>
  )
}
