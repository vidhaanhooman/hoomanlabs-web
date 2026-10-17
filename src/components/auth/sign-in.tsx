"use client"

import { useRouter } from "next/navigation"

import { AuthShell } from "@/components/auth/auth-shell"
import { Field, GoogleOption, PasswordInput, Switch, Terms } from "@/components/auth/auth-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { auth } from "@/content/auth"

/**
 * /sign-in, for new users: name, work email and password (Google as the
 * alternative), then onboarding. UI only for now (see content/auth).
 */
export function SignIn() {
  const c = auth.signIn
  const router = useRouter()
  return (
    <AuthShell>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          router.push(c.next)
        }}
      >
        <h1 className="text-h2 font-normal">{c.title}</h1>
        <p className="mt-2 text-small text-muted-foreground">{c.line}</p>
        <div className="mt-8 flex flex-col gap-5">
          <Field label={auth.fields.name} htmlFor="name">
            <Input id="name" name="name" autoComplete="name" placeholder="Maya Patel" required />
          </Field>
          <Field label={auth.fields.email} htmlFor="email">
            <Input id="email" name="email" type="email" autoComplete="email" placeholder={auth.placeholders.email} required />
          </Field>
          <Field label={auth.fields.password} htmlFor="password" hint={c.passwordHint}>
            <PasswordInput id="password" autoComplete="new-password" />
          </Field>
        </div>
        <Button type="submit" className="mt-8 w-full">
          {c.submit}
        </Button>
        <Terms />
      </form>
      <GoogleOption href={c.next} />
      <Switch {...c.switch} />
    </AuthShell>
  )
}
