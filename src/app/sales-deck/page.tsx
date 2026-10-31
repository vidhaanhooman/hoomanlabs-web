import type { Metadata } from "next"

import { SalesDeck } from "@/components/sales-deck/sales-deck"

export const metadata: Metadata = { title: "Sales deck · Story B", robots: { index: false, follow: false } }

export default function SalesDeckPage() {
  return <SalesDeck story="b" />
}
