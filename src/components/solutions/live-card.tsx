import { CheckIcon, LightningIcon, PhoneIcon } from "@phosphor-icons/react/dist/ssr"

import type { Industry } from "@/content/industries"
import { FROSTED } from "@/lib/hero-styles"
import { cn } from "@/lib/utils"

/**
 * One example call, played out on an industry card's photo: a frosted card
 * in the centre. At rest it shows who is calling, what starts it and the
 * call, dimmed, waiting. When the card (a .group) is hovered or focused the
 * call plays: the status turns live, the waveform moves, the line lights
 * up, three progress segments fill in turn and what got done slides in.
 * Touch screens (no hover) see the finished state. CSS only. Sample data.
 */

const BARS = [6, 11, 16, 9, 14, 18, 10, 15, 7, 12, 17, 9, 13, 8, 15, 11]

/** Shown at rest, swapped out on hover. */
const REST = "transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0 [@media(hover:none)]:opacity-0"
/** Hidden at rest, shown on hover (after `delay`). */
const PLAY = "opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100"

function Row({ icon: I, label, className, children }: { icon: React.ElementType; label: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("flex gap-3", className)}>
      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-white/20 bg-white/5">
        <I className="size-3" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="font-mono text-[10px] tracking-wide uppercase opacity-60">{label}</span>
        {children}
      </span>
    </div>
  )
}

export function LiveCard({ industry: x }: { industry: Industry }) {
  const f = x.flow
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center p-4 sm:p-8">
      <div
        className={cn(
          FROSTED,
          "flex w-full max-w-[24rem] flex-col gap-4 p-5 transition-[translate,scale] duration-500 ease-(--ease-out) group-hover:-translate-y-1 group-hover:scale-[1.02] group-focus-visible:-translate-y-1"
        )}
      >
        {/* Who, and the call's status */}
        <div className="flex items-center gap-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-[12px] font-medium text-black">R</span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-[13px]">Ria · {x.jobs[0].name}</span>
            <span className="text-[11px] opacity-60">{x.name} · Sample</span>
          </span>
          <span className="relative grid shrink-0 text-[11px]">
            <span className={cn(REST, "col-start-1 row-start-1 flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5")}>
              <span className="size-1.5 rounded-full bg-white/50" />
              Ready
            </span>
            <span className={cn(PLAY, "col-start-1 row-start-1 flex items-center gap-1.5 rounded-full bg-(--ok)/25 px-2.5 py-0.5")}>
              <span className="size-1.5 rounded-full bg-(--ok) motion-safe:animate-pulse" />
              On the call
            </span>
          </span>
        </div>

        <div className="flex flex-col gap-3.5 border-t border-white/15 pt-4">
          <Row icon={LightningIcon} label="What starts it">
            <span className="text-[13px]">{f.trigger.title}</span>
            <span className="text-[11.5px] opacity-70">{f.trigger.detail}</span>
          </Row>

          <Row icon={PhoneIcon} label="On the call">
            <span className="flex items-center justify-between gap-3">
              <span data-hover className="ui-wave flex h-5 items-center gap-[3px]">
                {BARS.map((h, i) => (
                  <span key={i} className="w-[2px] rounded-full bg-white/80" style={{ height: h, animationDelay: `${-i * 110}ms` }} />
                ))}
              </span>
              <span className="font-mono text-[11px] tabular-nums opacity-70">{f.call.length}</span>
            </span>
            <span className="text-[12.5px] opacity-50 transition-opacity delay-200 duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100">
              “{f.call.line}”
            </span>
          </Row>

          {/* What got done: slides in once the call has played */}
          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] delay-500 duration-500 ease-(--ease-out) group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <Row icon={CheckIcon} label="What gets done" className={cn(PLAY, "delay-700")}>
                <span className="flex flex-wrap items-center gap-2 text-[13px]">
                  <span className="size-1.5 shrink-0 rounded-full bg-(--ok)" />
                  {f.result.outcome}
                  <span className="rounded-full border border-white/20 px-2 py-0.5 text-[11px] opacity-80">{f.result.system}</span>
                </span>
              </Row>
            </div>
          </div>
        </div>

        {/* Three steps, filling in turn */}
        <div className="grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-[3px] overflow-hidden rounded-full bg-white/15">
              <span
                className="block h-full origin-left scale-x-0 rounded-full bg-white transition-[scale] duration-500 ease-linear group-hover:scale-x-100 group-focus-visible:scale-x-100 [@media(hover:none)]:scale-x-100"
                style={{ transitionDelay: `${i * 350}ms` }}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
