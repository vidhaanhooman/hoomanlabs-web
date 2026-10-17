import { DeviceMobileIcon, GlobeIcon, PhoneIcon, SealCheckIcon, WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr"
import type { Icon } from "@phosphor-icons/react"

import { UiCard, UiLabel, UiPill, UiWindow } from "@/components/product/ui-window"
import { cn } from "@/lib/utils"

/**
 * Screens for the Voice and Chat sections of /platform/channels, in the
 * site's product UI (each takes the window class from the page and the
 * hovered row as `focus`; content keeps to the part left visible when the
 * window runs past the stage's right edge). Fictional data (Halden Energy);
 * numbers are sample.
 */

const lit = (focus: string, id: string) => focus === "all" || focus === id
const fade = (focus: string, id: string) => cn("transition-opacity duration-300", !lit(focus, id) && "opacity-35")

function Live({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 text-[11px] text-(--ui-live)">
      <span className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  )
}

/* ================================================================== voice */

/** Voice: your numbers (ours and your own carrier), then the calls happening right now on every voice channel. */
export function VoiceScreen({ className, focus }: { className: string; focus: string }) {
  const numbers: { n: string; tag: string; note: string; today: string }[] = [
    { n: "+1 555 0100", tag: "HoomanLabs", note: "Verified", today: "214" },
    { n: "+1 555 0142", tag: "Your carrier", note: "Twilio · BYOT", today: "96" },
  ]
  const calls: { id: string; icon: Icon; who: string; via: string; at: string; state: React.ReactNode }[] = [
    { id: "phone", icon: PhoneIcon, who: "Maya Patel", via: "+1 555 0142", at: "0:08", state: <Live>Talking</Live> },
    { id: "app", icon: DeviceMobileIcon, who: "Omar Haddad", via: "Halden app · iOS", at: "1:42", state: <Live>Talking</Live> },
    { id: "phone", icon: PhoneIcon, who: "Sara Kim", via: "+1 555 0100", at: "3:15", state: <span className="text-[11px] text-(--ui-muted)">Wrapping up</span> },
    { id: "whatsapp", icon: WhatsappLogoIcon, who: "WhatsApp calls", via: "Same agent", at: "", state: <span className="rounded-full border border-dashed border-(--ui-line) px-2 text-[10.5px] text-(--ui-muted)">Coming soon</span> },
  ]
  return (
    <UiWindow className={className} title="Phone · Halden Energy" aside={<UiPill live>3 calls live</UiPill>}>
      <UiCard className={cn("gap-0 p-0", fade(focus, "phone"))}>
        <div className="grid grid-cols-[7rem_1fr_3.5rem] gap-4 border-b border-(--ui-line) px-3.5 py-2 text-[11px] text-(--ui-muted)">
          <span>Number</span>
          <span>Type</span>
          <span className="text-right">Today</span>
        </div>
        {numbers.map((x) => (
          <div key={x.n} className="grid grid-cols-[7rem_1fr_3.5rem] items-center gap-4 border-b border-(--ui-line) px-3.5 py-2.5 last:border-0">
            <span className="font-mono text-[12px]">{x.n}</span>
            <span className="flex items-center gap-2">
              <span className="rounded-md bg-(--ui-raised) px-2 py-0.5 text-[11.5px]">{x.tag}</span>
              <span className="flex items-center gap-1 text-[11.5px] text-(--ui-muted)">
                {x.note === "Verified" && <SealCheckIcon weight="fill" className="size-3 text-[oklch(0.8_0.12_150)]" />}
                {x.note}
              </span>
            </span>
            <span className="text-right font-mono text-[11.5px] text-(--ui-muted) tabular-nums">{x.today}</span>
          </div>
        ))}
      </UiCard>

      <UiCard className="gap-0 p-0">
        <span className="px-3.5 pt-3 pb-1.5">
          <UiLabel>Right now</UiLabel>
        </span>
        {calls.map((x) => (
          <div key={x.who} className={cn("grid grid-cols-[1.25rem_1fr_2.75rem_5.5rem] items-center gap-3 border-t border-(--ui-line) px-3.5 py-2.5", fade(focus, x.id))}>
            <x.icon className="size-3.5 text-(--ui-muted)" />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate">{x.who}</span>
              <span className="truncate text-[11px] text-(--ui-muted)">{x.via}</span>
            </span>
            <span className="font-mono text-[11px] text-(--ui-muted) tabular-nums">{x.at}</span>
            <span className="flex justify-end">{x.state}</span>
          </div>
        ))}
      </UiCard>
    </UiWindow>
  )
}

/* =================================================================== chat */

type Thread = { id: string; icon: Icon; who: string; preview: string; at: string; via: string; lines: { from: "them" | "ria"; text: React.ReactNode }[] }

const THREADS: Thread[] = [
  {
    id: "web",
    icon: GlobeIcon,
    who: "Maya Patel",
    preview: "Sent a meter photo",
    at: "19:42",
    via: "Website chat · halden.example",
    lines: [
      { from: "them", text: "My bill looks far too high this month." },
      { from: "ria", text: "It was based on an estimate. Send a photo of your meter and I'll correct it." },
      {
        from: "ria",
        text: (
          <span className="flex flex-col gap-1">
            <span className="text-[11px] text-(--ui-muted)">March bill · corrected</span>
            <span className="flex items-baseline gap-2">
              <span className="text-[15px] tabular-nums">$62.10</span>
              <span className="text-[11px] text-(--ui-muted) line-through">$86.40</span>
            </span>
            <span className="mt-1 rounded-md bg-(--ui-text) py-1 text-center text-[11.5px] text-(--ui-bg)">Pay $62.10</span>
          </span>
        ),
      },
    ],
  },
  {
    id: "app",
    icon: DeviceMobileIcon,
    who: "Omar Haddad",
    preview: "Can I move my booking?",
    at: "19:31",
    via: "In-app chat · Halden app",
    lines: [
      { from: "them", text: "Can I move my meter visit to Thursday?" },
      { from: "ria", text: "Sure. Thursday has 10:00 or 14:30. Which works?" },
      { from: "them", text: "10:00 please." },
      { from: "ria", text: "Done. You're booked for Thursday at 10:00." },
    ],
  },
  {
    id: "whatsapp",
    icon: WhatsappLogoIcon,
    who: "Priya Shah",
    preview: "Paid, thanks!",
    at: "19:12",
    via: "WhatsApp · +1 555 0100",
    lines: [
      { from: "ria", text: "Hi Priya, your bill of $48.20 is due Friday. Want a payment link?" },
      { from: "them", text: "Yes please." },
      { from: "ria", text: "Here you go: halden.example/pay" },
      { from: "them", text: "Paid, thanks!" },
    ],
  },
]

/** Chat: the inbox, every channel in one list, and the open thread for the hovered channel. */
export function ChatScreen({ className, focus }: { className: string; focus: string }) {
  const open = THREADS.find((t) => t.id === focus) ?? THREADS[0]
  return (
    <UiWindow className={className} title="Inbox · Ria, Billing" aside={<UiPill live>Replies instantly</UiPill>}>
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)] gap-4">
        {/* Conversations, every channel */}
        <UiCard className="gap-0 p-0">
          <span className="px-3.5 pt-3 pb-1.5">
            <UiLabel>Conversations</UiLabel>
          </span>
          {THREADS.map((t) => (
            <div key={t.id} className={cn("grid grid-cols-[1.75rem_1fr] items-center gap-2.5 border-t border-(--ui-line) px-3.5 py-2.5 transition-colors", t.id === open.id ? "bg-(--ui-raised)" : "", fade(focus, t.id))}>
              <span className="grid size-7 place-items-center rounded-full bg-(--ui-raised)">
                <t.icon className="size-3.5" />
              </span>
              <span className="flex min-w-0 flex-col leading-tight">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate">{t.who}</span>
                  <span className="font-mono text-[10.5px] text-(--ui-muted)">{t.at}</span>
                </span>
                <span className="truncate text-[11px] text-(--ui-muted)">{t.preview}</span>
              </span>
            </div>
          ))}
        </UiCard>

        {/* The open thread */}
        <UiCard className="gap-2">
          <span className="flex items-center gap-2 border-b border-(--ui-line) pb-2">
            <open.icon className="size-3.5 text-(--ui-muted)" />
            <span className="flex flex-col leading-tight">
              <span>{open.who}</span>
              <span className="text-[11px] text-(--ui-muted)">{open.via}</span>
            </span>
          </span>
          {open.lines.map((l, i) => (
            <div key={i} className={cn("max-w-[86%] rounded-2xl px-3 py-2 text-[12px] leading-snug", l.from === "them" ? "self-end rounded-br-md bg-(--ui-text) text-(--ui-bg)" : "self-start rounded-bl-md bg-(--ui-raised)")}>
              {l.text}
            </div>
          ))}
        </UiCard>
      </div>
    </UiWindow>
  )
}
