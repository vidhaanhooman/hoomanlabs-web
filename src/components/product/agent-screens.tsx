import {
  ArrowCounterClockwiseIcon,
  BookOpenIcon,
  BrainIcon,
  CheckIcon,
  ChatCircleIcon,
  DeviceMobileIcon,
  GlobeIcon,
  PhoneIcon,
  PlugsIcon,
  TableIcon,
  WhatsappLogoIcon,
  WrenchIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr"

import { UiCard, UiLabel, UiPill, UiWindow } from "@/components/product/ui-window"
import { cn } from "@/lib/utils"
import { MockAction } from "@/components/product/mock-action"

/**
 * Screens for /platform/agents' Context & actions and Production ready
 * panels, in the site's product UI (each takes the window class from the
 * page and the hovered row as `focus`; content keeps to the part left
 * visible when the window runs past the stage's right edge). Fictional data
 * (Halden Energy, Ria, Maya Patel). Counts and timings are sample.
 */

const fade = (focus: string, id: string) => cn("transition-opacity duration-300", focus !== "all" && focus !== id && "opacity-35")
const ring = (focus: string, id: string) => focus === id && "ring-1 ring-white/20"

function Src({ icon: I, name, note }: { icon: React.ElementType; name: string; note: string }) {
  return (
    <span className="flex items-center gap-2">
      <I className="size-3.5 text-(--ui-muted)" />
      <span>{name}</span>
      <span className="ml-auto text-[11px] text-(--ui-muted)">{note}</span>
    </span>
  )
}

/** Context & actions: everything Ria has for this call, one card per source. */
export function ContextScreen({ className, focus }: { className: string; focus: string }) {
  return (
    <UiWindow className={className} title="Ria · Billing · Context" aside={<UiPill live>Maya Patel · 0:04</UiPill>}>
      <UiCard className={cn("gap-1.5 py-3", fade(focus, "precall"), ring(focus, "precall"))}>
        <Src icon={PlugsIcon} name="Pre-call API" note="before hello · 182ms" />
        <span className="font-mono text-[11px] text-(--ui-muted)">GET /accounts?phone=+15550142</span>
        <span className="flex flex-wrap gap-1.5 font-mono text-[11px]">
          {["account HLD-482913", "balance $62.10", "due 14 Mar"].map((x) => (
            <span key={x} className="rounded bg-(--ui-raised) px-1.5 py-px">
              {x}
            </span>
          ))}
        </span>
      </UiCard>

      <UiCard className={cn("gap-1.5 py-3", fade(focus, "memory"), ring(focus, "memory"))}>
        <Src icon={BrainIcon} name="Memory" note="2 earlier conversations" />
        {[
          ["2 Mar", "Asked about a payment plan; prefers a text with the link."],
          ["14 Feb", "Moved her meter visit to a Thursday morning."],
        ].map(([d, t]) => (
          <span key={d} className="grid grid-cols-[3.5rem_1fr] gap-2 text-[12px]">
            <span className="font-mono text-[11px] text-(--ui-muted)">{d}</span>
            {t}
          </span>
        ))}
      </UiCard>

      <div className="grid grid-cols-2 gap-3">
        <UiCard className={cn("gap-1.5 py-3", fade(focus, "library"), ring(focus, "library"))}>
          <Src icon={BookOpenIcon} name="Library" note="12 docs" />
          <span className="truncate text-[12px] text-(--ui-muted)">Refund policy · Billing FAQ</span>
        </UiCard>
        <UiCard className={cn("gap-1.5 py-3", fade(focus, "tables"), ring(focus, "tables"))}>
          <Src icon={TableIcon} name="Data tables" note="48 rows" />
          <span className="truncate font-mono text-[11px] text-(--ui-muted)">tariffs · Standard $0.21/kWh</span>
        </UiCard>
      </div>

      <UiCard className={cn("gap-2 py-3", fade(focus, "tools"), ring(focus, "tools"))}>
        <Src icon={WrenchIcon} name="Tools" note="3 available" />
        {(
          [
            ["get_payments", "Finds the payments on her account", "Done"],
            ["take_payment", "Takes $62.10 by card", "Running"],
            ["create_ticket", "Raises a ticket for the billing team", "Ready"],
          ] as const
        ).map(([name, what, state]) => (
          <span key={name} className="grid grid-cols-[7.5rem_1fr_auto] items-center gap-3 border-t border-(--ui-line) pt-2 text-[12px]">
            <span className="font-mono text-[11px]">{name}</span>
            <span className="truncate text-(--ui-muted)">{what}</span>
            {state === "Done" ? (
              <span className="flex items-center gap-1 text-[11px] text-(--ui-live)">
                <CheckIcon weight="bold" className="size-3" />
                Done
              </span>
            ) : state === "Running" ? (
              <span className="flex items-center gap-1.5 text-[11px] text-(--ui-live)">
                <span className="size-1.5 animate-pulse rounded-full bg-current" />
                Running
              </span>
            ) : (
              <span className="text-[11px] text-(--ui-muted)">Ready</span>
            )}
          </span>
        ))}
      </UiCard>
    </UiWindow>
  )
}

/* ============================================================ production */

function Versions() {
  const rows: { v: string; note: string; when: string; state: React.ReactNode }[] = [
    { v: "v15", note: "Waits for every digit of a card number", when: "Edited 2h ago", state: <span className="rounded-md bg-(--ui-raised) px-2 py-0.5 text-[11px]">Draft</span> },
    { v: "v14", note: "Shorter opening", when: "Published 12 Mar", state: <UiPill live>Live</UiPill> },
    { v: "v13", note: "Payment plans up to three instalments", when: "2 Mar", state: <span className="text-[11px] text-(--ui-muted)">Previous</span> },
  ]
  return (
    <>
      <UiCard className="gap-0 p-0">
        {rows.map((r) => (
          <div key={r.v} className="grid grid-cols-[2.5rem_1fr_4.5rem] items-center gap-3 border-b border-(--ui-line) px-3.5 py-2.5 last:border-0">
            <span className="font-mono text-[12px]">{r.v}</span>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate">{r.note}</span>
              <span className="text-[11px] text-(--ui-muted)">{r.when}</span>
            </span>
            <span className="flex justify-end">{r.state}</span>
          </div>
        ))}
      </UiCard>
      <span className="flex gap-2 text-[11.5px]">
        <MockAction done="v15 is live" className="rounded-md bg-(--ui-text) px-2.5 py-1 text-(--ui-bg)">
          Publish v15
        </MockAction>
        <span className="rounded-md bg-(--ui-raised) px-2.5 py-1">Compare with live</span>
        <span className="flex items-center gap-1 rounded-md bg-(--ui-raised) px-2.5 py-1">
          <ArrowCounterClockwiseIcon className="size-3" />
          Roll back
        </span>
      </span>
    </>
  )
}

function Reuse() {
  const rows: [React.ElementType, string, string, number][] = [
    [WrenchIcon, "take_payment", "Tool", 6],
    [BookOpenIcon, "Refund policy", "Library", 9],
    [TableIcon, "tariffs", "Data table", 4],
  ]
  return (
    <>
      <UiCard className="gap-0 p-0">
        <div className="grid grid-cols-[1fr_5.5rem_3.5rem] gap-3 border-b border-(--ui-line) px-3.5 py-2 text-[11px] text-(--ui-muted)">
          <span>Shared component</span>
          <span>Type</span>
          <span className="text-right">Agents</span>
        </div>
        {rows.map(([I, name, type, n]) => (
          <div key={name} className="grid grid-cols-[1fr_5.5rem_3.5rem] items-center gap-3 border-b border-(--ui-line) px-3.5 py-2.5 last:border-0">
            <span className="flex items-center gap-2">
              <I className="size-3.5 text-(--ui-muted)" />
              <span className={cn(type !== "Library" && "font-mono text-[12px]")}>{name}</span>
            </span>
            <span className="text-[11.5px] text-(--ui-muted)">{type}</span>
            <span className="text-right font-mono text-[11.5px] tabular-nums">{n}</span>
          </div>
        ))}
      </UiCard>
      <UiCard className="py-3">
        <span className="text-[12px]">Edit take_payment once, and Ria and the 5 other agents using it get the new version.</span>
      </UiCard>
    </>
  )
}

function Channels() {
  const rows: [React.ElementType, string, string, boolean][] = [
    [PhoneIcon, "Phone", "+1 555 0100", true],
    [GlobeIcon, "Website chat", "halden.example", true],
    [DeviceMobileIcon, "In-app", "Halden app · iOS, Android", true],
    [WhatsappLogoIcon, "WhatsApp", "+1 555 0100", true],
    [ChatCircleIcon, "Web call", "Talk button on your site", true],
  ]
  return (
    <UiCard className="gap-0 p-0">
      <span className="px-3.5 pt-3 pb-1.5">
        <UiLabel>Ria · one prompt, one flow</UiLabel>
      </span>
      {rows.map(([I, name, where, on]) => (
        <div key={name} className="grid grid-cols-[1.25rem_1fr_auto] items-center gap-3 border-t border-(--ui-line) px-3.5 py-2.5">
          <I className="size-3.5 text-(--ui-muted)" />
          <span className="flex min-w-0 flex-col leading-tight">
            <span>{name}</span>
            <span className="truncate text-[11px] text-(--ui-muted)">{where}</span>
          </span>
          <span className={cn("flex h-4 w-7 items-center rounded-full p-0.5", on ? "justify-end bg-(--ui-live)" : "bg-(--ui-raised)")}>
            <span className="size-3 rounded-full bg-white" />
          </span>
        </div>
      ))}
    </UiCard>
  )
}

function Testing() {
  const runs: [string, boolean][] = [
    ["Pays in full by card", true],
    ["Reads the card number slowly", true],
    ["Asks for a payment plan", true],
    ["Disputes a late fee, wants a person", false],
  ]
  return (
    <>
      <UiCard className="gap-0 p-0">
        <div className="flex items-center justify-between border-b border-(--ui-line) px-3.5 py-2 text-[11px] text-(--ui-muted)">
          <span>Billing suite · v15 draft</span>
          <span>23 of 24 passed</span>
        </div>
        {runs.map(([name, ok]) => (
          <div key={name} className="flex items-center gap-2 border-b border-(--ui-line) px-3.5 py-2.5 last:border-0">
            {ok ? <CheckIcon weight="bold" className="size-3 text-(--ui-live)" /> : <XIcon weight="bold" className="size-3 text-(--fail)" />}
            <span>{name}</span>
            {!ok && <span className="ml-auto text-[11px] text-(--fail)">Didn&apos;t transfer</span>}
          </div>
        ))}
      </UiCard>
      <span className="text-[11.5px] text-(--ui-muted)">Fix the failing scenario, run again, then publish.</span>
    </>
  )
}

const SCALE = { versions: Versions, reuse: Reuse, channels: Channels, testing: Testing }
const TITLE = { versions: "Ria · Versions", reuse: "Shared · used across agents", channels: "Ria · Channels", testing: "Ria · Tests" }

/** Production ready: versions by default, then the hovered row's screen. */
export function ScaleScreen({ className, focus }: { className: string; focus: string }) {
  const key = (focus in SCALE ? focus : "versions") as keyof typeof SCALE
  const Body = SCALE[key]
  return (
    <UiWindow className={className} title={TITLE[key]}>
      <Body />
    </UiWindow>
  )
}
