"use client"

import { EyeIcon, EyeSlashIcon, GoogleLogoIcon } from "@phosphor-icons/react"
import Link from "next/link"
import { useState } from "react"

import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { auth } from "@/content/auth"

/** Shared pieces of the login and sign-in forms. */

export function Field({ label, htmlFor, aside, hint, children }: { label: string; htmlFor?: string; aside?: React.ReactNode; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="flex items-baseline justify-between">
        <label htmlFor={htmlFor} className="text-label text-muted-foreground">
          {label}
        </label>
        {aside}
      </span>
      {children}
      {hint && <span className="text-label text-muted-foreground">{hint}</span>}
    </div>
  )
}

/** A password input with a show / hide toggle. */
export function PasswordInput({ id, autoComplete }: { id: string; autoComplete: "current-password" | "new-password" }) {
  const [shown, setShown] = useState(false)
  return (
    <span className="relative">
      <Input id={id} name="password" type={shown ? "text" : "password"} autoComplete={autoComplete} required minLength={8} className="pr-10" />
      <button
        type="button"
        aria-label={shown ? "Hide password" : "Show password"}
        onClick={() => setShown(!shown)}
        className="absolute inset-y-0 right-0 grid w-10 place-items-center text-muted-foreground hover:text-foreground"
      >
        {shown ? <EyeSlashIcon className="size-4" /> : <EyeIcon className="size-4" />}
      </button>
    </span>
  )
}

/** "or" divider, then Continue with Google. */
export function GoogleOption({ href }: { href: string }) {
  return (
    <>
      <span className="my-6 flex items-center gap-3 text-label text-muted-foreground">
        <span className="h-px flex-1 bg-line" />
        {auth.or}
        <span className="h-px flex-1 bg-line" />
      </span>
      <Link href={href} className={buttonVariants({ variant: "outline", className: "w-full" })}>
        <GoogleLogoIcon weight="bold" />
        {auth.google}
      </Link>
    </>
  )
}

export function Terms() {
  const t = auth.terms
  return (
    <p className="mt-4 text-label text-muted-foreground">
      {t.before}{" "}
      <Link href={t.terms.href} className="text-foreground underline-offset-4 hover:underline">
        {t.terms.label}
      </Link>{" "}
      and{" "}
      <Link href={t.privacy.href} className="text-foreground underline-offset-4 hover:underline">
        {t.privacy.label}
      </Link>
      .
    </p>
  )
}

/** The line under a form that switches between login and sign in. */
export function Switch({ before, label, href }: { before: string; label: string; href: string }) {
  return (
    <p className="mt-10 border-t border-line pt-6 text-small text-muted-foreground">
      {before}{" "}
      <Link href={href} className="text-foreground underline-offset-4 hover:underline">
        {label}
      </Link>
    </p>
  )
}
