import {
  ClockCounterClockwiseIcon,
  ClockIcon,
  DatabaseIcon,
  GitBranchIcon,
  IdentificationCardIcon,
  MegaphoneIcon,
  NotePencilIcon,
  PhoneCallIcon,
  PhoneTransferIcon,
  RobotIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr"
import { siGooglecalendar, siZendesk, siZoho } from "simple-icons"

import { FeatureGrid, FeaturePanel, IntegrationsStrip, PageHero, Pillars, Proof, Showcase, TrustRow, WorksWith } from "@/components/product-page/blocks"
import { Faq } from "@/components/product-page/faq"
import { AgentAnatomy } from "@/components/product/agent-anatomy"
import { FlowsDiagram, LiveCallScreen } from "@/components/product/agent-visuals"
import { AgentBuilderScreen } from "@/components/sections/how-it-works-v3"
import { FinalCta } from "@/components/sections/final-cta"
import { Logos } from "@/components/sections/logos"
import { agentsPage as c } from "@/content/pages/agents"

/**
 * /platform/agents, in the product-page structure: hero with the demo CTA,
 * customer logos, the idea in three parts, three deep-dives (the pinned
 * prompt, flows, tools mid-call), a compact grid, proof, integrations,
 * enterprise readiness, FAQ, neighbouring pages and the closing CTA.
 */

const PILLAR_ICONS = [NotePencilIcon, DatabaseIcon, SlidersHorizontalIcon]
const GRID_ICONS = [MegaphoneIcon, ClockCounterClockwiseIcon, IdentificationCardIcon, PhoneTransferIcon, ClockIcon, GitBranchIcon, PhoneCallIcon, RobotIcon]
const TRUST_ICONS = [ShieldCheckIcon, UsersThreeIcon, PhoneCallIcon, IdentificationCardIcon]

export function AgentsPage() {
  return (
    <>
      <PageHero
        id="agents-hero"
        crumb={c.crumb}
        title={c.title}
        line={c.line}
        cta
        screen={(cls) => <AgentBuilderScreen className={cls} focus="all" />}
      />
      <Logos label="Trusted by 100+ teams" />
      <Pillars id="agents-pillars" items={c.pillars.map((p, i) => ({ ...p, icon: PILLAR_ICONS[i] }))} />

      <Showcase id="agents-anatomy" title={c.prompt.title} line={c.prompt.line}>
        <AgentAnatomy />
      </Showcase>
      <FeaturePanel
        id="agents-flows"
        q={c.flows}
        screen={() => (
          <div className="absolute inset-0 flex items-center bg-[radial-gradient(circle,var(--line-strong)_1px,transparent_1px)] [background-size:14px_14px] p-5 sm:p-8">
            <FlowsDiagram />
          </div>
        )}
      />
      <FeaturePanel id="agents-tools" q={c.tools} flip screen={(cls) => <LiveCallScreen className={cls} />} />

      <FeatureGrid id="agents-grid" title={c.grid.title} items={c.grid.items.map((f, i) => ({ ...f, icon: GRID_ICONS[i] }))} />
      <Proof id="agents-proof" {...c.proof} placeholder />
      <IntegrationsStrip
        id="agents-integrations"
        title={c.integrations.title}
        line={c.integrations.line}
        logos={[
          { name: "Zoho CRM", icon: siZoho },
          { name: "Freshdesk" },
          { name: "Zendesk", icon: siZendesk },
          { name: "Google Calendar", icon: siGooglecalendar },
          { name: "Your APIs" },
          { name: "MCP" },
        ]}
        more="integrations"
      />
      <TrustRow id="agents-enterprise" title={c.enterprise.title} items={c.enterprise.items.map((t, i) => ({ ...t, icon: TRUST_ICONS[i] }))} more="security" />
      <Faq id="agents-faq" items={c.faq} />
      <WorksWith id="agents-related" pages={c.related} />
      <FinalCta id="agents-cta" title="Build your first Hooman with us." />
    </>
  )
}
