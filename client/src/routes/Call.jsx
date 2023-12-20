import { useParams } from "react-router-dom"
import { BASE_API_URL, useGetCallById } from "../api"
import ProgressBar from "../components/ProgressBar"
import { LuPauseCircle, LuPlayCircle, LuScrollText } from "react-icons/lu"
import { getEmotionEmoji } from "../utils"
import useAudioPlayer from "../hooks/useAudioPlayer"

const Call = () => {
  const { id } = useParams()
  const { data } = useGetCallById(id)

  const src = `${BASE_API_URL}/${data?.FilePath}`

  const audio = useAudioPlayer(src)

  if (data)
    return (
      <>
        <div className="flex flex-col w-full">
          <div className="text-lg text-light text-black tracking-wider px-8 py-6 bg-yellow-50 leading-[2.4em] min-h-[40vh]">
            <div className="text-sm bg-yellow-200 px-2 py-1 w-min rounded-md font-medium mb-7 text-slate-700 uppercase flex items-center gap-1">
              <LuScrollText />
              <span>Transcription</span>
            </div>
            <div>{data.Transcription}</div>
          </div>
          <div className="flex">
            <div className="w-full border-b border-slate-100 flex flex-col justify-around gap-4 px-8 py-10">
              {data.BertAnalytics[0]?.map((item, index) => (
                <div key={item.label + index} className="flex flex-col gap-1">
                  <div className="uppercase text-xs font-medium flex items-center gap-1">
                    <span className="text-lg tracking-widest">
                      {item.label === "Positive"
                        ? "😁"
                        : item.label === "Negative"
                        ? "😞"
                        : "🤝"}{" "}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  <ProgressBar percentage={item.score * 100} />
                </div>
              ))}
            </div>
            <div className="h-[4em] relative aspect-square flex items-center justify-center bg-slate-700 text-white font-semibold text-7xl">
              <span>100</span>
              <span className="absolute bottom-6 right-6 text-9xl font-black opacity-10 scale-[2.5]">
                %
              </span>
            </div>
          </div>
          <div className="w-full border-b border-slate-100 flex justify-around gap-4 px-8 py-10 bg-slate-100">
            {data.EmotionAnalytics?.map((item, index) => (
              <div
                key={item.label + index}
                className="flex flex-col items-center gap-1 h-44"
              >
                <ProgressBar vertical percentage={item.score * 100} />
                <div className="uppercase text-xs font-medium flex items-center gap-1">
                  <span className="text-lg tracking-widest">
                    {getEmotionEmoji(item.label)}{" "}
                  </span>
                  <span>{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-40"></div>
        <div className="fixed bottom-8 right-10 text-slate-50 bg-slate-800 p-3 flex gap-4 rounded-full shadow-xl border-2 border-slate-200">
          <button
            onClick={audio.togglePlay}
            className="flex text-6xl text-slate-200 rounded-full hover:bg-slate-700 focus:outline-none"
          >
            {audio.isPlaying ? <LuPauseCircle /> : <LuPlayCircle />}
          </button>
          {audio.duration !== 0 && (
            <div className="flex flex-col min-h-full py-2 w-full mr-4">
              <div className="flex bg-slate-600 px-2 py-0.5 rounded-md">
                <span>{audio.formatTime(audio.currentTime)}</span>
                <span className="whitespace-pre"> / </span>
                <span>{audio.formatTime(audio.duration)}</span>
              </div>
              <div className="w-full mt-auto">
                <ProgressBar
                  className="h-1.5"
                  percentage={(audio.currentTime / audio.duration) * 100}
                />
              </div>
            </div>
          )}
          <audio className="hidden" ref={audio.audioRef} src={src} />
        </div>
      </>
    )

  return <div></div>
}

export default Call
