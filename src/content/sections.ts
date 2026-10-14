/**
 * Page section registry. Order here is render order on the home page.
 *
 * Workflow: every section starts as "draft". When a section is signed off,
 * flip it to "locked". Locked sections are not edited again unless the
 * status is explicitly set back to "draft".
 */
export type SectionStatus = "draft" | "locked"

export type SectionId =
  | "hero"
  | "logos"
  | "build"
  | "test"
  | "deploy-measure"
  | "router"
  | "testimonials"
  | "platform"
  | "listen"
  | "cta"
  // Product page template (shared by /voice-ai, /chat-agents, /qa)
  | "product-hero"
  | "product-feature-1"
  | "product-feature-2"
  | "product-feature-3"
  | "product-how"
  | "product-build"
  | "product-ship"
  | "product-improve"
  | "product-use-cases"
  | "product-call"
  | "product-integrations"
  | "product-agents"
  | "product-manage"
  | "agents-hero"
  | "agents-cta"
  | "product-workflow"
  | "product-simulations"
  | "product-qa"
  | "product-channels"
  | "product-tools"
  | "product-resources"
  | "product-proof"
  | "product-cta"
  // Landing (new homepage structure, /lab/home)
  | "impact"
  | "how"
  | "channels"
  | "security"
  | "integrations"
  | "start"
  | "use-cases"
  | "platform-overview"
  | "voice-samples"
  | "sl-usecases"
  | "sl-outcomes"
  | "sl-stat"
  | "sl-video"
  | "feature-design"
  | "feature-channels"
  | "feature-guardrails"
  | "feature-analytics"
  | "sl-summary"
  | "sl-templates"
  | "sl-stories"
  | "sl-faq"
  | "sl-features"
  | "enterprise-hero"
  | "enterprise-steps"
  | "enterprise-timeline"
  | "enterprise-split"
  | "enterprise-cta"
  // Homepage v3 (/lab/v3)
  | "v3-journey"
  | "v3-customers"
  | "v3-deployments"
  | "v3-agent"
  | "v3-workflow"
  | "v3-talk"
  | "agents-anatomy"
  | "platform-workflow-anatomy"
  // Agents page: one section per question (from the content sheet)
  | "agents-pillars"
  | "agents-listen"
  | "agents-prompt"
  | "agents-can-do"
  | "agents-next"
  | "agents-definition"
  | "agents-knowledge"
  | "agents-around"
  | "workflows-hero"
  | "workflows-triggers"
  | "workflows-followups"
  | "workflows-sync"
  | "workflows-proof"
  | "workflows-related"
  | "workflows-cta"
  | "agents-flows"
  | "agents-tools"
  | "agents-grid"
  | "agents-proof"
  | "agents-integrations"
  | "agents-enterprise"
  | "agents-faq"
  | "voice-hero"
  | "voice-pillars"
  | "voice-sound"
  | "voice-turns"
  | "voice-languages"
  | "voice-wall"
  | "voice-speed"
  | "voice-hear"
  | "voice-grid"
  | "voice-providers"
  | "voice-reliability"
  | "voice-proof"
  | "voice-faq"
  | "voice-related"
  | "voice-cta"
  | "agents-related"

export const sections: { id: SectionId; name: string; status: SectionStatus }[] = [
  { id: "hero", name: "Hero", status: "draft" },
  { id: "logos", name: "Logos", status: "draft" },
  { id: "build", name: "Build panel", status: "draft" },
  { id: "test", name: "Test panel", status: "draft" },
  { id: "deploy-measure", name: "Deploy + Measure", status: "draft" },
  { id: "router", name: "Request router", status: "draft" },
  { id: "testimonials", name: "Testimonials", status: "draft" },
  { id: "platform", name: "Platform", status: "draft" },
  { id: "listen", name: "Hear it", status: "draft" },
  { id: "cta", name: "Final CTA", status: "draft" },
]

