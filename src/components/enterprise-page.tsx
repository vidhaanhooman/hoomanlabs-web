import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { EnterpriseTimeline, type TimelineStep } from "@/components/sections/enterprise-timeline"
import { FinalCta } from "@/components/sections/final-cta"
import { ctas } from "@/content/draft"
import { enterpriseBuild, enterpriseGantt } from "@/content/landing"

/**
 * /enterprise: how an enterprise build runs. Opened from the "Enterprise,
 * built with our team" card. The five gated steps as a timeline (one open at a
 * time), timing notes, who brings what, then the closing CTA. The weeks and
 * checklists come from the week-by-week plan (enterpriseGantt).
 */
export function EnterprisePage() {
  const { steps, notes, split } = enterpriseBuild
  // Each step's week and what happens in it, from the week-by-week plan
  const timeline: TimelineStep[] = steps.map((s) => {
    const row = enterpriseGantt.rows.find((r) => r.name === s.name)
    return {
      name: s.name,
      when: row ? `Week ${String(Math.floor(row.start) + 1).padStart(2, "0")}` : "",
      body: s.body,
      items: row ? row.detail.split(" · ").map((d) => d.charAt(0).toUpperCase() + d.slice(1)) : [],
      gate: s.gate,
    }
  })
  return (
    <>
      <Section id="enterprise-hero" spacing="none" className="pt-16 pb-(--section-pad) md:pt-24">
        <Container>
          <p className="reveal-blur text-small text-ink-muted">{enterpriseBuild.eyebrow}</p>
          <h1 className="reveal-blur mt-3 max-w-[22ch] text-display font-normal" style={{ "--i": 1 } as React.CSSProperties}>
            {enterpriseBuild.headline}
          </h1>
          <p className="reveal-blur mt-5 max-w-[56ch] text-body-lg text-ink-secondary" style={{ "--i": 2 } as React.CSSProperties}>
            {enterpriseBuild.body}
          </p>
          <div className="reveal-blur mt-8" style={{ "--i": 3 } as React.CSSProperties}>
            <Link data-demo href={ctas.demo.href} className={buttonVariants()}>
              {ctas.demo.label}
            </Link>
          </div>
        </Container>
      </Section>

      <Section id="enterprise-steps" spacing="none" className="pb-(--section-pad)">
        <Container>
          <EnterpriseTimeline steps={timeline} />

          <ul className="mt-8 flex flex-col gap-1 md:ml-[13rem]">
            {notes.map((n) => (
              <li key={n} className="text-small text-ink-muted">
                {n}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section id="enterprise-split">
        <Container>
          <h2 className="text-h2 font-normal">A joint build.</h2>
          <div className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2">
            {[split.us, split.you].map((col) => (
              <div key={col.title} className="flex flex-col">
                <h3 className="text-small font-normal text-ink-muted">{col.title}</h3>
                <ul className="mt-3 flex flex-col">
                  {col.items.map((it) => (
                    <li key={it} className="border-t border-line py-3 text-small text-ink-secondary">
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
