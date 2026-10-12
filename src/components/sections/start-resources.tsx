import Link from "next/link"
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon } from "@phosphor-icons/react/dist/ssr"

import { Container } from "@/components/layout/container"
import { Halftone } from "@/components/layout/halftone"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { startPaths } from "@/content/landing"
import { resources } from "@/content/structure"
import { cn } from "@/lib/utils"

/**
 * Everything in one platform (/lab/v3): self-serve and the developer
 * resources only, as four cards in the use-case card pattern (a stage with
 * one small product graphic, then a title, the name in mono, one line and a
 * link). Dark and light graphics alternate. Static.
 */

const DARK = "dark graphite"

function Snip({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border border-line-strong bg-linear-to-b from-surface to-background to-40% p-3 shadow-[inset_0_1px_0_oklch(1_0_0/0.07),0_14px_32px_-14px_oklch(0_0_0/0.35)]",
        className
      )}
    >
      {children}
    </div>
  )
}

function Tick() {
  return (
    <span className="grid size-3.5 shrink-0 place-items-center rounded-full bg-foreground text-background">
      <CheckIcon weight="bold" className="size-2" />
    </span>
  )
}

/* ------------------------------------------------------------ graphics */

function SelfServe() {
  return (
    <Snip className="w-56 gap-0">
      {[
        ["Sign up", "1 min"],
        ["Build an agent", "from a template"],
        ["Test with simulations", "18 passed"],
        ["Go live", "today"],
      ].map(([t, d], i) => (
        <div key={t} className="flex items-center gap-2 border-t border-line py-1.5 first:border-0">
          {i < 3 ? <Tick /> : <span className="size-3.5 shrink-0 rounded-full border border-line-strong" />}
          <span className="flex-1">{t}</span>
          <span className="text-[10.5px] text-ink-muted">{d}</span>
        </div>
      ))}
    </Snip>
  )
}

function Docs() {
  return (
    <Snip className="w-56 gap-2">
      <span className="text-[10.5px] text-ink-muted">Guides / Agents</span>
      <span className="font-medium">Write your first prompt</span>
      <span className="flex flex-col gap-1.5">
        {[92, 80, 86, 54].map((w, i) => (
          <span key={i} className="h-1.5 rounded-full bg-foreground/10" style={{ width: `${w}%` }} />
        ))}
      </span>
      <span className="flex flex-col gap-0.5 border-t border-line pt-2 text-[10.5px] text-ink-muted">
        <span className="text-foreground">On this page</span>
        <span>Variables</span>
        <span>Conditions in CEL</span>
      </span>
    </Snip>
  )
}

function Api() {
  return (
    <Snip className="w-60 gap-1 font-mono text-[10.5px] leading-[1.6]">
      <span>
        <span className="text-[oklch(0.62_0.15_150)]">POST</span> /v1/calls
      </span>
      <span className="text-ink-muted">{"{"}</span>
      <span className="pl-3">
        <span className="text-ink-secondary">&quot;agent&quot;</span>: &quot;billing-v5&quot;,
      </span>
      <span className="pl-3">
        <span className="text-ink-secondary">&quot;to&quot;</span>: &quot;+44 20 7946 0958&quot;
      </span>
      <span className="text-ink-muted">{"}"}</span>
      <span className="mt-1 flex items-center gap-1.5 border-t border-line pt-1.5 font-sans text-[11px]">
        <Tick />
        201 Created · call_8f2k
      </span>
    </Snip>
  )
}

function Mcp() {
  return (
    <Snip className="w-60 gap-1.5 font-mono text-[10.5px] leading-[1.6]">
      <span className="text-ink-muted">hoomanlabs · MCP</span>
      <span>&gt; create a billing agent from our refund policy</span>
      <span className="flex items-center gap-1.5 font-sans text-[11px]">
        <Tick />
        Agent created · billing-v5
      </span>
      <span className="flex items-center gap-1.5 font-sans text-[11px]">
        <Tick />
        18 simulations passed
      </span>
    </Snip>
  )
}

/* ------------------------------------------------------------ cards */

const link = (label: string) => resources.links.find((l) => l.label === label)!
const selfServe = startPaths.paths[0]

const CARDS = [
  {
    title: "Live in hours, not months",
    label: "Self-serve",
    body: "Sign up, build an agent, test it and go live yourself.",
    href: selfServe.cta.href,
    cta: selfServe.cta.label,
    external: false,
    dark: true,
    focus: "15% 20%",
    Visual: SelfServe,
  },
  {
    title: "Everything explained",
    label: "Docs",
    body: "Guides and concepts for every part of the platform.",
    href: link("Docs").href,
    cta: "Read the docs",
    external: true,
    dark: false,
    focus: "85% 15%",
    Visual: Docs,
  },
  {
    title: "Build on HoomanLabs",
    label: "API reference",
    body: "Start calls, manage agents and read results from your own code.",
    href: link("API reference").href,
    cta: "API reference",
    external: true,
    dark: true,
    focus: "20% 85%",
    Visual: Api,
  },
  {
    title: "Manage agents from your editor",
    label: "MCP server",
    body: "Create, test and ship agents from Claude, Cursor or any MCP client.",
    href: link("MCP server").href,
    cta: "MCP server",
    external: false,
    dark: false,
    focus: "80% 85%",
    Visual: Mcp,
  },
]

export function StartResources() {
  return (
    <Section id="sl-summary">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div className="flex max-w-[44rem] flex-col gap-3">
            <h2 className="text-h2 font-normal">{resources.title}</h2>
            <p className="text-body text-ink-secondary">Start on your own today, with everything you need to build on it.</p>
          </div>
          <TextLink href="/platform">See the full platform</TextLink>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map(({ title, label, body, href, cta, external, dark, focus, Visual }) => (
            <li key={label} className="flex min-w-0">
              <Link href={href} className="group flex w-full min-w-0 flex-col overflow-hidden rounded-xl border border-line bg-background transition-colors hover:border-line-strong">
                <div aria-hidden className="relative isolate flex h-60 items-center justify-center overflow-hidden bg-surface p-5">
                  <Halftone focus={focus} />
                  <div className={cn("text-[12px] leading-snug text-foreground transition-transform duration-300 ease-(--ease-out) group-hover:-translate-y-1", dark && DARK)}>
                    <Visual />
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2 border-t border-line p-5">
                  <p className="text-h4 font-normal">{title}</p>
                  <h3 className="font-mono text-label text-ink-muted">{label}</h3>
                  <p className="text-small text-ink-secondary">{body}</p>
                  <span className="mt-auto flex items-center gap-1 pt-2 text-small font-medium">
                    {cta}
                    {external ? (
                      <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    ) : (
                      <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    )}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
