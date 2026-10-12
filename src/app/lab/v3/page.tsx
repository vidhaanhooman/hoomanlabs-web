import type { Metadata } from "next"

import { V3Landing } from "@/components/v3-landing"

export const metadata: Metadata = { title: "Lab: homepage v3 (draft)" }

/** The homepage in the v3 order: journey hero, customers, deployments, outcomes, product, solutions, talk. */
export default function LabV3() {
  return <V3Landing />
}
