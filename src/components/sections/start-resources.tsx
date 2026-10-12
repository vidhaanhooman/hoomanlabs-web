import Link from "next/link"
import { ArrowRightIcon, ArrowUpRightIcon, BookOpenTextIcon, BracketsCurlyIcon, CheckIcon, DeviceMobileIcon, GlobeIcon, PhoneIcon, TerminalWindowIcon } from "@phosphor-icons/react/dist/ssr"
import { siGooglecalendar, siHubspot, siShopify, siWhatsapp, siZendesk, type SimpleIcon } from "simple-icons"

import { Container } from "@/components/layout/container"
import { Halftone } from "@/components/layout/halftone"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { componentHref, components, type ComponentId } from "@/content/platform"
import { startPaths } from "@/content/landing"
import { resources } from "@/content/structure"
import { FeatureTrio } from "@/components/structured-landing"
import { cn } from "@/lib/utils"

/**
 * The platform parts the page doesn't cover elsewhere (/lab/v3): Simulations,
 * QA, Channels and Tools & Integrations, as cards with a small graphic, the
 * name and one benefit line, linking to their pages. Agents and Workflow have
 * their own sections; self-serve and resources live in the closing CTA.
 * A bento: two wide cards and two narrow, with developer resources running
 * the full height of the last column. Dark and light alternate. Static.
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
    <Snip className="w-44 gap-1.5">
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
    <Snip className="w-44 gap-0">
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
    <Snip className="w-80 gap-0">
      <span className="flex items-center justify-between pb-1.5">
        <span className="font-medium">Billing assistant · v5</span>
        <span className="tabular-nums">18 / 18 passed</span>
      </span>
      {[
        ["Frustrated repeat caller", "Payment not applied"],
        ["Switches to Hindi", "Explain tariff"],
        ["Asks for a human", "Escalation"],
      ].map(([p, t]) => (
        <span key={p} className="flex items-center gap-2 border-t border-line py-1.5">
          <Tick />
          <span className="flex-1">{p}</span>
          <span className="text-[10.5px] text-ink-muted">{t}</span>
        </span>
      ))}
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
    <div className="grid w-44 grid-cols-2 gap-1.5 text-[11px]">
      {[
        { n: "Phone", i: <PhoneIcon className="size-3.5" /> },
        { n: "WhatsApp", i: <Brand icon={siWhatsapp} /> },
        { n: "Web", i: <GlobeIcon className="size-3.5" /> },
        { n: "App", i: <DeviceMobileIcon className="size-3.5" /> },
      ].map((c) => (
        <span key={c.n} className="flex items-center gap-1.5 rounded-md border border-line-strong bg-background px-2 py-1.5 shadow-sm">
          {c.i}
          {c.n}
        </span>
      ))}
    </div>
  ),
  tools: () => (
    <Snip className="w-80 gap-2">
      <div className="grid grid-cols-2 gap-x-4">
        {[
          { n: "HubSpot", i: <Brand icon={siHubspot} />, d: "CRM" },
          { n: "Zendesk", i: <Brand icon={siZendesk} />, d: "Tickets" },
          { n: "Calendar", i: <Brand icon={siGooglecalendar} />, d: "Bookings" },
          { n: "Shopify", i: <Brand icon={siShopify} />, d: "Orders" },
        ].map((t) => (
          <span key={t.n} className="flex items-center gap-2 border-t border-line py-1.5 [&:nth-child(-n+2)]:border-0">
            {t.i}
            <span className="flex-1 truncate">{t.n}</span>
            <span className="text-[10px] text-ink-muted">{t.d}</span>
          </span>
        ))}
      </div>
      <span className="flex items-center gap-2 border-t border-line pt-2">
        <Tick />
        <Code>take_payment</Code>
        <span className="text-[10.5px] text-ink-muted">your own tools, via API or MCP</span>
      </span>
    </Snip>
  ),
}

/** Post-call: the summary and the follow-ups done after goodbye. */
function PostCallGraphic() {
  return (
    <Snip className="w-72 gap-2">
      <span className="text-ink-muted">Summary</span>
      <span>Double charge on 4 March confirmed; refund ticket raised and reference texted.</span>
      <span className="flex flex-col border-t border-line pt-1">
        {[
          ["CRM updated", "HubSpot"],
          ["Ticket created", "#TCK-2291"],
          ["QA score", "4.6 / 5"],
        ].map(([t, d]) => (
          <span key={t} className="flex items-center gap-2 py-1">
            <Tick />
            <span className="flex-1">{t}</span>
            <span className="text-[10.5px] text-ink-muted">{d}</span>
          </span>
        ))}
      </span>
    </Snip>
  )
}

