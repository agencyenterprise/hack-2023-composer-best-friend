// import * as Sentry from "@sentry/react"
// import { Integrations } from "@sentry/tracing"
import React from "react"
import { HelmetProvider } from "react-helmet-async"
import { Routes } from "./routes/router"

import { MidiProvider } from "./hooks/useMidi"
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

export function App() {
  return (
    <React.StrictMode>
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
    </React.StrictMode>
  )
}
