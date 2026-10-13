"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpIcon, XIcon } from "@phosphor-icons/react"

import type { ChatMsg, ChatScript, ChatStep } from "@/components/chat/sites"
import { cn } from "@/lib/utils"

/**
 * The chat widget's panel, running a scripted conversation (no backend):
 * quick replies and a keyword match move through the site's flows. Appearance and session state come from
 * the playground.
 */

export type ChatLook = {
  title: string
  subtitle: string
  accent: string
  agent: string
  customer: string
  ended: boolean
  connected: boolean
}

export function ChatPanel({ script, look, className, onClose }: { script: ChatScript; look: ChatLook; className?: string; onClose?: () => void }) {
  const [msgs, setMsgs] = useState<ChatMsg[]>([{ from: "agent", text: script.greet(look.customer) }])
  const [options, setOptions] = useState(script.options)
  const [typing, setTyping] = useState(false)
  const [draft, setDraft] = useState("")
  const listRef = useRef<HTMLDivElement>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const live = !look.ended && look.connected
  const accent = { background: look.accent, color: "white" }

  useEffect(() => {
    const list = listRef.current
    if (list) list.scrollTo({ top: list.scrollHeight, behavior: "smooth" })
  }, [msgs, typing])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  function send(text: string) {
    if (typing || !live) return
    const key = script.flows[text] ? text : script.match(text)
    const step: ChatStep = key ? script.flows[key] : { reply: [{ from: "agent", text: script.fallback }], options: script.options }
    setMsgs((m) => [...m, { from: "you", text }])
    setOptions([])
    setTyping(true)
    // The agent answers one message at a time, like a real chat.
    step.reply.forEach((r, i) => {
      timers.current.push(
        setTimeout(() => {
          setMsgs((m) => [...m, r])
          if (i === step.reply.length - 1) {
            setTyping(false)
            setOptions(step.options)
          }
        }, 650 * (i + 1))
      )
    })
  }

  return (
    <div role="dialog" aria-label={`${look.title} (demo)`} className={cn("flex flex-col overflow-hidden bg-background text-foreground", className)}>
      <div className="flex items-center gap-3 px-4 py-3.5" style={accent}>
        <span className="grid size-9 place-items-center rounded-full bg-white/20 text-small font-medium">{look.agent.charAt(0)}</span>
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-small font-medium">{look.title || "Chat"}</span>
          <span className="flex items-center gap-1.5 truncate text-label opacity-85">
            <span className={cn("size-1.5 shrink-0 rounded-full", live ? "bg-[oklch(0.85_0.17_150)]" : "bg-white/50")} />
            {live ? look.subtitle : look.ended ? "Chat ended" : "Reconnecting…"}
          </span>
        </span>
        {onClose && (
          <button type="button" onClick={onClose} aria-label="Close chat" className="ml-auto grid size-8 place-items-center rounded-full transition-colors hover:bg-white/15">
            <XIcon className="size-4" />
          </button>
        )}
      </div>

      <div ref={listRef} aria-live="polite" className="flex flex-1 flex-col gap-2.5 overflow-y-auto bg-surface px-4 py-4">
        {msgs.map((m, i) => (
          <div key={i} className={cn("flex flex-col gap-1", m.from === "you" ? "items-end" : "items-start")}>
            <span
              className={cn("max-w-[85%] rounded-2xl px-3.5 py-2 text-small", m.from === "you" ? "rounded-br-md" : "rounded-bl-md bg-background text-foreground shadow-[0_1px_2px_oklch(0_0_0/0.06)]")}
              style={m.from === "you" ? accent : undefined}
            >
              {m.text}
            </span>
          </div>
        ))}
        {typing && (
          <span className="flex w-fit gap-1 rounded-2xl rounded-bl-md bg-background px-3.5 py-3" aria-label={`${look.agent} is typing`}>
            {[0, 1, 2].map((d) => (
              <span key={d} className="size-1.5 rounded-full bg-ink-muted motion-safe:animate-pulse" style={{ animationDelay: `${d * 150}ms` }} />
            ))}
          </span>
        )}
        {!live && (
          <span className="mx-auto mt-2 rounded-full border border-line bg-background px-3 py-1 text-label text-ink-muted">
            {look.ended ? "This chat has ended" : "Connection lost"}
          </span>
        )}
      </div>

      {live && options.length > 0 && (
        <div className="flex flex-wrap gap-1.5 bg-surface px-4 pb-3">
          {options.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => send(o)}
              className="rounded-full border bg-background px-3 py-1 text-small transition-colors hover:bg-surface"
              style={{ borderColor: look.accent, color: look.accent }}
            >
              {o}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          const t = draft.trim()
          if (!t) return
          setDraft("")
          send(t)
        }}
        className="flex items-center gap-2 border-t border-line px-3 py-2.5"
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          disabled={!live}
          placeholder={live ? `Message ${look.agent}…` : "This chat is closed"}
          aria-label="Message"
          className="min-w-0 flex-1 bg-transparent px-1 text-small outline-none placeholder:text-ink-muted disabled:cursor-not-allowed"
        />
        <button type="submit" aria-label="Send" disabled={!draft.trim() || typing || !live} className="grid size-8 place-items-center rounded-full transition-opacity disabled:opacity-30" style={accent}>
          <ArrowUpIcon weight="bold" className="size-3.5" />
        </button>
      </form>
    </div>
  )
}
