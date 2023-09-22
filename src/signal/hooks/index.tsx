import React from "react"

import { defaultTheme } from "../../common/theme/Theme"
import { ActionDialog } from "../../components/ActionDialog"
import { PromptDialog } from "../../components/PromptDialog"
import { Toast } from "../../components/Toast"

import { GlobalKeyboardShortcut } from "../components/KeyboardShortcut/GlobalKeyboardShortcut"
import RootStore from "../stores/RootStore"

import { DialogProvider } from "./useDialog"
import { PromptProvider } from "./usePrompt"
import { StoreContext } from "./useStores"
import { ThemeContext } from "./useTheme"
import { ToastProvider } from "./useToast"

interface SignalProviderProps {
  children: React.ReactNode
}

export function SignalProvider({ children }: SignalProviderProps) {
  return (
    <StoreContext.Provider value={new RootStore()}>
      <ThemeContext.Provider value={defaultTheme}>
        <ToastProvider component={Toast}>
          <PromptProvider component={PromptDialog}>
            <DialogProvider component={ActionDialog}>
              <GlobalKeyboardShortcut />
              {children}
            </DialogProvider>
          </PromptProvider>
        </ToastProvider>
      </ThemeContext.Provider>
    </StoreContext.Provider>
  )
}
