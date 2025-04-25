import { NextRequest } from "next/server"
import { updateTokens } from "../../../lib/sessions"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { accessToken, refreshToken } = body

  if (!accessToken || !refreshToken) {
    return new Response("Invalid token", { status: 401 })
  }

  await updateTokens({ accessToken, refreshToken })

  return new Response("OK", { status: 200 })
}
