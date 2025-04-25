import React, { PropsWithChildren } from "react"

const AuthLayout = ({ children }: PropsWithChildren) => {
  return <div className="form-layout">{children}</div>
}

export default AuthLayout
