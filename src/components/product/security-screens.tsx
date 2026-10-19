import { ArrowsClockwiseIcon, CheckIcon, ClockIcon, ProhibitIcon, SealCheckIcon, UserSwitchIcon } from "@phosphor-icons/react"

import { UiCard, UiLabel, UiPill, UiWindow } from "@/components/product/ui-window"

/**
 * Screens for /platform/security, recreated from the console in its dark
 * style (each takes the window class from the page; content keeps to the
 * part left visible when the window runs past the stage's right edge).
 * Fictional data (Halden Energy, Ria). Transcription failover is In
 * progress on the sheet, so it shows as Soon.
 */

function Ok({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1 text-[11px] text-(--ui-live)">
      <CheckIcon weight="bold" className="size-3" />
      {children}
    </span>
  )
}

function Soon() {
  return <span className="rounded-full border border-(--ui-line) px-2 py-px text-[10.5px] text-(--ui-muted)">Soon</span>
}

/** A label and its value, as a settings row. */
function Setting({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-(--ui-line) py-2 last:border-0">
      <span className="text-(--ui-muted)">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  )
}

/** Always-on failover: primary and backup per layer. */
export function FailoverScreen({ className }: { className: string }) {
  const layers: { layer: string; primary: string; backup: string; soon?: boolean }[] = [
    { layer: "Brain", primary: "Primary model", backup: "Backup model" },
    { layer: "Voice", primary: "ElevenLabs", backup: "Cartesia" },
    { layer: "Speech-to-text", primary: "Deepgram", backup: "Sarvam", soon: true },
  ]
  return (
    <UiWindow className={className} title="Ria · Billing · providers" aside={<UiPill live>Failover on</UiPill>}>
      <UiCard className="gap-0 p-0">
        <div className="grid grid-cols-[7.5rem_1fr_1fr] gap-3 border-b border-(--ui-line) px-3.5 py-2 text-[11px] text-(--ui-muted)">
          <span>Layer</span>
          <span>Primary</span>
          <span>Backup</span>
        </div>
        {layers.map((l) => (
          <div key={l.layer} className="grid grid-cols-[7.5rem_1fr_1fr] items-center gap-3 border-b border-(--ui-line) px-3.5 py-2.5 last:border-0">
            <span className="text-(--ui-muted)">{l.layer}</span>
            <span>{l.primary}</span>
            <span className="flex items-center gap-2">
              {l.backup}
              {l.soon && <Soon />}
            </span>
          </div>
        ))}
      </UiCard>
      <UiCard>
        <div className="flex items-center justify-between">
          <UiLabel>Call · Maya Patel</UiLabel>
          <Ok>Call kept going</Ok>
        </div>
        <div className="flex items-center gap-2 text-[12.5px]">
          <ArrowsClockwiseIcon className="size-3.5 text-(--ui-muted)" />
          <span>Voice switched from ElevenLabs to Cartesia</span>
        </div>
        <span className="text-[11px] text-(--ui-muted)">Automatic · no action needed</span>
      </UiCard>
    </UiWindow>
  )
}

/** Call guardrails, warm handoff and office hours. */
export function GuardrailsScreen({ className }: { className: string }) {
  const hours = [
    ["Mon–Fri", "9:00–18:00"],
    ["Sat", "10:00–14:00"],
    ["Sun", "Closed · take a callback"],
  ]
  return (
    <UiWindow className={className} title="Ria · Billing · guardrails" aside={<UiPill>Saved</UiPill>}>
      <UiCard className="gap-0 py-1.5">
        <span className="pt-1 pb-1.5">
          <UiLabel>Call length</UiLabel>
        </span>
        <Setting label="Max call duration" value="8 min" />
        <Setting label="When time runs out" value="Close gracefully" />
      </UiCard>
      <UiCard>
        <div className="flex items-center gap-2">
          <UserSwitchIcon className="size-4" />
          <span className="text-[13px]">Warm handoff · Billing team</span>
          <span className="ml-auto">
            <Ok>Context passed</Ok>
          </span>
        </div>
        <p className="text-[12.5px] text-(--ui-muted)">Ria: “Maya wants to split her March bill into two payments. Account verified.”</p>
      </UiCard>
      <UiCard className="gap-0 py-1.5">
        <span className="flex items-center gap-2 pt-1 pb-1.5">
          <ClockIcon className="size-3.5 text-(--ui-muted)" />
          <UiLabel>Office hours</UiLabel>
        </span>
        {hours.map(([day, time]) => (
          <Setting key={day} label={day} value={time} />
        ))}
      </UiCard>
    </UiWindow>
  )
}

