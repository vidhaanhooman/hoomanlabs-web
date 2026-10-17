import type { Metadata } from "next"

import { Onboarding } from "@/components/auth/onboarding"
import { auth } from "@/content/auth"

export const metadata: Metadata = {
  title: auth.onboarding.seo.title,
  description: auth.onboarding.seo.description,
}

export default function OnboardingPage() {
  return <Onboarding />
}
