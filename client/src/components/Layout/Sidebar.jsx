import clsx from "clsx"
import { LuCircleDot, LuPhoneCall } from "react-icons/lu"
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom"

const SideBar = () => {
  return (
    <div className="w-52 border-r border-neutral-200 h-full py-2 px-3 hidden lg:flex flex-col gap-4">
      {/* Issues Section */}
      <div className="">
        <div
          className={clsx(
            "text-medium text-sm py-1 px-2.5 rounded-md hover:bg-neutral-200 flex gap-1.5 items-center"
          )}
        >
          <LuPhoneCall />
          <span>Calls</span>
        </div>
        {/* Issues Submenu */}
        <div className="pl-4 py-1">
          <div className="flex flex-col gap-1 border-l-2 border-neutral-100 pl-2">
            {/* <NavItem title={} */}
          </div>
        </div>
      </div>
    </div>
  )
}

const NavItem = ({ title, link }) => {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const params = useParams()
  return (
    <Link to={link}>
      <div
        className={clsx(
          "text-medium text-sm py-1 px-2.5 rounded-md hover:bg-neutral-200 flex gap-1.5 items-center",
          /^\/calls\//.test(location.pathname) && "bg-neutral-200"
        )}
      >
        <LuCircleDot />
        <span>{title}</span>
      </div>
    </Link>
  )
}

export default SideBar
