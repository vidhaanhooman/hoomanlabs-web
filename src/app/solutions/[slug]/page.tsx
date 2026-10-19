import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { IndustryPage } from "@/components/solutions/industry-page"
import { industries, industryBySlug } from "@/content/industries"

/**
 * /solutions/[slug]: one page per industry, all prerendered. The params read
 * sits inside Suspense so navigations stay instant (Cache Components'
 * instant validation); the known slugs prerender in full.
 */

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return industries.map((x) => ({ slug: x.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const x = industryBySlug(slug)
  if (!x) return {}
  return { title: x.seo.title, description: x.seo.description }
}

export default function Solution({ params }: Props) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <SolutionContent params={params} />
    </Suspense>
  )
}

async function SolutionContent({ params }: Props) {
  const { slug } = await params
  const x = industryBySlug(slug)
  if (!x) notFound()
  return <IndustryPage industry={x} />
}
