import { Link } from "react-router-dom"

export function HomePage() {
  return (
    <div>
      <h1>Howdy sir!</h1>
      <Link to="/playground">Check this out!</Link>
    </div>
  )
}
