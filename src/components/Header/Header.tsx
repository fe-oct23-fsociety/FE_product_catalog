import React, {
  FC, useState, useEffect, useContext, forwardRef,
} from 'react';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { NavList } from '../NavList';
import { Logo } from '../Logo';
import { NavItem } from '../NavItem';
import { BtnMenu } from '../BtnMenu';
import { ReactComponent as FavouritesIcon } from '../../images/icons/favourites.svg';
import { ReactComponent as ShopBagIcon } from '../../images/icons/shopping-bag.svg';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { CartContext } from '../CartContext/CartContext';
import styles from './Header.module.scss';
import { favourites } from '../../store/FavouritesStorage';

export const Header: FC = observer(forwardRef<HTMLElement>((props, ref) => {
  const [showMobMenu, setShowMobMenu] = useState(false);
  const isNotMob = useWindowWidth() >= 640;
  const location = useLocation();

  const { cartCount } = useContext(CartContext);
  const { itemsInFavourites } = favourites;

  useEffect(() => {
    setShowMobMenu(false);
  }, [location]);

  useEffect(() => {
    if (showMobMenu && !isNotMob) {
      document.body.style.overflow = 'hidden';
    } else if (!showMobMenu || isNotMob) {
      document.body.style.overflow = 'unset';
    }
  }, [showMobMenu, isNotMob]);

  return (
    <>
      <header ref={ref} className={styles.header}>
        <div className={styles.header__nav}>
          <Logo />
          {isNotMob && <NavList />}
        </div>

        {!isNotMob && (
          <BtnMenu onclick={setShowMobMenu} onClose={!showMobMenu} />
        )}

        {isNotMob && (
          <div className={styles.header__icons}>
            <NavItem
              href="/favourites"
              isIcon
              count={itemsInFavourites}
            >
              <FavouritesIcon />
            </NavItem>

            <NavItem href="/shopCart" isIcon count={cartCount}>
              <ShopBagIcon />
            </NavItem>
          </div>
        )}
      </header>

      <div
        className={cn(styles['header__mob-menu'], {
          [styles['header__mob-menu--show']]: showMobMenu && !isNotMob,
        })}
      >
        <NavList toColumn />

        <div className={styles['header__mob-menu-footer']}>
          <NavItem
            href="/favourites"
            isIcon
            count={itemsInFavourites}
            onMobMenu
          >
            <FavouritesIcon />
          </NavItem>

          <NavItem
            href="/shopCart"
            isIcon
            count={cartCount}
            onMobMenu
          >
            <ShopBagIcon />
          </NavItem>
        </div>
      </div>
    </>
  );
}));
Header.displayName = 'Header';
