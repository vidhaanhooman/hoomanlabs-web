"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { ArrowsClockwiseIcon, CheckIcon, ClockIcon, ProhibitIcon, UsersThreeIcon, WarningIcon } from "@phosphor-icons/react"

import { FROSTED, HERO_CARD, HeroConsole } from "@/components/product-page/hero-console"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * The /platform/security hero visual: failover in action, on the post-call
 * landscape. One wide dark card shows a live call (Maya Patel, Halden
 * Energy) with its provider lanes (speech-to-text, brain, voice) and the
 * transcript below. On view the voice lane slows, switches to a backup voice
 * provider, and the transcript keeps flowing: the caller heard nothing.
 * Above it, three see-through pills for DND shield, calling hours and roles.
 * Plays once; reduced motion shows the final state. Sample data, aria-hidden.
 */

const DESIGN_W = 1100
const DESIGN_H = 540
const BEAT_MS = 1300
const LAST = 4

/** The call's lines, with the beat each one lands on. */
const LINES = [
  { at: 0, who: "Ria", text: "Hi Maya, this is Ria from Halden Energy. Is now a good time to talk about your March bill?" },
  { at: 1, who: "Maya", text: "Yes, go ahead. It looked higher than usual." },
  { at: 3, who: "Ria", text: "It was a colder month, so usage went up. I can split it into two payments if that helps." },
  { at: 4, who: "Maya", text: "That would help, thank you." },
]

/** The supporting pills around the card (sample numbers). */
const PILLS = [
  { icon: ProhibitIcon, label: "DND shield", detail: "blocked 14 numbers today" },
  { icon: ClockIcon, label: "Calling hours", detail: "9am–7pm recipient time" },
  { icon: UsersThreeIcon, label: "Roles", detail: "4 workspaces" },
]

function Wave() {
  return (
    <span className="ui-wave inline-flex h-3 items-end gap-[2px]">
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className="block h-full w-[2.5px] rounded-full bg-(--ui-live)" />
      ))}
    </span>
  )
}

function Healthy({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-(--ui-live)/40 bg-(--ui-live)/12 px-2.5 py-0.5 text-[12px] text-(--ui-text)">
      <CheckIcon weight="bold" className="size-3 text-(--ui-live)" />
      {children}
    </span>
  )
}

/** One provider lane: the layer, who serves it, and its state. */
function Lane({ layer, provider, children }: { layer: string; provider: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="grid h-12 grid-cols-[170px_1fr_auto] items-center gap-4 border-b border-(--ui-line) px-5 last:border-0">
      <span className="text-(--ui-muted)">{layer}</span>
      <span className="flex items-center gap-2">{provider}</span>
      <span className="flex justify-end">{children}</span>
    </div>
  )
}

