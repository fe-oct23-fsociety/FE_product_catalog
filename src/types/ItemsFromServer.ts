import { Product } from './ProductEntity';

export type ItemsFromServer = {
  count: number,
  products: Product[]
};
