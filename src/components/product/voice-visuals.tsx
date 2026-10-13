import { PlayIcon } from "@phosphor-icons/react/dist/ssr"

import { UiCard, UiLabel, UiPill, UiWindow } from "@/components/product/ui-window"
import { cn } from "@/lib/utils"

/**
 * Visuals for /platform/voice (sample Halden Energy agent, Ria). Dark
 * screens in the console's style, plus one light diagram for turn-taking.
 * Provider names are deliberately generic until we confirm we can name them.
 */

function Slider({ label, value, pct }: { label: string; value: string; pct: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between text-[11px]">
        <span className="text-(--ui-muted)">{label}</span>
        <span className="font-mono">{value}</span>
      </div>
      <span className="relative h-1.5 rounded-full bg-(--ui-raised)">
        <span className="absolute inset-y-0 left-0 rounded-full bg-(--ui-text)" style={{ width: `${pct}%` }} />
        <span className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--ui-text)" style={{ left: `${pct}%` }} />
      </span>
    </div>
  )
}

/** Hero: the voice settings for an agent, with tuning. */
export function VoiceStudioScreen({ className }: { className: string }) {
  return (
    <UiWindow className={className} title="Ria · Billing" aside="Voice">
      <div className="grid gap-4 md:grid-cols-[1.1fr_1fr]">
        <UiCard>
          <UiLabel>Voice</UiLabel>
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-(--ui-raised)">
              <PlayIcon weight="fill" className="size-3.5" />
            </span>
            <span className="flex flex-col">
              <span className="text-[13px]">Ria · warm, clear</span>
              <span className="text-[11px] text-(--ui-muted)">English (India) · Hindi</span>
            </span>
            <span className="ml-auto">
              <UiPill>Engine A</UiPill>
            </span>
          </div>
          <div className="flex h-8 items-center gap-[3px]">
            {Array.from({ length: 48 }, (_, i) => (
              <span
                key={i}
                className="w-[3px] rounded-full bg-(--ui-text)/60"
                style={{ height: 4 + Math.round(20 * Math.abs(Math.sin(i * 1.3) * Math.cos(i * 0.4))) }}
              />
            ))}
          </div>
        </UiCard>
        <UiCard>
          <UiLabel>Tuning · collections</UiLabel>
          <Slider label="Speed" value="0.95×" pct={45} />
          <Slider label="Stability" value="0.70" pct={70} />
          <Slider label="Warmth" value="High" pct={80} />
        </UiCard>
      </div>
      <UiCard>
        <UiLabel>Reads naturally</UiLabel>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-3 gap-y-2 text-[12px]">
          <span className="font-mono text-(--ui-muted)">£86.40</span>
          <span className="text-(--ui-muted)">→</span>
          <span>&ldquo;eighty-six pounds forty&rdquo;</span>
          <span className="font-mono text-(--ui-muted)">04/03</span>
          <span className="text-(--ui-muted)">→</span>
          <span>&ldquo;the fourth of March&rdquo;</span>
          <span className="font-mono text-(--ui-muted)">Halden</span>
          <span className="text-(--ui-muted)">→</span>
          <span>&ldquo;HAWL-den&rdquo; · pronunciation</span>
        </div>
      </UiCard>
    </UiWindow>
  )
}

/** Deep-dive 1: choosing a voice per use case, with samples. */
export function VoicesScreen({ className }: { className: string }) {
  const voices = [
    { name: "Ria", tone: "Warm, calm", use: "Collections", lang: "EN · HI", on: true },
    { name: "Arjun", tone: "Upbeat", use: "Sales", lang: "EN · HI" },
    { name: "Meena", tone: "Patient", use: "Support", lang: "TA · EN" },
    { name: "Kabir", tone: "Crisp", use: "Reminders", lang: "HI · MR" },
  ]
  return (
    <UiWindow className={className} title="Voice studio" aside={<UiPill>Ambience · office</UiPill>}>
      <UiCard>
        {voices.map((v) => (
          <div key={v.name} className={cn("flex items-center gap-3 rounded-md px-2 py-2", v.on && "bg-(--ui-raised)")}>
            <span className="grid size-8 shrink-0 place-items-center rounded-full border border-(--ui-line)">
              <PlayIcon weight="fill" className="size-3" />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="text-[13px]">{v.name}</span>
              <span className="text-[11px] text-(--ui-muted)">{v.tone}</span>
            </span>
            <span className="ml-auto font-mono text-[11px] text-(--ui-muted)">{v.lang}</span>
            <span className="w-20 text-right text-[11px]">{v.use}</span>
          </div>
        ))}
      </UiCard>
    </UiWindow>
  )
}