/* Dark and light alternate in a checkerboard across the 3 × 2 grid. */
/** One benefit line per part (the platform pages carry the detail). */
const LINE: Record<ComponentId, string> = {
  agents: "Plain-language prompts with your data built in.",
  workflow: "Follow-ups, retries and campaigns run themselves.",
  simulations: "Every change tested against real personas first.",
  qa: "Every call scored, with alerts when quality slips.",
  channels: "One agent on phone, WhatsApp, web and app.",
  tools: "Works inside your CRM, helpdesk and calendar.",
}
const DARK_IDS: ComponentId[] = ["simulations", "qa", "tools"]
const FOCUS: Record<ComponentId, string> = {
  agents: "15% 20%",
  workflow: "85% 15%",
  simulations: "20% 85%",
  qa: "80% 85%",
  channels: "50% 0%",
  tools: "100% 50%",
}

type Card = { key: string; name: string; line: string; href: string; span: string; dark: boolean; focus: string; G: () => React.ReactNode }

const part = (id: ComponentId, span: string): Card => ({
  key: id,
  name: components.find((x) => x.id === id)!.name,
  line: LINE[id],
  href: componentHref(id),
  span,
  dark: DARK_IDS.includes(id),
  focus: FOCUS[id],
  G: GRAPHICS[id],
})

/**
 * The parts not covered by their own sections on this page (Agents and Workflow
 * are), plus post-call. Two rows of three that zig-zag on 12 columns; the
 * resources card closes the second row.
 */
const CARDS: Card[] = [
  { key: "post", name: "Post-call", line: "Summary, CRM update and a score after every call.", href: "/platform", span: "lg:col-span-4", dark: false, focus: "85% 20%", G: PostCallGraphic },
  part("tools", "lg:col-span-4"),
]

export function StartResources() {
  return (
    <Section id="sl-summary">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div className="flex max-w-[44rem] flex-col gap-3">
            <h2 className="text-h2 font-normal">Tested, scored and connected.</h2>
            <p className="text-body text-ink-secondary">Everything around the agent, in the same platform.</p>
          </div>
          <TextLink href="/platform">See the full platform</TextLink>
        </div>
        {/* The detailed channels, simulations and analytics cards */}
        <div className="mt-10 grid gap-3 lg:grid-cols-12">
          <FeatureTrio />
        </div>
        <ul className="mt-3 grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-12">
          {CARDS.map(({ key, name, line, href, span, dark, focus, G }) => (
            <li key={key} className={cn("flex min-w-0", span)}>
              <Link
                href={href}
                className="group flex w-full min-w-0 flex-col overflow-hidden rounded-xl border border-line bg-background transition-colors hover:border-line-strong"
              >
                <div aria-hidden className="relative isolate flex min-h-40 flex-1 items-center justify-center overflow-hidden bg-surface p-4">
                  <Halftone focus={focus} />
                  <div
                    className={cn(
                      "text-[11.5px] leading-snug text-foreground transition-transform duration-300 ease-(--ease-out) group-hover:-translate-y-0.5",
                      dark && DARK
                    )}
                  >
                    <G />
                  </div>
                </div>
                <div className="flex flex-col gap-1 border-t border-line p-4">
                  <span className="flex items-center justify-between text-body font-medium">
                    {name}
                    <ArrowRightIcon className="size-4 text-ink-muted transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="text-small text-ink-secondary">{line}</span>
                </div>
              </Link>
            </li>
          ))}

          {/* Resources close the row */}
          <li className="flex min-w-0 sm:col-span-2 lg:col-span-4">
            <div className="flex w-full flex-col rounded-xl border border-line bg-surface p-5">
              <span className="font-mono text-label text-ink-muted">Resources</span>
              <p className="pt-1 text-body font-medium">For developers</p>
              <ul className="mt-4 flex flex-col">
                {resources.links
                  .filter((r) => r.label !== "Changelog")
                  .map((r, i) => {
                    const Ico = [BookOpenTextIcon, BracketsCurlyIcon, TerminalWindowIcon][i] ?? BookOpenTextIcon
                    return (
                      <li key={r.label} className="border-t border-line first:border-0">
                        <Link href={r.href} className="group flex h-full items-center gap-3 py-3.5">
                          <span className="grid size-9 shrink-0 place-items-center rounded-md border border-line bg-background text-ink-secondary transition-colors group-hover:text-foreground">
                            <Ico className="size-4" />
                          </span>
                          <span className="flex min-w-0 flex-1 flex-col">
                            <span className="text-body">{r.label}</span>
                            <span className="text-small text-ink-secondary">{r.body}</span>
                          </span>
                          <ArrowUpRightIcon className="size-4 shrink-0 text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                      </li>
                    )
                  })}
              </ul>
              <Link href={startPaths.paths[0].cta.href} className="group mt-auto flex items-center justify-between gap-3 border-t border-line pt-4 text-small">
                <span className="flex flex-col">
                  <span className="text-body font-medium">Start self-serve</span>
                  <span className="text-ink-secondary">Build, test and go live yourself.</span>
                </span>
                <ArrowRightIcon className="size-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </li>
        </ul>
      </Container>
    </Section>
  )
}
