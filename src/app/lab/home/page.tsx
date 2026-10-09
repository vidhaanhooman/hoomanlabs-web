import type { Metadata } from "next"

import { LandingPage } from "@/components/landing-page"

export const metadata: Metadata = { title: "Lab: homepage structure (draft)" }

/** The proposed homepage structure, to compare with / before promoting. */
export default function LabHome() {
  return <LandingPage />
}
