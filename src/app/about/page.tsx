import type { Metadata } from "next"

import { AboutPage } from "@/components/about-page"
import { aboutPage } from "@/content/about"

export const metadata: Metadata = {
  title: aboutPage.seo.title,
  description: aboutPage.seo.description,
}

export default function About() {
  return <AboutPage />
}
