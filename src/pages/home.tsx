import { Link } from 'react-router-dom';

import { Search } from '../components/Search';

export function HomePage() {
  return (
    <div>
      <h1>Howdy sir!</h1>
      <Search />
      <Link to="/playground">Check this out!</Link>
    </div>
  )
}
