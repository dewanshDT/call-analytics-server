import { useState, useRef, useEffect } from "react"

const useAudioPlayer = (src) => {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    const audioElement = audioRef.current

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime)
      setDuration(audioElement.duration)
    }

    const handleLoadedMetadata = () => {
      setDuration(audioElement.duration)
    }

    if (audioElement) {
      audioElement?.addEventListener("timeupdate", handleTimeUpdate)
      audioElement?.addEventListener("loadeddata", handleLoadedMetadata)
    }

    return () => {
      audioElement?.removeEventListener("timeupdate", handleTimeUpdate)
      audioElement?.removeEventListener("loadedmetadata", handleLoadedMetadata)
    }
  }, [audioRef.current])

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`
  }

  return {
    audioRef,
    isPlaying,
    duration,
    currentTime,
    togglePlay,
    formatTime,
  }
}

export default useAudioPlayer
