import React from 'react';
import './container.scss';
import { Card } from '../Card';
import { ItemsFromServer } from '../../types/ItemsFromServer';
import { Product } from '../../types/ProductEntity';

type Props = {
  productEntities: ItemsFromServer;
  products: Product[];
};

export const ProductsPageGrid: React.FC<Props> = ({ productEntities, products }) => {
  const countOfGoods = productEntities.count;

  return (
    <>
      <br />
      <p>
        Total items number:
        {countOfGoods}
      </p>
      <div className="container">
        {products.map((good) => (
          <Card productData={good} key={good.id} />
        ))}
      </div>
    </>
  );
};

export default ProductsPageGrid;
