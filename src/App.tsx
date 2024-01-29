/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';

import './styles/contentContainer.scss';
import './styles/outlet-lorem-container.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { CartProvider } from './components/CartContext/CartContext';
import { getRoutes } from './helpre';
import { BreadCrumbs } from './components/BreadCrumbs/BreadCrumbs';

const App = observer(() => {
  const [route, setRoute] = useState<string[]>([]);
  const location = useLocation();

  const isCrumbsShown = location.pathname !== '/' && location.pathname !== '/shopCart';

  useEffect(() => {
    const routes = location.pathname.split('/').filter(el => el.length > 0);

    const handleRoute = async () => {
      const resolvedData = await getRoutes(routes);

      setRoute(resolvedData);
    };

    handleRoute();
  }, [location.pathname]);

  return (
    <>
      <CartProvider>
        <div className="main-container">
          <Header />
          <div className="contentContainer">
            {isCrumbsShown && <BreadCrumbs routes={route} />}
            <Outlet />
          </div>
          <Footer />
        </div>
      </CartProvider>
    </>
  );
});

export default App;
