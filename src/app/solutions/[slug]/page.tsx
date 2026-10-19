import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { IndustryPage } from "@/components/solutions/industry-page"
import { industries, industryBySlug } from "@/content/solutions"

/**
 * /solutions/[slug]: one page per industry, all prerendered. Use cases have
 * no page of their own (they are cards on /solutions; old links redirect).
 * The params read sits inside Suspense so navigations stay instant (Cache
 * Components' instant validation); the known slugs prerender in full.
 */

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return industries.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const s = industryBySlug(slug)
  if (!s) return {}
  return { title: s.title, description: s.line }
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
  const s = industryBySlug(slug)
  if (!s) notFound()
  return <IndustryPage industry={s} />
}
