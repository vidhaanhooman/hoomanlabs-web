"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { ArrowLeftIcon, CameraIcon, ChatCircleDotsIcon, CheckIcon, GlobeIcon, MicrophoneIcon, PaperPlaneRightIcon, PlusIcon, ReceiptIcon, SealCheckIcon, UserIcon, XIcon } from "@phosphor-icons/react"

import { MeshStage } from "@/components/layout/art-stage"
import { DemoPanel, Phone } from "@/components/channels/demo-shell"
import { STAGE_TONE } from "@/components/channels/voice-demo"
import { Ticks, WA_DARK } from "@/components/sections/channel-devices"
import { channelsPage as c } from "@/content/pages/channels"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * Chat on /platform/channels: one conversation, three surfaces. Maya asks
 * about a high bill, sends a meter photo, gets a corrected bill and pays,
 * typed out with typing dots. Website shows a browser with the widget
 * opening from its launcher; In-app and WhatsApp show the same thread on a
 * phone, each in its own skin. Switching tabs carries the conversation
 * over. Plays when on screen; until someone picks, it moves from the
 * website to the app to WhatsApp. Reduced motion shows the whole thread.
 * Fictional data (Maya Patel, Halden Energy).
 */

type Surface = "web" | "app" | "whatsapp"
type Msg = { from: "ria" | "maya"; kind?: "photo" | "bill"; text?: string; time: string }

const THREAD: Msg[] = [
  { from: "ria", text: "Hi Maya, how can I help today?", time: "19:40" },
  { from: "maya", text: "My bill looks far too high this month.", time: "19:40" },
  { from: "ria", text: "It was based on an estimate. Send a photo of your meter and I'll correct it.", time: "19:41" },
  { from: "maya", kind: "photo", time: "19:42" },
  { from: "ria", kind: "bill", time: "19:42" },
  { from: "maya", text: "Paid, thanks!", time: "19:43" },
]
/** Steps: show a message, or Ria typing before her next one. */
const SEQ = THREAD.flatMap((m, i) => (m.from === "ria" && i > 0 ? ["typing", i] : [i])) as ("typing" | number)[]
const LAST = SEQ.length - 1
const STEP_MS = 1100
const ORDER: Surface[] = ["web", "app", "whatsapp"]

/** The stage photo (warm, analog film; dimmed in dark mode, see STAGE_TONE). */
const STAGE_IMAGE = "/art/product/channels-chat-stage.webp"

export function ChatDemo() {
  const p = c.panels.chat
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { amount: 0.4, once: true })
  const reduce = usePrefersReducedMotion()
  const [surface, setSurface] = useState<Surface>("web")
  const [held, setHeld] = useState(false)
  const [step, setStep] = useState(-1)
  const s = reduce ? LAST : step

  useEffect(() => {
    if (!seen || reduce) return
    if (step < LAST) {
      const t = setTimeout(() => setStep((x) => x + 1), step < 0 ? 700 : STEP_MS)
      return () => clearTimeout(t)
    }
    if (held) return
    // Thread done: carry it over to the next surface, once each.
    const i = ORDER.indexOf(surface)
    if (i >= ORDER.length - 1) return
    const t = setTimeout(() => setSurface(ORDER[i + 1]), 2600)
    return () => clearTimeout(t)
  }, [seen, reduce, step, held, surface])

  const cur = s < 0 ? null : SEQ[s]
  const count = s < 0 ? 0 : (SEQ.slice(0, s + 1).filter((x) => x !== "typing").length)
  const typing = cur === "typing"
  const msgs = THREAD.slice(0, count)

  const pick = (id: string) => {
    setHeld(true)
    setSurface(id as Surface)
  }

  return (
    <DemoPanel id="channels-chat" {...p} active={surface} onPick={pick} media="start" link="Read about chat channels" linkHref="https://docs.hoomanlabs.com">
      <div ref={ref} aria-hidden>
        <MeshStage image={STAGE_IMAGE} className={cn(STAGE_TONE, "relative flex h-[34rem] items-end justify-center px-4 pt-6 sm:h-[36rem]")}>
          {/* A soft lift of light behind the device, so it sits in the scene */}
          <span aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_50%_80%,oklch(0.97_0.03_80/0.32),transparent_72%)]" />
          <div key={surface} className={cn("relative flex w-full items-center justify-center gap-6 motion-safe:animate-[lang-in_450ms_ease-out]", surface === "web" ? "self-end" : "self-center")}>
            {surface !== "web" && <Memory msgs={msgs} />}
            {surface === "web" && <Website msgs={msgs} typing={typing} open={s >= 0} />}
            {surface === "app" && (
              <Phone bar="light" screen="bg-[#0c0c0e] text-[#f2f2f3]">
                <AppThread msgs={msgs} typing={typing} />
              </Phone>
            )}
            {surface === "whatsapp" && (
              <Phone bar="light" screen={cn(WA_DARK.wall, "text-[#e9edef]")}>
                <WhatsAppThread msgs={msgs} typing={typing} />
              </Phone>
            )}
          </div>
        </MeshStage>
      </div>
    </DemoPanel>
  )
}

