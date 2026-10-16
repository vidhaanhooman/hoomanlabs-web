"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { ArrowLeftIcon, ArrowsLeftRightIcon, DotsNineIcon, HeadsetIcon, LockSimpleIcon, MicrophoneSlashIcon, PhoneDisconnectIcon, PhoneIcon, PlusIcon, SealCheckIcon, SpeakerHighIcon, UserIcon, VideoCameraIcon, WhatsappLogoIcon } from "@phosphor-icons/react"

import { MeshStage } from "@/components/layout/art-stage"
import { DemoPanel, Phone } from "@/components/channels/demo-shell"
import { channelsPage as c } from "@/content/pages/channels"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * Voice on /platform/channels, as a live call simulator: Maya's phone on the
 * meadow backdrop, calling Halden Energy. Each source has its own real
 * screen: iOS's call screen (the photo blurred through it) for phone
 * numbers, Halden's app for in-app, all dark, WhatsApp's call screen (soon). Pick how the call comes in
 * (a HoomanLabs number or your own carrier, in-app, or WhatsApp, coming
 * soon); the phone dials, Ria answers, and live captions play. A dark
 * card beside it traces the route: number → carrier → Ria. Plays when on
 * screen and moves through the sources until someone picks one. Reduced
 * motion shows each call answered. Fictional numbers and data.
 */

type Source = "hooman" | "byot" | "app" | "whatsapp"

const SOURCES: Record<Source, { label: string; dial: string; sub: string; route: [string, string][]; lines: [string, string][] }> = {
  hooman: {
    label: "HoomanLabs number",
    dial: "+1 555 0100",
    sub: "Halden Energy",
    route: [
      ["Maya dials", "+1 555 0100"],
      ["Number", "HoomanLabs number · verified"],
      ["Answered by", "Ria · Billing agent"],
    ],
    lines: [
      ["Ria", "Hi, this is Ria from Halden Energy. How can I help?"],
      ["Maya", "I'd like to check my March bill."],
      ["Ria", "Sure, Maya. It's $86.40, due this Friday."],
    ],
  },
  byot: {
    label: "Your carrier (BYOT)",
    dial: "+1 555 0142",
    sub: "Halden Energy",
    route: [
      ["Maya dials", "+1 555 0142"],
      ["Carrier", "Your Twilio account (BYOT)"],
      ["Answered by", "Ria · Billing agent"],
    ],
    lines: [
      ["Ria", "Thanks for calling Halden Energy, you're through to Ria."],
      ["Maya", "Is this still the billing line?"],
      ["Ria", "It is. Same number as always. What can I do for you?"],
    ],
  },
  app: {
    label: "In-app call",
    dial: "Halden app",
    sub: "In-app call",
    route: [
      ["Maya taps", "Call support · Halden app"],
      ["Connects", "In-app voice · iOS"],
      ["Answered by", "Ria · knows she's signed in"],
    ],
    lines: [
      ["Ria", "Hi Maya, I see you're on the payments screen."],
      ["Maya", "Yes, can I pay the March bill?"],
      ["Ria", "Of course. $86.40, shall I take it now?"],
    ],
  },
  whatsapp: {
    label: "WhatsApp call",
    dial: "Halden Energy",
    sub: "WhatsApp voice call",
    route: [
      ["Maya taps", "Call · WhatsApp"],
      ["Connects", "WhatsApp Business calling"],
      ["Answered by", "Ria · same agent"],
    ],
    lines: [],
  },
}

/** Which tab (row) each source sits under. */
const ROW: Record<Source, string> = { hooman: "phone", byot: "phone", app: "app", whatsapp: "whatsapp" }
const ORDER: Source[] = ["hooman", "byot", "app"]

/** The stage photo (warm, analog film). One image serves both themes: dimmed a little in dark mode. */
const STAGE_IMAGE = "/art/product/channels-voice-stage.webp"
export const STAGE_TONE = "dark:[&_img]:brightness-[0.7]"
const BEAT_MS = 1400
const LAST = 4 // 0 dialling · 1 answered · 2–4 captions

