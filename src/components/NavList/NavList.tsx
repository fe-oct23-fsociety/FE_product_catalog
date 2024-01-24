import React from 'react';
import cn from 'classnames';
import { NavItem } from '../NavItem';
import styles from './NavList.module.scss';

const navList = [
  {
    href: '/',
    title: 'Home',
  },
  {
    href: '/phones',
    title: 'Phones',
  },
  {
    href: '/tablets',
    title: 'Tablets',
  },
  {
    href: '/accessories',
    title: 'Accessories',
  },
];

type Props = {
  toColumn?: boolean;
};

export const NavList: React.FC<Props> = ({ toColumn }) => {
  return (
    <nav
      className={cn(styles['nav-bar'], {
        [styles['nav-bar--col']]: toColumn,
      })}
      data-cy="Nav"
    >
      {navList.map(({ href, title }) => (
        <NavItem key={href} href={href}>
          {title}
        </NavItem>
      ))}
    </nav>
  );
};
