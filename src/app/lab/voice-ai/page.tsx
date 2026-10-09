import type { Metadata } from "next"

import { ProductPage } from "@/components/product-page"
import { getProduct } from "@/content/products"

export const metadata: Metadata = { title: "Lab: Voice AI, Fin review changes (draft)" }

/** /voice-ai with the top 5 recommendations from FIN_REVIEW.md applied. */
export default function VoiceAiLab() {
  return <ProductPage product={getProduct("voice-ai")} variant="fin" />
}
