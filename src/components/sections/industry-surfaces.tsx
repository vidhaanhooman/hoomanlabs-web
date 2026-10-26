import { CheckIcon, MapPinIcon, MicrophoneIcon, PhoneIcon } from "@phosphor-icons/react/dist/ssr"
import { siGooglecalendar, siHubspot, siShopify, siWhatsapp, type SimpleIcon } from "simple-icons"

import { LogoMark } from "@/components/layout/wordmark"
import { STAGE } from "@/lib/recipes"
import { cn } from "@/lib/utils"

/**
 * The homepage industry cards' visuals, after the "Everywhere you work" row
 * on cursor.com: each industry shown inside the tool it already lives in (a
 * CRM, a store, WhatsApp, a calendar, our own campaigns, an app), with the
 * agent's work visible in it. Built in HTML on the grey stage, in the
 * product-UI tokens (.ui-dark); windows run past the stage edge as if the app
 * is open. Sample data only.
 */

const WIN =
  "ui-dark absolute overflow-hidden rounded-lg border border-white/10 bg-(--ui-bg) text-[12px] leading-snug shadow-[0_1px_2px_oklch(0.2_0_0/0.12),0_12px_28px_-14px_oklch(0.2_0_0/0.45)]"
const MUTED = "text-(--ui-muted)"
const ROW = "border-b border-(--ui-line)"
const OK = "size-3 shrink-0 text-(--ok)"

function Brand({ icon, className = "size-3.5" }: { icon: SimpleIcon; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={{ fill: `#${icon.hex}` }} aria-hidden>
      <path d={icon.path} />
    </svg>
  )
}

/** A window title bar: three dots, and the app's icon and title in the middle. */
function Bar({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("relative flex h-8 items-center px-3", ROW)}>
      <span className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-2 rounded-full bg-white/15" />
        ))}
      </span>
      <span className="absolute inset-x-0 flex items-center justify-center gap-1.5 text-(--ui-muted)">{children}</span>
    </div>
  )
}

/** Our agent, as it appears inside other tools. */
function Agent({ when }: { when: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="grid size-5 place-items-center rounded-[5px] bg-(--ui-text) text-(--ui-bg)">
        <LogoMark className="size-2.5" />
      </span>
      <span className="font-medium">HoomanLabs</span>
      <span className="rounded-[3px] bg-(--ui-raised) px-1 text-[10px] text-(--ui-muted)">APP</span>
      <span className={cn("text-[11px]", MUTED)}>{when}</span>
    </span>
  )
}

function Initials({ children }: { children: string }) {
  return <span className="grid size-6 shrink-0 place-items-center rounded-full bg-(--ui-raised) text-[10px] font-medium">{children}</span>
}

/** Education: a CRM contact, the enquiry and the call that booked a campus visit. */
function Crm() {
  return (
    <div className={cn(WIN, "top-6 -right-10 -bottom-10 left-6")}>
      <Bar>
        <Brand icon={siHubspot} className="size-3" />
        Contacts
      </Bar>
      <div className={cn("flex items-center gap-2.5 px-4 py-3", ROW)}>
        <Initials>AK</Initials>
        <span className="flex flex-col">
          <span className="font-medium">Aarav K.</span>
          <span className={cn("text-[11px]", MUTED)}>Enquiry · B.Des, 2026 intake</span>
        </span>
        <span className="ml-auto mr-10 rounded-full bg-(--ok)/15 px-2 py-0.5 text-[11px] text-(--ok-fg)">Visit booked</span>
      </div>
      <div className="flex flex-col gap-3 px-4 py-3">
        <span className={cn("flex items-center gap-2 text-[11px]", MUTED)}>
          <span className="size-1.5 rounded-full bg-(--ui-muted)" />
          Website form submitted · 10:02
        </span>
        <span className="flex flex-col gap-1.5 rounded-md border border-(--ui-line) bg-(--ui-panel) p-2.5">
          <Agent when="10:03" />
          <span>Called within a minute. Interested in B.Des; campus visit booked for Saturday, 11:00.</span>
          <span className={cn("flex items-center gap-1 text-[11px]", MUTED)}>
            <PhoneIcon className="size-3" />
            Call · 2m 41s
          </span>
        </span>
      </div>
    </div>
  )
}

