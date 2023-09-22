import { SignIn, useAuth } from "@clerk/clerk-react"
import React from "react"
import { useNavigate } from "react-router-dom"

export function SignInPage() {
  const { isLoaded, userId } = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (isLoaded && userId) navigate("/search")
  }, [isLoaded, userId])

  return (
    <SignIn
      path="/sign-in"
      routing="path"
      signUpUrl="/sign-up"
      redirectUrl="/search"
      appearance={{}}
    />
  )
}
