import { useCaseCalls } from "@/content/demo-calls"

/**
 * POST /api/callback — "Get this call on your phone".
 *
 * Creates a task on the HoomanLabs API so the demo agent for the chosen use
 * case calls the visitor back. The secret token lives ONLY in server env vars
 * (see .env.example); nothing secret is ever sent to the browser.
 *
 * Guards: strict input validation, required consent, honeypot field, and a
 * loose in-memory rate limit per IP (the same number may be called repeatedly). In-memory limits reset when the
 * server restarts and aren't shared across instances; put a shared limiter
 * (e.g. Redis/Upstash) and a bot check (e.g. Cloudflare Turnstile) in front
 * before high-traffic launch.
 */

const API_URL = process.env.HOOMAN_API_URL ?? "https://api.hoomanlabs.com/routes/v1/tasks/"

/** Allowed country codes -> timezone used for the calling window. */
const COUNTRIES: Record<string, string> = {
  "+44": "Europe/London",
  "+1": "America/New_York",
  "+91": "Asia/Kolkata",
  "+34": "Europe/Madrid",
}

/** Use case id -> env var holding that use case's demo agent id. */
const AGENT_ENV: Record<string, string> = {
  "collections-en": "HOOMAN_AGENT_COLLECTIONS",
  "appointments-hi": "HOOMAN_AGENT_APPOINTMENTS",
  "support-es": "HOOMAN_AGENT_SUPPORT",
  "sales-en": "HOOMAN_AGENT_SALES",
}

const IP_WINDOW_MS = 60 * 60 * 1000
const IP_LIMIT = 20 // per IP per hour: loose anti-abuse guard; repeat calls to a number are allowed

const byIp = new Map<string, number[]>()

function fail(status: number, error: string) {
  return Response.json({ ok: false, error }, { status })
}

export async function POST(request: Request) {
  const token = process.env.HOOMAN_API_TOKEN
  const campaign = process.env.HOOMAN_CAMPAIGN_ID
  if (!token || !campaign) {
    return fail(503, "Demo calls aren't switched on yet.")
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return fail(400, "Invalid request.")
  }

  // Honeypot: real visitors never fill this hidden field.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return Response.json({ ok: true })
  }

  const { country, phone, useCase, consent } = body
  if (consent !== true) return fail(400, "Please agree to receive the call.")
  if (typeof country !== "string" || !(country in COUNTRIES)) return fail(400, "That country isn't supported yet.")
  if (typeof phone !== "string") return fail(400, "Enter a valid phone number.")
  const digits = phone.replace(/\D/g, "").replace(/^0+/, "")
  if (digits.length < 6 || digits.length > 14) return fail(400, "Enter a valid phone number.")
  const e164 = `${country}${digits}`
  if (!/^\+[1-9]\d{7,14}$/.test(e164)) return fail(400, "Enter a valid phone number.")

  if (typeof useCase !== "string" || !(useCase in AGENT_ENV)) return fail(400, "Unknown use case.")
  const agent = process.env[AGENT_ENV[useCase]]
  if (!agent) return fail(503, "This demo agent isn't switched on yet.")
  const call = useCaseCalls.find((c) => c.id === useCase)

  // Rate limits.
  const now = Date.now()
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown"
  const recent = (byIp.get(ip) ?? []).filter((t) => now - t < IP_WINDOW_MS)
  if (recent.length >= IP_LIMIT) return fail(429, "Too many requests. Try again in a little while.")

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({
      phone: e164,
      campaign,
      agent,
      // Calling window as HHMM in the visitor's timezone (defaults: any time).
      start: Number(process.env.HOOMAN_CALL_START ?? 0),
      end: Number(process.env.HOOMAN_CALL_END ?? 2359),
      timezone: COUNTRIES[country],
      retries: 1,
      context: { source: "website-demo", useCase: call?.useCase ?? useCase },
    }),
    signal: AbortSignal.timeout(10_000),
  }).catch(() => null)

  if (!res || !res.ok) {
    // Don't leak upstream details to the browser; log them server-side.
    console.error("callback: task creation failed", res?.status, res ? await res.text().catch(() => "") : "network")
    return fail(502, "We couldn't place the call right now. Please try again.")
  }

  byIp.set(ip, [...recent, now])
  return Response.json({ ok: true })
}
