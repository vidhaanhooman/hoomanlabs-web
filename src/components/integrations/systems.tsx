import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { TextLink } from "@/components/layout/text-link"
import { IntegrationGroups } from "@/components/sections/tools-integrations"
import { integrationsPage as c } from "@/content/pages/integrations"

/**
 * "Already integrated", last of the four sections: the same logo groups as
 * /platform (by category, general names as examples), with the way in for
 * everything else.
 */
export function Systems() {
  const { label, title, line } = c.sections.systems
  return (
    <Section id="integrations-systems">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div className="flex max-w-[44rem] flex-col gap-3">
            <span className="font-mono text-label text-ink-muted">{label}</span>
            <h2 className="text-h2 font-normal">{title}</h2>
            <p className="text-body text-ink-secondary">{line}</p>
          </div>
          <TextLink href="#integrations-connect">Connect anything else</TextLink>
        </div>
        <IntegrationGroups className="mt-12" />
      </Container>
    </Section>
  )
}