export function SecurityConsole() {
  const box = useRef<HTMLDivElement>(null)
  const seen = useInView(box, { amount: 0.3, once: true })
  const reduce = usePrefersReducedMotion()
  const [beat, setBeat] = useState(0)

  // One beat at a time: slow, switch, keep talking; then hold.
  useEffect(() => {
    if (!seen || reduce || beat >= LAST) return
    const id = setTimeout(() => setBeat((x) => x + 1), BEAT_MS)
    return () => clearTimeout(id)
  }, [seen, reduce, beat])

  const b = reduce ? LAST : beat
  const slow = b === 2
  const switched = b >= 3
  const lines = LINES.filter((l) => l.at <= b).slice(-3)

  return (
    <HeroConsole image="/art/product/post-call-backdrop.webp" designW={DESIGN_W} designH={DESIGN_H}>
      {/* Transparent stage: ui-dark only for its tokens, so the backdrop shows through. */}
      <div ref={box} aria-hidden className="ui-dark relative size-full" style={{ background: "transparent" }}>
        {/* Supporting pills */}
        <div className="absolute inset-x-0 top-2 flex justify-center gap-2.5">
          {PILLS.map(({ icon: Icon, label, detail }) => (
            <span key={label} className={cn(FROSTED, "flex items-center gap-2 rounded-full py-1.5 pr-3.5 pl-2")}>
              <span className="grid size-6 place-items-center rounded-full bg-white/12">
                <Icon className="size-3.5 text-white/85" />
              </span>
              <span>{label}</span>
              <span className="text-white/60">{detail}</span>
            </span>
          ))}
        </div>

        {/* The live call */}
        <div className={cn(HERO_CARD, "absolute top-[64px] left-[100px] flex w-[900px] flex-col")}>
          <div className="flex h-12 shrink-0 items-center gap-3 border-b border-(--ui-line) px-5">
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-(--ui-live)" />
              Live call
            </span>
            <span className="text-(--ui-muted)">·</span>
            <span>Maya Patel</span>
            <span className="text-(--ui-muted)">·</span>
            <span className="text-(--ui-muted)">Halden Energy</span>
            <span className="ml-auto flex items-center gap-2 text-[12px] text-(--ui-muted)">
              <Wave />
              Ria, Billing
            </span>
          </div>

          {/* Provider lanes */}
          <div className="px-5 pt-4 pb-1">
            <span className="font-mono text-[10.5px] tracking-wide text-(--ui-muted) uppercase">Providers</span>
          </div>
          <div className="mx-5 rounded-lg border border-(--ui-line) bg-(--ui-panel)">
            <Lane layer="Speech-to-text" provider="Deepgram">
              <Healthy>Healthy</Healthy>
            </Lane>
            <Lane layer="Brain" provider="Primary model">
              <Healthy>Healthy</Healthy>
            </Lane>
            <Lane
              layer="Voice"
              provider={
                <>
                  <span className={cn("transition-colors duration-500", switched && "text-(--ui-muted) line-through decoration-(--ui-muted)/60")}>ElevenLabs</span>
                  {switched && (
                    <span className="flex items-center gap-2 motion-safe:animate-[reveal-blur_400ms_var(--ease-out)_both]">
                      <ArrowsClockwiseIcon className="size-3.5 text-(--ui-muted)" />
                      Cartesia
                    </span>
                  )}
                </>
              }
            >
              {slow ? (
                <span className="flex items-center gap-1.5 rounded-full border border-(--warn)/40 bg-(--warn)/10 px-2.5 py-0.5 text-[12px] text-(--ui-text) motion-safe:animate-[reveal-blur_300ms_var(--ease-out)_both]">
                  <WarningIcon weight="fill" className="size-3 text-(--warn-fg)" />
                  Slow (2.4s)
                </span>
              ) : switched ? (
                <span className="motion-safe:animate-[reveal-blur_400ms_var(--ease-out)_both]">
                  <Healthy>Switched to Cartesia · 120 ms</Healthy>
                </span>
              ) : (
                <Healthy>Healthy</Healthy>
              )}
            </Lane>
          </div>

          {/* The call keeps flowing */}
          <div className="flex items-center justify-between px-5 pt-5 pb-2">
            <span className="font-mono text-[10.5px] tracking-wide text-(--ui-muted) uppercase">Transcript</span>
            {switched && <span className="text-[12px] text-(--ui-muted) motion-safe:animate-[reveal-blur_400ms_var(--ease-out)_both]">Caller heard nothing</span>}
          </div>
          <div className="flex h-[112px] flex-col justify-end gap-2 px-5">
            {lines.map((l) => (
              <p key={l.text} className="text-[14px] motion-safe:animate-[reveal-blur_300ms_var(--ease-out)_both]">
                <span className="text-(--ui-muted)">{l.who}: </span>
                {l.text}
              </p>
            ))}
          </div>

          <div className="mt-4 flex h-11 items-center gap-3 border-t border-(--ui-line) px-5 text-[12px] text-(--ui-muted)">
            <span className="flex items-center gap-1.5 text-(--ui-text)">
              <CheckIcon weight="bold" className="size-3 text-(--ui-live)" />0 dropped calls
            </span>
            <span>·</span>
            <span>Failover is automatic</span>
          </div>
        </div>
      </div>
    </HeroConsole>
  )
}
