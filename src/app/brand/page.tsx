import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { CheckIcon, DownloadSimpleIcon, XIcon } from "@phosphor-icons/react/dist/ssr"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { TextLink } from "@/components/layout/text-link"
import { LogoMark, Wordmark } from "@/components/layout/wordmark"
import { buttonVariants } from "@/components/ui/button"
import { ctas } from "@/content/draft"
import { SCREEN_BLEED, STAGE } from "@/lib/recipes"
import { cn } from "@/lib/utils"

/**
 * /brand: the internal reference for keeping the site consistent. Not linked
 * from anywhere and not indexed; open it by URL. Everything here renders from
 * the real tokens, components and recipes, so it can't drift from the site.
 */
export const metadata: Metadata = {
  title: "Brand",
  robots: { index: false, follow: false },
}

const TOC = [
  ["assets", "Brand assets"],
  ["principles", "Principles"],
  ["logo", "Logo"],
  ["colour", "Colour"],
  ["type", "Type"],
  ["layout", "Layout and shape"],
  ["components", "Components"],
  ["product-ui", "Product UI"],
  ["imagery", "Imagery"],
  ["motion", "Motion"],
  ["copy", "Copy"],
] as const

function Block({ id, title, intro, children }: { id: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line py-14">
      <div className="grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-12">
        <div className="flex flex-col gap-2">
          <h2 className="text-h3 font-normal">{title}</h2>
          {intro && <p className="text-small text-ink-secondary">{intro}</p>}
        </div>
        <div className="flex min-w-0 flex-col gap-8">{children}</div>
      </div>
    </section>
  )
}

/** A small mono caption: token names, class names, sizes. */
const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="font-mono text-label text-ink-muted">{children}</code>
)

function Rules({ items, tone = "do" }: { items: string[]; tone?: "do" | "dont" }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((r) => (
        <li key={r} className="flex gap-3 text-small">
          <span className={cn("mt-2 size-1.5 shrink-0 rounded-full", tone === "do" ? "bg-foreground" : "border border-ink-muted")} />
          <span className={tone === "do" ? "text-foreground" : "text-ink-secondary"}>{r}</span>
        </li>
      ))}
    </ul>
  )
}

/** One logo usage example: a tile with a do or don't badge and a caption. */
function Usage({ ok = false, dark = false, caption, children }: { ok?: boolean; dark?: boolean; caption: string; children: React.ReactNode }) {
  return (
    <li className="flex flex-col gap-2">
      <div
        className={cn(
          "relative flex h-28 items-center justify-center overflow-hidden rounded-md border border-line",
          dark ? "bg-foreground text-background" : "bg-background"
        )}
      >
        {children}
        <span
          className={cn(
            "absolute top-2 left-2 z-10 flex size-5 items-center justify-center rounded-full",
            ok ? "bg-[oklch(0.62_0.15_150)] text-white" : "bg-destructive text-white"
          )}
        >
          {ok ? <CheckIcon weight="bold" className="size-3" /> : <XIcon weight="bold" className="size-3" />}
        </span>
      </div>
      <span className="text-label text-ink-secondary">{caption}</span>
    </li>
  )
}

const KIT = "/brand/kit"
const ASSETS = [
  { name: "Logo", file: "hoomanlabs-logo", dark: false, png: "1830px" },
  { name: "Logo, white", file: "hoomanlabs-logo-white", dark: true, png: "1830px" },
  { name: "Mark", file: "hoomanlabs-mark", dark: false, png: "512px" },
  { name: "Mark, white", file: "hoomanlabs-mark-white", dark: true, png: "512px" },
].map((a) => ({ ...a, file: a.dark ? a.file : `${a.file}-black` }))

const GREYS = [
  ["--gray-0", "background", "Page"],
  ["--gray-50", "surface", "Panels and section cards"],
  ["--gray-100", "placeholder", "Fills, secondary buttons"],
  ["--gray-200", "line", "Hairlines and card borders"],
  ["--gray-300", "line-strong", "Outline buttons, inputs"],
  ["--gray-500", "ink-muted", "Labels, captions"],
  ["--gray-600", "ink-secondary", "Body copy under headings"],
  ["--gray-900", "foreground", "Headings and text"],
  ["--gray-950", "primary", "Primary button fill"],
] as const

const UI = [
  ["--ui-bg", "Screen background"],
  ["--ui-panel", "Cards inside the screen"],
  ["--ui-raised", "Inputs, selected items"],
  ["--ui-line", "Dividers"],
  ["--ui-muted", "Secondary text"],
  ["--ui-text", "Text"],
  ["--ui-live", "Live and success states"],
] as const

