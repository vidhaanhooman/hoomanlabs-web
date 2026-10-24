"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import {
  CaretDownIcon,
  ChatsIcon,
  ChatTextIcon,
  ClipboardTextIcon,
  DatabaseIcon,
  LightningIcon,
  ListIcon,
  PlayCircleIcon,
  ShareNetworkIcon,
  SlidersHorizontalIcon,
  WrenchIcon,
  type Icon,
} from "@phosphor-icons/react"

import { Container } from "@/components/layout/container"
import { TextLink } from "@/components/layout/text-link"
import { WorkflowCanvas } from "@/components/product/flow-canvas"
import { DashboardScreen } from "@/components/product/quality-screens"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import type { SectionId } from "@/content/sections"
import { SCREEN_BLEED, STAGE } from "@/lib/recipes"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * Product panels (/lab/v3): Agents and Workflow, two separate products. Each
 * is a large product screen on a grey stage, cropped by the panel edge,
 * beside three short rows (the outcome, how it gets there, and the
 * customer's playbook). Static; hovering a row lights up the part of the
 * screen it describes and dims the rest. Each links to its annotated
 * version on /platform.
 */

const op = "text-(--var)"
const vr = "text-(--data)"
const Var = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-[4px] bg-(--var)/18 px-1 font-mono text-[10.5px] text-(--var-fg)">{`{{${children}}}`}</span>
)

function WindowBar({ title, aside }: { title: string; aside?: React.ReactNode }) {
  return (
    <div className="flex h-9 shrink-0 items-center gap-2 border-b border-(--ui-line) px-3 text-[11px] text-(--ui-muted)">
      <span className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-2 rounded-full bg-white/10" />
        ))}
      </span>
      <span className="ml-1 text-(--ui-text)">{title}</span>
      {aside && <span className="ml-auto">{aside}</span>}
    </div>
  )
}

/* 1 · the agent builder, as it looks in the product (static, sample content) */
const NAV: { group: string; icon: Icon; items: string[] }[] = [
  { group: "Behavior", icon: ChatTextIcon, items: ["Global instructions", "Introduction", "Language", "Speech", "Pronunciation"] },
  { group: "Tools", icon: WrenchIcon, items: ["Library", "Call end", "Call transfer", "Custom tools"] },
  { group: "Context", icon: DatabaseIcon, items: ["Pre-call data", "Conversation history"] },
  { group: "Post call analysis", icon: ClipboardTextIcon, items: ["Call summary", "Call outcome", "Extract information"] },
  { group: "Events & webhook", icon: LightningIcon, items: ["Call actions"] },
  { group: "Advanced", icon: SlidersHorizontalIcon, items: ["Voicemail detection", "Turn settings", "Noise reduction"] },
]
/** Which row each sidebar group belongs to. */
const NAV_FOCUS: Record<string, string> = { Tools: "tools", Context: "context", Behavior: "playbook" }
const RAIL: [string, Icon][] = [
  ["Agent", ListIcon],
  ["Flow", ShareNetworkIcon],
  ["Simulate", PlayCircleIcon],
  ["Logs", ChatsIcon],
]

function Toggle() {
  return (
    <span className="relative h-4 w-7 shrink-0 rounded-full bg-(--ui-text)">
      <span className="absolute top-0.5 right-0.5 size-3 rounded-full bg-(--ui-bg)" />
    </span>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10.5px] font-medium">{label}</span>
      <div className="flex items-center justify-between rounded-md bg-(--ui-raised) px-2 py-1 text-[10.5px] text-(--ui-text)/85">{children}</div>
    </div>
  )
}

/** Dims every region except the one the hovered row describes. */
const dimUnless = (focus: string, region: string) =>
  cn("transition-opacity duration-300 ease-out", focus !== "all" && focus !== region && "opacity-25")

