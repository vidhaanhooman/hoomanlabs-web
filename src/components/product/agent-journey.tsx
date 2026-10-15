"use client"

import {
  BookOpenTextIcon,
  CheckCircleIcon,
  CircleNotchIcon,
  NotePencilIcon,
  LightningIcon,
  SpeakerHighIcon,
  TrayArrowDownIcon,
  TrayArrowUpIcon,
  type Icon,
} from "@phosphor-icons/react"

import { PromptEditor } from "@/components/product/prompt-editor"
import { cn } from "@/lib/utils"

/**
 * Everything an agent needs, at once (/lab/v3). One timeline
 * (Before / During / After) over three aligned columns: pre-call, the prompt
 * with the three things it draws on beneath it (knowledge, tools, voice), and
 * post-call. Each card says what it is, above its product snippet. Static:
 * everything is shown in its finished state.
 * Sample content (fictional Halden Energy billing agent).
 */

/* ------------------------------------------------------------ helpers */

/** Static section: every card shows its finished state. */
function useReveal(...args: [start: boolean, total: number, ms: number, delay?: number]) {
  return args[1]
}

const fadeIn = "motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500"

function Pending({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2">
      <CircleNotchIcon className="size-3.5 text-(--ui-muted) motion-safe:animate-spin" aria-hidden />
      <span className="shimmer-text">{children}</span>
    </span>
  )
}

/** A neutral code pill (variables, tool names) for the cards around the editor. */
const Code = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-[4px] bg-white/[0.06] px-1 py-px font-mono text-[11.5px] text-(--ui-text)/85">{children}</span>
)

/**
 * One card frame for everything: a light card with a title and a line of
 * explanation, holding the dark product snippet. The snippet gets a green
 * edge while it's playing (or just referenced by the prompt).
 */
