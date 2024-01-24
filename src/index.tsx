import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import { PhonesPage } from './components/phones/phones';
import { ShopCart } from './components/ShopCart/ShopCart';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'phones',
        element: <PhonesPage />,
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
