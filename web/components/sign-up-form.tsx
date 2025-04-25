"use client"
import React, { useActionState } from "react"
import Link from "next/link"
import { signUp } from "../lib/auth"
import PasswordInput from "./passwordInput"

const SingUpForm = () => {
  const [state, action, isPending] = useActionState(signUp, undefined)

  return (
    <form className="full-width signup-form" action={action}>
      {state?.message && <p className="text-s text-red">{state.message}</p>}
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" placeholder="name" />
      </div>
      {state?.error?.name && (
        <p className="text-s text-red">{state.error.name}</p>
      )}

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" />
      </div>
      {state?.error?.email && (
        <p className="text-s text-red">{state.error.email}</p>
      )}

      <div className="form-group">
        <PasswordInput />
      </div>
      {state?.error?.password && (
        <div>
          <p className="">Password must:</p>
          <ul>
            {state.error.password.map((error) => (
              <li key={error} className="text-s text-red">
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="form-group">
        <label htmlFor="linkedinUrl">LinkedIn Profile</label>
        <input
          required
          id="linkedinUrl"
          name="linkedinUrl"
          type="url"
          placeholder="LinkedIn Profile"
        />
        {state?.error?.linkedinUrl && (
          <p className="text-s text-red">{state.error.linkedinUrl}</p>
        )}
      </div>

      <div className="form-footer full-width">
        <button
          className="btn-primary full-width"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Sign up"}
        </button>
        <p className="text-s text-grey">
          Already have an account? &nbsp;
          <span>
            <Link className="text-s" href={"/signin"}>
              Sign In
            </Link>
          </span>
        </p>
      </div>
    </form>
  )
}

export default SingUpForm
