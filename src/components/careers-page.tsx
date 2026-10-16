import Link from "next/link"
import {
  ArrowRightIcon,
  BooksIcon,
  CalendarCheckIcon,
  ChartLineUpIcon,
  HeartbeatIcon,
  LaptopIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr"

import { MeshStage } from "@/components/layout/art-stage"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { FROSTED, HERO_CARD } from "@/lib/hero-styles"
import { buttonVariants } from "@/components/ui/button"
import { APPLY_EMAIL, careersPage as c, roleHref, roles } from "@/content/careers"
import { cn } from "@/lib/utils"

/**
 * /careers, in the product pages' calm language: the hero (who we are, with
 * the open role floating on a backdrop), open roles grouped by team, values,
 * how we work, benefits and the hiring process. One role for now; the list
 * and counts come from content/careers.ts. Placeholders there are marked
 * TO CONFIRM.
 */

const ROOMY = {
  "--section-gap": "clamp(3.25rem, 2.25rem + 3vw, 5rem)",
  "--section-pad": "calc(var(--section-gap) / 2)",
} as React.CSSProperties

const BENEFIT_ICONS = [ChartLineUpIcon, HeartbeatIcon, LaptopIcon, BooksIcon, CalendarCheckIcon, UsersThreeIcon]

function Header({ label, title, line }: { label: string; title: string; line?: string }) {
  return (
    <div className="flex max-w-[44rem] flex-col gap-3">
      <span className="font-mono text-label text-ink-muted">{label}</span>
      <h2 className="text-h2 font-normal">{title}</h2>
      {line && <p className="text-body text-ink-secondary">{line}</p>}
    </div>
  )
}

export function CareersPage() {
  const teams = [...new Set(roles.map((r) => r.team))]
  const featured = roles[0]

  return (
    <div style={ROOMY}>
      {/* Hero */}
      <Section id="careers-hero" spacing="none" className="pt-10 pb-(--section-pad) md:pt-16">
        <Container>
          <p className="reveal text-small text-ink-muted">{c.crumb}</p>
          <h1 className="reveal mt-3 max-w-[20ch] text-display font-normal" style={{ "--i": 1 } as React.CSSProperties}>
            {c.title}
          </h1>
          <p className="reveal mt-5 max-w-[56ch] text-body-lg text-ink-secondary" style={{ "--i": 2 } as React.CSSProperties}>
            {c.line}
          </p>
          <div className="reveal mt-8 flex flex-wrap items-center gap-x-6 gap-y-3" style={{ "--i": 3 } as React.CSSProperties}>
            <Link href="#careers-roles" className={buttonVariants()}>
              See open roles
            </Link>
            <span className="text-small text-ink-muted">
              {roles.length} open {roles.length === 1 ? "role" : "roles"}
            </span>
          </div>
        </Container>

        <Container className="reveal mt-10 md:mt-14">
          <MeshStage image="/art/product/post-call-backdrop.webp" className="flex min-h-[26rem] items-end p-5 sm:min-h-[30rem] sm:p-10">
            {featured && (
              <Link href={roleHref(featured.slug)} className={cn(HERO_CARD, "group flex w-full max-w-[34rem] flex-col gap-4 p-6 transition-transform duration-300 ease-(--ease-out) hover:-translate-y-0.5")}>
                <span className="flex items-center gap-2 text-[12px] text-(--ui-muted)">
                  <span className="size-1.5 rounded-full bg-(--ui-live) motion-safe:animate-pulse" />
                  We&apos;re hiring
                </span>
                <span className="flex flex-col gap-1.5">
                  <span className="text-[22px] leading-tight">{featured.title}</span>
                  <span className="text-[13.5px] leading-relaxed text-(--ui-muted)">{featured.summary}</span>
                </span>
                <span className="flex flex-wrap items-center gap-2 text-[12px]">
                  {[featured.team, featured.location, featured.type].map((t) => (
                    <span key={t} className="rounded-full bg-(--ui-raised) px-2.5 py-0.5">
                      {t}
                    </span>
                  ))}
                  <span className="ml-auto flex items-center gap-1 text-(--ui-text) group-hover:underline">
                    View role
                    <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </span>
              </Link>
            )}
            <span className={cn(FROSTED, "absolute top-5 right-5 hidden rounded-full px-3.5 py-1.5 sm:top-10 sm:right-10 sm:block")}>Small team · real calls in production</span>
          </MeshStage>
        </Container>
      </Section>

      {/* Open roles */}
      <Section id="careers-roles" className="scroll-mt-20">
        <Container>
          <Header label="Open roles" title="Join us." line="Every role here is close to customers and to the product. Click a role to read more and apply." />
          <div className="mt-10 flex flex-col gap-10">
            {teams.map((team) => {
              const list = roles.filter((r) => r.team === team)
              return (
                <div key={team} className="flex flex-col">
                  <div className="flex items-baseline justify-between border-b border-line pb-3">
                    <h3 className="text-h4 font-normal">{team}</h3>
                    <span className="text-small text-ink-muted">
                      {list.length} {list.length === 1 ? "role" : "roles"}
                    </span>
                  </div>
                  <ul className="flex flex-col">
                    {list.map((r) => (
                      <li key={r.slug}>
                        <Link href={roleHref(r.slug)} className="group grid gap-2 border-b border-line py-5 transition-colors hover:bg-surface sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-8 sm:px-3">
                          <span className="flex flex-col gap-1">
                            <span className="text-body">{r.title}</span>
                            <span className="text-small text-ink-secondary">{r.summary}</span>
                          </span>
                          <span className="text-small text-ink-muted">
                            {r.location} · {r.type}
                          </span>
                          <ArrowRightIcon className="hidden size-4 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-foreground sm:block" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
            <div className="flex flex-col gap-3 rounded-xl border border-dashed border-line-strong p-6 sm:flex-row sm:items-center sm:justify-between">
              <span className="flex flex-col gap-1">
                <span className="text-body">{c.nobody.title}</span>
                <span className="text-small text-ink-secondary">{c.nobody.body}</span>
              </span>
              <a href={`mailto:${APPLY_EMAIL}?subject=${encodeURIComponent("Open application")}`} className={buttonVariants({ variant: "outline" })}>
                Write to us
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section id="careers-values">
        <Container>
          <Header label="What we value" title="How we like to work." />
          <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {c.values.map((v, i) => (
              <li key={v.title} className="flex flex-col gap-2 border-t border-line pt-5">
                <span className="font-mono text-label text-ink-muted">0{i + 1}</span>
                <span className="text-body">{v.title}</span>
                <span className="text-small text-ink-secondary">{v.body}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* How we work + benefits */}
      <Section id="careers-how">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            <Header label="How we work" title="Small team, close to the work." />
            <dl className="flex flex-col">
              {c.how.map((h) => (
                <div key={h.label} className="grid grid-cols-[6rem_1fr] gap-4 border-t border-line py-3.5 text-small">
                  <dt className="text-ink-muted">{h.label}</dt>
                  <dd>{h.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div id="careers-benefits" className="flex flex-col gap-8">
            <Header label="Benefits" title="Looked after, so you can do your best work." />
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {c.benefits.map((b, i) => {
                const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length]
                return (
                  <li key={b.title} className="flex flex-col gap-3 rounded-xl border border-line p-5">
                    <span className="grid size-9 place-items-center rounded-lg bg-surface">
                      <Icon className="size-4 text-ink-secondary" />
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="text-body">{b.title}</span>
                      <span className="text-small text-ink-secondary">{b.body}</span>
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Hiring process */}
      <Section id="careers-process">
        <Container>
          <Header label="Hiring process" title="Four steps, no surprises." line="We aim to keep it short and respectful of your time." />
          <ol className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {c.process.map((p, i) => (
              <li key={p.step} className="relative flex flex-col gap-2 border-t border-line pt-5">
                <span className="absolute -top-[5px] left-0 size-2.5 rounded-full border-2 border-background bg-foreground" />
                <span className="font-mono text-label text-ink-muted">Step {i + 1}</span>
                <span className="text-body">{p.step}</span>
                <span className="text-small text-ink-secondary">{p.body}</span>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
    </div>
  )
}
