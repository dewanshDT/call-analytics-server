import { useParams } from "react-router-dom"

const Call = () => {
  const { id } = useParams()

  return <div>{id}</div>
}

export default Call
