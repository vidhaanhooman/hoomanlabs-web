import { ArrowRightIcon, CheckIcon, LightningIcon, PhoneIcon } from "@phosphor-icons/react/dist/ssr"

import type { Industry } from "@/content/industries"

/**
 * One job, start to finish, on the industry hero's stage: three connected
 * light cards. What starts it, one line from the call (with a voice
 * waveform and the call's length), and what gets done in your systems.
 * Sample data, marked as such.
 */

function Wave() {
  return (
    <span aria-hidden className="flex h-4 items-center gap-[2px]">
      {[5, 9, 13, 7, 11, 15, 8, 12, 6, 10].map((h, i) => (
        <span key={i} className="w-[2px] rounded-full bg-foreground/70" style={{ height: h }} />
      ))}
    </span>
  )
}

function Step({ n, icon: I, label, children }: { n: number; icon: React.ElementType; label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col justify-between gap-8 rounded-md border border-line bg-background p-5 shadow-[0_8px_24px_-12px_oklch(0.2_0.02_60/0.35)]">
      <span className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-label text-ink-muted">
          <I className="size-3.5" />
          {label}
        </span>
        <span className="font-mono text-label text-ink-muted">0{n}</span>
      </span>
      {children}
    </div>
  )
}

const Arrow = () => <ArrowRightIcon aria-hidden className="size-4 shrink-0 self-center text-foreground/60 max-md:rotate-90" />

export function JobFlow({ industry: x }: { industry: Industry }) {
  const f = x.flow
  return (
    <div className="flex flex-col items-stretch gap-3 md:flex-row">
      <Step n={1} icon={LightningIcon} label="What starts it">
        <span className="flex flex-col gap-1">
          <span className="text-body">{f.trigger.title}</span>
          <span className="text-small text-ink-secondary">{f.trigger.detail}</span>
        </span>
      </Step>
      <Arrow />
      <Step n={2} icon={PhoneIcon} label="On the call">
        <span className="flex flex-col gap-3">
          <span className="flex items-center justify-between gap-3">
            <Wave />
            <span className="font-mono text-label text-ink-muted tabular-nums">{f.call.length}</span>
          </span>
          <span className="text-small">“{f.call.line}”</span>
        </span>
      </Step>
      <Arrow />
      <Step n={3} icon={CheckIcon} label="What gets done">
        <span className="flex flex-col gap-2">
          <span className="flex items-center gap-2 text-body">
            <span className="size-1.5 shrink-0 rounded-full bg-(--ok)" />
            {f.result.outcome}
          </span>
          <span className="w-fit rounded-full border border-line px-2.5 py-0.5 text-label text-ink-secondary">{f.result.system}</span>
        </span>
      </Step>
    </div>
  )
}
