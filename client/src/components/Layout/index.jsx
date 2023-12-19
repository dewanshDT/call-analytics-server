import { Outlet } from "react-router-dom"
import Header from "./Header"
import StatusBar from "./StatusBar"
import SideBar from "./Sidebar"
import { useEffect } from "react"
import { useGetCalls } from "../../api"

function Layout() {
  const { data } = useGetCalls()

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      <main className="flex h-full">
        {/* sidebar */}
        <SideBar />
        {/* main */}
        <div className="flex flex-col h-full w-full">
          <Outlet />
        </div>
      </main>
      <StatusBar />
    </div>
  )
}

export default Layout
