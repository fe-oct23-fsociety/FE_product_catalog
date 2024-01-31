import React, { Dispatch, SetStateAction } from 'react';
import './container.scss';
import { Card } from '../Card';
import { ItemsFromServer } from '../../types/ItemsFromServer';
import { Product } from '../../types/ProductEntity';
import { Pagination } from '../../types/sortType';

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

  return (
    <>
      <br />
      <p
        className="description"
      >
        {`${countOfGoods} models`}
      </p>

      <div className="sort">
        <div className="pagination">
          <p className="pagination__description">
            Items on page
          </p>
          <select
            name=""
            id=""
            className="sort__pagination"
            onChange={(event) => onPaginationSelect(event.target.value)}
          >
            <option
              value={Pagination.Sixteen}
            >
              {Pagination.Sixteen}
            </option>
            <option
              value={Pagination.ThirtyTwo}
            >
              {Pagination.ThirtyTwo}
            </option>
            <option
              value={Pagination.SixtyFour}
            >
              {Pagination.SixtyFour}
            </option>
          </select>
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
