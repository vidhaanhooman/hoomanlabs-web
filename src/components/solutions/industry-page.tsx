import {
  ArrowRightIcon,
  ArrowsClockwiseIcon,
  ArrowUUpLeftIcon,
  BellIcon,
  CalendarCheckIcon,
  ChatCircleTextIcon,
  CheckIcon,
  CreditCardIcon,
  FileTextIcon,
  FunnelIcon,
  HandWavingIcon,
  HeadsetIcon,
  HourglassIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PackageIcon,
  PhoneIcon,
  ReceiptIcon,
  TruckIcon,
  WarningCircleIcon,
  XCircleIcon,
} from "@phosphor-icons/react/dist/ssr"
import type { Icon } from "@phosphor-icons/react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { FeatureGrid } from "@/components/product-page/blocks"
import { Faq } from "@/components/product-page/faq"
import { HeroConsole } from "@/components/product-page/hero-console"
import { Definition, HeroCopy, NextStep } from "@/components/product-page/page-bits"
import { TwoWayCta } from "@/components/sections/two-way-cta"
import { ChangesPanel } from "@/components/solutions/changes-panel"
import { OutcomeCard } from "@/components/solutions/collages"
import { StepCard, StepsReveal } from "@/components/solutions/motion"
import { trustBadges, type Industry } from "@/content/industries"
import { industryArt } from "@/lib/industry-art"
import { cn } from "@/lib/utils"

/**
 * /solutions/[slug], built from the site's own blocks so it reads like the
 * Platform pages: the same hero (copy, then a card centred on the industry's
 * backdrop, here the first lines of the call), the Definition band (what
 * goes wrong today), the problems as linked cards,
 * meeting Ria and her three changes, each a split section, sides
 * alternating: the change on one side, on the other its moment from a call
 * (the phone on the call with what was said and what got done, on the
 * plain grey stage), one call as a numbered
 * timeline with Ria's line as a pull quote, the
 * use cases as a FeatureGrid, the shared FAQ, the next step and the Book a
 * demo. Everything reads top to bottom. Content in content/industries.ts
 * (sample).
 */

/** The Platform pages' roomier section spacing. */
const ROOMY = {
  "--section-gap": "clamp(3.25rem, 2.25rem + 3vw, 5rem)",
  "--section-pad": "calc(var(--section-gap) / 2)",
} as React.CSSProperties

/** Asked on every industry page; answered from what the platform pages say. */
const HANDOFF = { q: "Can it hand a call to a person?", a: "Yes. It transfers the call to your team with a summary of what was said, inside your transfer hours." }

/** An icon for a use case, matched on its name (first match wins). */
const ICONS: [RegExp, Icon][] = [
  [/feedback|survey|check-in/i, ChatCircleTextIcon],
  [/refund|billing|bill|fee|premium/i, ReceiptIcon],
  [/payment|collection|card|cash/i, CreditCardIcon],
  [/renew|win-back|recovery/i, ArrowsClockwiseIcon],
  [/reminder|nudge/i, BellIcon],
  [/booking|appointment|schedul|consult|counsell/i, CalendarCheckIcon],
  [/return|exchange/i, ArrowUUpLeftIcon],
  [/address/i, MapPinIcon],
  [/pickup|parcel/i, PackageIcon],
  [/deliver|shipment|dispatch/i, TruckIcon],
  [/document|kyc|application|report/i, FileTextIcon],
  [/lead|qualif|cart|enquiry/i, FunnelIcon],
  [/onboard|welcome/i, HandWavingIcon],
  [/status|order/i, MagnifyingGlassIcon],
  [/support|help/i, HeadsetIcon],
]
const iconFor = (name: string) => ICONS.find(([re]) => re.test(name))?.[1] ?? PhoneIcon

/** The section header the Platform pages use: a heading and one line under it. */
function Header({ title, line }: { title: string; line: string }) {
  return (
    <div className="flex max-w-[44rem] flex-col gap-3">
      <h2 className="text-h2 font-normal">{title}</h2>
      <p className="text-body text-ink-secondary">{line}</p>
    </div>
  )
}

