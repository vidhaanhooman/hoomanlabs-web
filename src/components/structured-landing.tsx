import { CheckIcon, PhoneIcon } from "@phosphor-icons/react/dist/ssr"
import { siAndroid, siApple, siGooglechrome, siWhatsapp, type SimpleIcon } from "simple-icons"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { HeroScene } from "@/components/lab/hero-scene"
import { FinalCta } from "@/components/sections/final-cta"
import { HomeIntegrations, StartPaths } from "@/components/sections/landing"
import { Logos } from "@/components/sections/logos"
import { OutcomeDiagrams } from "@/components/sections/outcome-diagrams"
import {
  AgentsWorkflowSwitch,
  HomeFaq,
  PlatformSummary,
  StatHeadline,
  UseCaseCarousel,
} from "@/components/sections/structure"
import { Testimonials } from "@/components/sections/testimonials"
import { VoiceWidget } from "@/components/sections/voice-widget"
import { heroCall } from "@/content/landing"
import { features } from "@/content/structure"
import { cn } from "@/lib/utils"

const [design, ...rest] = features

/** One line for each compact card. */
const SHORT: Record<string, string> = {
  "feature-channels": "One agent, with the conversation carried across.",
  "feature-guardrails": "Simulated callers test every version.",
  "feature-analytics": "Know what works, and when it slips.",
}

function Brand({ icon, className }: { icon: SimpleIcon; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "size-4"} style={{ fill: `#${icon.hex}` }} aria-hidden>
      <path d={icon.path} />
    </svg>
  )
}

const OK = "bg-(--ok)"
const WARN = "bg-(--warn)"

