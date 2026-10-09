import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { EnterpriseGantt } from "@/components/sections/enterprise-gantt"
import { FinalCta } from "@/components/sections/final-cta"
import { ctas } from "@/content/draft"
import { enterpriseBuild } from "@/content/landing"

/**
 * /enterprise: how an enterprise build runs. Opened from the "Enterprise,
 * built with our team" card. Five gated steps, timing notes, who brings what,
 * then the closing CTA.
 */
export function EnterprisePage() {
  const { steps, notes, split } = enterpriseBuild
  return (
    <>
      <Section id="enterprise-hero" spacing="none" className="pt-16 pb-(--section-pad) md:pt-24">
        <Container>
          <p className="reveal-blur text-small text-ink-muted">{enterpriseBuild.eyebrow}</p>
          <h1 className="reveal-blur mt-3 max-w-[22ch] text-display font-normal" style={{ "--i": 1 } as React.CSSProperties}>
            {enterpriseBuild.headline}
          </h1>
          <p
            className="reveal-blur mt-5 max-w-[56ch] text-body-lg text-ink-secondary"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {enterpriseBuild.body}
          </p>
          <div className="reveal-blur mt-8" style={{ "--i": 3 } as React.CSSProperties}>
            <Link href={ctas.demo.href} className={buttonVariants()}>
              {ctas.demo.label}
            </Link>
          </div>
        </Container>
      </Section>

      <Section id="enterprise-steps">
        <Container>
          <ol className="flex flex-col">
            {steps.map((s, i) => (
              <li key={s.name} className="grid gap-4 border-t border-line py-8 md:grid-cols-[4rem_1fr_1fr] md:gap-8">
                <span className="grid size-9 place-items-center rounded-full bg-foreground font-mono text-label text-background tabular-nums">
                  {i + 1}
                </span>
                <div className="flex flex-col gap-2">
                  <h2 className="text-h3 font-normal">{s.name}</h2>
                  <p className="max-w-[52ch] text-body text-ink-secondary">{s.body}</p>
                </div>
                <div className="self-start rounded-md bg-surface px-4 py-3 md:mt-1">
                  <p className="text-label text-ink-muted">Sign-off gate</p>
                  <p className="mt-1 text-small">{s.gate}</p>
                </div>
              </li>
            ))}
          </ol>

          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {notes.map((n) => (
              <li key={n} className="rounded-md border border-line px-4 py-3 text-small text-ink-secondary">
                {n}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <EnterpriseGantt />

      <Section id="enterprise-split">
        <Container>
          <h2 className="text-h2 font-normal">A joint build.</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {[split.us, split.you].map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <h3 className="border-b border-line pb-3 text-body font-medium">{col.title}</h3>
                <ul className="flex flex-col gap-2">
                  {col.items.map((it) => (
                    <li key={it} className="text-body text-ink-secondary">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta id="enterprise-cta" title={enterpriseBuild.ctaTitle} />
    </>
  )
}
