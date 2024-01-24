import React from 'react';
import { Outlet } from 'react-router-dom';

import './styles/contentContainer.scss';
import './styles/outlet-lorem-container.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

function App() {
  return (
    <>
      <Header />
      <div className="contentContainer">
        <Outlet />
        <div className="outlet-lorem-container">
          Here`&apos;`ll be something good soon... Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Tempore nihil fuga vel quasi.
          Praesentium dolores, est quia eveniet veniam minus id deleniti beatae
          consequatur. Debitis asperiores numquam suscipit sequi distinctio!
          Praesentium, vel voluptates suscipit minus quisquam debitis architecto
          voluptatum incidunt aliquid corrupti, illum corporis exercitationem
          molestias rem quos expedita sit.
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
