import React, { FC, ReactNode } from 'react';
import styles from './PageSection.module.scss';

type Props = {
  children: ReactNode;
};

export const PageSection: FC<Props> = ({ children }) => {
  return (
    <div className={styles['page-section']}>
      {children}
    </div>
  );
};
