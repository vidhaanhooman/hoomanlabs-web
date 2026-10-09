import type { Metadata } from "next"

import { ProductPage } from "@/components/product-page"
import { getProduct } from "@/content/products"

const product = getProduct("voice-ai")

export const metadata: Metadata = {
  title: `${product.name} | HoomanLabs (draft)`,
  description: product.summary,
}

export default function VoiceAiPage() {
  return <ProductPage product={product} />
}
