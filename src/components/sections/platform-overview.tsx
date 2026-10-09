import Image from "next/image"
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
import { AgentConfigScreen } from "@/components/product/agent-config-screen"
import { AnalyticsScreen } from "@/components/product/analytics-screen"
import { CampaignScreen } from "@/components/product/campaign-screen"
import { SimulationRunScreen } from "@/components/product/simulation-run-screen"
import { ToolsScreen } from "@/components/product/tools-screen"
import { LOGOS } from "@/components/sections/tools-integrations"
import { channels, componentHref, type ComponentId } from "@/content/platform"
import { cn } from "@/lib/utils"

/**
 * Home page platform overview: the six components as one bento, each with a
 * line, a small visual and a link to its detail on /platform. Agents is the
 * one painted, large tile; the rest stay clean.
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
      {children}
      <TextLink href={componentHref(id)} className="mt-auto">
        Learn more
      </TextLink>
    </Panel>
  )
}

/** A product screen cropped to a short window (shows its top part). */
function Crop({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div aria-hidden className={cn("relative h-52 overflow-hidden rounded-md", className)}>
      {children}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-surface to-transparent" />
    </div>
  )
}

const CHANNEL_ICONS: Record<string, Icon> = { Phone: PhoneIcon, Web: GlobeIcon, App: DeviceMobileIcon, WhatsApp: WhatsappLogoIcon }

function ChannelsVisual() {
  const surfaces = ["Phone", "Web", "App", "WhatsApp"]
  const has = (mode: string, s: string) => channels.modes.find((m) => m.name === mode)?.surfaces.find((x) => x.name === s)
  return (
    <ul className="grid grid-cols-2 gap-2">
      {surfaces.map((s) => {
        const I = CHANNEL_ICONS[s]
        const voice = has("Voice", s)
        const chat = has("Chat", s)
        return (
          <li key={s} className="flex flex-col gap-2 rounded-md border border-line bg-background p-3">
            <span className="flex items-center gap-2 text-small font-medium">
              <I className="size-4" aria-hidden />
              {s}
            </span>
            <span className="flex flex-wrap gap-1 text-label">
              {voice && (
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-1.5",
                    "soon" in voice && voice.soon ? "border-dashed border-line-strong text-ink-muted" : "border-line-strong text-ink-secondary"
                  )}
                >
                  <PhoneIcon className="size-3" aria-hidden />
                  {"soon" in voice && voice.soon ? "Voice · soon" : "Voice"}
                </span>
              )}
              {chat && (
                <span className="inline-flex items-center gap-1 rounded-full border border-line-strong px-1.5 text-ink-secondary">
                  <ChatCircleIcon className="size-3" aria-hidden />
                  Chat
                </span>
              )}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

const LOGO_ROW = ["hubspot", "zendesk", "googlecalendar", "calendly", "whatsapp", "zapier", "shopify", "googlesheets"]

function ToolsVisual() {
  return (
    <div className="flex flex-col gap-3">
      <div aria-hidden className="h-40 overflow-hidden rounded-md">
        <ToolsScreen className={CHROME} />
      </div>
      <ul className="flex flex-wrap gap-2" aria-label="Integrations">
        {LOGO_ROW.map((k) => (
          <li key={k} className="grid size-9 place-items-center rounded-md border border-line bg-background" title={LOGOS[k].title}>
            <svg viewBox="0 0 24 24" className="size-4" style={{ fill: `#${LOGOS[k].hex}` }} aria-label={LOGOS[k].title}>
              <path d={LOGOS[k].path} />
            </svg>
          </li>
        ))}
        <li className="grid h-9 place-items-center rounded-md border border-dashed border-line-strong px-2 text-label text-ink-muted">
          + API, MCP
        </li>
      </ul>
    </div>
  )
}

export function PlatformOverview() {
  return (
    <Section id="platform-overview">
      <Container>
        <div className="grid gap-3 lg:grid-cols-12">
          {/* Agents: the one painted, large tile */}
          <Tile id="agents" className="lg:col-span-7 lg:row-span-2">
            <div aria-hidden className="relative isolate min-h-72 flex-1 overflow-hidden rounded-md">
              <Image
                src="/art/backdrops/home-build.png"
                alt=""
                fill
                sizes="(min-width: 1300px) 700px, (min-width: 1024px) 55vw, 100vw"
                className="-z-10 object-cover"
              />
              <AgentConfigScreen className={cn("absolute inset-x-[6%] top-[8%] bottom-[8%]", CHROME)} />
            </div>
          </Tile>
          <Tile id="workflow" className="lg:col-span-5">
            <Crop>
              <CampaignScreen className={cn("absolute inset-x-0 top-0 h-80", CHROME)} />
            </Crop>
          </Tile>
          <Tile id="simulations" className="lg:col-span-5">
            <Crop>
              <SimulationRunScreen className={cn("absolute inset-x-0 top-0 h-80", CHROME)} />
            </Crop>
          </Tile>
          <Tile id="qa" className="lg:col-span-4">
            <Crop>
              <AnalyticsScreen className={cn("absolute inset-x-0 top-0 h-80", CHROME)} />
            </Crop>
          </Tile>
          <Tile id="channels" className="lg:col-span-4">
            <ChannelsVisual />
          </Tile>
          <Tile id="tools" className="lg:col-span-4">
            <ToolsVisual />
          </Tile>
        </div>
        <TextLink href="/platform" className="mt-8">
          See the full platform
        </TextLink>
      </Container>
    </Section>
  )
}
