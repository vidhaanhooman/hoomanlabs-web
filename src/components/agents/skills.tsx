"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import {
  ArrowLeftIcon,
  BracketsCurlyIcon,
  CalendarBlankIcon,
  CheckIcon,
  CircleNotchIcon,
  CreditCardIcon,
  DatabaseIcon,
  LightningIcon,
  PlusIcon,
  SparkleIcon,
  UserIcon,
  type Icon,
} from "@phosphor-icons/react"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { agentsPage as c } from "@/content/pages/agents"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { STAGE } from "@/lib/recipes"
import { cn } from "@/lib/utils"

/**
 * The Skills panel: the five rows beside one diagram. Ria's skills card is
 * wired to the systems its skills reach; the active skill and its system
 * light up. Each row changes what the diagram shows (Skills steps through
 * the connections; Multitasking and Fill-the-silence add the live call over
 * it; Smart responses turns the system's raw reply into a clean line; Skill
 * builder opens a new skill). When on screen it steps through all five once,
 * with a progress line under the active row; a visitor's hover or click ends
 * that. Reduced motion: no autoplay. Light cards on the grey stage, in the
 * homepage's style. Sample data (Ria, Halden Energy).
 */

const STEP_MS = 4800
const CARD = "rounded-xl border border-line bg-background text-small shadow-[0_1px_2px_oklch(0.2_0_0/0.06),0_20px_44px_-22px_oklch(0.2_0.02_260/0.3)]"

const SKILLS: { name: string; system: string; icon: Icon }[] = [
  { name: "take_payment", system: "Payments", icon: CreditCardIcon },
  { name: "book_callback", system: "Google Calendar", icon: CalendarBlankIcon },
  { name: "update_record", system: "Zoho CRM", icon: UserIcon },
  { name: "check_balance", system: "Billing database", icon: DatabaseIcon },
]

type Mode = "skills" | "multi" | "silence" | "smart" | "builder"

function Spin() {
  return <CircleNotchIcon className="size-3.5 shrink-0 text-ink-muted motion-safe:animate-spin" />
}
function Ok() {
  return <CheckIcon weight="bold" className="size-3.5 shrink-0 text-[oklch(0.55_0.13_150)]" />
}

/** A small light card floating over the diagram (the live call, a reply). */
function Bubble({ show, className, children }: { show: boolean; className: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        CARD,
        "absolute z-20 flex flex-col gap-2 p-3 transition-[opacity,translate] duration-500 ease-(--ease-out)",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
        className
      )}
    >
      {children}
    </div>
  )
}

