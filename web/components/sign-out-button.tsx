"use client"
import React, { PropsWithChildren, useActionState } from "react"
import { signOut } from "../lib/auth"

const SignOutButton = ({ children }: PropsWithChildren) => {
  const [state, action, isPending] = useActionState(signOut, undefined)

  return (
    <form action={action}>
      <button className="btn-primary" disabled={isPending} type="submit">
        {isPending ? "Loading..." : children}
      </button>
    </form>
  )
}

export default SignOutButton
