import { createBrowserRouter, Navigate } from "react-router-dom"
import Layout from "../components/Layout"
import Home from "./Calls"
import Call from "./Call"
import Calls from "./Calls"

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Navigate to="calls" /> },
        { path: "calls", element: <Calls /> },
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
