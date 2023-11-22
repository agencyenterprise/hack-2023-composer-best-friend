import { SignedIn, SignedOut } from "@clerk/clerk-react"
import { Navigate, Route, Routes } from "react-router-dom"
import {
  HomePage,
  Pricing,
  SearchPage,
  SignInPage,
  SignUpPage,
  SignalPage,
  WhoMadeThis,
} from "../pages"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in/*" element={<SignInPage />} />
      <Route path="/sign-up/*" element={<SignUpPage />} />
      <Route path="/Pricing" element={<Pricing />} />
      <Route path="/who-made-this" element={<WhoMadeThis />} />
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
