import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
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
import { useSelector } from "react-redux";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";





function App() {
  const { user, isAuthenticated } = useSelector((state) => state.user); // pulling isAuthenticated and user from state(redux)

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    if(!user)
      store.dispatch(loadUser()); // user will always available in state
  }, [user]);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Search />} />
        <Route exact path="/search" element={<Search />} />
        {/* <ProtectedRoute exact path="/account" element={<Profile/>}/> */}
        <Route exact path="/account" element={<ProtectedRoute Component={Profile} />} />
        <Route exact path="/me/update" element={<ProtectedRoute Component={UpdateProfile} />} />
        <Route exact path="/password/update" element={<ProtectedRoute Component={UpdatePassword} />} />
        <Route exact path="/password/forgot" element={<ForgotPassword/>} />
        <Route exact path="/password/reset/:token" element={<ResetPassword/>}/>
        <Route exact path="/cart" element={<Cart/>}/>
        <Route exact path="/login/shipping" element={<ProtectedRoute Component={Shipping} />} />
        <Route exact path="/order/confirm" element={<ProtectedRoute Component={ConfirmOrder} />} />
        <Route exact path="/login" element={<LoginSignUp />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
