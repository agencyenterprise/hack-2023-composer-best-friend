// import * as Sentry from "@sentry/react"
// import { Integrations } from "@sentry/tracing"
import React from "react"
import { HelmetProvider } from "react-helmet-async"
import { defaultTheme } from "./common/theme/Theme"
import { ActionDialog } from "./components/ActionDialog"
import { PromptDialog } from "./components/PromptDialog"
import { Toast } from "./components/Toast"
import { Routes } from "./routes/router"
import { GlobalKeyboardShortcut } from "./signal/components/KeyboardShortcut/GlobalKeyboardShortcut"
import { EmotionThemeProvider } from "./signal/components/Theme/EmotionThemeProvider"
import { GlobalCSS } from "./signal/components/Theme/GlobalCSS"
import { DialogProvider } from "./signal/hooks/useDialog"
import { PromptProvider } from "./signal/hooks/usePrompt"
import { StoreContext } from "./signal/hooks/useStores"
import { ThemeContext } from "./signal/hooks/useTheme"
import { ToastProvider } from "./signal/hooks/useToast"
import RootStore from "./signal/stores/RootStore"

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
      <StoreContext.Provider value={new RootStore()}>
        <ThemeContext.Provider value={defaultTheme}>
          <EmotionThemeProvider>
            <HelmetProvider>
              <ToastProvider component={Toast}>
                <PromptProvider component={PromptDialog}>
                  <DialogProvider component={ActionDialog}>
                    <GlobalKeyboardShortcut />
                    <GlobalCSS />
                    <Routes />
                  </DialogProvider>
                </PromptProvider>
              </ToastProvider>
            </HelmetProvider>
          </EmotionThemeProvider>
        </ThemeContext.Provider>
      </StoreContext.Provider>
    </React.StrictMode>
  )
}
