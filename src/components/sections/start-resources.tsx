import Link from "next/link"
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon, DeviceMobileIcon, GlobeIcon, PhoneIcon } from "@phosphor-icons/react/dist/ssr"
import { siHubspot, siWhatsapp, siZendesk, type SimpleIcon } from "simple-icons"

import { Container } from "@/components/layout/container"
import { Halftone } from "@/components/layout/halftone"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { componentHref, components, type ComponentId } from "@/content/platform"
import { startPaths } from "@/content/landing"
import { resources } from "@/content/structure"
import { cn } from "@/lib/utils"

/**
 * Everything in one platform (/lab/v3): a light overview that links out.
 * One grid: the six platform parts as cards (a short stage with a small
 * graphic, the name and one benefit line), and in the last column the
 * resources list (top row) and self-serve (bottom row), so every edge
 * lines up. Dark and light graphics form a checkerboard. Static.
 */

const DARK = "dark graphite"

function Snip({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border border-line-strong bg-linear-to-b from-surface to-background to-40% p-2.5 shadow-[inset_0_1px_0_oklch(1_0_0/0.07),0_14px_32px_-14px_oklch(0_0_0/0.35)]",
        className
      )}
    >
      {children}
    </div>
  )
}

function Tick() {
  return (
    <span className="grid size-3.5 shrink-0 place-items-center rounded-full bg-foreground text-background">
      <CheckIcon weight="bold" className="size-2" />
    </span>
  )
}

function Brand({ icon }: { icon: SimpleIcon }) {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
      <path d={icon.path} />
    </svg>
  )
}

const Code = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-[4px] bg-foreground/[0.07] px-1 py-px font-mono text-[10px] text-foreground/85">{children}</span>
)

/* ------------------------------------------------------------ graphics */

const GRAPHICS: Record<ComponentId, () => React.ReactNode> = {
  agents: () => (
    <Snip className="w-44 gap-1.5">
      <span className="flex items-center justify-between">
        <span className="font-medium">Billing assistant</span>
        <span className="text-[10px] text-ink-muted">v5</span>
      </span>
      <span className="text-ink-secondary">
        Balance is <Code>{"{{context.balance}}"}</Code>
      </span>
      <span className="text-[10.5px] text-ink-muted">Ria · en-GB · 30 languages</span>
    </Snip>
  ),
  workflow: () => (
    <Snip className="w-44 gap-0">
      {[
        ["When", "Call not answered"],
        ["Then", "Send WhatsApp"],
        ["Then", "Retry in 2 hours"],
      ].map(([k, v], i) => (
        <span key={i} className="flex items-center gap-2 border-t border-line py-1.5 first:border-0">
          <span className="w-8 shrink-0 font-mono text-[10px] text-ink-muted">{k}</span>
          <span className="flex-1 truncate">{v}</span>
          {i > 0 && <Tick />}
        </span>
      ))}
    </Snip>
  ),
  simulations: () => (
    <Snip className="w-44 gap-2">
      <span className="flex items-center justify-between">
        <span>Personas</span>
        <span className="font-medium tabular-nums">18 / 18</span>
      </span>
      <span className="grid grid-cols-9 gap-1">
        {Array.from({ length: 18 }, (_, i) => (
          <span key={i} className="h-2 rounded-[2px] bg-foreground/80" />
        ))}
      </span>
      <span className="text-[10.5px] text-ink-muted">Passed before go-live</span>
    </Snip>
  ),
  qa: () => (
    <Snip className="w-44 gap-1.5">
      <span className="flex items-baseline gap-1">
        <span className="text-[1.4rem] leading-none tabular-nums">4.6</span>
        <span className="text-ink-muted">/ 5</span>
      </span>
      {[96, 90, 88].map((v, i) => (
        <span key={i} className="h-1.5 overflow-hidden rounded-full bg-foreground/10">
          <span className="block h-full rounded-full bg-foreground" style={{ width: `${v}%` }} />
        </span>
      ))}
    </Snip>
  ),
  channels: () => (
    <div className="grid w-44 grid-cols-2 gap-1.5 text-[11px]">
      {[
        { n: "Phone", i: <PhoneIcon className="size-3.5" /> },
        { n: "WhatsApp", i: <Brand icon={siWhatsapp} /> },
        { n: "Web", i: <GlobeIcon className="size-3.5" /> },
        { n: "App", i: <DeviceMobileIcon className="size-3.5" /> },
      ].map((c) => (
        <span key={c.n} className="flex items-center gap-1.5 rounded-md border border-line-strong bg-background px-2 py-1.5 shadow-sm">
          {c.i}
          {c.n}
        </span>
      ))}
    </div>
  ),
  tools: () => (
    <Snip className="w-44 gap-0">
      {[
        { n: "HubSpot", i: <Brand icon={siHubspot} />, d: "CRM" },
        { n: "Zendesk", i: <Brand icon={siZendesk} />, d: "Tickets" },
        { n: "take_payment", i: <Tick />, d: "Tool" },
      ].map((t) => (
        <span key={t.n} className="flex items-center gap-2 border-t border-line py-1.5 first:border-0">
          {t.i}
          <span className="flex-1">{t.n}</span>
          <span className="text-[10.5px] text-ink-muted">{t.d}</span>
        </span>
      ))}
    </Snip>
  ),
}

