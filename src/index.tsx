import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import { PhonesPage } from './components/phones/phones';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'phones',
        element: <PhonesPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(<RouterProvider router={router} />);