/** Workspaces and members with roles. */
export function RolesScreen({ className }: { className: string }) {
  const workspaces = [
    ["Halden Energy · Billing", "12 members"],
    ["Halden Energy · Support", "8 members"],
    ["Halden Solar", "5 members"],
    ["Halden West", "4 members"],
  ]
  const members = [
    ["Neha Kapoor", "Owner"],
    ["Tom Becker", "Org Admin"],
    ["Aisha Khan", "Admin"],
  ]
  return (
    <UiWindow className={className} title="Settings · organization" aside={<UiPill>4 workspaces</UiPill>}>
      <UiCard className="gap-0 p-1.5">
        <span className="px-2.5 pt-1.5 pb-1">
          <UiLabel>Workspaces</UiLabel>
        </span>
        {workspaces.map(([name, count], i) => (
          <div key={name} className="flex items-center gap-3 rounded-md px-2.5 py-2">
            <span className="grid size-7 place-items-center rounded-md bg-(--ui-raised) text-[11px] text-(--ui-muted)">{name[0]}</span>
            <span className="text-[13px]">{name}</span>
            <span className="ml-auto text-[11px] text-(--ui-muted)">{count}</span>
            {i === 0 && <UiPill live>Current</UiPill>}
          </div>
        ))}
      </UiCard>
      <UiCard className="gap-0 p-0">
        <div className="grid grid-cols-[1fr_7rem] gap-3 border-b border-(--ui-line) px-3.5 py-2 text-[11px] text-(--ui-muted)">
          <span>Member</span>
          <span>Role</span>
        </div>
        {members.map(([name, role]) => (
          <div key={name} className="grid grid-cols-[1fr_7rem] items-center gap-3 border-b border-(--ui-line) px-3.5 py-2.5 last:border-0">
            <span>{name}</span>
            <span className="text-(--ui-muted)">{role}</span>
          </div>
        ))}
      </UiCard>
    </UiWindow>
  )
}

/** DND shield, calling hours and a verified number, checked before a dial. */
export function TelecomScreen({ className }: { className: string }) {
  const skipped = [
    ["+1 555 0143", "On DND list"],
    ["+1 555 0187", "Opted out"],
  ]
  return (
    <UiWindow className={className} title="Campaign · March payment reminders" aside={<UiPill live>Running</UiPill>}>
      <UiCard className="gap-0 py-1.5">
        <span className="pt-1 pb-1.5">
          <UiLabel>Before every dial</UiLabel>
        </span>
        <Setting label="Calling hours" value="9am–7pm · recipient time" />
        <Setting label="DND shield" value={<Ok>On</Ok>} />
        <Setting label="Caller ID" value="+1 555 0100" />
      </UiCard>
      <UiCard className="gap-0 p-1.5">
        <span className="px-2.5 pt-1.5 pb-1">
          <UiLabel>Skipped automatically</UiLabel>
        </span>
        {skipped.map(([n, why]) => (
          <div key={n} className="flex items-center gap-3 rounded-md px-2.5 py-2">
            <ProhibitIcon className="size-4 text-(--ui-muted)" />
            <span className="font-mono text-[11.5px]">{n}</span>
            <span className="ml-auto text-[11px] text-(--ui-muted)">{why}</span>
          </div>
        ))}
      </UiCard>
      <UiCard>
        <div className="flex items-center gap-3">
          <SealCheckIcon weight="fill" className="size-5 text-(--ok-fg)" />
          <span className="flex flex-col">
            <span className="text-[13px]">Halden Energy</span>
            <span className="text-[11px] text-(--ui-muted)">+1 555 0100 · business verified</span>
          </span>
          <span className="ml-auto">
            <UiPill live>Verified</UiPill>
          </span>
        </div>
      </UiCard>
    </UiWindow>
  )
}
