import React from 'react';

import styles from './PaginationButtons.module.scss';

type Props = {
  srcValue?: string;
  altValue?: string;
  sizeValue?: number;
  onPrevPage: () => void;
};

export const PreviousButton: React.FC<Props> = ({
  srcValue,
  altValue,
  sizeValue = 32,
  onPrevPage,
}) => {
  const btnsSize = {
    width: `${sizeValue}px`,
    height: `${sizeValue}px`,
  };

  return (
    <button
      style={btnsSize}
      type="button"
      className={`${styles.paginationButton} ${styles.paginationButton__arrowLeft}`}
      onClick={onPrevPage}
    >
      <img src={srcValue} alt={`${altValue}`} />
    </button>
  );
};
