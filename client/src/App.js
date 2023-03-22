import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import Footer from "./components/Footer/Footer";
import Header from "./components/Headers/Header";
import Home from "./components/Home/Home";
import CartPage from "./Pages/CartPage";
import ProductView from "./Pages/ProductView";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import AllProducts from "./Pages/AllProducts";
import MensAll from "./Pages/MensAll";
import WomansProduct from "./Pages/WomansProduct";
import SearchProduct from "./Pages/SearchProduct";


function App() {
  return (
    <>

      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Products" element={<AllProducts />} />
          <Route path="/Mans/:category" element={<MensAll />} />
          <Route path="/Womans/:category" element={<WomansProduct />} />
          <Route path="/product/:id" element={<ProductView />} />
          <Route path="/search/:key" element={<SearchProduct />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </>
  );
}

export default App;
