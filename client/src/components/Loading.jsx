import React from "react"
import { CgSpinner } from "react-icons/cg"

const Loading = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <CgSpinner className="animate-spin text-3xl" />
    </div>
  )
}

export default Loading
