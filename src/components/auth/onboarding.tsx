"use client"

import { CheckIcon, PlusIcon, XIcon } from "@phosphor-icons/react"
import Link from "next/link"
import { useState } from "react"

import { AuthShell } from "@/components/auth/auth-shell"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { auth } from "@/content/auth"
import { cn } from "@/lib/utils"

/**
 * /onboarding: two steps, About you then Invite team (skippable), then a
 * done screen that hands off to the console. UI only: nothing is saved or
 * sent yet (see content/auth).
 */
const c = auth.onboarding

function Field({ label, htmlFor, children }: { label: string; htmlFor?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-label text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  )
}

function Steps({ step }: { step: number }) {
  return (
    <span className="flex items-center gap-3 text-label text-muted-foreground">
      Step {Math.min(step + 1, 2)} of 2
      <span className="flex gap-1">
        {[0, 1].map((i) => (
          <span key={i} className={cn("h-1 w-6 rounded-full transition-colors", i <= step ? "bg-foreground" : "bg-line-strong")} />
        ))}
      </span>
    </span>
  )
}

export function Onboarding() {
  const [step, setStep] = useState(0)
  const [size, setSize] = useState<string | null>(null)
  const [emails, setEmails] = useState(["", ""])

  if (step === 2) {
    return (
      <AuthShell>
        <span className="grid size-10 place-items-center rounded-full bg-secondary">
          <CheckIcon weight="bold" className="size-4" />
        </span>
        <h1 className="mt-6 text-h2 font-normal">{c.done.title}</h1>
        <p className="mt-2 text-small text-muted-foreground">{c.done.line}</p>
        <Link href={c.done.cta.href} className={buttonVariants({ className: "mt-8 w-full" })}>
          {c.done.cta.label}
        </Link>
      </AuthShell>
    )
  }

  return (
    <AuthShell aside={<Steps step={step} />}>
      {step === 0 ? (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setStep(1)
          }}
        >
          <h1 className="text-h2 font-normal">{c.about.title}</h1>
          <p className="mt-2 text-small text-muted-foreground">{c.about.line}</p>

          <div className="mt-8 flex flex-col gap-5">
            <Field label={c.about.fields.company} htmlFor="company">
              <Input id="company" name="company" autoComplete="organization" placeholder={c.about.placeholders.company} required />
            </Field>
            <Field label={c.about.fields.role}>
              <Select name="role">
                <SelectTrigger className="h-10 w-full rounded-lg border-line-strong px-3 text-small">
                  <SelectValue placeholder="Choose one" />
                </SelectTrigger>
                <SelectContent>
                  {c.about.roles.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label={c.about.fields.size}>
              <div role="radiogroup" aria-label={c.about.fields.size} className="flex flex-wrap gap-1.5">
                {c.about.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    aria-checked={size === s}
                    onClick={() => setSize(s)}
                    className={cn(
                      "h-8 rounded-full border px-3.5 text-small transition-colors",
                      size === s ? "border-foreground bg-foreground text-background" : "border-line-strong hover:bg-surface"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Field>
          </div>

          <Button type="submit" className="mt-8 w-full">
            {c.next}
          </Button>
        </form>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setStep(2)
          }}
        >
          <h1 className="text-h2 font-normal">{c.invite.title}</h1>
          <p className="mt-2 text-small text-muted-foreground">{c.invite.line}</p>

          <div className="mt-8 flex flex-col gap-2.5">
            <span className="text-label text-muted-foreground">{c.invite.field}</span>
            {emails.map((v, i) => (
              <span key={i} className="flex items-center gap-2">
                <Input
                  type="email"
                  aria-label={`${c.invite.field} ${i + 1}`}
                  value={v}
                  placeholder={c.invite.placeholders[i] ?? "name@company.com"}
                  onChange={(e) => setEmails(emails.map((x, j) => (j === i ? e.target.value : x)))}
                />
                {emails.length > 1 && (
                  <Button type="button" variant="ghost" size="icon" aria-label="Remove" onClick={() => setEmails(emails.filter((_, j) => j !== i))}>
                    <XIcon />
                  </Button>
                )}
              </span>
            ))}
            <Button type="button" variant="ghost" size="sm" className="-ml-2.5 self-start px-2.5" onClick={() => setEmails([...emails, ""])}>
              <PlusIcon />
              {c.invite.add}
            </Button>
          </div>

          <Button type="submit" className="mt-8 w-full">
            {c.invite.send}
          </Button>
          <div className="mt-5 flex justify-between">
            <Button type="button" variant="link" className="h-auto px-0" onClick={() => setStep(0)}>
              {c.back}
            </Button>
            <Button type="button" variant="link" className="h-auto px-0 text-muted-foreground" onClick={() => setStep(2)}>
              {c.invite.skip}
            </Button>
          </div>
        </form>
      )}
    </AuthShell>
  )
}
