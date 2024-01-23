import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.svg';
import styles from './Logo.module.scss';

export const Logo: FC = () => {
  return (
    <h1 className={styles.logo}>
      <NavLink to="/">
        <img src={logo} alt="nice gadgets" />
      </NavLink>
    </h1>
  );
};
