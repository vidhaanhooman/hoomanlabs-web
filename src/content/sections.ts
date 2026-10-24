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
  | "v3-stories"
  | "v3-industries"
  | "v3-start"
  | "v3-agent"
  | "v3-workflow"
  | "v3-analytics"
  | "v3-talk"
  | "agents-anatomy"
  | "platform-workflow-anatomy"
  // Agents page: one section per question (from the content sheet)
  | "agents-pillars"
  | "agents-listen"
  | "agents-prompt"
  | "integrations-hero"
  | "integrations-definition"
  | "integrations-connect"
  | "integrations-actions"
  | "integrations-webhooks"
  | "integrations-systems"
  | "integrations-faq"
  | "integrations-next"
  | "channels-hero"
  | "channels-definition"
  | "channels-devices"
  | "channels-voice"
  | "channels-chat"
  | "channels-journey"
  | "channels-faq"
  | "channels-next"
  | "workflows-types"
  | "workflows-tools"
  | "workflows-blocks"
  | "voice-nodes"
  | "blog-hero"
  | "blog-featured"
  | "blog-posts"
  | "blog-newsletter"
  | "post-hero"
  | "post-body"
  | "post-related"
  | "privacy-body"
  | "terms-body"
  | "about-hero"
  | "about-story"
  | "about-principles"
  | "about-contact"
  | "careers-hero"
  | "careers-roles"
  | "role-hero"
  | "role-body"
  | "role-process"
  | "pricing-hero"
  | "pricing-plans"
  | "pricing-compare"
  | "pricing-included"
  | "pricing-platform"
  | "pricing-faq"
  | "industry-hero"
  | "industry-segments"
  | "industry-definition"
  | "industry-problem"
  | "industry-problem-list"
  | "industry-changes"
  | "industry-moment-1"
  | "industry-moment-2"
  | "industry-moment-3"
  | "industry-next"
  | "industry-meet"
  | "industry-solve"
  | "industry-outcome"
  | "industry-quote"
  | "industry-trust"
  | "industry-faq"
  | "ds-definition"
  | "ds-faq"
  | "ds-next"
  | "testing-hero"
  | "testing-definition"
  | "testing-callers"
  | "testing-checks"
  | "testing-ab"
  | "testing-try"
  | "testing-faq"
  | "testing-next"
  | "quality-hero"
  | "quality-definition"
  | "quality-analytics"
  | "quality-judges"
  | "quality-humans"
  | "quality-fault"
  | "quality-faq"
  | "observability-hero"
  | "observability-definition"
  | "observability-dashboards"
  | "observability-alerts"
  | "observability-logs"
  | "observability-faq"
  | "observability-next"
  | "human-ai-hero"
  | "human-ai-definition"
  | "human-ai-transfer"
  | "human-ai-qa"
  | "human-ai-learn"
  | "human-ai-faq"
  | "human-ai-next"
  | "quality-next"
  | "security-hero"
  | "security-definition"
  | "security-failover"
  | "security-guardrails"
  | "security-roles"
  | "security-telecom"
  | "security-data"
  | "security-faq"
  | "security-next"
  | "campaigns-hero"
  | "campaigns-definition"
  | "campaigns-list"
  | "campaigns-realtime"
  | "campaigns-run"
  | "campaigns-features"
  | "campaigns-faq"
  | "campaigns-next"
  | "workflows-hero"
  | "workflows-definition"
  | "workflows-explainer"
  | "workflows-days"
  | "workflows-test"
  | "workflows-faq"
  | "workflows-next"
  | "workflows-cta"
  | "agents-can-do"
  | "agents-next"
  | "agents-definition"
  | "agents-types"
  | "agents-context"
  | "agents-scale"
  | "agents-flows"
  | "agents-tools"
  | "agents-grid"
  | "agents-proof"
  | "agents-integrations"
  | "agents-enterprise"
  | "agents-faq"
  | "voice-hero"
  | "voice-next"
  | "voice-say"
  | "voice-studio"
  | "voice-definition"
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
  { id: "v3-stories", name: "v3: customer stories", status: "draft" },
  { id: "v3-industries", name: "v3: industries", status: "draft" },
  { id: "v3-start", name: "v3: get started (self-serve + enterprise)", status: "draft" },
  { id: "v3-agent", name: "v3: how it works (3 steps)", status: "draft" },
  { id: "v3-workflow", name: "v3: workflow", status: "draft" },
  { id: "v3-analytics", name: "v3: analytics", status: "draft" },
  { id: "agents-anatomy", name: "Agents: annotated prompt editor", status: "draft" },
  { id: "platform-workflow-anatomy", name: "Platform: annotated workflow", status: "draft" },
  { id: "v3-talk", name: "v3: talk to an agent", status: "draft" },
  { id: "agents-pillars", name: "Agents: three parts", status: "draft" },
  { id: "agents-listen", name: "Agents: hear it", status: "draft" },
  { id: "agents-prompt", name: "Agents: prompt panel", status: "draft" },
  { id: "integrations-hero", name: "Integrations: hero", status: "draft" },
  { id: "integrations-definition", name: "Integrations: definition", status: "draft" },
  { id: "integrations-connect", name: "Integrations: connect anything (before, during, workflows)", status: "draft" },
  { id: "integrations-actions", name: "Integrations: take actions (API and MCP)", status: "draft" },
  { id: "integrations-webhooks", name: "Integrations: webhooks at key events", status: "draft" },
  { id: "integrations-systems", name: "Integrations: already integrated", status: "draft" },
  { id: "integrations-faq", name: "Integrations: FAQ", status: "draft" },
  { id: "integrations-next", name: "Integrations: next step", status: "draft" },
  { id: "channels-hero", name: "Channels: hero", status: "draft" },
  { id: "channels-definition", name: "Channels: definition and proof", status: "draft" },
  { id: "channels-devices", name: "Channels: one agent on every surface (devices)", status: "draft" },
  { id: "channels-voice", name: "Channels: voice (phone, app, WhatsApp)", status: "draft" },
  { id: "channels-chat", name: "Channels: chat (web, app, WhatsApp)", status: "draft" },
  { id: "channels-journey", name: "Channels: one customer across channels", status: "draft" },
  { id: "channels-faq", name: "Channels: FAQ", status: "draft" },
  { id: "channels-next", name: "Channels: next step", status: "draft" },
  { id: "workflows-types", name: "Workflows: two kinds", status: "draft" },
  { id: "workflows-tools", name: "Workflows: as tools", status: "draft" },
  { id: "workflows-blocks", name: "Workflows: building blocks", status: "draft" },
  { id: "voice-nodes", name: "Voice: tuned per node", status: "draft" },
  { id: "blog-hero", name: "Blog: hero", status: "draft" },
  { id: "blog-featured", name: "Blog: featured post", status: "draft" },
  { id: "blog-posts", name: "Blog: all posts", status: "draft" },
  { id: "blog-newsletter", name: "Blog: newsletter", status: "draft" },
  { id: "post-hero", name: "Post: header", status: "draft" },
  { id: "post-body", name: "Post: body", status: "draft" },
  { id: "post-related", name: "Post: related posts", status: "draft" },
  { id: "privacy-body", name: "Privacy Policy: text", status: "draft" },
  { id: "terms-body", name: "Terms: text", status: "draft" },
  { id: "about-hero", name: "About: hero", status: "draft" },
  { id: "about-story", name: "About: our story", status: "draft" },
  { id: "about-principles", name: "About: how we build", status: "draft" },
  { id: "about-contact", name: "About: contact", status: "draft" },
  { id: "careers-hero", name: "Careers: hero", status: "draft" },
  { id: "careers-roles", name: "Careers: open roles", status: "draft" },
  { id: "role-hero", name: "Role: hero", status: "draft" },
  { id: "role-body", name: "Role: details", status: "draft" },
  { id: "role-process", name: "Role: hiring process", status: "draft" },
  { id: "pricing-hero", name: "Pricing: hero", status: "draft" },
  { id: "pricing-plans", name: "Pricing: plans", status: "draft" },
  { id: "pricing-compare", name: "Pricing: compare", status: "draft" },
  { id: "pricing-included", name: "Pricing: platform heading", status: "draft" },
  { id: "pricing-platform", name: "Pricing: platform pages", status: "draft" },
  { id: "pricing-faq", name: "Pricing: FAQ", status: "draft" },
  { id: "industry-hero", name: "Industry: hero", status: "draft" },
  { id: "industry-segments", name: "Industry: everything it takes on", status: "draft" },
  { id: "industry-definition", name: "Industry: today (definition)", status: "draft" },
  { id: "industry-problem", name: "Industry: problems heading", status: "draft" },
  { id: "industry-problem-list", name: "Industry: problems", status: "draft" },
  { id: "industry-changes", name: "Industry: the three changes (panel)", status: "draft" },
  { id: "industry-moment-1", name: "Industry: moment 1", status: "draft" },
  { id: "industry-moment-2", name: "Industry: moment 2", status: "draft" },
  { id: "industry-moment-3", name: "Industry: moment 3", status: "draft" },
  { id: "industry-next", name: "Industry: next step", status: "draft" },
  { id: "industry-meet", name: "Industry: meet Ria", status: "draft" },
  { id: "industry-solve", name: "Industry: follow one call", status: "draft" },
  { id: "industry-outcome", name: "Industry: results", status: "draft" },
  { id: "industry-quote", name: "Industry: customer quote", status: "draft" },
  { id: "industry-trust", name: "Industry: trust badges", status: "draft" },
  { id: "industry-faq", name: "Industry: FAQ", status: "draft" },
  { id: "ds-definition", name: "Components: definition demo", status: "draft" },
  { id: "ds-faq", name: "Components: FAQ demo", status: "draft" },
  { id: "ds-next", name: "Components: next step demo", status: "draft" },
  { id: "testing-hero", name: "Testing: hero", status: "draft" },
  { id: "testing-definition", name: "Testing: definition", status: "draft" },
  { id: "testing-callers", name: "Testing: simulations and test suites", status: "draft" },
  { id: "testing-checks", name: "Testing: spot checks and replay", status: "draft" },
  { id: "testing-ab", name: "Testing: A/B testing", status: "draft" },
  { id: "testing-try", name: "Testing: try it now", status: "draft" },
  { id: "testing-faq", name: "Testing: FAQ", status: "draft" },
  { id: "testing-next", name: "Testing: next step", status: "draft" },
  { id: "quality-hero", name: "Quality: hero", status: "draft" },
  { id: "quality-definition", name: "Quality: definition", status: "draft" },
  { id: "quality-analytics", name: "Quality: post-conversation analytics", status: "draft" },
  { id: "quality-judges", name: "Quality: advanced metrics, four judges", status: "draft" },
  { id: "quality-humans", name: "Quality: team review", status: "draft" },
  { id: "quality-fault", name: "Quality: failure modes and fixes", status: "draft" },
  { id: "quality-faq", name: "Quality: FAQ", status: "draft" },
  { id: "quality-next", name: "Quality: next step", status: "draft" },
  { id: "observability-hero", name: "Observability: hero", status: "draft" },
  { id: "observability-definition", name: "Observability: definition", status: "draft" },
  { id: "observability-dashboards", name: "Observability: dashboards", status: "draft" },
  { id: "observability-alerts", name: "Observability: alerts", status: "draft" },
  { id: "observability-logs", name: "Observability: conversation logs", status: "draft" },
  { id: "observability-faq", name: "Observability: FAQ", status: "draft" },
  { id: "observability-next", name: "Observability: next step", status: "draft" },
  { id: "human-ai-hero", name: "Human + AI: hero", status: "draft" },
  { id: "human-ai-definition", name: "Human + AI: definition", status: "draft" },
  { id: "human-ai-transfer", name: "Human + AI: transfer with context", status: "draft" },
  { id: "human-ai-qa", name: "Human + AI: QA of human calls", status: "draft" },
  { id: "human-ai-learn", name: "Human + AI: learn from transfers", status: "draft" },
  { id: "human-ai-faq", name: "Human + AI: FAQ", status: "draft" },
  { id: "human-ai-next", name: "Human + AI: next step", status: "draft" },
  { id: "security-hero", name: "Security: hero", status: "draft" },
  { id: "security-definition", name: "Security: definition", status: "draft" },
  { id: "security-failover", name: "Security: always on", status: "draft" },
  { id: "security-guardrails", name: "Security: call guardrails", status: "draft" },
  { id: "security-roles", name: "Security: workspaces and roles", status: "draft" },
  { id: "security-telecom", name: "Security: telecom compliance", status: "draft" },
  { id: "security-data", name: "Security: your data", status: "draft" },
  { id: "security-faq", name: "Security: FAQ", status: "draft" },
  { id: "security-next", name: "Security: next step", status: "draft" },
  { id: "campaigns-hero", name: "Campaigns: hero", status: "draft" },
  { id: "campaigns-definition", name: "Campaigns: definition and proof", status: "draft" },
  { id: "campaigns-list", name: "Campaigns: list panel", status: "draft" },
  { id: "campaigns-realtime", name: "Campaigns: always-on panel", status: "draft" },
  { id: "campaigns-run", name: "Campaigns: a campaign running", status: "draft" },
  { id: "campaigns-features", name: "Campaigns: six built-in features", status: "draft" },
  { id: "campaigns-faq", name: "Campaigns: FAQ", status: "draft" },
  { id: "campaigns-next", name: "Campaigns: next step", status: "draft" },
  { id: "workflows-hero", name: "Workflows: hero", status: "draft" },
  { id: "workflows-definition", name: "Workflows: definition and proof", status: "draft" },
  { id: "workflows-explainer", name: "Workflows: how a workflow works", status: "draft" },
  { id: "workflows-days", name: "Workflows: follows a customer over days", status: "draft" },
  { id: "workflows-test", name: "Workflows: build and test panel", status: "draft" },
  { id: "workflows-faq", name: "Workflows: FAQ", status: "draft" },
  { id: "workflows-next", name: "Workflows: next step", status: "draft" },
  { id: "workflows-cta", name: "Workflows: CTA", status: "draft" },
  { id: "agents-can-do", name: "Agents: what it can do (pinned)", status: "draft" },
  { id: "agents-next", name: "Agents: next step", status: "draft" },
  { id: "agents-definition", name: "Agents: definition and proof", status: "draft" },
  { id: "agents-types", name: "Agents: types (voice, chat, broadcast)", status: "draft" },
  { id: "agents-context", name: "Agents: context & actions panel", status: "draft" },
  { id: "agents-scale", name: "Agents: production ready panel", status: "draft" },
  { id: "agents-flows", name: "Agents: flows deep-dive", status: "draft" },
  { id: "agents-tools", name: "Agents: tools deep-dive", status: "draft" },
  { id: "agents-grid", name: "Agents: everything around the call", status: "draft" },
  { id: "agents-proof", name: "Agents: customer proof", status: "draft" },
  { id: "agents-integrations", name: "Agents: integrations", status: "draft" },
  { id: "agents-enterprise", name: "Agents: enterprise readiness", status: "draft" },
  { id: "agents-faq", name: "Agents: FAQ", status: "draft" },
  { id: "voice-hero", name: "Voice page: hero", status: "draft" },
  { id: "voice-definition", name: "Voice: definition and proof", status: "draft" },
  { id: "voice-studio", name: "Voice: studio", status: "draft" },
  { id: "voice-say", name: "Voice: pronunciation", status: "draft" },
  { id: "voice-next", name: "Voice: next step", status: "draft" },
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
