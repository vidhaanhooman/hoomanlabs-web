import type { Metadata } from "next"

import { LandingPage } from "@/components/landing-page"

export const metadata: Metadata = { title: "Lab: homepage with the call card on the parallax (draft)" }

/** Same page as /lab/home, with the earlier hero: the glass call card on the parallax painting. */
export default function LabHeroCall() {
  return <LandingPage hero="call-card" />
}
