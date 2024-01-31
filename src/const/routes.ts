const apiUrl = 'https://fsociety-be-product-catalog.onrender.com';

export const apiRoutes = {
  SHOW_PRODUCTS: `${apiUrl}/products`,
  CATEGORY: (category: string) => `category=${category}`,
  DISCOUNT: '/discount',
  PAGINATION: (limit: number, offset: number) => `limit=${limit}&offset=${offset}`,
  SORT_BY: (sortBy: string) => `sortBy=${sortBy}`,
  SORT_TYPE: (sortType: string) => `sortType=${sortType}`,
};
