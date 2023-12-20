import clsx from "clsx"
import React from "react"
import { LuGithub } from "react-icons/lu"
import { Link, useLocation } from "react-router-dom"

const Header = () => {
  const location = useLocation()
  return (
    <header className="px-6 py-2 border-b border-neutral-200 flex justify-between items-center">
      <div>
        <h1 className="font-semibold text-xs flex items-center gap-1.5 text-slate-700">
          {location.pathname.split("/").map((item, index) => (
            <React.Fragment key={item + index}>
              <span>{item}</span>
              <span
                className={clsx(
                  "opacity-50 font-normal",
                  index === 0 && "hidden",
                  index === location.pathname.split("/").length - 1 && "hidden"
                )}
              >
                &gt;
              </span>
            </React.Fragment>
          ))}
        </h1>
      </div>
      <div className="">
        <Link to="https://github.com/dewanshDT/IssueBoard" target="_blank">
          <div className="hover:bg-slate-200 p-1.5 text-base rounded-md">
            <LuGithub />
          </div>
        </Link>
      </div>
    </header>
  )
}

export default Header
