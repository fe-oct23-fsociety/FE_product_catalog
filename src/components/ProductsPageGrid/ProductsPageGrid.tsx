/* eslint-disable no-console */
import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import '../../styles/mixins.scss';
import './container.scss';
import { Card } from '../Card';
import { Search } from '../Search';
import { ItemsFromServer } from '../../types/ItemsFromServer';
import { Product } from '../../types/ProductEntity';
import { Pagination, SortBy, SortOrder } from '../../types/sortType';
import { Categories } from '../../types/categories';

type Props = {
  productEntities: ItemsFromServer;
  products: Product[];
  onPaginationSelect: Dispatch<SetStateAction<string>>;
};

export const ProductsPageGrid: React.FC<Props> = ({
  productEntities,
  products,
  onPaginationSelect,
}) => {
  const countOfGoods = productEntities.count;

  const [categoryHeaderName, setCategoryHeaderName] = useState<string | undefined>('');

  useEffect(() => {
    const { hash } = window.location;
    const trimmedCategoryName = hash.substring(2);
    let categoryName;

    switch (trimmedCategoryName) {
      case 'phones': {
        categoryName = Categories.MOBIES;
        break;
      }

      case 'tablets': {
        categoryName = Categories.TABLETS;
        break;
      }

      case 'accessories': {
        categoryName = Categories.ACCESSORIES;
        break;
      }

      default: break;
    }

    setCategoryHeaderName(categoryName?.toString());
  }, [products]);

  return (
    <>
      <br />
      <h1 className="category__title">
        {categoryHeaderName}
      </h1>
      <p className="description">{`${countOfGoods} models`}</p>

      <div className="params-container">
        <div className="sort">
          <div className="sorter">
            <label htmlFor="sort__pagination" className="pagination__description">
              Items on page
            </label>
            <select
              name=""
              id=""
              className="select__pagination"
              onChange={(event) => onPaginationSelect(event.target.value)}
            >
              <option value={Pagination.Sixteen}>{Pagination.Sixteen}</option>
              <option value={Pagination.ThirtyTwo}>{Pagination.ThirtyTwo}</option>
              <option value={Pagination.SixtyFour}>{Pagination.SixtyFour}</option>
            </select>
          </div>

          <div className="sorter">
            <label htmlFor="sort__sort-by" className="sort-by__description">
              Sort by
            </label>
            <select
              name=""
              id=""
              className="sort__sort-by"
              onChange={(event) => onPaginationSelect(event.target.value)}
            >
              <option value={SortBy.Newest}>{SortBy.Newest}</option>
              <option value={SortBy.Price}>{SortBy.Price}</option>
              <option value={SortBy.Screen}>{SortBy.Screen}</option>
            </select>
          </div>

          <div className="sorter">
            <label htmlFor="sort__sort-order" className="sort-order__description">
              Sort by
            </label>
            <select
              name=""
              id=""
              className="sort__sort-order"
              onChange={(event) => onPaginationSelect(event.target.value)}
            >
              <option value={SortOrder.DESC}>From high to low</option>
              <option value={SortOrder.ASC}>From low to high</option>
            </select>
          </div>
        </div>

        <div>
          <Search handleSearch={(arg) => console.log(arg)} />
        </div>
      </div>

      <div className="container">
        {products.map((good) => (
          <Card productData={good} key={good.id} />
        ))}
      </div>
    </>
  );
};

export default ProductsPageGrid;
