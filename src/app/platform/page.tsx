import type { Metadata } from "next"

import { PlatformPage } from "@/components/platform-page"
import { platform } from "@/content/platform"

export const metadata: Metadata = { title: platform.name, description: platform.subhead }

export default function Platform() {
  return <PlatformPage />
}
