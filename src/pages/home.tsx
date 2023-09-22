import { Link } from 'react-router-dom';

import { UserButton } from '@clerk/clerk-react';

import { Search } from '../components/Search';

export function HomePage() {
  return (
    <div>
      <UserButton />
      <h1>Howdy sir!</h1>
      <Search />
      <Link to="/playground">Check this out!</Link>
    </div>
  )
}
