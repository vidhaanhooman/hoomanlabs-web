"use client"

import { useRef } from "react"
import { CheckIcon } from "@phosphor-icons/react"

import { Label, Pill, ScreenBar, ScreenShell, WINDOW_CHROME } from "@/components/product/ui-bits"
import { useScriptedLoop } from "@/hooks/use-scripted-loop"
import { cn } from "@/lib/utils"

/**
 * Voice AI hero: the whole product told as one call, not a product screen.
 * 01 Context pulled before the call -> 02 the live conversation (language
 * switch, tools firing mid-call) -> 03 a structured outcome, scored and synced.
 * Fictional demo data.
 */

type Line =
  | { who: "caller" | "agent"; text: string; lang?: string }
  | { who: "tool"; text: string }

const LINES: Line[] = [
  { who: "agent", text: "Hi Priya, this is Ria from Halden Energy. How can I help?" },
  { who: "caller", text: "Mera last payment abhi tak apply nahi hua.", lang: "HI" },
  { who: "tool", text: "Looked up account" },
  { who: "agent", text: "Maine dekh liya. Payment mil gaya hai, main abhi apply kar deti hoon.", lang: "HI" },
  { who: "tool", text: "Applied payment · Sent SMS" },
]

// Step 0: context only. Steps 1-5 reveal each line. Step 6: outcome.
const HOLDS = [1400, 1300, 1500, 900, 1600, 1100, 4200]

const CONTEXT = [
  { k: "Customer", v: "Priya Raman" },
  { k: "Plan", v: "Gold, monthly" },
  { k: "Last call", v: "3 days ago, billing" },
  { k: "Knowledge", v: "Billing policy v3" },
]

const OUTCOME = [
  { k: "Intent", v: "payment_not_applied" },
  { k: "Action", v: "payment_applied" },
  { k: "Language", v: "English → Hindi" },
  { k: "Sentiment", v: "Positive" },
]

function Step({ n, title, className }: { n: string; title: string; className?: string }) {
  return (
    <p
      className={cn(
        "mb-2 inline-flex rounded-full bg-white/85 px-2.5 py-0.5 font-mono text-[11px] text-neutral-700 backdrop-blur-sm",
        className
      )}
    >
      {n} · {title}
    </p>
  )
}

export function VoiceOverview({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { step, last } = useScriptedLoop(ref, HOLDS)
  const shown = Math.min(step, LINES.length)
  const done = step === last
  const talking = !done && step > 0

  return (
    <div
      ref={ref}
      className={cn(
        "grid gap-4 sm:gap-5 lg:grid-cols-[1fr_1.45fr_1fr] lg:items-center",
        className
      )}
    >
      {/* 01 Context */}
      <div className="hidden sm:block">
        <Step n="01" title="Before the call" />
        <ScreenShell className={cn("ui-light", WINDOW_CHROME)}>
          <ScreenBar>
            <span className="font-medium">Context</span>
            <Pill tone="live" className="ml-auto">
              Pulled
            </Pill>
          </ScreenBar>
          <dl className="flex flex-col px-4 py-2">
            {CONTEXT.map((r) => (
              <div key={r.k} className="flex items-center justify-between gap-3 border-b border-(--ui-line) py-2 last:border-0">
                <dt>
                  <Label>{r.k}</Label>
                </dt>
                <dd className="truncate">{r.v}</dd>
              </div>
            ))}
          </dl>
        </ScreenShell>
      </div>

      {/* 02 The call */}
      <div>
        <Step n="02" title="During the call" />
        <ScreenShell className={cn("ui-light", WINDOW_CHROME)}>
          <ScreenBar>
            <span className="font-medium">Inbound call</span>
            <Pill tone={done ? "muted" : "live"}>{done ? "Ended 2:14" : "Live"}</Pill>
            <span className="ml-auto flex items-center gap-1 font-mono text-[11px] text-(--ui-muted)">
              <span className={cn("rounded px-1", shown < 2 && "bg-(--ui-raised) text-(--ui-text)")}>EN</span>
              <span>→</span>
              <span className={cn("rounded px-1", shown >= 2 && "bg-(--ui-raised) text-(--ui-text)")}>HI</span>
            </span>
          </ScreenBar>
          <ol className="flex h-[17.5rem] flex-col justify-end gap-2 overflow-hidden px-4 py-3" aria-live="off">
            {LINES.slice(0, Math.max(shown, 1)).map((l, i) =>
              l.who === "tool" ? (
                <li
                  key={i}
                  className="flex motion-safe:animate-[reveal-blur_400ms_var(--ease-out)_both] items-center gap-1.5 self-center rounded-full border border-(--ui-line) bg-(--ui-panel) px-2.5 py-0.5 text-[11px] text-(--ui-muted)"
                >
                  <CheckIcon weight="bold" className="size-3 text-(--ui-live)" aria-hidden />
                  {l.text}
                </li>
              ) : (
                <li
                  key={i}
                  className={cn(
                    "flex max-w-[85%] motion-safe:animate-[reveal-blur_400ms_var(--ease-out)_both] flex-col gap-0.5",
                    l.who === "agent" ? "self-start" : "self-end items-end"
                  )}
                >
                  <Label>{l.who === "agent" ? "Agent" : "Caller"}</Label>
                  <span
                    className={cn(
                      "rounded-md px-3 py-1.5",
                      l.who === "agent" ? "bg-(--ui-raised)" : "bg-(--ui-text) text-(--ui-bg)"
                    )}
                  >
                    {l.text}
                  </span>
                </li>
              )
            )}
          </ol>
          <div className="flex items-center gap-3 border-t border-(--ui-line) px-4 py-2.5">
            <span className="ui-wave flex h-4 items-end gap-[3px]" data-idle={talking ? undefined : ""} aria-hidden>
              {[10, 16, 12, 14, 8].map((h, i) => (
                <span key={i} className="w-[3px] rounded-full bg-(--ui-text)" style={{ height: h }} />
              ))}
            </span>
            <Label>Ria · British English, Hindi</Label>
            <Label className="ml-auto hidden @sm:inline">Interruptions on</Label>
          </div>
        </ScreenShell>
      </div>

      {/* 03 Outcome */}
      <div>
        <Step n="03" title="After the call" />
        <ScreenShell className={cn("ui-light", WINDOW_CHROME)}>
          <ScreenBar>
            <span className="font-medium">Outcome</span>
            <Pill tone={done ? "live" : "muted"} className="ml-auto">
              {done ? "Resolved" : "Waiting"}
            </Pill>
          </ScreenBar>
          <dl className="flex flex-col px-4 py-2">
            {OUTCOME.map((r) => (
              <div key={r.k} className="flex items-center justify-between gap-3 border-b border-(--ui-line) py-2 last:border-0">
                <dt>
                  <Label>{r.k}</Label>
                </dt>
                <dd className="truncate font-mono text-[12px]">{done ? r.v : "—"}</dd>
              </div>
            ))}
          </dl>
          <div className="flex items-center justify-between gap-3 border-t border-(--ui-line) px-4 py-2.5">
            <Label>QA score</Label>
            <span className="font-mono tabular-nums">{done ? "96 / 100" : "—"}</span>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-(--ui-line) px-4 py-2.5">
            <Label>Sent to</Label>
            <span>{done ? "CRM, webhook" : "—"}</span>
          </div>
        </ScreenShell>
      </div>
    </div>
  )
}
