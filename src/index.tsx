import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import { ProductsPage } from './components/ProductsPage/ProductsPage';
import { ShopCart } from './components/ShopCart/ShopCart';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'phones',
        element: <ProductsPage />,
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
