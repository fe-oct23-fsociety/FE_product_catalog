import React from 'react';
import './App.css';
import { PhonesPage } from './components/phones/phones';

function App() {
  return (
    <div className="App">
      <h1>Product Catalog</h1>
      {/*
        this for testing, you can delete it
      */}
      <PhonesPage />
      {/*  */}
    </div>
  );
}

export default App;
