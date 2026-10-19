"use client"

import { EnvelopeSimpleIcon } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { AuthShell } from "@/components/auth/auth-shell"
import { Field, GoogleOption, PasswordInput, Switch } from "@/components/auth/auth-form"
import { OtpInput } from "@/components/auth/otp-input"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { auth } from "@/content/auth"

/**
 * /login, the header's "Platform": email and password, with Google as the
 * alternative. "Forgot password?" logs in with a one-time code instead:
 * the email, Send OTP, then the 6-digit code (with a resend countdown). UI only: a login goes to the console (see content/auth).
 */
export function Login() {
  const c = auth.login
  const router = useRouter()
  const [view, setView] = useState<"login" | "email" | "code">("login")
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [wait, setWait] = useState(0)

  // The resend countdown, from 30s once a code is sent.
  useEffect(() => {
    if (wait <= 0) return
    const t = setTimeout(() => setWait(wait - 1), 1000)
    return () => clearTimeout(t)
  }, [wait])

  const send = () => {
    setCode("")
    setWait(30)
    setView("code")
  }

  if (view === "code") {
    return (
      <AuthShell>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (code.length === 6) router.push(auth.console)
          }}
        >
          <span className="grid size-10 place-items-center rounded-full bg-secondary">
            <EnvelopeSimpleIcon className="size-4" />
          </span>
          <h1 className="mt-6 text-h2 font-normal">{c.otp.enterTitle}</h1>
          <p className="mt-2 text-small text-muted-foreground">{c.otp.enterLine.replace("{email}", email)}</p>
          <div className="mt-8">
            <Field label={c.otp.field}>
              <OtpInput value={code} onChange={setCode} label={c.otp.field} />
            </Field>
          </div>
          <Button type="submit" className="mt-8 w-full" disabled={code.length < 6}>
            {c.otp.submit}
          </Button>
          <div className="mt-5 flex justify-between">
            <Button type="button" variant="link" className="h-auto px-0" onClick={() => setView("email")}>
              {c.otp.change}
            </Button>
            <Button type="button" variant="link" className="h-auto px-0 text-muted-foreground" disabled={wait > 0} onClick={send}>
              {wait > 0 ? c.otp.resendIn.replace("{s}", String(wait)) : c.otp.resend}
            </Button>
          </div>
        </form>
      </AuthShell>
    )
  }

  if (view === "email") {
    return (
      <AuthShell>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            send()
          }}
        >
          <h1 className="text-h2 font-normal">{c.otp.title}</h1>
          <p className="mt-2 text-small text-muted-foreground">{c.otp.line}</p>
          <div className="mt-8">
            <Field label={auth.fields.email} htmlFor="email">
              <Input id="email" type="email" autoComplete="email" autoFocus placeholder={auth.placeholders.email} value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Field>
          </div>
          <Button type="submit" className="mt-8 w-full">
            {c.otp.send}
          </Button>
          <Button type="button" variant="link" className="mt-5 h-auto px-0" onClick={() => setView("login")}>
            {c.otp.back}
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
              <button type="button" onClick={() => setView("email")} className="text-label text-foreground underline-offset-4 hover:underline">
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
