import { Typography } from '@mui/material';
import React, { Fragment, useRef } from 'react'
import { MdCreditCard, MdEvent, MdVpnKey } from 'react-icons/md';
// import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import CheckOutSteps from './CheckOutSteps';
import "./Payment.css";
import { CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";



const Payment = () => {

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo")); // getting orderInfo from session storage

    const payBtn = useRef(null); 

    const alert = useAlert();
    const dispatch = useDispatch();
    const elements = useElements();
    const stripe = useStripe();
    const {shippingInfo,cartItems} = useSelector((state)=>state.cart); // pulling shipping info from cart state in redux store
    const {user} = useSelector((state)=>state.user); // pulling user from user state in redux store
    const {error} = useSelector((state)=>state.newOrder); // pulling error from newOrder state in redux store  



    const submitHandler = (e) => {
        e.preventDefault(); // page will not reload
        payBtn.current.disabled = true; // btn should be disable after click

        try {
            
        } catch (error) {
            
        }

    }




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
                        value={`Pay - ${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>
        </Fragment>
    )
}

export default Payment
