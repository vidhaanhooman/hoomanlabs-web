import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { HeroScene } from "@/components/lab/hero-scene"
import { WorkflowAnatomy } from "@/components/product/workflow-anatomy"
import { AgentAnatomy } from "@/components/product/agent-anatomy"
import { Logos } from "@/components/sections/logos"
import { OutcomeDiagrams } from "@/components/sections/outcome-diagrams"
import {
  HomeFaq,
  StatHeadline,
} from "@/components/sections/structure"
import { StartResources } from "@/components/sections/start-resources"
import { TwoWayCta } from "@/components/sections/two-way-cta"
import { V3Hero } from "@/components/sections/v3-hero"
import { VoiceWidget } from "@/components/sections/voice-widget"
import { enterpriseBuild } from "@/content/landing"
import { stories } from "@/content/structure"

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



/** Customer stories (placeholders until real customers and numbers are confirmed). */
const CUSTOMERS = [
  {
    name: "Halden Energy",
    tag: "Collections",
    result: "71% of billing calls resolved without a person",
    body: "Every billing call answered in the customer's language, payments and plans agreed on the call.",
    art: stories.items[0].art,
    href: stories.items[0].href,
  },
  {
    name: "Northfield Clinics",
    tag: "Bookings",
    result: "32% fewer no-shows across 40 clinics",
    body: "Reminders, confirmations and reschedules handled before the appointment, straight into the calendar.",
    art: stories.items[1].art,
    href: stories.items[1].href,
  },
  {
    name: "Kestrel Retail",
    tag: "Support",
    result: "Order queries answered in Hindi, English and Tamil",
    body: "Orders looked up and changed mid-call; the rest routed to the team with a full summary.",
    art: stories.items[2].art,
    href: stories.items[2].href,
  },
]

export function V3Landing() {
  return (
    <div style={ROOMY}>
      {/* 1 Hero: headline, one CTA, the journey */}
      <V3Hero />

      {/* 2 Customer showcase */}
      <Logos label="Trusted by 100+ teams" />

      {/* 3 Customers, and the enterprise path, in one section */}
      <Section id="v3-deployments">
        <Container>
          <Header
            title="Deployed on real customer lines."
            body="Live on billing, booking and support calls, with the exceptions and stakes that come with them."
            aside={<TextLink href={stories.all.href}>All stories</TextLink>}
          />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {CUSTOMERS.map((c) => (
              <li key={c.name} className="flex">
                <Link href={c.href} className="group flex w-full flex-col overflow-hidden rounded-xl border border-line bg-background transition-colors hover:border-line-strong">
                  <span className="relative block aspect-[16/10] overflow-hidden">
                    <Image src={c.art} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 ease-(--ease-out) group-hover:scale-[1.03]" />
                  </span>
                  <span className="flex flex-1 flex-col gap-2 border-t border-line p-5">
                    <span className="flex items-center justify-between font-mono text-label text-ink-muted">
                      <span>{c.name}</span>
                      <span>{c.tag}</span>
                    </span>
                    <span className="text-h4 font-normal">{c.result}</span>
                    <span className="text-small text-ink-secondary">{c.body}</span>
                    <span className="mt-auto flex items-center gap-1 pt-2 text-small font-medium">
                      Read the story
                      <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </span>
                </Link>
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
          <div className="mt-10">
            <WorkflowAnatomy />
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
