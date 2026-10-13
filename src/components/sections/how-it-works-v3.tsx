import { siGooglecalendar, siHubspot, siShopify, siZendesk } from "simple-icons"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"

/**
 * How it works (/lab/v3): one calm band of three numbered steps, each with a
 * single small visual. Write the job → connect your systems → it follows up.
 * The detailed editor and workflow canvas live on /platform. Static.
 */

/* 1 · the prompt as one sentence, with the parts that matter as pills */
const PILL = "rounded-md px-1.5 py-0.5 text-[0.95em] whitespace-nowrap"
const KINDS = [
  { cls: "bg-[oklch(0.72_0.14_295/0.14)] text-[oklch(0.42_0.14_295)]", label: "Customer context" },
  { cls: "bg-[oklch(0.82_0.12_80/0.22)] text-[oklch(0.45_0.1_70)]", label: "Your rules" },
  { cls: "bg-[oklch(0.62_0.15_150/0.14)] text-[oklch(0.42_0.12_150)]", label: "An action" },
]

function PromptLine() {
  const [ctx, rule, act] = KINDS
  return (
    <div className="flex flex-col gap-4">
      <p className="text-body leading-[1.9]">
        Greet <span className={`${PILL} ${ctx.cls}`}>Maya</span>, check her{" "}
        <span className={`${PILL} ${ctx.cls}`}>£86.40 balance</span>, offer a{" "}
        <span className={`${PILL} ${rule.cls}`}>payment plan</span> if she can&rsquo;t pay in full, then{" "}
        <span className={`${PILL} ${act.cls}`}>text the reference</span>.
      </p>
      <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-label text-ink-muted">
        {KINDS.map((k) => (
          <li key={k.label} className="flex items-center gap-1.5">
            <span className={`size-2 rounded-[3px] ${k.cls}`} />
            {k.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* 2 · the systems it works in */
const SYSTEMS = [
  { name: "HubSpot", icon: siHubspot },
  { name: "Zendesk", icon: siZendesk },
  { name: "Google Calendar", icon: siGooglecalendar },
  { name: "Shopify", icon: siShopify },
]

function Systems() {
  return (
    <div className="flex flex-col gap-4">
      <ul className="grid grid-cols-2 gap-2">
        {SYSTEMS.map((s) => (
          <li key={s.name} className="flex items-center gap-2.5 rounded-md border border-line bg-background px-3 py-2.5 text-small">
            <svg viewBox="0 0 24 24" className="size-4 shrink-0" style={{ fill: `#${s.icon.hex}` }} aria-hidden>
              <path d={s.icon.path} />
            </svg>
            <span className="truncate">{s.name}</span>
          </li>
        ))}
      </ul>
      <p className="text-label text-ink-muted">Or your own tools, through the API or MCP.</p>
    </div>
  )
}

/* 3 · the follow-up, as a fine line of steps (outcomes-section style) */
const STROKE = { fill: "none", stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round" as const }
const FOLLOW = ["Call ends", "Summary", "CRM", "Reminder", "Done"]

function FollowUp() {
  const x = (i: number) => 26 + i * 67
  return (
    <svg viewBox="0 0 320 76" className="h-auto w-full text-foreground" aria-hidden>
      <line x1={x(0)} y1={24} x2={x(4)} y2={24} {...STROKE} />
      {FOLLOW.map((label, i) => (
        <g key={label}>
          <circle cx={x(i)} cy={24} r={5} className={i === FOLLOW.length - 1 ? "fill-foreground" : "fill-surface"} stroke="currentColor" strokeWidth={1.3} />
          <text x={x(i)} y={52} fontSize={10.5} textAnchor="middle" className={i === FOLLOW.length - 1 ? "fill-foreground" : "fill-ink-muted"}>
            {label}
          </text>
        </g>
      ))}
      <text x={x(3)} y={70} fontSize={9.5} textAnchor="middle" className="fill-ink-muted">
        if unpaid, in 2 days
      </text>
    </svg>
  )
}

const STEPS = [
  { n: "01", title: "Write the job", body: "In plain language, with what you know about the customer built in.", Visual: PromptLine },
  { n: "02", title: "Connect your systems", body: "The agent looks things up and takes action where your data lives.", Visual: Systems },
  { n: "03", title: "It follows up for you", body: "Summaries, updates and reminders run on their own after the call.", Visual: FollowUp },
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
          {STEPS.map(({ n, title, body, Visual }) => (
            <li key={n} className="flex">
              <Panel className="flex w-full flex-col gap-6 p-6 sm:p-7">
                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-label text-ink-muted">{n}</span>
                  <h3 className="text-h4 font-normal">{title}</h3>
                  <p className="text-small text-ink-secondary">{body}</p>
                </div>
                <div className="mt-auto">
                  <Visual />
                </div>
              </Panel>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