export function VoiceDemo() {
  const p = c.panels.voice
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { amount: 0.4, once: true })
  const reduce = usePrefersReducedMotion()
  const [src, setSrc] = useState<Source>("hooman")
  const [held, setHeld] = useState(false)

  const pick = (s: Source) => {
    setHeld(true)
    setSrc(s)
  }
  const pickRow = (row: string) => pick(row === "phone" ? (src === "byot" ? "byot" : "hooman") : (row as Source))

  // Until someone picks, move on to the next source once a call has played.
  const done = () => {
    if (held || reduce) return
    const i = ORDER.indexOf(src)
    if (i >= 0 && i < ORDER.length - 1) setSrc(ORDER[i + 1])
  }

  return (
    <DemoPanel
      id="channels-voice"
      {...p}
      active={ROW[src]}
      onPick={pickRow}
      link="Read about voice channels"
      linkHref="https://docs.hoomanlabs.com"
      extra={(row) =>
        row === "phone" && (
          <div role="radiogroup" aria-label="Phone number" className="inline-flex rounded-full border border-line bg-background p-0.5 text-label">
            {(["hooman", "byot"] as const).map((s) => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={src === s}
                onClick={() => pick(s)}
                className={cn("rounded-full px-3 py-1 whitespace-nowrap transition-colors", src === s ? "bg-foreground text-background" : "text-ink-secondary hover:text-foreground")}
              >
                {s === "hooman" ? "HoomanLabs number" : "Your carrier"}
              </button>
            ))}
          </div>
        )
      }
    >
      <div ref={ref}>
        <MeshStage image={STAGE_IMAGE} className={cn(STAGE_TONE, "flex h-[34rem] flex-col items-center px-4 py-6 sm:h-[36rem]")}>
          {/* A soft lift of light behind the device, so it sits in the scene */}
          <span aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_55%_at_45%_78%,oklch(0.97_0.03_80/0.32),transparent_72%)]" />
          <div className="relative my-auto flex w-full items-center justify-center gap-6">
            {src === "whatsapp" ? (
              <Phone bar="light" screen="bg-[#0b141a]/92 text-white backdrop-blur-2xl">
                <WhatsAppCall />
              </Phone>
            ) : src === "app" ? (
              <Phone bar="light" screen="bg-[#0c0c0e] text-[#f2f2f3]">
                <AppCall key={src} run={seen && !reduce} final={reduce} onDone={done} />
              </Phone>
            ) : (
              <Phone bar="light" screen="bg-black/70 text-white backdrop-blur-2xl">
                <PhoneCall key={src} source={src} run={seen && !reduce} final={reduce} onDone={done} />
              </Phone>
            )}
            <Route key={src} source={src} />
          </div>
        </MeshStage>
      </div>
    </DemoPanel>
  )
}

/* ------------------------------------------------------------------ beats */

/** Dialling → answered → three captions. Remounted per source, so each call starts fresh. */
function useBeats(run: boolean, final: boolean, onDone: () => void) {
  const [beat, setBeat] = useState(0)
  useEffect(() => {
    if (!run) return
    if (beat >= LAST) {
      const t = setTimeout(onDone, 2600)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setBeat((x) => x + 1), beat === 0 ? 1800 : BEAT_MS)
    return () => clearTimeout(t)
  }, [run, beat, onDone])
  return final ? LAST : beat
}

const clock = (b: number) => `0:${String(2 + (b - 1) * 3).padStart(2, "0")}`

/* ---------------------------------------------------- phone (iOS style) */

