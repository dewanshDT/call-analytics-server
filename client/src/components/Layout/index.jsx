import { Outlet } from "react-router-dom"
import Header from "./Header"
import SideBar from "./Sidebar"
import { useGetCalls } from "../../api"

function Layout() {
  const { data } = useGetCalls()

  return (
    <div className="w-full h-full flex flex-col">
      <main className="flex w-full h-full">
        {/* sidebar */}
        <SideBar />
        {/* main */}
        <div className="flex flex-col h-full w-full">
          <Header />
          <div className="flex flex-col h-full w-full overflow-y-auto overflow-x-hidden">
            <Outlet />
          </div>
        </div>
      </main>
      {/* <StatusBar /> */}
    </div>
  )
}

export default Layout
