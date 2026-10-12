"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon, CheckIcon, PlayIcon } from "@phosphor-icons/react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { AgentBuilder, WorkflowCanvas } from "@/components/product/flow-canvas"
import { UseCaseStory } from "@/components/sections/use-case-story"
import { ctas } from "@/content/draft"
import { caseStudy, faqs, outcomes, resources, stat, stories, templates } from "@/content/structure"
import { componentHref, components, useCases } from "@/content/platform"
import { cn } from "@/lib/utils"

/**
 * Sections for the structured homepage (/lab/hero-call). Each is plain SaaS
 * layout; painted art appears only in the hero, the video poster and the
 * story thumbnails.
 */

function Header({
  title,
  body,
  aside,
  className,
}: {
  title: string
  body?: string
  aside?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-x-8 gap-y-4", className)}>
      <div className="flex max-w-[44rem] flex-col gap-3">
        <h2 className="text-h2 font-normal">{title}</h2>
        {body && <p className="text-body text-ink-secondary">{body}</p>}
      </div>
      {aside}
    </div>
  )
}

/* ------------------------------------------------------------ 2 carousel */

const CAROUSEL: (typeof useCases)[number]["visual"][] = ["collections", "booking", "support", "leads"]

export function UseCaseCarousel({
  only = CAROUSEL,
  more = { label: "See all use cases", href: "/platform#product-use-cases" },
}: {
  only?: (typeof useCases)[number]["visual"][]
  more?: { label: string; href: string }
} = {}) {
  const track = useRef<HTMLUListElement>(null)
  const list = only.map((v) => useCases.find((u) => u.visual === v)!)
  const scroll = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const card = el.querySelector("li")
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 360) + 16), behavior: "smooth" })
  }
  return (
    <Section id="sl-usecases">
      <Container>
        <Header
          title="What teams put agents on."
          body="Start with one high-volume call type, then add the next."
          aside={
            <div className="flex items-center gap-4">
              <TextLink href={more.href}>{more.label}</TextLink>
              <div className="flex gap-1.5">
                {([-1, 1] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => scroll(d)}
                    aria-label={d === -1 ? "Previous use case" : "Next use case"}
                    className="grid size-9 place-items-center rounded-full border border-line-strong bg-background transition-colors hover:bg-surface"
                  >
                    {d === -1 ? <ArrowLeftIcon className="size-4" /> : <ArrowRightIcon className="size-4" />}
                  </button>
                ))}
              </div>
            </div>
          }
        />
        <ul
          ref={track}
          className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none]"
        >
          {list.map((u, i) => (
            <li key={u.title} className="flex w-[85%] shrink-0 snap-start sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.7rem)]">
              <UseCaseStory useCase={u} resultFirst tone={i % 2 === 0 ? "charcoal" : "light"} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

/* ------------------------------------------------------------ 4 outcomes */

export function Outcomes() {
  return (
    <Section id="sl-outcomes">
      <Container>
        <Header title={outcomes.title} body={outcomes.body} />
        <ul className="mt-10 grid gap-3 md:grid-cols-3">
          {outcomes.items.map((o) => (
            <li key={o.tag}>
              <Panel className="flex h-full flex-col gap-5 p-6">
                <span className="font-mono text-label text-ink-muted">{o.tag}</span>
                <div className="flex flex-col gap-1">
                  <span className="text-display font-normal tabular-nums">{o.value}</span>
                  <span className="text-small text-ink-secondary">{o.label}</span>
                </div>
                <p className="text-small text-ink-secondary">{o.body}</p>
                <ul className="mt-auto flex flex-col gap-1.5 border-t border-line pt-4">
                  {o.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-small">
                      <CheckIcon weight="bold" className="size-3.5 text-ink-muted" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Panel>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

/* ------------------------------------------------------------ 5 stat */

export function StatHeadline() {
  return (
    <Section id="sl-stat">
      <Container className="flex flex-col items-center gap-3 border-y border-line py-16 text-center">
        <p className="text-[clamp(3rem,2rem+5vw,6rem)] leading-none font-normal tracking-tight tabular-nums">{stat.value}</p>
        <p className="text-h4 font-normal">{stat.label}</p>
        <p className="text-small text-ink-secondary">{stat.body}</p>
      </Container>
    </Section>
  )
}

/* ------------------------------------------------------------ 7 video case study */

export function VideoCaseStudy() {
  const [playing, setPlaying] = useState(false)
  const [missing, setMissing] = useState(false)
  return (
    <Section id="sl-video">
      <Container>
        <Panel className="grid gap-8 p-3 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div className="relative isolate aspect-video overflow-hidden rounded-md bg-placeholder">
            {playing && !missing ? (
              <video
                src={caseStudy.video}
                poster={caseStudy.poster}
                controls
                autoPlay
                onError={() => setMissing(true)}
                className="size-full object-cover"
              />
            ) : (
              <>
                <Image src={caseStudy.poster} alt="" fill sizes="(min-width: 1024px) 760px, 100vw" className="-z-10 object-cover" />
                <span className="absolute inset-0 -z-10 bg-black/15" />
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label={`Play the ${caseStudy.customer} case study video`}
                  className="absolute inset-0 grid place-items-center"
                >
                  <span className="grid size-16 place-items-center rounded-full bg-white text-foreground shadow-lg transition-transform duration-150 hover:scale-105">
                    <PlayIcon weight="fill" className="ml-0.5 size-5" />
                  </span>
                </button>
                {missing && (
                  <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-label text-white">
                    Video coming soon
                  </span>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col gap-6 px-3 pb-4 lg:px-6 lg:py-6">
            <span className="font-mono text-label text-ink-muted">
              {caseStudy.eyebrow} · {caseStudy.customer}
            </span>
            <blockquote className="text-h3 font-normal">&ldquo;{caseStudy.quote}&rdquo;</blockquote>
            <p className="text-small text-ink-secondary">{caseStudy.person}</p>
            <dl className="grid grid-cols-3 gap-4 border-t border-line pt-5">
              {caseStudy.results.map((r) => (
                <div key={r.label} className="flex flex-col gap-1">
                  <dd className="text-h4 font-normal tabular-nums">{r.value}</dd>
                  <dt className="order-2 text-label text-ink-secondary">{r.label}</dt>
                </div>
              ))}
            </dl>
            <TextLink href={caseStudy.link.href}>{caseStudy.link.label}</TextLink>
          </div>
        </Panel>
      </Container>
    </Section>
  )
}

/* ------------------------------------------------------------ 12 platform summary */

export function PlatformSummary({
  hide = [],
  footer,
}: {
  /** Resource labels to leave out. */
  hide?: string[]
  /** Extra row under the grid. */
  footer?: React.ReactNode
} = {}) {
  return (
    <Section id="sl-summary">
      <Container>
        <Header title={resources.title} aside={<TextLink href="/platform">See the full platform</TextLink>} />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* Real cell borders (not a gap-px background), so the dividers survive sub-pixel column widths. The list overhangs by 1px so the last row/column borders are clipped. */}
          <div className="flex overflow-hidden rounded-md border border-line">
            <ul className="-mr-px -mb-px grid flex-1 auto-rows-fr sm:grid-cols-2 lg:grid-cols-3">
              {components.map((c) => (
                <li key={c.id} className="border-r border-b border-line">
                  <Link href={componentHref(c.id)} className="group flex h-full flex-col gap-1 bg-background p-5 transition-colors hover:bg-surface">
                    <span className="flex items-center justify-between text-body font-medium">
                      {c.name}
                      <ArrowRightIcon className="size-4 text-ink-muted transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <span className="text-small text-ink-secondary">{c.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col">
            <p className="pb-3 font-mono text-label text-ink-muted">Resources</p>
            <ul className="flex flex-col border-t border-line">
              {resources.links.filter((r) => !hide.includes(r.label)).map((r) => (
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
        </div>
        {footer}
      </Container>
    </Section>
  )
}

/* ------------------------------------------------------------ 14 templates */

export function UseCaseTemplates() {
  const [active, setActive] = useState(0)
  const group = templates.groups[active]
  return (
    <Section id="sl-templates">
      <Container>
        <Header title={templates.title} body={templates.body} />
        <div role="tablist" aria-label="Templates by function" className="mt-8 flex w-fit max-w-full gap-1 overflow-x-auto rounded-full bg-secondary p-1 [scrollbar-width:none]">
          {templates.groups.map((g, i) => (
            <button
              key={g.name}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "shrink-0 rounded-full px-4 py-1.5 text-small transition-colors duration-150",
                i === active ? "bg-background text-foreground shadow-xs" : "text-ink-secondary hover:text-foreground"
              )}
            >
              {g.name}
            </button>
          ))}
        </div>
        <ul role="tabpanel" className="mt-6 grid gap-3 md:grid-cols-3">
          {group.items.map((t) => (
            <li key={t.title}>
              <Panel className="flex h-full flex-col gap-3 p-6">
                <span className="font-mono text-label text-ink-muted">{group.name} template</span>
                <h3 className="text-h4 font-normal">{t.title}</h3>
                <p className="text-small text-ink-secondary">{t.body}</p>
                <TextLink href="#" className="mt-auto pt-2">
                  Use template
                </TextLink>
              </Panel>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

/* ------------------------------------------------------------ 17 stories */

export function CustomerStories({ title = stories.title }: { title?: string } = {}) {
  return (
    <Section id="sl-stories">
      <Container>
        <Header title={title} aside={<TextLink href={stories.all.href}>{stories.all.label}</TextLink>} />
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {stories.items.map((s) => (
            <li key={s.title}>
              <Link href={s.href} className="group flex flex-col gap-4">
                <span className="relative block aspect-[16/10] overflow-hidden rounded-md">
                  <Image
                    src={s.art}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-(--ease-out) group-hover:scale-[1.03]"
                  />
                </span>
                <span className="font-mono text-label text-ink-muted">{s.tag}</span>
                <span className="text-h4 font-normal group-hover:underline">{s.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

/* ------------------------------------------------------------ 18 FAQ */

export function HomeFaq() {
  return (
    <Section id="sl-faq">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-start">
        {/* Heading pinned to the top (sticky) so it stays beside the questions */}
        <div className="flex flex-col gap-3 lg:sticky lg:top-28">
          <h2 className="text-h2 font-normal">{faqs.title}</h2>
          <p className="text-body text-ink-secondary">
            Can&apos;t find what you need?{" "}
            <Link href={ctas.demo.href} className="text-foreground underline underline-offset-4">
              Talk to our team
            </Link>
            .
          </p>
          <TextLink href="https://docs.hoomanlabs.com" className="mt-2">
            Read the docs
          </TextLink>
        </div>
        <Accordion className="border-y border-line">
          {faqs.items.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="border-line">
              <AccordionTrigger className="items-center gap-4 rounded-none py-4 text-body font-normal hover:no-underline focus-visible:ring-0">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="max-w-[60ch] pb-5 text-small text-ink-secondary">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  )
}

/* ------------------------------------------------------------ agents / workflow switch */

const VIEWS = [
  { id: "agent", label: "Agent builder" },
  { id: "workflow", label: "Workflow" },
] as const

/** The large feature card's visual: switch between the agent builder and the workflow graph. */
export function AgentsWorkflowSwitch() {
  const [view, setView] = useState<(typeof VIEWS)[number]["id"]>("agent")
  return (
    <div className="flex flex-col gap-3">
      <div role="tablist" aria-label="View" className="flex w-fit gap-1 rounded-full bg-secondary p-1">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            type="button"
            role="tab"
            aria-selected={view === v.id}
            onClick={() => setView(v.id)}
            className={cn(
              "rounded-full px-4 py-1.5 text-small transition-colors duration-150",
              view === v.id ? "bg-background text-foreground shadow-xs" : "text-ink-secondary hover:text-foreground"
            )}
          >
            {v.label}
          </button>
        ))}
      </div>
      <div aria-hidden className="overflow-hidden rounded-md border border-black/10">
        {view === "agent" ? (
          <AgentBuilder className="md:h-[30rem]" />
        ) : (
          <div className="flex items-center bg-[oklch(0.13_0_0)] md:h-[30rem]">
            <WorkflowCanvas className="w-full pt-12" />
          </div>
        )}
      </div>
    </div>
  )
}