/* Dark and light alternate in a checkerboard across the 3 × 2 grid. */
/** One benefit line per part (the platform pages carry the detail). */
const LINE: Record<ComponentId, string> = {
  agents: "Plain-language prompts with your data built in.",
  workflow: "Follow-ups, retries and campaigns run themselves.",
  simulations: "Every change tested against real personas first.",
  qa: "Every call scored, with alerts when quality slips.",
  channels: "One agent on phone, WhatsApp, web and app.",
  tools: "Works inside your CRM, helpdesk and calendar.",
}
const DARK_IDS: ComponentId[] = ["agents", "simulations", "channels"]
const FOCUS: Record<ComponentId, string> = {
  agents: "15% 20%",
  workflow: "85% 15%",
  simulations: "20% 85%",
  qa: "80% 85%",
  channels: "50% 0%",
  tools: "100% 50%",
}

/* Fine-line drawing in the outcome-card style: a dial whose arc runs a short
   way round, from sign-up to live, with hour ticks around it. */
const STROKE = { fill: "none", stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round" as const }
const DOTTED = { ...STROKE, strokeDasharray: "1.5 4", opacity: 0.55 }

function SelfServeLine() {
  const cx = 126
  const cy = 60
  const r = 34
  /** A point on the dial, `deg` clockwise from 12 o'clock. */
  const at = (deg: number, rr = r) => {
    const a = ((deg - 90) * Math.PI) / 180
    return [Math.round((cx + rr * Math.cos(a)) * 10) / 10, Math.round((cy + rr * Math.sin(a)) * 10) / 10] as const
  }
  const [sx, sy] = at(0)
  const [ex, ey] = at(110)
  return (
    <svg viewBox="66 14 128 92" className="h-full max-h-28 w-full max-w-[12rem] text-foreground">
      {/* The dial and its hour ticks */}
      <circle cx={cx} cy={cy} r={r} {...DOTTED} />
      {Array.from({ length: 12 }, (_, i) => {
        if (i === 0) return null
        const [x1, y1] = at(i * 30, r + 4)
        const [x2, y2] = at(i * 30, r + 8)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} {...STROKE} opacity={0.35} />
      })}
      {/* Sign-up to live: a short way round */}
      <path d={`M${sx},${sy} A${r},${r} 0 0 1 ${ex},${ey}`} {...STROKE} strokeWidth={1.6} />
      <circle cx={sx} cy={sy} r={4} className="fill-surface" stroke="currentColor" strokeWidth={1.3} />
      <circle cx={ex} cy={ey} r={4} className="fill-foreground" />
      <text x={sx - 10} y={sy + 3.5} fontSize={10} textAnchor="end" className="fill-ink-muted">
        Sign up
      </text>
      <text x={ex + 10} y={ey + 4} fontSize={10} className="fill-foreground">
        Live
      </text>
      <text x={cx} y={cy + 4} fontSize={11} textAnchor="middle" className="fill-ink-muted">
        hours
      </text>
    </svg>
  )
}

