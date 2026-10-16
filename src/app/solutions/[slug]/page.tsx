import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { IndustryPage } from "@/components/solutions/industry-page"
import { UseCasePage } from "@/components/solutions/use-case-page"
import { allSolutions, solutionBySlug } from "@/content/solutions"

/**
 * /solutions/[slug]: one page per use case and per industry, all prerendered.
 * The params read sits inside Suspense so navigations stay instant (Cache
 * Components' instant validation); the known slugs prerender in full.
 */

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return allSolutions.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const s = solutionBySlug(slug)
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
  const s = solutionBySlug(slug)
  if (!s) notFound()
  return s.kind === "use-case" ? <UseCasePage useCase={s} /> : <IndustryPage industry={s} />
}
