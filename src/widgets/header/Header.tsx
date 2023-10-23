import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

function Header() {

  const className = 'header'

  return (
    <header className={ className }>
      <ul className={`${className}__menu-list`}>
        <li className={`${className}__menu-item`}>
          <NavLink className={ ({isActive, isPending, isTransitioning}) =>
          [
            `${ className }__nav-link`,
            isActive ? `${ className }__nav-link_active` : "",
          ].join(" ")
        } to={ 'peoples' }>peoples</NavLink>
        </li>
        <li className={`${className}__menu-item`}>
          <NavLink className={ ({isActive, isPending, isTransitioning}) =>
            [
              `${ className }__nav-link`,
              isActive ? `${ className }__nav-link_active` : "",
            ].join(" ")
          } to={ 'favorites' }>favorites</NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Header;