export function IndustryPage({ industry: x }: { industry: Industry }) {
  const f = x.funnel
  const line = f.turns.find((t) => t.who === "agent")?.text

  return (
    <div style={ROOMY}>
      {/* The hero, as on every product page: copy, then one card on the backdrop */}
      <Section id="industry-hero" spacing="none" className="pt-10 pb-(--section-pad) md:pt-16">
        <Container>
          <HeroCopy parent={null} crumb={`Solutions / ${x.name}`} title={x.title} line={x.line} link={{ label: "Follow one call", href: "#industry-solve" }} />
        </Container>
        <Container className="reveal mt-10 md:mt-14">
          <HeroConsole image={industryArt(x.slug)} designH={420}>
            <div className="flex size-full items-end justify-end">
              <OutcomeCard outcome={f.result} items={f.after} />
            </div>
          </HeroConsole>
        </Container>
      </Section>

      {/* Today, as the Definition band (with a customer quote once one is approved) */}
      <Definition id="industry-definition" text={x.narrative.before} proof={x.quote ? { quote: x.quote.text, by: `${x.quote.name}, ${x.quote.role}` } : undefined} />

      {/* The three problems, each a card that points to the change that fixes it (same order) */}
      <Section id="industry-problem">
        <Container>
          <Header title={`What gets in the way for ${x.name} teams.`} line="Three things that come up again and again." />
          <ol className="mt-10 grid gap-4 lg:mt-12 lg:grid-cols-3">
            {x.problems.map((p, i) => {
              const I = [HourglassIcon, WarningCircleIcon, XCircleIcon][i] ?? WarningCircleIcon
              const fix = x.solves[i]
              return (
                <li key={p.title} className="flex flex-col gap-6 rounded-md bg-surface p-7 sm:p-8">
                  <span className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-md bg-background">
                      <I aria-hidden className="size-5" />
                    </span>
                    <span className="font-mono text-label text-ink-muted">0{i + 1}</span>
                  </span>
                  <span className="flex flex-col gap-3">
                    <h3 className="text-h3 font-normal text-balance">{p.title}</h3>
                    <p className="text-body text-ink-secondary">{p.body}</p>
                  </span>
                  {fix && (
                    <a href="#industry-changes" className="group mt-auto flex items-center justify-between gap-4 border-t border-line pt-5 text-body">
                      <span className="flex flex-col gap-0.5">
                        <span className="text-small text-ink-muted">How Ria fixes it</span>
                        {fix.title}
                      </span>
                      <ArrowRightIcon aria-hidden className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  )}
                </li>
              )
            })}
          </ol>
        </Container>
      </Section>

      {/* Meet Ria: on the page, wider than the usual text column */}
      <Section id="industry-meet">
        <div>
          <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-20">
            <div className="flex flex-col gap-4">
              <h2 className="text-display font-normal">Meet Ria.</h2>
              <p className="text-h3 font-normal text-balance text-ink-secondary">The teammate who makes every {x.name} call.</p>
            </div>
            <div className="flex flex-col gap-8">
              <p className="text-h3 leading-snug font-normal text-balance">{x.narrative.after}</p>
              <p className="text-body-lg text-ink-secondary">
                Ria is a Hooman, an AI voice agent set up for your {x.name} team. She speaks your customers&apos; language, works inside the systems you already run, and hands a call to your team with
                a summary whenever it needs a person.
              </p>
              <ul className="flex flex-wrap gap-2 border-t border-line pt-8">
                {x.jobs.map((j) => (
                  <li key={j.name} className="rounded-full border border-line px-4 py-2 text-body">
                    {j.name}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </div>
      </Section>

      {/* The three changes, as a product panel: rows on the left, the call log on the right */}
      <ChangesPanel industry={x} />

      {/* Follow one call: the story told left to right, one step per column */}
      <Section id="industry-solve" className="scroll-mt-20">
        <Container>
          <Header title="Follow one call, start to finish." line={`One ${x.jobs[0].name.toLowerCase()} call, told step by step.`} />
          <StepsReveal count={4}>
            {[
              { at: f.trigger.title, title: "It starts", body: f.story.start },
              { at: "Before hello", title: "Ria gets ready", body: f.story.ready, extra: <Chips items={f.context} /> },
              {
                at: "On the call",
                title: "They talk",
                body: f.story.action,
                extra: line && (
                  <figure className="flex flex-col gap-2 rounded-md bg-background p-5">
                    <blockquote className="text-body-lg text-balance">“{line}”</blockquote>
                    <figcaption className="font-mono text-label text-ink-muted">Ria</figcaption>
                  </figure>
                ),
              },
              {
                at: "After the call",
                title: "Everything's updated",
                body: f.story.result,
                extra: (
                  <ul className="flex flex-col gap-2.5">
                    {f.after.map((a) => (
                      <li key={a} className="flex items-start gap-2 text-body">
                        <CheckIcon aria-hidden className="mt-1 size-4 shrink-0 text-foreground" />
                        {a}
                      </li>
                    ))}
                  </ul>
                ),
              },
            ].map((st, i) => (
              <StepCard key={st.title} i={i} className="flex flex-col gap-4 rounded-md bg-surface p-6 sm:p-7">
                <span className="flex items-center justify-between gap-3">
                  <span className="grid size-9 place-items-center rounded-full bg-foreground text-small text-background tabular-nums">{i + 1}</span>
                  <span className="font-mono text-label text-ink-muted">{st.at}</span>
                </span>
                <h3 className="text-h4 font-normal">{st.title}</h3>
                <p className="text-body text-ink-secondary">{st.body}</p>
                {st.extra}
              </StepCard>
            ))}
          </StepsReveal>
        </Container>
      </Section>

      {/* The use cases, as the Platform pages' FeatureGrid */}
      <FeatureGrid id="industry-segments" title="Everything it takes on." items={x.jobs.map((j) => ({ name: j.name, pointer: j.body, icon: iconFor(j.name) }))} />

      {/* Proof: compliance badges (only once confirmed) */}
      {trustBadges.length > 0 && (
        <Section id="industry-trust">
          <Container className="flex flex-col gap-6">
            <h2 className="text-h3 font-normal">Built for trust and privacy.</h2>
            <ul className="flex flex-wrap gap-3">
              {trustBadges.map((b) => (
                <li key={b.name} className="rounded-full border border-line px-4 py-2 text-body">
                  {b.name} <span className="text-ink-muted">· {b.detail}</span>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <Faq id="industry-faq" items={[...x.faq, HANDOFF]} />
      <NextStep id="industry-next" related={["agents", "integrations", "human-ai"]} />
      <TwoWayCta />
    </div>
  )
}

/** What Ria looked up, as quiet chips. */
function Chips({ items }: { items: [string, string][] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map(([k, v]) => (
        <li key={k} className="w-fit rounded-md border border-line bg-background px-3 py-2 text-small">
          <span className="text-ink-muted">{k}: </span>
          {v}
        </li>
      ))}
    </ul>
  )
}
