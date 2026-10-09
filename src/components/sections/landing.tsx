import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeader } from "@/components/layout/section-header"
import { TextLink } from "@/components/layout/text-link"
import { ChannelDevices } from "@/components/sections/channel-devices"
import { IntegrationGroups } from "@/components/sections/tools-integrations"
import { enterpriseBuild, howItWorks, security, startPaths } from "@/content/landing"
import { channels, flow, tools } from "@/content/platform"
import { cn } from "@/lib/utils"

/**
 * New homepage sections (/lab/home). Each is deliberately plain: a stacked
 * header and hairline-separated columns, so the structure can be judged
 * before any visual is designed for it.
 */

function Header({ title, body, className }: { title: string; body?: string; className?: string }) {
  return (
    <div className={cn("flex max-w-[44rem] flex-col gap-3", className)}>
      <SectionHeader title={title} />
      {body && <p className="text-body text-ink-secondary">{body}</p>}
    </div>
  )
}

/** 3-4 business numbers. */
export function Impact() {
  return (
    <Section id="impact" spacing="tight">
      <Container>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-8 border-y border-line py-10 lg:grid-cols-4">
          {flow.impact.map((m) => (
            <div key={m.label} className="flex flex-col gap-2">
              <dt className="order-2 max-w-[24ch] text-small text-ink-secondary">{m.label}</dt>
              <dd className="text-display font-normal tabular-nums">{m.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  )
}

/** Build, Test, Run, Improve in one row, each linking into Platform. */
export function HowItWorks() {
  return (
    <Section id="how">
      <Container>
        <Header title={howItWorks.headline} body={howItWorks.body} />
        <ol className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.steps.map((s, i) => (
            <li key={s.verb} className="flex flex-col gap-2 border-t border-line pt-4">
              <span className="font-mono text-label text-ink-muted tabular-nums">0{i + 1}</span>
              <h3 className="text-h4 font-medium">{s.verb}</h3>
              <p className="text-small text-ink-secondary">{s.body}</p>
              <TextLink href={s.link.href} className="mt-auto pt-2">
                {s.link.label}
              </TextLink>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}

export function HomeChannels() {
  return (
    <Section id="channels">
      <Container>
        <Header title={channels.headline} body={channels.body} />
        <ChannelDevices className="mt-10" />
      </Container>
    </Section>
  )
}

export function Security() {
  return (
    <Section id="security">
      <Container>
        <Header title={security.headline} body={security.body} />
        <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {security.items.map((it) => (
            <li key={it.title} className="flex flex-col gap-2 border-t border-line pt-4">
              <h3 className="text-body font-medium">{it.title}</h3>
              <p className="text-small text-ink-secondary">{it.body}</p>
            </li>
          ))}
        </ul>
        <TextLink href={security.link.href} className="mt-8">
          {security.link.label}
        </TextLink>
      </Container>
    </Section>
  )
}

export function HomeIntegrations() {
  return (
    <Section id="integrations">
      <Container>
        <Header title={tools.headline} />
        <IntegrationGroups className="mt-10" />
      </Container>
    </Section>
  )
}

/** Closing section: the two ways to start, and the trigger to the full process page. */
export function StartPaths() {
  return (
    <Section id="start" spacing="none" className="pt-(--section-pad) pb-(--section-gap)">
      <Container>
        <Header title={startPaths.headline} body={startPaths.body} />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {startPaths.paths.map((p, i) => (
            <div key={p.name} className="flex flex-col gap-6 rounded-md border border-line bg-surface p-6 sm:p-8">
              <div className="flex flex-col gap-2">
                <h3 className="text-h4 font-medium">{p.name}</h3>
                <p className="text-small text-ink-secondary">{p.for}</p>
              </div>
              <dl className="flex flex-col">
                {p.rows.map((r) => (
                  <div key={r.k} className="flex gap-4 border-t border-line py-3">
                    <dt className="w-28 shrink-0 text-small text-ink-muted">{r.k}</dt>
                    <dd className="text-small">{r.v}</dd>
                  </div>
                ))}
              </dl>
              <Link
                href={p.cta.href}
                className={cn(buttonVariants({ variant: i === 0 ? "secondary" : "default" }), "mt-auto self-start")}
              >
                {p.cta.label}
              </Link>
            </div>
          ))}
        </div>
        <EnterpriseBuild />
      </Container>
    </Section>
  )
}

/** The enterprise path in detail: five gated steps, notes, and who brings what. */
function EnterpriseBuild() {
  const { steps, notes, split } = enterpriseBuild
  return (
    <div className="mt-16 border-t border-line pt-10">
      <div className="flex max-w-[44rem] flex-col gap-2">
        <h3 className="text-h3 font-normal">{enterpriseBuild.headline}</h3>
        <p className="text-body text-ink-secondary">{enterpriseBuild.body}</p>
      </div>

      <ol className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((s, i) => (
          <li key={s.name} className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-foreground font-mono text-label text-background tabular-nums">
                {i + 1}
              </span>
              <span aria-hidden className="hidden h-px flex-1 bg-line-strong lg:block" />
            </div>
            <h4 className="mt-2 text-body font-medium">{s.name}</h4>
            <p className="text-small text-ink-secondary">{s.body}</p>
            <p className="mt-auto flex gap-2 pt-2 text-label text-ink-muted">
              <span aria-hidden>◆</span>
              <span>
                <span className="font-medium text-ink-secondary">Gate: </span>
                {s.gate}
              </span>
            </p>
          </li>
        ))}
      </ol>

      <ul className="mt-10 grid gap-3 md:grid-cols-2">
        {notes.map((n) => (
          <li key={n} className="rounded-md bg-surface px-4 py-3 text-small text-ink-secondary">
            {n}
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {[split.us, split.you].map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <h4 className="border-b border-line pb-3 text-small font-medium">{col.title}</h4>
            <ul className="flex flex-col gap-2">
              {col.items.map((it) => (
                <li key={it} className="text-small text-ink-secondary">
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <TextLink href={startPaths.howLink.href} className="mt-10">
        {startPaths.howLink.label}
      </TextLink>
    </div>
  )
}
