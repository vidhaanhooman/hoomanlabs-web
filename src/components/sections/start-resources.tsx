import Link from "next/link"
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon, GlobeIcon, PhoneIcon } from "@phosphor-icons/react/dist/ssr"
import { siHubspot, siWhatsapp, siZendesk, type SimpleIcon } from "simple-icons"

import { Container } from "@/components/layout/container"
import { Halftone } from "@/components/layout/halftone"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { componentHref, components, type ComponentId } from "@/content/platform"
import { startPaths } from "@/content/landing"
import { resources } from "@/content/structure"
import { cn } from "@/lib/utils"

/**
 * Everything in one platform (/lab/v3). The six platform parts as cards in
 * the use-case card pattern (a stage with one small product graphic, then
 * the name and one line); on the right, the resources list as before, and
 * self-serve as a card under it. Dark and light graphics alternate. Static.
 */

const DARK = "dark graphite"

function Snip({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border border-line-strong bg-linear-to-b from-surface to-background to-40% p-2.5 shadow-[inset_0_1px_0_oklch(1_0_0/0.07),0_14px_32px_-14px_oklch(0_0_0/0.35)]",
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

function Brand({ icon }: { icon: SimpleIcon }) {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
      <path d={icon.path} />
    </svg>
  )
}

const Code = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-[4px] bg-foreground/[0.07] px-1 py-px font-mono text-[10px] text-foreground/85">{children}</span>
)

/* ------------------------------------------------------------ graphics */

const GRAPHICS: Record<ComponentId, () => React.ReactNode> = {
  agents: () => (
    <Snip className="w-48 gap-1.5">
      <span className="flex items-center justify-between">
        <span className="font-medium">Billing assistant</span>
        <span className="text-[10px] text-ink-muted">v5</span>
      </span>
      <span className="text-ink-secondary">
        Balance is <Code>{"{{context.balance}}"}</Code>
      </span>
      <span className="text-[10.5px] text-ink-muted">Ria · en-GB · 30 languages</span>
    </Snip>
  ),
  workflow: () => (
    <Snip className="w-48 gap-0">
      {[
        ["When", "Call not answered"],
        ["Then", "Send WhatsApp"],
        ["Then", "Retry in 2 hours"],
      ].map(([k, v], i) => (
        <span key={i} className="flex items-center gap-2 border-t border-line py-1.5 first:border-0">
          <span className="w-8 shrink-0 font-mono text-[10px] text-ink-muted">{k}</span>
          <span className="flex-1 truncate">{v}</span>
          {i > 0 && <Tick />}
        </span>
      ))}
    </Snip>
  ),
  simulations: () => (
    <Snip className="w-48 gap-2">
      <span className="flex items-center justify-between">
        <span>Personas</span>
        <span className="font-medium tabular-nums">18 / 18</span>
      </span>
      <span className="grid grid-cols-9 gap-1">
        {Array.from({ length: 18 }, (_, i) => (
          <span key={i} className="h-2 rounded-[2px] bg-foreground/80" />
        ))}
      </span>
      <span className="text-[10.5px] text-ink-muted">Passed before go-live</span>
    </Snip>
  ),
  qa: () => (
    <Snip className="w-44 gap-1.5">
      <span className="flex items-baseline gap-1">
        <span className="text-[1.4rem] leading-none tabular-nums">4.6</span>
        <span className="text-ink-muted">/ 5</span>
      </span>
      {[96, 90, 88].map((v, i) => (
        <span key={i} className="h-1.5 overflow-hidden rounded-full bg-foreground/10">
          <span className="block h-full rounded-full bg-foreground" style={{ width: `${v}%` }} />
        </span>
      ))}
    </Snip>
  ),
  channels: () => (
    <div className="grid w-48 grid-cols-2 gap-1.5 text-[11px]">
      {[
        { n: "Phone", i: <PhoneIcon className="size-3.5" /> },
        { n: "WhatsApp", i: <Brand icon={siWhatsapp} /> },
        { n: "Web", i: <GlobeIcon className="size-3.5" /> },
        { n: "App", i: <PhoneIcon className="size-3.5 rotate-90" /> },
      ].map((c) => (
        <span key={c.n} className="flex items-center gap-1.5 rounded-md border border-line-strong bg-background px-2 py-1.5 shadow-sm">
          {c.i}
          {c.n}
        </span>
      ))}
    </div>
  ),
  tools: () => (
    <Snip className="w-48 gap-0">
      {[
        { n: "HubSpot", i: <Brand icon={siHubspot} />, d: "CRM" },
        { n: "Zendesk", i: <Brand icon={siZendesk} />, d: "Tickets" },
        { n: "take_payment", i: <Tick />, d: "Tool" },
      ].map((t) => (
        <span key={t.n} className="flex items-center gap-2 border-t border-line py-1.5 first:border-0">
          {t.i}
          <span className="flex-1">{t.n}</span>
          <span className="text-[10.5px] text-ink-muted">{t.d}</span>
        </span>
      ))}
    </Snip>
  ),
}

