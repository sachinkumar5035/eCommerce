import { Typography } from '@mui/material';
import React, { Fragment, useEffect, useRef } from 'react'
import { MdCreditCard, MdEvent, MdVpnKey } from 'react-icons/md';
// import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import CheckOutSteps from './CheckOutSteps';
import "./Payment.css";
import { CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { clearErrors, createOrder } from '../../actions/orderAction';
import { removeItemFromCart } from '../../actions/cartAction';

const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo")); // getting orderInfo from session storage
    const payBtn = useRef(null);
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const elements = useElements();
    const stripe = useStripe();
    const { shippingInfo, cartItems } = useSelector((state) => state.cart); // pulling shipping info from cart state in redux store
    const { user } = useSelector((state) => state.user); // pulling user from user state in redux store
    const { error } = useSelector((state) => state.newOrder); // pulling error from newOrder state in redux store  


    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100), // stripe takes payment in paise so to make ruppee in paise multiply it by 100
    }

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subTotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    }

    const submitHandler = async (e) => {
        e.preventDefault(); // page will not reload
        payBtn.current.disabled = true; // btn should be disable after click
        try {

            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }
            // in backend only amount is needed to make payment currency and metadata already defined
            const { data } = await axios.post("/api/v1/payment/process", paymentData, config); // payment API key in app.js in backend
            console.log("data -----",data);
            const client_secret = data.client_secret;
            if (!stripe || !elements) return;
            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        }
                    },
                },
            });
            if (result.error) { // got and error 
                payBtn.current.disabled = false; // enable the payment button
                alert.error(result.error.message); // show the error
            }
            else { // did not get error while payment
                if (result.paymentIntent.status === "succeeded") {

                    // place order here 
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    }
                    dispatch(createOrder(order)); // calling orderaction method to place order 
                    
                    // dispatch({type:REMOVE_CART_ITEM,id:cartItems[0].product});
                    
                        cartItems && cartItems.forEach(element => {
                            dispatch(removeItemFromCart(element.product)); // remove item from cart
                        });
                    
                    // remove cartItems from cart

                    navigate("/success"); // redirect to success page 
                }
                else {
                    alert.error("There's some issue while processing payment");
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error.response.data.message);
            alert.error("some error occured");
        }

    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, alert, navigate,]);


    return (
        <Fragment>
            <MetaData title="Payment -ECOMMERCE" />
            <CheckOutSteps activeStep={2} /> {/* last step of order */}
            <div className="paymentContainer">
                <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                    <Typography>Card info</Typography>
                    <div>
                        <MdCreditCard />
                        <CardNumberElement className='paymentInput' />
                    </div>
                    <div>
                        <MdEvent />
                        <CardExpiryElement className='paymentInput' />
                    </div>
                    <div>
                        <MdVpnKey />
                        <CardCvcElement className='paymentInput' />
                    </div>
                    <input
                        type="submit"
                        value={`Pay  ₹${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>
        </Fragment>
    )
}

export default Payment