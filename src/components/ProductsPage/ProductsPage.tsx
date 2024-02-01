/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { apiRoutes } from '../../const/routes';
import { useAxios } from '../../hooks/useAxios';

import { ProductsPageGrid } from '../ProductsPageGrid';
import { BtnSquare } from '../BtnSquare';
import { scrollToTop } from '../../helpers';

import arrowLeftIcon from '../../images/icons/arrow-left.svg';
import arrowRightIcon from '../../images/icons/arrow-right.svg';
import styles from './Pagination.module.scss';
import { ItemsFromServer } from '../../types/ItemsFromServer';
import { Pagination, SortOrder, SortType } from '../../types/sortType';
import { getProductsToRender } from './helper';

export const ProductsPage: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname.replace('/', '');

  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(0);
  const [category, setCategory] = useState(pathname);
  const [setAxios, loading, data, error] = useAxios<ItemsFromServer>(null);
  const [totalPages, setTotalPages] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sortType, setSortType] = useState<SortOrder | string>(SortOrder.ASC);
  const [sortBy, setSortBy] = useState<SortType | string>(SortType.Newest);
  // const [limit, setLimit] = useState<Pagination | string>(Pagination.Sixteen);
  const [searchValue, setSearchValue] = useState('');

  const setLimit = (val: Pagination | string) => {
    setSearchParams(`limit=${val}`);
  };

  const getLimit = useCallback((): string | Pagination => {
    const limit = searchParams.get('limit');

    if (limit && Object.values(Pagination).includes(limit as Pagination)) {
      return limit;
    }

    return Pagination.Sixteen;
  }, [searchParams]);

  // eslint-disable-next-line no-console, padding-line-between-statements
  console.log(getLimit());

  useEffect(() => {
    setCategory(pathname);
    setCurrentPage(0);
    scrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    const offset = currentPage * +getLimit();

    setAxios({
      method: 'get',
      url:
        `${apiRoutes.SHOW_PRODUCTS}`
        + `?${apiRoutes.CATEGORY(category)}&${apiRoutes.PAGINATION(+getLimit(), offset)}`
        + `&${apiRoutes.SORT_BY(sortBy)}&${apiRoutes.SORT_TYPE(sortType)}`
        + `&${apiRoutes.SEARCH(searchValue)}`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, getLimit(), currentPage, sortType, sortBy, searchValue]);

  const memoizedCount = useMemo(() => {
    if (data && data.count > 0) {
      return Math.ceil(data.count / +getLimit());
    }

    return 0;
  }, [data, getLimit]);

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
      <ProductsPageGrid
        productEntities={data}
        products={productsToRender}
        onPaginationSelect={setLimit}
        onSortBySelect={setSortBy}
        onSortTypeSelect={setSortType}
        getSearch={setSearchValue}
        isLoading={loading}
        isError={error}
      />

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
