/* eslint-disable no-console */
import { Product } from '../../types/ProductEntity';
import { SortType } from '../../types/sortType';

export const getProductsToRender = (products: Product[], sortType: SortType | string) => {
  const productsToRender = [...products];

  switch (sortType) {
    case SortType.Newest:
      productsToRender.sort((product1, product2) => (
        product2.year - product1.year
      ));
      break;

    case SortType.Screen:
      productsToRender.sort((product1, product2) => (
        parseFloat(product1.screen) - parseFloat(product2.screen)
      ));
      break;

    default:
      break;
  }

  return productsToRender;
};
