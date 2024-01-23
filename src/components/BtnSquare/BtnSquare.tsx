import React from 'react';

import styles from './BtnSquare.module.scss';

type Props = {
  srcValue: string;
  altValue: string;
  sizeValue?: number;
};

export const BtnSquare: React.FC<Props> = ({
  srcValue,
  altValue,
  sizeValue = 40,
}) => {
  const btnsSize = {
    width: `${sizeValue}px`,
    height: `${sizeValue}px`,
  };

  return (
    <button style={btnsSize} type="button" className={styles.btnSquare}>
      <img src={srcValue} alt={`${altValue}`} />
    </button>
  );
};
