import type { Metadata } from "next"

import { SalesDeck } from "@/components/sales-deck/sales-deck"

export const metadata: Metadata = { title: "Sales deck · Story A", robots: { index: false, follow: false } }

export default function SalesDeckStoryAPage() {
  return <SalesDeck story="a" />
}