const TYPE = [
  ["text-display", "Hero headline only", "AI employees for every customer conversation."],
  ["text-h2", "Section headings", "Agents that handle the conversation."],
  ["text-h3", "Panel and card headings", "Start with one flow, live in 4–8 weeks."],
  ["text-h4", "Small headings, results", "71% of billing calls resolved without a person"],
  ["text-body-lg", "Hero subline", "Answers, acts and follows up on every call."],
  ["text-body", "Default body, row titles", "Before the call it pulls the customer's details."],
  ["text-small", "Supporting copy, links, buttons", "Handles the work around calls end to end."],
] as const

export default function BrandPage() {
  return (
    <Container className="pt-12 pb-24 md:pt-16">
      <header className="flex flex-col gap-4 pb-10">
        <span className="font-mono text-label text-ink-muted">Brand guidelines</span>
        <h1 className="text-display font-normal">Brand</h1>
        <p className="max-w-[56ch] text-body-lg text-ink-secondary">
          How HoomanLabs looks, moves and reads. Partners and press can download the logo below; the rest is how we keep the
          site consistent.
        </p>
        <div className="mt-2">
          <a href="/brand/hoomanlabs-brand-kit.zip" download className={buttonVariants()}>
            <DownloadSimpleIcon aria-hidden />
            Download brand kit
          </a>
        </div>
        <nav aria-label="On this page" className="mt-2 flex flex-wrap gap-2">
          {TOC.map(([id, name]) => (
            <Link key={id} href={`#${id}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
              {name}
            </Link>
          ))}
        </nav>
      </header>

      <Block
        id="assets"
        title="Brand assets"
        intro="For partners, press and integrations. The kit has every logo as SVG and transparent PNG, with usage notes."
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {ASSETS.map((a) => (
            <li key={a.file} className="flex flex-col overflow-hidden rounded-md border border-line">
              <div className={cn("flex h-36 items-center justify-center", a.dark ? "bg-foreground" : "bg-background")}>
                {/* eslint-disable-next-line @next/next/no-img-element -- the exact file being downloaded */}
                <img src={`${KIT}/${a.file}.svg`} alt={`HoomanLabs ${a.name.toLowerCase()}`} className={a.name.startsWith("Logo") ? "h-7 w-auto" : "h-10 w-auto"} />
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-line bg-surface px-4 py-3">
                <span className="text-small">{a.name}</span>
                <span className="flex gap-2">
                  <a href={`${KIT}/${a.file}.svg`} download className={buttonVariants({ variant: "outline", size: "sm" })}>
                    SVG
                  </a>
                  <a href={`${KIT}/${a.file}.png`} download className={buttonVariants({ variant: "outline", size: "sm" })}>
                    PNG · {a.png}
                  </a>
                </span>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-3">
          <span className="text-body font-medium">Do</span>
          <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Usage ok caption="Black logo on light backgrounds">
              <Wordmark className="h-4 w-auto" />
            </Usage>
            <Usage ok dark caption="White logo on dark backgrounds">
              <Wordmark className="h-4 w-auto" />
            </Usage>
            <Usage ok caption="Clear space of at least the H height">
              <span className="outline-1 outline-offset-0 outline-dashed outline-ink-muted p-3">
                <Wordmark className="h-4 w-auto" />
              </span>
            </Usage>
            <Usage ok caption="Written as one word, capital H and L">
              <span className="text-h4 font-normal">HoomanLabs</span>
            </Usage>
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-body font-medium">Don&apos;t</span>
          <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Usage caption="Stretch or squash it">
              <Wordmark className="h-4 w-auto scale-x-[1.35]" />
            </Usage>
            <Usage caption="Recolour it">
              <span className="text-[oklch(0.6_0.18_255)]">
                <Wordmark className="h-4 w-auto" />
              </span>
            </Usage>
            <Usage caption="Rotate it">
              <Wordmark className="h-4 w-auto -rotate-12" />
            </Usage>
            <Usage caption="Add shadows, outlines or effects">
              <Wordmark className="h-4 w-auto [filter:drop-shadow(2px_2px_0_oklch(0.75_0.12_80))]" />
            </Usage>
            <Usage caption="Place it on busy images">
              <Image src="/hero/parallax/00-master.png" alt="" fill sizes="20vw" className="object-cover" />
              <span className="relative text-white">
                <Wordmark className="h-4 w-auto" />
              </span>
            </Usage>
            <Usage caption="Retype it in another font">
              <span className="font-serif text-h4 italic">HoomanLabs</span>
            </Usage>
            <Usage caption="Split or misspell the name">
              <span className="text-h4 font-normal">Hooman Labs</span>
            </Usage>
            <Usage caption="Lock it up with other marks">
              <span className="flex items-center gap-2">
                <Wordmark className="h-3.5 w-auto" />
                <span className="text-ink-muted">×</span>
                <span className="size-5 rounded-full bg-foreground" />
              </span>
            </Usage>
          </ul>
          <p className="text-small text-ink-secondary">Keep the logo at least 80px wide on screen, and the mark at least 16px.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {[
            ["Ink", "#171717", "bg-[#171717]"],
            ["White", "#FFFFFF", "bg-white"],
          ].map(([n, hex, bg]) => (
            <div key={n} className="flex items-center gap-3 rounded-md border border-line px-3 py-2">
              <span className={cn("size-6 rounded-sm border border-line", bg)} />
              <span className="text-small">{n}</span>
              <Code>{hex}</Code>
            </div>
          ))}
        </div>
      </Block>

      <Block id="principles" title="Principles" intro="The five rules every section is checked against.">
        <ol className="grid gap-4 sm:grid-cols-2">
          {[
            ["Calm, not loud", "One idea per section, plenty of space, nothing competing with the product."],
            ["Black and white first", "Greys carry the hierarchy. Colour only comes from the product UI and customer logos."],
            ["Gouache art and clean SaaS UI", "Painted art for atmosphere, real product screens for proof. No mascot, no 3D, no stock."],
            ["Show the product", "Explain with real screens and real sample data, not abstract illustrations."],
            ["Static by default", "Motion only where it explains something, and never pinned scroll on the homepage."],
          ].map(([t, b], i) => (
            <li key={t} className="flex flex-col gap-1.5 border-t border-line-strong pt-3">
              <span className="font-mono text-label text-ink-muted">0{i + 1}</span>
              <span className="text-body font-medium">{t}</span>
              <span className="text-small text-ink-secondary">{b}</span>
            </li>
          ))}
        </ol>
      </Block>

      <Block id="logo" title="Logo" intro="Mark and wordmark from one file. Fill is currentColor, so it follows the text colour.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Panel className="flex h-40 items-center justify-center border border-line">
            <Wordmark className="h-6 w-auto" />
          </Panel>
          <div className="dark flex h-40 items-center justify-center rounded-md bg-background text-foreground">
            <Wordmark className="h-6 w-auto" />
          </div>
          <Panel className="flex h-28 items-center justify-center gap-6 border border-line">
            <LogoMark className="size-8" />
            <LogoMark className="size-5" />
            <LogoMark className="size-4" />
          </Panel>
          <div className="flex flex-col justify-center gap-2">
            <Code>{"<Wordmark />  ·  <LogoMark />"}</Code>
            <Rules items={["Header height 19px; never stretch or recolour.", "Mark alone only where space is tight (favicon, small UI)."]} />
          </div>
        </div>
      </Block>

      <Block id="colour" title="Colour" intro="One neutral grey scale, zero chroma. Use the semantic name in code, never the raw grey.">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {GREYS.map(([v, name, role]) => (
            <li key={v} className="flex flex-col gap-2">
              <span className="h-16 rounded-md border border-line" style={{ background: `var(${v})` }} />
              <span className="text-small font-medium">{name}</span>
              <span className="text-label text-ink-secondary">{role}</span>
              <Code>{v}</Code>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-3">
          <span className="text-body font-medium">Product UI</span>
          <p className="text-small text-ink-secondary">
            Scoped to <Code>.ui-dark</Code> so they never leak into the page. Only for recreations of the product.
          </p>
          <ul className="ui-dark grid grid-cols-2 gap-3 rounded-md p-4 sm:grid-cols-4 lg:grid-cols-7">
            {UI.map(([v, role]) => (
              <li key={v} className="flex flex-col gap-2">
                <span className="h-12 rounded-md border border-white/10" style={{ background: `var(${v})` }} />
                <span className="text-label text-(--ui-muted)">{role}</span>
                <code className="font-mono text-[11px] text-(--ui-muted)">{v}</code>
              </li>
            ))}
          </ul>
        </div>
        <Rules
          tone="dont"
          items={["No brand accent colour yet: colour arrives later as a token swap in globals.css.", "No one-off hex or oklch values in components."]}
        />
      </Block>

      <Block id="type" title="Type" intro="Geist and Geist Mono. Hierarchy comes from size and tone, not weight.">
        <ul className="flex flex-col">
          {TYPE.map(([cls, use, sample]) => (
            <li key={cls} className="grid gap-2 border-b border-line py-5 first:pt-0 md:grid-cols-[11rem_1fr] md:gap-6">
              <div className="flex flex-col gap-0.5">
                <Code>{cls}</Code>
                <span className="text-label text-ink-secondary">{use}</span>
              </div>
              <span className={cn(cls, "font-normal")}>{sample}</span>
            </li>
          ))}
          <li className="grid gap-2 py-5 md:grid-cols-[11rem_1fr] md:gap-6">
            <div className="flex flex-col gap-0.5">
              <Code>font-mono text-label</Code>
              <span className="text-label text-ink-secondary">Eyebrows, labels, numbers</span>
            </div>
            <span className="font-mono text-label text-ink-muted">Agents · 01 · Collections</span>
          </li>
        </ul>
        <Rules
          items={[
            "Headings are font-normal (font-medium for small ones). Never semibold or bold.",
            "Body copy under a heading is ink-secondary; captions are ink-muted.",
            "Keep lines short: max-w-[56ch] for paragraphs, balance on headings.",
          ]}
        />
      </Block>

      <Block id="layout" title="Layout and shape" intro="One container, one rhythm, one shape rule.">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["Container", "1300px max", "--container-page"],
            ["Gutter", "16 / 24 / 40px", "--gutter"],
            ["Section gap", "40 → 64px", "--section-gap"],
          ].map(([t, v, tok]) => (
            <Panel key={t} className="flex flex-col gap-1 p-5">
              <span className="text-label text-ink-secondary">{t}</span>
              <span className="text-h4 font-normal">{v}</span>
              <Code>{tok}</Code>
            </Panel>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Panel className="flex items-center gap-4 p-5">
            <span className={buttonVariants()}>{ctas.demo.label}</span>
            <span className="text-small text-ink-secondary">Controls are fully rounded.</span>
          </Panel>
          <Panel className="flex items-center gap-4 p-5">
            <span className="size-10 shrink-0 rounded-md border border-line-strong bg-background" />
            <span className="text-small text-ink-secondary">
              Containers use <Code>rounded-md</Code> (6px).
            </span>
          </Panel>
        </div>
      </Block>

      <Block id="components" title="Components" intro="Use the shared components; don't restyle them per section.">
        <div className="flex flex-col gap-3">
          <span className="text-body font-medium">Buttons</span>
          <div className="flex flex-wrap items-center gap-3">
            <span className={buttonVariants()}>{ctas.demo.label}</span>
            <span className={buttonVariants({ variant: "outline" })}>Outline</span>
            <span className={buttonVariants({ variant: "secondary" })}>Secondary</span>
            <span className={buttonVariants({ variant: "ghost" })}>Ghost</span>
          </div>
          <Rules items={["One primary button per view. One size site-wide (h-10).", `The demo CTA is always “${ctas.demo.label}” and opens Cal.com via data-demo.`]} />
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-body font-medium">Text link</span>
          <div>
            <TextLink href="/brand#components">Explore Agents</TextLink>
          </div>
          <Rules items={["For “learn more” paths at the end of a section or panel. Verb + noun, no “Click here”."]} />
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-body font-medium">Panel and card</span>
          <div className="grid gap-4 sm:grid-cols-2">
            <Panel className="flex h-32 flex-col justify-end gap-1 p-5">
              <span className="text-h4 font-normal">Panel</span>
              <Code>{"<Panel />  ·  bg-surface"}</Code>
            </Panel>
            <div className="flex h-32 flex-col justify-end gap-1 rounded-xl border border-line bg-background p-5">
              <span className="text-h4 font-normal">Card</span>
              <Code>border-line bg-background</Code>
            </div>
          </div>
          <Rules items={["Panels hold a section's content on the page. Cards sit inside panels or grids.", "Rows inside panels are separated by hairlines (border-line), not boxes."]} />
        </div>
      </Block>

      <Block
        id="product-ui"
        title="Product UI"
        intro="Real screens, recreated in code with sample data. Dark, like the product, on a quiet grey stage."
      >
        <Panel className="p-3">
          <div className={cn(STAGE, "aspect-[16/9]")}>
            <div aria-hidden className={cn("ui-dark flex flex-col gap-3 p-4", SCREEN_BLEED)}>
              <span className="font-mono text-[10px] tracking-wide text-(--ui-muted) uppercase">Behavior</span>
              <div className="flex flex-col gap-2 rounded-lg border border-(--ui-line) bg-(--ui-panel) p-3 text-[12px]">
                <span className="font-medium">Global instructions</span>
                <span className="text-(--ui-muted)">You are Ria, a billing assistant for Halden Energy.</span>
                <span className="h-6 w-1/2 rounded-md bg-(--ui-raised)" />
              </div>
            </div>
          </div>
        </Panel>
        <div className="flex flex-wrap gap-x-6 gap-y-1">
          <Code>STAGE</Code>
          <Code>SCREEN_BLEED</Code>
          <Code>.ui-dark</Code>
          <Code>@/lib/recipes</Code>
        </div>
        <Rules
          items={[
            "Stage: the panel's grey with a hairline, inside a Panel. The screen runs off the right and bottom edges.",
            "Static. Hovering a copy row may light up the part of the screen it describes.",
            "Sample data only: Halden Energy, Ria (the agent), Maya Patel (the customer).",
          ]}
        />
        <Rules tone="dont" items={["No real customer prompts, names or numbers in screens.", "No paintings behind product screens."]} />
      </Block>

      <Block id="imagery" title="Imagery" intro="Gouache paintings for atmosphere; customer logos for trust.">
        <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
          <div className="relative aspect-[16/9] overflow-hidden rounded-md">
            <Image src="/hero/parallax/00-master.png" alt="" fill sizes="(min-width: 640px) 60vw, 100vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-end gap-3">
            <Rules items={["Paintings in heroes only, never in content sections.", "Soft, natural, unpeopled landscapes in gouache."]} />
            <Rules tone="dont" items={["No mascot, 3D, stock photos or AI-glossy renders."]} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-body font-medium">Customer logos</span>
          <Rules
            items={[
              "SVGs in public/logos, cropped to their drawn area and sized by √aspect so they carry equal weight.",
              "Grey at rest (one even tone across all logos, 45% opacity), full colour on hover.",
            ]}
          />
        </div>
      </Block>

      <Block id="motion" title="Motion" intro="Quiet and quick. Motion explains; it never decorates.">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["Ease out", "--ease-out", "Entrances, hovers"],
            ["Ease in-out", "--ease-in-out", "Moves on screen"],
            ["150–300ms", "duration", "Hover and state changes"],
          ].map(([t, tok, use]) => (
            <Panel key={t} className="flex flex-col gap-1 p-5">
              <span className="text-h4 font-normal">{t}</span>
              <span className="text-label text-ink-secondary">{use}</span>
              <Code>{tok}</Code>
            </Panel>
          ))}
        </div>
        <Rules
          items={[
            "Respect prefers-reduced-motion everywhere.",
            "Hover effects only on pointer devices (hover:hover and pointer:fine).",
            "Buttons press to scale 0.97.",
          ]}
        />
        <Rules tone="dont" items={["No pinned scroll on the homepage; keep it for /platform pages.", "No looping animations next to copy people are reading."]} />
      </Block>

      <Block id="copy" title="Copy" intro="Explained, consistent and short.">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-3">
            <span className="text-body font-medium">Do</span>
            <Rules
              items={[
                "Say what it does, how it does it, then your process: the same three beats in each product.",
                "Parallel structure: matching sections use matching sentence shapes.",
                "Plain verbs: answers, books, updates, sends.",
                "Each fact once. If the heading says it, the subtext doesn't.",
                "Sentence case for headings, ending with a full stop.",
              ]}
            />
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-body font-medium">Don&apos;t</span>
            <Rules
              tone="dont"
              items={[
                "Literal labels like “What it does”; name the outcome instead (“Resolves the call”).",
                "Jargon and hype: revolutionary, seamless, cutting-edge.",
                "Long paragraphs; two short sentences is the most a row should hold.",
                "Placeholder numbers or links on a page going live.",
              ]}
            />
          </div>
        </div>
        <Panel className="flex flex-col gap-2 p-5">
          <span className="font-mono text-label text-ink-muted">Example row</span>
          <span className="text-body">Knows before hello</span>
          <span className="text-small text-ink-secondary">
            Before the call it pulls the customer&apos;s details from your systems, then replies in real time using your prompt.
          </span>
        </Panel>
      </Block>
    </Container>
  )
}
