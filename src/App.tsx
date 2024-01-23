import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';

function App() {
  return (
    <>
      <Header />
      <NavLink to="/">Home</NavLink>
      <NavLink to="/phones">Phones</NavLink>
      <Outlet />
      <footer className="footer">this is footer</footer>
    </>
  );
}

export default App;
