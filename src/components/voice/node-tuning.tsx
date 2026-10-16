"use client"

import { useState } from "react"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { voicePage as c } from "@/content/pages/voice"
import { cn } from "@/lib/utils"

/**
 * "Tuned per node" on /platform/voice, as a console mock: the agent's voice
 * settings with a node picker. Each control shows this node's value; sliders
 * keep a faint tick at the agent default, and an Override switch marks what
 * the node changes. Only the picker is interactive. Opens on "Take card
 * number", the most telling node. Sample values.
 */

type Setting = (typeof c.nodes.settings)[number]

const num = (v: string) => parseFloat(v)
const pct = (s: Setting, v: string) => ("min" in s && s.min !== undefined && s.max !== undefined ? ((num(v) - s.min) / (s.max - s.min)) * 100 : 0)
const isOn = (v: string) => v === "Yes" || v === "On"

export function NodeTuning() {
  const { label, title, line, settings, flow } = c.nodes
  const [id, setId] = useState("card")
  const node = flow.find((n) => n.id === id) ?? flow[0]
  const overrides = node.overrides as Record<string, string>
  const count = Object.keys(overrides).length

  return (
    <Section id="voice-nodes">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <span className="font-mono text-label text-ink-muted">{label}</span>
          <h2 className="text-h2 font-normal">{title}</h2>
          <p className="text-body text-ink-secondary">{line}</p>
        </div>

        <Panel className="mt-10 p-3 sm:p-10">
          <div className="ui-dark mx-auto max-w-[44rem] overflow-hidden rounded-xl text-[13px] shadow-[0_30px_60px_-30px_oklch(0.2_0.02_260/0.5)]">
            {/* Title bar with the node picker */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-(--ui-line) bg-(--ui-panel) px-4 py-3">
              <span className="flex items-center gap-3">
                <span aria-hidden className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="size-2.5 rounded-full bg-white/15" />
                  ))}
                </span>
                <span className="text-(--ui-muted)">Billing agent · Voice settings</span>
              </span>
              <Select value={id} onValueChange={(v) => v && setId(v)}>
                <SelectTrigger aria-label="Node" className="h-8 min-w-52 border-(--ui-line) bg-(--ui-raised) text-[13px] text-(--ui-text) dark:bg-(--ui-raised)">
                  <span className="text-(--ui-muted)">Node</span>
                  <SelectValue>{(v: string) => flow.find((n) => n.id === v)?.name}</SelectValue>
                </SelectTrigger>
                <SelectContent align="end" alignItemWithTrigger={false} sideOffset={6} className="min-w-56">
                  {flow.map((n, i) => (
                    <SelectItem key={n.id} value={n.id} className="py-1.5">
                      <span className="w-4 font-mono text-[11px] text-ink-muted">{i + 1}</span>
                      <span className="flex-1">{n.name}</span>
                      {Object.keys(n.overrides).length > 0 && <span className="text-[11px] text-ink-muted">{Object.keys(n.overrides).length}</span>}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between gap-3 px-5 pt-4 pb-2">
              <span className="text-(--ui-muted)">{node.note}</span>
              <span className={cn("rounded-full px-2.5 py-0.5 text-[12px]", count ? "bg-(--ui-live)/15 text-(--ui-live)" : "bg-(--ui-raised) text-(--ui-muted)")}>
                {count ? `${count} override${count > 1 ? "s" : ""}` : "All defaults"}
              </span>
            </div>

            {/* The controls */}
            <ul aria-hidden className="flex flex-col px-5 pb-2">
              {settings.map((s) => {
                const o = overrides[s.id]
                const v = o ?? s.base
                return (
                  <li key={s.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 border-b border-(--ui-line) py-3.5 last:border-0 sm:grid-cols-[10.5rem_minmax(0,1fr)_auto]">
                    <span className={cn(!o && "text-(--ui-muted)")}>{s.label}</span>
                    <span className="col-span-2 row-start-2 flex items-center gap-3 sm:col-span-1 sm:row-start-auto">
                      <Control s={s} v={v} live={!!o} />
                    </span>
                    <Override on={!!o} />
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center gap-2 border-t border-(--ui-line) bg-(--ui-panel) px-5 py-2.5 text-[11.5px] text-(--ui-muted)">
              <span className="h-2.5 w-px bg-white/45" />
              Agent default
            </div>
          </div>
        </Panel>
      </Container>
    </Section>
  )
}

function Control({ s, v, live }: { s: Setting; v: string; live: boolean }) {
  if (s.kind === "slider") {
    const at = pct(s, v)
    return (
      <>
        <span className="relative h-1 flex-1 rounded-full bg-white/10">
          <span className={cn("absolute inset-y-0 left-0 rounded-full transition-[width] duration-500", live ? "bg-white/70" : "bg-white/25")} style={{ width: `${at}%` }} />
          <span className="absolute -top-1.5 h-4 w-px bg-white/45" style={{ left: `${pct(s, s.base)}%` }} />
          <span
            className={cn("absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[left] duration-500", live ? "bg-white" : "bg-white/40")}
            style={{ left: `${at}%` }}
          />
        </span>
        <span className={cn("w-12 text-right tabular-nums", !live && "text-(--ui-muted)")}>{v}</span>
      </>
    )
  }
  if (s.kind === "toggle") {
    const on = isOn(v)
    return (
      <>
        <span className={cn("relative h-4.5 w-8 rounded-full transition-colors", on ? (live ? "bg-white/80" : "bg-white/30") : "bg-white/10")}>
          <span className={cn("absolute top-0.5 size-3.5 rounded-full bg-(--ui-bg) transition-[left] duration-300", on ? "left-4" : "left-0.5")} />
        </span>
        <span className={cn("flex-1 tabular-nums", !live && "text-(--ui-muted)")}>{v}</span>
      </>
    )
  }
  return <span className={cn("rounded-md border border-(--ui-line) bg-(--ui-raised) px-2 py-0.5", !live && "text-(--ui-muted)")}>{v}</span>
}

function Override({ on }: { on: boolean }) {
  return (
    <span className={cn("flex items-center gap-2 text-[11.5px]", on ? "text-(--ui-live)" : "text-(--ui-muted)")}>
      <span className={cn("relative h-3.5 w-6 rounded-full border transition-colors", on ? "border-(--ui-live) bg-(--ui-live)/25" : "border-white/15")}>
        <span className={cn("absolute top-1/2 size-2 -translate-y-1/2 rounded-full transition-[left] duration-300", on ? "left-3 bg-(--ui-live)" : "left-0.5 bg-white/30")} />
      </span>
      <span className="w-14">{on ? "Override" : "Default"}</span>
    </span>
  )
}
