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
import { SortType } from '../../types/sortType';
import { getProductsToRender } from './helper';

export const ProductsPage: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname.replace('/', '');

  const [currentPage, setCurrentPage] = useState(0);
  const [category, setCategory] = useState(pathname);
  const [setAxios, loading, data, error] = useAxios<ItemsFromServer>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [sortType, setSortType] = useState<SortType | string>('');

  const limit = 10;

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setCategory(pathname);
    setCurrentPage(0);
    scrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    const offset = currentPage * limit;

    setAxios({
      method: 'get',
      url:
        `${apiRoutes.SHOW_PRODUCTS}`
        + `?${apiRoutes.CATEGORY(category)}&${apiRoutes.PAGINATION(limit, offset)}`,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, limit, currentPage]);

  const memoizedCount = useMemo(() => {
    if (data && data.count > 0) {
      return Math.ceil(data.count / limit);
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

  const productsToRender = getProductsToRender(data?.products || [], sortType);

  return (
    <>
      {loading && !error && (
        <div className={styles['container-loading']}>
          <Loader />
        </div>
      )}

      <select
        name=""
        id=""
        className="select"
        onChange={(event) => {
          setSortType(event.target.value);
        }}
      >
        <option
          value={SortType.Newest}
        >
          {SortType.Newest}
        </option>
        <option
          value={SortType.PriceAsc}
        >
          {SortType.PriceAsc}
        </option>
        <option
          value={SortType.PriceDesc}
        >
          {SortType.PriceDesc}
        </option>
        <option
          value={SortType.Screen}
        >
          {SortType.Screen}
        </option>
      </select>

      {data && data.count > 0
      && <ProductsPageGrid productEntities={data} products={productsToRender} />}

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
