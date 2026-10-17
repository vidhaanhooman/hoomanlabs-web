import type { Metadata } from "next"

import { Login } from "@/components/auth/login"
import { auth } from "@/content/auth"

export const metadata: Metadata = {
  title: auth.login.seo.title,
  description: auth.login.seo.description,
}

export default function LoginPage() {
  return <Login />
}
