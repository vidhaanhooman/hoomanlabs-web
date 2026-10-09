import { Section } from "@/components/layout/section"
import { ListenExperience } from "@/components/sections/listen-experience"

/** Hear it: split panel (copy third + painted visual two thirds), like Build/Test. */
export function Listen() {
  return (
    <Section id="listen" spacing="tight">
      <ListenExperience />
    </Section>
  )
}
