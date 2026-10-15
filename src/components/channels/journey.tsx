"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { ChatCircleTextIcon, CheckIcon, DeviceMobileIcon, PhoneIcon, WhatsappLogoIcon, type Icon } from "@phosphor-icons/react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { channelsPage as c } from "@/content/pages/channels"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * "One customer, one memory, on every channel", full width on the
 * console's charcoal canvas: Maya calls about a high bill, sends the meter
 * photo on the website two days later, and pays in the app on Thursday,
 * with WhatsApp shown next as coming soon. Each channel lights up in turn;
 * two light cards float over the canvas edge, as in the hero: what was said
 * on that channel, and what the Hooman remembers so far. Laid out at a
 * design size and scaled to fit. Plays once when on screen, then holds;
 * hovering a channel shows it. Below lg: a list. Reduced motion: finished.
 * Sample data (Maya Patel, Halden Energy).
 */

type Step = {
  id: string
  icon: Icon
  channel: string
  when: string
  title: string
  outcome?: string
  say: [string, string][]
  remember?: string
  soon?: boolean
}

const STEPS: Step[] = [
  {
    id: "phone",
    icon: PhoneIcon,
    channel: "Phone",
    when: "Mon · 10:02",
    title: "Asks about a high bill",
    outcome: "Meter photo requested",
    say: [
      ["Maya", "My bill looks far too high this month."],
      ["Ria", "Let me check. Could you send a photo of your meter?"],
    ],
    remember: "Questioned the March bill (phone)",
  },
  {
    id: "web",
    icon: ChatCircleTextIcon,
    channel: "Website chat",
    when: "Wed · 19:40",
    title: "Sends the meter photo",
    outcome: "Reading corrected",
    say: [
      ["Maya", "Here's the meter photo you asked for."],
      ["Ria", "Thanks, Maya. It was an estimate; I've corrected it to $62.10."],
    ],
    remember: "Meter photo received; bill now $62.10 (web)",
  },
  {
    id: "app",
    icon: DeviceMobileIcon,
    channel: "In-app call",
    when: "Thu · 09:15",
    title: "Pays the corrected bill",
    outcome: "Paid $62.10",
    say: [
      ["Ria", "Hi Maya, picking up from Wednesday: your corrected bill is $62.10. Shall I take it now?"],
      ["Maya", "Yes please."],
    ],
    remember: "Paid $62.10 in the app",
  },
  {
    id: "whatsapp",
    icon: WhatsappLogoIcon,
    channel: "WhatsApp",
    when: "Coming soon",
    title: "Receipt and reminders",
    say: [["Ria", "Next: the same conversation, carried on in WhatsApp."]],
    soon: true,
  },
]
const LIVE = STEPS.filter((s) => !s.soon)
const LAST = LIVE.length - 1
const BEAT_MS = 2600

// Design geometry (canvas units: 1000 × 400).
const VW = 1000
const VH = 400
const NW = 200
const NH = 92
const NY = 80
const nx = (i: number) => 30 + i * 245
const DESIGN_W = 1100
const DESIGN_H = 460

const FLOAT = "absolute z-10 flex flex-col gap-2.5 rounded-lg border border-line bg-background p-4 text-small shadow-[0_1px_2px_oklch(0.2_0_0/0.06),0_16px_40px_-16px_oklch(0.2_0.02_260/0.3)]"

