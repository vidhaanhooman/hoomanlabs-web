import type { Metadata } from "next"

import { SignIn } from "@/components/auth/sign-in"
import { auth } from "@/content/auth"

export const metadata: Metadata = {
  title: auth.signIn.seo.title,
  description: auth.signIn.seo.description,
}

export default function SignInPage() {
  return <SignIn />
}
