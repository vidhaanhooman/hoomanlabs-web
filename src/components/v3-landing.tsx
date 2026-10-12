import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { HeroScene } from "@/components/lab/hero-scene"
import { WorkflowCanvas } from "@/components/product/flow-canvas"
import { AgentAnatomy } from "@/components/product/agent-anatomy"
import { FinalCta } from "@/components/sections/final-cta"
import { Logos } from "@/components/sections/logos"
import { OutcomeDiagrams } from "@/components/sections/outcome-diagrams"
import {
  CustomerStories,
  HomeFaq,
  PlatformSummary,
  StatHeadline,
  UseCaseCarousel,
} from "@/components/sections/structure"
import { UseCaseStory } from "@/components/sections/use-case-story"
import { V3Hero } from "@/components/sections/v3-hero"
import { VoiceWidget } from "@/components/sections/voice-widget"
import { enterpriseBuild, startPaths } from "@/content/landing"
import { tools, useCases } from "@/content/platform"

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

/** The three deployments shown with the enterprise path. Third is a placeholder pick. */
const DEPLOYMENTS = (["support", "leads", "collections"] as const).map((v) => useCases.find((u) => u.visual === v)!)

/** A short line of integrations in place of the full logo grid. */
const INTEGRATIONS = tools.groups.flatMap((g) => g.items.map((i) => i.name)).slice(0, 9)

export function V3Landing() {
  const selfServe = startPaths.paths[0]
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
          <div aria-hidden className="mt-10 flex items-center overflow-hidden rounded-md border border-black/10 bg-[oklch(0.13_0_0)] md:h-[30rem]">
            <WorkflowCanvas className="w-full pt-12" />
          </div>
        </Container>
      </Section>

      {/* 5c Everything in one platform: self-serve + resources, short integrations line */}
      <PlatformSummary
        hide={["Changelog"]}
        footer={
          <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-md border border-line bg-surface p-5">
              <div className="flex flex-col gap-1">
                <span className="text-body font-medium">Start {selfServe.name.toLowerCase()}</span>
                <span className="text-small text-ink-secondary">
                  {selfServe.rows[0].v}. {selfServe.rows[1].v} to live.
                </span>
              </div>
              <Link href={selfServe.cta.href} className={buttonVariants({ variant: "secondary" })}>
                {selfServe.cta.label}
              </Link>
            </div>
            <div className="flex flex-col justify-center gap-1 rounded-md border border-line p-5">
              <span className="text-small text-ink-muted">Integrations</span>
              <span className="text-small">{INTEGRATIONS.join(" · ")} and more</span>
            </div>
          </div>
        }
      />

      {/* 6 Solutions: the broader use cases, lower down */}
      <UseCaseCarousel
        only={["booking", "renewals", "surveys", "leads"]}
        more={{ label: "See all solutions", href: "#" /* TODO: /solutions once it exists */ }}
      />

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
      <FinalCta />
      <VoiceWidget after="v3-journey" hideOver="v3-talk" />
    </div>
  )
}