/** E-commerce: a store order, its address confirmed on a call before it ships. */
function Order() {
  return (
    <div className={cn(WIN, "top-6 -right-10 -bottom-10 left-6")}>
      <Bar>
        <Brand icon={siShopify} className="size-3" />
        Order #1042
      </Bar>
      <div className={cn("flex items-center gap-2.5 px-4 py-3", ROW)}>
        <span className="size-8 shrink-0 rounded-md bg-[oklch(0.35_0.08_265)]" />
        <span className="flex flex-col">
          <span>Indigo cotton kurta</span>
          <span className={cn("text-[11px]", MUTED)}>Size M · Qty 1</span>
        </span>
        <span className="ml-auto mr-10 rounded-full bg-(--ui-raised) px-2 py-0.5 text-[11px]">Unfulfilled</span>
      </div>
      <div className="flex flex-col px-4 py-1">
        {[
          { t: "Order placed", d: "Cash on delivery", m: true },
          { t: "Address confirmed on call", d: "Added landmark: near Metro gate 2", a: true },
          { t: "Ready to ship", d: "Rider pickup at 4 pm", ok: true },
        ].map((e) => (
          <span key={e.t} className="flex gap-2.5 border-l border-(--ui-line) py-2 pl-3">
            <span className="flex flex-col">
              <span className={cn("flex items-center gap-1.5", e.m && MUTED)}>
                {e.ok && <CheckIcon weight="bold" className={OK} />}
                {e.t}
                {e.a && <LogoMark className="size-2.5 text-(--ui-muted)" />}
              </span>
              <span className={cn("text-[11px]", MUTED)}>{e.d}</span>
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

/** Logistics: a WhatsApp thread after the delivery call, the slot and location confirmed. */
function Whatsapp() {
  return (
    <div className={cn(WIN, "top-6 right-8 -bottom-10 left-8")}>
      <Bar>
        <Brand icon={siWhatsapp} className="size-3" />
        Delivery updates
      </Bar>
      <div className="flex flex-col gap-2 p-3">
        <span className="max-w-[85%] self-start rounded-lg rounded-tl-sm bg-(--ui-raised) px-2.5 py-2">
          Your parcel arrives today, 4–6 pm, as confirmed on our call. Share your location for the rider?
          <span className={cn("mt-1 block text-right text-[10px]", MUTED)}>3:12 pm</span>
        </span>
        <span className="flex max-w-[75%] items-center gap-2 self-end rounded-lg rounded-tr-sm bg-[oklch(0.36_0.07_160)] px-2.5 py-2">
          <MapPinIcon weight="fill" className="size-3.5 shrink-0" />
          Live location shared
        </span>
        <span className="flex max-w-[85%] items-center gap-1.5 self-start rounded-lg rounded-tl-sm bg-(--ui-raised) px-2.5 py-2">
          <CheckIcon weight="bold" className={OK} />
          Rider assigned. Pay on delivery.
        </span>
      </div>
    </div>
  )
}

/** Healthcare: a day in the calendar, a home collection added by the agent. */
function Calendar() {
  const hours = ["7 am", "8 am", "9 am", "10 am"]
  return (
    <div className={cn(WIN, "top-6 -right-10 -bottom-10 left-6")}>
      <Bar>
        <Brand icon={siGooglecalendar} className="size-3" />
        Tue · Home collections
      </Bar>
      <div className="relative">
        {hours.map((h) => (
          <div key={h} className={cn("flex h-11 items-start gap-3 px-3 pt-1", ROW)}>
            <span className={cn("w-9 text-right text-[10px]", MUTED)}>{h}</span>
          </div>
        ))}
        <span className="absolute top-1 right-10 left-[3.75rem] flex h-9 flex-col justify-center rounded-md border-l-2 border-(--ui-muted) bg-(--ui-raised) px-2 text-[11px] text-(--ui-muted)">
          Lipid profile · Sector 14
        </span>
        <span className="absolute top-[3.9rem] right-10 left-[3.75rem] flex h-[3.4rem] flex-col justify-center gap-0.5 rounded-md border-l-2 border-(--ok) bg-(--ok)/15 px-2">
          <span className="flex items-center gap-1.5">
            Fasting blood test · Sector 21
            <LogoMark className="size-2.5" />
          </span>
          <span className="text-[11px] text-(--ok-fg)">Booked on call · 8:30 am</span>
        </span>
        <span className="absolute top-[9.6rem] right-10 left-[3.75rem] flex h-9 flex-col justify-center rounded-md border-l-2 border-(--ui-muted) bg-(--ui-raised) px-2 text-[11px] text-(--ui-muted)">
          Thyroid panel · Sector 9
        </span>
      </div>
    </div>
  )
}

/** BFSI: our campaigns view, reminder calls turning dues into payments. */
function Campaign() {
  const rows: { acct: string; status: string; tone: "ok" | "live" | "muted" }[] = [
    { acct: "Loan ••4821", status: "Paid", tone: "ok" },
    { acct: "Loan ••1290", status: "Link sent", tone: "muted" },
    { acct: "Loan ••7734", status: "Calling", tone: "live" },
    { acct: "Loan ••3302", status: "Paid", tone: "ok" },
    { acct: "Loan ••5517", status: "Promised Fri", tone: "muted" },
  ]
  return (
    <div className={cn(WIN, "top-6 -right-10 -bottom-10 left-6")}>
      <Bar>
        <LogoMark className="size-2.5 text-(--ui-text)" />
        EMI reminders
      </Bar>
      <div className={cn("grid grid-cols-3 gap-2 px-4 py-3", ROW)}>
        {[
          ["Reached", "312"],
          ["Paid", "188"],
          ["Promised", "64"],
        ].map(([k, v]) => (
          <span key={k} className="flex flex-col">
            <span className={cn("text-[10px]", MUTED)}>{k}</span>
            <span className="text-[15px] tabular-nums">{v}</span>
          </span>
        ))}
      </div>
      {rows.map((r) => (
        <div key={r.acct} className={cn("flex items-center justify-between py-2 pr-12 pl-4", ROW)}>
          <span className="font-mono text-[11px]">{r.acct}</span>
          <span className={cn("flex items-center gap-1.5 text-[11px]", r.tone !== "ok" && MUTED)}>
            {r.tone === "ok" && <CheckIcon weight="bold" className={OK} />}
            {r.tone === "live" && <span className="size-1.5 animate-pulse rounded-full bg-(--ui-live)" />}
            {r.status}
          </span>
        </div>
      ))}
    </div>
  )
}

/** Consumer AI: a phone, the app's voice assistant mid-conversation. */
function App() {
  const bars = [4, 8, 12, 7, 14, 9, 5, 11, 15, 8, 10, 6, 9, 13, 7, 4, 6, 10]
  return (
    <div className="ui-dark absolute inset-x-[22%] top-6 -bottom-12 flex flex-col gap-2.5 rounded-[26px] border-[5px] border-[oklch(0.3_0_0)] bg-(--ui-bg) p-3 pt-5 text-[12px] leading-snug shadow-[0_12px_28px_-14px_oklch(0.2_0_0/0.45)]">
      <span className={cn("text-center text-[11px]", MUTED)}>Plan &amp; billing</span>
      <span className="self-end rounded-2xl rounded-br-md bg-(--ui-raised) px-3 py-1.5">Switch me to the yearly plan</span>
      <span className="flex max-w-[92%] flex-col gap-1 rounded-2xl rounded-bl-md border border-(--ui-line) px-3 py-1.5">
        Done. You&apos;re on yearly from today.
        <span className="flex items-center gap-1 text-[11px] text-(--ok-fg)">
          <CheckIcon weight="bold" className={OK} />
          Plan updated
        </span>
      </span>
      <span className="mt-auto mb-6 flex items-center gap-2 rounded-full border border-(--ui-line) px-3 py-2">
        <MicrophoneIcon weight="fill" className="size-3.5 shrink-0 text-(--ui-live)" />
        <span className="flex h-4 items-center gap-[2px]">
          {bars.map((h, i) => (
            <span key={i} className="w-[2px] rounded-full bg-(--ui-text)" style={{ height: `${h}px` }} />
          ))}
        </span>
      </span>
    </div>
  )
}

const SURFACE: Record<string, () => React.ReactNode> = {
  education: Crm,
  "e-commerce": Order,
  logistics: Whatsapp,
  healthcare: Calendar,
  bfsi: Campaign,
  "consumer-ai": App,
}

/** The grey stage with the industry's tool on it, cropped at the edges. */
export function IndustrySurface({ slug }: { slug: string }) {
  const Surface = SURFACE[slug]
  return (
    <div aria-hidden className={cn(STAGE, "aspect-[4/3]")}>
      {Surface && <Surface />}
    </div>
  )
}
