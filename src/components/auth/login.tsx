"use client"

import { EnvelopeSimpleIcon } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { AuthShell } from "@/components/auth/auth-shell"
import { Field, GoogleOption, PasswordInput, Switch } from "@/components/auth/auth-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { auth } from "@/content/auth"

/**
 * /login, the header's "Platform": email and password, with Google as the
 * alternative; "Forgot password?" swaps in the reset form, then a check
 * your email note. UI only: a login goes to the console (see content/auth).
 */
export function Login() {
  const c = auth.login
  const router = useRouter()
  const [view, setView] = useState<"login" | "reset" | "sent">("login")
  const [email, setEmail] = useState("")

  if (view === "sent") {
    return (
      <AuthShell>
        <span className="grid size-10 place-items-center rounded-full bg-secondary">
          <EnvelopeSimpleIcon className="size-4" />
        </span>
        <h1 className="mt-6 text-h2 font-normal">{c.reset.sentTitle}</h1>
        <p className="mt-2 text-small text-muted-foreground">{c.reset.sent.replace("{email}", email || "that email")}</p>
        <Button variant="outline" className="mt-8 w-full" onClick={() => setView("login")}>
          {c.reset.back}
        </Button>
      </AuthShell>
    )
  }

  if (view === "reset") {
    return (
      <AuthShell>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setView("sent")
          }}
        >
          <h1 className="text-h2 font-normal">{c.reset.title}</h1>
          <p className="mt-2 text-small text-muted-foreground">{c.reset.line}</p>
          <div className="mt-8">
            <Field label={auth.fields.email} htmlFor="email">
              <Input id="email" type="email" autoComplete="email" placeholder={auth.placeholders.email} value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Field>
          </div>
          <Button type="submit" className="mt-8 w-full">
            {c.reset.submit}
          </Button>
          <Button type="button" variant="link" className="mt-5 h-auto px-0" onClick={() => setView("login")}>
            {c.reset.back}
          </Button>
        </form>
      </AuthShell>
    )
  }

  return (
    <AuthShell>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          router.push(auth.console)
        }}
      >
        <h1 className="text-h2 font-normal">{c.title}</h1>
        <p className="mt-2 text-small text-muted-foreground">{c.line}</p>
        <div className="mt-8 flex flex-col gap-5">
          <Field label={auth.fields.email} htmlFor="email">
            <Input id="email" name="email" type="email" autoComplete="email" placeholder={auth.placeholders.email} value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Field>
          <Field
            label={auth.fields.password}
            htmlFor="password"
            aside={
              <button type="button" onClick={() => setView("reset")} className="text-label text-foreground underline-offset-4 hover:underline">
                {c.forgot}
              </button>
            }
          >
            <PasswordInput id="password" autoComplete="current-password" />
          </Field>
        </div>
        <Button type="submit" className="mt-8 w-full">
          {c.submit}
        </Button>
      </form>
      <GoogleOption href={auth.console} />
      <Switch {...c.switch} />
    </AuthShell>
  )
}
