import { AppWindowIcon, CheckIcon, DeviceMobileIcon, SealCheckIcon } from "@phosphor-icons/react/dist/ssr"

import { LogoMark } from "@/components/layout/wordmark"
import { UiCard, UiLabel, UiPill, UiWindow } from "@/components/product/ui-window"

/**
 * Screens for /platform/channels, recreated from the console in its dark
 * style (each takes the window class from the page; content keeps to the
 * part left visible when the window runs past the stage's right edge).
 * Fictional data (Halden Energy).
 */

function Ok({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1 text-[11px] text-(--ui-live)">
      <CheckIcon weight="bold" className="size-3" />
      {children}
    </span>
  )
}

/** Phone lines: numbers and what answers them. */
export function NumbersScreen({ className }: { className: string }) {
  const numbers = [
    ["+1 555 0100", "Billing line", "Ria · Billing", "214 today"],
    ["+1 555 0110", "Bookings", "Asha · Appointments", "96 today"],
    ["+1 555 0120", "After hours", "Ria · Billing", "41 tonight"],
  ]
  return (
    <UiWindow className={className} title="Telephony · numbers" aside={<UiPill>3 numbers</UiPill>}>
      <UiCard className="gap-0 p-0">
        <div className="grid grid-cols-[7rem_6.5rem_1fr_5rem] gap-3 border-b border-(--ui-line) px-3.5 py-2 text-[11px] text-(--ui-muted)">
          <span>Number</span>
          <span>Line</span>
          <span>Answered by</span>
          <span className="text-right">Inbound</span>
        </div>
        {numbers.map(([n, line, who, today]) => (
          <div key={n} className="grid grid-cols-[7rem_6.5rem_1fr_5rem] items-center gap-3 border-b border-(--ui-line) px-3.5 py-2.5 last:border-0">
            <span className="font-mono text-[11.5px]">{n}</span>
            <span>{line}</span>
            <span className="text-(--ui-muted)">{who}</span>
            <span className="text-right font-mono text-[11px] text-(--ui-muted)">{today}</span>
          </div>
        ))}
      </UiCard>
      <UiCard>
        <div className="flex items-center justify-between">
          <UiLabel>Incoming · +1 555 0100</UiLabel>
          <Ok>Answered in 1 ring</Ok>
        </div>
        <p className="text-[12.5px]">Hi, this is Ria from Halden Energy. How can I help with your account tonight?</p>
      </UiCard>
    </UiWindow>
  )
}

/** Bring your own carrier, and a verified number. */
export function CarrierScreen({ className }: { className: string }) {
  const carriers: [string, string][] = [
    ["Exotel", "Connect"],
    ["Ozonetel", "Connect"],
    ["Plivo", "12 numbers imported"],
    ["Twilio", "Connect"],
  ]
  return (
    <UiWindow className={className} title="Telephony · numbers" aside={<UiPill live>HoomanLabs numbers</UiPill>}>
      <UiCard>
        <div className="flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-md bg-white text-black">
            <LogoMark className="h-4 w-auto" />
          </span>
          <span className="flex flex-col">
            <span className="text-[13px]">HoomanLabs numbers</span>
            <span className="text-[11px] text-(--ui-muted)">3 numbers · ready in minutes · no carrier needed</span>
          </span>
          <span className="ml-auto">
            <UiPill live>Default</UiPill>
          </span>
        </div>
      </UiCard>
      <UiCard className="gap-0 p-1.5">
        <span className="px-2.5 pt-1.5 pb-1">
          <UiLabel>Or bring your own carrier</UiLabel>
        </span>
        {carriers.map(([name, state]) => {
          const on = state !== "Connect"
          return (
            <div key={name} className="flex items-center gap-3 rounded-md px-2.5 py-2">
              <span className="grid size-7 place-items-center rounded-md bg-(--ui-raised) text-[11px] text-(--ui-muted)">{name[0]}</span>
              <span className="text-[13px]">{name}</span>
              <span className="ml-auto">{on ? <Ok>{state}</Ok> : <span className="text-[11px] text-(--ui-muted)">{state}</span>}</span>
            </div>
          )
        })}
      </UiCard>
      <UiCard>
        <div className="flex items-center gap-3">
          <SealCheckIcon weight="fill" className="size-5 text-[oklch(0.8_0.12_150)]" />
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

/** Web & chat, and in-app voice: the snippets that add it. */
export function WebAppScreen({ className }: { className: string }) {
  return (
    <UiWindow className={className} title="Deploy · web and app" aside={<UiPill>2 surfaces</UiPill>}>
      <UiCard>
        <div className="flex items-center gap-2">
          <AppWindowIcon className="size-4" />
          <span className="text-[13px]">Website · voice and chat</span>
          <span className="ml-auto">
            <Ok>Live on halden.example</Ok>
          </span>
        </div>
        <pre className="font-mono text-[11.5px] leading-relaxed text-(--ui-text)/85">
          {`<script src="https://widget.hoomanlabs.com/v1.js"
  data-agent="ria-billing" async></script>`}
        </pre>
      </UiCard>
      <UiCard>
        <div className="flex items-center gap-2">
          <DeviceMobileIcon className="size-4" />
          <span className="text-[13px]">In-app voice</span>
          <span className="ml-auto">
            <Ok>Halden app</Ok>
          </span>
        </div>
        <pre className="font-mono text-[11.5px] leading-relaxed text-(--ui-text)/85">
          {`hooman.startCall({
  agent: "ria-billing",
  context: { account: user.account },
})`}
        </pre>
      </UiCard>
    </UiWindow>
  )
}
