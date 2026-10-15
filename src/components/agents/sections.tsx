
import { AgentConsole } from "@/components/agents/hero-console"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { HeroCallCard } from "@/components/lab/hero-call-card"
import { HeroCopy } from "@/components/product-page/page-bits"
import { agentsPage as c } from "@/content/pages/agents"

/**
 * Sections of /platform/agents, built from the homepage's recipes so the
 * two read as one site: the painted hero stage, grey panels holding light
 * inset tables (as in "Tested, scored and connected"), and the same section
 * header. Sample Halden Energy data throughout.
 */

/** The homepage's section header: heading and line. */
function Header({ title, body }: { title: string; body?: string }) {
  return (
    <div className="flex max-w-[44rem] flex-col gap-3">
      <h2 className="text-h2 font-normal">{title}</h2>
      {body && <p className="text-body text-ink-secondary">{body}</p>}
    </div>
  )
}

/* ------------------------------------------------------------------ hero */

export function AgentsHero() {
  return (
    <Section id="agents-hero" spacing="none" className="pt-10 pb-(--section-pad) md:pt-16">
      <Container>
        <HeroCopy crumb={c.crumb} title={c.title} line={c.line} link={{ label: "Hear a call", href: "#agents-listen" }} />
      </Container>

      {/* A large agent console on the canyon backdrop, with a live test call */}
      <Container className="reveal mt-10 md:mt-14">
        <AgentConsole />
      </Container>
    </Section>
  )
}

/* ------------------------------------------------------------------ talk */

export function Talk() {
  return (
    <Section id="agents-listen">
      <Container>
        <Header title={c.talk.title} body={c.talk.line} />
        <div className="mt-10">
          <HeroCallCard plain />
        </div>
      </Container>
    </Section>
  )
}
