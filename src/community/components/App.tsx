import { FC } from "react"
import { HelmetProvider } from "react-helmet-async"
import { EmotionThemeProvider } from "../../signal/components/Theme/EmotionThemeProvider"
import { GlobalCSS } from "../../signal/components/Theme/GlobalCSS"
import { StoreContext } from "../hooks/useStores"
import RootStore from "../stores/RootStore"
import { RootView } from "./RootView"

export const App: FC = () => {
  return (
    <StoreContext.Provider value={new RootStore()}>
      <EmotionThemeProvider>
        <HelmetProvider>
          <GlobalCSS />
          <RootView />
        </HelmetProvider>
      </EmotionThemeProvider>
    </StoreContext.Provider>
  )
}
