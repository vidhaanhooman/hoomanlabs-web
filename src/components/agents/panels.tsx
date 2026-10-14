"use client"

import { FlowStory } from "@/components/agents/flow-story"
import { KnowledgeScreens } from "@/components/agents/knowledge-screens"
import { PromptEditor } from "@/components/product/prompt-editor"
import { ProductPanel } from "@/components/sections/how-it-works-v3"
import { agentsPage as c } from "@/content/pages/agents"

const DOCS = "https://docs.hoomanlabs.com"

/**
 * The product sections of /platform/agents: Job description and Knowledge in
 * the homepage's ProductPanel (copy with rows beside its screen), then Flow
 * full width. (The Skills diagram, components/agents/skills.tsx, is off the
 * page for now.)
 */
export function AgentPanels() {
  const { job, knowledge } = c.panels
  return (
    <>
      <ProductPanel id="agents-prompt" {...job} link="Read the prompt guide" linkHref={DOCS} screen={(cls) => <PromptEditor className={cls} />} />
      <ProductPanel
        id="agents-knowledge"
        {...knowledge}
        link="Read about knowledge"
        linkHref={DOCS}
        media="start"
        screen={(cls, f) => <KnowledgeScreens className={cls} focus={f} />}
      />
      <FlowStory />
    </>
  )
}
