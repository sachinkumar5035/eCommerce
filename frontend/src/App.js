import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import WebFont from "webfontloader";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import Profile from "./component/User/Profile.js";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import { useAlert } from "react-alert";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import About from "./component/layout/About/About";
import Contact from "./component/layout/Contact/Contact";

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.user); // pulling isAuthenticated and user from state(redux)
  const [stripeApiKey, setStripeApiKey] = useState("");
  const dispatch = useDispatch();
  async function getStripeApiKey() {
    try {
      const {data} = await axios.get("http://localhost:4000/api/v1/stripeapikey"); // data is a object 
      console.log(data);
      setStripeApiKey(data.stripeApiKey);
    } catch(error){
    }
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser()); // user will always available in state
    
    // getStripeApiKey(); // this is giving stripe error
  }, []);
  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/contact" element={<Contact/>}/>
        {/* <ProtectedRoute exact path="/account" element={<Profile/>}/> */}
        <Route exact path="/account" element={<ProtectedRoute Component={Profile} />} />
        <Route exact path="/me/update" element={<ProtectedRoute Component={UpdateProfile} />} />
        <Route exact path="/password/update" element={<ProtectedRoute Component={UpdatePassword} />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/shipping" element={<ProtectedRoute Component={Shipping} />} />
        <Route exact path="/order/confirm" element={<ProtectedRoute Component={ConfirmOrder} />} />
        <Route exact path="/order/:id" element={<ProtectedRoute Component={OrderDetails} />} />
        <Route exact path="/success" element={<ProtectedRoute Component={OrderSuccess} />} />
        <Route exact path="/orders" element={<ProtectedRoute Component={MyOrders} />} />

        {/* admin routes */}
        <Route exact path="/admin/dashboard" element={<ProtectedRoute Component={Dashboard} />} />
        <Route exact path="/admin/products" element={<ProtectedRoute Component={ProductList} />} />
        <Route exact path="/admin/product" element={<ProtectedRoute Component={NewProduct} />} />
        <Route exact path="/admin/product/:id" element={<ProtectedRoute Component={UpdateProduct} />} />
        <Route exact path="/admin/orders" element={<ProtectedRoute Component={OrderList} />} />
        <Route exact path="/admin/order/:id" element={<ProtectedRoute Component={ProcessOrder} />} />

        {
          stripeApiKey && <Route exact path="/process/payment" element={
            <Elements stripe={loadStripe(stripeApiKey)} >
              <ProtectedRoute  Component={Payment} />
            </Elements>
          } />
        }

        <Route exact path="/admin/users" element={<ProtectedRoute Component={UsersList} />} />
        <Route exact path="/admin/user/:id" element={<ProtectedRoute Component={UpdateUser} />} />
        <Route exact path="/admin/reviews" element={<ProtectedRoute Component={ProductReviews} />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
