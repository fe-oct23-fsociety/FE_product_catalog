import React from 'react';
import './container.scss';
import { Card } from '../Card';
import { ItemsFromServer } from '../../types/ItemsFromServer';
import { Product } from '../../types/ProductEntity';

type Props = {
  productEntities: ItemsFromServer;
};

export const ProductsPageGrid: React.FC<Props> = ({ productEntities }) => {
  const countOfGoods = productEntities.count;
  const goodsToRender: Product[] = productEntities.products;

  return (
    <>
      <br />
      <p>
        Total items number:
        {countOfGoods}
      </p>
      <div className="container">
        {goodsToRender.map((good) => (
          <Card productData={good} key={good.id} />
        ))}
      </div>
    </>
  );
};

export default ProductsPageGrid;
