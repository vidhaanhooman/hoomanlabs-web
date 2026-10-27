import { ArrowUpRightIcon, CheckIcon } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"
import { siGmail, siWhatsapp, siGooglecalendar, siGooglesheets, siHubspot, siRazorpay, siShopify, siStripe, siZapier, siZendesk, type SimpleIcon } from "simple-icons"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { componentHref } from "@/content/platform"
import { cn } from "@/lib/utils"

import { SummaryPanel } from "@/components/sections/summary-panel"
import { MINI } from "@/components/structured-landing"
import { resources } from "@/content/structure"

/**
 * The platform parts the page doesn't cover elsewhere (/lab/v3):
 * simulations, QA and post-call as one product panel (SummaryPanel), each
 * part a tab with its graphic on the stage; then integrations as a carousel
 * with developer resources beside it (Connect).
 */

const ROWS = [
  { id: "tested", tab: "Simulations", title: "Tested first", body: "Simulated callers test every version before it talks to a customer." },
  { id: "measured", tab: "QA", title: "Every call measured", body: "Know what works, and get an alert the moment it slips." },
  { id: "follow-up", tab: "Post-call", title: "Follow-up done", body: "Summary, CRM, ticket and follow-up, done before anyone looks." },
]

function FollowUp() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-label text-ink-muted">
        <span>Call with Maya · 3:42</span>
        <span>Post-call</span>
      </div>
      <ul className="flex flex-col">
        {[
          ["Summary", "Written"],
          ["CRM", "HubSpot updated"],
          ["Ticket", "#TCK-2291"],
          ["QA score", "4.6 / 5"],
          ["Follow-up", "SMS sent"],
        ].map(([k, v]) => (
          <li key={k} className="flex items-center justify-between gap-3 border-t border-line py-2">
            <span className="text-ink-muted">{k}</span>
            <span className="flex items-center gap-1.5">
              <CheckIcon weight="bold" className="size-3.5 text-success" />
              {v}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** The small graphics are full-bleed inside the light card, without their own frame. */
const UNFRAME = "-m-3 [&>div]:rounded-none [&>div]:border-0"

/** Brand colours too dark to read on a dark page follow the text colour instead. */
const isDark = (hex: string) => {
  const [r, g, b] = [0, 2, 4].map((k) => parseInt(hex.slice(k, k + 2), 16) / 255)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.2
}

/** A tool named inline: its logo and name in a small chip. Brand marks from simple-icons. */
function Tool({ n, i, after = "" }: { n: string; i: SimpleIcon; after?: string }) {
  return (
    <span className="whitespace-nowrap">
      <span className="mx-[0.15em] inline-flex items-center gap-[0.4em] rounded-md border border-line bg-background px-[0.5em] py-[0.15em] align-[0.05em] text-[0.88em] leading-none whitespace-nowrap">
        <svg viewBox="0 0 24 24" aria-hidden className={cn("size-[0.9em] shrink-0", isDark(i.hex) && "fill-foreground")} style={isDark(i.hex) ? undefined : { fill: `#${i.hex}` }}>
          <path d={i.path} />
        </svg>
        {n}
      </span>
      {after}
    </span>
  )
}

/**
 * Under the summary panel: integrations as one sentence saying what the
 * agent does in each tool (the tools inline as logo chips), and the developer
 * resources beside it.
 */
function Connect() {
  return (
    <Section id="sl-connect" spacing="none" className="pt-[calc(var(--panel-gap,0.75rem)/2)] pb-[calc(var(--card-gap,0.75rem)/2)]">
      <Container>
        <div className="grid gap-(--card-gap,0.75rem) lg:grid-cols-3">
          <Panel className="flex min-w-0 flex-col gap-6 p-8 sm:p-10 lg:col-span-2">
            <h3 className="text-h4 font-normal">
              Your systems
              <span className="block text-ink-secondary">Agents act on the tools you already run.</span>
            </h3>
            {/* What the agent does in each tool, said in one sentence with the tools inline */}
            <p className="max-w-[44rem] text-[1.125rem] leading-[2.1] font-normal">
              Agents update <Tool n="HubSpot" i={siHubspot} after="," /> raise tickets in <Tool n="Zendesk" i={siZendesk} after="," /> check orders in{" "}
              <Tool n="Shopify" i={siShopify} after="," /> book visits in <Tool n="Google Calendar" i={siGooglecalendar} after="," /> take payments with{" "}
              <Tool n="Razorpay" i={siRazorpay} /> and send links on <Tool n="WhatsApp" i={siWhatsapp} after="." />
            </p>
            <TextLink href={componentHref("tools")} className="mt-auto">
              See integrations
            </TextLink>
          </Panel>
          <Panel className="flex flex-col p-8 sm:p-10">
            <h3 className="text-h4 font-normal">
              For developers
              <span className="block text-ink-secondary">Build on it from your own code.</span>
            </h3>
            {/* A real request, so developers see the API at a glance */}
            <pre
              aria-label="Example API request"
              className="ui-dark mt-5 overflow-x-auto rounded-md border border-(--ui-line) bg-(--ui-bg) p-4 font-mono text-[12px] leading-relaxed text-(--ui-text) [scrollbar-width:none]"
            >
              <span className="text-(--ui-muted)"># place a call with an agent</span>
              {"\n"}curl api.hoomanlabs.com/v1/calls \{"\n"}
              {"  "}-H <span className="text-(--ok-fg)">&quot;Authorization: Bearer $KEY&quot;</span> \{"\n"}
              {"  "}-d <span className="text-(--ok-fg)">&apos;{"{"}&quot;agent&quot;: &quot;ria-support&quot;,</span>
              {"\n"}
              {"       "}
              <span className="text-(--ok-fg)">&quot;to&quot;: &quot;+91 99300 xxxxx&quot;{"}"}&apos;</span>
            </pre>
            <ul className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-5 text-small">
              {resources.links
                .filter((r) => r.label !== "Changelog")
                .map((r) => (
                  <li key={r.label}>
                    <Link href={r.href} className="group inline-flex items-center gap-1">
                      {r.label}
                      <ArrowUpRightIcon className="size-3.5 text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
            </ul>
          </Panel>
        </div>
      </Container>
    </Section>
  )
}

export function StartResources() {
  return (
    <>
      <SummaryPanel
        rows={ROWS}
        screens={{
          tested: <div className={UNFRAME}>{MINI["feature-guardrails"]}</div>,
          measured: <div className={UNFRAME}>{MINI["feature-analytics"]}</div>,
          "follow-up": <FollowUp />,
        }}
      />
      <Connect />
    </>
  )
}
