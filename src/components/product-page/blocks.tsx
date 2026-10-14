import Link from "next/link"
import { ArrowRightIcon, QuotesIcon } from "@phosphor-icons/react/dist/ssr"
import type { Icon } from "@phosphor-icons/react"
import type { SimpleIcon } from "simple-icons"

import { buttonVariants } from "@/components/ui/button"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { ctas } from "@/content/draft"
import { menuHref, platformFeatured, platformMenu, type MenuPageId } from "@/content/platform"
import type { SectionId } from "@/content/sections"
import { SCREEN_BLEED, STAGE } from "@/lib/recipes"
import { cn } from "@/lib/utils"

/**
 * Shared blocks for the Platform pages. Each page composes the ones it needs,
 * in its own order: PageHero, Showcase (a large explained screen), Pillars, FeaturePanel
 * (one deep-dive with a visual), FeatureGrid (compact cards), Proof,
 * IntegrationsStrip, TrustRow (and Faq, in faq.tsx, which runs in the browser)
 * and WorksWith. Content comes from the website content sheet, one data file
 * per page (src/content/pages/).
 */

export type Feature = { name: string; pointer: string; soon?: boolean }
/** One capability, written as a feature (not a question). */
export type Capability = {
  title: string
  body: string
  features: Feature[]
  /** A neighbouring Platform page this continues on. */
  more?: MenuPageId
}

const allPages = [...platformMenu.flatMap((g) => g.pages), platformFeatured]
const page = (id: MenuPageId) => allPages.find((p) => p.id === id)!

/**
 * Breadcrumb, the benefit headline (the page's H1), one line, an optional
 * Book a demo button, then an optional screen on the grey stage.
 */
export function PageHero({
  id,
  crumb,
  title,
  line,
  cta = false,
  screen,
}: {
  id: SectionId
  /** The page's menu name, shown in the breadcrumb. */
  crumb: string
  title: string
  line: string
  cta?: boolean
  screen?: (className: string) => React.ReactNode
}) {
  return (
    <Section id={id} spacing="none" className="pt-16 pb-(--section-pad) md:pt-24">
      <Container>
        <p className="reveal-blur text-small text-ink-muted">
          <Link href="/platform" className="hover:text-foreground">
            Platform
          </Link>{" "}
          / {crumb}
        </p>
        <h1 className="reveal-blur mt-3 max-w-[20ch] text-display font-normal" style={{ "--i": 1 } as React.CSSProperties}>
          {title}
        </h1>
        <p className="reveal-blur mt-4 max-w-[56ch] text-body-lg text-ink-secondary" style={{ "--i": 2 } as React.CSSProperties}>
          {line}
        </p>
        {cta && (
          <div className="reveal-blur mt-8" style={{ "--i": 3 } as React.CSSProperties}>
            <Link data-demo href={ctas.demo.href} className={buttonVariants()}>
              {ctas.demo.label}
            </Link>
          </div>
        )}
        {screen && (
          <Panel className="reveal-blur mt-12 p-3 md:mt-16" style={{ "--i": 3 } as React.CSSProperties}>
            <div className={cn(STAGE, "aspect-[4/3] md:aspect-[16/8]")}>{screen(SCREEN_BLEED)}</div>
          </Panel>
        )}
      </Container>
    </Section>
  )
}

/** A section heading over a large, self-explaining screen (e.g. the pinned prompt). */
export function Showcase({ id, title, line, children }: { id: SectionId; title: string; line: string; children: React.ReactNode }) {
  return (
    <Section id={id}>
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <h2 className="text-h2 font-normal">{title}</h2>
          <p className="text-body text-ink-secondary">{line}</p>
        </div>
        <div className="mt-10">{children}</div>
      </Container>
    </Section>
  )
}

export function FeatureList({ features }: { features: Feature[] }) {
  return (
    <ul className="flex flex-col border-t border-line">
      {features.map((f) => (
        <li key={f.name} className="flex flex-col gap-0.5 border-b border-line py-3">
          <span className="flex items-center gap-2 text-small font-medium">
            {f.name}
            {f.soon && <span className="rounded-full border border-line-strong px-2 py-px text-[11px] font-normal text-ink-muted">Coming soon</span>}
          </span>
          <span className="text-small text-ink-secondary">{f.pointer}</span>
        </li>
      ))}
    </ul>
  )
}

