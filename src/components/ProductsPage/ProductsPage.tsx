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
  const [category, setCategory] = useState(pathname);
  const [setAxios, loading, data, error] = useAxios<ItemsFromServer>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  const getCurrentPage = (): number => {
    const page = searchParams.get('page');

    return page ? +page - 1 : 0;
  };

  const setLimit = (val: Pagination | string) => {
    setSearchParams(prev => Object
      .assign(Object.fromEntries(prev.entries()), { limit: val }));

    if (searchParams.get('page')) {
      setSearchParams(prev => Object
        .assign(Object.fromEntries(prev.entries()), { limit: val, page: 1 }));
    }
  };

  const getLimit = useCallback((): string | Pagination => {
    const limit = searchParams.get('limit');

    if (limit && Object.values(Pagination).includes(limit as Pagination)) {
      return limit;
    }

    return Pagination.Sixteen;
  }, [searchParams]);

  const setSortType = (val: SortOrder | string) => {
    setSearchParams(prev => Object
      .assign(Object.fromEntries(prev.entries()), { order: val }));
  };

  const getSortType = (): string | SortOrder => {
    const order = searchParams.get('order');

    if (order && Object.values(SortOrder).includes(order as SortOrder)) {
      return order;
    }

    return SortOrder.ASC;
  };

  const setSortBy = (val: SortType | string) => {
    setSearchParams(prev => Object
      .assign(Object.fromEntries(prev.entries()), { sortBy: val }));
  };

  const getSortBy = (): string | SortType => {
    const sortBy = searchParams.get('sortBy');

    if (sortBy && Object.values(SortType).includes(sortBy as SortType)) {
      return sortBy;
    }

    return SortType.Newest;
  };

  useEffect(() => {
    setCategory(pathname);
    scrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    const offset = getCurrentPage() * +getLimit();

    setAxios({
      method: 'get',
      url:
        `${apiRoutes.SHOW_PRODUCTS}`
        + `?${apiRoutes.CATEGORY(category)}&${apiRoutes.PAGINATION(+getLimit(), offset)}`
        + `&${apiRoutes.SORT_BY(getSortBy())}&${apiRoutes.SORT_TYPE(getSortType())}`
        + `&${apiRoutes.SEARCH(searchValue)}`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, getLimit(), getCurrentPage(), getSortType(), getSortBy(), searchValue]);

  const memoizedCount = useMemo(() => {
    if (data && data.count > 0) {
      return Math.ceil(data.count / +getLimit());
    }

    return 0;
  }, [data, getLimit]);

  useEffect(() => {
    if (memoizedCount >= 0) {
      setTotalPages(memoizedCount);
    }
  }, [memoizedCount]);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setSearchParams(prev => Object
      .assign(Object.fromEntries(prev.entries()), { page: selectedItem.selected + 1 }));

    scrollToTop();
  };

  const productsToRender = getProductsToRender(data?.products || [], getSortType());

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
      {totalPages > 0
        && (
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
            forcePage={getCurrentPage()}
          />
        )}
    </>
  );
};
