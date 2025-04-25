import React from "react"
import SingInForm from "../../../components/sign-in-form"
import LogoComponent from "../../../components/logo"

const SignInPage = () => {
  return (
    <>
      <LogoComponent />
      <div className="form-container">
        <h1>Sign In To Your Account</h1>
        <SingInForm />
      </div>
    </>
  )
}

export default SignInPage
