import React from 'react';
import './container.scss';
import { Card } from '../Card';
import { Product } from '../../types/ProductEntity';

type Props = {
  productEntities: Product[];
};

export const ProductsPageGrid: React.FC<Props> = ({ productEntities }) => {
  return (
    <div className="container">
      {productEntities.map((productEntity) => (
        <Card productData={productEntity} key={productEntity.id} />
      ))}
    </div>
  );
};

export default ProductsPageGrid;
