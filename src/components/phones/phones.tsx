import React, { useState } from 'react';
import { PhonesPageGrid } from '../PhonesPageGrid';
import { Pagination } from '../Pagination';

export const PhonesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const phoneItems = Array.from({ length: 13 }, (_, i) => i + 1);
  const phoneItemsToShow = phoneItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(phoneItems.length / itemsPerPage);

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  return (
    <>
      <PhonesPageGrid phoneEntities={phoneItemsToShow} />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setPage={(pageNumber: number) => setCurrentPage(pageNumber)}
        onNextPage={() => goToNextPage()}
        onPrevPage={() => goToPreviousPage()}
      />
    </>
  );
};
