/**
 * The visitor's country (ISO code) from Vercel's edge header, so the call box
 * can preselect a dialling code. Empty locally. Nothing is stored or logged.
 */
export function GET(request: Request) {
  const country = request.headers.get("x-vercel-ip-country") ?? ""
  return Response.json({ country }, { headers: { "Cache-Control": "private, no-store" } })
}
