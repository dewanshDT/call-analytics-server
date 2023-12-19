import { useGetCalls } from "../api"

const Home = () => {
  const { data } = useGetCalls()
  return (
    <div className="p-4 w-full h-full overflow-y-auto flex flex-col items-center">
      <h2 className="text-3xl font-bold mt-8 w-full">Recordings</h2>
      <ul className="mx-8 my-6 flex flex-col max-w-6xl">
        {data.map((item, index) => (
          <li
            key={item._id}
            className="font-semibold text-lg text-slate-300 w-full px-4 py-2 hover:text-slate-600"
          >
            <span className="line-clamp-1">{item.Transcription}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