function Diagram({ mode, pick }: { mode: Mode; pick: number }) {
  const running = mode === "multi" || mode === "silence"
  const sel = mode === "skills" ? pick : 0

  return (
    <div aria-hidden className="relative flex w-full max-w-[40rem] items-center gap-0">
      {/* Ria's skills */}
      <div className={cn(CARD, "relative z-10 w-full shrink-0 overflow-hidden sm:w-[17rem]")}>
        <div className="flex items-center gap-3 border-b border-line p-4">
          <span className="grid size-8 place-items-center rounded-full bg-foreground text-label text-background">R</span>
          <span className="flex flex-col">
            <span className="text-body">Ria</span>
            <span className="text-label text-ink-muted">Billing · skills</span>
          </span>
          <span
            className={cn(
              "ml-auto rounded-full border border-line px-2 py-0.5 text-label transition-colors duration-300",
              mode === "builder" ? "border-foreground text-foreground" : "text-ink-muted"
            )}
          >
            {mode === "builder" ? "Used by 4" : "4 active"}
          </span>
        </div>
        <ul className="flex flex-col gap-1.5 p-2">
          {SKILLS.map((s, i) => {
            const on = i === sel && mode !== "builder"
            return (
              <li
                key={s.name}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg border px-2.5 py-2 transition-[border-color,background-color,opacity] duration-300",
                  on ? "border-line-strong bg-surface" : "border-transparent",
                  mode !== "skills" && mode !== "builder" && !on && "opacity-45"
                )}
              >
                <LightningIcon weight="fill" className={cn("size-3.5 shrink-0", on ? "text-[oklch(0.7_0.15_70)]" : "text-ink-muted")} />
                <span className="font-mono text-label">{s.name}</span>
                <span className="ml-auto flex items-center gap-1.5 text-label">
                  {on && running && (
                    <>
                      <Spin />
                      <span className="text-ink-muted">Running</span>
                    </>
                  )}
                  {on && mode === "smart" && (
                    <>
                      <Ok />
                      1.2s
                    </>
                  )}
                </span>
              </li>
            )
          })}
          {/* Skill builder: a new skill, described and written by AI */}
          <li
            className={cn(
              "flex flex-col gap-2 overflow-hidden rounded-lg border border-dashed px-2.5 transition-[max-height,padding,border-color] duration-500 ease-(--ease-out)",
              mode === "builder" ? "max-h-40 border-line-strong py-2.5" : "max-h-9 border-line py-2"
            )}
          >
            <span className="flex items-center gap-2 text-label text-ink-secondary">
              <PlusIcon className="size-3.5" />
              New skill
            </span>
            <span className="rounded-md bg-surface px-2 py-1.5 text-label">&ldquo;Send a payment link by SMS&rdquo;</span>
            <span className="flex items-center gap-1.5 text-label text-ink-secondary">
              <SparkleIcon weight="fill" className="size-3 text-[oklch(0.6_0.15_295)]" />
              AI wrote it
              <span className="ml-auto flex items-center gap-1 text-foreground">
                <Ok />
                Test passed
              </span>
            </span>
          </li>
        </ul>
        {/* Smart responses: the clean line the Hooman uses */}
        <div
          className={cn(
            "flex items-center gap-2 border-t border-line bg-surface px-4 transition-[max-height,padding,opacity] duration-500",
            mode === "smart" ? "max-h-12 py-2.5 opacity-100" : "max-h-0 py-0 opacity-0"
          )}
        >
          <ArrowLeftIcon className="size-3.5 text-ink-muted" />
          <span className="text-label">£86.40 paid · ref PAY-77Q2</span>
        </div>
      </div>

      {/* Wires to the systems (from sm up) */}
      <div className="hidden w-12 shrink-0 sm:block" />
      <div className="relative hidden flex-1 flex-col gap-2 pl-6 sm:flex">
        <span className="pb-1 text-label text-ink-muted">Connected systems</span>
        {/* trunk */}
        <span data-trunk className="absolute top-[3.1rem] bottom-[1.3rem] left-0 w-px bg-line-strong" />
        {/* From Ria's card to the trunk, level with the card's centre. */}
        <span data-wire className="absolute top-1/2 -left-12 h-px w-12 bg-foreground/40" />
        {[...SKILLS, { name: "", system: "Your APIs", icon: BracketsCurlyIcon }].map((s, i) => {
          const on = i === sel && mode !== "builder"
          return (
            <div key={s.system}>
              <div
                className={cn(
                  "relative flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-small transition-[background-color,border-color,box-shadow,opacity] duration-300",
                  on ? "border-line-strong bg-background shadow-[0_8px_20px_-12px_oklch(0.2_0.02_260/0.35)]" : "border-line bg-background/60 opacity-60"
                )}
              >
                <span className={cn("absolute top-1/2 -left-[1.6rem] h-px w-6 transition-colors duration-300", on ? "bg-foreground" : "bg-line-strong")} />
                <s.icon className="size-4 shrink-0 text-ink-secondary" />
                {s.system}
                {on && (mode === "smart" || running) && (
                  <span className="ml-auto text-label text-ink-muted">{mode === "smart" ? "200 OK" : "POST"}</span>
                )}
              </div>
              {/* Smart responses: the raw reply, before it's shaped */}
              {on && (
                <code
                  className={cn(
                    "mt-1.5 block truncate rounded-md bg-foreground/[0.06] px-2 py-1 font-mono text-[11px] text-ink-secondary transition-opacity duration-500",
                    mode === "smart" ? "opacity-100" : "hidden opacity-0"
                  )}
                >
                  {'{"status":"captured","amount":8640,"ref":"PAY-77Q2"}'}
                </code>
              )}
            </div>
          )
        })}
      </div>

      {/* The live call over the diagram: talking while the skill runs, and no dead air */}
      <Bubble show={mode === "multi"} className="-top-28 left-6 w-64 sm:left-[38%]">
        <span className="flex items-center justify-between text-label text-ink-muted">
          Live call · Maya Patel
          <span className="flex items-center gap-1.5 text-foreground">
            <span className="size-1.5 rounded-full bg-[oklch(0.6_0.15_150)]" />
            00:42
          </span>
        </span>
        <span className="text-ink-secondary">Will I get a receipt?</span>
        <span>Yes, by SMS and email.</span>
        <span className="text-label text-ink-muted">Still talking while take_payment runs</span>
      </Bubble>
      <Bubble show={mode === "silence"} className="-top-28 left-6 w-64 sm:left-[38%]">
        <span className="text-label text-ink-muted">Ria · while take_payment runs</span>
        <span>I&apos;m setting that up, one moment.</span>
        <span className="flex h-5 items-center gap-[2px]">
          {Array.from({ length: 36 }, (_, i) => (
            <span key={i} className="w-[2px] flex-1 rounded-full bg-foreground/45" style={{ height: 3 + Math.round(14 * Math.abs(Math.sin(i * 1.3) * Math.cos(i * 0.45))) }} />
          ))}
        </span>
      </Bubble>
    </div>
  )
}