/** Deep-dive 2: turn-taking as a light timeline (caller, agent, events). */
export function TurnTimeline() {
  const lanes: { who: string; spans: [number, number][]; ink?: boolean }[] = [
    { who: "Caller", spans: [[0, 20], [24, 34], [62, 70]] },
    { who: "Hooman", spans: [[38, 58], [88, 100]], ink: true },
  ]
  const events = [
    { at: 22, label: "pause, still talking" },
    { at: 36, label: "finished · replies" },
    { at: 60, label: "cuts in · stops" },
    { at: 80, label: "silence · nudges" },
  ]
  return (
    <div aria-hidden className="flex w-full flex-col gap-5 text-label text-ink-muted">
      {lanes.map((l) => (
        <div key={l.who} className="flex items-center gap-4">
          <span className={cn("w-16 shrink-0", l.ink && "text-foreground")}>{l.who}</span>
          <span className="relative h-3 flex-1 rounded-full bg-line">
            {l.spans.map(([a, b]) => (
              <span
                key={a}
                className={cn("absolute inset-y-0 rounded-full", l.ink ? "bg-foreground" : "bg-ink-muted")}
                style={{ left: `${a}%`, width: `${b - a}%` }}
              />
            ))}
          </span>
        </div>
      ))}
      <div className="flex gap-4">
        <span className="w-16 shrink-0" />
        <span className="relative h-24 flex-1">
          {events.map((e, i) => (
            <span key={e.at} className="absolute top-0 flex -translate-x-1/2 flex-col items-center gap-1" style={{ left: `${e.at}%` }}>
              {/* Alternate rows so neighbouring labels never collide. */}
              <span className={cn("w-px border-l border-dashed border-ink-muted", i % 2 ? "h-11" : "h-4")} />
              <span className={cn("whitespace-nowrap", i === 2 && "text-foreground")}>{e.label}</span>
            </span>
          ))}
        </span>
      </div>
    </div>
  )
}

/** One stretch of speech, tagged with its language. */
function Seg({ lang, children }: { lang: string; children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-(--ui-raised) px-1.5 py-0.5">
      {children}
      <span className="ml-1.5 font-mono text-[9.5px] text-(--ui-muted)">{lang}</span>
    </span>
  )
}

/** Deep-dive 3: a caller switching language mid-sentence, and the settings behind it. */
export function LanguageScreen({ className }: { className: string }) {
  const langs = ["English (India)", "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam", "Marathi", "Gujarati", "Punjabi"]
  return (
    <UiWindow className={className} title="Live call · Rahul" aside={<UiPill live>Hindi ↔ English</UiPill>}>
      <UiCard>
        <UiLabel>Caller · switches mid-sentence</UiLabel>
        <p className="text-[13px] leading-relaxed">
          <Seg lang="HI">Main Friday ko pay kar sakta hoon,</Seg> <Seg lang="EN">or should I pay it now?</Seg>
        </p>
        <UiLabel>Ria · follows</UiLabel>
        <p className="text-[13px] leading-relaxed">
          <Seg lang="HI">Bilkul, Friday chalega.</Seg> <Seg lang="EN">I&apos;ll send you a reminder on Thursday.</Seg>
        </p>
      </UiCard>
      <UiCard>
        <UiLabel>Languages</UiLabel>
        <div className="flex flex-wrap gap-1.5">
          {langs.map((l, i) => (
            <span key={l} className={cn("rounded-full px-2.5 py-0.5 text-[11px]", i < 2 ? "bg-(--ui-text) text-(--ui-bg)" : "bg-(--ui-raised)")}>
              {l}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-(--ui-line) pt-2.5">
          <span>Switch language mid-call</span>
          <span className="relative h-4 w-7 rounded-full bg-(--ui-text)">
            <span className="absolute top-0.5 right-0.5 size-3 rounded-full bg-(--ui-bg)" />
          </span>
        </div>
      </UiCard>
      <UiCard>
        <UiLabel>Boosted keywords</UiLabel>
        <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
          {["Halden", "Green Fixed 12m", "meter reading", "HLD-482913"].map((k) => (
            <span key={k} className="rounded-md bg-(--ui-raised) px-2 py-0.5">
              {k}
            </span>
          ))}
        </div>
      </UiCard>
    </UiWindow>
  )
}

/**
 * How fast it replies, as one bar split into the three stages of a turn.
 * DEMO timings until the published latency arrives.
 */
export function LatencyBar() {
  const stages = [
    { name: "Hearing", note: "transcription", ms: 180, tone: "bg-ink-muted" },
    { name: "Thinking", note: "model", ms: 420, tone: "bg-ink-secondary" },
    { name: "Speaking", note: "first audio", ms: 200, tone: "bg-foreground" },
  ]
  const total = stages.reduce((n, s) => n + s.ms, 0)
  return (
    <div aria-hidden className="flex w-full flex-col gap-5">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-label text-ink-muted">One turn, caller stops → Hooman speaks</span>
        <span className="text-h3 font-normal tabular-nums">{total} ms</span>
      </div>
      <div className="flex h-10 gap-1 overflow-hidden rounded-md">
        {stages.map((s) => (
          <span key={s.name} className={cn("h-full", s.tone)} style={{ width: `${(s.ms / total) * 100}%` }} />
        ))}
      </div>
      <div className="flex gap-1">
        {stages.map((s) => (
          <span key={s.name} className="flex flex-col gap-0.5 text-label" style={{ width: `${(s.ms / total) * 100}%` }}>
            <span className="text-foreground">{s.name}</span>
            <span className="text-ink-muted">
              {s.note} · <span className="tabular-nums">{s.ms} ms</span>
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
