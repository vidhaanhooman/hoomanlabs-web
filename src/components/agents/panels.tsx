"use client"

import { FlowStory } from "@/components/agents/flow-story"
import { ContextScreen, ScaleScreen } from "@/components/product/agent-screens"
import { PromptEditor } from "@/components/product/prompt-editor"
import { ProductPanel } from "@/components/sections/how-it-works-v3"
import { agentsPage as c } from "@/content/pages/agents"

const DOCS = "https://docs.hoomanlabs.com"

/**
 * The product sections of /platform/agents: Prompt in the homepage's
 * ProductPanel (copy with rows beside its screen), Flow full width, then
 * Context & actions and Production ready as panels on alternating sides.
 * (The Skills diagram, components/agents/skills.tsx, is off the page for now.)
 */
export function AgentPanels() {
  const { job, context, scale } = c.panels
  return (
    <>
      <ProductPanel id="agents-prompt" {...job} link="Read the prompt guide" linkHref={DOCS} screen={(cls) => <PromptEditor className={cls} />} />
      <FlowStory />
      <ProductPanel id="agents-context" {...context} link="Read about context and tools" linkHref={DOCS} media="start" screen={(cls, f) => <ContextScreen className={cls} focus={f} />} />
      <ProductPanel id="agents-scale" {...scale} link="Read about versions" linkHref={DOCS} screen={(cls, f) => <ScaleScreen className={cls} focus={f} />} />
    </>
  )
}
