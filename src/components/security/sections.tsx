import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { HeroCopy } from "@/components/product-page/page-bits"
import { SecurityConsole } from "@/components/security/hero-console"
import { securityPage as c } from "@/content/pages/security"

/**
 * /platform/security sections: the hero (headline, then failover in action
 * on the post-call landscape) and "Your data", a calm row list whose values
 * are placeholders until the facts are confirmed (see the content file).
 */
export function SecurityHero() {
  return (
    <Section id="security-hero" spacing="none" className="pt-10 pb-(--section-pad) md:pt-16">
      <Container>
        <HeroCopy crumb={c.crumb} title={c.title} line={c.line} link={{ label: "See failover", href: "#security-failover" }} />
      </Container>
      <Container className="reveal mt-10 md:mt-14">
        <SecurityConsole />
      </Container>
    </Section>
  )
}

/** Your data: neutral "Shared during evaluation" rows, no claims yet. */
export function SecurityData() {
  const d = c.data
  return (
    <Section id="security-data">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-start">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-label text-ink-muted">{d.label}</span>
          <h2 className="text-h2 font-normal">{d.title}</h2>
          <p className="text-body text-ink-secondary">{d.line}</p>
        </div>
        <ul className="flex flex-col border-y border-line">
          {d.items.map((it) => (
            <li key={it.id} className="flex items-center justify-between gap-6 border-b border-line py-4 last:border-0">
              <span className="text-body">{it.title}</span>
              <span className="text-small text-ink-muted">{it.value}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
