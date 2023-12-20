import { Outlet } from "react-router-dom"
import Header from "./Header"
import SideBar from "./Sidebar"
import { useAppContext } from "../../context/appContext"
import Loading from "../Loading"

function Layout() {
  const { loading } = useAppContext()
  return (
    <div className="w-full h-full flex flex-col">
      <main className="flex w-full h-full">
        {/* sidebar */}
        <SideBar />
        {/* main */}
        <div className="flex flex-col h-full w-full">
          <Header />
          <div className="flex flex-col h-full w-full overflow-y-auto overflow-x-hidden">
            {loading ? <Loading /> : <Outlet />}
          </div>
        </div>
      </main>
      {/* <StatusBar /> */}
    </div>
  )
}

export default Layout
