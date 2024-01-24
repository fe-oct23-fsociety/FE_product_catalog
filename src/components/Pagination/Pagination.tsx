import React from 'react';

import styles from './Pagination.module.scss';
import arrowLeftIcon from '../../images/icons/arrow-left.svg';
import arrowRightIcon from '../../images/icons/arrow-right.svg';

import { PreviousButton } from './buttons/PreviousButton';
import { NextButton } from './buttons/NextButton';
import { PageButton } from './buttons/PageButton';

type Props = {
  onNextPage: () => void;
  onPrevPage: () => void;
  totalPages: number;
  currentPage: number;
  setPage: (pageNumber: number) => void;
};

export const Pagination: React.FC<Props> = ({
  onNextPage,
  onPrevPage,
  totalPages,
  currentPage,
  setPage,
}) => {
  return (
    <article className={styles.pagination}>
      <PreviousButton
        srcValue={arrowLeftIcon}
        altValue="arrow left icon"
        onPrevPage={onPrevPage}
      />

      <section className={styles.pagination__items}>
        {Array.from({ length: totalPages }, (_, i) => (
          <PageButton
            key={i}
            pageNumber={i + 1}
            isActive={currentPage === i + 1}
            setPage={() => setPage(i + 1)}
          />
        ))}
      </section>

      <NextButton
        srcValue={arrowRightIcon}
        altValue="arrow right icon"
        onNextPage={onNextPage}
      />
    </article>
  );
};
