"use client"

import { useEffect, useState } from "react"

import { KnowledgeScreen } from "@/components/product/knowledge-screen"
import { TableEditorScreen } from "@/components/product/table-editor-screen"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * The Knowledge panel's screen: the documents library for "Knowledge", the
 * table editor for "Live data tables". Hovering a row shows its screen;
 * otherwise the two alternate slowly. Reduced motion: no alternating.
 */
export function KnowledgeScreens({ className, focus }: { className: string; focus: string }) {
  const reduce = usePrefersReducedMotion()
  const [idle, setIdle] = useState<"knowledge" | "tables">("knowledge")
  useEffect(() => {
    if (focus !== "all" || reduce) return
    const t = setInterval(() => setIdle((v) => (v === "knowledge" ? "tables" : "knowledge")), 5000)
    return () => clearInterval(t)
  }, [focus, reduce])
  const show = focus === "all" ? idle : focus
  return (
    <>
      <KnowledgeScreen className={cn(className, "transition-opacity duration-500", show === "knowledge" ? "opacity-100" : "opacity-0")} />
      <TableEditorScreen className={cn(className, "transition-opacity duration-500", show === "tables" ? "opacity-100" : "opacity-0")} />
    </>
  )
}
