"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { CheckIcon, GitBranchIcon, TerminalWindowIcon, BrowserIcon } from "@phosphor-icons/react"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { Pill } from "@/components/product/ui-bits"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * Agents: how easy they are to manage, two ways side by side. In the
 * platform (versions, review, publish, roll back) or from your editor or AI
 * assistant through the HoomanLabs MCP server (one prompt changes, tests and
 * ships an agent). The MCP session types itself out while visible.
 * Fictional demo data.
 */

const CHROME = "rounded-md border border-black/10 shadow-[0_20px_50px_-24px_oklch(0.25_0_0/0.45)]"

const POINTS = [
  { title: "Versions for every change", body: "Draft, compare and publish. Roll back in one click." },
  { title: "Test before you ship", body: "Every version runs your simulations before it goes live." },
  { title: "Your team, your rules", body: "Roles, approvals and an audit log of who changed what." },
]

export function ManageAgents() {
  return (
    <Section id="product-manage">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <h2 className="text-h2 font-normal">Manage agents from the platform or your editor.</h2>
          <p className="text-body text-ink-secondary">
            Change a prompt, add a tool or ship a new version in the console, or ask your AI assistant to do it
            through the HoomanLabs MCP server. Same agents, same safety checks.
          </p>
        </div>

        <div className="mt-10 grid gap-3 lg:grid-cols-2">
          <Panel className="flex flex-col gap-5 p-5 sm:p-6">
            <Heading icon={<BrowserIcon className="size-4" />} title="In the platform" body="Review, test and publish with your team." />
            <ConsoleVersions />
          </Panel>
          <Panel className="flex flex-col gap-5 p-5 sm:p-6">
            <Heading
              icon={<TerminalWindowIcon className="size-4" />}
              title="Through MCP"
              body="From Cursor, Claude or any MCP client, in plain language."
              beta
            />
            <McpSession />
          </Panel>
        </div>

        <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-3">
          {POINTS.map((p) => (
            <li key={p.title} className="flex flex-col gap-1.5 border-t border-line pt-4">
              <h3 className="text-body font-medium">{p.title}</h3>
              <p className="text-small text-ink-secondary">{p.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

function Heading({ icon, title, body, beta }: { icon: React.ReactNode; title: string; body: string; beta?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid size-8 shrink-0 place-items-center rounded-md border border-line bg-background">{icon}</span>
      <div className="flex flex-col gap-0.5">
        <h3 className="flex items-center gap-2 text-h4 font-normal">
          {title}
          {beta && (
            <span className="rounded-full border border-line-strong px-1.5 py-px text-label text-ink-secondary">Beta</span>
          )}
        </h3>
        <p className="text-small text-ink-secondary">{body}</p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------ console */

const VERSIONS = [
  { v: "v5", note: "Shorter greeting, Hindi first", who: "Asha", when: "2 min ago", state: "draft" },
  { v: "v4", note: "Added refund tool", who: "Rahul", when: "Yesterday", state: "live" },
  { v: "v3", note: "Escalate after 2 failed checks", who: "Asha", when: "Mon", state: "old" },
] as const

function ConsoleVersions() {
  return (
    <div aria-hidden className={cn("ui-dark flex h-72 flex-col overflow-hidden text-[12px] leading-snug", CHROME)}>
      <div className="flex h-11 items-center gap-3 border-b border-(--ui-line) px-4">
        <span className="font-medium">Billing assistant</span>
        <Pill tone="live">v4 · Live</Pill>
        <span className="ml-auto rounded-full bg-(--ui-text) px-2.5 py-0.5 text-[11px] font-medium text-(--ui-bg)">Publish v5</span>
      </div>
      <ul className="flex flex-1 flex-col justify-center px-4 py-2">
        {VERSIONS.map((r) => (
          <li key={r.v} className="flex items-center gap-3 border-b border-(--ui-line) py-2.5 last:border-0">
            <GitBranchIcon className="size-3.5 text-(--ui-muted)" />
            <span className="w-6 font-mono">{r.v}</span>
            <span className="min-w-0 flex-1 truncate text-(--ui-text)">{r.note}</span>
            <span className="hidden text-(--ui-muted) sm:inline">
              {r.who} · {r.when}
            </span>
            {r.state === "live" ? (
              <Pill tone="live">Live</Pill>
            ) : r.state === "draft" ? (
              <Pill tone="warn">Draft</Pill>
            ) : (
              <span className="text-[11px] text-(--ui-muted)">Roll back</span>
            )}
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2 border-t border-(--ui-line) px-4 py-2.5 text-(--ui-muted)">
        <CheckIcon weight="bold" className="size-3.5 text-(--ui-live)" />
        v5 passed 18 of 18 simulations · ready to publish
      </div>
    </div>
  )
}

/* ------------------------------------------------------------ MCP */

type Line = { kind: "you" | "tool" | "ok" | "say"; text: string }

const SESSION: Line[] = [
  { kind: "you", text: "make the billing agent greet in hindi first, then run the simulations" },
  { kind: "tool", text: "get_agent(\"billing-assistant\")" },
  { kind: "ok", text: "Billing assistant · v4 live · 6 nodes" },
  { kind: "tool", text: "update_prompt(version: \"v5\", greeting: \"hi-IN first\")" },
  { kind: "ok", text: "Draft v5 created" },
  { kind: "tool", text: "run_simulations(version: \"v5\")" },
  { kind: "ok", text: "18 of 18 scenarios passed" },
  { kind: "say", text: "Done. v5 greets in Hindi first and passed every scenario. Publish it?" },
  { kind: "you", text: "yes, publish" },
  { kind: "tool", text: "publish(version: \"v5\")" },
  { kind: "ok", text: "v5 is live on +91 80 4718 2290" },
]

/** A terminal running an MCP client, typing out one session and looping. */
function McpSession() {
  const ref = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLOListElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const reduce = usePrefersReducedMotion()
  const [shown, setShown] = useState(1)
  useEffect(() => {
    if (!inView || reduce) return
    const t = setInterval(() => setShown((n) => (n >= SESSION.length + 3 ? 1 : n + 1)), 850)
    return () => clearInterval(t)
  }, [inView, reduce])
  const count = reduce ? SESSION.length : Math.min(shown, SESSION.length)

  // Keep the newest line in view, like a terminal.
  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [count])

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "flex h-72 flex-col overflow-hidden bg-[oklch(0.12_0_0)] font-mono text-[11.5px] leading-[1.65] text-[oklch(0.86_0_0)]",
        CHROME
      )}
    >
      {/* Title bar */}
      <div className="relative flex h-8 shrink-0 items-center border-b border-white/10 bg-[oklch(0.17_0_0)] px-3">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="absolute inset-x-0 text-center text-[11px] text-white/45">~/support-agents — zsh</span>
      </div>

      <ol ref={listRef} className="flex flex-1 flex-col gap-1 overflow-hidden px-4 py-3">
        <li className="text-white/40">hoomanlabs mcp · connected · 9 tools</li>
        {SESSION.slice(0, count).map((l, i) => (
          <li key={i} className="whitespace-pre-wrap">
            {l.kind === "you" && (
              <span className="mt-1.5 block text-white">
                <span className="mr-2 text-[oklch(0.78_0.15_150)]">❯</span>
                {l.text}
              </span>
            )}
            {l.kind === "tool" && (
              <span className="block">
                <span className="mr-2 text-[oklch(0.75_0.12_250)]">⏺</span>
                <span className="text-white/55">hoomanlabs</span>
                <span className="text-white/35"> · </span>
                <span className="text-[oklch(0.8_0.1_250)]">{l.text}</span>
              </span>
            )}
            {l.kind === "ok" && (
              <span className="block pl-4 text-white/55">
                <span className="mr-2 text-white/30">⎿</span>
                <span className="text-[oklch(0.78_0.15_150)]">✓ </span>
                {l.text}
              </span>
            )}
            {l.kind === "say" && (
              <span className="block text-white/85">
                <span className="mr-2 text-white/40">⏺</span>
                {l.text}
              </span>
            )}
          </li>
        ))}
        <li>
          <span className="mr-2 text-[oklch(0.78_0.15_150)]">❯</span>
          <span className="inline-block h-[1.05em] w-[0.55em] translate-y-[2px] bg-white/80 motion-safe:animate-[blink_1s_steps(1)_infinite]" />
        </li>
      </ol>
    </div>
  )
}
