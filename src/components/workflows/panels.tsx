"use client"

import { useEffect, useState } from "react"

import { AiStepScreen, CodeStepScreen, HttpStepScreen, PresetsScreen, TestStepScreen, TriggerScreen } from "@/components/product/workflow-screens"
import { ProductPanel } from "@/components/sections/how-it-works-v3"
import { workflowsPage as c } from "@/content/pages/workflows"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

const DOCS = "https://docs.hoomanlabs.com"

const CONNECT = { http: HttpStepScreen, presets: PresetsScreen, code: CodeStepScreen }
type ConnectId = keyof typeof CONNECT
const ORDER: ConnectId[] = ["http", "presets", "code"]

/** Connect's screen: one per row on hover; otherwise they take turns. */
function ConnectScreens({ className, focus }: { className: string; focus: string }) {
  const reduce = usePrefersReducedMotion()
  const [idle, setIdle] = useState(0)
  useEffect(() => {
    if (focus !== "all" || reduce) return
    const t = setInterval(() => setIdle((i) => (i + 1) % ORDER.length), 4500)
    return () => clearInterval(t)
  }, [focus, reduce])
  const show = focus in CONNECT ? (focus as ConnectId) : ORDER[idle]
  return (
    <>
      {ORDER.map((id) => {
        const Screen = CONNECT[id]
        return <Screen key={id} className={cn(className, "transition-opacity duration-500", show === id ? "opacity-100" : "opacity-0")} />
      })}
    </>
  )
}

/** Split panels in the homepage's ProductPanel, alternating sides. */
export function TopPanels() {
  const { triggers, ai, connect } = c.panels
  return (
    <>
      <ProductPanel id="workflows-triggers" {...triggers} link="Read about triggers" linkHref={DOCS} screen={(cls) => <TriggerScreen className={cls} />} />
      <ProductPanel id="workflows-ai" {...ai} link="Read about AI steps" linkHref={DOCS} media="start" screen={(cls) => <AiStepScreen className={cls} />} />
      <ProductPanel id="workflows-connect" {...connect} link="See integrations" linkHref="/platform/integrations" screen={(cls, f) => <ConnectScreens className={cls} focus={f} />} />
    </>
  )
}

export function TestPanel() {
  return <ProductPanel id="workflows-test" {...c.panels.test} link="Read about testing" linkHref={DOCS} media="start" screen={(cls) => <TestStepScreen className={cls} />} />
}
