import { SignUp, useAuth } from "@clerk/clerk-react"
import styled from "@emotion/styled"
import Color from "color"
import React from "react"
import { useNavigate } from "react-router-dom"

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => Color(theme.backgroundColor).darken(0.2).hex()};
  width: 100%;
  height: 100%;
  min-height: 100vh;
  flex-shrink: 0;
`

export function SignUpPage() {
  const { isLoaded, userId } = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (isLoaded && userId) navigate("/search")
  }, [isLoaded, userId])

  return (
    <Container>
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        redirectUrl="/search"
        appearance={{}}
      />
    </Container>
  )
}