/* Dark and light alternate in a checkerboard across the 3 × 2 grid. */
const DARK_IDS: ComponentId[] = ["agents", "qa", "simulations"]
const FOCUS: Record<ComponentId, string> = {
  agents: "15% 20%",
  workflow: "85% 15%",
  simulations: "20% 85%",
  qa: "80% 85%",
  channels: "50% 0%",
  tools: "100% 50%",
}

function SelfServe() {
  const s = startPaths.paths[0]
  return (
    <Link href={s.cta.href} className="group flex flex-col overflow-hidden rounded-xl border border-line bg-background transition-colors hover:border-line-strong">
      <div aria-hidden className="relative isolate flex h-40 items-center justify-center overflow-hidden bg-surface p-5">
        <Halftone focus="85% 20%" />
        <div className={cn("text-[11.5px] leading-snug text-foreground", DARK)}>
          <Snip className="w-52 gap-0">
            {[
              ["Sign up", "1 min"],
              ["Build an agent", "template"],
              ["Test", "18 passed"],
              ["Go live", "today"],
            ].map(([t, d], i) => (
              <span key={t} className="flex items-center gap-2 border-t border-line py-1 first:border-0">
                {i < 3 ? <Tick /> : <span className="size-3.5 shrink-0 rounded-full border border-line-strong" />}
                <span className="flex-1">{t}</span>
                <span className="text-[10px] text-ink-muted">{d}</span>
              </span>
            ))}
          </Snip>
        </div>
      </div>
      <div className="flex flex-col gap-1 border-t border-line p-4">
        <span className="flex items-center justify-between text-body font-medium">
          Start self-serve
          <ArrowRightIcon className="size-4 text-ink-muted transition-transform group-hover:translate-x-0.5" />
        </span>
        <span className="text-small text-ink-secondary">Sign up, build an agent, test it and go live yourself.</span>
      </div>
    </Link>
  )
}

export function StartResources() {
  return (
    <Section id="sl-summary">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <h2 className="max-w-[44rem] text-h2 font-normal">{resources.title}</h2>
          <TextLink href="/platform">See the full platform</TextLink>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* The platform parts */}
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {components.map((c) => {
              const G = GRAPHICS[c.id]
              return (
                <li key={c.id} className="flex min-w-0">
                  <Link
                    href={componentHref(c.id)}
                    className="group flex w-full min-w-0 flex-col overflow-hidden rounded-xl border border-line bg-background transition-colors hover:border-line-strong"
                  >
                    <div aria-hidden className="relative isolate flex h-40 items-center justify-center overflow-hidden bg-surface p-4">
                      <Halftone focus={FOCUS[c.id]} />
                      <div
                        className={cn(
                          "text-[11.5px] leading-snug text-foreground transition-transform duration-300 ease-(--ease-out) group-hover:-translate-y-1",
                          DARK_IDS.includes(c.id) && DARK
                        )}
                      >
                        <G />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-1 border-t border-line p-4">
                      <span className="flex items-center justify-between text-body font-medium">
                        {c.name}
                        <ArrowRightIcon className="size-4 text-ink-muted transition-transform group-hover:translate-x-0.5" />
                      </span>
                      <span className="text-small text-ink-secondary">{c.summary}</span>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Resources, as before, then self-serve */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <p className="pb-3 font-mono text-label text-ink-muted">Resources</p>
              <ul className="flex flex-col border-t border-line">
                {resources.links
                  .filter((r) => r.label !== "Changelog")
                  .map((r) => (
                    <li key={r.label} className="border-b border-line">
                      <Link href={r.href} className="group flex items-center justify-between gap-4 py-3.5">
                        <span className="flex flex-col">
                          <span className="text-body">{r.label}</span>
                          <span className="text-small text-ink-secondary">{r.body}</span>
                        </span>
                        <ArrowUpRightIcon className="size-4 text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
            <SelfServe />
          </div>
        </div>
      </Container>
    </Section>
  )
}
