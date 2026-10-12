import Link from "next/link"
import { ArrowRightIcon, ArrowUpRightIcon, BookOpenTextIcon, BracketsCurlyIcon, CheckIcon, TerminalWindowIcon } from "@phosphor-icons/react/dist/ssr"
import { siGooglecalendar, siHubspot, siShopify, siZendesk } from "simple-icons"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { componentHref } from "@/content/platform"
import { startPaths } from "@/content/landing"
import { resources } from "@/content/structure"
import { FeatureTrio } from "@/components/structured-landing"

/**
 * The platform parts the page doesn't cover elsewhere (/lab/v3): Simulations,
 * QA, Channels and Tools & Integrations, as cards with a small graphic, the
 * name and one benefit line, linking to their pages. Agents and Workflow have
 * their own sections; self-serve and resources live in the closing CTA.
 * A bento: two wide cards and two narrow, with developer resources running
 * the full height of the last column. Dark and light alternate. Static.
 */

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
        <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-12">
          {/* Post-call and tools, in the same style as the cards above */}
          <li className="flex min-w-0 lg:col-span-4">
            <Panel className="flex w-full flex-col gap-5 p-6 sm:p-7">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-h4 font-normal">Follow-up done after every call</h3>
                <p className="text-small text-ink-secondary">A summary, your CRM updated and the call scored, before anyone looks.</p>
              </div>
              <div aria-hidden className="flex flex-1 flex-col gap-3 rounded-md border border-line bg-background p-3 text-small">
                <div className="flex items-center justify-between text-label text-ink-muted">
                  <span>Call with Maya · 3:42</span>
                  <span>Post-call</span>
                </div>
                <p className="text-ink-secondary">Double charge on 4 March confirmed. Refund needs approval, so a ticket was raised and the reference texted.</p>
                <ul className="flex flex-col">
                  {[
                    ["intent", "Duplicate charge"],
                    ["sentiment", "Calm"],
                    ["CRM", "HubSpot updated"],
                    ["Ticket", "#TCK-2291"],
                    ["QA score", "4.6 / 5"],
                  ].map(([k, v]) => (
                    <li key={k} className="flex items-center justify-between gap-3 border-t border-line py-2">
                      <span className="text-ink-muted">{k}</span>
                      <span className="flex items-center gap-1.5">
                        <CheckIcon weight="bold" className="size-3.5 text-[oklch(0.55_0.13_150)]" />
                        {v}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <TextLink href="/platform" className="mt-auto">
                See post-call
              </TextLink>
            </Panel>
          </li>
          <li className="flex min-w-0 lg:col-span-4">
            <Panel className="flex w-full flex-col gap-5 p-6 sm:p-7">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-h4 font-normal">Works inside your systems</h3>
                <p className="text-small text-ink-secondary">Your CRM, helpdesk and calendar out of the box, and your own tools via API or MCP.</p>
              </div>
              <div aria-hidden className="flex flex-1 flex-col overflow-hidden rounded-md border border-line bg-background text-small">
                <div className="grid grid-cols-[1fr_auto] border-b border-line px-3 py-2 text-label text-ink-muted">
                  <span>Integration</span>
                  <span>Used for</span>
                </div>
                {[
                  { n: "HubSpot", i: siHubspot, d: "CRM" },
                  { n: "Zendesk", i: siZendesk, d: "Tickets" },
                  { n: "Google Calendar", i: siGooglecalendar, d: "Bookings" },
                  { n: "Shopify", i: siShopify, d: "Orders" },
                ].map((t) => (
                  <div key={t.n} className="grid grid-cols-[1fr_auto] items-center border-b border-line px-3 py-2.5">
                    <span className="flex items-center gap-2.5">
                      <span className="grid size-7 place-items-center rounded-md border border-line">
                        <svg viewBox="0 0 24 24" className="size-4" style={{ fill: `#${t.i.hex}` }} aria-hidden>
                          <path d={t.i.path} />
                        </svg>
                      </span>
                      {t.n}
                    </span>
                    <span className="text-ink-muted">{t.d}</span>
                  </div>
                ))}
                <div className="mt-auto flex items-center gap-2 bg-surface px-3 py-2 text-label text-ink-secondary">
                  <span className="rounded-[4px] bg-foreground/[0.07] px-1 font-mono text-[11px] text-foreground/85">take_payment</span>
                  your own tools, called by name
                </div>
              </div>
              <TextLink href={componentHref("tools")} className="mt-auto">
                See integrations
              </TextLink>
            </Panel>
          </li>

          {/* Resources close the row */}
          <li className="flex min-w-0 sm:col-span-2 lg:col-span-4">
            <Panel className="flex w-full flex-col p-6 sm:p-7">
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
            </Panel>
          </li>
        </ul>
      </Container>
    </Section>
  )
}
