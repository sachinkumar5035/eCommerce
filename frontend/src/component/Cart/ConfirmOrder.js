import { Typography } from "@mui/material";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import CheckOutSteps from "./CheckOutSteps";
import "./ConfirmOrder.css";



const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart); // pulling shippingInfo and cartItems from cart Store
  const { user } = useSelector((state) => state.user); // pulling user from user store use of redux
  const navigate = useNavigate();
  const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pinCode},${shippingInfo.country}`; // computed from shippingInfo

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCharges = subTotal > 1000 ? 0 : 200;
  const tax = subTotal * .18;
  const totalPrice = subTotal + tax + shippingCharges;


  const proceedToPayment = () => {
    const data = {
      subTotal,
      shippingCharges,
      tax,
      totalPrice
    }
    sessionStorage.setItem("orderInfo", JSON.stringify(data)); // stored in session store
    navigate("process/payment"); // redirect to payment 
  }


  return (
    <Fragment>
      <MetaData title="Confirm order -- ECOMMERCE" />
      <CheckOutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmShippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmShippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>{" "}
                {/* address will be computed from shippingInfo. */}
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} ✕ ₹{item.price}={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummery">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Sub Total:</p>
                <span>₹{subTotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>
            <div className="orderSummeryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>
            <button onClick={proceedToPayment}>Proceed to payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
