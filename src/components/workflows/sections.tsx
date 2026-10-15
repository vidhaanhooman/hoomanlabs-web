import { CheckIcon, ClockIcon, LightningIcon, PhoneCallIcon, WarningIcon } from "@phosphor-icons/react/dist/ssr"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { HeroCopy } from "@/components/product-page/page-bits"
import { WorkflowConsole } from "@/components/workflows/hero-console"
import { workflowsPage as c } from "@/content/pages/workflows"

/**
 * Sections of /platform/workflows in the homepage's language, like Agents:
 * the hero (a large workflow console on the landscape backdrop, with one run
 * playing through the canvas) and the business-logic trio (equal cards, light insets).
 * Sample data (Maya Patel, Halden Energy).
 */

const Ok = () => <CheckIcon weight="bold" className="size-3.5 shrink-0 text-[oklch(0.55_0.13_150)]" />

export function WorkflowsHero() {
  return (
    <Section id="workflows-hero" spacing="none" className="pt-10 pb-(--section-pad) md:pt-16">
      <Container>
        <HeroCopy crumb={c.crumb} title={c.title} line={c.line} link={{ label: "See a run over days", href: "#workflows-days" }} />
      </Container>
      <Container className="reveal mt-10 md:mt-14">
        <WorkflowConsole />
      </Container>
    </Section>
  )
}

/* ------------------------------------------------------- business logic */

const INSET = "flex flex-1 flex-col overflow-hidden rounded-md border border-line bg-background text-small"

/** Shared shape for the three visuals: a header, three rows and a footer, so they line up. */
function Head({ left, right }: { left: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex h-11 shrink-0 items-center gap-2 border-b border-line px-4">
      {left}
      {right && <span className="ml-auto text-label text-ink-muted">{right}</span>}
    </div>
  )
}
function Line({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 border-b border-line px-4 py-2.5">
      {children}
      {right && <span className="ml-auto text-label text-ink-muted">{right}</span>}
    </div>
  )
}
function Foot({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="mt-auto flex items-center justify-between gap-3 bg-surface px-4 py-2.5 text-label text-ink-secondary">
      <span>{left}</span>
      <span className="text-foreground">{right}</span>
    </div>
  )
}

function Branch() {
  return (
    <div aria-hidden className={INSET}>
      <Head
        left={
          <>
            <span className="text-[oklch(0.6_0.16_295)]">⑂</span>
            <span className="font-mono text-label">balance &gt; 50</span>
          </>
        }
        right="Condition"
      />
      <Line right="Yes">
        <PhoneCallIcon weight="fill" className="size-3.5 shrink-0" />
        Call now
      </Line>
      <Line right="No">
        <span className="w-3.5 shrink-0 text-center text-ink-muted">→</span>
        Send a payment link by SMS
      </Line>
      <Line right="Then">
        <ClockIcon className="size-3.5 shrink-0" />
        Wait 2 days, check again
      </Line>
      <Foot left="Branch on" right="Any field in your data" />
    </div>
  )
}

function Parallel() {
  return (
    <div aria-hidden className={INSET}>
      <Head
        left={
          <>
            <LightningIcon weight="fill" className="size-3.5 text-[oklch(0.7_0.15_70)]" />
            <span className="font-mono text-label">call.ended</span>
          </>
        }
        right="3 at once"
      />
      <Line right="0.3s">
        <Ok />
        Update Zoho CRM
      </Line>
      <Line right="0.2s">
        <Ok />
        Post to #billing
      </Line>
      <Line right="0.4s">
        <Ok />
        Send receipt by SMS
      </Line>
      <Foot left="All three done" right="0.4s" />
    </div>
  )
}

function Reliable() {
  return (
    <div aria-hidden className={INSET}>
      <Head left={<span className="font-mono text-label">update_crm</span>} right="Timeout 5s" />
      <Line right="5.0s">
        <WarningIcon weight="fill" className="size-3.5 shrink-0 text-[oklch(0.7_0.14_70)]" />
        CRM slow to respond
      </Line>
      <Line>
        <Ok />
        Took the fallback path
      </Line>
      <Line>
        <Ok />
        Team alerted in #billing
      </Line>
      <Foot left="Error policy" right="Queue and alert the team" />
    </div>
  )
}

const VISUALS = [Branch, Parallel, Reliable]

export function LogicTrio() {
  return (
    <Section id="workflows-logic">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <h2 className="text-h2 font-normal">{c.logic.title}</h2>
          <p className="text-body text-ink-secondary">{c.logic.line}</p>
        </div>
        <ul className="mt-10 grid gap-3 lg:grid-cols-3">
          {c.logic.items.map((it, i) => {
            const Visual = VISUALS[i]
            return (
              <li key={it.id} className="flex">
                <Panel className="flex w-full flex-col gap-5 p-6 sm:p-7">
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-h4 font-normal">{it.title}</h3>
                    <p className="min-h-[3em] text-small text-ink-secondary">{it.body}</p>
                  </div>
                  <Visual />
                </Panel>
              </li>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}
