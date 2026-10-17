"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { CaretDownIcon, ChatTextIcon, GlobeIcon, MicrophoneIcon, MicrophoneSlashIcon, PhoneDisconnectIcon, PhoneIcon, SparkleIcon, XIcon } from "@phosphor-icons/react"

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * Try it now: the console's "Test agent" panel, recreated for recall (the
 * agent and version selects, context variables with Generate, and the
 * Call / Web / Chat tabs), with a few UX fixes: a clear "Start web call"
 * button instead of a bare mic, a live status once the call starts, and a
 * line tying the call to the version and variables in use. The call sits
 * centred in its pane, as in the console. Plays once on view: idle, then
 * connected. Reduced motion shows it connected. Sample data (Halden Energy, Ria).
 */

const VARS: [string, string][] = [
  ["firstName", '"Maya"'],
  ["balance", '"62.10"'],
  ["dueDate", '"4 Mar"'],
]
const LAST = 1 // 0 idle · 1 connected

export function TryItScreen({ className, focus }: { className: string; focus: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { amount: 0.35, once: true })
  const reduce = usePrefersReducedMotion()
  const [step, setStep] = useState(0)
  const s = reduce ? LAST : step

  useEffect(() => {
    if (!seen || reduce || step >= LAST) return
    const t = setTimeout(() => setStep((x) => x + 1), 1600)
    return () => clearTimeout(t)
  }, [seen, reduce, step])

  const live = s >= 1
  const left = focus === "loop" ? "" : focus === "talk" ? "opacity-45" : ""
  const right = focus === "loop" ? "opacity-45" : ""

  return (
    <div ref={ref} aria-hidden className={cn("ui-dark flex flex-col overflow-hidden text-[12.5px] leading-[1.5]", className)}>
      {/* Panel header */}
      <div className="flex h-12 shrink-0 items-center border-b border-(--ui-line) px-5 pr-[22%]">
        <span className="text-[14px]">Test agent</span>
        <XIcon className="ml-auto size-4 text-(--ui-muted)" />
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] pr-[22%]">
        {/* Left: agent, version, context variables */}
        <div className={cn("flex flex-col gap-4 border-r border-(--ui-line) p-5 transition-opacity duration-300", left)}>
          <Field label="Agent">
            <span className="rounded-md bg-(--ui-raised) px-3 py-2">Ria · Billing</span>
          </Field>
          <Field label="Version">
            <span className="flex items-center justify-between rounded-md bg-(--ui-raised) px-3 py-2">
              v13 draft
              <CaretDownIcon className="size-3.5 text-(--ui-muted)" />
            </span>
          </Field>
          <div className="flex flex-col gap-2">
            <span className="flex items-center justify-between">
              <span className="text-[12px]">Context variables</span>
              <span className="flex items-center gap-1.5 rounded-md bg-(--ui-raised) px-2.5 py-1 text-[11.5px]">
                <SparkleIcon className="size-3" />
                Generate
              </span>
            </span>
            <pre className="rounded-md bg-(--ui-raised) px-3 py-2.5 font-mono text-[11px] leading-[1.7] text-(--ui-muted)">
              {"{"}
              {VARS.map(([k, v]) => (
                <span key={k} className="block pl-3">
                  &quot;{k}&quot;: <span className="text-(--ui-text)/85">{v}</span>,
                </span>
              ))}
              {"}"}
            </pre>
          </div>
        </div>

        {/* Right: Call / Web / Chat */}
        <div className={cn("flex min-w-0 flex-col transition-opacity duration-300", right)}>
          <div className="grid grid-cols-3 gap-1 border-b border-(--ui-line) p-2 text-[12px]">
            {[
              [PhoneIcon, "Call"],
              [GlobeIcon, "Web"],
              [ChatTextIcon, "Chat"],
            ].map(([Icon, label]) => {
              const I = Icon as React.ElementType
              const on = label === "Web"
              return (
                <span key={label as string} className={cn("flex items-center justify-center gap-1.5 rounded-md py-1.5", on ? "bg-(--ui-raised) text-(--ui-text) ring-1 ring-white/15" : "text-(--ui-muted)")}>
                  <I className="size-3.5" />
                  {label as string}
                </span>
              )
            })}
          </div>

          <div className="flex flex-1 flex-col items-center justify-center px-4 pb-6">
            {/* The call control */}
            <span className="relative grid size-14 place-items-center rounded-full bg-(--ui-raised)">
              {live && <span className="absolute inset-0 rounded-full border border-(--ui-live)/50 motion-safe:animate-ping" />}
              {live ? (
                <span className="ui-wave flex h-5 items-center gap-[3px]">
                  {[7, 13, 18, 10, 15, 8].map((h, i) => (
                    <span key={i} className="w-[2.5px] rounded-full bg-(--ui-text)" style={{ height: h, animationDelay: `${i * 90}ms` }} />
                  ))}
                </span>
              ) : (
                <MicrophoneIcon className="size-5" />
              )}
            </span>
            <span className="mt-2.5 text-[12.5px]">{live ? "Talking to Ria · 0:38" : "Start web call"}</span>
            <span className="text-[11px] text-(--ui-muted)">Using v13 draft · 3 variables</span>
            {live && (
              <span className="mt-2.5 flex gap-2">
                <span className="grid size-7 place-items-center rounded-full bg-(--ui-raised)">
                  <MicrophoneSlashIcon className="size-3.5" />
                </span>
                <span className="grid size-7 place-items-center rounded-full bg-[#ff3b30]">
                  <PhoneDisconnectIcon weight="fill" className="size-3.5" />
                </span>
              </span>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[12px]">{label}</span>
      {children}
    </div>
  )
}
