import { CheckIcon, ProhibitIcon, SealCheckIcon, ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { CampaignConsole } from "@/components/campaigns/hero-console"
import { HeroCopy } from "@/components/product-page/page-bits"
import { campaignsPage as c } from "@/content/pages/campaigns"

/**
 * Sections of /platform/campaigns in the homepage's language, like the
 * other product pages: the hero (a large campaign console mid-run on the
 * landscape backdrop) and the six-card feature grid (rotation, retries,
 * concurrency, calling hours, DND, no double-dial). Sample data.
 */

function Ok() {
  return <CheckIcon weight="bold" className="size-3.5 shrink-0 text-success" />
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

/* ------------------------------------------------------------ features */

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

function Rotation() {
  return (
    <div aria-hidden className={INSET}>
      <Head left={<span>Caller IDs</span>} right="Rotating" />
      <Line right="212 today">
        <SealCheckIcon weight="fill" className="size-3.5 shrink-0 text-success" />
        <span className="font-mono">+1 555 0100</span>
      </Line>
      <Line right="198 today">
        <SealCheckIcon weight="fill" className="size-3.5 shrink-0 text-success" />
        <span className="font-mono">+1 555 0110</span>
      </Line>
      <Line right="Resting">
        <SealCheckIcon weight="fill" className="size-3.5 shrink-0 text-ink-muted" />
        <span className="font-mono text-ink-secondary">+1 555 0120</span>
      </Line>
      <Foot left="Every number" right="Verified" />
    </div>
  )
}

function Retries() {
  return (
    <div aria-hidden className={INSET}>
      <Head left={<span>Retry rules</span>} right="By outcome" />
      <Line right="In 2 hours">No answer</Line>
      <Line right="Next morning">Voicemail</Line>
      <Line right="In 30 minutes">Busy</Line>
      <Foot left="Attempts" right="Up to 3" />
    </div>
  )
}

function Concurrency() {
  const busy = 18
  return (
    <div aria-hidden className={INSET}>
      <Head left={<span>Running now</span>} right={`${busy} of 20`} />
      <div className="grid grid-cols-10 gap-1.5 border-b border-line px-4 py-4">
        {Array.from({ length: 20 }, (_, i) => (
          <span key={i} className={i < busy ? "h-5 rounded-[3px] bg-foreground/80" : "h-5 rounded-[3px] border border-dashed border-line-strong"} />
        ))}
      </div>
      <Line right="412">Waiting in the queue</Line>
      <Foot left="Limit" right="20 calls at once" />
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

const VISUALS = [Rotation, Retries, Concurrency, Hours, Dnd, DoubleDial]

export function FeatureGrid() {
  return (
    <Section id="campaigns-features">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <h2 className="text-h2 font-normal">{c.features.title}</h2>
          <p className="text-body text-ink-secondary">{c.features.line}</p>
        </div>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {c.features.items.map((it, i) => {
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