/** Product page template. One status per template section, shared by all three products. */
export const productSections: { id: SectionId; name: string; status: SectionStatus }[] = [
  { id: "product-hero", name: "Product hero", status: "draft" },
  { id: "product-feature-1", name: "Feature 1 (split)", status: "draft" },
  { id: "product-feature-2", name: "Feature 2 (mirrored)", status: "draft" },
  { id: "product-feature-3", name: "Feature 3 (wide)", status: "draft" },
  { id: "product-how", name: "How it works", status: "draft" },
  { id: "product-build", name: "Stage: Build", status: "draft" },
  { id: "product-ship", name: "Stage: Ship", status: "draft" },
  { id: "product-improve", name: "Stage: Improve", status: "draft" },
  { id: "product-use-cases", name: "Use cases", status: "draft" },
  { id: "product-call", name: "Stage: On the call", status: "draft" },
  { id: "product-integrations", name: "Integrations", status: "draft" },
  { id: "product-agents", name: "Platform: Agents", status: "draft" },
  { id: "product-manage", name: "Platform: Manage agents (console + MCP)", status: "draft" },
  { id: "agents-hero", name: "Agents page: hero", status: "draft" },
  { id: "agents-cta", name: "Agents page: CTA", status: "draft" },
  { id: "product-workflow", name: "Platform: Workflow", status: "draft" },
  { id: "product-simulations", name: "Platform: Simulations", status: "draft" },
  { id: "product-qa", name: "Platform: QA", status: "draft" },
  { id: "product-channels", name: "Platform: Channels", status: "draft" },
  { id: "product-tools", name: "Platform: Tools & Integrations", status: "draft" },
  { id: "product-resources", name: "FAQs and guides", status: "draft" },
  { id: "product-proof", name: "Proof", status: "draft" },
  { id: "product-cta", name: "Product CTA", status: "draft" },
]

