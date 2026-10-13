import type { Metadata } from "next"

import { HomePage } from "@/components/home-page"

export const metadata: Metadata = { title: "Lab: previous homepage" }

/** The homepage before v3 was promoted to /, kept for reference. */
export default function PreviousHome() {
  return <HomePage heroStage="parallax" heroScreen="conversation" />
}
