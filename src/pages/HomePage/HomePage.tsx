import React from 'react';
import { Link } from 'react-router-dom';

interface Props {

}

function HomePage(props: Props) {
  return (
    <div>
      <Link to='peoples' >Peoples</Link>
      <Link to='favorites' >Favorites</Link>
    </div>
  );
}

export default HomePage;
