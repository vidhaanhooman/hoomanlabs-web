"use client"

import { useState } from "react"
import {
  ArrowCounterClockwiseIcon,
  ChatCircleDotsIcon,
  DesktopIcon,
  DeviceMobileIcon,
  MoonIcon,
  SunIcon,
  XIcon,
} from "@phosphor-icons/react"

import { ChatPanel } from "@/components/chat/chat-panel"
import { MockSite } from "@/components/chat/mock-sites"
import { SITES, type SiteId } from "@/components/chat/sites"
import { cn } from "@/lib/utils"

/**
 * The chat playground (/chat). Preview first: the example website with the
 * widget live on it, and under it the site, device and theme switches (the
 * theme changes the preview only). Appearance, conversation and session
 * settings sit in the panel beside it. Scripted demo, sample data.
 */

const SWATCHES = ["oklch(0.2 0 0)", "oklch(0.5 0 0)", "oklch(0.55 0.18 260)", "oklch(0.55 0.15 300)", "oklch(0.62 0.18 20)"]

const FIELD = "h-9 w-full rounded-md border border-line bg-background px-3 text-small outline-none transition-colors focus:border-foreground/40"

function Seg<T extends string>({ value, items, onChange, label }: { value: T; items: { v: T; icon?: React.ReactNode; text?: string }[]; onChange: (v: T) => void; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex gap-0.5 rounded-full bg-surface p-1">
      {items.map((it) => (
        <button
          key={it.v}
          type="button"
          role="radio"
          aria-checked={value === it.v}
          aria-label={it.text ? undefined : it.v}
          onClick={() => onChange(it.v)}
          className={cn(
            "flex h-8 items-center gap-1.5 rounded-full px-3 text-small transition-colors",
            value === it.v ? "bg-background text-foreground shadow-xs" : "text-ink-secondary hover:text-foreground"
          )}
        >
          {it.icon}
          {it.text}
        </button>
      ))}
    </div>
  )
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border-b border-line px-5 py-5 last:border-b-0">
      <span className="font-mono text-label text-ink-muted">{title}</span>
      {children}
    </div>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-small text-ink-secondary">{label}</span>
      {children}
    </label>
  )
}

function Switch({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button type="button" role="switch" aria-checked={on} onClick={() => onChange(!on)} className="flex items-center justify-between text-small">
      {label}
      <span className={cn("relative h-5 w-9 rounded-full transition-colors", on ? "bg-foreground" : "bg-line-strong")}>
        <span className={cn("absolute top-0.5 size-4 rounded-full bg-background transition-[left] duration-200", on ? "left-[1.125rem]" : "left-0.5")} />
      </span>
    </button>
  )
}

