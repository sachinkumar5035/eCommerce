import { Typography } from '@mui/material';
import React, { Fragment, useRef } from 'react'
import { MdCreditCard, MdEvent, MdVpnKey } from 'react-icons/md';
// import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import CheckOutSteps from './CheckOutSteps';
import "./Payment.css";
import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js"





const Payment = () => {

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo")); // getting orderInfo from session storage

    const payBtn = useRef(null); 



    const submitHandler = () => {
        console.log("submit handler");
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
