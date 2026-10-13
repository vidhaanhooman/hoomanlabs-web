import Link from "next/link"
import { ArrowRightIcon, CheckIcon } from "@phosphor-icons/react/dist/ssr"
import { siHubspot } from "simple-icons"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { WorkflowCanvas } from "@/components/product/flow-canvas"
import { cn } from "@/lib/utils"

/**
 * How it works (/lab/v3): three steps, each with a static crop of the real
 * product screen (the prompt editor, pre-call context, the finished workflow
 * run). Nothing pins or plays; hovering a card lifts its screen. Each step
 * links to where the full, annotated version lives.
 */

/* Dark product frame shared by the three crops. */
function Screen({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "ui-dark overflow-hidden rounded-lg text-[12px] leading-[1.6] shadow-[0_24px_60px_-34px_oklch(0.2_0.02_260/0.6)] transition-transform duration-300 ease-(--ease-out) group-hover:-translate-y-1",
        className
      )}
    >
      <div className="flex h-9 items-center gap-2 border-b border-(--ui-line) px-3 text-[11px] text-(--ui-muted)">
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2 rounded-full bg-white/10" />
          ))}
        </span>
        <span className="ml-1">{title}</span>
      </div>
      <div className="h-52 overflow-hidden">{children}</div>
    </div>
  )
}

const op = "text-[oklch(0.72_0.14_295)]"
const vr = "text-[oklch(0.78_0.11_240)]"
const Var = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-[4px] bg-[oklch(0.72_0.14_295/0.18)] px-1 font-mono text-[11px] text-[oklch(0.86_0.08_295)]">{`{{${children}}}`}</span>
)

/* 01 · a slice of the prompt editor */
function PromptCrop() {
  return (
    <Screen title="Billing assistant · Prompt">
      <div className="flex flex-col gap-2.5 p-4">
        <span className="font-medium">What you know at the start</span>
        <span className="text-(--ui-text)/80">
          Balance <Var>context.balance</Var>, due <Var>context.dueDate</Var>
        </span>
        <span className="pt-1 font-medium">If they owe money</span>
        <div className="relative rounded-md bg-[oklch(0.72_0.14_295/0.1)] px-3 py-2.5 font-mono text-[11px] leading-[1.7] ring-1 ring-[oklch(0.72_0.14_295/0.3)]">
          <div>
            <span className={op}>{"{{ "}</span>
            <span className={vr}>context.balance</span>
            <span className={op}>{" > 0 ?"}</span>
          </div>
          <div className="pl-3 text-(--ui-text)/85">
            &quot;Offer to take the payment with <span className="text-[oklch(0.82_0.12_80)]">[take_payment]</span>&quot;
          </div>
          <div className="pl-3 text-(--ui-text)/85">
            <span className={op}>: </span>&quot;Confirm nothing is owed&quot;<span className={op}>{" }}"}</span>
          </div>
          <span className="absolute -top-2.5 right-2.5 flex items-center gap-1 rounded-full border border-(--ui-line) bg-(--ui-bg) px-1.5 py-px font-sans text-[10px]">
            <CheckIcon weight="bold" className="size-2.5 text-(--ui-live)" />
            Valid CEL
          </span>
        </div>
      </div>
    </Screen>
  )
}

/* 02 · pre-call context, filled from your systems */
function ContextCrop() {
  return (
    <Screen title="Pre-call context">
      <div className="flex flex-col p-4">
        {[
          ["context.name", "Maya Patel"],
          ["context.account", "HE-48213"],
          ["context.balance", "£86.40"],
          ["context.lastCall", "12 Feb · meter reading"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-3 border-b border-(--ui-line) py-2 last:border-0">
            <span className="rounded-[4px] bg-white/[0.06] px-1 font-mono text-[11px] text-(--ui-text)/85">{k}</span>
            <span className="truncate">{v}</span>
          </div>
        ))}
        <span className="mt-3 flex items-center gap-2 text-[11px] text-(--ui-muted)">
          <svg viewBox="0 0 24 24" className="size-3.5" style={{ fill: `#${siHubspot.hex}` }}>
            <path d={siHubspot.path} />
          </svg>
          HubSpot · Billing API
          <span className="ml-auto flex items-center gap-1 text-(--ui-live)">
            <CheckIcon weight="bold" className="size-3" />
            140 ms
          </span>
        </span>
      </div>
    </Screen>
  )
}

/* 03 · the workflow, frozen on a finished run */
function WorkflowCrop() {
  return (
    <Screen title="Workflow · call.ended · done in 1.4s" className="bg-[oklch(0.13_0_0)]">
      {/* Zoomed into the run: AUTH, the parallel steps, and the results; the status pill is hidden */}
      <div className="relative h-full">
        <WorkflowCanvas vertical still className="absolute top-1/2 left-1/2 w-[165%] -translate-x-1/2 -translate-y-[48%] [&>div]:hidden" />
      </div>
    </Screen>
  )
}

const STEPS = [
  {
    n: "01",
    title: "Write the job",
    body: "In plain language, with conditions written right inside the prompt.",
    href: "/platform/agents#agents-anatomy",
    link: "See the prompt editor",
    Visual: PromptCrop,
  },
  {
    n: "02",
    title: "Connect your systems",
    body: "Before the first ring, the agent knows who's calling and why.",
    href: "/platform#product-tools",
    link: "See integrations",
    Visual: ContextCrop,
  },
  {
    n: "03",
    title: "It follows up for you",
    body: "After the call, the CRM, tickets and summaries update on their own.",
    href: "/platform#platform-workflow-anatomy",
    link: "See workflows",
    Visual: WorkflowCrop,
  },
]

export function HowItWorksV3() {
  return (
    <Section id="v3-agent">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div className="flex max-w-[44rem] flex-col gap-3">
            <h2 className="text-h2 font-normal">How it works.</h2>
            <p className="text-body text-ink-secondary">Three steps from a blank page to an agent on your phone line.</p>
          </div>
          <TextLink href="/platform">See the platform</TextLink>
        </div>
        <ol className="mt-10 grid gap-3 lg:grid-cols-3">
          {STEPS.map(({ n, title, body, href, link, Visual }) => (
            <li key={n} className="flex">
              <Link href={href} className="group flex w-full flex-col overflow-hidden rounded-xl bg-surface transition-colors hover:bg-[oklch(0.955_0_0)]">
                <div className="flex flex-col gap-1.5 p-6 pb-5 sm:p-7 sm:pb-5">
                  <span className="font-mono text-label text-ink-muted">{n}</span>
                  <h3 className="text-h4 font-normal">{title}</h3>
                  <p className="text-small text-ink-secondary">{body}</p>
                </div>
                <div className="mt-auto px-6 sm:px-7">
                  <Visual />
                </div>
                <span className="flex items-center gap-1 px-6 py-5 text-small font-medium sm:px-7">
                  {link}
                  <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
