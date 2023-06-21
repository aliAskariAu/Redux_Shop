import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import AuthWrapper from "./components/AuthWrapper";
import { Navbar, Sidebar, Footer } from "./components";

import {
  Home,
  About,
  Products,
  SingleProduct,
  Cart,
  Checkout,
  PrivateRoute,
  Error,
} from "./pages";

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <AuthWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<Error />} />
      </Routes>
      </AuthWrapper>
      <Footer />
    </Router>
  );
}

export default App;
