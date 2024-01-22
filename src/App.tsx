import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <header className="header"> this is header</header>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/phones">Phones</NavLink>
      <Outlet />
      <footer className="footer">this is footer</footer>
    </>
  );
}

export default App;
