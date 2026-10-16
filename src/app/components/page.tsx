import type { Metadata } from "next"
import { CheckIcon, LightningIcon, PhoneIcon, SparkleIcon } from "@phosphor-icons/react/dist/ssr"

import { AccordionDemo, ChipsDemo, SelectDemo, TabsDemo, ThemeToggle } from "@/components/design-system/interactive"
import { Literal, Swatch } from "@/components/design-system/swatch"
import { MeshStage } from "@/components/layout/art-stage"
import { Container } from "@/components/layout/container"
import { Halftone } from "@/components/layout/halftone"
import { Panel } from "@/components/layout/panel"
import { Placeholder } from "@/components/layout/placeholder"
import { SectionHeader } from "@/components/layout/section-header"
import { TextLink } from "@/components/layout/text-link"
import { LogoMark, Wordmark } from "@/components/layout/wordmark"
import { Faq } from "@/components/product-page/faq"
import { FROSTED, HERO_CARD } from "@/lib/hero-styles"
import { Definition, FloatCard, HeroCopy, NextStep } from "@/components/product-page/page-bits"
import { UiCard, UiFloat, UiLabel, UiPill, UiWindow } from "@/components/product/ui-window"
import { ChannelDevices } from "@/components/sections/channel-devices"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { STAGE } from "@/lib/recipes"
import { cn } from "@/lib/utils"

/**
 * /components: the full component system, rendered from the real tokens and
 * components so it can't drift from the site. Colour tokens are read live in
 * every theme they apply to (page light and dark, product UI dark and light,
 * graphite), then type, shape, controls, layout, product UI, product-page
 * blocks, heroes and brand marks. Not linked from the site and not indexed;
 * open it by URL. /brand stays the place for principles, imagery and copy.
 */
export const metadata: Metadata = {
  title: "Components",
  robots: { index: false, follow: false },
}

const TOC = [
  ["colour", "Colour"],
  ["type", "Type"],
  ["shape", "Shape and layout"],
  ["controls", "Controls"],
  ["containers", "Containers"],
  ["product-ui", "Product UI"],
  ["page-blocks", "Page blocks"],
  ["heroes", "Heroes"],
  ["brand", "Brand marks"],
  ["motion", "Motion"],
] as const

const PAGE_TOKENS = ["--background", "--foreground", "--surface", "--placeholder", "--ink-secondary", "--ink-muted", "--line", "--line-strong", "--primary", "--primary-foreground", "--destructive", "--ring"]
const GREYS = ["--gray-0", "--gray-50", "--gray-100", "--gray-200", "--gray-300", "--gray-500", "--gray-600", "--gray-900", "--gray-950"]
const UI_TOKENS = ["--ui-bg", "--ui-panel", "--ui-raised", "--ui-line", "--ui-text", "--ui-muted", "--ui-live"]
const ACCENTS: [string, string][] = [
  ["oklch(0.74 0.16 150)", "Live / success (on dark)"],
  ["oklch(0.6 0.15 150)", "Live / success (on light)"],
  ["oklch(0.78 0.12 295)", "AI step"],
  ["oklch(0.8 0.13 80)", "Skill / trigger"],
  ["oklch(0.8 0.1 245)", "Action / data"],
  ["oklch(0.82 0.1 245)", "Variable highlight"],
]

const TYPE: [string, string, string][] = [
  ["text-display", "Display", "AI employees for every customer conversation."],
  ["text-h2", "H2", "Works with the tools you already use."],
  ["text-h3", "H3", "Every call scored, explained and searchable."],
  ["text-h4", "H4", "Bring your own carrier"],
  ["text-body-lg", "Body large", "The same Hooman answers your phone line, your website and your app."],
  ["text-body", "Body", "Write the job, connect your knowledge and systems, and your Hooman handles every conversation your way."],
  ["text-small", "Small", "Connect Exotel, Ozonetel, Plivo or Twilio and keep the numbers customers know."],
  ["text-label", "Label", "Reads during calls · Writes after calls"],
]

function Block({ id, title, intro, children }: { id: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line py-14">
      <div className="mb-8 flex max-w-[44rem] flex-col gap-2">
        <h2 className="text-h2 font-normal">{title}</h2>
        {intro && <p className="text-body text-ink-secondary">{intro}</p>}
      </div>
      {children}
    </section>
  )
}

function Sub({ title, code, children, className }: { title: string; code?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4 py-6", className)}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-h4 font-normal">{title}</h3>
        {code && <code className="font-mono text-label text-ink-muted">{code}</code>}
      </div>
      {children}
    </div>
  )
}

