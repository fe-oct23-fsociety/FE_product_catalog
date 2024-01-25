const apiUrl = 'https://fsociety-be-product-catalog.onrender.com';

export const apiRoutes = {
  SHOW_PRODUCTS: `${apiUrl}/products`,
  CATEGORY: (category: string) => (
    `category=${category}`
  ),
  PAGINATION: (limit: number, offset: number) => (
    `limit=${limit}&offset=${offset}`
  ),
};
