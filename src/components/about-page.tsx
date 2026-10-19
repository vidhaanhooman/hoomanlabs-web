import Link from "next/link"
import { MapPinIcon } from "@phosphor-icons/react/dist/ssr"

import { Container } from "@/components/layout/container"
import { Panel } from "@/components/layout/panel"
import { Section } from "@/components/layout/section"
import { HeroCopy } from "@/components/product-page/page-bits"
import { buttonVariants } from "@/components/ui/button"
import { aboutPage as c } from "@/content/about"
import { ctas } from "@/content/draft"

/**
 * /about, in the product pages' calm language: the hero (mission), our story, how we build and contact details
 * with the demo CTA. Company facts are placeholders in content/about.ts,
 * marked TO CONFIRM.
 */

const ROOMY = {
  "--section-gap": "clamp(3.25rem, 2.25rem + 3vw, 5rem)",
  "--section-pad": "calc(var(--section-gap) / 2)",
} as React.CSSProperties

function Header({ label, title, line }: { label: string; title: string; line?: string }) {
  return (
    <div className="flex max-w-[44rem] flex-col gap-3">
      <span className="font-mono text-label text-ink-muted">{label}</span>
      <h2 className="text-h2 font-normal">{title}</h2>
      {line && <p className="text-body text-ink-secondary">{line}</p>}
    </div>
  )
}

export function AboutPage() {
  return (
    <div style={ROOMY}>
      {/* Hero */}
      <Section id="about-hero" spacing="none" className="pt-10 pb-(--section-pad) md:pt-16">
        <Container>
          <HeroCopy parent={null} crumb={c.crumb} title={c.title} line={c.line} link={{ label: "Get in touch", href: "#about-contact" }} />
        </Container>
      </Section>

      {/* Our story */}
      <Section id="about-story">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-start">
          <Header label={c.story.label} title={c.story.title} />
          <div className="flex flex-col gap-5 text-body text-ink-secondary">
            {c.story.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </Container>
      </Section>

      {/* How we build */}
      <Section id="about-principles">
        <Container>
          <Header label={c.principles.label} title={c.principles.title} />
          <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {c.principles.items.map((v, i) => (
              <li key={v.title} className="flex flex-col gap-2 border-t border-line pt-5">
                <span className="font-mono text-label text-ink-muted">0{i + 1}</span>
                <span className="text-body">{v.title}</span>
                <span className="text-small text-ink-secondary">{v.body}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Contact and the demo CTA */}
      <Section id="about-contact" className="scroll-mt-20">
        <Container>
          <Panel className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
            <div className="flex flex-col gap-6">
              <Header label={c.contact.label} title={c.contact.title} />
              <div className="flex flex-wrap gap-3">
                <Link data-demo href={ctas.demo.href} className={buttonVariants()}>
                  {ctas.demo.label}
                </Link>
              </div>
            </div>
            <dl className="flex flex-col self-end">
              {c.contact.items.map((x) => (
                <div key={x.label} className="grid grid-cols-[6rem_1fr] items-baseline gap-4 border-t border-line py-4 text-body">
                  <dt className="text-small text-ink-muted">{x.label}</dt>
                  <dd className="flex flex-col gap-0.5">
                    {"href" in x && x.href ? (
                      <a href={x.href} className="w-fit underline-offset-4 hover:underline">
                        {x.value}
                      </a>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <MapPinIcon className="size-4 text-ink-muted" />
                        {x.value}
                      </span>
                    )}
                    {"note" in x && x.note && <span className="text-small text-ink-muted">{x.note}</span>}
                  </dd>
                </div>
              ))}
            </dl>
          </Panel>
        </Container>
      </Section>
    </div>
  )
}
