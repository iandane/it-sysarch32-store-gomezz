import './index.css';
import React, { useState } from 'react';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cart from './components/Cart';

function App() {
  const [cartItems, setCartItems] = useState(0);

  return (
    <Router>
      <Navbar cartItems={cartItems} />
      <Routes>
        <Route
          path="/"
          element={<ProductList setCartItems={setCartItems} />}
        />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart setCartItems={setCartItems} />} />
      </Routes>
    </Router>
  );
}

export default App;
