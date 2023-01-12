import React from 'react';
import "./OrderSuccess.css";
import { MdCheckCircle } from 'react-icons/md';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return (
        <div className="orderSuccess">
            <MdCheckCircle />
            <Typography>Your order has placed successfully</Typography>
            <Link to="/order/me">View Orders</Link>
        </div>
    )
}

export default OrderSuccess;
