import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import ProductList from './components/ProductList';
 

function App() {
  return (
    <>
      <Routes>
         <Route path='/' element={<ProductList />}/>
      </Routes>

    </>
  );
}

export default App;