function Card({
  title,
  body,
  phase,
  icon: Ico,
  active,
  pulse = false,
  className,
  children,
}: {
  title: string
  body: string
  phase: "Before the call" | "During the call" | "After the call"
  icon: Icon
  active: boolean
  /** Briefly lit because the prompt just referenced it. */
  pulse?: boolean
  className?: string
  children: React.ReactNode
}) {
  const on = active || pulse
  return (
    <div className={cn("flex flex-col gap-4 rounded-xl border border-line bg-surface p-4", className)}>
      <div className="flex flex-col gap-1 px-1">
        <span className="flex items-center gap-2 text-body font-medium">
          <Ico className={cn("size-4 transition-colors duration-500", on ? "text-[oklch(0.55_0.13_150)]" : "text-ink-muted")} aria-hidden />
          {title}
          <span className="ml-auto font-mono text-[10.5px] font-normal tracking-wide text-ink-muted uppercase">{phase}</span>
        </span>
        <p className="text-small text-ink-secondary">{body}</p>
      </div>
      <div
        className={cn(
          "ui-dark flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border text-[13px] leading-[1.55] transition-[border-color] duration-500",
          on ? "border-(--ui-live)/50" : "border-transparent"
        )}
      >
        {children}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------ top row */

const MAPPING = [
  ["context.name", "Maya"],
  ["context.account", "HE-48213"],
  ["context.balance", "$86.40"],
  ["context.lastCall", "12 Feb"],
] as const

function PreCall({ go, active, lit }: { go: boolean; active: boolean; lit: string | null }) {
  const n = useReveal(go, MAPPING.length + 1, 450, 250)
  return (
    <Card title="Pre-call context" body="Before the first ring, the caller is looked up, so the agent never asks what you already know." phase="Before the call" icon={TrayArrowDownIcon} active={active} className="h-full">
      <div className="flex flex-1 flex-col gap-3 p-4">
        <dl className="flex flex-col">
          {MAPPING.map(([k, v], i) => (
            <div
              key={k}
              className={cn(
                "-mx-2 flex items-center justify-between gap-3 rounded-md border-b border-(--ui-line) px-2 py-2 transition-colors duration-500 last:border-0",
                lit === k && "bg-(--ui-live)/12"
              )}
            >
              <dt>
                <Code>{k}</Code>
              </dt>
              <dd className="truncate text-right">{i < n ? <span className={fadeIn}>{v}</span> : i === n && go ? <Pending>Fetching</Pending> : <span className="text-(--ui-muted)">…</span>}</dd>
            </div>
          ))}
        </dl>
        <span className={cn("flex items-center gap-1.5 text-[12px] text-(--ui-muted) transition-opacity duration-500", n > MAPPING.length ? "opacity-100" : "opacity-0")}>
          <CheckCircleIcon weight="fill" className="size-3.5 text-(--ui-live)" aria-hidden />
          Ready in 140 ms · HubSpot, billing, call history
        </span>
      </div>
    </Card>
  )
}

const ACTIONS = [
  ["CRM updated", "HubSpot"],
  ["Ticket created", "#TCK-2291"],
  ["Webhook sent", "200"],
  ["QA score", "4.6 / 5"],
] as const
const FIELDS = [
  ["intent", "Duplicate charge"],
  ["sentiment", "Calm"],
  ["outcome", "Ticket raised"],
] as const

function PostCall({ go, active }: { go: boolean; active: boolean }) {
  const f = useReveal(go, FIELDS.length, 400, 250)
  const a = useReveal(f >= FIELDS.length, ACTIONS.length, 400, 300)
  return (
    <Card title="Post-call" body="After goodbye: fields extracted, systems updated, the call scored." phase="After the call" icon={TrayArrowUpIcon} active={active} className="h-full">
      <div className="flex flex-1 flex-col gap-3 p-4">
        <dl className="flex flex-col">
          {FIELDS.map(([k, v], i) => (
            <div key={k} className="flex items-center justify-between gap-3 border-b border-(--ui-line) py-1.5 last:border-0">
              <dt>
                <Code>{k}</Code>
              </dt>
              <dd className="truncate">{i < f ? <span className={fadeIn}>{v}</span> : <span className="text-(--ui-muted)">…</span>}</dd>
            </div>
          ))}
        </dl>
        <ul className="flex flex-col border-t border-(--ui-line) pt-2">
          {ACTIONS.map(([t, d], i) => (
            <li key={t} className="flex items-center gap-2.5 py-1">
              {i < a ? (
                <CheckCircleIcon weight="fill" className="size-4 shrink-0 text-(--ui-live) motion-safe:animate-in motion-safe:zoom-in-50" aria-hidden />
              ) : (
                <span className="size-4 shrink-0 rounded-full border border-(--ui-line)" />
              )}
              <span className={cn("flex-1", i >= a && "text-(--ui-muted)")}>{t}</span>
              <span className="font-mono text-[11.5px] text-(--ui-muted)">{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}

/* ------------------------------------------------------------ bottom tiles */

/** A small tile under the prompt: one line that resolves from working to done. */
function Tile({
  title,
  body,
  icon,
  go,
  active,
  pulse,
  pending,
  result,
  detail,
}: {
  title: string
  body: string
  icon: Icon
  go: boolean
  active: boolean
  pulse?: boolean
  pending: string
  result: React.ReactNode
  detail: string
}) {
  const n = useReveal(go, 1, 0, 1100)
  return (
    <Card title={title} body={body} phase="During the call" icon={icon} active={active} pulse={pulse} className="h-full">
      <div className="flex flex-col gap-1 px-4 py-3">
        <span className="min-h-[1.55em] truncate">
          {n ? <span className={cn("flex min-w-0 items-center gap-2", fadeIn)}>{result}</span> : go ? <Pending>{pending}</Pending> : <span className="text-(--ui-muted)">…</span>}
        </span>
        <span className="truncate text-[12px] text-(--ui-muted)">{detail}</span>
      </div>
    </Card>
  )
}

/* ------------------------------------------------------------ section */

export function AgentJourney() {
  // Static: every card is shown finished, none highlighted.
  const lit = null

  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-12">
        {/* The prompt, with the most room */}
        <div className="flex h-[36rem] min-h-0 flex-col gap-4 rounded-xl border border-line bg-surface p-4 lg:col-span-8 lg:row-span-2 lg:h-auto">
          <div className="flex flex-col gap-1 px-1">
            <span className="flex items-center gap-2 text-body font-medium">
              <NotePencilIcon className={cn("size-4 transition-colors duration-500", false ? "text-[oklch(0.55_0.13_150)]" : "text-ink-muted")} aria-hidden />
              Prompt
              <span className="ml-auto font-mono text-[10.5px] font-normal tracking-wide text-ink-muted uppercase">During the call</span>
            </span>
            <p className="text-small text-ink-secondary">
              The job in plain language. Variables bring in context, tools are called by name, and conditions branch right inside it.
            </p>
          </div>
          <div
            className={cn(
              "min-h-0 flex-1 overflow-hidden rounded-lg border transition-[border-color] duration-500",
              false ? "border-(--ui-live)/50" : "border-transparent"
            )}
          >
            <PromptEditor className="h-full" still />
          </div>
        </div>

        <div className="lg:col-span-4">
          <PreCall go={true} active={false} lit={lit} />
        </div>
        <div className="lg:col-span-4">
          <PostCall go={true} active={false} />
        </div>

        {/* What the prompt draws on */}
        <div className="grid gap-4 sm:grid-cols-3 lg:col-span-12">
              <Tile
                title="Knowledge base"
                body="Answers from your documents, cited."
                icon={BookOpenTextIcon}
                go={true}
                active={false}
                pending="Searching"
                result={
                  <>
                    <BookOpenTextIcon className="size-4 shrink-0 text-(--ui-live)" aria-hidden />
                    <span className="truncate">“3 to 5 days”</span>
                  </>
                }
                detail="Refund policy §3, cited"
              />
              <Tile
                title="Tools"
                body="Actions on your systems, mid-call."
                icon={LightningIcon}
                go={true}
                active={false}
                                pending="Running"
                result={
                  <>
                    <CheckCircleIcon weight="fill" className="size-4 shrink-0 text-(--ui-live)" aria-hidden />
                    <Code>take_payment</Code>
                  </>
                }
                detail="200 OK · 310 ms"
              />
              <Tile
                title="Voice"
                body="30 languages, natural turn-taking."
                icon={SpeakerHighIcon}
                go={true}
                active={false}
                pending="Loading"
                result={
                  <>
                    <span className="ui-wave flex h-4 shrink-0 items-end gap-[2px]" aria-hidden>
                      {[6, 12, 8, 14, 7].map((h, k) => (
                        <span key={k} className="w-[2px] rounded-full bg-(--ui-live)" style={{ height: h }} />
                      ))}
                    </span>
                    <span className="truncate">Ria · en-GB</span>
                  </>
                }
                detail="30 languages"
              />
        </div>
      </div>
    </div>
  )
}