function TokenGrid({ tokens, className }: { tokens: string[]; className?: string }) {
  return (
    <div className={cn("grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {tokens.map((t) => (
        <Swatch key={t} token={t} />
      ))}
    </div>
  )
}

export default function ComponentsPage() {
  return (
    <Container className="grid gap-10 pt-10 pb-24 lg:grid-cols-[12rem_1fr] lg:gap-14 md:pt-16">
      {/* Contents */}
      <nav aria-label="Contents" className="hidden lg:block">
        <ul className="sticky top-24 flex flex-col gap-1.5 text-small">
          {TOC.map(([id, name]) => (
            <li key={id}>
              <a href={`#${id}`} className="text-ink-secondary hover:text-foreground">
                {name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="min-w-0">
        <header className="flex flex-col gap-3 pb-12">
          <span className="font-mono text-label text-ink-muted">Internal · not indexed</span>
          <h1 className="text-display font-normal">Component system</h1>
          <p className="max-w-[44rem] text-body-lg text-ink-secondary">
            Every colour, type style and component the site is built from, rendered live from the real code. Change a token in globals.css and it changes here.
          </p>
          <div className="flex items-center gap-3 pt-2 text-small text-ink-secondary">
            <ThemeToggle />
            Switch the page theme to see every token in dark.
          </div>
        </header>

        {/* ------------------------------------------------------------ colour */}
        <Block id="colour" title="Colour" intro="Black and white first. Colour only lives in product screens and photography. Tokens resolve per theme: the same name gives a different value inside .dark and .ui-dark.">
          <Sub title="Page tokens · light" code=":root">
            <div className="rounded-xl border border-line bg-background p-6">
              <TokenGrid tokens={PAGE_TOKENS} />
            </div>
          </Sub>
          <Sub title="Page tokens · dark" code=".dark">
            <div className="dark rounded-xl border border-line bg-background p-6 text-foreground">
              <TokenGrid tokens={PAGE_TOKENS} />
            </div>
          </Sub>
          <Sub title="Grey scale" code="--gray-*">
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-xl border border-line bg-background p-6">
                <TokenGrid tokens={GREYS} className="lg:grid-cols-2" />
              </div>
              <div className="dark rounded-xl border border-line bg-background p-6 text-foreground">
                <TokenGrid tokens={GREYS} className="lg:grid-cols-2" />
              </div>
            </div>
          </Sub>
          <Sub title="Product UI tokens" code=".ui-dark · .ui-dark.ui-light · .dark.graphite">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="ui-dark rounded-xl p-6">
                <TokenGrid tokens={UI_TOKENS} className="sm:grid-cols-1 lg:grid-cols-1" />
              </div>
              <div className="ui-dark ui-light rounded-xl border border-line p-6">
                <TokenGrid tokens={UI_TOKENS} className="sm:grid-cols-1 lg:grid-cols-1" />
              </div>
              <div className="dark graphite rounded-xl bg-background p-6 text-foreground">
                <TokenGrid tokens={["--background", "--surface", "--placeholder", "--line", "--ink-secondary", "--ink-muted"]} className="sm:grid-cols-1 lg:grid-cols-1" />
              </div>
            </div>
          </Sub>
          <Sub title="Accents inside product screens" code="literal oklch, never on the page itself">
            <div className="ui-dark grid gap-x-6 gap-y-4 rounded-xl p-6 sm:grid-cols-2 lg:grid-cols-3">
              {ACCENTS.map(([v, n]) => (
                <Literal key={v} value={v} name={n} />
              ))}
            </div>
          </Sub>
        </Block>

        {/* -------------------------------------------------------------- type */}
        <Block id="type" title="Type" intro="Geist and Geist Mono. Hierarchy comes from size and tone; headings are never bold (font-normal).">
          <ul className="flex flex-col">
            {TYPE.map(([cls, name, sample]) => (
              <li key={cls} className="grid gap-2 border-t border-line py-5 md:grid-cols-[10rem_1fr] md:gap-8">
                <span className="flex flex-col">
                  <span className="text-small">{name}</span>
                  <code className="font-mono text-label text-ink-muted">{cls}</code>
                </span>
                <span className={cn(cls, "font-normal")}>{sample}</span>
              </li>
            ))}
            <li className="grid gap-2 border-t border-line py-5 md:grid-cols-[10rem_1fr] md:gap-8">
              <span className="flex flex-col">
                <span className="text-small">Mono label</span>
                <code className="font-mono text-label text-ink-muted">font-mono text-label</code>
              </span>
              <span className="font-mono text-label text-ink-muted">Under the hood</span>
            </li>
            <li className="grid gap-2 border-t border-line py-5 md:grid-cols-[10rem_1fr] md:gap-8">
              <span className="flex flex-col">
                <span className="text-small">Ink levels</span>
                <code className="font-mono text-label text-ink-muted">foreground · ink-secondary · ink-muted</code>
              </span>
              <span className="flex flex-wrap gap-6 text-body">
                <span>Primary text</span>
                <span className="text-ink-secondary">Secondary text</span>
                <span className="text-ink-muted">Muted text</span>
              </span>
            </li>
          </ul>
        </Block>

        {/* ------------------------------------------------------------- shape */}
        <Block id="shape" title="Shape and layout" intro="One shape rule: interactive controls are fully rounded; containers, panels and frames use the radius scale.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["rounded-sm", "Radius sm"],
              ["rounded-md", "Radius md · panels"],
              ["rounded-xl", "Radius xl · cards, stages"],
              ["rounded-full", "Full · buttons, pills, chips"],
            ].map(([cls, label]) => (
              <div key={cls} className="flex flex-col gap-2">
                <div className={cn("h-20 border border-line-strong bg-surface", cls)} />
                <span className="text-small">{label}</span>
                <code className="font-mono text-label text-ink-muted">{cls}</code>
              </div>
            ))}
          </div>
          <ul className="mt-10 flex flex-col text-small">
            {[
              ["Page width", "--container-page", "81.25rem (1300px)"],
              ["Prose width", "--container-prose", "40rem"],
              ["Gutter", "--gutter", "1rem, wider from md"],
              ["Section gap", "--section-gap", "Product pages use the roomier clamp(3.25rem, …, 5rem)"],
            ].map(([a, b, c]) => (
              <li key={a} className="grid gap-2 border-t border-line py-3.5 md:grid-cols-[10rem_14rem_1fr]">
                <span>{a}</span>
                <code className="font-mono text-label text-ink-muted">{b}</code>
                <span className="text-ink-secondary">{c}</span>
              </li>
            ))}
          </ul>
        </Block>

        {/* ---------------------------------------------------------- controls */}
        <Block id="controls" title="Controls" intro="shadcn on Base UI, restyled with our tokens. Use these; don't restyle them per page.">
          <Sub title="Button" code="<Button variant size>">
            <div className="flex flex-wrap items-center gap-3">
              <Button>Book a demo</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button disabled>Disabled</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button>Default</Button>
              <Button size="icon" variant="outline" aria-label="Call">
                <PhoneIcon />
              </Button>
            </div>
          </Sub>
          <Sub title="Text link" code="<TextLink>">
            <div className="flex flex-wrap gap-6">
              <TextLink href="#controls">Read about skills</TextLink>
              <TextLink href="#controls">See a test run</TextLink>
            </div>
          </Sub>
          <Sub title="Badge" code="<Badge variant>">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="ghost">Ghost</Badge>
            </div>
          </Sub>
          <Sub title="Pills and tags" code="page pills (light) · status notes">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-line px-2.5 py-0.5 text-label text-ink-secondary">Voice</span>
              <span className="rounded-full border border-line px-2.5 py-0.5 text-label text-ink-secondary">Chat</span>
              <span className="rounded-full border border-dashed border-line-strong px-2.5 py-0.5 text-label text-ink-muted">Voice · soon</span>
              <span className="rounded-full bg-foreground px-2 py-0.5 text-label text-background">Native</span>
              <span className="text-label text-ink-muted">Messaging · Coming soon</span>
            </div>
          </Sub>
          <Sub title="Filter chips" code="directory filters">
            <ChipsDemo />
          </Sub>
          <Sub title="Tabs" code="<Tabs> · variant default | line">
            <TabsDemo />
          </Sub>
          <Sub title="Select" code="<Select>">
            <SelectDemo />
          </Sub>
          <Sub title="Accordion" code="<Accordion> (the FAQ uses it)">
            <AccordionDemo />
          </Sub>
          <Sub title="Theme switch and separator" code="<ThemeToggle> · <Separator>">
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Separator orientation="vertical" className="h-6" />
              <span className="text-small text-ink-secondary">Header switch; saved per visitor.</span>
            </div>
          </Sub>
        </Block>

        {/* -------------------------------------------------------- containers */}
        <Block id="containers" title="Containers" intro="Where content sits on the light page.">
          <div className="grid gap-6 lg:grid-cols-2">
            <Sub title="Panel" code="<Panel>" className="py-0">
              <Panel className="p-6 text-small text-ink-secondary">The grey surface used for product panels and next-step cards.</Panel>
            </Sub>
            <Sub title="Card" code="<Card>" className="py-0">
              <Card>
                <CardHeader>
                  <CardTitle>Zoho CRM</CardTitle>
                  <CardDescription>Looks up the customer during the call, writes the outcome after.</CardDescription>
                </CardHeader>
                <CardContent className="text-label text-ink-muted">CRM</CardContent>
              </Card>
            </Sub>
            <Sub title="Directory card" code="integrations directory" className="py-0">
              <div className="flex items-start gap-3.5 rounded-xl border border-line p-5">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface text-small text-ink-secondary">Z</span>
                <span className="flex flex-col gap-1">
                  <span className="text-body">Zoho CRM</span>
                  <span className="text-small text-ink-secondary">Looks up the customer during the call, writes the outcome after.</span>
                  <span className="pt-1 text-label text-ink-muted">CRM</span>
                </span>
              </div>
            </Sub>
            <Sub title="Placeholder" code="<Placeholder variant>" className="py-0">
              <div className="grid grid-cols-2 gap-3">
                <Placeholder label="Photo" className="aspect-video" />
                <Placeholder label="Screen" variant="frame" className="aspect-video" />
              </div>
            </Sub>
            <Sub title="Stage with halftone" code="STAGE + <Halftone focus>" className="py-0">
              <div className={cn(STAGE, "isolate h-40")}>
                <Halftone focus="20% 30%" />
              </div>
            </Sub>
            <Sub title="Section header" code="<SectionHeader>" className="py-0">
              <SectionHeader title="Tested, scored and connected." aside="Everything around the agent, in the same platform." />
            </Sub>
          </div>
        </Block>

        {/* -------------------------------------------------------- product ui */}
        <Block id="product-ui" title="Product UI" intro="Recreations of the console, always in the .ui-dark tokens. Accents (green, violet, amber, blue) appear only here.">
          <div className="grid gap-6 lg:grid-cols-2">
            <Sub title="Window" code="<UiWindow> · <UiCard> · <UiLabel> · <UiPill>" className="py-0">
              <UiWindow className="h-72 rounded-xl [&>div:first-child]:pr-4 [&>div:last-child]:pr-5" title="Ria · Billing" aside={<UiPill live>Answering</UiPill>}>
                <UiCard>
                  <UiLabel>Skills</UiLabel>
                  <span className="flex items-center gap-2 text-[13px]">
                    <LightningIcon weight="fill" className="size-3.5 text-[oklch(0.8_0.13_80)]" />
                    <span className="font-mono">take_payment</span>
                    <span className="ml-auto flex items-center gap-1 text-[11px] text-(--ui-live)">
                      <CheckIcon weight="bold" className="size-3" />
                      1.2s
                    </span>
                  </span>
                </UiCard>
                <UiCard>
                  <UiLabel>AI step</UiLabel>
                  <span className="flex items-center gap-2 text-[13px]">
                    <SparkleIcon weight="fill" className="size-3.5 text-[oklch(0.78_0.12_295)]" />
                    Understand the call
                  </span>
                </UiCard>
              </UiWindow>
            </Sub>
            <Sub title="Float and pills" code="<UiFloat> · <UiPill live>" className="py-0">
              <div className={cn(STAGE, "flex h-72 flex-col items-center justify-center gap-4 p-6")}>
                <UiFloat>
                  <span className="text-[11px] text-(--ui-muted)">Live call · Maya Patel</span>
                  <span>Done. $86.40 is paid and your receipt is on its way.</span>
                </UiFloat>
                <span className="ui-dark flex gap-2 rounded-full p-2">
                  <UiPill live>Live</UiPill>
                  <UiPill>Coming soon</UiPill>
                </span>
              </div>
            </Sub>
          </div>
        </Block>

        {/* ------------------------------------------------------- page blocks */}
        <Block id="page-blocks" title="Page blocks" intro="The pieces every product page is assembled from, in order.">
          <Sub title="Hero copy" code="<HeroCopy>">
            <div className="rounded-xl border border-line p-6">
              <HeroCopy crumb="Channels" title="One Hooman, on every channel." line="The same Hooman answers your phone line, your website and your app." link={{ label: "Follow one customer", href: "#page-blocks" }} />
            </div>
          </Sub>
          <Sub title="Float card" code="<FloatCard>">
            <div className={cn(STAGE, "relative h-40")}>
              <FloatCard className="top-6 left-6 w-64" i={0}>
                <span className="text-label text-ink-muted">Live call · Maya Patel</span>
                <span>Can I just pay the balance now?</span>
              </FloatCard>
            </div>
          </Sub>
        </Block>
      </div>

      {/* Full-width blocks render with their own Section and Container */}
      <div className="lg:col-span-2">
        <Definition id="ds-definition" text="A Hooman is an AI agent you configure with a job description, knowledge, data tables and skills." proof={{ quote: "780 ms · 9 languages", by: "Sample proof strip" }} placeholder />
        <div className="py-6">
          <ChannelDevices />
        </div>
        <Faq
          id="ds-faq"
          items={[
            { q: "Can it answer our existing phone number?", a: "Yes. Use HoomanLabs numbers or connect your own carrier." },
            { q: "Does it answer around the clock?", a: "Yes, with no queue and no hold music." },
          ]}
        />
        <NextStep id="ds-next" related={["testing", "agents"]} />
      </div>

      <div className="min-w-0 lg:col-start-2">
        {/* ------------------------------------------------------------ heroes */}
        <Block id="heroes" title="Heroes" intro="A drifting landscape (or the mesh gradient) under film grain, with one dark card or console on it. FROSTED is for small supporting cards.">
          <div className="grid gap-6 lg:grid-cols-2">
            <Sub title="Backdrop with a card" code="<MeshStage image> · HERO_CARD · FROSTED" className="py-0">
              <MeshStage image="/art/product/integrations-backdrop.webp" className="flex h-72 flex-col items-center justify-center gap-3 p-6">
                <span className={cn(FROSTED, "rounded-full px-3 py-1")}>Hooman API · MCP · Call events</span>
                <div className={cn(HERO_CARD, "w-full max-w-[22rem] p-4")}>
                  <span className="flex items-center justify-between text-[12px] text-(--ui-muted)">
                    Deliveries
                    <span className="flex items-center gap-1 text-(--ui-live)">
                      <CheckIcon weight="bold" className="size-3" />5 of 5
                    </span>
                  </span>
                  <span className="mt-2 block font-mono text-[12px]">outcome = promise_to_pay</span>
                </div>
              </MeshStage>
            </Sub>
            <Sub title="Mesh gradient, no image" code="<MeshStage>" className="py-0">
              <MeshStage className="flex h-72 items-end p-6">
                <span className={cn(FROSTED, "px-4 py-3")}>Fallback colour while an image loads</span>
              </MeshStage>
            </Sub>
          </div>
          <p className="mt-6 text-small text-ink-secondary">
            Full heroes use <code className="font-mono text-label">HeroConsole</code>, which lays the console out at a design size (1100 wide) and scales it to fit. See any page under /platform.
          </p>
        </Block>

        {/* ------------------------------------------------------------- brand */}
        <Block id="brand" title="Brand marks" intro="The wordmark and mark follow the text colour. Provider logos are masks in the text colour too.">
          <div className="flex flex-wrap items-center gap-10">
            <Wordmark className="h-6 w-auto" />
            <LogoMark className="size-8" />
            <span className="grid size-10 place-items-center rounded-md bg-foreground text-background">
              <LogoMark className="h-5 w-auto" />
            </span>
          </div>
        </Block>

        {/* ------------------------------------------------------------ motion */}
        <Block id="motion" title="Motion" intro="Calm and one-time. Things play once when they scroll into view, then hold; with reduced motion they show their final state.">
          <ul className="flex flex-col text-small">
            {[
              ["Ease out", "--ease-out", "cubic-bezier(0.23, 1, 0.32, 1) · entrances, fills"],
              ["Ease in-out", "--ease-in-out", "cubic-bezier(0.77, 0, 0.175, 1) · moves"],
              ["Reveal", ".reveal", "Fade and lift as a section enters"],
              ["Backdrop drift", ".backdrop-drift", "40s slow zoom and pan on hero images"],
              ["Grain", ".grain-flicker", "Film grain that shifts a few times a second"],
              ["Press", "active:scale-[0.97]", "Buttons, 150ms on transform only"],
            ].map(([a, b, c]) => (
              <li key={a} className="grid gap-2 border-t border-line py-3.5 md:grid-cols-[10rem_14rem_1fr]">
                <span>{a}</span>
                <code className="font-mono text-label text-ink-muted">{b}</code>
                <span className="text-ink-secondary">{c}</span>
              </li>
            ))}
          </ul>
        </Block>
      </div>
    </Container>
  )
}
