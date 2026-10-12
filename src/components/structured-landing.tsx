import Link from "next/link"
import { PhoneIcon } from "@phosphor-icons/react/dist/ssr"
import { siAndroid, siApple, siGooglechrome, siWhatsapp, type SimpleIcon } from "simple-icons"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { HeroScene } from "@/components/lab/hero-scene"
import { WorkflowCanvas } from "@/components/product/flow-canvas"
import { FinalCta } from "@/components/sections/final-cta"
import { HomeIntegrations, StartPaths } from "@/components/sections/landing"
import { Logos } from "@/components/sections/logos"
import { OutcomeDiagrams } from "@/components/sections/outcome-diagrams"
import {
  HomeFaq,
  PlatformSummary,
  StatHeadline,
  UseCaseCarousel,
  UseCaseTemplates,
} from "@/components/sections/structure"
import { Testimonials } from "@/components/sections/testimonials"
import { VoiceWidget } from "@/components/sections/voice-widget"
import { ctas } from "@/content/draft"
import { heroCall } from "@/content/landing"
import { features } from "@/content/structure"

const [design, ...rest] = features

/** One line for each compact card. */
const SHORT: Record<string, string> = {
  "feature-channels": "The same agent on phone, web, app and WhatsApp, with the conversation carried over.",
  "feature-guardrails": "Simulated callers test every version before a customer hears it.",
  "feature-analytics": "Every conversation scored, with outcomes and alerts in one view.",
}

function Brand({ icon, className }: { icon: SimpleIcon; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "size-4"} style={{ fill: `#${icon.hex}` }} aria-hidden>
      <path d={icon.path} />
    </svg>
  )
}

const OK = "bg-[oklch(0.62_0.15_150)]"
const WARN = "bg-[oklch(0.8_0.14_80)]"

const MINI: Record<string, React.ReactNode> = {
  /* Channels: one tile per surface, with its logo and the modes it supports */
  "feature-channels": (
    <ul className="grid grid-cols-2 gap-2">
      {[
        { name: "Phone", note: "Your numbers or SIP", logo: <PhoneIcon className="size-5" />, modes: ["Voice"] },
        { name: "WhatsApp", note: "Business messaging", logo: <Brand icon={siWhatsapp} className="size-5" />, modes: ["Chat", "Voice · soon"] },
        { name: "Web", note: "Widget on your site", logo: <Brand icon={siGooglechrome} className="size-5" />, modes: ["Voice", "Chat"] },
        {
          name: "App",
          note: "iOS and Android SDK",
          logo: (
            <span className="flex gap-1">
              <Brand icon={siApple} className="size-[18px]" />
              <Brand icon={siAndroid} className="size-[18px]" />
            </span>
          ),
          modes: ["Voice", "Chat"],
        },
      ].map((c) => (
        <li key={c.name} className="flex items-center gap-3 rounded-md border border-line bg-background p-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-md border border-line">{c.logo}</span>
          <span className="flex min-w-0 flex-col">
            <span className="text-small font-medium">{c.name}</span>
            <span className="mt-1 flex flex-wrap gap-1">
              {c.modes.map((m) => (
                <span
                  key={m}
                  className={
                    m.endsWith("soon")
                      ? "rounded-full border border-dashed border-line-strong px-1.5 text-[10px] whitespace-nowrap text-ink-muted"
                      : "rounded-full border border-line-strong px-1.5 text-[10px] whitespace-nowrap text-ink-secondary"
                  }
                >
                  {m}
                </span>
              ))}
            </span>
          </span>
        </li>
      ))}
    </ul>
  ),

  /* Simulations: personas that ran against the new version, and the tally */
  "feature-guardrails": (
    <div className="flex flex-col gap-3 rounded-md border border-line bg-background p-3">
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
          { p: "Asks for a human", s: "Escalation", ok: false },
        ].map((r) => (
          <li key={r.p} className="flex items-center gap-3 border-t border-line py-2">
            <span className="flex-1 truncate">{r.p}</span>
            <span className="hidden truncate text-ink-muted sm:block lg:hidden 2xl:block">{r.s}</span>
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
    <div className="flex flex-col gap-3 rounded-md border border-line bg-background p-3">
      <dl className="grid grid-cols-3 gap-3">
        {[
          { k: "Resolved", v: "71%", d: "+6 pts" },
          { k: "Avg handle", v: "2:41", d: "−18s" },
          { k: "QA score", v: "4.6", d: "+0.3" },
        ].map((m) => (
          <div key={m.k} className="flex flex-col">
            <dt className="text-label text-ink-muted">{m.k}</dt>
            <dd className="text-h4 font-normal tabular-nums">{m.v}</dd>
            <span className="text-label whitespace-nowrap text-[oklch(0.55_0.13_150)]">{m.d}</span>
          </div>
        ))}
      </dl>
      <div className="flex h-1.5 overflow-hidden rounded-full">
        <span className={OK} style={{ width: "71%" }} />
        <span className={WARN} style={{ width: "14%" }} />
        <span className="bg-ink-muted" style={{ width: "9%" }} />
        <span className="bg-[oklch(0.65_0.19_25)]" style={{ width: "6%" }} />
      </div>
      <svg viewBox="0 0 300 48" preserveAspectRatio="none" className="h-12 w-full" aria-hidden>
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
    </div>
  ),
}


/**
 * Structured homepage (/lab/hero-call):
 * hero · logos · use-case carousel · outcomes · stat ·
 * platform features (1 large + 3 compact) · summary + resources · integrations · templates ·
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
          <div className="reveal mt-8 flex flex-wrap gap-2" style={{ "--i": 2 } as React.CSSProperties}>
            <Link href={ctas.demo.href} className={buttonVariants()}>
              {ctas.demo.label}
            </Link>
            <Link href="#listen" className={buttonVariants({ variant: "secondary" })}>
              {ctas.talk.label}
            </Link>
          </div>
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
                  <h3 className="text-h3 font-normal">{design.title}</h3>
                  <p className="max-w-[60ch] text-small text-ink-secondary">{design.body}</p>
                </div>
                <TextLink href={design.link.href}>{design.link.label}</TextLink>
              </div>
              <div aria-hidden className="flex items-center overflow-hidden rounded-md border border-black/10 bg-[oklch(0.13_0_0)]">
                <WorkflowCanvas className="w-full pt-12" />
              </div>
            </Panel>

            {/* Compact: one line + a tiny visual each */}
            {rest.map((f) => (
              <Panel key={f.id} className="flex flex-col gap-5 p-6 sm:p-7 lg:col-span-4">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-h4 font-normal">{f.title}</h3>
                    <p className="text-small text-ink-secondary">{SHORT[f.id]}</p>
                  </div>
                </div>
                <div aria-hidden>{MINI[f.id]}</div>
                <TextLink href={f.link.href} className="mt-auto">
                  {f.link.label}
                </TextLink>
              </Panel>
            ))}
          </div>
        </Container>
      </Section>

      <PlatformSummary />
      <HomeIntegrations />
      <UseCaseTemplates />
      <StartPaths />
      <Testimonials />
      <HomeFaq />
      <FinalCta />
      <VoiceWidget />
    </div>
  )
}
