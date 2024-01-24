import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

import { PhonesPageGrid } from '../PhonesPageGrid';
import { BtnSquare } from '../BtnSquare';

import arrowLeftIcon from '../../images/icons/arrow-left.svg';
import arrowRightIcon from '../../images/icons/arrow-right.svg';
import paginationStyles from './Pagination.module.scss';

export const PhonesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const phoneItems = Array.from({ length: 13 }, (_, i) => i + 1);
  const phoneItemsToShow = phoneItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  const totalPages = Math.ceil(phoneItems.length / itemsPerPage);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  return (
    <>
      <PhonesPageGrid phoneEntities={phoneItemsToShow} />

      <ReactPaginate
        previousLabel={
          <BtnSquare sizeValue={32} srcValue={arrowLeftIcon} altValue="<" />
        }
        pageLabelBuilder={(page) => (
          <BtnSquare sizeValue={32} buttonContent={page.toString()} />
        )}
        nextLabel={
          <BtnSquare sizeValue={32} srcValue={arrowRightIcon} altValue=">" />
        }
        breakLabel="..."
        breakClassName="break-me"
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={paginationStyles.pagination}
        activeClassName={paginationStyles.pagination__active}
        previousClassName={paginationStyles.pagination__arrowLeft}
        nextClassName={paginationStyles.pagination__arrowRight}
        forcePage={currentPage}
      />
    </>
  );
};
