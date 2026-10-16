import { MicrophoneIcon, MicrophoneSlashIcon, PhoneDisconnectIcon, SealCheckIcon } from "@phosphor-icons/react/dist/ssr"

import { Halftone } from "@/components/layout/halftone"
import { channels } from "@/content/platform"
import { cn } from "@/lib/utils"

/**
 * Channels as devices: one mockup per surface (phone call, website widget,
 * in-app, WhatsApp), each tagged with the modes it supports. Availability
 * comes from `channels.modes`, so "coming soon" stays in one place.
 */

type Surface = "Phone" | "Web" | "App" | "WhatsApp"
const SURFACES: Surface[] = ["Phone", "Web", "App", "WhatsApp"]

function modesFor(surface: Surface) {
  return channels.modes.flatMap((m) => {
    const s = m.surfaces.find((x) => x.name === surface)
    return s ? [{ mode: m.name, soon: "soon" in s && !!s.soon, note: s.note }] : []
  })
}

/** Where the dots are densest, and which tiles are graphite vs light (alternating). */
const TILE: Record<Surface, { focus: string; tone: "graphite" | "light" }> = {
  Phone: { focus: "15% 15%", tone: "graphite" },
  Web: { focus: "85% 20%", tone: "light" },
  App: { focus: "20% 85%", tone: "graphite" },
  WhatsApp: { focus: "85% 80%", tone: "light" },
}

const CAPTION: Record<Surface, string> = {
  Phone: "HoomanLabs numbers or your carrier",
  Web: "Widget on your website",
  App: "In-app, iOS and Android",
  WhatsApp: "Business messaging",
}

export function ChannelDevices({ className }: { className?: string }) {
  return (
    <ul className={cn("grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {SURFACES.map((s) => (
        <li key={s} className="flex flex-col gap-3">
          <div
            aria-hidden
            className="relative isolate flex h-72 items-end justify-center overflow-hidden rounded-md border border-line bg-surface px-4 pt-6"
          >
            <Halftone focus={TILE[s].focus} />
            <div
              className={cn(
                "flex w-full justify-center text-foreground",
                TILE[s].tone === "graphite" && "dark graphite"
              )}
            >
              {s === "Phone" && <PhoneCall />}
              {s === "Web" && <WebWidget />}
              {s === "App" && <AppVoice />}
              {s === "WhatsApp" && <WhatsAppChat />}
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-body font-medium">{s}</h4>
            <span className="flex gap-1">
              {modesFor(s).map((m) => (
                <span
                  key={m.mode}
                  className={cn(
                    "rounded-full border px-2 py-px text-label",
                    m.soon ? "border-dashed border-line-strong text-ink-muted" : "border-line-strong text-ink-secondary"
                  )}
                >
                  {m.mode}
                  {m.soon && " · soon"}
                </span>
              ))}
            </span>
          </div>
          <p className="-mt-1 text-small text-ink-secondary">{CAPTION[s]}</p>
        </li>
      ))}
    </ul>
  )
}

/* ------------------------------------------------------------ devices */

/** Phone body cropped at the bottom edge of the tile. */
export function Handset({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex h-[15.5rem] w-40 flex-col rounded-t-[1.75rem] border border-b-0 border-line-strong bg-background p-2 pb-0 shadow-sm",
        className
      )}
    >
      <span className="mx-auto mb-2 h-1 w-10 rounded-full bg-line" />
      <div className="flex flex-1 flex-col overflow-hidden rounded-t-[1.25rem] bg-surface px-3 pt-3 text-[10px] leading-snug">
        {children}
      </div>
    </div>
  )
}

const WAVE = [6, 12, 9, 15, 7, 13, 10, 5, 11, 8]

export function Wave({ className }: { className?: string }) {
  return (
    <span className={cn("flex h-4 items-center gap-[2px]", className)}>
      {WAVE.map((h, i) => (
        <span key={i} className="w-[2px] rounded-full bg-foreground" style={{ height: h }} />
      ))}
    </span>
  )
}

function PhoneCall() {
  return (
    <Handset>
      <div className="flex flex-1 flex-col items-center gap-1 pt-4 text-center">
        <span className="text-ink-muted">Halden Energy</span>
        <span className="text-[12px] font-medium">Billing assistant</span>
        <span className="font-mono text-ink-muted">01:42</span>
        <Wave className="mt-5" />
        <div className="mt-auto mb-4 flex gap-4">
          <span className="grid size-8 place-items-center rounded-full bg-line">
            <MicrophoneSlashIcon className="size-3.5" />
          </span>
          <span className="grid size-8 place-items-center rounded-full bg-foreground text-background">
            <PhoneDisconnectIcon className="size-3.5" />
          </span>
        </div>
      </div>
    </Handset>
  )
}

