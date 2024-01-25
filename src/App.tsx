import React from 'react';
import { Outlet } from 'react-router-dom';

import './styles/contentContainer.scss';
import './styles/outlet-lorem-container.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { CartProvider } from './components/CartContext/CartContext';

function App() {
  return (
    <>
      <CartProvider>
        <div className="main-container">
          <Header />
          <div className="contentContainer">
            <Outlet />
          </div>
          <Footer />
        </div>
      </CartProvider>
    </>
  );
}

export default App;
