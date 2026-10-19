import { ArrowRightIcon, BooksIcon, CheckIcon, HeadsetIcon, PlayIcon, ShieldCheckIcon, SparkleIcon, UserIcon, WaveformIcon, WrenchIcon } from "@phosphor-icons/react/dist/ssr"

import { UiCard, UiLabel, UiPill, UiWindow } from "@/components/product/ui-window"
import { cn } from "@/lib/utils"
import { MockAction } from "@/components/product/mock-action"

/**
 * Screens for /platform/human-ai, in the site's product UI (each takes the
 * window class from the page and the hovered row as `focus`; content keeps
 * to the part left visible when the window runs past the stage's right
 * edge). Fictional data (Halden Energy, Ria, Maya Patel, Priya Shah, Asha
 * Menon, Daniel Brooks); counts and scores are sample.
 */

function Ok({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1 text-[11px] text-(--ui-live)">
      <CheckIcon weight="bold" className="size-3" />
      {children}
    </span>
  )
}

const fade = (focus: string, ids: string[]) => cn("transition-opacity duration-300", focus !== "all" && !ids.includes(focus) && "opacity-35")

/** Transfer: the warm handoff from Ria to Priya, and the context Priya sees. */
export function TransferScreen({ className, focus }: { className: string; focus: string }) {
  return (
    <UiWindow className={className} title="Transfer · Maya Patel" aside={<UiPill live>Connected to Priya</UiPill>}>
      <UiCard className={fade(focus, ["warm"])}>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-full bg-(--ui-raised) text-[11px]">R</span>
            <span className="flex flex-col leading-tight">
              <span>Ria</span>
              <span className="text-[11px] text-(--ui-muted)">AI · Billing</span>
            </span>
          </span>
          <ArrowRightIcon className="size-3.5 text-(--ui-muted)" />
          <span className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-full bg-(--ui-text) text-[11px] text-(--ui-bg)">P</span>
            <span className="flex flex-col leading-tight">
              <span>Priya Shah</span>
              <span className="text-[11px] text-(--ui-muted)">Billing team</span>
            </span>
          </span>
          <span className="ml-auto text-[11px] text-(--ui-muted)">Office hours · open</span>
        </span>
        <span className="flex flex-wrap gap-x-4 gap-y-1">
          <Ok>Initiated 2:37</Ok>
          <Ok>Priya picked up 2:43</Ok>
          <Ok>Summary shared</Ok>
        </span>
      </UiCard>

      <UiCard className={cn("gap-2", fade(focus, ["context"]))}>
        <UiLabel>What Priya sees</UiLabel>
        <p className="text-[12.5px]">Maya was charged a $15 late fee on her March bill. She paid on time and wants it removed.</p>
        <div className="grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-1.5">
          {[
            ["reason", "Disputes a late fee"],
            ["account", "HLD-482913"],
            ["bill", "$86.40 · paid 3 Mar"],
            ["sentiment", "Frustrated → calmer"],
          ].map(([k, v]) => (
            <span key={k} className="contents">
              <span className="font-mono text-[11.5px] text-(--ui-muted)">{k}</span>
              <span className="text-[12px]">{v}</span>
            </span>
          ))}
        </div>
        <span className="text-[11px] text-(--ui-muted)">Transcript · 14 turns before the handoff</span>
      </UiCard>
    </UiWindow>
  )
}

