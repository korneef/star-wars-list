import React from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper } from 'shared';
import './HomePage.scss';

function HomePage() {
  return (
    <PageWrapper>
      <div className='home-page'>
        <Link className='home-page__link' to='peoples'>Peoples</Link>
        <Link className='home-page__link' to='favorites'>Favorites</Link>
      </div>
    </PageWrapper>
  );
}

export default HomePage;
