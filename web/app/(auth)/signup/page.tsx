import Link from "next/link"
import React from "react"
import LogoComponent from "../../../components/logo"
import SingUpForm from "../../../components/sign-up-form"

const SignUpPage = () => {
  return (
    <>
      <LogoComponent />
      <div className="form-container">
        <h1>Register a new account</h1>
        <SingUpForm />
      </div>
    </>
  )
}

export default SignUpPage