function WebWidget() {
  return (
    <div className="flex h-[15.5rem] w-full max-w-[17rem] flex-col rounded-t-md border border-b-0 border-line-strong bg-background shadow-sm">
      <div className="flex h-6 items-center gap-1 border-b border-line px-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-1.5 rounded-full bg-line-strong" />
        ))}
        <span className="mx-auto h-3 w-24 rounded-full bg-surface" />
      </div>
      <div className="relative flex-1 p-3">
        <span className="block h-2 w-2/3 rounded-full bg-line" />
        <span className="mt-2 block h-2 w-1/2 rounded-full bg-line" />
        <span className="mt-4 block h-12 w-full rounded bg-surface" />
        <div className="absolute right-2 bottom-0 flex w-36 flex-col gap-1.5 rounded-t-md border border-b-0 border-line-strong bg-background p-2 text-[10px] leading-snug shadow-sm">
          <span className="self-start rounded-md bg-surface px-2 py-1">Hi! Need help with your order?</span>
          <span className="self-end rounded-md bg-foreground px-2 py-1 text-background">Where is it?</span>
          <span className="self-start rounded-md bg-surface px-2 py-1">Out for delivery, arriving today.</span>
          <span className="mt-1 flex items-center gap-1.5 rounded-full border border-line px-2 py-1 text-ink-muted">
            Type or talk
            <MicrophoneIcon className="ml-auto size-3 text-foreground" />
          </span>
        </div>
      </div>
    </div>
  )
}

function AppVoice() {
  return (
    <Handset>
      <span className="font-medium">Help</span>
      <div className="mt-3 flex flex-col gap-1.5">
        <span className="self-end rounded-md bg-foreground px-2 py-1 text-background">Can I move my booking?</span>
        <span className="self-start rounded-md bg-background px-2 py-1">Sure, Thursday or Friday?</span>
      </div>
      <div className="mt-auto mb-4 flex flex-col items-center gap-2">
        <span className="grid size-12 place-items-center rounded-full border border-line-strong bg-background">
          <Wave className="scale-75" />
        </span>
        <span className="text-ink-muted">Listening…</span>
      </div>
    </Handset>
  )
}

/* WhatsApp's own look (light theme): teal header, wallpaper, green outgoing bubbles, blue read ticks. */
export const WA = {
  header: "bg-[#008069] text-white",
  wall: "bg-[#efeae2] bg-[radial-gradient(oklch(0.6_0.02_80/0.18)_1px,transparent_1px)] [background-size:9px_9px]",
  in: "self-start rounded-lg rounded-tl-none bg-white text-[#111b21] shadow-[0_1px_0.5px_oklch(0_0_0/0.13)]",
  out: "self-end rounded-lg rounded-tr-none bg-[#d9fdd3] text-[#111b21] shadow-[0_1px_0.5px_oklch(0_0_0/0.13)]",
}

/* WhatsApp's dark theme, for the Channels demos. */
export const WA_DARK = {
  header: "bg-[#1f2c34] text-[#e9edef]",
  wall: "bg-[#0b141a] bg-[radial-gradient(oklch(1_0_0/0.045)_1px,transparent_1px)] [background-size:9px_9px]",
  in: "self-start rounded-lg rounded-tl-none bg-[#202c33] text-[#e9edef]",
  out: "self-end rounded-lg rounded-tr-none bg-[#005c4b] text-[#e9edef]",
}

export function Ticks() {
  return (
    <svg viewBox="0 0 16 11" className="inline-block h-[7px] w-[10px] fill-[#53bdeb]" aria-hidden>
      <path d="M11.07.65 4.98 7.06 2.43 4.39 1.3 5.47l3.68 3.87 7.2-7.6zM15 .65 8.9 7.06l-.88-.92-1.13 1.08 2.01 2.12 7.2-7.6z" />
    </svg>
  )
}

function Bubble({ side, time, children }: { side: "in" | "out"; time: string; children: React.ReactNode }) {
  return (
    <span className={cn("max-w-[88%] px-2 pt-1 pb-0.5", WA[side])}>
      {children}
      <span className="ml-1.5 inline-flex translate-y-0.5 items-center gap-0.5 align-baseline text-[7.5px] text-[#667781]">
        {time}
        {side === "out" && <Ticks />}
      </span>
    </span>
  )
}

/** A WhatsApp Business chat inside the handset: bill reminder, a quick-reply button, paid. */
export function WhatsAppChat() {
  return (
    <Handset>
      <div className="-mx-3 -mt-3 flex flex-1 flex-col">
        <div className={cn("flex items-center gap-2 px-2.5 py-2", WA.header)}>
          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-white/90 text-[8px] font-medium text-[#008069]">H</span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="flex items-center gap-1 font-medium">
              Halden Energy
              <SealCheckIcon weight="fill" className="size-2.5 text-[#25d366]" />
            </span>
            <span className="text-[8px] text-white/75">Business account</span>
          </span>
        </div>
        <div className={cn("flex flex-1 flex-col gap-1.5 px-2 pt-2", WA.wall)}>
          <span className="self-center rounded-md bg-white/90 px-1.5 py-px text-[7.5px] text-[#54656f]">TODAY</span>
          <span className="flex max-w-[88%] flex-col self-start">
            <Bubble side="in" time="10:42">
              Hi Maya, your bill of $86.40 is due Friday.
            </Bubble>
            <span className="mt-px rounded-lg bg-white py-1 text-center font-medium text-[#008069] shadow-[0_1px_0.5px_oklch(0_0_0/0.13)]">Pay now</span>
          </span>
          <Bubble side="out" time="10:43">
            Pay now
          </Bubble>
          <Bubble side="in" time="10:43">
            Paid. Receipt sent ✓
          </Bubble>
        </div>
      </div>
    </Handset>
  )
}
