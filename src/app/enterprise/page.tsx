import type { Metadata } from "next"

import { EnterprisePage } from "@/components/enterprise-page"
import { enterpriseBuild } from "@/content/landing"

export const metadata: Metadata = { title: "Enterprise", description: enterpriseBuild.body }

export default function Enterprise() {
  return <EnterprisePage />
}
