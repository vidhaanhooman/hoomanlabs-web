import { ArrowRightIcon, CheckIcon, FlaskIcon, HeadsetIcon, SparkleIcon, UserIcon } from "@phosphor-icons/react/dist/ssr"

import { UiCard, UiLabel, UiPill, UiWindow } from "@/components/product/ui-window"
import { cn } from "@/lib/utils"

/**
 * Screens for /platform/human-ai, in the site's product UI (each takes the
 * window class from the page and the hovered row as `focus`; content keeps
 * to the part left visible when the window runs past the stage's right
 * edge). Fictional data (Halden Energy, Ria, Maya Patel, Priya Shah).
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
            <span className="grid size-7 place-items-center rounded-full bg-white text-[11px] text-black">P</span>
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

/** QA of human calls: AI and human agents on the same scorecard, side by side. */
export function HumanQaScreen({ className, focus }: { className: string; focus: string }) {
  const agents: [string, string, string, string, string][] = [
    ["Ria · Billing", "AI", "1,912", "93%", "Cuts in on numbers"],
    ["Priya Shah", "Human", "214", "89%", "Long hold before answer"],
    ["Asha Menon", "Human", "180", "91%", "Didn't confirm the amount"],
  ]
  return (
    <UiWindow className={className} title="QA · Billing calls" aside={<UiPill>AI and human</UiPill>}>
      <UiCard className={cn("gap-0 p-0", fade(focus, ["side", "same"]))}>
        <div className="grid grid-cols-[1fr_3.5rem_3.5rem_3rem] gap-3 border-b border-(--ui-line) px-3.5 py-2 text-[11px] text-(--ui-muted)">
          <span>Agent</span>
          <span>Type</span>
          <span className="text-right">Calls</span>
          <span className="text-right">Pass</span>
        </div>
        {agents.map(([name, type, calls, pass, issue]) => (
          <div key={name} className="grid grid-cols-[1fr_3.5rem_3.5rem_3rem] items-center gap-3 border-b border-(--ui-line) px-3.5 py-2.5 last:border-0">
            <span className="flex min-w-0 items-center gap-2">
              {type === "AI" ? <SparkleIcon weight="fill" className="size-3.5 shrink-0 text-[oklch(0.75_0.12_295)]" /> : <UserIcon className="size-3.5 shrink-0 text-(--ui-muted)" />}
              <span className="flex min-w-0 flex-col leading-tight">
                <span className="truncate">{name}</span>
                <span className="truncate text-[11px] text-(--ui-muted)">{issue}</span>
              </span>
            </span>
            <span className="text-[11.5px] text-(--ui-muted)">{type}</span>
            <span className="text-right font-mono text-[11.5px] tabular-nums">{calls}</span>
            <span className="text-right font-mono text-[11.5px] tabular-nums">{pass}</span>
          </div>
        ))}
      </UiCard>
      <UiCard className={fade(focus, ["same"])}>
        <UiLabel>One scorecard for everyone</UiLabel>
        <div className="flex flex-wrap gap-1.5 text-[11.5px]">
          {["Polite and on-policy", "Disclosure read", "Correct amount", "No talk-over"].map((m) => (
            <span key={m} className="rounded-md bg-(--ui-raised) px-2 py-0.5">
              {m}
            </span>
          ))}
        </div>
      </UiCard>
      <UiCard className={fade(focus, ["review"])}>
        <div className="flex items-center justify-between">
          <UiLabel>Team review · Priya&apos;s call · 3:12</UiLabel>
          <span className="text-[11px] text-(--ui-muted)">Coaching note</span>
        </div>
        <p className="text-[12.5px]">Confirm the amount before taking payment. Good recovery after the hold.</p>
      </UiCard>
    </UiWindow>
  )
}

/** Learn from transfers: why calls were handed off, what the team did, and turning it into improvements. */
export function LearnScreen({ className, focus }: { className: string; focus: string }) {
  const reasons: [string, number][] = [
    ["Asks for a payment plan", 18],
    ["Disputes a late fee", 31],
    ["Asks for a person", 12],
  ]
  return (
    <UiWindow className={className} title="Transfers · last 30 days" aside={<UiPill>61 handed off</UiPill>}>
      <UiCard className={cn("gap-0 p-0", fade(focus, ["why"]))}>
        <div className="grid grid-cols-[1fr_8rem_2.5rem] gap-3 border-b border-(--ui-line) px-3.5 py-2 text-[11px] text-(--ui-muted)">
          <span>Why it was transferred</span>
          <span />
          <span className="text-right">Calls</span>
        </div>
        {reasons
          .sort((a, b) => b[1] - a[1])
          .map(([r, n], i) => (
            <div key={r} className={cn("grid grid-cols-[1fr_8rem_2.5rem] items-center gap-3 border-b border-(--ui-line) px-3.5 py-2.5 last:border-0", i === 1 && "bg-(--ui-raised)/60")}>
              <span>{r}</span>
              <span className="h-1.5 rounded-full bg-(--ui-raised)">
                <span className="block h-full rounded-full bg-(--ui-text)/70" style={{ width: `${(n / 31) * 100}%` }} />
              </span>
              <span className="text-right font-mono text-[11.5px] tabular-nums">{n}</span>
            </div>
          ))}
      </UiCard>
      <UiCard className={fade(focus, ["what"])}>
        <span className="flex items-center gap-2">
          <HeadsetIcon className="size-3.5 text-(--ui-muted)" />
          <UiLabel>What your team did · payment plans</UiLabel>
        </span>
        <p className="text-[12.5px]">Offered three monthly instalments on bills over $50, in 14 of 18 calls.</p>
        <span className="flex items-center gap-1 self-start rounded-md border border-(--ui-line) px-2 py-1 text-[11px]">
          <FlaskIcon className="size-3" />
          Saved as scenario
        </span>
      </UiCard>
      <UiCard className={cn("border-dashed", fade(focus, ["improve"]))}>
        <div className="flex items-center justify-between">
          <UiLabel>Suggested change to Ria</UiLabel>
          <span className="rounded-full border border-dashed border-(--ui-line) px-2 text-[10.5px] text-(--ui-muted)">Coming soon</span>
        </div>
        <p className="text-[12.5px]">Offer three monthly instalments on bills over $50, then confirm the first date.</p>
      </UiCard>
    </UiWindow>
  )
}
