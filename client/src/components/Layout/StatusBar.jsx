import { twMerge } from "tailwind-merge"

const StatusBar = (props) => {
  return (
    <div
      {...props}
      className={twMerge(
        props.className,
        "border-t border-neutral-200 p-2 text-xs flex justify-between"
      )}
    >
      record
    </div>
  )
}

export default StatusBar