export function Journey() {
  const { label, title, line, rows } = c.journey
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { amount: 0.35, once: true })
  const reduce = usePrefersReducedMotion()
  const [played, setPlayed] = useState(-1)
  const [hover, setHover] = useState<number | null>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => setScale(Math.min(1.12, el.clientWidth / DESIGN_W))
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!seen || reduce || played >= LAST) return
    const t = setTimeout(() => setPlayed((p) => p + 1), played < 0 ? 300 : BEAT_MS)
    return () => clearTimeout(t)
  }, [seen, reduce, played])

  const step = hover ?? (reduce ? LAST : played)
  const cur = STEPS[Math.max(0, step)]
  const memory = LIVE.slice(0, Math.max(1, Math.min(step, LAST) + 1))

  return (
    <Section id="channels-journey">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <span className="font-mono text-label text-ink-muted">{label}</span>
          <h2 className="text-h2 font-normal">{title}</h2>
          <p className="text-body text-ink-secondary">{line}</p>
        </div>

        <div ref={ref} className="relative mt-10 hidden lg:block" style={{ height: DESIGN_H * scale }}>
          <div className="absolute top-0 left-0 px-[55px] py-8" style={{ width: DESIGN_W, transform: `scale(${scale})`, transformOrigin: "0 0" }}>
            <div className="relative aspect-[1000/400] overflow-hidden rounded-xl border border-black/10 bg-[oklch(0.23_0.005_260)] bg-[radial-gradient(circle,oklch(1_0_0/0.09)_1px,transparent_1px)] [background-size:18px_18px] shadow-[0_40px_80px_-40px_oklch(0.2_0.02_260/0.45)]">
              {/* The thread between channels: the same memory carried along */}
              <svg aria-hidden viewBox={`0 0 ${VW} ${VH}`} className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid meet">
                {STEPS.slice(0, -1).map((s, i) => {
                  const x1 = nx(i) + NW
                  const x2 = nx(i + 1)
                  const y = NY + NH / 2
                  const next = STEPS[i + 1]
                  const travelled = !next.soon && step >= i + 1
                  return (
                    <g key={s.id}>
                      <line x1={x1} y1={y} x2={x2} y2={y} stroke="oklch(1 0 0 / 0.24)" strokeWidth={1.3} strokeDasharray={next.soon ? "4 4" : undefined} />
                      <line
                        x1={x1}
                        y1={y}
                        x2={x2}
                        y2={y}
                        stroke="oklch(0.95 0 0)"
                        strokeWidth={1.5}
                        pathLength={1}
                        strokeDasharray="1 1"
                        style={{ strokeDashoffset: travelled ? 0 : 1, transition: "stroke-dashoffset 800ms var(--ease-out)" }}
                      />
                    </g>
                  )
                })}
              </svg>
              <span className="absolute font-mono text-[10.5px] text-white/45" style={{ left: `${(nx(0) / VW) * 100}%`, top: `${((NY - 40) / VH) * 100}%` }}>
                One memory · Maya Patel
              </span>

              {STEPS.map((s, i) => {
                const state = s.soon ? "soon" : i === step ? "active" : i < step ? "done" : "idle"
                return (
                  <div
                    key={s.id}
                    onMouseEnter={() => !s.soon && setHover(i)}
                    onMouseLeave={() => setHover(null)}
                    className={cn(
                      "absolute flex flex-col justify-center gap-2 rounded-xl border bg-[oklch(0.28_0.005_260)] px-4 text-[12px] leading-none text-[oklch(0.95_0_0)] transition-[opacity,border-color,box-shadow] duration-500 ease-(--ease-out)",
                      state === "active" ? "border-white/85 shadow-[0_0_0_3px_oklch(1_0_0/0.12),0_0_40px_-6px_oklch(1_0_0/0.25)]" : "border-white/15",
                      state === "idle" && "opacity-50",
                      state === "soon" && "border-dashed opacity-45"
                    )}
                    style={{ left: `${(nx(i) / VW) * 100}%`, top: `${(NY / VH) * 100}%`, width: `${(NW / VW) * 100}%`, height: `${(NH / VH) * 100}%` }}
                  >
                    <span className="flex items-center gap-2">
                      <s.icon weight="fill" className="size-4 shrink-0 text-[oklch(0.75_0.12_245)]" />
                      <span className="text-[12.5px]">{s.channel}</span>
                      <span className="ml-auto">
                        {state === "done" && <CheckIcon weight="bold" className="size-3 text-[oklch(0.78_0.15_150)]" />}
                        {state === "active" && <span className="block size-1.5 rounded-full bg-[oklch(0.78_0.15_150)] motion-safe:animate-pulse" />}
                      </span>
                    </span>
                    <span className="font-mono text-[10.5px] text-white/50">{s.when}</span>
                    <span className="text-white/80">{s.title}</span>
                  </div>
                )
              })}
              {STEPS.map((s, i) =>
                s.outcome ? (
                  <span
                    key={`o-${s.id}`}
                    className={cn(
                      "absolute rounded-full bg-[oklch(0.74_0.16_150/0.2)] px-2 py-0.5 text-[10.5px] whitespace-nowrap text-[oklch(0.85_0.12_150)] transition-[opacity,translate] duration-500",
                      i <= step ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                    )}
                    style={{ left: `${(nx(i) / VW) * 100}%`, top: `${((NY + NH + 14) / VH) * 100}%` }}
                  >
                    {s.outcome}
                  </span>
                ) : (
                  <span
                    key={`o-${s.id}`}
                    className="absolute rounded-full border border-white/20 px-2 py-0.5 text-[10.5px] text-white/60"
                    style={{ left: `${(nx(i) / VW) * 100}%`, top: `${((NY + NH + 14) / VH) * 100}%` }}
                  >
                    Coming soon
                  </span>
                )
              )}
            </div>

            {/* What the Hooman remembers, bottom left */}
            <div className={cn(FLOAT, "bottom-0 left-[30px] w-[21rem]")}>
              <span className="text-label text-ink-muted">Remembered for Maya Patel</span>
              <ol className="flex flex-col gap-2">
                {memory.map((s, i) => (
                  <li key={s.id} className={cn("flex items-center gap-2", i === memory.length - 1 ? "text-foreground" : "text-ink-secondary")}>
                    <CheckIcon weight="bold" className="size-3.5 shrink-0 text-[oklch(0.55_0.13_150)]" />
                    {s.remember}
                  </li>
                ))}
              </ol>
            </div>

            {/* What was said on this channel, bottom right */}
            <div className={cn(FLOAT, "right-0 bottom-0 w-[23rem]")}>
              <div className="flex items-center justify-between text-label text-ink-muted">
                <span className="flex items-center gap-2">
                  <cur.icon className="size-3.5" />
                  {cur.channel}
                </span>
                <span>{cur.when}</span>
              </div>
              <div key={cur.id} className="flex flex-col gap-1.5 motion-safe:animate-[reveal-blur_400ms_var(--ease-out)_both]">
                {cur.say.map(([who, t]) => (
                  <p key={t} className={who === "Maya" ? "text-ink-secondary" : ""}>
                    <span className="text-ink-muted">{who}: </span>
                    {t}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Below lg: the journey as a list */}
        <ol className="mt-8 flex flex-col gap-3 lg:hidden">
          {STEPS.map((s) => (
            <li key={s.id} className={cn("flex flex-col gap-1.5 rounded-xl bg-[oklch(0.23_0.005_260)] p-4 text-small text-[oklch(0.95_0_0)]", s.soon && "opacity-60")}>
              <span className="flex items-center justify-between font-mono text-label text-white/55">
                {s.channel}
                <span>{s.when}</span>
              </span>
              <span>{s.title}</span>
              {s.outcome && <span className="text-white/60">{s.outcome}</span>}
            </li>
          ))}
        </ol>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rows.map((r) => (
            <li key={r.id} className="flex flex-col gap-1 border-t border-line pt-4">
              <span className="flex items-center gap-2 text-body">
                {r.title}
                {"soon" in r && r.soon && <span className="rounded-full border border-line-strong px-2 py-px text-[11px] text-ink-muted">Coming soon</span>}
              </span>
              <span className="text-small text-ink-secondary">{r.body}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
