import type { Metadata } from "next"

import { StructuredLanding } from "@/components/structured-landing"

export const metadata: Metadata = { title: "Lab: structured homepage (draft)" }

/** The homepage in the 21-part structure, with the call-card hero. */
export default function LabHeroCall() {
  return <StructuredLanding />
}
