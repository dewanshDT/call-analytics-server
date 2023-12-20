import { LuPhoneCall, LuTrash2 } from "react-icons/lu"
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom"
import { useDeleteCallById, useGetCalls } from "../../api"
import { twMerge } from "tailwind-merge"
import FileUpload from "../FileUpload"
import Loading from "../Loading"

const SideBar = () => {
  const { data, isLoading } = useGetCalls()
  const params = useParams()
  const { mutate } = useDeleteCallById(params.id)

  if (isLoading) return <Loading />

  return (
    <div className="w-64 bg-slate-950 text-neutral-200 h-full py-2 px-3 hidden lg:flex flex-col gap-4">
      <div>
        <h1 className="uppercase font-semibold text-sm py-2 px-3">duet</h1>
      </div>
      {/* Issues Section */}
      <div className="">
        <NavItem link="/calls">
          <LuPhoneCall />
          <span>Call Recordings</span>
        </NavItem>
        {/* Issues Submenu */}
        <div className="pl-4 py-1 mt-2">
          <div className="flex flex-col gap-1 border-l-2 border-slate-800 pl-2">
            {data
              ?.filter((item, index) => index < 5)
              ?.map((item, index) => (
                <NavItem key={item._id} link={"/calls/" + item._id}>
                  <span className="w-full line-clamp-1">
                    {item.Transcription}
                  </span>
                </NavItem>
              ))}
          </div>
          <Link to="/calls/" className="text-xs hover:text-white mt-2">
            more
          </Link>
        </div>
      </div>
      {/* bottom */}
      <div className="mt-auto flex flex-col mb-2 gap-4">
        {params.id && (
          <button
            onClick={mutate}
            className="bg-red-100 text-slate-800 font-bold rounded-md py-2 px-2 hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
          >
            <span>Delete Recording</span>
            <LuTrash2 />
          </button>
        )}
        <FileUpload />
      </div>
    </div>
  )
}

const NavItem = ({ link, ...props }) => {
  const location = useLocation()

  console.log(location.pathname)
  return (
    <Link to={link}>
      <div
        className={twMerge(
          "text-medium text-slate-300 text-sm py-1 px-2.5 rounded-md hover:bg-slate-700 flex gap-1.5 items-center",
          location.pathname === link && "bg-slate-700 text-white"
        )}
      >
        {props.children}
      </div>
    </Link>
  )
}

export default SideBar
