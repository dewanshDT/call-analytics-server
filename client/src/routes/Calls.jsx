import { Link } from "react-router-dom"
import { useGetCalls } from "../api"
import Loading from "../components/Loading"

const Calls = () => {
  const { data, isLoading } = useGetCalls()

  if (isLoading) return <Loading />

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col items-center">
      <ul className="flex flex-col  w-full">
        {data?.map((item, index) => (
          <Link key={item._id} to={`/calls/${item._id}`}>
            <li className="flex justify-end h-24 items-center relative overflow-hidden font-semibold text-2xl transition-colors text-slate-500 w-full py-2 px-20 hover:text-slate-900 hover:bg-slate-200">
              <span className="w-[4em] text-left text-8xl font-bold absolute left-4 -bottom-7 text-slate-100">
                {index + 1}
              </span>
              <span className="line-clamp-1 w-full z-10">
                {item.Transcription}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default Calls
