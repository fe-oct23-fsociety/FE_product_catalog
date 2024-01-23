import React from 'react';
import { NavList } from '../NavList';
import { Logo } from '../Logo';
import { NavItem } from '../NavItem';
import { ReactComponent as FavouritesIcon } from '../../images/icons/favourites.svg';

import { ReactComponent as ShopBagIcon } from '../../images/icons/shopping-bag.svg';

import { useWindowWidth } from '../../hooks/useWindowWidth';
import './styles.scss';

export const Header: React.FC = () => {
  const isNotMob = useWindowWidth() > 600;

  return (
    <header className="header">
      <div className="header__nav">
        <Logo />
        {isNotMob && <NavList />}
      </div>

      {isNotMob && (
        <div className="header__icons">
          <NavItem href="/" isIcon>
            <FavouritesIcon />
          </NavItem>

          <NavItem href="/shopCart" isIcon count={3}>
            <ShopBagIcon />
          </NavItem>
        </div>
      )}
    </header>
  );
};
