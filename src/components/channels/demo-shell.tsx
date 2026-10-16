"use client"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import type { SectionId } from "@/content/sections"
import { cn } from "@/lib/utils"

/**
 * The split panel for the Voice and Chat demos on /platform/channels. It
 * looks like the homepage's ProductPanel (copy and rows on one side, a
 * stage on the other), but the rows are tabs: picking one switches what
 * plays on the stage.
 */

type Row = { id: string; title: string; body: string }

export function DemoPanel({
  id,
  label,
  title,
  rows,
  active,
  onPick,
  link,
  linkHref,
  media = "end",
  extra,
  children,
}: {
  id: SectionId
  label: string
  title: string
  rows: Row[]
  active: string
  onPick: (id: string) => void
  link: string
  linkHref: string
  media?: "start" | "end"
  /** Extra controls under a row while it is selected (e.g. the phone's number source). */
  extra?: (rowId: string) => React.ReactNode
  children: React.ReactNode
}) {
  return (
    <Section id={id} spacing="tight">
      <Container>
        <Panel className="grid items-center gap-8 p-4 sm:p-6 lg:grid-cols-3 lg:gap-0 lg:p-3">
          <div className={cn("flex flex-col gap-5 px-2 pt-4 sm:px-4 lg:px-10 lg:py-10", media === "start" && "lg:order-2")}>
            <div className="flex flex-col gap-2">
              <span className="font-mono text-label text-ink-muted">{label}</span>
              <h2 className="text-h3 font-normal">{title}</h2>
            </div>
            <div role="tablist" aria-label={label} className="flex flex-col border-t border-line">
              {rows.map((r) => {
                const on = r.id === active
                const more = on ? extra?.(r.id) : null
                return (
                  <div key={r.id} className={cn("relative border-b border-line py-4 pl-4 transition-opacity duration-300", on ? "opacity-100" : "opacity-50 hover:opacity-80")}>
                    <span aria-hidden className={cn("absolute top-4 bottom-4 left-0 w-px transition-colors", on ? "bg-foreground" : "bg-transparent")} />
                    <button role="tab" type="button" aria-selected={on} onClick={() => onPick(r.id)} className="flex w-full flex-col gap-1 rounded-sm text-left outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-4 focus-visible:ring-offset-surface">
                      <span className="text-body">{r.title}</span>
                      <span className="text-small text-ink-secondary">{r.body}</span>
                    </button>
                    {more && <div className="mt-3">{more}</div>}
                  </div>
                )
              })}
            </div>
            <TextLink href={linkHref}>{link}</TextLink>
          </div>
          <div className={cn("lg:col-span-2", media === "start" && "lg:order-1")}>{children}</div>
        </Panel>
      </Container>
    </Section>
  )
}

/* Design size of the phone (an iPhone 15 Pro at ~19.5:9), scaled to fit the stage. */
const PW = 280
const PH = 584

/**
 * An iPhone, shown whole and floating: a polished titanium edge (metal
 * gradient), a thin black bezel, side buttons, the Dynamic Island, a status
 * bar, a faint glass reflection and a soft contact shadow. It is laid out
 * at a design size and scaled with --s (smaller on phones), so screens keep
 * their layout. The screen is transparent where its class allows, so a
 * backdrop-blur screen sees the stage photo, like iOS's call screen.
 * `bar` sets the status bar ink for the screen behind it.
 */
export function Phone({ className, screen, bar = "dark", children }: { className?: string; screen?: string; bar?: "dark" | "light"; children: React.ReactNode }) {
  return (
    <div
      className={cn("relative shrink-0 [--s:0.78] sm:[--s:0.86]", className)}
      style={{
        width: `calc(${PW}px * var(--s))`,
        height: `calc(${PH}px * var(--s))`,
      }}
    >
      {/* Contact shadow on the ground */}
      <span aria-hidden className="absolute inset-x-[12%] -bottom-3 h-6 rounded-[50%] bg-[oklch(0.15_0.03_50/0.45)] blur-xl" />
      <div className="absolute top-0 left-0 origin-top-left" style={{ width: PW, height: PH, transform: "scale(var(--s))" }}>
        {/* Side buttons: action + volume (left), power (right) */}
        {[
          ["left", 104, 26],
          ["left", 150, 50],
          ["left", 210, 50],
          ["right", 170, 78],
        ].map(([side, top, h]) => (
          <span
            key={`${side}${top}`}
            aria-hidden
            className={cn("absolute w-[4px] bg-[linear-gradient(90deg,#3a3a3c,#8e8e93,#3a3a3c)]", side === "left" ? "-left-[3px] rounded-l-[2px]" : "-right-[3px] rounded-r-[2px]")}
            style={{ top: top as number, height: h as number }}
          />
        ))}
        {/* Titanium edge */}
        <div className="size-full rounded-[3.25rem] bg-[linear-gradient(140deg,#9a9a9f_0%,#4a4a4e_18%,#2b2b2e_45%,#5a5a5f_75%,#a3a3a8_100%)] p-[2.5px] shadow-[0_40px_70px_-30px_oklch(0.18_0.04_50/0.75),0_12px_24px_-12px_oklch(0.18_0.03_50/0.5)]">
          {/* Black bezel */}
          <div className="size-full rounded-[3.1rem] bg-black p-[9px]">
            <div className={cn("relative flex size-full flex-col overflow-hidden rounded-[2.55rem]", screen)}>
              {/* Status bar around the island */}
              <div
                aria-hidden
                className={cn("absolute inset-x-0 top-0 z-20 flex h-[46px] items-center justify-between px-7 pt-0.5 text-[13px] font-semibold", bar === "light" ? "text-white" : "text-black")}
              >
                <span className="tabular-nums">9:41</span>
                <span className="flex items-center gap-1">
                  <span className="flex items-end gap-px">
                    {[4, 6, 8, 10].map((h) => (
                      <span key={h} className="w-[3px] rounded-[1px] bg-current" style={{ height: h }} />
                    ))}
                  </span>
                  <span className="ml-1 flex h-[11px] w-[22px] items-center rounded-[3px] border border-current/40 p-px">
                    <span className="h-full w-[70%] rounded-[1.5px] bg-current" />
                  </span>
                </span>
              </div>
              <span aria-hidden className="absolute top-[11px] left-1/2 z-30 h-[26px] w-[88px] -translate-x-1/2 rounded-full bg-black" />
              {children}
              {/* Glass: a faint diagonal sheen */}
              <span aria-hidden className="pointer-events-none absolute inset-0 z-40 bg-[linear-gradient(115deg,oklch(1_0_0/0.07)_0%,transparent_32%,transparent_70%,oklch(1_0_0/0.03)_100%)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