/* ---------------------------------------------------------------- parts */

/**
 * "Ria remembers": the dark card beside the phone (mirroring Voice's route
 * card), filling in as the thread plays, so it's clear the same
 * conversation carried over from the website.
 */
function Memory({ msgs }: { msgs: Msg[] }) {
  const n = msgs.length
  const rows: [React.ElementType, string, string, boolean][] = [
    [UserIcon, "Customer", "Maya Patel · HLD-482913", true],
    [GlobeIcon, "Started on", "Website chat · 19:40", true],
    [CameraIcon, "Meter photo", "Received · 04812 kWh", n >= 4],
    [ReceiptIcon, "March bill", "Corrected to $62.10", n >= 5],
    [CheckIcon, "Payment", "Paid $62.10", n >= 6],
  ]
  return (
    <div className="mt-24 hidden w-[15.5rem] shrink-0 overflow-hidden rounded-2xl bg-[#0e0e10]/92 text-[#f2f2f3] shadow-[0_24px_50px_-22px_oklch(0.1_0.03_50/0.8)] ring-1 ring-white/10 backdrop-blur md:block">
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
        <span className="text-[12.5px] font-medium">Ria remembers</span>
        <span className="text-[10.5px] text-white/50">Same thread</span>
      </div>
      <ol className="flex flex-col px-4 py-3">
        {rows.map(([I, k, v, on], i) => (
          <li key={k} className={cn("relative flex gap-3 pb-3.5 transition-opacity duration-500 last:pb-0", on ? "opacity-100" : "opacity-35")}>
            {i < rows.length - 1 && <span aria-hidden className="absolute top-8 bottom-0.5 left-[13px] w-px bg-white/12" />}
            <span className={cn("grid size-7 shrink-0 place-items-center rounded-full", on && i === rows.length - 1 ? "bg-[oklch(0.74_0.16_150/0.18)] text-[oklch(0.8_0.15_150)]" : "bg-white/8 text-white/80")}>
              <I weight="fill" className="size-3.5" />
            </span>
            <span className="flex min-w-0 flex-col leading-snug">
              <span className="text-[10.5px] text-white/45">{k}</span>
              <span className="text-[12.5px]">{on ? v : "—"}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Dots({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-1 px-3 py-2.5", className)}>
      {[0, 1, 2].map((i) => (
        <span key={i} className="size-1.5 rounded-full bg-current opacity-50 motion-safe:animate-bounce" style={{ animationDelay: `${i * 140}ms` }} />
      ))}
    </span>
  )
}

/** The meter photo Maya sends: a drawn meter face. */
function Meter() {
  return (
    <span className="flex h-24 w-40 flex-col items-center justify-center gap-1.5 rounded-md bg-[linear-gradient(135deg,oklch(0.36_0.015_250),oklch(0.22_0.01_250))] text-white ring-1 ring-white/10">
      <span className="text-[9px] tracking-widest text-white/60">kWh</span>
      <span className="flex gap-0.5 font-mono text-[15px]">
        {"04812".split("").map((d, i) => (
          <span key={i} className="rounded-[3px] bg-black/50 px-1">
            {d}
          </span>
        ))}
      </span>
    </span>
  )
}

/** Ria's corrected-bill card with a pay button. */
function Bill({ paid, button }: { paid: boolean; button: string }) {
  return (
    <span className="flex w-full flex-col gap-1">
      <span className="text-[11px] opacity-60">March bill · corrected</span>
      <span className="flex items-baseline gap-2">
        <span className="text-[18px] leading-tight tabular-nums">$62.10</span>
        <span className="text-[11px] tabular-nums line-through opacity-50">$86.40</span>
      </span>
      <span className={cn("mt-1.5 rounded-md py-1.5 text-center text-[12px] font-medium", button, paid && "opacity-60")}>{paid ? "Paid ✓" : "Pay $62.10"}</span>
    </span>
  )
}

/* -------------------------------------------------------------- website */

function Website({ msgs, typing, open }: { msgs: Msg[]; typing: boolean; open: boolean }) {
  const paid = msgs.length >= THREAD.length
  return (
    <div className="flex h-[30rem] w-full max-w-[40rem] flex-col overflow-hidden rounded-t-xl border border-b-0 border-white/10 bg-[#0e0e10] text-[#f2f2f3] shadow-[0_40px_80px_-30px_oklch(0.12_0.03_40/0.75)]">
      <div className="flex h-9 shrink-0 items-center gap-2 border-b border-white/8 bg-[#18181b] px-3">
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2 rounded-full bg-white/15" />
          ))}
        </span>
        <span className="mx-auto rounded-full bg-white/6 px-4 py-0.5 text-[11px] text-white/50">halden.example/account</span>
      </div>
      <div className="relative flex-1">
        {/* The page */}
        <div className="flex flex-col gap-3 p-6">
          <span className="text-[11px] text-white/45">Halden Energy</span>
          <span className="text-[20px] leading-tight">Your account</span>
          <div className="flex w-[42%] flex-col gap-0.5 rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <span className="text-[11px] text-white/45">March bill</span>
            <span className="text-[17px] tabular-nums">{paid ? "$0.00" : "$86.40"}</span>
            <span className="text-[11px] text-white/45">{paid ? "Paid, thank you" : "Due Friday"}</span>
          </div>
          <span className="mt-2 h-2 w-[38%] rounded-full bg-white/8" />
          <span className="h-2 w-[28%] rounded-full bg-white/8" />
          <span className="h-2 w-[33%] rounded-full bg-white/8" />
        </div>

        {/* Widget, opening from its launcher */}
        <div
          className={cn(
            "absolute right-4 bottom-0 flex w-[min(18rem,calc(100%-2rem))] origin-bottom-right flex-col overflow-hidden rounded-t-xl border border-b-0 border-white/12 bg-[#151517] shadow-[0_16px_40px_-12px_oklch(0_0_0/0.6)] transition-[opacity,scale] duration-500",
            open ? "scale-100 opacity-100" : "scale-90 opacity-0"
          )}
        >
          <div className="flex items-center gap-2 border-b border-white/8 bg-[#1c1c1f] px-3 py-2.5">
            <span className="grid size-7 place-items-center rounded-full bg-white text-[11px] text-black">R</span>
            <span className="flex flex-col leading-tight">
              <span className="text-[12.5px]">Ria · Halden Energy</span>
              <span className="flex items-center gap-1 text-[10.5px] text-white/55">
                <span className="size-1.5 rounded-full bg-[oklch(0.74_0.16_150)]" />
                Replies instantly
              </span>
            </span>
            <XIcon className="ml-auto size-3.5 text-white/50" />
          </div>
          <Thread
            msgs={msgs}
            typing={typing}
            className="h-[19rem] p-3"
            ria="rounded-2xl rounded-bl-md bg-[#26262a]"
            maya="rounded-2xl rounded-br-md bg-white text-black"
            photo="bg-transparent p-0"
            button="bg-white text-black"
          />
          <div className="flex items-center gap-2 border-t border-white/8 px-3 py-2.5 text-[12px] text-white/40">
            <PlusIcon className="size-3.5" />
            Type a message…
            <PaperPlaneRightIcon weight="fill" className="ml-auto size-4 text-white" />
          </div>
        </div>
        {!open && (
          <span className="absolute right-6 bottom-6 grid size-12 place-items-center rounded-full bg-white text-black shadow-lg">
            <ChatCircleDotsIcon weight="fill" className="size-6" />
          </span>
        )}
      </div>
    </div>
  )
}

/** The message list, styled per surface. Keeps the newest messages in view. */
function Thread({
  msgs,
  typing,
  className,
  ria,
  maya,
  button,
  photo,
  meta,
}: {
  msgs: Msg[]
  typing: boolean
  className?: string
  ria: string
  maya: string
  button: string
  /** Overrides for the photo bubble (e.g. no frame on the website). */
  photo?: string
  meta?: (m: Msg) => React.ReactNode
}) {
  const paid = msgs.length >= THREAD.length
  return (
    <div
      className={cn("flex flex-col justify-end gap-1.5 overflow-hidden text-[12.5px] leading-snug", className)}
      style={{ maskImage: "linear-gradient(to bottom, transparent, black 2.5rem)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 2.5rem)" }}
    >
      {msgs.map((m, i) => (
        <span key={i} className={cn("max-w-[82%] px-3 py-2 motion-safe:animate-[lang-in_350ms_ease-out]", m.from === "ria" ? cn("self-start", ria) : cn("self-end", maya), m.kind === "photo" && cn("p-1", photo), m.kind === "bill" && "w-[78%]")}>
          {m.kind === "photo" ? <Meter /> : m.kind === "bill" ? <Bill paid={paid} button={button} /> : m.text}
          {meta?.(m)}
        </span>
      ))}
      {typing && <Dots className={cn("self-start", ria)} />}
    </div>
  )
}

/* ------------------------------------------------------------------ app */

function AppThread({ msgs, typing }: { msgs: Msg[]; typing: boolean }) {
  return (
    <>
      <div className="flex shrink-0 items-center gap-2.5 border-b border-white/8 bg-[#141416] px-4 pt-11 pb-3">
        <ArrowLeftIcon className="size-4" />
        <span className="grid size-8 place-items-center rounded-full bg-[oklch(0.6_0.15_255)] text-[12px] text-white">H</span>
        <span className="flex flex-col leading-tight">
          <span className="text-[13px] font-medium">Halden support</span>
          <span className="text-[10.5px] text-white/50">Ria · usually instant</span>
        </span>
      </div>
      <Thread
        msgs={msgs}
        typing={typing}
        className="flex-1 px-3 pb-2"
        ria="rounded-2xl rounded-bl-md bg-[#1f1f23]"
        maya="rounded-2xl rounded-br-md bg-[oklch(0.6_0.15_255)] text-white"
        button="bg-[oklch(0.6_0.15_255)] text-white"
      />
      <div className="flex shrink-0 items-center gap-2 border-t border-white/8 bg-[#141416] px-3 py-3 text-[12px] text-white/40">
        <CameraIcon className="size-4" />
        <span className="flex-1 rounded-full bg-white/8 px-3 py-1.5">Message</span>
        <MicrophoneIcon className="size-4" />
      </div>
    </>
  )
}

/* ------------------------------------------------------------- whatsapp */

function WhatsAppThread({ msgs, typing }: { msgs: Msg[]; typing: boolean }) {
  return (
    <>
      <div className={cn("flex shrink-0 items-center gap-2.5 px-3 pt-11 pb-2.5", WA_DARK.header)}>
        <ArrowLeftIcon className="size-4" />
        <span className="grid size-8 place-items-center rounded-full bg-[#00a884] text-[12px] font-medium text-white">H</span>
        <span className="flex flex-col leading-tight">
          <span className="flex items-center gap-1 text-[13px] font-medium">
            Halden Energy
            <SealCheckIcon weight="fill" className="size-3.5 text-[#25d366]" />
          </span>
          <span className="text-[10.5px] text-[#8696a0]">{typing ? "typing…" : "Business account"}</span>
        </span>
      </div>
      <Thread
        msgs={msgs}
        typing={typing}
        className="flex-1 px-2.5 pb-2"
        ria={cn(WA_DARK.in, "px-2.5 py-1.5")}
        maya={cn(WA_DARK.out, "px-2.5 py-1.5")}
        button="bg-[#2a3942] text-[#00a884]"
        meta={(m) => (
          <span className="ml-1.5 inline-flex translate-y-0.5 items-center gap-0.5 align-baseline text-[9px] text-[#8696a0]">
            {m.time}
            {m.from === "maya" && <Ticks />}
          </span>
        )}
      />
      <div className="flex shrink-0 items-center gap-2 bg-[#0b141a] px-2 py-2.5">
        <span className="flex flex-1 items-center gap-2 rounded-full bg-[#1f2c34] px-3 py-2 text-[12px] text-[#8696a0]">
          Message
          <CameraIcon className="ml-auto size-4" />
        </span>
        <span className="grid size-9 place-items-center rounded-full bg-[#00a884] text-[#0b141a]">
          <MicrophoneIcon weight="fill" className="size-4" />
        </span>
      </div>
    </>
  )
}
