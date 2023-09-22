import { SignedIn, SignedOut } from "@clerk/clerk-react"
import { Navigate, Route, Routes } from "react-router-dom"
import { SearchPage, SignInPage, SignUpPage, SignalPage } from "../pages"
import { HomePage } from "../pages/home"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
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
              <Navigate to="/sign-in" />
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
              <Navigate to="/sign-in" />
            </SignedOut>
          </>
        }
      />
    </Routes>
  )
}
