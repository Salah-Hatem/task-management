"use client"
import React, { useActionState } from "react"
import Link from "next/link"
import { signin } from "../lib/auth"
import PasswordInput from "./passwordInput"

const SingInForm = () => {
  const [state, action, isPending] = useActionState(signin, undefined)

  return (
    <form className="full-width signup-form" action={action}>
      {state?.message && <p className="text-s text-red">{state.message}</p>}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" />
      </div>
      {state?.error?.email && (
        <p className="text-s text-red">{state.error.email}</p>
      )}

      <div className="form-group">
        <PasswordInput />
        {state?.error?.password && (
          <p className="text-s text-red">{state.error.password}</p>
        )}
        {/* TODO: Add password reset */}
        {/* <Link className="text-s" href={"/reset-password"}>
          Forgot Password ?
        </Link> */}
      </div>

      <div className="form-footer full-width">
        <button
          className="btn-primary full-width"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Sign in"}
        </button>
        <p className="text-s text-grey">
          No account yet? &nbsp;
          <span>
            <Link className="text-s" href={"/signup"}>
              Sign up
            </Link>
          </span>
        </p>
      </div>
    </form>
  )
}

export default SingInForm
