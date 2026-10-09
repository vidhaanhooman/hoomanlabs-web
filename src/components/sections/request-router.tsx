"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { CheckIcon } from "@phosphor-icons/react"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { SectionHeader } from "@/components/layout/section-header"
import { LogoMark } from "@/components/layout/wordmark"
import { routes } from "@/content/demo-router"
import { router as copy } from "@/content/draft"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

const STEP_MS = 2400
const ROW = 48 // px between rows
const REACH = 3 // rows visible above and below the active one (7 total)

const at = (i: number) => routes[((i % routes.length) + routes.length) % routes.length]

/**
 * Many requests in, the right action out. Both reels advance in step; on each
 * step a signal draws from the request into the agent, then out to the action.
 * Pauses off-screen; static under reduced motion.
 */
export function RequestRouter() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const reduce = usePrefersReducedMotion()
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!inView || reduce) return
    const t = setInterval(() => setStep((s) => s + 1), STEP_MS)
    return () => clearInterval(t)
  }, [inView, reduce])

  const active = at(step)

  return (
    <Section id="router">
      <Container>
        <SectionHeader title={copy.title} aside={copy.aside} className="max-w-[40ch]" />

        <Panel ref={ref} className="mt-12 border border-line px-4 py-8 sm:px-8 lg:py-10">
          {/* Screen readers get the current pair, not the moving reels. */}
          <p className="sr-only" aria-live="polite">
            {`“${active.request}” (${active.channel}, ${active.language}) handled with: ${active.action}`}
          </p>

          <div
            aria-hidden
            className="grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-0"
          >
            <Reel step={step} side="request" />

            {/* Hub: connector, agent, connector */}
            <div className="flex items-center justify-center md:w-[24rem] lg:w-[28rem]">
              <Connector side="in" step={step} animate={!reduce} />

              {/* Pill sits exactly on the row centre; the meta line hangs below it. */}
              <div className="relative flex flex-col items-center">
                <span
                  key={reduce ? "static" : step}
                  className="router-hub inline-flex items-center gap-2.5 rounded-full bg-primary py-2 pr-4 pl-2 text-small font-medium text-primary-foreground shadow-[0_8px_24px_-12px_oklch(0.2_0_0/0.6),inset_0_1px_0_oklch(1_0_0/0.12)]"
                >
                  <span className="grid size-7 place-items-center rounded-full bg-primary-foreground/12">
                    <LogoMark className="size-3.5" />
                  </span>
                  HoomanLabs agent
                </span>
                <span
                  key={`meta-${step}`}
                  className="absolute top-full mt-2 whitespace-nowrap text-label text-ink-muted motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500"
                >
                  {active.channel} · {active.language}
                </span>
              </div>

              <Connector side="out" step={step} animate={!reduce} />
            </div>

            <Reel step={step} side="action" />
          </div>
        </Panel>
      </Container>
    </Section>
  )
}

/** Hairline between a reel and the hub, with a node at the reel end. */
function Connector({ side, step, animate }: { side: "in" | "out"; step: number; animate: boolean }) {
  return (
    <span
      className={cn(
        "relative hidden flex-1 items-center md:flex",
        side === "in" ? "mr-3 flex-row" : "ml-3 flex-row-reverse"
      )}
    >
      {/* Node where the line meets the text */}
      <span className="size-2 shrink-0 rounded-full border border-foreground/50 bg-surface" />
      <span className="relative h-px flex-1 overflow-hidden bg-line-strong">
        {animate && (
          <span
            key={step}
            className={cn(
              "router-signal absolute inset-0 origin-left bg-foreground",
              side === "out" && "[animation-delay:450ms]"
            )}
          />
        )}
      </span>
    </span>
  )
}

/** One scrolling column. Rows are keyed by absolute index so they glide, not jump. */
function Reel({ step, side }: { step: number; side: "request" | "action" }) {
  const rows = []
  for (let offset = -REACH; offset <= REACH; offset++) {
    const abs = step + offset
    const item = at(abs)
    const distance = Math.abs(offset)
    const isActive = distance === 0
    rows.push(
      <li
        key={abs}
        className={cn(
          "absolute inset-x-0 top-1/2 flex h-12 items-center whitespace-nowrap transition-[transform,opacity] duration-600 ease-(--ease-in-out)",
          side === "request" ? "justify-center md:justify-end" : "justify-center md:justify-start"
        )}
        style={{
          transform: `translateY(calc(-50% + ${offset * ROW}px))`,
          opacity: isActive ? 1 : Math.max(0, 0.55 - distance * 0.15),
        }}
      >
        <span
          className={cn(
            "text-body-lg transition-[transform,color] duration-600 ease-(--ease-in-out)",
            side === "request" ? "origin-center md:origin-right" : "origin-center md:origin-left",
            isActive ? "scale-110 text-foreground" : "scale-100 text-ink-muted"
          )}
        >
          {side === "request" ? (
            `“${item.request}”`
          ) : isActive ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-background px-3 py-1 text-body shadow-[0_1px_2px_oklch(0.2_0_0/0.06)]">
              <CheckIcon weight="bold" className="size-3.5" aria-hidden />
              {item.action}
            </span>
          ) : (
            <span className="px-3">{item.action}</span>
          )}
        </span>
      </li>
    )
  }

  return (
    <ul
      className="relative h-36 overflow-hidden md:h-[21rem]"
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 22%, black 78%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 22%, black 78%, transparent)",
      }}
    >
      {rows}
    </ul>
  )
}
