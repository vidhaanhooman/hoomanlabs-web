/**
 * Login, sign in (new account) and onboarding. UI only for now: not wired
 * to auth. The header's "Platform" button opens Login (email and password);
 * new users go to Sign in, which creates the account and continues to
 * onboarding; the last onboarding step and a login hand off to the console.
 * TO CONFIRM: the console URL, the password rule, the Terms and Privacy
 * links, and whether invites carry a role.
 */
const TERMS = { before: "By continuing, you agree to our", terms: { label: "Terms", href: "#" }, privacy: { label: "Privacy Policy", href: "#" } }

export const auth = {
  /** Where a login (and the end of onboarding) lands. TO CONFIRM. */
  console: "#",
  fields: { email: "Work email", password: "Password", name: "Full name" },
  placeholders: { email: "maya@halden.example" },
  google: "Continue with Google",
  or: "or",
  terms: TERMS,

  login: {
    seo: { title: "Log in", description: "Log in to the HoomanLabs platform." },
    title: "Log in to HoomanLabs",
    line: "Build, test and run your voice and chat agents.",
    submit: "Log in",
    forgot: "Forgot password?",
    reset: {
      title: "Reset your password",
      line: "Enter your work email and we'll send you a link to set a new one.",
      submit: "Send reset link",
      sentTitle: "Check your email",
      sent: "If there's an account for {email}, a reset link is on its way.",
      back: "Back to log in",
    },
    switch: { before: "New to HoomanLabs?", label: "Sign in", href: "/sign-in" },
  },

  signIn: {
    seo: { title: "Sign in", description: "Create your HoomanLabs account." },
    title: "Create your account",
    line: "Set up your workspace in a couple of minutes.",
    submit: "Sign in",
    /** TO CONFIRM: the real password rule. */
    passwordHint: "At least 8 characters",
    /** UI only: goes to onboarding until auth is wired. */
    next: "/onboarding",
    switch: { before: "Already have an account?", label: "Log in", href: "/login" },
  },

  onboarding: {
    seo: { title: "Get started", description: "Set up your HoomanLabs workspace." },
    about: {
      title: "Tell us about you",
      line: "So we can set up your workspace.",
      fields: { company: "Company", role: "Your role", size: "Team size" },
      placeholders: { company: "Halden Energy" },
      roles: ["Founder or executive", "Customer support", "Operations", "Engineering", "Product", "Sales or marketing", "Other"],
      sizes: ["1–10", "11–50", "51–200", "201–1,000", "1,000+"],
    },
    invite: {
      title: "Invite your team",
      line: "Build and review agents together. You can always do this later.",
      field: "Work email",
      placeholders: ["priya@halden.example", "omar@halden.example"],
      add: "Add another",
      send: "Send invites",
      skip: "Skip for now",
    },
    done: {
      title: "You're all set",
      line: "Your workspace is ready. Build your first agent in the console.",
      cta: { label: "Open the console", href: "#" },
    },
    back: "Back",
    next: "Continue",
  },
}
