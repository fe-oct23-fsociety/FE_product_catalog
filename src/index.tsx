import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import { ProductsPage } from './components/ProductsPage/ProductsPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ShopCart } from './components/ShopCart/ShopCart';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { HomePage } from './components/HomePage/HomePage';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'phones',
        element: <ProductsPage />,
      },
      {
        path: 'phones/:id',
        element: <ProductDetailPage />,
      },
      {
        path: 'tablets',
        element: <ProductsPage />,
      },
      {
        path: 'accessories',
        element: <ProductsPage />,
      },
      {
        path: 'shopCart',
        element: <ShopCart />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(<RouterProvider router={router} />);
