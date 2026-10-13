import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { HeroCallCard } from "@/components/lab/hero-call-card"
import { HowItWorksV3 } from "@/components/sections/how-it-works-v3"
import { Logos } from "@/components/sections/logos"
import { OutcomeDiagrams } from "@/components/sections/outcome-diagrams"
import { HomeFaq, StatHeadline } from "@/components/sections/structure"
import { StartResources } from "@/components/sections/start-resources"
import { TwoWayCta } from "@/components/sections/two-way-cta"
import { V3Hero } from "@/components/sections/v3-hero"
import { VoiceWidget } from "@/components/sections/voice-widget"
import { stories } from "@/content/structure"

/**
 * The homepage (v3, promoted from /lab/v3 to /), built from existing sections.
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

/**
 * Customer stories: joined plain tiles, each showing a typical call moment
 * in the product's dark UI, with one factual line on what the agent
 * handles. PLACEHOLDER: call wording and summaries are samples until each
 * customer confirms their use case, direction and languages. PLACEHOLDER copy: results need the real figures, approved by
 * each customer, before this goes live.
 */
const CUSTOMERS: {
  name: string
  tag: string
  /** What the agent handles, in one factual line. */
  summary: string
  /** A typical call moment, shown as a small product snippet (sample wording). */
  call: { who: "Caller" | "Agent"; text: string }[]
  outcome: string
  href: string
}[] = [
  {
    name: "SaffronStays",
    tag: "Bookings",
    summary: "Answers villa enquiries: availability, pricing and booking.",
    call: [
      {
        who: "Caller",
        text: "Is the Alibaug villa free from 12 to 14 December?",
      },
      {
        who: "Agent",
        text: "Yes, both nights are open. Shall I send the quote on WhatsApp?",
      },
    ],
    outcome: "Quote sent on WhatsApp",
    href: stories.items[0].href,
  },
  {
    name: "GIVA",
    tag: "Support",
    summary: "Handles order, return and exchange queries on the call.",
    call: [
      {
        who: "Caller",
        text: "My ring is the wrong size, I want to return it.",
      },
      {
        who: "Agent",
        text: "Found order #4821. I've booked a pickup for tomorrow.",
      },
    ],
    outcome: "Return booked · pickup tomorrow",
    href: stories.items[1].href,
  },
  {
    name: "Be10x",
    tag: "Sales",
    summary: "Calls every new lead back, answers questions and books demos.",
    call: [
      {
        who: "Agent",
        text: "Hi Rohan, you signed up for the AI workshop. Is now a good time?",
      },
      {
        who: "Caller",
        text: "Yes. What does it cover, and when is the next one?",
      },
    ],
    outcome: "Qualified · demo booked Thu 4 pm",
    href: stories.items[2].href,
  },
]

/** Customer stories are hidden for now; flip to true to bring them back. */
const SHOW_STORIES = false

export function V3Landing() {
  return (
    <div style={ROOMY}>
      {/* 1 Hero: headline, one CTA, the journey */}
      <V3Hero />

      {/* 2 Customer logos */}
      <Logos label="Trusted by 100+ teams" />

      {/* 3 Customer stories, then the enterprise path in one line. Hidden until
          the stories have real, approved content (see SHOW_STORIES). */}
      {SHOW_STORIES && (
        <Section id="v3-deployments">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
              <h2 className="text-h2 font-normal">
                Deployed on <span className="text-ink-muted">real customer lines.</span>
              </h2>
              <p className="max-w-[38ch] text-small text-ink-secondary">
                Live on billing, booking and support calls, with the exceptions and stakes that come with them.
              </p>
            </div>
            <ul className="mt-8 grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-3">
              {CUSTOMERS.map((c) => (
                <li key={c.name} className="flex">
                  <Link href={c.href} className="group flex w-full flex-col gap-5 bg-surface p-5 transition-colors hover:bg-placeholder sm:p-6">
                    <span className="font-mono text-label text-ink-muted">
                      {c.name} · {c.tag}
                    </span>
                    {/* A typical call moment, in the product's own UI. */}
                    <span aria-hidden className="ui-dark flex flex-1 flex-col gap-2.5 rounded-md p-3.5 text-[12px] leading-[1.5]">
                      {c.call.map((l) => (
                        <span key={l.text} className="flex flex-col gap-0.5">
                          <span className="font-mono text-[10px] text-(--ui-muted) uppercase">{l.who}</span>
                          <span className={l.who === "Agent" ? "text-(--ui-text)" : "text-(--ui-text)/75"}>{l.text}</span>
                        </span>
                      ))}
                      <span className="mt-1 flex w-fit items-center gap-1.5 rounded-full bg-(--ui-raised) px-2.5 py-1 text-[11px]">
                        <span className="size-1.5 rounded-full bg-(--ui-live)" />
                        {c.outcome}
                      </span>
                    </span>
                    <span className="flex items-end justify-between gap-4">
                      <span className="text-small text-ink-secondary">{c.summary}</span>
                      <ArrowRightIcon
                        aria-label="Read the story"
                        className="mb-0.5 size-4 shrink-0 text-ink-muted transition-[translate,color] [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-foreground"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            {/* The enterprise path as one line; the full timeline lives on /enterprise. */}
            <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-line pt-6">
              <p className="text-body">Start with one flow, live in 4–8 weeks.</p>
              <span className="flex flex-wrap gap-x-6 gap-y-2">
                <TextLink href={stories.all.href}>All stories</TextLink>
                <TextLink href="/enterprise">See how we deploy</TextLink>
              </span>
            </div>
          </Container>
        </Section>
      )}

      {/* 4 Impact */}
      <OutcomeDiagrams />
      <StatHeadline />

      {/* 5 How it works: three calm steps (the detailed editor and canvas live on /platform) */}
      <HowItWorksV3 />

      {/* 5c The rest of the platform: simulations, QA, channels, tools */}
      <StartResources />

      {/* 7 Talk to an agent */}
      <Section id="v3-talk">
        <Container>
          <Header title="Talk to an agent." body="Play a real call, or have one of our agents call you now." />
          <div className="mt-10">
            <HeroCallCard plain />
          </div>
        </Container>
      </Section>

      <HomeFaq />
      <TwoWayCta />
      <VoiceWidget after="v3-journey" hideOver="v3-talk" />
    </div>
  )
}
