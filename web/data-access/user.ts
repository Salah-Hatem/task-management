import "server-only"
import { cache } from "react"
import { verifySession } from "../lib/sessions"
import { BackendUrl } from "../lib/contants"
import { User } from "../types/userType"

export const getUser = cache(async () => {
  const session = await verifySession()
  if (!session) return null

  const userId = session.user.id

  try {
    const response = await fetch(`${BackendUrl}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
    if (!response.ok) {
      console.error("Error fetching user:", response.statusText)
      return null
    }
    return (await response.json()) as User
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching user:", error.message)
    }
    return null
  }
})