export function AgentBuilderScreen({ className, focus }: { className: string; focus: string }) {
  return (
    <div aria-hidden className={cn("ui-dark @container flex overflow-hidden text-[11px] leading-[1.55]", className)}>
      {/* Icon rail */}
      <div className={cn("flex w-12 shrink-0 flex-col items-center gap-3 border-r border-(--ui-line) py-3", dimUnless(focus, "none"))}>
        {RAIL.map(([label, Ico], i) => (
          <span key={label} className={cn("flex flex-col items-center gap-0.5 text-[9px]", i === 0 ? "text-(--ui-text)" : "text-(--ui-muted)")}>
            <Ico className="size-3.5" />
            {label}
          </span>
        ))}
      </div>

      {/* Section sidebar */}
      <div
        className="hidden w-32 shrink-0 flex-col gap-2 overflow-hidden border-r border-(--ui-line) px-2 py-3 @md:flex"
        style={{ maskImage: "linear-gradient(to bottom, black 85%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent)" }}
      >
        {NAV.map(({ group, icon: Ico, items }) => (
          <div key={group} className={cn("flex flex-col gap-0.5", dimUnless(focus, NAV_FOCUS[group] ?? "none"))}>
            <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-wide text-(--ui-muted) uppercase">
              <Ico className="size-3" />
              {group}
            </span>
            {items.map((it) => (
              <span
                key={it}
                className={cn(
                  "ml-2 truncate rounded px-1.5 py-0.5 text-[10.5px]",
                  it === "Global instructions" ? "bg-(--ui-raised) text-(--ui-text)" : "text-(--ui-text)/70"
                )}
              >
                {it}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Settings */}
      <div
        className="flex min-w-0 flex-1 flex-col gap-3 overflow-hidden p-3.5"
        style={{ maskImage: "linear-gradient(to bottom, black 88%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, black 88%, transparent)" }}
      >
        <span className={cn("font-mono text-[9px] tracking-wide text-(--ui-muted) uppercase", dimUnless(focus, "playbook"))}>Behavior</span>
        <div className="flex flex-col gap-2 rounded-lg border border-(--ui-line) bg-(--ui-panel) p-3">
          <div className={cn("flex flex-col", dimUnless(focus, "playbook"))}>
            <span className="font-medium">Global instructions</span>
            <span className="text-[10px] text-(--ui-muted)">The model that powers your agent, and the instructions for the whole conversation.</span>
          </div>
          <div className={dimUnless(focus, "playbook")}>
          <Field label="Model">
            gpt-4.1
            <CaretDownIcon className="size-3 text-(--ui-muted)" />
          </Field>
          </div>
          <div className="flex flex-col gap-1">
            <span className={cn("text-[10.5px] font-medium", dimUnless(focus, "playbook"))}>Global prompt</span>
            <div className="rounded-md bg-(--ui-bg)">
              <div className={cn("flex items-center gap-2 border-b border-(--ui-line) px-2 py-1 text-[9.5px] text-(--ui-muted)", dimUnless(focus, "playbook"))}>
                <span className="rounded bg-(--ui-raised) px-1.5 py-px text-(--ui-text)">Preview</span>
                <span>Text</span>
                <span className="ml-auto hidden @2xl:inline">Type to insert · tools · variables and conditional expressions</span>
              </div>
              <div className="flex flex-col gap-1 px-2.5 py-2">
                <span className={cn("font-medium", dimUnless(focus, "context"))}>Role</span>
                <span className={cn("text-(--ui-text)/80", dimUnless(focus, "context"))}>
                  You are Ria, a billing assistant for Halden Energy. The caller is <Var>context.name</Var>, balance <Var>context.balance</Var>.
                </span>
                <span className={cn("pt-0.5 font-medium", dimUnless(focus, "playbook"))}>Instructions</span>
                <span className={cn("text-(--ui-text)/80", dimUnless(focus, "playbook"))}>Keep replies short, one question per turn, and confirm amounts before taking a payment.</span>
                <span className={cn("mt-0.5 w-fit rounded bg-(--var)/10 px-1.5 py-0.5 font-mono text-[10px] ring-1 ring-(--var)/25", dimUnless(focus, "playbook"))}>
                  <span className={op}>{"{{ "}</span>
                  <span className={vr}>context.balance</span>
                  <span className={op}>{" > 0 ? "}</span>
                  <span className="text-(--tool)">[take_payment]</span>
                  <span className={op}>{" }}"}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <span className={cn("font-mono text-[9px] tracking-wide text-(--ui-muted) uppercase", dimUnless(focus, "tools"))}>Tools</span>
        <div className={cn("flex flex-col gap-2 rounded-lg border border-(--ui-line) bg-(--ui-panel) p-3", dimUnless(focus, "tools"))}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col">
              <span className="font-medium">Library</span>
              <span className="text-[10px] text-(--ui-muted)">Let the agent search your library when needed.</span>
            </div>
            <Toggle />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Select library">
              refund_policy
              <CaretDownIcon className="size-3 text-(--ui-muted)" />
            </Field>
            <Field label="Tool name">fetch_policy</Field>
          </div>
        </div>
      </div>
    </div>
  )
}

/* 2 · the workflow, frozen on a finished run. The window bleeds off the
   panel's right edge, so the grid fills the window and the graph sits in
   its visible left part. */
function WorkflowScreen({ className, focus }: { className: string; focus: string }) {
  /* Three bands, left to right, in the rows' order: what starts the run,
     the rule steps it runs, and the follow-up it finishes. */
  const nodes: Record<string, string[]> = {
    triggers: ["in", "auth"],
    branches: ["det", "cb", "end", "rec", "sum"],
    actions: ["push", "cbp", "summ", "out"],
  }
  return (
    <div aria-hidden className={cn("ui-dark flex flex-col overflow-hidden bg-[oklch(0.13_0_0)]", className)}>
      <WindowBar title="Workflow · call.ended" aside={<span className="text-(--ui-live)">Done in 1.4s</span>} />
      <div className="relative min-h-0 flex-1">
        <WorkflowCanvas still focus={nodes[focus]} className="absolute inset-0 flex items-center pr-[21%] pl-4 [&>div]:hidden" />
      </div>
    </div>
  )
}

type Row = { id: string; title: string; body: string }

/** How long each row stays selected while the panel cycles on its own. */
const CYCLE_MS = 5000

/**
 * One product: copy with rows, and its screen. The rows are buttons: hover,
 * tap, click or keyboard focus shows that row on the screen. While the panel
 * is on screen it also steps through the rows by itself, with a thin line
 * filling under the active one; it pauses while the pointer or focus is in
 * the rows, and stops for good once someone taps or clicks a row. The last
 * row shown stays selected. Reduced motion: no cycling, until a row is chosen
 * the screen shows everything.
 */
export function ProductPanel({
  id,
  label,
  title,
  rows,
  link,
  linkHref,
  media = "end",
  screen,
}: {
  id: SectionId
  label: string
  title: string
  rows: Row[]
  link?: string
  linkHref?: string
  media?: "start" | "end"
  screen: (className: string, focus: string) => React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.5 })
  const reduce = usePrefersReducedMotion()
  const [focus, setFocus] = useState("all")
  const [paused, setPaused] = useState(false)
  const [chosen, setChosen] = useState(false)
  const cycling = inView && !reduce && !chosen && rows.length > 1
  const dense = rows.length > 3

  // The first row is shown once the panel cycles; after that, the last row picked.
  const shown = focus === "all" && cycling ? rows[0].id : focus

  // Step to the next row, unless paused.
  useEffect(() => {
    if (!cycling || paused) return
    const t = setTimeout(() => {
      const i = rows.findIndex((r) => r.id === shown)
      setFocus(rows[(i + 1) % rows.length].id)
    }, CYCLE_MS)
    return () => clearTimeout(t)
  }, [cycling, paused, shown, rows])

  return (
    <Section id={id} spacing="tight">
      <Container>
        <Panel ref={ref} className="grid gap-8 p-4 sm:p-6 lg:grid-cols-3 lg:items-stretch lg:gap-0 lg:p-3">
          <div className={cn("flex flex-col gap-5 px-2 pt-4 sm:px-4 lg:self-center lg:px-10 lg:py-10", media === "start" && "lg:order-2")}>
            <div className="flex flex-col gap-2">
              <span className="font-mono text-label text-ink-muted">{label}</span>
              <h2 className="text-h3 font-normal">{title}</h2>
            </div>
            <ul
              className="flex flex-col border-t border-line"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false)
              }}
            >
              {rows.map((r) => {
                const on = shown === r.id
                return (
                  <li key={r.id} className="relative border-b border-line">
                    <button
                      type="button"
                      aria-pressed={on}
                      onMouseEnter={() => setFocus(r.id)}
                      onFocus={() => setFocus(r.id)}
                      onClick={() => {
                        setFocus(r.id)
                        setChosen(true)
                      }}
                      className={cn(
                        dense ? "py-3" : "py-4",
                        "flex w-full cursor-pointer flex-col gap-1 text-left transition-opacity duration-300 ease-out outline-none focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                        shown !== "all" && !on && "opacity-50"
                      )}
                    >
                      <span className="text-body">{r.title}</span>
                      <span className="text-small text-ink-secondary">{r.body}</span>
                    </button>
                    {/* The active row's line: fills while cycling, full when held */}
                    {on && (
                      <span aria-hidden className="absolute inset-x-0 -bottom-px h-px overflow-hidden">
                        <span
                          key={`${r.id}-${cycling && !paused}`}
                          className="block h-full origin-left bg-foreground"
                          style={cycling && !paused ? { animation: `progress ${CYCLE_MS}ms linear both` } : undefined}
                        />
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
            {link && linkHref && <TextLink href={linkHref}>{link}</TextLink>}
          </div>
          {/* Grey stage with a hairline: the screen runs past the panel edge, as if the app is open. */}
          <div className={cn(STAGE, "aspect-[4/3] lg:col-span-2 lg:aspect-auto", media === "start" && "lg:order-1")}>
            {/* Keeps the stage at least 16:11 on desktop; it grows taller when the copy beside it is taller */}
            <div aria-hidden className="hidden aspect-[16/11] w-full lg:block" />
            {screen(SCREEN_BLEED, shown)}
          </div>
        </Panel>
      </Container>
    </Section>
  )
}

export function HowItWorksV3() {
  return (
    <>
      <ProductPanel
        id="v3-agent"
        label="Agents"
        title="Agents that handle the conversation."
        rows={[
          { id: "playbook", title: "Runs your playbook", body: "You write your process once in plain language. Each rule becomes a condition the agent follows on every call." },
          { id: "context", title: "Knows before hello", body: "Before the call it pulls the customer's details from your systems, then replies in real time using your prompt." },
          { id: "tools", title: "Resolves the call", body: "Handles customer calls end to end: answers questions, takes payments, books appointments and raises tickets." },
        ]}
        link="Explore Agents"
        linkHref="/platform/agents"
        screen={(c, f) => <AgentBuilderScreen className={c} focus={f} />}
      />
      <ProductPanel
        id="v3-workflow"
        label="Workflow"
        title="Workflows that handle everything around it."
        rows={[
          { id: "triggers", title: "Starts on its own", body: "An event like a call ending starts a run, then each step runs on its own and writes back in seconds." },
          { id: "branches", title: "Runs your playbook", body: "You map your process once as steps. Each rule becomes a branch the workflow follows on every run." },
          { id: "actions", title: "Finishes the follow-up", body: "Handles the work around calls end to end: updates your CRM, books callbacks and sends summaries." },
        ]}
        link="Explore Workflow"
        linkHref="/platform#platform-workflow-anatomy"
        media="start"
        screen={(c, f) => <WorkflowScreen className={c} focus={f} />}
      />
      <ProductPanel
        id="v3-analytics"
        label="Analytics"
        title="Analytics that show what's working."
        rows={[
          { id: "funnel", title: "Sees every stage", body: "Every call lands in one funnel, from dialled to connected to success, with the drop between each stage." },
          { id: "trend", title: "Tracks it over time", body: "Each stage is charted day by day, so a dip shows up the morning it starts." },
          { id: "custom", title: "Measures what you care about", body: "Build your own dashboards from widgets, from QA pass rates to promises to pay." },
        ]}
        link="Explore Analytics"
        linkHref="/platform/observability"
        screen={(c, f) => <DashboardScreen className={c} focus={f} />}
      />
    </>
  )
}
