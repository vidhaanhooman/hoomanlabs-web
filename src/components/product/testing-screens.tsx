import {
  ArrowClockwiseIcon,
  ArrowCounterClockwiseIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  CopyIcon,
  FlagIcon,
  FlaskIcon,
  PlayIcon,
  TerminalIcon,
  WrenchIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr"

import { UiCard, UiPill, UiWindow } from "@/components/product/ui-window"
import { cn } from "@/lib/utils"

/**
 * Screens for /platform/testing, recreated from the console in its dark
 * style (each takes the window class from the page; content keeps to the
 * part left visible when the window runs past the stage's right edge, and
 * where it reacts to the panel's rows, the hovered row as `focus`).
 * Fictional data (Halden Energy, Ria, Maya Patel). Tool names, versions and
 * run numbers are illustrative.
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

/**
 * Spot checks & replay, as the console's conversation log (for recall): the
 * conversation header, the timestamped transcript with the per-turn toolbar
 * (play, replay, simulate, logs, copy, flag), an inline tool result, and a
 * slim Details column (outcome with flag and re-run, end reason, tools).
 * The flagged turn is the one the simulation failed on (Ria cut in while
 * the card number was read). The hovered row drives the toolbar: flag
 * (find), replay (the replayed answer), or simulate and save (scenario).
 */
const TURNS: [string, "User" | "Agent", string][] = [
  ["0:00", "Agent", "Hi, this is Ria from Halden Energy. Am I speaking with Maya?"],
  ["0:06", "User", "Yes. I'd like to pay my bill."],
  ["0:11", "Agent", "Your bill is $62.10. Shall I take your card number?"],
  ["0:18", "User", "Sure. It's four, two, seven… one…"],
]

export function ReplayScreen({ className, focus, type = "Simulation" }: { className: string; focus: string; type?: string }) {
  // Testing's rows are find / rerun / save; Observability's logs are turns (the turn debugger) / act (change, replay, simulate) / actions.
  const step = focus === "turns" ? "turn" : focus === "act" ? "act" : focus === "rerun" ? "rerun" : focus === "save" ? "save" : focus === "actions" ? "actions" : "find"
  const replay = step === "rerun" || step === "act"
  const saved = step === "save"
  const tools: [React.ElementType, string, boolean][] = [
    [PlayIcon, "Play", false],
    [ArrowCounterClockwiseIcon, "Replay", replay],
    [FlaskIcon, "Simulate and save as scenario", saved || step === "act"],
    [TerminalIcon, "Agent actions", step === "actions"],
    [CopyIcon, "Copy", false],
  ]
  return (
    <div aria-hidden className={cn("ui-dark relative flex flex-col overflow-hidden text-[12px] leading-[1.5]", className)}>
      {/* Conversation header */}
      <div className="flex items-start gap-6 border-b border-(--ui-line) px-4 py-2.5 pr-[22%] text-[11px]">
        {[
          ["Conversation Id", "cv_8Hq2Lm"],
          ["Type", type],
          ["Start time", "12 Mar, 10:02 am"],
        ].map(([k, v]) => (
          <span key={k} className="flex flex-col leading-tight">
            <span className="text-(--ui-muted)">{k}</span>
            <span className={cn("text-[12px]", k === "Conversation Id" && "font-mono")}>{v}</span>
          </span>
        ))}
        <span className="ml-auto flex items-center gap-1.5 rounded-md bg-(--ui-raised) px-2.5 py-1.5 text-[11.5px]">
          <FlagIcon className="size-3.5" />
          Review
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,2.1fr)_minmax(0,1fr)] pr-[22%]">
        {/* Transcript */}
        <div className="flex flex-col gap-0.5 border-r border-(--ui-line) px-3 pt-3">
          <span className="flex items-center justify-between px-1 pb-2">
            <span className="text-[13px]">Transcript</span>
            <span className="text-[11px] text-(--ui-muted)">0:38 · 9 turns</span>
          </span>
          {TURNS.map(([t, who, line]) => (
            <Line key={t} t={t} who={who}>
              {line}
            </Line>
          ))}

          {/* The flagged turn, with its toolbar */}
          <div className="relative mt-1 rounded-md bg-(--ui-raised)/70 py-1">
            <div className="absolute top-1/2 right-1 z-10 flex -translate-y-1/2 items-center gap-0.5 rounded-md border border-(--ui-line) bg-(--ui-panel) p-0.5">
              {tools.map(([I, label, on]) => (
                <span key={label} className={cn("relative grid size-6 place-items-center rounded", on ? "bg-(--ui-raised) text-(--ui-text)" : "text-(--ui-muted)")}>
                  <I className="size-3.5" />
                  {on && step !== "act" && <span className="absolute bottom-full mb-1.5 rounded-md bg-(--ui-text) px-2 py-0.5 text-[10.5px] whitespace-nowrap text-(--ui-bg)">{label}</span>}
                </span>
              ))}
              <span className={cn("grid size-6 place-items-center rounded", step === "find" && "bg-(--fail)/18")}>
                <FlagIcon weight={step === "find" ? "fill" : "regular"} className="size-3.5 text-(--fail)" />
              </span>
            </div>
            <Line t="0:22" who="Agent">
              <span className="underline decoration-(--fail) decoration-wavy underline-offset-4">Thanks. And the expiry date?</span>
            </Line>
          </div>
          <span className={cn("flex items-center gap-2 rounded-md px-1 py-1.5 text-[11px]", step === "actions" && "bg-(--ui-raised) ring-1 ring-white/15")}>
            <WrenchIcon className="size-3 text-(--ui-muted)" />
            take_payment
            <Pill tone="fail">Failed</Pill>
            <span className="text-(--ui-muted)">card number incomplete</span>
          </span>
          {step === "actions" && (
            <div className="mt-1 grid grid-cols-[4rem_1fr] gap-x-3 gap-y-1 rounded-md border border-(--ui-line) p-2.5 font-mono text-[11px] whitespace-pre">
              <span className="text-(--ui-muted)">sent</span>
              <span>{`{ "amount": 62.10, "card": "4271" }`}</span>
              <span className="text-(--ui-muted)">returned</span>
              <span className="text-(--fail)">{`{ "error": "card_number_incomplete" }`}</span>
              <span className="text-(--ui-muted)">took</span>
              <span>312ms</span>
            </div>
          )}

          {/* What the toolbar did */}
          {step === "act" && (
            <div className="mt-1 flex flex-col gap-1 rounded-md border border-(--ui-line) p-2.5">
              <span className="text-[11px] text-(--ui-muted)">Changed in Ria · v13 draft</span>
              <span className="font-mono text-[11px] text-(--ui-live)">+ When a card number is read, wait for all 16 digits before replying.</span>
            </div>
          )}
          {replay && (
            <div className="mt-1 rounded-md border border-(--ui-line) p-2.5">
              <span className="flex items-center justify-between text-[11px] text-(--ui-muted)">
                Replay on v13 draft
                <Pill tone="ok">Waited for every digit</Pill>
              </span>
              <p className="mt-1">…one, nine, nine, zero. Got all 16 digits, thank you. And the expiry date?</p>
            </div>
          )}
          {step === "act" && (
            <div className="mt-1 flex items-center gap-2 rounded-md border border-(--ui-line) p-2.5">
              <FlaskIcon className="size-3.5 text-(--ui-muted)" />
              <span className="flex flex-col leading-tight">
                <span>Simulated on v13 draft · 20 conversations</span>
                <span className="text-[11px] text-(--ui-muted)">Callers reading numbers slowly</span>
              </span>
              <span className="ml-auto">
                <Pill tone="ok">20 passed</Pill>
              </span>
            </div>
          )}
          {saved && (
            <div className="mt-1 flex items-center gap-2 rounded-md border border-(--ui-line) p-2.5">
              <FlaskIcon className="size-3.5 text-(--ui-muted)" />
              <span className="flex flex-col leading-tight">
                <span>Saved as scenario · Reads numbers slowly</span>
                <span className="text-[11px] text-(--ui-muted)">Billing suite · checked on every version</span>
              </span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-3 px-3.5 pt-3 text-[11.5px]">
          <span className="text-[13px]">Details</span>
          <span className="flex flex-col leading-tight">
            <span className="text-(--ui-muted)">Outcome</span>
            <span className="font-mono text-[12px]">payment_not_taken</span>
          </span>
          <span className="flex gap-1.5">
            <span className="grid size-7 place-items-center rounded-md bg-(--ui-raised)">
              <FlagIcon className="size-3.5" />
            </span>
            <span className={cn("flex items-center gap-1.5 rounded-md px-2.5", step === "rerun" ? "bg-(--ui-text) text-(--ui-bg)" : "bg-(--ui-raised)")}>
              <ArrowClockwiseIcon className="size-3.5" />
              Re-run
            </span>
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-(--ui-muted)">End reason</span>
            <span className="font-mono text-[12px]">customer_end</span>
          </span>
          <span className="border-t border-(--ui-line) pt-3 text-[12px]">Tools</span>
          {(
            [
              ["get_balance", "ok", "Success"],
              ["take_payment", "fail", "Failed"],
            ] as const
          ).map(([name, tone, label]) => (
            <span key={name} className={cn("flex items-center gap-2 rounded-md bg-(--ui-raised)/70 px-2.5 py-2", step === "actions" && "ring-1 ring-white/15")}>
              <WrenchIcon className="size-3 text-(--ui-muted)" />
              <span className="font-mono">{name}</span>
              <span className="ml-auto">
                <Pill tone={tone}>{label}</Pill>
              </span>
            </span>
          ))}
        </div>
      </div>

      {step === "turn" && <TurnDebug />}
    </div>
  )
}

/**
 * The turn debugger, opened over the log (for recall of the console's turn
 * view): what the customer said, what the agent generated and what it
 * actually spoke, the timeline with each step's latency, the decision that
 * caused the cut-in, and the actions on the turn. Neutral bars; the
 * interruption is the only accent. Timings are sample.
 */
const STEPS: { label: string; start: number; dur: number; tone: string; sub?: boolean }[] = [
  { label: "User speech", start: 0, dur: 2.1, tone: "bg-(--ui-text)/15" },
  { label: "End of turn", start: 2.1, dur: 0.38, tone: "border border-(--ui-line) bg-transparent" },
  { label: "Thinking", start: 2.48, dur: 0.62, tone: "bg-(--ui-text)/25" },
  { label: "LLM first token", start: 2.48, dur: 0.41, tone: "bg-(--ui-text)/15", sub: true },
  { label: "TTS first sentence", start: 2.89, dur: 0.16, tone: "bg-(--ui-text)/15", sub: true },
  { label: "Agent speech", start: 3.1, dur: 0.7, tone: "bg-(--ui-text)/35" },
]
const SCALE = 5

function TurnDebug() {
  const at = (v: number) => `${(v / SCALE) * 100}%`
  const ms = (v: number) => (v < 1 ? `${Math.round(v * 1000)}ms` : `${v.toFixed(2)}s`)
  return (
    <div className="absolute inset-0 z-20 bg-black/55">
      <div className="absolute inset-y-2 right-[calc(22%+0.75rem)] left-3 flex flex-col overflow-hidden rounded-lg border border-(--ui-line) bg-(--ui-bg) shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-(--ui-line) px-3.5 py-2">
          <span className="text-[12.5px]">Turn 5 · 0:22</span>
          <span className="ml-auto flex gap-1 text-(--ui-muted)">
            {[ArrowLeftIcon, ArrowRightIcon, XIcon].map((I, i) => (
              <span key={i} className={cn("grid size-6 place-items-center rounded", i === 2 && "border border-(--ui-line)")}>
                <I className="size-3" />
              </span>
            ))}
          </span>
        </div>

        <div className="flex gap-1.5 border-b border-(--ui-line) px-3.5 py-2 text-[11px]">
          {(
            [
              [ArrowClockwiseIcon, "Re-run this turn"],
              [FlaskIcon, "Add to scenario"],
              [TerminalIcon, "Open logs"],
              [CopyIcon, "Copy"],
            ] as const
          ).map(([I, label]) => (
            <span key={label} className="flex items-center gap-1.5 rounded-md bg-(--ui-raised) px-2 py-1">
              <I className="size-3" />
              {label}
            </span>
          ))}
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden px-3.5 py-2.5 text-[11.5px]">
          {/* Overview */}
          <div className="grid grid-cols-[7.5rem_1fr] gap-x-3 gap-y-1">
            <span className="text-(--ui-muted)">User message</span>
            <span className="rounded bg-(--ui-raised) px-2 py-0.5">Sure. It&apos;s four, two, seven… one…</span>
            <span className="text-(--ui-muted)">Response generated</span>
            <span className="rounded bg-(--ui-raised) px-2 py-0.5">Thanks. And the expiry date?</span>
            <span className="text-(--ui-muted)">Response spoken</span>
            <span className="rounded bg-(--ui-raised) px-2 py-0.5">
              Thanks. And the<span className="text-(--fail)"> —</span>
            </span>
          </div>

          {/* Timeline and latency */}
          <div className="flex flex-col gap-1 rounded-md border border-(--ui-line) p-2.5">
            <span className="flex items-baseline justify-between">
              <span>Timeline and latency</span>
              <span className="font-mono text-[10.5px] text-(--ui-muted)">Turn latency 1.00s</span>
            </span>
            <span className="text-[10.5px] text-(--fail)">Decision: ended the turn after a 0.38s pause, mid card number</span>
            <span className="relative mb-0.5 flex h-3.5 font-mono text-[9.5px] text-(--ui-muted)">
              {[0, 1, 2, 3, 4].map((t) => (
                <span key={t} className="absolute" style={{ left: at(t) }}>
                  {t}s
                </span>
              ))}
            </span>
            {STEPS.map((x) => (
              <span key={x.label} className="relative h-4">
                <span className={cn("absolute inset-y-0 rounded-sm", x.tone)} style={{ left: at(x.start), width: at(x.dur) }} />
                <span className="absolute inset-y-0 flex items-center gap-1.5 pl-1.5 font-mono text-[10px] whitespace-nowrap" style={{ left: at(x.start) }}>
                  {x.sub && <span className="text-(--ui-muted)">↳</span>}
                  {x.label}
                  <span className="text-(--ui-muted)">{ms(x.dur)}</span>
                </span>
              </span>
            ))}
            <span className="relative h-4">
              <span
                className="absolute inset-y-0 flex items-center rounded-sm border border-(--fail)/40 bg-(--fail)/18 px-1.5 font-mono text-[10px] whitespace-nowrap text-(--fail)"
                style={{ left: at(3.8), right: 0 }}
              >
                Interrupted
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Line({ t, who, children }: { t: string; who: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[2.25rem_3rem_1fr] items-baseline gap-2 px-1 py-1">
      <span className="font-mono text-[10.5px] text-(--ui-muted)">{t}</span>
      <span className="text-[11px] text-(--ui-muted)">{who}</span>
      <span>{children}</span>
    </div>
  )
}

function Pill({ tone, children }: { tone: "ok" | "fail"; children: React.ReactNode }) {
  return (
    <UiPill tone={tone} dot={false} className="px-1.5 py-px text-[10.5px]">
      {children}
    </UiPill>
  )
}

/** A/B testing: two versions, split across inbound and outbound conversations. */
export function AbScreen({ className, focus }: { className: string; focus: string }) {
  const arms = [
    { name: "v12 · current", note: "Current script and voice", inbound: 71, outbound: 44 },
    { name: "v13 · test", note: "Shorter opening, warmer voice", inbound: 78, outbound: 52, lead: true },
  ]
  return (
    <UiWindow className={className} title="Ria · Billing · A/B test" aside={<UiPill live>20% on v13</UiPill>}>
      <div className={cn("flex flex-wrap gap-1.5", fade(focus, ["change"]))}>
        {["Script", "Voice", "Flow"].map((x, i) => (
          <span key={x} className={cn("rounded-full px-2.5 py-0.5 text-[11px]", i < 2 ? "bg-(--ui-raised) text-(--ui-text)" : "border border-(--ui-line) text-(--ui-muted)")}>
            {x} {i < 2 ? "changed" : "same"}
          </span>
        ))}
      </div>
      {arms.map((a) => (
        <UiCard key={a.name} className={cn(a.lead && "border-(--ok)/40")}>
          <div className="flex items-center justify-between">
            <span className="flex flex-col">
              <span className="text-[13px]">{a.name}</span>
              <span className="text-[11px] text-(--ui-muted)">{a.note}</span>
            </span>
            {a.lead && <Ok>Ahead</Ok>}
          </div>
          {(
            [
              ["Inbound · resolved", a.inbound],
              ["Outbound · promise to pay", a.outbound],
            ] as [string, number][]
          ).map(([k, v]) => (
            <div key={k} className={cn("grid grid-cols-[10rem_1fr_2.5rem] items-center gap-3 text-[11.5px]", fade(focus, ["both"]))}>
              <span className="text-(--ui-muted)">{k}</span>
              <span className="h-1.5 rounded-full bg-(--ui-raised)">
                <span className="block h-full rounded-full bg-(--ui-text)/80" style={{ width: `${v}%` }} />
              </span>
              <span className="text-right font-mono tabular-nums">{v}%</span>
            </div>
          ))}
        </UiCard>
      ))}
    </UiWindow>
  )
}
