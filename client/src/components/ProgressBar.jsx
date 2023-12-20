import clsx from "clsx"
import React from "react"
import { twMerge } from "tailwind-merge"

const ProgressBar = ({ percentage, vertical, ...props }) => {
  return (
    <div
      {...props}
      className={twMerge(
        "border-2 border-slate-700 overflow-hidden rounded-lg",
        vertical ? "h-full w-4" : "w-full h-4",
        props.className
      )}
    >
      <div
        className={clsx(
          "w-full h-full bg-slate-700",
          vertical ? "origin-bottom" : "origin-left"
        )}
        style={{ transform: `scale${vertical ? "Y" : "X"}(${percentage}%)` }}
      ></div>
    </div>
  )
}

export default ProgressBar
