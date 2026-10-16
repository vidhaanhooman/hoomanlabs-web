import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { RolePage } from "@/components/careers/role-page"
import { roleBySlug, roles } from "@/content/careers"

/**
 * /careers/[slug]: one page per open role, all prerendered. The params read
 * sits inside Suspense, as on /solutions/[slug], so navigations stay instant.
 */

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return roles.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const r = roleBySlug(slug)
  if (!r) return {}
  return { title: `${r.title} · Careers`, description: r.summary }
}

export default function Role({ params }: Props) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <RoleContent params={params} />
    </Suspense>
  )
}

async function RoleContent({ params }: Props) {
  const { slug } = await params
  const r = roleBySlug(slug)
  if (!r) notFound()
  return <RolePage role={r} />
}