/** Maya's iPhone calling Halden: iOS's call screen, the stage photo blurred through it. */
function PhoneCall({ source, run, final, onDone }: { source: Source; run: boolean; final: boolean; onDone: () => void }) {
  const s = SOURCES[source]
  const b = useBeats(run, final, onDone)
  const live = b >= 1
  const shown = s.lines.slice(0, Math.max(0, b - 1))
  const keys: [React.ElementType, string][] = [
    [MicrophoneSlashIcon, "mute"],
    [DotsNineIcon, "keypad"],
    [SpeakerHighIcon, "audio"],
    [PlusIcon, "add"],
    [VideoCameraIcon, "FaceTime"],
    [UserIcon, "contacts"],
  ]
  return (
    <div className="flex flex-1 flex-col items-center px-6 pt-14 text-center">
      <span className="text-[13px] text-white/70">{live ? clock(b) : "calling…"}</span>
      <span className="mt-0.5 text-[26px] leading-tight font-light">Halden Energy</span>
      <span className="text-[12.5px] text-white/60">{s.dial}</span>

      {/* Live captions */}
      <div className="mt-4 flex h-[6.5rem] w-full flex-col justify-end gap-1.5 text-left text-[12px] leading-snug">
        {live && shown.length === 0 && <span className="self-center rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] text-white/85">Answered by Ria in 1 ring</span>}
        {shown.slice(-2).map(([who, line], i) => (
          <p key={`${i}-${line}`} className="rounded-2xl bg-white/14 px-3 py-2 motion-safe:animate-[lang-in_400ms_ease-out]">
            <span className="block text-[10px] text-white/55">{who}</span>
            {line}
          </p>
        ))}
      </div>

      <div className="mt-auto grid w-full grid-cols-3 gap-x-3 gap-y-2.5 pt-4 pb-3">
        {keys.map(([I, label]) => (
          <span key={label} className="flex flex-col items-center gap-1">
            <span className="grid size-11 place-items-center rounded-full bg-white/18">
              <I weight="fill" className="size-[18px]" />
            </span>
            <span className="text-[10px] text-white/80">{label}</span>
          </span>
        ))}
      </div>
      <span className="mb-5 grid size-11 place-items-center rounded-full bg-[#ff3b30]">
        <PhoneDisconnectIcon weight="fill" className="size-5" />
      </span>
    </div>
  )
}

/* --------------------------------------------------- in-app (Halden app) */

