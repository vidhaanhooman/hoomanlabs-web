import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { pad, StageHeader } from "@/components/sections/product-stage-list"
import { channels, onTheCall, type OnTheCallVisual } from "@/content/platform"
import { cn } from "@/lib/utils"

/**
 * Channels: where one agent runs (voice and chat, by surface), then how voice
 * agents behave on a real line (turn detection, noise, voicemail,
 * interruptions), each with a tiny diagram instead of a product screen.
 */
export function Channels({ start, productName }: { start: number; productName: string }) {
  const end = start + onTheCall.items.length - 1
  return (
    <Section id="product-channels" className="scroll-mt-32 lg:scroll-mt-16">
      <Container>
        <StageHeader
          productName={productName}
          label={channels.label}
          range={`${pad(start)}–${pad(end)}`}
          headline={channels.headline}
          body={channels.body}
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {channels.modes.map((m) => (
            <div key={m.name} className="rounded-md border border-line bg-surface p-2">
              <p className="px-3 pt-2 pb-3 text-body font-medium">{m.name}</p>
              <ul className="flex flex-col gap-1">
                {m.surfaces.map((x) => (
                  <li
                    key={x.name}
                    className={cn(
                      "flex items-center gap-3 rounded-md bg-background px-3 py-2.5",
                      x.soon && "text-ink-muted"
                    )}
                  >
                    <span className="w-24 shrink-0 text-small font-medium">{x.name}</span>
                    <span className="min-w-0 truncate text-small text-ink-secondary">{x.note}</span>
                    {x.soon && (
                      <span className="ml-auto rounded-full border border-line-strong px-1.5 py-px text-label text-ink-secondary">
                        Coming soon
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h3 className="mt-14 text-h4 font-medium">{onTheCall.label}</h3>
        <ol className="mt-6 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {onTheCall.items.map((it, i) => (
            <li key={it.title} className="flex flex-col gap-2">
              <Diagram kind={it.visual} />
              <span className="mt-3 font-mono text-label text-ink-muted tabular-nums">{pad(start + i)}</span>
              <h4 className="text-body font-medium">{it.title}</h4>
              <p className="text-small text-ink-secondary">{it.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}

/* ------------------------------------------------------------ diagrams */

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      aria-hidden
      className="flex h-36 flex-col justify-center gap-3 rounded-md border border-line bg-surface px-4 text-label text-ink-muted"
    >
      {children}
    </div>
  )
}

/** Deterministic pseudo-random bar heights (no hydration drift). */
const bars = (n: number, seed: number, amp: number, base: number) =>
  Array.from({ length: n }, (_, i) => Math.round(base + amp * Math.abs(Math.sin(i * 1.7 + seed) * Math.cos(i * 0.6 + seed))))

function Wave({ heights, className }: { heights: number[]; className?: string }) {
  return (
    <span className="flex h-7 items-center gap-[2px]">
      {heights.map((h, i) => (
        <span key={i} className={cn("w-[3px] rounded-full", className)} style={{ height: h }} />
      ))}
    </span>
  )
}

function Diagram({ kind }: { kind: OnTheCallVisual }) {
  if (kind === "noise")
    return (
      <Frame>
        <div className="flex items-center gap-3">
          <span className="w-14 shrink-0">Raw</span>
          <Wave heights={bars(26, 1, 24, 3)} className="bg-ink-muted/60" />
        </div>
        <div className="flex items-center gap-3">
          <span className="w-14 shrink-0 text-foreground">Cleaned</span>
          <Wave
            heights={bars(26, 1, 24, 3).map((h, i) => (i > 6 && i < 19 ? h : 2))}
            className="bg-foreground"
          />
        </div>
      </Frame>
    )

  if (kind === "turn")
    return (
      <Frame>
        {[
          { who: "Caller", spans: [[0, 34], [44, 70]] },
          { who: "Agent", spans: [[78, 100]] },
        ].map((row) => (
          <div key={row.who} className="flex items-center gap-3">
            <span className="w-14 shrink-0">{row.who}</span>
            <span className="relative h-2 flex-1 rounded-full bg-line">
              {row.spans.map(([a, b]) => (
                <span
                  key={a}
                  className={cn("absolute inset-y-0 rounded-full", row.who === "Agent" ? "bg-foreground" : "bg-ink-muted")}
                  style={{ left: `${a}%`, width: `${b - a}%` }}
                />
              ))}
            </span>
          </div>
        ))}
        <div className="flex gap-3">
          <span className="w-14 shrink-0" />
          <span className="relative h-4 flex-1">
            <span className="absolute -translate-x-1/2 whitespace-nowrap" style={{ left: "39%" }}>
              pause
            </span>
            <span className="absolute right-0 whitespace-nowrap text-foreground">replies</span>
          </span>
        </div>
      </Frame>
    )

  if (kind === "voicemail")
    return (
      <Frame>
        {[
          { k: "Ringing", v: "0:00" },
          { k: "Machine detected", v: "0:04" },
          { k: "Message left", v: "0:18", on: true },
        ].map((r) => (
          <div key={r.k} className={cn("flex items-center gap-2", r.on && "text-foreground")}>
            <span className={cn("size-1.5 rounded-full", r.on ? "bg-foreground" : "bg-ink-muted")} />
            <span>{r.k}</span>
            <span className="ml-auto font-mono tabular-nums">{r.v}</span>
          </div>
        ))}
      </Frame>
    )

  return (
    <Frame>
      <div className="flex flex-col items-start gap-1">
        <span>Agent</span>
        <span className="rounded-md bg-background px-2 py-1 text-ink-secondary">
          Your bill of £86 is due on the<span className="text-ink-muted">…</span>
        </span>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span>Caller · cuts in, Hindi</span>
        <span className="rounded-md bg-foreground px-2 py-1 text-background">Kya main Friday ko pay kar sakta hoon?</span>
      </div>
    </Frame>
  )
}