export function SkillsShowcase({ integrationsHref }: { integrationsHref: string }) {
  const { label, title, rows } = c.panels.skills
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { amount: 0.4 })
  const reduce = usePrefersReducedMotion()
  const [active, setActive] = useState(0)
  // Autoplay runs once through every row, then rests on the first; any choice by the visitor ends it.
  const [auto, setAuto] = useState(true)
  const playing = auto && seen && !reduce
  // Within "Skills", step the highlight through each connection.
  const [pick, setPick] = useState(0)

  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => {
      if (active === rows.length - 1) {
        setActive(0)
        setAuto(false)
      } else setActive(active + 1)
    }, STEP_MS)
    return () => clearTimeout(t)
  }, [playing, active, rows.length])

  const mode = rows[active].id as Mode
  useEffect(() => {
    if (mode !== "skills" || reduce) return
    const t = setInterval(() => setPick((p) => (p + 1) % SKILLS.length), 1100)
    return () => clearInterval(t)
  }, [mode, reduce])

  const choose = (i: number) => {
    setAuto(false)
    setActive(i)
  }

  return (
    <Section id="agents-tools" spacing="tight">
      <Container>
        <Panel ref={ref} className="grid items-center gap-8 p-4 sm:p-6 lg:grid-cols-3 lg:gap-0 lg:p-3">
          <div className="flex flex-col gap-5 px-2 pt-4 sm:px-4 lg:order-2 lg:px-10 lg:py-10">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-label text-ink-muted">{label}</span>
              <h2 className="text-h3 font-normal">{title}</h2>
            </div>
            <ul className="flex flex-col border-t border-line">
              {rows.map((r, i) => (
                <li key={r.id} className="border-b border-line">
                  <button
                    type="button"
                    onMouseEnter={() => choose(i)}
                    onFocus={() => choose(i)}
                    onClick={() => choose(i)}
                    aria-pressed={active === i}
                    className={cn("relative flex w-full cursor-pointer flex-col gap-1 py-4 text-left transition-opacity duration-300", active === i ? "opacity-100" : "opacity-50 hover:opacity-80")}
                  >
                    <span className="text-body">{r.title}</span>
                    <span className="text-small text-ink-secondary">{r.body}</span>
                    {/* Progress while autoplaying. */}
                    {active === i && playing && (
                      <span aria-hidden key={`p-${i}`} className="absolute -bottom-px left-0 h-px w-full origin-left bg-foreground" style={{ animation: `progress ${STEP_MS}ms linear both` }} />
                    )}
                  </button>
                </li>
              ))}
            </ul>
            <TextLink href={integrationsHref}>See integrations</TextLink>
          </div>

          <div className={cn(STAGE, "flex items-center justify-center px-5 pt-36 pb-10 sm:px-10 lg:order-1 lg:col-span-2 lg:min-h-[36rem]")}>
            <Diagram mode={mode} pick={pick} />
          </div>
        </Panel>
      </Container>
    </Section>
  )
}