export function ChatPlayground() {
  const [siteId, setSiteId] = useState<SiteId>("energy")
  const site = SITES.find((s) => s.id === siteId)!
  const [device, setDevice] = useState<"desktop" | "phone">("desktop")
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [agentId, setAgentId] = useState("agt_energy_demo")
  const [versionId, setVersionId] = useState("")

  // Appearance (null = follow the site's defaults)
  const [accentOverride, setAccentOverride] = useState<string | null>(null)
  const [titleOverride, setTitleOverride] = useState<string | null>(null)
  const [launcher, setLauncher] = useState("Chat with us")
  const [side, setSide] = useState<"right" | "left">("right")
  const [openOnLoad, setOpenOnLoad] = useState(true)

  // Conversation and session
  const [contexts, setContexts] = useState<Record<SiteId, string>>(() => Object.fromEntries(SITES.map((s) => [s.id, s.context])) as Record<SiteId, string>)
  const [run, setRun] = useState(1)
  const [open, setOpen] = useState(true)
  const [visible, setVisible] = useState(true)
  const [ended, setEnded] = useState(false)
  const [connected, setConnected] = useState(true)

  const accent = accentOverride ?? site.accent
  const title = titleOverride ?? site.brand
  let customer = "there"
  let contextOk = true
  try {
    const parsed = JSON.parse(contexts[siteId] || "{}") as { name?: unknown }
    if (typeof parsed.name === "string" && parsed.name.trim()) customer = parsed.name.trim()
  } catch {
    contextOk = false
  }
  const look = { title, subtitle: `${site.agent} · ${site.role}`, accent, agent: site.agent, customer, ended, connected }
  const conversationId = `conv_${siteId.slice(0, 2)}${(4271 + run * 7919).toString(36)}`

  function restart() {
    setRun((r) => r + 1)
    setEnded(false)
    setConnected(true)
    setVisible(true)
    setOpen(openOnLoad)
  }

  function pickSite(id: SiteId) {
    setSiteId(id)
    setAgentId(`agt_${id}_demo`)
    setAccentOverride(null)
    setTitleOverride(null)
    setRun((r) => r + 1)
    setEnded(false)
    setConnected(true)
    setOpen(openOnLoad)
  }

  const phone = device === "phone"
  const chatKey = `${siteId}-${run}`

  const controls = (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Seg
        label="Example website"
        value={siteId}
        onChange={pickSite}
        items={SITES.map((s) => ({
          v: s.id,
          text: s.brand,
          icon: <span className="size-2 rounded-full" style={{ background: s.accent }} />,
        }))}
      />
      <Seg
        label="Device"
        value={device}
        onChange={setDevice}
        items={[
          { v: "desktop", icon: <DesktopIcon className="size-4" /> },
          { v: "phone", icon: <DeviceMobileIcon className="size-4" /> },
        ]}
      />
      <Seg
        label="Theme"
        value={theme}
        onChange={setTheme}
        items={[
          { v: "light", icon: <SunIcon className="size-4" /> },
          { v: "dark", icon: <MoonIcon className="size-4" /> },
        ]}
      />
    </div>
  )

  return (
    <div>
      <div className="min-h-[calc(100dvh-4rem)] bg-surface text-foreground">
        <div className="mx-auto max-w-(--container-page) px-(--gutter) pt-10">
          <h1 className="text-h3 font-normal">Chat playground</h1>
        </div>

        <div className="mx-auto flex max-w-(--container-page) flex-col gap-6 px-(--gutter) py-6 lg:flex-row lg:items-start">
          {/* Preview: the example site follows the theme switch, nothing else does */}
          <div className="flex min-w-0 flex-1 flex-col items-center gap-4">
            {/* The agent under test: the main input, above the preview */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                restart()
              }}
              className="flex w-full flex-wrap items-end gap-3 rounded-xl border border-line bg-background p-3 sm:p-4"
            >
              <label className="flex min-w-[12rem] flex-[2] flex-col gap-1.5">
                <span className="text-small text-ink-secondary">Agent ID</span>
                <input className={cn(FIELD, "h-10 font-mono text-small")} value={agentId} onChange={(e) => setAgentId(e.target.value)} spellCheck={false} />
              </label>
              <label className="flex min-w-[9rem] flex-1 flex-col gap-1.5">
                <span className="text-small text-ink-secondary">Version</span>
                <input className={cn(FIELD, "h-10 font-mono text-small")} value={versionId} placeholder="Live" onChange={(e) => setVersionId(e.target.value)} spellCheck={false} />
              </label>
              <button
                type="submit"
                disabled={!agentId.trim() || !contextOk}
                className="flex h-10 items-center gap-2 rounded-full bg-foreground px-5 text-small text-background transition-opacity disabled:opacity-40"
              >
                <ArrowCounterClockwiseIcon className="size-4" />
                Load agent
              </button>
              <span className="flex h-10 items-center gap-2 rounded-full border border-line px-3.5 text-small">
                <span className={cn("size-2 rounded-full", ended ? "bg-ink-muted" : connected ? "bg-[oklch(0.62_0.15_150)]" : "bg-[oklch(0.75_0.14_75)]")} />
                {ended ? "Ended" : connected ? "Live" : "Disconnected"}
                <span className="font-mono text-label text-ink-muted">{conversationId}</span>
              </span>
            </form>
            <div
              className={cn(
                theme === "dark" && "dark",
                "relative overflow-hidden border border-line bg-background text-foreground shadow-[0_30px_80px_-40px_oklch(0.2_0_0/0.35)] transition-[width,border-radius] duration-300",
                phone ? "h-[50rem] w-[24.5rem] rounded-[2.5rem] border-[10px] border-foreground/90" : "h-[46rem] w-full rounded-xl"
              )}
            >
              {phone ? (
                <div className="flex h-9 items-center justify-between px-6 text-label">
                  <span>9:41</span>
                  <span className="h-5 w-24 rounded-full bg-foreground/90" />
                  <span>5G</span>
                </div>
              ) : (
                <div className="flex h-11 items-center gap-2 border-b border-line bg-surface px-4">
                  <span className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="size-2.5 rounded-full bg-line-strong" />
                    ))}
                  </span>
                  <span className="mx-auto w-72 truncate rounded-full bg-background px-3 py-1 text-center text-label text-ink-muted">{site.domain}</span>
                </div>
              )}

              <div className={cn("overflow-hidden", phone ? "h-[calc(100%-2.25rem)]" : "h-[calc(100%-2.75rem)]")}>
                <MockSite site={siteId} accent={site.accent} compact={phone} />
              </div>

              {visible && (
                <div
                  className={cn(
                    "absolute z-10 flex flex-col gap-3",
                    // On a phone the open chat fills the screen below the status bar.
                    phone && open ? "inset-x-0 top-9 bottom-0" : side === "right" ? "right-5 bottom-5 items-end" : "bottom-5 left-5 items-start"
                  )}
                >
                  {open && (
                    <ChatPanel
                      key={chatKey}
                      script={site.script}
                      look={look}
                      onClose={() => setOpen(false)}
                      className={cn(phone ? "h-full w-full" : "h-[33rem] w-[23rem] rounded-2xl border border-line shadow-[0_30px_80px_-30px_oklch(0.2_0_0/0.45)]")}
                    />
                  )}
                  {!(phone && open) && (
                    <button
                      type="button"
                      onClick={() => setOpen((o) => !o)}
                      aria-expanded={open}
                      aria-label={phone ? launcher : undefined}
                      className={cn(
                        "flex h-12 items-center gap-2 rounded-full text-small text-white shadow-[0_16px_40px_-16px_oklch(0.2_0_0/0.6)] transition-transform duration-150 ease-(--ease-out) active:scale-[0.97]",
                        phone ? "w-12 justify-center" : "pr-5 pl-4"
                      )}
                      style={{ background: accent }}
                    >
                      {open ? <XIcon className="size-4" /> : <ChatCircleDotsIcon weight="fill" className="size-5" />}
                      {!phone && (open ? "Close" : launcher || "Chat")}
                    </button>
                  )}
                </div>
              )}
            </div>
            {/* Example site, device and theme sit under the preview */}
            {controls}
          </div>

          {/* Customize */}
          <aside aria-label="Customize" className="w-full shrink-0 overflow-hidden rounded-xl border border-line bg-background lg:w-80">
              <Group title="Appearance">
                <Row label="Accent">
                  <div className="flex items-center gap-2">
                    {[site.accent, ...SWATCHES].map((c, i) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setAccentOverride(i === 0 ? null : c)}
                        aria-label={i === 0 ? "Brand colour" : `Colour ${i}`}
                        aria-pressed={accent === c}
                        className={cn("size-7 rounded-full ring-offset-2 ring-offset-background transition-transform hover:scale-110", accent === c && "ring-2 ring-foreground")}
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                </Row>
                <Row label="Title">
                  <input className={FIELD} value={title} onChange={(e) => setTitleOverride(e.target.value)} />
                </Row>
                <Row label="Launcher text">
                  <input className={FIELD} value={launcher} onChange={(e) => setLauncher(e.target.value)} />
                </Row>
                <Row label="Position">
                  <Seg label="Position" value={side} onChange={setSide} items={[{ v: "left", text: "Left" }, { v: "right", text: "Right" }]} />
                </Row>
                <Switch on={openOnLoad} onChange={setOpenOnLoad} label="Open on page load" />
              </Group>

              <Group title="Conversation">
                <Row label="Customer context">
                  <textarea
                    className={cn(FIELD, "h-24 resize-none py-2 font-mono text-label", !contextOk && "border-destructive/60")}
                    value={contexts[siteId]}
                    onChange={(e) => setContexts((c) => ({ ...c, [siteId]: e.target.value }))}
                    spellCheck={false}
                  />
                </Row>
                <button
                  type="button"
                  onClick={restart}
                  disabled={!contextOk}
                  className="flex h-9 items-center justify-center gap-2 rounded-md bg-foreground text-small text-background transition-opacity disabled:opacity-40"
                >
                  <ArrowCounterClockwiseIcon className="size-4" />
                  Restart conversation
                </button>
              </Group>

              <Group title="Session">
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { t: connected ? "Disconnect" : "Reconnect", f: () => setConnected((c) => !c), off: ended },
                    { t: "End chat", f: () => setEnded(true), off: ended },
                    { t: visible ? "Hide" : "Show", f: () => setVisible((v) => !v), off: false },
                  ].map((b) => (
                    <button
                      key={b.t}
                      type="button"
                      onClick={b.f}
                      disabled={b.off}
                      className="h-9 rounded-md border border-line text-small transition-colors hover:bg-surface disabled:opacity-40"
                    >
                      {b.t}
                    </button>
                  ))}
                </div>
              </Group>
          </aside>
        </div>
      </div>
    </div>
  )
}
