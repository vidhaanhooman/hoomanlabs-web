import {
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
import { FeatureGrid, Pillars } from "@/components/product-page/blocks"
import { Faq } from "@/components/product-page/faq"
import { HeroConsole } from "@/components/product-page/hero-console"
import { Definition, HeroCopy, NextStep } from "@/components/product-page/page-bits"
import { TwoWayCta } from "@/components/sections/two-way-cta"
import { ChartCollage, PhotoCollage } from "@/components/solutions/collages"
import { TranscriptCard } from "@/components/solutions/moment"
import { trustBadges, type Industry } from "@/content/industries"
import { industryArt, momentArt } from "@/lib/industry-art"
import { cn } from "@/lib/utils"

/**
 * /solutions/[slug], built from the site's own blocks so it reads like the
 * Platform pages: the same hero (copy, then a card centred on the industry's
 * backdrop, here the first lines of the call), the Definition band (what
 * goes wrong today, with a sample result as proof), the problems as Pillars,
 * meeting Ria and her three changes, each a split section, sides
 * alternating: the change on one side, on the other its moment from a call
 * (the phone on the call with what was said and what got done, on the
 * plain grey stage), one call as a numbered
 * timeline with Ria's line as a pull quote, the results on a dark band, the
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
          <HeroCopy parent={{ label: "Solutions", href: "/solutions" }} crumb={x.name} title={x.title} line={x.line} link={{ label: "Follow one call", href: "#industry-solve" }} />
        </Container>
        <Container className="reveal mt-10 md:mt-14">
          <HeroConsole image={industryArt(x.slug)} designH={420}>
            <div className="flex size-full items-end justify-end">
              <TranscriptCard lines={f.turns.slice(0, 2).map((t, i) => ({ who: t.who === "agent" ? "Ria" : "Customer", at: `0:0${i * 4 + 2}`, text: t.text }))} />
            </div>
          </HeroConsole>
        </Container>
      </Section>

      {/* Today, as the Definition band, with a sample result as its proof */}
      <Definition
        id="industry-definition"
        text={x.narrative.before}
        proof={x.quote ? { quote: x.quote.text, by: `${x.quote.name}, ${x.quote.role}` } : { quote: x.story.title, by: `${x.story.company}, a sample ${x.name} team` }}
        placeholder={!x.quote}
      />

      {/* The three problems */}
      <Section id="industry-problem" spacing="tight">
        <Container>
          <Header title={`What gets in the way for ${x.name} teams.`} line="Three things that come up again and again." />
        </Container>
      </Section>
      <Pillars id="industry-problem-list" items={x.problems.map((p, i) => ({ icon: [HourglassIcon, WarningCircleIcon, XCircleIcon][i] ?? WarningCircleIcon, title: p.title, body: p.body }))} />

      {/* Meet Ria, then the three changes, each shown as one moment from a call */}
      <Section id="industry-meet" spacing="tight">
        <Container>
          <Header title="Meet Ria." line={x.narrative.after} />
        </Container>
      </Section>
      {x.solves.map((sv, i) => {
        const flip = i % 2 === 1
        return (
          <Section key={sv.title} id={(["industry-moment-1", "industry-moment-2", "industry-moment-3"] as const)[i]}>
            {/* Floating on the page, as PolyAI does: the change on one side, its visual on the other, sides alternating */}
            <Container className={cn("grid items-center gap-12 lg:gap-20", flip ? "lg:grid-cols-[1.25fr_1fr]" : "lg:grid-cols-[1fr_1.25fr]")}>
              <div className={cn("flex flex-col gap-4", flip && "lg:order-2")}>
                <span className="font-mono text-label text-ink-muted">0{i + 1}</span>
                <h3 className="text-h2 font-normal text-balance">{sv.title}</h3>
                <p className="text-body-lg text-ink-secondary">{sv.body}</p>
                <p className="mt-2 flex items-start gap-2 border-t border-line pt-5 text-body">
                  <CheckIcon aria-hidden className="mt-1 size-4 shrink-0 text-(--ok)" />
                  <span>
                    {sv.done.title} <span className="text-ink-muted">· {sv.done.detail}</span>
                  </span>
                </p>
              </div>
              {i === 1 ? (
                <ChartCollage reasons={x.jobs.map((j) => j.name)} stats={x.screen.stats} />
              ) : (
                <PhotoCollage image={momentArt(x.slug, i + 1)} line={sv.moment} done={i === 2 ? sv.done : undefined} side={i === 2 ? "left" : "right"} />
              )}
            </Container>
          </Section>
        )
      })}

      {/* Follow one call: a numbered timeline, Ria's key line as a pull quote */}
      <Section id="industry-solve" className="scroll-mt-20">
        <Container>
          <Header title="Follow one call, start to finish." line={`A sample ${x.jobs[0].name.toLowerCase()} call, step by step.`} />
          <ol className="relative mt-10 flex flex-col">
            <span aria-hidden className="absolute top-5 bottom-5 left-5 w-px bg-line-strong" />
            {[
              { title: "It starts", body: f.story.start },
              { title: "Ria gets ready", body: f.story.ready, extra: <Chips items={f.context} /> },
              {
                title: "They talk",
                body: f.story.action,
                extra: line && (
                  <figure className="rounded-md bg-surface p-6 sm:p-8">
                    <blockquote className="text-h3 font-normal text-balance">“{line}”</blockquote>
                    <figcaption className="mt-3 text-small text-ink-muted">Ria, on the call · {f.length}</figcaption>
                  </figure>
                ),
              },
              {
                title: "Everything's updated",
                body: f.story.result,
                extra: (
                  <ul className="flex flex-wrap gap-x-8 gap-y-3">
                    {f.after.map((a) => (
                      <li key={a} className="flex items-center gap-2 text-body">
                        <CheckIcon aria-hidden className="size-4 shrink-0 text-(--ok)" />
                        {a}
                      </li>
                    ))}
                  </ul>
                ),
              },
            ].map((st, i) => (
              <li key={st.title} className="relative grid grid-cols-[2.5rem_1fr] gap-6 pb-10 last:pb-0 sm:gap-10">
                <span className="relative z-10 grid size-10 place-items-center rounded-full bg-foreground text-body text-background tabular-nums">{i + 1}</span>
                <div className="flex flex-col gap-3 pt-1.5">
                  <h3 className="text-h4 font-normal">{st.title}</h3>
                  <p className="text-body text-ink-secondary">{st.body}</p>
                  {st.extra}
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* What it adds up to: the results on a dark band */}
      <Section id="industry-outcome">
        <Container>
          <div className="flex flex-col gap-10 rounded-md bg-foreground px-6 py-12 text-background sm:px-12 sm:py-16">
            <div className="flex max-w-[44rem] flex-col gap-3">
              <h2 className="text-h2 font-normal">What it adds up to.</h2>
              <p className="text-body opacity-70">{`Call after call, here is what changed for ${x.story.company}, a sample ${x.name} team.`}</p>
            </div>
            <ul className="grid gap-10 border-t border-background/20 pt-10 sm:grid-cols-3">
              {x.story.results.map((r) => (
                <li key={r.label} className="flex flex-col gap-3">
                  <span className="text-display leading-none font-normal tabular-nums">{r.value}</span>
                  <span className="text-body opacity-70">{r.label}</span>
                </li>
              ))}
            </ul>
          </div>
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
    <ul className="flex flex-wrap gap-2">
      {items.map(([k, v]) => (
        <li key={k} className="rounded-full border border-line px-4 py-2 text-body">
          <span className="text-ink-muted">{k}: </span>
          {v}
        </li>
      ))}
    </ul>
  )
}