/** QA of human calls: one scorecard (and how each metric is checked), agents side by side, and who to coach first. */
export function HumanQaScreen({ className, focus }: { className: string; focus: string }) {
  if (focus === "coach") return <CoachScreen className={className} />
  const agents: [string, "AI" | "Human", string, string, string][] = [
    ["Ria · Billing", "AI", "1,912", "93", "No talk-over"],
    ["Asha Menon", "Human", "180", "91", "Summarised next steps"],
    ["Priya Shah", "Human", "214", "86", "Correct amount"],
    ["Daniel Brooks", "Human", "167", "72", "Recording disclosure read"],
  ]
  const metrics: [string, string, string][] = [
    ["Recording disclosure read", "AI", "91%"],
    ["Correct amount confirmed", "AI", "84%"],
    ["No talk-over", "Audio rule", "74%"],
    ["Card number not read back", "Code", "98%"],
  ]
  return (
    <UiWindow className={className} title="QA · Billing" aside={<UiPill>AI and human agents</UiPill>}>
      <UiCard className={cn("gap-0 p-0", fade(focus, ["side"]))}>
        <div className="grid grid-cols-[1fr_3.25rem_3rem_9rem] gap-3 border-b border-(--ui-line) px-3.5 py-2 text-[11px] text-(--ui-muted)">
          <span>Agent</span>
          <span className="text-right">Calls</span>
          <span className="text-right">Score</span>
          <span>Biggest gap</span>
        </div>
        {agents.map(([name, type, calls, score, gap]) => (
          <div key={name} className="grid grid-cols-[1fr_3.25rem_3rem_9rem] items-center gap-3 border-b border-(--ui-line) px-3.5 py-2 last:border-0">
            <span className="flex min-w-0 items-center gap-2">
              {type === "AI" ? <SparkleIcon weight="fill" className="size-3.5 shrink-0 text-(--ui-text)" /> : <UserIcon className="size-3.5 shrink-0 text-(--ui-muted)" />}
              <span className="truncate">{name}</span>
            </span>
            <span className="text-right font-mono text-[11.5px] text-(--ui-muted) tabular-nums">{calls}</span>
            <span className="text-right font-mono text-[11.5px] tabular-nums">{score}</span>
            <span className="truncate text-[11.5px] text-(--ui-muted)">{gap}</span>
          </div>
        ))}
      </UiCard>
      <UiCard className={cn("gap-0 p-0", fade(focus, ["same"]))}>
        <div className="grid grid-cols-[1fr_6rem_3rem] gap-3 border-b border-(--ui-line) px-3.5 py-2 text-[11px] text-(--ui-muted)">
          <span>One scorecard for everyone</span>
          <span>Checked by</span>
          <span className="text-right">Pass</span>
        </div>
        {metrics.map(([m, by, pass]) => (
          <div key={m} className="grid grid-cols-[1fr_6rem_3rem] items-center gap-3 border-b border-(--ui-line) px-3.5 py-2 last:border-0">
            <span className="truncate">{m}</span>
            <span className="truncate font-mono text-[11px] text-(--ui-muted)">{by}</span>
            <span className="text-right font-mono text-[11.5px] tabular-nums">{pass}</span>
          </div>
        ))}
      </UiCard>
    </UiWindow>
  )
}

