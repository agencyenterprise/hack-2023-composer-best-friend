import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react"
import { Link, Route, Routes } from "react-router-dom"
import { SearchPage, SignInPage, SignUpPage, SignalPage } from "../pages"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Link to="/search">Get Started!</Link>} />
      <Route path="/sign-in/*" element={<SignInPage />} />
      <Route path="/sign-up/*" element={<SignUpPage />} />
      <Route
        path="/search"
        element={
          <>
            <SignedIn>
              <SearchPage />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />
      <Route
        path="/playground"
        element={
          <>
            <SignedIn>
              <SignalPage />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />
    </Routes>
  )
}
