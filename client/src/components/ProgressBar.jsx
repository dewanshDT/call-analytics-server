import React from "react"
import { motion } from "framer-motion"
import clsx from "clsx"
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
      <motion.div
        initial={vertical ? { scaleY: 0 } : { scaleX: 0 }}
        animate={
          vertical ? { scaleY: percentage / 100 } : { scaleX: percentage / 100 }
        }
        transition={{ type: "spring", damping: 4, stiffness: 10 }}
        className={clsx(
          "w-full h-full bg-slate-700",
          vertical ? "origin-bottom" : "origin-left"
        )}
      ></motion.div>
    </div>
  )
}

export default ProgressBar