function SelfServe() {
  const s = startPaths.paths[0]
  return (
    <Link href={s.cta.href} className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-line bg-background transition-colors hover:border-line-strong">
      <div aria-hidden className="relative isolate flex h-32 items-center justify-center overflow-hidden bg-surface p-4">
        <SelfServeLine />
      </div>
      <div className="flex flex-1 flex-col gap-1 border-t border-line p-4">
        <span className="flex items-center justify-between text-body font-medium">
          Start self-serve
          <ArrowRightIcon className="size-4 text-ink-muted transition-transform group-hover:translate-x-0.5" />
        </span>
        <span className="text-small text-ink-secondary">Build, test and go live yourself, today.</span>
      </div>
    </Link>
  )
}

export function StartResources() {
  return (
    <Section id="sl-summary">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <h2 className="max-w-[44rem] text-h2 font-normal">{resources.title}</h2>
          <TextLink href="/platform">See the full platform</TextLink>
        </div>
        {/* One grid: six parts on the left, resources and self-serve filling the last column's two rows */}
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {components.map((c, i) => {
            const G = GRAPHICS[c.id]
            return (
              <li key={c.id} className={cn("flex min-w-0", i < 3 ? "lg:row-start-1" : "lg:row-start-2")}>
                <Link
                  href={componentHref(c.id)}
                  className="group flex w-full min-w-0 flex-col overflow-hidden rounded-xl border border-line bg-background transition-colors hover:border-line-strong"
                >
                  <div aria-hidden className="relative isolate flex h-32 items-center justify-center overflow-hidden bg-surface p-4">
                    <Halftone focus={FOCUS[c.id]} />
                    <div
                      className={cn(
                        "origin-center scale-90 text-[11.5px] leading-snug text-foreground transition-transform duration-300 ease-(--ease-out) group-hover:-translate-y-0.5",
                        DARK_IDS.includes(c.id) && DARK
                      )}
                    >
                      <G />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-1 border-t border-line p-4">
                    <span className="flex items-center justify-between text-body font-medium">
                      {c.name}
                      <ArrowRightIcon className="size-4 text-ink-muted transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <span className="text-small text-ink-secondary">{LINE[c.id]}</span>
                  </div>
                </Link>
              </li>
            )
          })}

          {/* Resources, as before */}
          <li className="flex min-w-0 flex-col sm:col-span-2 lg:col-span-1 lg:col-start-4 lg:row-start-1 lg:pl-3">
            <p className="pb-3 font-mono text-label text-ink-muted">Resources</p>
            <ul className="flex flex-1 flex-col justify-between border-t border-line">
              {resources.links
                .filter((r) => r.label !== "Changelog")
                .map((r) => (
                  <li key={r.label} className="border-b border-line">
                    <Link href={r.href} className="group flex items-center justify-between gap-4 py-3">
                      <span className="flex flex-col">
                        <span className="text-body">{r.label}</span>
                        <span className="text-small text-ink-secondary">{r.body}</span>
                      </span>
                      <ArrowUpRightIcon className="size-4 text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
            </ul>
          </li>

          {/* Self-serve */}
          <li className="flex min-w-0 sm:col-span-2 lg:col-span-1 lg:col-start-4 lg:row-start-2">
            <SelfServe />
          </li>
        </ul>
      </Container>
    </Section>
  )
}
