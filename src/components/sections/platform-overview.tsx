import {
  ChatCircleIcon,
  DeviceMobileIcon,
  GlobeIcon,
  PhoneIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr"
import type { Icon } from "@phosphor-icons/react"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { AgentBuilder, WorkflowCanvas } from "@/components/product/flow-canvas"
import { Pill } from "@/components/product/ui-bits"
import { LOGOS } from "@/components/sections/tools-integrations"
import { channels, componentHref, type ComponentId } from "@/content/platform"
import { cn } from "@/lib/utils"

/**
 * Home page platform overview: the six components as one bento, each with a
 * line, a small visual and a link to its detail on /platform. Agents is the
 * large tile; all share the same plain surface.
 */

const COPY: Record<ComponentId, { title: string; body: string }> = {
  agents: { title: "Agents", body: "Prompt or flow, context, voices and actions, with full control." },
  workflow: { title: "Workflow", body: "Campaigns, triggers and follow-ups around every conversation." },
  simulations: { title: "Simulations", body: "Test every version against simulated customers." },
  qa: { title: "QA", body: "Every conversation scored, with alerts and A/B tests." },
  channels: { title: "Channels", body: "One agent on phone, web, app and WhatsApp, by voice or chat." },
  tools: { title: "Tools & integrations", body: "Act mid-call and connect the systems you already run." },
}

const CHROME = "rounded-md border border-black/10 shadow-[0_20px_50px_-24px_oklch(0.25_0_0/0.45)]"

/** Painted texture per tile; sage and dusk alternate so neighbours differ. */
const SAGE = { src: "/art/backdrops/home-deploy.png" }
const DUSK = { src: "/art/backdrops/home-measure.png" }
const OCHRE = { src: "/art/backdrops/home-deploy.png", filter: "hue-rotate(-40deg) saturate(1.1) brightness(1.05)" }
const TEXTURE: Record<ComponentId, { src: string; filter?: string }> = {
  agents: SAGE,
  workflow: DUSK,
  simulations: OCHRE,
  qa: DUSK,
  channels: OCHRE,
  tools: SAGE,
}

function Tile({
  id,
  className,
  children,
}: {
  id: ComponentId
  className?: string
  children: React.ReactNode
}) {
  return (
    <Panel className={cn("flex flex-col gap-5 overflow-hidden p-5 sm:p-6", className)}>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-h4 font-normal">{COPY[id].title}</h3>
        <p className="max-w-[40ch] text-small text-ink-secondary">{COPY[id].body}</p>
      </div>
      {/* The visual sits on a painted colour field (same textures as Listen). */}
      <div className="relative isolate flex flex-1 items-center overflow-hidden rounded-md p-4 sm:p-5">
        <span
          aria-hidden
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${TEXTURE[id].src})`, filter: TEXTURE[id].filter }}
        />
        <div className="w-full">{children}</div>
      </div>
      <TextLink href={componentHref(id)} className="mt-auto pt-1">
        Learn more
      </TextLink>
    </Panel>
  )
}

/* ------------------------------------------------------------ mini cards
   Small, purpose-made dark cards: fully visible, same height in every tile. */

function Mini({ title, aside, children }: { title: string; aside?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div aria-hidden className={cn("ui-dark flex h-48 flex-col overflow-hidden text-[12px] leading-snug", CHROME)}>
      <div className="flex h-10 shrink-0 items-center gap-2 border-b border-(--ui-line) px-3.5">
        <span className="font-medium text-(--ui-text)">{title}</span>
        <span className="ml-auto">{aside}</span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-0 px-3.5">{children}</div>
    </div>
  )
}

function MiniRow({ k, v, last }: { k: string; v: React.ReactNode; last?: boolean }) {
  return (
    <div className={cn("flex items-center justify-between gap-3 py-2", !last && "border-b border-(--ui-line)")}>
      <span className="truncate text-(--ui-text)">{k}</span>
      {v}
    </div>
  )
}


function SimulationsMini() {
  return (
    <Mini title="Simulation run" aside={<span className="font-mono text-[11px] text-(--ui-muted)">v5</span>}>
      <MiniRow k="Frustrated caller" v={<Pill tone="live">Passed</Pill>} />
      <MiniRow k="Code-switching" v={<Pill tone="live">Passed</Pill>} />
      <MiniRow k="Asks for a human" v={<Pill tone="warn">Review</Pill>} last />
    </Mini>
  )
}

const OUTCOMES = [
  { label: "Resolved", pct: 71, color: "bg-(--ui-live)" },
  { label: "Callback", pct: 14, color: "bg-[oklch(0.8_0.14_80)]" },
  { label: "Transferred", pct: 9, color: "bg-(--ui-muted)" },
  { label: "Unresolved", pct: 6, color: "bg-[oklch(0.68_0.19_25)]" },
]

function QaMini() {
  return (
    <Mini title="Conversations" aside={<span className="text-[11px] text-(--ui-muted)">Last 7 days</span>}>
      <div className="flex items-baseline gap-2">
        <span className="text-[28px] leading-none font-normal text-(--ui-text) tabular-nums">4.6</span>
        <span className="text-(--ui-muted)">/ 5 average QA score</span>
      </div>
      <div className="mt-3 flex h-1.5 overflow-hidden rounded-full">
        {OUTCOMES.map((o) => (
          <span key={o.label} className={o.color} style={{ width: `${o.pct}%` }} />
        ))}
      </div>
      <div className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-(--ui-muted)">
        {OUTCOMES.map((o) => (
          <span key={o.label} className="flex items-center gap-1.5">
            <span className={cn("size-1.5 rounded-full", o.color)} />
            {o.label}
            <span className="ml-auto font-mono tabular-nums">{o.pct}%</span>
          </span>
        ))}
      </div>
    </Mini>
  )
}

const CHANNEL_ICONS: Record<string, Icon> = { Phone: PhoneIcon, Web: GlobeIcon, App: DeviceMobileIcon, WhatsApp: WhatsappLogoIcon }

function ChannelsMini() {
  const surfaces = ["Phone", "Web", "App", "WhatsApp"]
  const find = (mode: string, s: string) => channels.modes.find((m) => m.name === mode)?.surfaces.find((x) => x.name === s)
  const Mark = ({ on, soon, children }: { on: boolean; soon?: boolean; children: React.ReactNode }) => (
    <span
      className={cn(
        "grid size-6 place-items-center rounded-md border",
        !on && "border-transparent text-(--ui-line)",
        on && !soon && "border-(--ui-line) bg-(--ui-raised) text-(--ui-text)",
        on && soon && "border-dashed border-(--ui-muted)/50 text-(--ui-muted)"
      )}
    >
      {children}
    </span>
  )
  return (
    <Mini
      title="Channels"
      aside={
        <span className="flex gap-3 text-[11px] text-(--ui-muted)">
          <span>Voice</span>
          <span>Chat</span>
        </span>
      }
    >
      {surfaces.map((s, i) => {
        const I = CHANNEL_ICONS[s]
        const voice = find("Voice", s)
        const chat = find("Chat", s)
        const soon = !!voice && "soon" in voice && !!voice.soon
        return (
          <div key={s} className={cn("flex items-center gap-2.5 py-1.5", i < 3 && "border-b border-(--ui-line)")}>
            <I className="size-3.5 text-(--ui-muted)" />
            <span className="text-(--ui-text)">{s}</span>
            {soon && <span className="text-[10px] text-(--ui-muted)">voice soon</span>}
            <span className="ml-auto flex gap-2">
              <Mark on={!!voice} soon={soon}>
                <PhoneIcon className="size-3" />
              </Mark>
              <Mark on={!!chat}>
                <ChatCircleIcon className="size-3" />
              </Mark>
            </span>
          </div>
        )
      })}
    </Mini>
  )
}

const LOGO_ROW = ["hubspot", "zendesk", "googlecalendar", "whatsapp", "zapier", "shopify"]

function ToolsMini() {
  return (
    <Mini title="Tools" aside={<span className="text-[11px] text-(--ui-muted)">Mid-call</span>}>
      <MiniRow k="Look up account" v={<Pill tone="live">CRM</Pill>} />
      <MiniRow k="Take payment" v={<Pill tone="live">Payments</Pill>} />
      <div className="flex items-center gap-1.5 pt-2.5">
        {LOGO_ROW.map((k) => (
          <span key={k} className="grid size-7 place-items-center rounded-md bg-white" title={LOGOS[k].title}>
            <svg viewBox="0 0 24 24" className="size-3.5" style={{ fill: `#${LOGOS[k].hex}` }}>
              <path d={LOGOS[k].path} />
            </svg>
          </span>
        ))}
        <span className="ml-auto text-[11px] text-(--ui-muted)">+ API, MCP</span>
      </div>
    </Mini>
  )
}

export function PlatformOverview() {
  return (
    <Section id="platform-overview">
      <Container>
        <div className="grid gap-3 lg:grid-cols-12">
          {/* Agents: the large tile, same plain treatment as the rest */}
          <Tile id="agents" className="lg:col-span-12">
            <AgentBuilder className={cn("md:h-[26rem]", CHROME)} />
          </Tile>
          <Tile id="workflow" className="lg:col-span-7">
            <WorkflowCanvas className={CHROME} />
          </Tile>
          <Tile id="simulations" className="lg:col-span-5">
            <SimulationsMini />
          </Tile>
          <Tile id="qa" className="lg:col-span-4">
            <QaMini />
          </Tile>
          <Tile id="channels" className="lg:col-span-4">
            <ChannelsMini />
          </Tile>
          <Tile id="tools" className="lg:col-span-4">
            <ToolsMini />
          </Tile>
        </div>
        <TextLink href="/platform" className="mt-8">
          See the full platform
        </TextLink>
      </Container>
    </Section>
  )
}
