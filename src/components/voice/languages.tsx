"use client"

import { useEffect, useState } from "react"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { voicePage as c } from "@/content/pages/voice"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * "Speaks like your customers do": one sentence, large, swapped by a row of
 * language chips (it cycles until someone picks one; reduced motion holds on
 * Hindi), ending on a "many more" chip (a few more languages in their own scripts) so
 * it reads as examples, not the full list.
 * Beside it, a Hinglish exchange tagged as it switches, with the boosted
 * keywords. The features sit underneath.
 */

function Seg({ lang, children }: { lang: "HI" | "EN"; children: React.ReactNode }) {
  return (
    <span className={cn("rounded-md px-1.5 py-0.5 box-decoration-clone", lang === "HI" ? "bg-highlight-warm" : "bg-highlight-cool")}>
      {children}
      <span className="ml-1.5 font-mono text-[10px] text-ink-muted">{lang}</span>
    </span>
  )
}

const CYCLE_MS = 2600

export function Languages() {
  const { label, title, line, rows } = c.languages
  const items = c.wall.items
  const reduce = usePrefersReducedMotion()
  const [sel, setSel] = useState(1)
  const [held, setHeld] = useState(false)
  // The last stop is "many more", after the listed languages.
  const count = items.length + 1
  const more = sel === items.length
  const cur = items[Math.min(sel, items.length - 1)]

  // Cycles through the languages until someone picks one.
  useEffect(() => {
    if (held || reduce) return
    const t = setTimeout(() => setSel((i) => (i + 1) % count), CYCLE_MS)
    return () => clearTimeout(t)
  }, [sel, held, reduce, count])

  const pick = (i: number) => {
    setHeld(true)
    setSel(i)
  }
  return (
    <Section id="voice-languages">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <span className="font-mono text-label text-ink-muted">{label}</span>
          <h2 className="text-h2 font-normal">{title}</h2>
          <p className="text-body text-ink-secondary">{line}</p>
        </div>

        <div className="mt-10 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
          {/* One sentence, swapped by language */}
          <Panel className="flex min-w-0 flex-col gap-8 p-6 sm:p-8">
            <div role="tablist" aria-label="Languages" className="flex flex-wrap gap-1.5">
              {items.map((it, i) => (
                <button
                  key={it.code}
                  role="tab"
                  type="button"
                  aria-selected={i === sel}
                  onClick={() => pick(i)}
                  className={cn(
                    "shrink-0 rounded-full border px-3 py-1 text-small whitespace-nowrap transition-colors",
                    i === sel ? "border-foreground bg-foreground text-background" : "border-line bg-background text-ink-secondary hover:text-foreground"
                  )}
                >
                  {it.lang}
                </button>
              ))}
              <button
                role="tab"
                type="button"
                aria-selected={more}
                onClick={() => pick(items.length)}
                className={cn(
                  "shrink-0 rounded-full border border-dashed px-3 py-1 text-small whitespace-nowrap transition-colors",
                  more ? "border-foreground bg-foreground text-background" : "border-line-strong text-ink-secondary hover:text-foreground"
                )}
              >
                {c.wall.moreChip}
              </button>
            </div>
            <div role="tabpanel" className="flex min-h-[9rem] flex-1 flex-col justify-center gap-3">
              {more ? (
                <>
                  <p key="more" className="flex flex-wrap items-baseline gap-x-5 gap-y-1 text-h2 leading-snug font-normal motion-safe:animate-[lang-in_400ms_ease-out]">
                    {c.wall.moreNames.map((m) => (
                      <span key={m.code} lang={m.code}>
                        {m.name}
                      </span>
                    ))}
                    <span className="text-ink-muted">…</span>
                  </p>
                  <span className="font-mono text-label text-ink-muted">{c.wall.moreCaption}</span>
                </>
              ) : (
                <>
                  <p key={cur.code} lang={cur.code} className="text-h2 leading-snug font-normal motion-safe:animate-[lang-in_400ms_ease-out]">
                    {cur.text}
                  </p>
                  <span className="font-mono text-label text-ink-muted">{cur.lang} · same agent, same prompt</span>
                </>
              )}
            </div>
          </Panel>

          <div className="flex flex-col gap-3">
            {/* Code-switch and keyword boost */}
            <Panel className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
              <span className="text-h4 font-normal">Switches mid-sentence</span>
              <div className="flex flex-col gap-3 rounded-md border border-line bg-background p-4 text-small leading-loose">
                <p>
                  <span className="text-ink-muted">Caller: </span>
                  <Seg lang="HI">Main Friday ko pay kar sakta hoon,</Seg> <Seg lang="EN">or should I pay now?</Seg>
                </p>
                <p>
                  <span className="text-ink-muted">Ria: </span>
                  <Seg lang="HI">Bilkul, Friday chalega.</Seg> <Seg lang="EN">I&apos;ll send a reminder on Thursday.</Seg>
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 text-label">
                <span className="text-ink-muted">Keyword boost:</span>
                {["Halden", "HLD-482913", "Green Fixed 12m"].map((k) => (
                  <span key={k} className="rounded-md border border-line bg-background px-2 py-0.5 font-mono">
                    {k}
                  </span>
                ))}
              </div>
            </Panel>

          </div>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rows.map((r) => (
            <li key={r.id} className="flex flex-col gap-1 border-t border-line pt-4">
              <span className="text-body">{r.title}</span>
              <span className="text-small text-ink-secondary">{r.body}</span>
            </li>
          ))}
        </ul>

        {/* Multi-provider, lightly: a few providers per side, then "+ more" */}
        <div id="voice-providers" className="mt-10 flex scroll-mt-24 flex-col gap-4 border-t border-line pt-6 md:flex-row md:flex-wrap md:items-center md:gap-x-10">
          {c.trio.items.map((side) => (
            <div key={side.id} className="flex flex-wrap items-center gap-1.5">
              <span className="mr-2 text-small text-ink-muted">{side.title}</span>
              {side.providers.map((p) => {
                const logo = "logo" in p ? p.logo : undefined
                return (
                  <span key={p.name} className="flex h-8 items-center gap-2 rounded-full border border-line px-3 text-small">
                    {logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={`/logos/providers/${logo}.svg`} alt="" className="size-3.5 dark:invert" />
                    ) : (
                      <span aria-hidden className="grid size-4 place-items-center rounded-full bg-surface font-mono text-[9px] text-ink-secondary">
                        {p.name[0]}
                      </span>
                    )}
                    {p.name}
                  </span>
                )
              })}
              <span className="px-2 text-small text-ink-muted">+ more</span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
