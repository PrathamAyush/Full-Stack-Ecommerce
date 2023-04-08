import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import Shipping from "./Pages/Shipping";
import PlaceOrder from "./Pages/PlaceOrder";
import SelectPayment from "./Pages/SelectPayment";
import PaymentPage from "./Pages/PaymentPage";
import MyOrder from "./Pages/MyOrder";
import UserProfile from "./Pages/UserProfile";
import OrderDetail from "./Pages/OrderDetail";
import Admin from "./Administration/Admin";
import ProtectedRoute from "./Administration/ProtectedRoute";
import AllOrder from "./Administration/AllOrder";
import CreateProduct from "./Administration/CreateProduct";
import UsersDetail from "./Administration/UsersDetail";


function App() {
  return (
    <>

      <BrowserRouter>
        <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
          <Header />

          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            limit={1}
          />

          <Routes>
            {/* PUBLIC ROUTES */}
            <Route exact path="/" element={<Home />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Products" element={<AllProducts />} />
            <Route path="/Mans/:category" element={<MensAll />} />
            <Route path="/Womans/:category" element={<WomansProduct />} />
            <Route path="/product/:id" element={<ProductView />} />
            <Route path="/search/:key" element={<SearchProduct />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/payType" element={<SelectPayment />} />
            <Route path="/placeOrder/:payType" element={<PlaceOrder />} />
            <Route path="/paymentPage/:payType/:id" element={<PaymentPage />} />
            <Route path="/myOrder" element={<MyOrder />} />
            <Route path="/profile/:id" element={<UserProfile />} />
            <Route path="/myOrder/:id" element={<OrderDetail />} />

            {/* ADMIN ROUTES */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/productCreate" element={<CreateProduct />} />
              <Route path="/admin/allorder" element={<AllOrder />} />
              <Route path="/admin/users" element={<UsersDetail />} />
            </Route>

          </Routes>
        </div>
        <Footer />
      </BrowserRouter>

    </>
  );
}

export default App;
