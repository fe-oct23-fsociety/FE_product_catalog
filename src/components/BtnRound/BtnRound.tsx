import React from 'react';

import styles from './BtnRound.module.scss';

type Props = {
  color?: string;
};

export const BtnRount: React.FC<Props> = ({ color = 'white' }) => {
  const btnBackgroundColor = {
    backgroundColor: color,
  };

  return (
    <button
      type="button"
      className={styles.btnRound}
      aria-label="Choose color"
      style={btnBackgroundColor}
    />
  );
};
