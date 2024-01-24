import React from 'react';
import cn from 'classnames';

import styles from './BtnSquare.module.scss';

type Props = {
  srcValue?: string;
  altValue?: string;
  sizeValue?: number;
  buttonContent?: string;
  classNameValue?: string;
};

export const BtnSquare: React.FC<Props> = ({
  srcValue,
  altValue,
  buttonContent,
  sizeValue = 40,
  classNameValue,
}) => {
  const btnsSize = {
    width: `${sizeValue}px`,
    height: `${sizeValue}px`,
  };

  return (
    <button
      style={btnsSize}
      type="button"
      className={cn(styles.btnSquare, classNameValue)}
    >
      {buttonContent || <img src={srcValue} alt={`${altValue}`} />}
    </button>
  );
};
