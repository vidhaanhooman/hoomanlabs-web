import { CheckIcon, ProhibitIcon, ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { CampaignConsole } from "@/components/campaigns/hero-console"
import { HeroCopy } from "@/components/product-page/page-bits"
import { campaignsPage as c } from "@/content/pages/campaigns"

/**
 * Sections of /platform/campaigns in the homepage's language, like the
 * other product pages: the hero (a large campaign console mid-run on the
 * landscape backdrop) and the consent trio. Sample data.
 */

function Ok() {
  return <CheckIcon weight="bold" className="size-3.5 shrink-0 text-[oklch(0.55_0.13_150)]" />
}

export function CampaignsHero() {
  return (
    <Section id="campaigns-hero" spacing="none" className="pt-10 pb-(--section-pad) md:pt-16">
      <Container>
        <HeroCopy crumb={c.crumb} title={c.title} line={c.line} link={{ label: "Watch a campaign run", href: "#campaigns-run" }} />
      </Container>
      <Container className="reveal mt-10 md:mt-14">
        <CampaignConsole />
      </Container>
    </Section>
  )
}

/* ------------------------------------------------------------- consent */

const INSET = "flex flex-1 flex-col overflow-hidden rounded-md border border-line bg-background text-small"

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

function Hours() {
  return (
    <div aria-hidden className={INSET}>
      <Head left={<span>Calling window</span>} right="Allowed" />
      <Line right="9:00–19:00">Monday to Friday</Line>
      <Line right="10:00–17:00">Saturday</Line>
      <Line right="No calls">Sunday</Line>
      <Foot left="Outside hours" right="Held until the window opens" />
    </div>
  )
}

function Dnd() {
  return (
    <div aria-hidden className={INSET}>
      <Head
        left={
          <>
            <ShieldCheckIcon className="size-3.5" />
            <span>Suppression check</span>
          </>
        }
        right="Before dialling"
      />
      <Line right="Skipped">
        <ProhibitIcon className="size-3.5 shrink-0" />
        On the DND list
      </Line>
      <Line right="Skipped">
        <ProhibitIcon className="size-3.5 shrink-0" />
        Opted out last week
      </Line>
      <Line right="Called">
        <Ok />
        Clear to call
      </Line>
      <Foot left="Lists" right="DND · your opt-outs" />
    </div>
  )
}

function DoubleDial() {
  return (
    <div aria-hidden className={INSET}>
      <Head left={<span>Sara Kim</span>} right="+1 555 01•• •••" />
      <Line right="Reached">
        <Ok />
        Reminders campaign · 9:42
      </Line>
      <Line right="Skipped">
        <ProhibitIcon className="size-3.5 shrink-0" />
        Renewals campaign · 11:05
      </Line>
      <Line>Not called twice in the same window</Line>
      <Foot left="Rule" right="One contact across campaigns" />
    </div>
  )
}

const VISUALS = [Hours, Dnd, DoubleDial]

export function ConsentTrio() {
  return (
    <Section id="campaigns-consent">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <h2 className="text-h2 font-normal">{c.consent.title}</h2>
          <p className="text-body text-ink-secondary">{c.consent.line}</p>
        </div>
        <ul className="mt-10 grid gap-3 lg:grid-cols-3">
          {c.consent.items.map((it, i) => {
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
