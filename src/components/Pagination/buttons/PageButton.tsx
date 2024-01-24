import React from 'react';
import cn from 'classnames';

import styles from './PaginationButtons.module.scss';

type Props = {
  sizeValue?: number;
  pageNumber: number;
  isActive: boolean;
  setPage: () => void;
};

export const PageButton: React.FC<Props> = ({
  sizeValue = 32,
  pageNumber,
  isActive,
  setPage,
}) => {
  const btnsSize = {
    width: `${sizeValue}px`,
    height: `${sizeValue}px`,
  };

  return (
    <button
      style={btnsSize}
      type="button"
      className={cn(styles.paginationButton, {
        [styles.paginationButton__active]: isActive,
      })}
      onClick={setPage}
    >
      {pageNumber}
    </button>
  );
};
