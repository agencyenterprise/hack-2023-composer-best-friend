// import * as Sentry from "@sentry/react"
// import { Integrations } from "@sentry/tracing"
import { ClerkProvider } from "@clerk/clerk-react"
import React from "react"
import { HelmetProvider } from "react-helmet-async"
import { BrowserRouter, useNavigate } from "react-router-dom"

import { MidiProvider } from "./hooks/useMidi"
import { AppRoutes } from "./routes/router"
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

const InnerApp = () => {
  const navigate = useNavigate()
  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <MidiProvider>
        <SignalProvider>
          <GlobalCSS />
          <AppRoutes />
        </SignalProvider>
      </MidiProvider>
    </ClerkProvider>
  )
}

export function App() {
  return (
    <React.StrictMode>
      <EmotionThemeProvider>
        <HelmetProvider>
          <BrowserRouter>
            <InnerApp />
          </BrowserRouter>
        </HelmetProvider>
      </EmotionThemeProvider>
    </React.StrictMode>
  )
}