/** Coaching: the agents to coach first, each with their biggest gap, and the moments to go through together. */
function CoachScreen({ className }: { className: string }) {
  const first: [string, string, number[], string][] = [
    ["Daniel Brooks", "72", [78, 77, 75, 74, 73, 72], "Recording disclosure read"],
    ["Priya Shah", "86", [80, 82, 83, 84, 85, 86], "Correct amount confirmed"],
  ]
  const spark = (t: number[]) => t.map((v, i) => `${(i / (t.length - 1)) * 48},${16 - (v - 70) * 0.9}`).join(" ")
  return (
    <UiWindow className={className} title="QA · Coaching" aside={<UiPill>Last 6 weeks</UiPill>}>
      <UiCard className="gap-0 p-0">
        <span className="px-3.5 pt-3 pb-1.5">
          <UiLabel>Agents to coach first</UiLabel>
        </span>
        {first.map(([name, score, trend, gap]) => (
          <div key={name} className="grid grid-cols-[1fr_3.5rem_2.5rem] items-center gap-3 border-t border-(--ui-line) px-3.5 py-2.5">
            <span className="flex min-w-0 flex-col leading-tight">
              <span>{name}</span>
              <span className="truncate text-[11px] text-(--ui-muted)">Work on: {gap}</span>
            </span>
            <svg viewBox="0 0 48 18" className="h-4 w-full" aria-hidden>
              <polyline points={spark(trend)} fill="none" stroke="currentColor" strokeWidth={1.4} className="text-(--ui-text)/70" vectorEffect="non-scaling-stroke" />
            </svg>
            <span className="text-right font-mono text-[11.5px] tabular-nums">{score}</span>
          </div>
        ))}
      </UiCard>
      <UiCard className="gap-2">
        <div className="flex items-center justify-between">
          <UiLabel>Coaching moments · Daniel</UiLabel>
          <MockAction done="Assigned to Daniel" className="rounded-md bg-(--ui-text) px-2 py-0.5 text-[11px] text-(--ui-bg)">
            Assign coaching
          </MockAction>
        </div>
        {[
          ["0:41", "Started on the account before the recording disclosure"],
          ["2:15", "Read back the balance before confirming identity"],
        ].map(([t, note]) => (
          <span key={t} className="flex items-center gap-2.5 rounded-md bg-(--ui-raised)/70 px-2.5 py-2 text-[12px]">
            <PlayIcon weight="fill" className="size-3 text-(--ui-muted)" />
            <span className="font-mono text-[11px] text-(--ui-muted)">{t}</span>
            <span className="truncate">{note}</span>
          </span>
        ))}
      </UiCard>
    </UiWindow>
  )
}

/** Fix types, each with the action that applies it. */
const FIXES: { id: string; type: string; icon: React.ElementType; n: number; title: string; action: string }[] = [
  { id: "knowledge", type: "Knowledge", icon: BooksIcon, n: 41, title: "Late fees on bills paid on time", action: "Add to library" },
  { id: "tool", type: "Tool", icon: WrenchIcon, n: 33, title: "Move a meter visit", action: "Create tool" },
  { id: "prompt", type: "Prompt", icon: SparkleIcon, n: 27, title: "Transferred at the first sign of frustration", action: "Edit prompt" },
  { id: "policy", type: "Policy", icon: ShieldCheckIcon, n: 19, title: "Payment plans on bills over $500", action: "Review policy" },
  { id: "speech", type: "Speech", icon: WaveformIcon, n: 12, title: "Account numbers misheard", action: "Add keyword" },
]

/** Learn from transfers: the ranked fixes (default), why calls were transferred, or one fix opened with what the team did. */
export function LearnScreen({ className, focus }: { className: string; focus: string }) {
  if (focus === "why") return <WhyScreen className={className} />
  if (focus === "act") return <FixScreen className={className} />
  return (
    <UiWindow className={className} title="What Ria can do more" aside={<UiPill>132 transfers · 30 days</UiPill>}>
      <UiCard className="gap-0 p-0">
        <div className="grid grid-cols-[5.5rem_1fr_3rem_6.5rem] gap-3 border-b border-(--ui-line) px-3.5 py-2 text-[11px] text-(--ui-muted)">
          <span>Fix</span>
          <span>Ranked by transfers it would remove</span>
          <span className="text-right">Calls</span>
          <span />
        </div>
        {FIXES.map((f) => (
          <div key={f.id} className="grid grid-cols-[5.5rem_1fr_3rem_6.5rem] items-center gap-3 border-b border-(--ui-line) px-3.5 py-2.5 last:border-0">
            <span className="flex items-center gap-1.5 text-[11.5px] text-(--ui-muted)">
              <f.icon className="size-3.5" />
              {f.type}
            </span>
            <span className="truncate">{f.title}</span>
            <span className="text-right font-mono text-[11.5px] tabular-nums">{f.n}</span>
            <span className="flex justify-end">
              <span className="rounded-md border border-(--ui-line) px-2 py-0.5 text-[11px] whitespace-nowrap">{f.action}</span>
            </span>
          </div>
        ))}
      </UiCard>
    </UiWindow>
  )
}

