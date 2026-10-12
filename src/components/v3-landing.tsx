
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { HeroScene } from "@/components/lab/hero-scene"
import { FlowArrowIcon, GitBranchIcon, LightningIcon } from "@phosphor-icons/react/dist/ssr"

import { WorkflowCanvas } from "@/components/product/flow-canvas"
import { AgentAnatomy } from "@/components/product/agent-anatomy"
import { Logos } from "@/components/sections/logos"
import { OutcomeDiagrams } from "@/components/sections/outcome-diagrams"
import {
  CustomerStories,
  HomeFaq,
  StatHeadline,
} from "@/components/sections/structure"
import { UseCaseStory } from "@/components/sections/use-case-story"
import { StartResources } from "@/components/sections/start-resources"
import { TwoWayCta } from "@/components/sections/two-way-cta"
import { V3Hero } from "@/components/sections/v3-hero"
import { VoiceWidget } from "@/components/sections/voice-widget"
import { enterpriseBuild } from "@/content/landing"
import { useCases } from "@/content/platform"

/**
 * Homepage v3 (/lab/v3), FIRST PASS: the new order, built from existing
 * sections. Hero journey, deployment cards and the agent-builder animation
 * get their full versions next.
 *
 * hero (journey) · logos + customer cards · deployments + enterprise ·
 * outcomes + stat · agent builder · workflow · everything in one platform ·
 * solutions · talk to an agent · FAQ · closing CTA · voice widget
 */

const ROOMY = {
  "--section-gap": "clamp(3.25rem, 2.25rem + 3vw, 5rem)",
  "--section-pad": "calc(var(--section-gap) / 2)",
} as React.CSSProperties

function Header({ title, body, aside }: { title: string; body?: string; aside?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
      <div className="flex max-w-[44rem] flex-col gap-3">
        <h2 className="text-h2 font-normal">{title}</h2>
        {body && <p className="text-body text-ink-secondary">{body}</p>}
      </div>
      {aside}
    </div>
  )
}

/** What the workflow canvas is made of. */
const WORKFLOW_PARTS = [
  { icon: LightningIcon, title: "Triggers", body: "Start a run when something happens.", eg: "call.ended · form.submitted" },
  { icon: GitBranchIcon, title: "Branches", body: "Take a different path on what the call found.", eg: "if unanswered · if payment failed" },
  { icon: FlowArrowIcon, title: "Actions", body: "Update your systems, message and retry.", eg: "push_to_CRM · send_summary" },
]

/** The three deployments shown with the enterprise path. Third is a placeholder pick. */
const DEPLOYMENTS = (["support", "leads", "collections"] as const).map((v) => useCases.find((u) => u.visual === v)!)


export function V3Landing() {
  return (
    <div style={ROOMY}>
      {/* 1 Hero: headline, one CTA, the journey */}
      <V3Hero />

      {/* 2 Customer showcase */}
      <Logos label="Trusted by 100+ teams" />
      <CustomerStories title="How teams run on HoomanLabs." />

      {/* 3 Deployments + the enterprise path */}
      <Section id="v3-deployments">
        <Container>
          <Header
            title="Running in production today."
            body="Three deployments, each live on a real line, each built on the same platform."
          />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {DEPLOYMENTS.map((u, i) => (
              <li key={u.title} className="flex">
                <UseCaseStory useCase={u} resultFirst tone={i % 2 === 0 ? "charcoal" : "light"} />
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-6 rounded-xl border border-line bg-surface p-6 sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-label text-ink-muted">{enterpriseBuild.eyebrow}</span>
                <h3 className="text-h3 font-normal">Start with one flow, live in 4–8 weeks.</h3>
              </div>
              <TextLink href="/enterprise">See the full timeline</TextLink>
            </div>
            <ol className="grid gap-4 sm:grid-cols-5">
              {enterpriseBuild.steps.map((s, i) => (
                <li key={s.name} className="flex flex-col gap-1.5 border-t border-line-strong pt-3 sm:pr-4">
                  <span className="font-mono text-label text-ink-muted">0{i + 1}</span>
                  <span className="text-body font-medium">{s.name}</span>
                  <span className="text-small text-ink-secondary">{s.gate}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* 4 Impact */}
      <OutcomeDiagrams />
      <StatHeadline />

      {/* 5a Agent builder */}
      <Section id="v3-agent">
        <Container>
          <Header
            title="Everything an agent needs."
            body="From the context it has before the first ring to the follow-up it does after goodbye."
            aside={<TextLink href="/platform/agents">Explore Agents</TextLink>}
          />
          <div className="mt-10">
            <AgentAnatomy />
          </div>
        </Container>
      </Section>

      {/* 5b Workflow */}
      <Section id="v3-workflow">
        <Container>
          <Header
            title="Automate the work around every conversation."
            body="Triggers, campaigns, follow-ups and retries, so every call starts with context and ends with the next step done."
            aside={<TextLink href="/platform#product-workflow">Explore Workflow</TextLink>}
          />
          {/* The canvas as a dark snippet in a light frame, like the sections around it */}
          <div className="mt-10 rounded-xl border border-line bg-surface p-3 sm:p-4">
            <div aria-hidden className="flex items-center overflow-hidden rounded-lg bg-[oklch(0.13_0_0)] md:h-[21rem]">
              <WorkflowCanvas className="mx-auto w-full max-w-[52rem] pt-8" />
            </div>
            <ul className="mt-3 grid gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-4">
              {WORKFLOW_PARTS.map(({ icon: Ico, title, body, eg }) => (
                <li key={title} className="flex gap-3 rounded-lg border border-line bg-background p-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-md border border-line text-ink-secondary">
                    <Ico className="size-4" />
                  </span>
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-body font-medium">{title}</span>
                    <span className="text-small text-ink-secondary">{body}</span>
                    <span className="pt-1 font-mono text-[11.5px] text-ink-muted">{eg}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* 5c The rest of the platform: simulations, QA, channels, tools */}
      <StartResources />


      {/* 7 Talk to an agent */}
      <Section id="v3-talk">
        <Container>
          <Header title="Talk to an agent." body="Play a real call, or have one of our agents call you now." />
          <div className="mt-10">
            <HeroScene />
          </div>
        </Container>
      </Section>

      <HomeFaq />
      <TwoWayCta />
      <VoiceWidget after="v3-journey" hideOver="v3-talk" />
    </div>
  )
}
