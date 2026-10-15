import { EarIcon, SpeakerHighIcon } from "@phosphor-icons/react/dist/ssr"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { voicePage as c } from "@/content/pages/voice"

/**
 * "Under the hood" on /platform/voice: the speech layer named plainly, for
 * buyers who compare speech-to-text and text-to-speech. Two columns,
 * listening and speaking, each with its providers (logo, name, model) and a
 * short list in the page's row style. From md the two columns share one grid
 * (subgrid), so the headers, the provider blocks and every row line up across
 * even when one side wraps. Logos are masks in the text colour, so they
 * follow light and dark; providers without a logo file show an initial.
 */

const ICONS = { stt: EarIcon, tts: SpeakerHighIcon }

type Provider = { name: string; model?: string; logo?: string }

function Mark({ p }: { p: Provider }) {
  if (p.logo)
    return (
      <span
        aria-hidden
        className="block size-4 shrink-0 bg-foreground"
        style={{
          maskImage: `url(/logos/providers/${p.logo}.svg)`,
          WebkitMaskImage: `url(/logos/providers/${p.logo}.svg)`,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      />
    )
  return (
    <span aria-hidden className="grid size-4 shrink-0 place-items-center rounded-[4px] bg-foreground text-[9px] leading-none text-background">
      {p.name[0]}
    </span>
  )
}

export function SpeechLayer() {
  const { label, title, line, sides } = c.speech
  return (
    <Section id="voice-speech">
      <Container>
        <div className="flex max-w-[44rem] flex-col gap-3">
          <span className="font-mono text-label text-ink-muted">{label}</span>
          <h2 className="text-h2 font-normal">{title}</h2>
          <p className="text-body text-ink-secondary">{line}</p>
        </div>

        <div className="mt-14 flex flex-col gap-14 md:grid md:grid-cols-2 md:grid-rows-[auto_auto_repeat(4,auto)] md:gap-x-16 md:gap-y-0">
          {sides.map((side) => {
            const Icon = ICONS[side.id as keyof typeof ICONS]
            return (
              <div key={side.id} className="flex flex-col md:row-span-6 md:grid md:grid-rows-subgrid">
                <span className="flex items-center gap-2 text-body">
                  <Icon className="size-4 text-ink-muted" />
                  {side.label}
                </span>

                {/* Providers */}
                <ul className="flex flex-wrap content-start gap-x-6 gap-y-3 pt-5 pb-8">
                  {side.providers.map((p: Provider) => (
                    <li key={p.name} className="flex items-center gap-2 text-small">
                      <Mark p={p} />
                      <span>{p.name}</span>
                      {p.model && <span className="text-ink-muted">{p.model}</span>}
                    </li>
                  ))}
                </ul>

                {/* What it does; each row shares its height with the row beside it */}
                <ul className="contents">
                  {side.rows.map((r) => (
                    <li key={r.title} className="grid grid-cols-[10rem_1fr] gap-6 border-t border-line py-4 text-small">
                      <span>{r.title}</span>
                      <span className="text-ink-secondary">{r.body}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
