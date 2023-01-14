import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
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
import Payment from "./component/Cart/Payment.js";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import { Switch } from "@material-ui/core";

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.user); // pulling isAuthenticated and user from state(redux)

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    try {
      const data = await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      alert.error(error);
    }
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser()); // user will always available in state
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Search />} />
        <Route exact path="/search" element={<Search />} />
        {/* <ProtectedRoute exact path="/account" element={<Profile/>}/> */}
        <Route exact path="/account" element={<ProtectedRoute Component={Profile} />} />
        <Route exact path="/me/update" element={<ProtectedRoute Component={UpdateProfile} />} />
        <Route exact path="/password/update" element={<ProtectedRoute Component={UpdatePassword} />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/login/shipping" element={<ProtectedRoute Component={Shipping} />} />

        {/* {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path="/process/payment" component={Payment} />
          </Elements>
        )} */}

        {
          stripeApiKey && (<Route exact path="/process/payment" element={
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute Component={Payment} />
            </Elements>
          } />)
        }
        {/* for testing purpose  */}
        {/* <Route exact path="/orders" element={<MyOrders/>}/>  */}
        <Route exact path="/success" element={<ProtectedRoute Component={OrderSuccess} />} />
        <Route exact path="/orders" element={<ProtectedRoute Component={MyOrders} />} />

        <Switch>
          <Route exact path="/order/:id" element={<ProtectedRoute Component={OrderDetails} />} />
          <Route exact path="/order/confirm" element={<ProtectedRoute Component={ConfirmOrder} />} />
        </Switch>

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
