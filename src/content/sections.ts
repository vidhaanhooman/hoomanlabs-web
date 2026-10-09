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
  | "product-resources"
  | "product-proof"
  | "product-cta"

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
  { id: "product-resources", name: "FAQs and guides", status: "draft" },
  { id: "product-proof", name: "Proof", status: "draft" },
  { id: "product-cta", name: "Product CTA", status: "draft" },
]

export function sectionMeta(id: SectionId) {
  const meta = [...sections, ...productSections].find((s) => s.id === id)
  if (!meta) throw new Error(`Unknown section: ${id}`)
  return meta
}
