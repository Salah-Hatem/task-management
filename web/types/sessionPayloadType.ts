export type SessionPayload = {
  user: {
    id: string
    email: string
    name: string
  }
  accessToken: string
  // refreshToken: string
}
