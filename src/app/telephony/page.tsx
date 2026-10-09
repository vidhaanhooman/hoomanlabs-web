import type { Metadata } from "next"

import { ProductPage } from "@/components/product-page"
import { getProduct } from "@/content/products"

const product = getProduct("telephony")

export const metadata: Metadata = {
  title: `${product.name} | HoomanLabs (draft)`,
  description: product.summary,
}

export default function TelephonyPage() {
  return <ProductPage product={product} />
}
