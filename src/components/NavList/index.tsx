import { FC } from 'react';
import { NavItem } from './NavItem';
import './styles.scss';

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

export const NavList: FC = () => {
  return (
    <nav
      className="nav-bar"
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
