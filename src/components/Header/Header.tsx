import React, { FC } from 'react';
import { NavList } from '../NavList';
import { Logo } from '../Logo';
import { NavItem } from '../NavItem';
import { ReactComponent as FavouritesIcon } from '../../images/icons/favourites.svg';
import { ReactComponent as ShopBagIcon } from '../../images/icons/shopping-bag.svg';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import styles from './Header.module.scss';

export const Header: FC = () => {
  const isNotMob = useWindowWidth() > 600;

  return (
    <header className={styles.header}>
      <div className={styles.header__nav}>
        <Logo />
        {isNotMob && <NavList />}
      </div>

      {isNotMob && (
        <div className={styles.header__icons}>
          <NavItem href="/" isIcon>
            <FavouritesIcon />
          </NavItem>

          <NavItem href="/shop" isIcon count={3}>
            <ShopBagIcon />
          </NavItem>
        </div>
      )}
    </header>
  );
};
