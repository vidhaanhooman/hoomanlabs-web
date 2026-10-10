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
  { kind: "you", text: "Make the billing agent greet in Hindi first, then run the simulations." },
  { kind: "tool", text: "hoomanlabs.get_agent(\"billing-assistant\")" },
  { kind: "tool", text: "hoomanlabs.update_prompt(version: \"v5\", greeting: \"hi-IN first\")" },
  { kind: "tool", text: "hoomanlabs.run_simulations(version: \"v5\")" },
  { kind: "ok", text: "18 of 18 scenarios passed" },
  { kind: "say", text: "Done. v5 is ready. Want me to publish it?" },
  { kind: "you", text: "Publish it." },
  { kind: "tool", text: "hoomanlabs.publish(version: \"v5\")" },
  { kind: "ok", text: "v5 is live on +91 80 4718 2290" },
]

function McpSession() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const reduce = usePrefersReducedMotion()
  const [shown, setShown] = useState(1)
  useEffect(() => {
    if (!inView || reduce) return
    const t = setInterval(() => setShown((n) => (n >= SESSION.length + 3 ? 1 : n + 1)), 900)
    return () => clearInterval(t)
  }, [inView, reduce])
  const count = reduce ? SESSION.length : Math.min(shown, SESSION.length)

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("ui-dark flex h-72 flex-col overflow-hidden font-mono text-[11.5px] leading-relaxed", CHROME)}
    >
      <div className="flex h-11 shrink-0 items-center gap-2 border-b border-(--ui-line) px-4 font-sans text-[12px]">
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2 rounded-full bg-(--ui-raised)" />
          ))}
        </span>
        <span className="ml-2 text-(--ui-muted)">Your editor · HoomanLabs MCP connected</span>
        <span className="ml-auto size-1.5 rounded-full bg-(--ui-live)" />
      </div>
      <ol className="flex flex-1 flex-col justify-end gap-1.5 overflow-hidden px-4 py-3">
        {SESSION.slice(0, count).map((l, i) => (
          <li
            key={i}
            className={cn(
              "motion-safe:animate-[reveal-blur_350ms_var(--ease-out)_both]",
              l.kind === "you" && "font-sans text-[12.5px] text-(--ui-text)",
              l.kind === "tool" && "text-[oklch(0.75_0.12_250)]",
              l.kind === "ok" && "text-(--ui-live)",
              l.kind === "say" && "font-sans text-[12.5px] text-(--ui-muted)"
            )}
          >
            {l.kind === "you" && <span className="mr-2 text-(--ui-muted)">You</span>}
            {l.kind === "tool" && <span className="mr-2 text-(--ui-muted)">→</span>}
            {l.kind === "ok" && <span className="mr-2">✓</span>}
            {l.text}
          </li>
        ))}
      </ol>
    </div>
  )
}
