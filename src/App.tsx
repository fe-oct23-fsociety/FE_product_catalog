import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import './App.css';
import { Footer } from './components/Footer';

function App() {
  return (
    <>
      <header className="header"> this is header</header>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/phones">Phones</NavLink>
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
