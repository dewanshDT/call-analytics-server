import { createBrowserRouter } from "react-router-dom"
import Layout from "../components/Layout"
import Home from "./Home"
import Call from "./Call"

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "calls/:id",
          element: <Call />,
        },
      ],
    },
  ],
  { basename: import.meta.env.DEV ? "/" : "/CallBoard/" }
)

export default router