function WhyScreen({ className }: { className: string }) {
  const reasons: [string, number][] = [
    ["Disputes a late fee", 41],
    ["Wants to move a meter visit", 33],
    ["Sounds frustrated", 27],
    ["Asks for a payment plan over $500", 19],
  ]
  return (
    <UiWindow className={className} title="Transfers · last 30 days" aside={<UiPill>132 handed off</UiPill>}>
      <UiCard className="gap-0 p-0">
        <div className="grid grid-cols-[1fr_8rem_2.5rem] gap-3 border-b border-(--ui-line) px-3.5 py-2 text-[11px] text-(--ui-muted)">
          <span>Why Ria transferred</span>
          <span />
          <span className="text-right">Calls</span>
        </div>
        {reasons.map(([r, n]) => (
          <div key={r} className="grid grid-cols-[1fr_8rem_2.5rem] items-center gap-3 border-b border-(--ui-line) px-3.5 py-2.5 last:border-0">
            <span className="truncate">{r}</span>
            <span className="h-1.5 rounded-full bg-(--ui-raised)">
              <span className="block h-full rounded-full bg-(--ui-text)/70" style={{ width: `${(n / 41) * 100}%` }} />
            </span>
            <span className="text-right font-mono text-[11.5px] tabular-nums">{n}</span>
          </div>
        ))}
      </UiCard>
      <UiCard className="gap-0 p-0">
        <div className="grid grid-cols-[1fr_4rem_4rem] gap-3 border-b border-(--ui-line) px-3.5 py-2 text-[11px] text-(--ui-muted)">
          <span>By AI agent</span>
          <span className="text-right">Rate</span>
          <span className="text-right">Fixable</span>
        </div>
        {[
          ["Ria · Billing", "6.9%", "84%"],
          ["Ria · Moving home", "4.2%", "71%"],
        ].map(([a, rate, fix]) => (
          <div key={a} className="grid grid-cols-[1fr_4rem_4rem] items-center gap-3 border-b border-(--ui-line) px-3.5 py-2.5 last:border-0">
            <span>{a}</span>
            <span className="text-right font-mono text-[11.5px] tabular-nums">{rate}</span>
            <span className="text-right font-mono text-[11.5px] tabular-nums">{fix}</span>
          </div>
        ))}
      </UiCard>
    </UiWindow>
  )
}

function FixScreen({ className }: { className: string }) {
  return (
    <UiWindow className={className} title="Fix · Move a meter visit" aside={<UiPill>33 transfers</UiPill>}>
      <UiCard className="gap-2">
        <span className="flex items-center gap-1.5 text-[11.5px] text-(--ui-muted)">
          <WrenchIcon className="size-3.5" />
          Tool
        </span>
        <p className="text-[12.5px]">Customers asked to move their meter visit. Ria can book one but can&apos;t reschedule, so it transferred. Your team did it in under a minute.</p>
      </UiCard>
      <UiCard className="gap-2">
        <span className="flex items-center gap-2">
          <HeadsetIcon className="size-3.5 text-(--ui-muted)" />
          <UiLabel>What your team said</UiLabel>
        </span>
        <p className="text-[12.5px]">“I&apos;ve moved your visit to Thursday at 10:00. You&apos;ll get a text to confirm.”</p>
        <span className="text-[11px] text-(--ui-muted)">Priya Shah · 14 Mar</span>
      </UiCard>
      <span className="flex gap-2 text-[11.5px]">
        <MockAction done="Tool drafted · reschedule_visit" className="rounded-md bg-(--ui-text) px-2.5 py-1 text-(--ui-bg)">
          Create tool
        </MockAction>
        <span className="rounded-md bg-(--ui-raised) px-2.5 py-1">See all 33 calls</span>
      </span>
    </UiWindow>
  )
}
