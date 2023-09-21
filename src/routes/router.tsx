import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { HomePage, SignalPage } from "../pages"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/playground",
    element: <SignalPage />,
  },
])

export const Routes = () => {
  return <RouterProvider router={router} />
}