export const MINI: Record<string, React.ReactNode> = {
  /* Channels: one tile per surface, with its logo and the modes it supports */
  "feature-channels": (
    <div className="flex h-full flex-col overflow-hidden rounded-md border border-line bg-background">
      <div className="grid grid-cols-[1fr_4.5rem_4.5rem] border-b border-line px-3 py-2 text-label text-ink-muted">
        <span>Channel</span>
        <span className="text-center">Voice</span>
        <span className="text-center">Chat</span>
      </div>
      {[
        { name: "Phone", logo: <PhoneIcon className="size-4" />, voice: "yes", chat: "no" },
        { name: "WhatsApp", logo: <Brand icon={siWhatsapp} />, voice: "soon", chat: "yes" },
        { name: "Web", logo: <Brand icon={siGooglechrome} />, voice: "yes", chat: "yes" },
        { name: "iOS app", logo: <Brand icon={siApple} />, voice: "yes", chat: "yes" },
        { name: "Android app", logo: <Brand icon={siAndroid} />, voice: "yes", chat: "yes" },
      ].map((c) => (
        <div key={c.name} className="grid grid-cols-[1fr_4.5rem_4.5rem] items-center border-b border-line px-3 py-2.5 last:border-0">
          <span className="flex items-center gap-2.5 text-small">
            <span className="grid size-7 place-items-center rounded-md border border-line">{c.logo}</span>
            {c.name}
          </span>
          {[c.voice, c.chat].map((v, i) => (
            <span key={i} className="flex justify-center">
              {v === "yes" ? (
                <CheckIcon weight="bold" className="size-4 text-success" />
              ) : v === "soon" ? (
                <span className="rounded-full border border-dashed border-line-strong px-1.5 text-[10px] text-ink-muted">Soon</span>
              ) : (
                <span className="text-ink-muted">–</span>
              )}
            </span>
          ))}
        </div>
      ))}
    </div>
  ),

  /* Simulations: personas that ran against the new version, and the tally */
  "feature-guardrails": (
    <div className="flex h-full flex-col gap-3 rounded-md border border-line bg-background p-3">
      <div className="flex items-center justify-between text-label text-ink-muted">
        <span>Billing assistant · v5</span>
        <span className="font-mono text-foreground tabular-nums">17 / 18 passed</span>
      </div>
      <span className="flex gap-1">
        {Array.from({ length: 18 }, (_, i) => (
          <span key={i} className={`h-2 flex-1 rounded-[2px] ${i === 13 ? WARN : OK}`} />
        ))}
      </span>
      <ul className="flex flex-col text-small">
        {[
          { p: "Frustrated repeat caller", s: "Payment not applied", ok: true },
          { p: "Switches to Hindi", s: "Explain tariff", ok: true },
          { p: "Interrupts often", s: "Dispute late fee", ok: true },
          { p: "Asks for a human", s: "Escalation", ok: false },
          { p: "In a hurry", s: "Update phone number", ok: true },
        ].map((r) => (
          <li key={r.p} className="flex items-center gap-3 border-t border-line py-2">
            <span className="flex-1 truncate">{r.p}</span>
            <span className="hidden truncate text-ink-muted sm:block lg:hidden">{r.s}</span>
            <span className="flex items-center gap-1.5 text-label">
              <span className={`size-1.5 rounded-full ${r.ok ? OK : WARN}`} />
              {r.ok ? "Passed" : "Review"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  ),

  /* Analytics: three headline numbers, the outcome split and a trend */
  "feature-analytics": (
    <div className="flex h-full flex-col gap-3 rounded-md border border-line bg-background p-3">
      <dl className="grid grid-cols-3 gap-3">
        {[
          { k: "Resolved", v: "71%", d: "+6 pts" },
          { k: "Avg handle", v: "2:41", d: "−18s" },
          { k: "QA score", v: "4.6", d: "+0.3" },
        ].map((m) => (
          <div key={m.k} className="flex flex-col">
            <dt className="text-label text-ink-muted">{m.k}</dt>
            <dd className="text-h4 font-normal tabular-nums">{m.v}</dd>
            <span className="text-label whitespace-nowrap text-success">{m.d}</span>
          </div>
        ))}
      </dl>
      <div className="flex h-1.5 overflow-hidden rounded-full">
        <span className={OK} style={{ width: "71%" }} />
        <span className={WARN} style={{ width: "14%" }} />
        <span className="bg-ink-muted" style={{ width: "9%" }} />
        <span className="bg-(--fail)" style={{ width: "6%" }} />
      </div>
      <svg viewBox="0 0 300 48" preserveAspectRatio="none" className="h-[4.75rem] w-full" aria-hidden>
        <path
          d="M0,40 L25,36 L50,38 L75,30 L100,32 L125,25 L150,27 L175,20 L200,22 L225,14 L250,16 L275,9 L300,6"
          fill="none"
          className="stroke-foreground"
          strokeWidth={1.4}
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M0,40 L25,36 L50,38 L75,30 L100,32 L125,25 L150,27 L175,20 L200,22 L225,14 L250,16 L275,9 L300,6 L300,48 L0,48 Z"
          className="fill-foreground/5"
        />
      </svg>
      <ul className="flex flex-col border-t border-line pt-1 text-small">
        {[
          { t: "Transfers above 15%", where: "Slack", tone: WARN },
          { t: "Resolution below 65%", where: "On-call", tone: OK },
        ].map((a) => (
          <li key={a.t} className="flex items-center gap-2 py-1.5">
            <span className={`size-1.5 rounded-full ${a.tone}`} />
            <span className="flex-1 truncate">{a.t}</span>
            <span className="text-label text-ink-muted">Alert → {a.where}</span>
          </li>
        ))}
      </ul>
    </div>
  ),
}


/** The three detailed feature cards: channels, simulations, analytics. */
export function FeatureTrio({ className }: { className?: string }) {
  return (
    <>
      {rest.map((f) => (
        <Panel key={f.id} className={cn("flex flex-col gap-5 p-6 sm:p-7 lg:col-span-4", className)}>
          <div className="flex flex-col gap-1.5">
            <h3 className="text-h4 font-normal">{f.title}</h3>
            <p className="text-small text-ink-secondary">{SHORT[f.id]}</p>
          </div>
          {/* The graphic grows to fill the card, so the white panels in a row match */}
          <div aria-hidden className="flex flex-1 flex-col *:flex-1">
            {MINI[f.id]}
          </div>
          <TextLink href={f.link.href}>
            {f.link.label}
          </TextLink>
        </Panel>
      ))}
    </>
  )
}

/**
 * Structured homepage (/lab/hero-call):
 * hero · logos · use-case carousel · outcomes · stat ·
 * platform features (1 large + 3 compact) · summary + resources · integrations ·
 * get started (2 paths) · quotes · FAQ · closing CTA · footer (layout) · voice widget
 */
/** A little more room between every section on this page (site default is 2.5rem → 4rem). */
const ROOMY = {
  "--section-gap": "clamp(3.25rem, 2.25rem + 3vw, 5rem)",
  "--section-pad": "calc(var(--section-gap) / 2)",
} as React.CSSProperties

export function StructuredLanding() {
  return (
    <div style={ROOMY}>
      {/* 1 Hero */}
      <Section id="hero" spacing="none" className="pt-16 pb-(--section-pad) md:pt-24">
        <Container>
          <h1 className="reveal text-display font-normal">
            AI employees for every customer conversation,
            <span className="block">starting with the phone.</span>
          </h1>
          <p className="reveal mt-5 max-w-[56ch] text-body-lg text-ink-secondary" style={{ "--i": 1 } as React.CSSProperties}>
            {heroCall.body}
          </p>
          <div id="listen" className="reveal mt-10 scroll-mt-24 md:mt-12" style={{ "--i": 3 } as React.CSSProperties}>
            <HeroScene />
          </div>
        </Container>
      </Section>

      <Logos />
      <UseCaseCarousel />
      <OutcomeDiagrams />
      <StatHeadline />

      {/* 8-11 Platform features: workflows full width, then three detailed cards */}
      <Section id="sl-features">
        <Container>
          <div className="flex max-w-[44rem] flex-col gap-3">
            <h2 className="text-h2 font-normal">Build, deploy, test and measure in one place.</h2>
            <p className="text-body text-ink-secondary">Everything an agent needs, from the first prompt to the thousandth call.</p>
          </div>
          <div className="mt-10 grid gap-3 lg:grid-cols-12">
            {/* Large: design and workflows */}
            <Panel className="flex flex-col gap-6 p-6 sm:p-8 lg:col-span-12">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-h3 font-normal">Design agents and the workflows around them</h3>
                  <p className="max-w-[60ch] text-small text-ink-secondary">{design.body}</p>
                </div>
                <TextLink href={design.link.href}>{design.link.label}</TextLink>
              </div>
              <AgentsWorkflowSwitch />
            </Panel>

            {/* Compact: one line + a tiny visual each */}
            <FeatureTrio />
          </div>
        </Container>
      </Section>

      <PlatformSummary />
      <HomeIntegrations />
      <StartPaths />
      <Testimonials />
      <HomeFaq />
      <FinalCta />
      <VoiceWidget />
    </div>
  )
}
