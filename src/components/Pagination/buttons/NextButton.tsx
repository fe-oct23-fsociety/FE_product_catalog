import React from 'react';

import styles from './PaginationButtons.module.scss';

type Props = {
  srcValue?: string;
  altValue?: string;
  sizeValue?: number;
  onNextPage?: () => void;
};

export const NextButton: React.FC<Props> = ({
  srcValue,
  altValue,
  sizeValue = 32,
  onNextPage,
}) => {
  const btnsSize = {
    width: `${sizeValue}px`,
    height: `${sizeValue}px`,
  };

  return (
    <button
      style={btnsSize}
      type="button"
      className={`${styles.paginationButton} ${styles.paginationButton__arrowRight}`}
      onClick={onNextPage}
    >
      <img src={srcValue} alt={`${altValue}`} />
    </button>
  );
};
