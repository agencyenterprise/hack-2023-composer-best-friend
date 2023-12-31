import { CSSProperties, useEffect, useState } from "react"

import Color from "color"
import { Link } from "react-router-dom"

import { UserButton, useAuth, useSession } from "@clerk/clerk-react"
import styled from "@emotion/styled"

import LogoText from "../assets/logo-text.svg"

import axios from "axios"
import { Search } from "../components/Search"

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background: ${({ theme }) => Color(theme.backgroundColor).darken(0.2).hex()};
  height: 3rem;
  flex-shrink: 0;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100vh - 3rem);
  max-height: calc(100vh - 3rem);
  position: relative;
  padding-top: 10vh;
`

export const Tab = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; 
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  border-top: solid 0.1rem transparent;
  color: ${({ theme }) => theme.secondaryTextColor};

  &.active {
    color: ${({ theme }) => theme.textColor};
    background: ${({ theme }) => theme.backgroundColor};
    border-top-color: ${({ theme }) => theme.themeColor};
  }

  &:hover {
    background: ${({ theme }) => theme.highlightColor};
  }

  a {
    color: inherit;
    text-decoration: none;
  }
}
`

export const TabTitle = styled.span`
  margin-left: 0.5rem;

  @media (max-width: 850px) {
    display: none;
  }
`

const FlexibleSpacer = styled.div`
  flex-grow: 1;
`

export const IconStyle: CSSProperties = {
  width: "1.3rem",
  height: "1.3rem",
  fill: "currentColor",
}

export function SearchPage() {
  const { isLoaded, userId } = useAuth()
  const { session } = useSession()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkUser() {
      try {
        const token = session?.getToken()
        await axios.post(
          `${process.env.API_URL}/users`,
          { clerkUserId: userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
      } catch (err) {
        console.log("Error checking user", err)
        setIsLoading(false)
      } finally {
        setIsLoading(false)
      }
    }

    if (isLoaded && userId && session) {
      checkUser()
    }
  }, [isLoaded, userId, session])

  return (
    <div>
      <Container>
        <FlexibleSpacer />
        <Tab className="flex flex-row gap-10">
          <Link
            to="https://ae.studio?utm_source=composerpal.com"
            target="_blank"
          >
            <TabTitle>Made with ❤️ by AE Studio</TabTitle>
          </Link>
        </Tab>
        <Tab className="flex flex-row gap-10">
          <UserButton afterSignOutUrl="/sign-in" />
        </Tab>
      </Container>
      <Content>
        <LogoText style={{ marginBottom: "20px" }} />
        <Search isLoading={isLoading} />
      </Content>
    </div>
  )
}