/** One capability: its line and features beside a screen on the grey stage. */
export function FeaturePanel({
  id,
  q,
  screen,
  flip = false,
}: {
  id: SectionId
  q: Capability
  screen: (className: string) => React.ReactNode
  flip?: boolean
}) {
  return (
    <Section id={id} spacing="tight">
      <Container>
        <Panel className="grid items-center gap-8 p-4 sm:p-6 lg:grid-cols-[2fr_3fr] lg:gap-0 lg:p-3">
          <div className={cn("flex flex-col gap-5 px-2 pt-4 sm:px-4 lg:px-10 lg:py-10", flip && "lg:order-2")}>
            <div className="flex flex-col gap-2">
              <h2 className="text-h3 font-normal">{q.title}</h2>
              <p className="text-body text-ink-secondary">{q.body}</p>
            </div>
            <FeatureList features={q.features} />
            {q.more && <TextLink href={menuHref(page(q.more))}>{`More on ${page(q.more).name}`}</TextLink>}
          </div>
          <div className={cn(STAGE, "aspect-[4/3] lg:aspect-[16/12]", flip && "lg:order-1")}>{screen(SCREEN_BLEED)}</div>
        </Panel>
      </Container>
    </Section>
  )
}

/** The idea in three parts: a short row under the logos. */
export function Pillars({ id, items }: { id: SectionId; items: { icon: Icon; title: string; body: string }[] }) {
  return (
    <Section id={id} spacing="tight">
      <Container>
        <ol className="grid gap-x-8 gap-y-6 border-t border-line pt-8 md:grid-cols-3">
          {items.map((it, i) => (
            <li key={it.title} className="flex gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-md border border-line bg-surface text-foreground">
                <it.icon className="size-5" aria-hidden />
              </span>
              <span className="flex flex-col gap-1">
                <span className="font-mono text-label text-ink-muted">0{i + 1}</span>
                <span className="text-h4 font-normal">{it.title}</span>
                <span className="text-small text-ink-secondary">{it.body}</span>
              </span>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}

/**
 * One sentence written in many scripts, set large: a typographic band that
 * shows languages at a glance. The first line is the original.
 */
export function ScriptWall({ id, title, items }: { id: SectionId; title: string; items: { lang: string; text: string }[] }) {
  return (
    <Section id={id}>
      <Container>
        <h2 className="max-w-[44rem] text-h2 font-normal">{title}</h2>
        <ul className="mt-10 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <li key={it.lang} className="flex flex-col gap-2 border-b border-line py-6 sm:pr-8">
              <span className="font-mono text-label text-ink-muted">{it.lang}</span>
              <span lang={it.lang === "English" ? "en" : undefined} className="text-h3 leading-snug font-normal">
                {it.text}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

/** The long tail of capabilities as compact cards: icon, name, one line. */
export function FeatureGrid({
  id,
  title,
  items,
}: {
  id: SectionId
  title: string
  items: (Feature & { icon: Icon })[]
}) {
  return (
    <Section id={id}>
      <Container>
        <h2 className="text-h2 font-normal">{title}</h2>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((f) => (
            <li key={f.name} className="flex">
              <Panel className="flex w-full flex-col gap-4 p-5">
                <span className="grid size-9 place-items-center rounded-md border border-line bg-background text-foreground">
                  <f.icon className="size-4" aria-hidden />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="flex items-center gap-2 text-body">
                    {f.name}
                    {f.soon && <span className="rounded-full border border-line-strong px-2 py-px text-[11px] text-ink-muted">Coming soon</span>}
                  </span>
                  <span className="text-small text-ink-secondary">{f.pointer}</span>
                </span>
              </Panel>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

/** One customer quote with a result. `placeholder` marks it as not real yet. */
export function Proof({
  id,
  quote,
  name,
  role,
  result,
  placeholder = false,
}: {
  id: SectionId
  quote: string
  name: string
  role: string
  result?: { figure: string; label: string }
  placeholder?: boolean
}) {
  return (
    <Section id={id} spacing="tight">
      <Container>
        <Panel className="grid gap-10 px-6 py-12 sm:px-12 lg:grid-cols-[2fr_1fr] lg:items-end lg:px-16 lg:py-16">
          <figure className="flex flex-col gap-8">
            <QuotesIcon weight="fill" className="size-7 text-ink-muted" aria-hidden />
            <blockquote className="max-w-[40ch] text-h3 font-normal">{quote}</blockquote>
            <figcaption className="flex flex-col">
              <span className="text-small font-medium">{name}</span>
              <span className="text-small text-ink-muted">{role}</span>
              {placeholder && <span className="mt-2 font-mono text-label text-ink-muted">Placeholder: replace with a real, approved quote</span>}
            </figcaption>
          </figure>
          {result && (
            <div className="flex flex-col gap-1 border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
              <span className="text-display leading-none font-normal">{result.figure}</span>
              <span className="text-small text-ink-secondary">{result.label}</span>
            </div>
          )}
        </Panel>
      </Container>
    </Section>
  )
}

/** Integrations as a logo row, with a link to the Integrations page. */
export function IntegrationsStrip({
  id,
  title,
  line,
  logos,
  more,
}: {
  id: SectionId
  title: string
  line: string
  logos: { name: string; icon?: SimpleIcon }[]
  more: MenuPageId
}) {
  return (
    <Section id={id}>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div className="flex max-w-[44rem] flex-col gap-3">
            <h2 className="text-h2 font-normal">{title}</h2>
            <p className="text-body text-ink-secondary">{line}</p>
          </div>
          <TextLink href={menuHref(page(more))}>{`See ${page(more).name}`}</TextLink>
        </div>
        <ul className="mt-10 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((l) => (
            <li key={l.name} className="flex h-24 flex-col items-center justify-center gap-2 bg-background text-small text-ink-secondary">
              {l.icon ? (
                <svg viewBox="0 0 24 24" className="size-6" style={{ fill: `#${l.icon.hex}` }} aria-hidden>
                  <path d={l.icon.path} />
                </svg>
              ) : (
                <span aria-hidden className="grid size-6 place-items-center rounded-md bg-surface font-mono text-label text-foreground">
                  {l.name === "Your APIs" ? "{ }" : l.name[0]}
                </span>
              )}
              {l.name}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

/** Enterprise readiness: a short row of trust items, with a link on. */
export function TrustRow({
  id,
  title,
  items,
  more,
}: {
  id: SectionId
  title: string
  items: { icon: Icon; title: string; body: string }[]
  more: MenuPageId
}) {
  return (
    <Section id={id} spacing="tight">
      <Container>
        <Panel className="flex flex-col gap-8 p-6 sm:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-h3 font-normal">{title}</h2>
            <TextLink href={menuHref(page(more))}>{`More on ${page(more).name}`}</TextLink>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((it) => (
              <li key={it.title} className="flex flex-col gap-2 border-t border-line-strong pt-4">
                <it.icon className="size-5 text-foreground" aria-hidden />
                <span className="text-body">{it.title}</span>
                <span className="text-small text-ink-secondary">{it.body}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </Container>
    </Section>
  )
}

/** The neighbouring Platform pages. */
export function WorksWith({ id, pages }: { id: SectionId; pages: MenuPageId[] }) {
  return (
    <Section id={id}>
      <Container>
        <h2 className="text-h3 font-normal">Works with</h2>
        <ul className="mt-6 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {pages.map((pid) => {
            const p = page(pid)
            return (
              <li key={pid} className="flex">
                <Link href={menuHref(p)} className="group flex w-full flex-col gap-1 bg-background p-5 transition-colors hover:bg-surface">
                  <span className="flex items-center justify-between text-body">
                    {p.name}
                    <ArrowRightIcon className="size-4 text-ink-muted transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="text-small text-ink-secondary">{p.blurb}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}

export type Tile = { title: string; body: string; visual: React.ReactNode; wide?: boolean }

/**
 * One chapter of a Platform page: a split header (the point on the left, one
 * line and an optional link on the right), then its tiles. Each tile shows a
 * single small piece of product on the grey stage, with a short caption.
 */
export function Chapter({ id, title, line, more, tiles }: { id: SectionId; title: string; line: string; more?: MenuPageId; tiles: Tile[] }) {
  return (
    <Section id={id}>
      <Container>
        <div className="grid gap-4 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2 className="max-w-[16ch] text-h2 font-normal">{title}</h2>
          <div className="flex flex-col items-start gap-4">
            <p className="max-w-[44ch] text-body-lg text-ink-secondary">{line}</p>
            {more && <TextLink href={menuHref(page(more))}>{`More on ${page(more).name}`}</TextLink>}
          </div>
        </div>
        <ul className="mt-10 grid gap-3 md:grid-cols-2 lg:mt-12">
          {tiles.map((t) => (
            <li key={t.title} className={cn("flex", t.wide && "md:col-span-2")}>
              <Panel className="flex w-full flex-col p-3">
                <div className={cn(STAGE, "flex items-center justify-center p-6", t.wide ? "h-64 md:h-80" : "h-64")}>{t.visual}</div>
                <div className="flex flex-col gap-1 px-3 pt-5 pb-3">
                  <span className="text-body">{t.title}</span>
                  <span className="max-w-[48ch] text-small text-ink-secondary">{t.body}</span>
                </div>
              </Panel>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
