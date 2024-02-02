import React from 'react';
import { Link } from 'react-router-dom';

import styles from './BtnGoStore.module.scss';

export const BtnGoStore: React.FC = () => {
  const paths = ['/phones', '/tablets', '/accessories'];
  const randomPath = paths[Math.floor(Math.random() * paths.length)];

  return (
    <Link to={randomPath}>
      <button type="button" className={styles.btnGoStore}>
        Let&acute;s go shopping
      </button>
    </Link>
  );
};
