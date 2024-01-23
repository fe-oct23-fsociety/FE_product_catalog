import React from 'react';
import { Outlet } from 'react-router-dom';

import './styles/contentContainer.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

function App() {
  return (
    <>
      <Header />
      <div className="contentContainer">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