/** New homepage sections (/lab/home), used alongside the existing ones. */
export const landingSections: { id: SectionId; name: string; status: SectionStatus }[] = [
  { id: "impact", name: "Impact numbers", status: "draft" },
  { id: "how", name: "How it works", status: "draft" },
  { id: "channels", name: "Channels", status: "draft" },
  { id: "security", name: "Security & trust", status: "draft" },
  { id: "integrations", name: "Integrations", status: "draft" },
  { id: "start", name: "Two ways to start", status: "draft" },
  { id: "use-cases", name: "Use cases panel", status: "draft" },
  { id: "platform-overview", name: "Platform overview (6 tiles)", status: "draft" },
  { id: "voice-samples", name: "Hear it on real calls (audio A/B)", status: "draft" },
  { id: "sl-usecases", name: "Use-case carousel", status: "draft" },
  { id: "sl-outcomes", name: "Outcomes (3 cards)", status: "draft" },
  { id: "sl-stat", name: "Stat headline", status: "draft" },
  { id: "sl-video", name: "Video case study", status: "draft" },
  { id: "feature-design", name: "Feature: design & workflows", status: "draft" },
  { id: "feature-channels", name: "Feature: omnichannel", status: "draft" },
  { id: "feature-guardrails", name: "Feature: guardrails & testing", status: "draft" },
  { id: "feature-analytics", name: "Feature: analytics", status: "draft" },
  { id: "sl-summary", name: "Platform summary & resources", status: "draft" },
  { id: "sl-templates", name: "Use-case templates", status: "draft" },
  { id: "sl-stories", name: "Customer stories", status: "draft" },
  { id: "sl-faq", name: "FAQ", status: "draft" },
  { id: "sl-features", name: "Platform features (2×2)", status: "draft" },
  { id: "enterprise-hero", name: "Enterprise: hero", status: "draft" },
  { id: "enterprise-steps", name: "Enterprise: build steps", status: "draft" },
  { id: "enterprise-timeline", name: "Enterprise: Gantt timeline", status: "draft" },
  { id: "enterprise-split", name: "Enterprise: who brings what", status: "draft" },
  { id: "enterprise-cta", name: "Enterprise: CTA", status: "draft" },
  { id: "v3-journey", name: "v3: hero journey (inbound / outbound)", status: "draft" },
  { id: "v3-customers", name: "v3: customer cards", status: "draft" },
  { id: "v3-deployments", name: "v3: deployments + enterprise", status: "draft" },
  { id: "v3-agent", name: "v3: how it works (3 steps)", status: "draft" },
  { id: "v3-workflow", name: "v3: workflow", status: "draft" },
  { id: "agents-anatomy", name: "Agents: annotated prompt editor", status: "draft" },
  { id: "platform-workflow-anatomy", name: "Platform: annotated workflow", status: "draft" },
  { id: "v3-talk", name: "v3: talk to an agent", status: "draft" },
  { id: "agents-pillars", name: "Agents: three parts", status: "draft" },
  { id: "agents-listen", name: "Agents: hear it", status: "draft" },
  { id: "agents-prompt", name: "Agents: prompt panel", status: "draft" },
  { id: "agents-can-do", name: "Agents: what it can do (pinned)", status: "draft" },
  { id: "agents-next", name: "Agents: next step", status: "draft" },
  { id: "agents-definition", name: "Agents: definition and proof", status: "draft" },
  { id: "agents-knowledge", name: "Agents: knowledge panel", status: "draft" },
  { id: "agents-around", name: "Agents: everything around the call", status: "draft" },
  { id: "workflows-hero", name: "Workflows: hero", status: "draft" },
  { id: "workflows-triggers", name: "Workflows: chapter, starts on its own", status: "draft" },
  { id: "workflows-followups", name: "Workflows: chapter, follows up", status: "draft" },
  { id: "workflows-sync", name: "Workflows: chapter, updates your systems", status: "draft" },
  { id: "workflows-proof", name: "Workflows: customer proof", status: "draft" },
  { id: "workflows-related", name: "Workflows: works with", status: "draft" },
  { id: "workflows-cta", name: "Workflows: CTA", status: "draft" },
  { id: "agents-flows", name: "Agents: flows deep-dive", status: "draft" },
  { id: "agents-tools", name: "Agents: tools deep-dive", status: "draft" },
  { id: "agents-grid", name: "Agents: everything around the call", status: "draft" },
  { id: "agents-proof", name: "Agents: customer proof", status: "draft" },
  { id: "agents-integrations", name: "Agents: integrations", status: "draft" },
  { id: "agents-enterprise", name: "Agents: enterprise readiness", status: "draft" },
  { id: "agents-faq", name: "Agents: FAQ", status: "draft" },
  { id: "voice-hero", name: "Voice page: hero", status: "draft" },
  { id: "voice-pillars", name: "Voice: three parts", status: "draft" },
  { id: "voice-sound", name: "Voice: voices deep-dive", status: "draft" },
  { id: "voice-turns", name: "Voice: turn-taking deep-dive", status: "draft" },
  { id: "voice-languages", name: "Voice: languages deep-dive", status: "draft" },
  { id: "voice-wall", name: "Voice: language wall", status: "draft" },
  { id: "voice-speed", name: "Voice: speed deep-dive", status: "draft" },
  { id: "voice-hear", name: "Voice: hear it", status: "draft" },
  { id: "voice-grid", name: "Voice: tuned for real calls", status: "draft" },
  { id: "voice-providers", name: "Voice: providers", status: "draft" },
  { id: "voice-reliability", name: "Voice: reliability", status: "draft" },
  { id: "voice-proof", name: "Voice: proof", status: "draft" },
  { id: "voice-faq", name: "Voice: FAQ", status: "draft" },
  { id: "voice-related", name: "Voice: works with", status: "draft" },
  { id: "voice-cta", name: "Voice: CTA", status: "draft" },
  { id: "agents-related", name: "Agents: works with", status: "draft" },
]

export function sectionMeta(id: SectionId) {
  const meta = [...sections, ...productSections, ...landingSections].find((s) => s.id === id)
  if (!meta) throw new Error(`Unknown section: ${id}`)
  return meta
}
