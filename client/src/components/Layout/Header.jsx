import { LuGithub } from "react-icons/lu"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="px-6 py-2 border-b border-neutral-200 flex justify-between items-center">
      <div>
        <h1 className="uppercase font-semibold text-sm">duet</h1>
      </div>
      <div className="">
        <Link to="https://github.com/dewanshDT/IssueBoard" target="_blank">
          <div className="hover:bg-neutral-950 p-1.5 text-base rounded-md">
            <LuGithub />
          </div>
        </Link>
      </div>
    </header>
  )
}

export default Header
