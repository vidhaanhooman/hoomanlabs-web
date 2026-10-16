import Link from "next/link"
import {
  ArrowDownIcon,
  BroomIcon,
  CalendarBlankIcon,
  ChatTextIcon,
  CheckIcon,
  CodeIcon,
  GitBranchIcon,
  LightningIcon,
  PhoneCallIcon,
  PhoneDisconnectIcon,
  PlugsIcon,
  RepeatIcon,
  TagIcon,
  TimerIcon,
  WebhooksLogoIcon,
} from "@phosphor-icons/react/dist/ssr"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { workflowsPage as c } from "@/content/pages/workflows"

/**
 * Two sections for /platform/workflows. WorkflowTypes introduces the two kinds
 * of workflow side by side (tools inside a live call, journeys over days),
 * each linking down to its own section. BuildingBlocks is the one place for
 * the pieces every workflow is made of: triggers, AI steps, and code and
 * actions, kept short (the journey shows them at work).
 */

const TYPE_ICON = { tools: TimerIcon, journeys: RepeatIcon }
const DOCS = "https://docs.hoomanlabs.com"
const ROW_ICON = {
  "Call ended": PhoneDisconnectIcon,
  Webhook: WebhooksLogoIcon,
  Schedule: CalendarBlankIcon,
  "Tool call": LightningIcon,
  Classify: TagIcon,
  Decide: GitBranchIcon,
  "Extract & clean": BroomIcon,
  "API call": PlugsIcon,
  "Ready-made action": ChatTextIcon,
  Code: CodeIcon,
  "Call-back": PhoneCallIcon,
}

export function WorkflowTypes() {
  const { label, title, items } = c.types
  return (
    <Section id="workflows-types">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <span className="font-mono text-label text-ink-muted">{label}</span>
          <h2 className="text-h2 font-normal">{title}</h2>
        </div>
        <ul className="mt-10 grid gap-3 md:grid-cols-2">
          {items.map((t) => {
            const Icon = TYPE_ICON[t.id as keyof typeof TYPE_ICON]
            return (
              <li key={t.id} className="flex">
                <Link href={t.href} className="group flex w-full flex-col gap-5 rounded-xl border border-line p-6 transition-colors hover:border-line-strong sm:p-8">
                  <span className="flex items-center justify-between gap-3">
                    <span className="grid size-10 place-items-center rounded-lg bg-surface">
                      <Icon className="size-5 text-ink-secondary" />
                    </span>
                    <span className="rounded-full border border-line px-3 py-1 text-label text-ink-secondary">{t.span}</span>
                  </span>
                  <span className="flex flex-col gap-2">
                    <span className="text-h3 font-normal">{t.name}</span>
                    <span className="text-body text-ink-secondary">{t.body}</span>
                  </span>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-small font-medium">
                    See how it works
                    <ArrowDownIcon className="size-3.5 transition-transform group-hover:translate-y-0.5" />
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}

export function BuildingBlocks() {
  const { label, title, line, items } = c.blocks
  return (
    <Section id="workflows-blocks">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <span className="font-mono text-label text-ink-muted">{label}</span>
          <h2 className="text-h2 font-normal">{title}</h2>
          <p className="text-body text-ink-secondary">{line}</p>
        </div>
        {/* In the homepage platform cards' style: name, line, a light inset table, link */}
        <ul className="mt-10 grid gap-3 lg:grid-cols-3">
          {items.map((b) => {
            return (
              <li key={b.id} className="flex min-w-0">
                <Panel className="flex w-full flex-col gap-5 p-6 sm:p-7">
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-h4 font-normal">{b.name}</h3>
                    <p className="text-small text-ink-secondary">{b.body}</p>
                  </div>
                  <div aria-hidden className="flex flex-col overflow-hidden rounded-md border border-line bg-background text-small">
                    <div className="grid grid-cols-[1fr_auto] gap-3 border-b border-line px-3 py-2 text-label text-ink-muted">
                      <span>{b.head[0]}</span>
                      <span>{b.head[1]}</span>
                    </div>
                    {b.rows.map((r) => {
                      const Icon = ROW_ICON[r.k as keyof typeof ROW_ICON] ?? CodeIcon
                      return (
                        <div key={r.k} className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-line px-3 py-2.5">
                          <span className="flex items-center gap-2.5">
                            <span className="grid size-7 shrink-0 place-items-center rounded-md border border-line">
                              <Icon className="size-3.5 text-ink-secondary" />
                            </span>
                            {r.k}
                          </span>
                          <span className="flex items-center gap-1.5 text-right text-ink-muted">
                            {b.id === "ai" && <CheckIcon weight="bold" className="size-3.5 shrink-0 text-success" />}
                            {r.v}
                          </span>
                        </div>
                      )
                    })}
                    <div className="mt-auto flex flex-wrap items-center gap-2 bg-surface px-3 py-2 text-label text-ink-secondary">
                      <span className="rounded-[4px] bg-foreground/[0.07] px-1 font-mono text-[11px] text-foreground/85">{b.foot.code}</span>
                      {b.foot.text}
                    </div>
                  </div>
                  <TextLink href={b.id === "act" ? "/platform/integrations" : DOCS} className="mt-auto">
                    {b.link}
                  </TextLink>
                </Panel>
              </li>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}
