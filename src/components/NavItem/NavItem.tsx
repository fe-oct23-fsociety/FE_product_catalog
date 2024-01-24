import React, { ReactNode, FC } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './NavItem.module.scss';

type Props = {
  href: string;
  children: ReactNode;
  isIcon?: boolean;
  onMobMenu?: boolean;
  count?: number;
};

export const NavItem: FC<Props> = ({
  href,
  children,
  isIcon,
  count,
  onMobMenu,
}) => {
  return (
    <div className={cn({
      [styles['navbar-item']]: !isIcon,
      [styles['navbar-item__link--footer-position']]: onMobMenu,
    })}
    >
      <NavLink
        to={href}
        key={href}
        data-content={count}
        className={({ isActive }) => cn(styles['navbar-item__link'], {
          [styles['navbar-item__link--text']]: !isIcon,
          [styles['navbar-item__link--icon']]: isIcon,
          [styles['navbar-item__link--active']]: isActive,
          [styles['navbar-item__link--icon-count']]: count,
        })}
      >
        {children}
      </NavLink>
    </div>
  );
};
