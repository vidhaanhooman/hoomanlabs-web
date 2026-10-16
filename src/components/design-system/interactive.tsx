"use client"

import { useState } from "react"

import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

/** Interactive primitives for /components (client: they hold state). */

export function TabsDemo() {
  return (
    <div className="flex flex-col gap-6">
      <Tabs defaultValue="calls">
        <TabsList>
          <TabsTrigger value="calls">Calls</TabsTrigger>
          <TabsTrigger value="chats">Chats</TabsTrigger>
          <TabsTrigger value="app">App</TabsTrigger>
        </TabsList>
        <TabsContent value="calls" className="pt-3 text-small text-ink-secondary">1,906 calls today.</TabsContent>
        <TabsContent value="chats" className="pt-3 text-small text-ink-secondary">642 chats today.</TabsContent>
        <TabsContent value="app" className="pt-3 text-small text-ink-secondary">118 in-app sessions today.</TabsContent>
      </Tabs>
      <Tabs defaultValue="voice">
        <TabsList variant="line">
          <TabsTrigger value="voice">Voice</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

export function SelectDemo() {
  const [v, setV] = useState("ria")
  return (
    <Select value={v} onValueChange={(x) => x && setV(x)}>
      <SelectTrigger className="w-56" aria-label="Agent">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ria">Ria · Billing</SelectItem>
        <SelectItem value="asha">Asha · Appointments</SelectItem>
        <SelectItem value="kabir">Kabir · Collections</SelectItem>
      </SelectContent>
    </Select>
  )
}

export function AccordionDemo() {
  return (
    <Accordion className="w-full max-w-[36rem]">
      <AccordionItem value="a">
        <AccordionTrigger>Can it answer our existing phone number?</AccordionTrigger>
        <AccordionContent>Yes. Use HoomanLabs numbers or connect your own carrier.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Does it answer around the clock?</AccordionTrigger>
        <AccordionContent>Yes, with no queue and no hold music.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

/** The filter chips used in the integrations directory. */
export function ChipsDemo() {
  const [on, setOn] = useState("All")
  return (
    <div role="group" aria-label="Filter" className="flex flex-wrap gap-2">
      {["All", "CRM", "Helpdesk", "Telephony", "Voice"].map((k) => (
        <button
          key={k}
          type="button"
          aria-pressed={on === k}
          onClick={() => setOn(k)}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-small transition-colors",
            on === k ? "border-foreground bg-foreground text-background" : "border-line text-ink-secondary hover:border-line-strong hover:text-foreground"
          )}
        >
          {k}
        </button>
      ))}
    </div>
  )
}

export { ThemeToggle }
