import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BreadCrumbs.module.scss';

interface Props {
  routes: string[];
}

export const BreadCrumbs: React.FC<Props> = ({ routes }) => {
  return (
    <div className={styles.crumbs}>
      <Link to="/" className={styles.homepageLink} />
      {routes.map((route) => (
        <p key={route}>{route}</p>
      ))}
    </div>
  );
};