/** The call inside Halden's own app: light, branded, with the bill it's about. */
function AppCall({ run, final, onDone }: { run: boolean; final: boolean; onDone: () => void }) {
  const s = SOURCES.app
  const b = useBeats(run, final, onDone)
  const live = b >= 1
  const shown = s.lines.slice(0, Math.max(0, b - 1))
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center gap-2.5 border-b border-white/8 bg-[#141416] px-4 pt-12 pb-3">
        <ArrowLeftIcon className="size-4" />
        <span className="text-[14px] font-medium">Support</span>
        <span className="ml-auto text-[11px] text-white/45">Halden</span>
      </div>

      <div className="flex flex-col items-center px-5 pt-5 text-center">
        <span className="relative grid size-16 place-items-center rounded-full bg-[oklch(0.6_0.15_255)] text-[22px] text-white">
          R{!live && <span className="absolute inset-0 rounded-full border-2 border-[oklch(0.6_0.15_255)] motion-safe:animate-ping" />}
        </span>
        <span className="mt-2.5 text-[15px] font-medium">Ria · Halden support</span>
        <span className="mt-0.5 flex items-center gap-1.5 text-[11.5px] text-white/55">
          {live ? (
            <>
              <span className="size-1.5 rounded-full bg-[oklch(0.65_0.16_150)]" />
              On call · {clock(b)}
            </>
          ) : (
            "Connecting…"
          )}
        </span>
      </div>

      <div className="mt-4 flex flex-1 flex-col justify-end gap-1.5 px-4 text-[12px] leading-snug">
        {shown.slice(-2).map(([who, line], i) => (
          <p key={`${i}-${line}`} className={cn("max-w-[88%] rounded-2xl px-3 py-2 motion-safe:animate-[lang-in_400ms_ease-out]", who === "Ria" ? "self-start rounded-bl-md bg-[#1f1f23]" : "self-end rounded-br-md bg-[oklch(0.6_0.15_255)] text-white")}>
            {line}
          </p>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-center gap-5 border-t border-white/8 bg-[#141416] px-4 pt-3 pb-5">
        {[MicrophoneSlashIcon, SpeakerHighIcon].map((I, i) => (
          <span key={i} className="grid size-11 place-items-center rounded-full bg-white/10">
            <I weight="fill" className="size-4.5 text-white/85" />
          </span>
        ))}
        <span className="grid size-11 place-items-center rounded-full bg-[#ff3b30] text-white">
          <PhoneDisconnectIcon weight="fill" className="size-4.5" />
        </span>
      </div>
    </div>
  )
}

/* ----------------------------------------------------- WhatsApp (soon) */

/** WhatsApp's own voice-call screen, marked coming soon. */
function WhatsAppCall() {
  return (
    <div className="flex flex-1 flex-col items-center px-6 pt-14 text-center">
      <span className="flex items-center gap-1 text-[11.5px] text-white/65">
        <LockSimpleIcon weight="fill" className="size-3" />
        End-to-end encrypted
      </span>
      <span className="mt-6 grid size-24 place-items-center rounded-full bg-white/90 text-[30px] font-medium text-[#008069]">H</span>
      <span className="mt-4 flex items-center gap-1.5 text-[22px] leading-tight">
        Halden Energy
        <SealCheckIcon weight="fill" className="size-4 text-[#25d366]" />
      </span>
      <span className="mt-1 text-[13px] text-white/65">WhatsApp voice call</span>
      <span className="mt-5 flex items-center gap-1.5 rounded-full bg-[#25d366]/15 px-3 py-1 text-[12px] text-[#7ee2a8]">
        <WhatsappLogoIcon weight="fill" className="size-3.5" />
        Coming soon
      </span>

      <div className="mt-auto mb-6 flex w-full items-center justify-between rounded-[1.6rem] bg-white/10 px-4 py-3">
        {[SpeakerHighIcon, VideoCameraIcon, MicrophoneSlashIcon].map((I, i) => (
          <span key={i} className="grid size-10 place-items-center rounded-full bg-white/10">
            <I weight="fill" className="size-4.5" />
          </span>
        ))}
        <span className="grid size-10 place-items-center rounded-full bg-[#ff3b30]">
          <PhoneDisconnectIcon weight="fill" className="size-4.5" />
        </span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ route */

const STEP_ICON = [PhoneIcon, ArrowsLeftRightIcon, HeadsetIcon]

/** How the call reaches Ria: a near-black card, like a system widget. */
function Route({ source }: { source: Source }) {
  const s = SOURCES[source]
  const soon = source === "whatsapp"
  return (
    <div className="mt-24 hidden w-[15.5rem] shrink-0 overflow-hidden rounded-2xl bg-[#0e0e10]/92 text-[#f2f2f3] shadow-[0_24px_50px_-22px_oklch(0.1_0.03_50/0.8)] ring-1 ring-white/10 backdrop-blur md:block">
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
        <span className="text-[12.5px] font-medium">How it reaches Ria</span>
        {soon ? (
          <span className="rounded-full bg-white/8 px-2 py-0.5 text-[10.5px] text-white/60">Coming soon</span>
        ) : (
          <span className="flex items-center gap-1 text-[10.5px] text-[oklch(0.78_0.15_150)]">
            <span className="size-1.5 rounded-full bg-current" />
            Live
          </span>
        )}
      </div>
      <ol className="flex flex-col px-4 py-3">
        {s.route.map(([k, v], i) => {
          const I = STEP_ICON[i]
          return (
            <li key={k} className="relative flex gap-3 pb-3.5 last:pb-0 motion-safe:animate-[lang-in_400ms_ease-out]" style={{ animationDelay: `${i * 160}ms`, animationFillMode: "backwards" }}>
              {i < s.route.length - 1 && <span aria-hidden className="absolute top-8 bottom-0.5 left-[13px] w-px bg-white/12" />}
              <span className={cn("grid size-7 shrink-0 place-items-center rounded-full", soon ? "bg-white/6 text-white/35" : i === s.route.length - 1 ? "bg-[oklch(0.74_0.16_150/0.18)] text-[oklch(0.8_0.15_150)]" : "bg-white/8 text-white/80")}>
                <I weight="fill" className="size-3.5" />
              </span>
              <span className="flex min-w-0 flex-col leading-snug">
                <span className="text-[10.5px] text-white/45">{k}</span>
                <span className="text-[12.5px]">{v}</span>
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
