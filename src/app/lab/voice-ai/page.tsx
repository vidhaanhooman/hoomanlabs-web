import type { Metadata } from "next"

import { ProductPage } from "@/components/product-page"
import { getProduct } from "@/content/products"

export const metadata: Metadata = { title: "Lab: Voice AI, bento stages (draft)" }

/** /voice-ai with the stages as one big image + small cards. */
export default function VoiceAiLab() {
  return <ProductPage product={getProduct("voice-ai")} stageLayout="bento" />
}
