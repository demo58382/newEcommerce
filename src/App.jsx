import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import AddToCart from "./components/AddToCart.jsx"
import Home from "./Home.jsx"
import Products from "./Products.jsx"
import Error from "./Error.jsx"
import SingleProduct from "./SingleProduct.jsx"

const App = () => {

  return (<>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/singleProduct/:id" element={<SingleProduct/>} />
        <Route path="/addToCart" element={<AddToCart/>} />
        <Route path="*" element={<Error/>} />
      </Routes>
      <Footer/>
    </Router>
    </>
  );
};

export default App;