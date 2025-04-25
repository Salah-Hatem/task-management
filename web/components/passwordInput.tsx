"use client"
import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const PasswordInput = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }
  return (
    <>
      <label htmlFor="password">Password</label>
      <div className="password-input-container">
        <input
          id="password"
          name="password"
          type={passwordVisible ? "text" : "password"}
          placeholder="password"
        />
        <span
          onClick={togglePasswordVisibility}
          className="password-toggle-icon"
        >
          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
    </>
  )
}

export default PasswordInput
