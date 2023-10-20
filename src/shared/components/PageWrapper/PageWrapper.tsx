import React, { ReactNode } from 'react';
import './PageWrapper.scss';

type Props = {
  children: ReactNode
}

function PageWrapper({children}: Props) {
  return (
    <div className='page-wrapper'>{ children }</div>
  );
}

export default PageWrapper;
