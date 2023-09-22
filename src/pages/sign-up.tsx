import { SignUp, useAuth } from "@clerk/clerk-react"
import React from "react"
import { useNavigate } from "react-router-dom"

export function SignUpPage() {
  const { isLoaded, userId } = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (isLoaded && userId) navigate("/search")
  }, [isLoaded, userId])

  return (
    <SignUp
      path="/sign-up"
      routing="path"
      signInUrl="/sign-in"
      redirectUrl="/search"
      appearance={{}}
    />
  )
}
