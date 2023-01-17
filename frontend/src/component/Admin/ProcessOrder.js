import { Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { clearErrors, getOrderDetails } from "../../actions/orderAction";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar.js";


const ProcessOrder = () => {
    const navigate = useNavigate();
    const { order, loading, error } = useSelector((state) => state.orderDetails);
    const {error:updateError,isUpdated} = useSelector((state)=>state.order);
    const dispatch = useDispatch();
    const params = useParams();
    const alert = useAlert();
    // const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pinCode},${shippingInfo.country}`; // computed from shippingInfo
    
    const [status,setStatus] = useState("");


    // const subTotal = cartItems.reduce(
    //     (acc, item) => acc + item.price * item.quantity,
    //     0
    // );


    const proceedToPayment = () => {

    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(updateError){
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if(isUpdated){
            alert.success("Order updated successfully");
            dispatch({type:UPDATE_ORDER_RESET});
        }
        dispatch(getOrderDetails(params.id)); // get all orders first
    }, [dispatch, error, navigate, params.id, alert,isUpdated,updateError]);



    return (

        <Fragment>
            <MetaData title="Process Order" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    {loading ? <Loader /> : (
                        <div className="confirmOrderPage">
                            <div>
                                <div className="confirmShippingArea">
                                    <Typography>Shipping Info</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p>Name:</p>
                                            <span>{order.user && order.user.name}</span>
                                        </div>
                                        <div>
                                            <p>Phone:</p>
                                            <span>
                                                {order.shippingInfo && order.shippingInfo.phoneNo}
                                            </span>
                                        </div>
                                        <div>
                                            <p>Address:</p>
                                            <span>
                                                {order.shippingInfo &&
                                                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                                            </span>
                                        </div>
                                    </div>

                                    <Typography>Payment</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p
                                                className={
                                                    order.paymentInfo &&
                                                        order.paymentInfo.status === "succeeded"
                                                        ? "greenColor"
                                                        : "redColor"
                                                }
                                            >
                                                {order.paymentInfo &&
                                                    order.paymentInfo.status === "succeeded"
                                                    ? "PAID"
                                                    : "NOT PAID"}
                                            </p>
                                        </div>

                                        <div>
                                            <p>Amount:</p>
                                            <span>{order.totalPrice && order.totalPrice}</span>
                                        </div>
                                    </div>

                                    <Typography>Order Status</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p
                                                className={
                                                    order.orderStatus && order.orderStatus === "Delivered"
                                                        ? "greenColor"
                                                        : "redColor"
                                                }
                                            >
                                                {order.orderStatus && order.orderStatus}
                                            </p>
                                        </div>
                                    </div>



                                </div>

                                <div className="confirmCartItems">
                                    <Typography>Your Cart Items:</Typography>
                                    <div className="confirmCartItemsContainer">
                                        {order.orderItems &&
                                            order.orderItems.map((item) => (
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
                                            {/* <span>₹{subTotal}</span> */}
                                            <span>100002</span>
                                        </div>
                                        <div>
                                            <p>Shipping Charges:</p>
                                            <span>₹12000</span>
                                            {/* <span>₹{shippingCharges}</span> */}
                                        </div>
                                        <div>
                                            <p>GST:</p>
                                            {/* <span>₹{tax}</span> */}
                                            <span>₹2300</span>
                                        </div>
                                    </div>
                                    <div className="orderSummeryTotal">
                                        <p>
                                            <b>Total:</b>
                                        </p>
                                        {/* <span>₹{totalPrice}</span> */}
                                        <span>₹100000</span>
                                    </div>
                                    <button onClick={proceedToPayment}>Proceed to payment</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
};


export default ProcessOrder;
