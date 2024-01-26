import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { apiRoutes } from '../../const/routes';
import { useAxios } from '../../hooks/useAxios';

import { ProductsPageGrid } from '../ProductsPageGrid';
import { BtnSquare } from '../BtnSquare';

import arrowLeftIcon from '../../images/icons/arrow-left.svg';
import arrowRightIcon from '../../images/icons/arrow-right.svg';
import styles from './Pagination.module.scss';
import { Loader } from '../Loader';
import { ItemsFromServer } from '../../types/ItemsFromServer';

export const ProductsPage: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname.replace('/', '');

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState(pathname);
  const [setAxios, loading, data, error] = useAxios<ItemsFromServer>(null);
  const [totalPages, setTotalPages] = useState(0);

  const limit = 10;

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setCategory(pathname);
    setCurrentPage(1);
    scrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    const offset = currentPage * limit;

    setAxios({
      method: 'get',
      url:
        `${apiRoutes.SHOW_PRODUCTS}`
        + `?${apiRoutes.CATEGORY(category)}&${apiRoutes.PAGINATION(offset, currentPage)}`,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, limit, currentPage]);

  const memoizedCount = useMemo(() => {
    if (data && data.count > 0) {
      return (Math.ceil(data.count / limit));
    }

    return 0;
  }, [data, limit]);

  useEffect(() => {
    if (memoizedCount) {
      setTotalPages(memoizedCount);
    }
  }, [memoizedCount]);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
    scrollToTop();
  };

  return (
    <>
      {loading && !error && (
        <div className={styles['container-loading']}>
          <Loader />
        </div>
      )}

      {data && data.count > 0 && <ProductsPageGrid productEntities={data} />}

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
        containerClassName={styles.pagination}
        activeClassName={styles.pagination__active}
        previousClassName={styles.pagination__arrowLeft}
        nextClassName={styles.pagination__arrowRight}
        forcePage={currentPage}
      />
    </>
  );
};
