import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import './styles.scss';
import React, { ReactNode } from 'react';

type Props = {
  href: string;
  children: ReactNode;
  isIcon?: boolean;
  count?: number;
};

export const NavItem: React.FC<Props> = ({
  href, children, isIcon, count,
}) => {
  return (
    <div className={cn({ 'navbar-item': !isIcon })}>
      <NavLink
        to={href}
        key={href}
        data-content={count}
        className={({ isActive }) => cn('navbar-item__link', {
          'navbar-item__link--text': !isIcon,
          'navbar-item__link--icon': isIcon,
          'navbar-item__link--active': isActive,
          'navbar-item__link--icon-count': count,
        })}
      >
        {children}
      </NavLink>
    </div>
  );
};
