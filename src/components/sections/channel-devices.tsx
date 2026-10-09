import { MicrophoneIcon, PhoneDisconnectIcon, MicrophoneSlashIcon } from "@phosphor-icons/react/dist/ssr"

import { TileBackdrop, type Painting } from "@/components/layout/tile-backdrop"
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

/** Painting crop behind each device. */
const BACKDROP: Record<Surface, Painting> = {
  Phone: { src: "/art/listen/listen-morning.png", position: "50% 25%" },
  Web: { src: "/art/backdrops/home-test.png", position: "20% 70%" },
  App: { src: "/art/backdrops/home-build.png", position: "80% 50%" },
  WhatsApp: { src: "/art/listen/listen-midday.png", position: "85% 60%" },
}

const CAPTION: Record<Surface, string> = {
  Phone: "Your numbers or SIP trunk",
  Web: "Widget on your website",
  App: "In-app, iOS and Android",
  WhatsApp: "Business messaging",
}

export function ChannelDevices({ className }: { className?: string }) {
  return (
    <ul className={cn("grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {SURFACES.map((s, i) => (
        <li key={s} className="flex flex-col gap-3">
          <div
            aria-hidden
            className="relative isolate flex h-72 items-end justify-center overflow-hidden rounded-md px-4 pt-6"
          >
            <TileBackdrop
              painting={BACKDROP[s]}
              art={["channels", s.toLowerCase()]}
              slice={{ cols: 4, rows: 1, col: i, row: 0 }}
            />
            <div className="dark flex w-full justify-center text-foreground">
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
function Handset({ children, className }: { children: React.ReactNode; className?: string }) {
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

function Wave({ className }: { className?: string }) {
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

function WhatsAppChat() {
  return (
    <Handset>
      <div className="-mx-3 -mt-3 mb-2 flex items-center gap-2 border-b border-line bg-background px-3 py-2">
        <span className="size-5 rounded-full bg-line" />
        <span className="flex flex-col">
          <span className="font-medium">Halden Energy</span>
          <span className="text-ink-muted">Business account</span>
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="self-start rounded-md bg-background px-2 py-1">Your bill of £86 is due Friday. Pay now?</span>
        <span className="self-end rounded-md bg-foreground px-2 py-1 text-background">Yes please</span>
        <span className="self-start rounded-md bg-background px-2 py-1">
          Done. Receipt sent. <span className="text-ink-muted">✓✓</span>
        </span>
      </div>
    </Handset>
  )
}
