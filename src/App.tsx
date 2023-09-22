// import * as Sentry from "@sentry/react"
// import { Integrations } from "@sentry/tracing"
import React from "react"

import { HelmetProvider } from "react-helmet-async"

import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react"

import { MidiProvider } from "./hooks/useMidi"
import { Routes } from "./routes/router"
import { EmotionThemeProvider } from "./signal/components/Theme/EmotionThemeProvider"
import { GlobalCSS } from "./signal/components/Theme/GlobalCSS"
import { SignalProvider } from "./signal/hooks"

// Sentry.init({
//   dsn: process.env.SENTRY_DSN,
//   release: process.env.VERCEL_GIT_COMMIT_SHA,
//   environment: process.env.VERCEL_ENV,
//   integrations: [new Integrations.BrowserTracing()],
//   tracesSampleRate: 1.0,
// })

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY

export function App() {
  return (
    <React.StrictMode>
      <ClerkProvider publishableKey={clerkPubKey}>
        <SignedIn>
          <EmotionThemeProvider>
            <HelmetProvider>
              <MidiProvider>
                <SignalProvider>
                  <GlobalCSS />
                  <Routes />
                </SignalProvider>
              </MidiProvider>
            </HelmetProvider>
          </EmotionThemeProvider>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </ClerkProvider>
    </React.StrictMode>
  )
}
