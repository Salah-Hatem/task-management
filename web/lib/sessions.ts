import "server-only"

import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { SessionPayload } from "../types/sessionPayloadType"

const secretKey = process.env.SESSION_SECRET
if (!secretKey) {
  throw new Error("SESSION_SECRET environment variable is not defined")
}
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey)
}

export async function decrypt(cookie: string | undefined = "") {
  try {
    const result = await jwtVerify(cookie, encodedKey, {
      algorithms: ["HS256"],
    })

    return result.payload as SessionPayload
  } catch (error) {
    console.log("Failed to verify session")
    // redirect("/signin")
    return null
  }
}

export async function createSession(payload: SessionPayload) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt(payload)
  const cookieStore = await cookies()

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  })
}

export const verifySession = async () => {
  const cookie = (await cookies()).get("session")?.value
  const session = await decrypt(cookie)

  if (!session?.user) {
    redirect("/signin")
  }

  return session
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
}
