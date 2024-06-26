import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Cart.css";
import CartItemCard from "./CartItemCard.js";
import { useAlert } from "react-alert";
import { addItemToCart, removeItemFromCart } from "../../actions/cartAction";
import { MdRemoveShoppingCart } from "react-icons/md";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Cart = () => {
    const aler = useAlert();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { cartItems,error } = useSelector((state) => state.cart); // pulling cartItems from cart in redux store
    const {isAuthenticated} = useSelector((state)=>state.user);
    const increaseQuantity = (id, quantity, stock) => {
        const qty = quantity + 1;
        if (qty >= stock) {
            alert.error("quantity can not more than stock");
            return;
        }
        dispatch(addItemToCart(id, qty)); // dispatch addToCart function
    };

    const decreaseQuantity = (id, quantity, stock) => {
        const qty = quantity - 1;
        if (qty < 1) {
            aler.error("quantity can not less than 1");
            return;
        }
        dispatch(addItemToCart(id, qty));
    };

    const deleteCartItem = (id) => {
        dispatch(removeItemFromCart(id));
    };


    const checkOutHandler = ()=>{
        // aler.error("check out handler")
        // history.push('/login?redirect=shipping');
        if(isAuthenticated){
            navigate(`/shipping`); 
        }
        else{
            navigate('/login');
        }
    }


    useEffect(()=>{
        if(error){
            alert.error(error);
        }
        // dispatch(checkOutHandler());
    },[navigate,error,alert]);



    return (
        <Fragment>
            {cartItems.length === 0 ? (
                <div className="emptyCart">
                    <MdRemoveShoppingCart />
                    <Typography>No product in your cart </Typography>
                    <Link to={`/products`}>View products</Link>
                </div>
            ) : (
                <Fragment>
                    <div className="cartPage">
                        <div className="cartHeader">
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>SubTotal</p>
                        </div>
                        {cartItems &&
                            cartItems.map((item) => (
                                <div className="cartContainer" key={item.product}>
                                    <CartItemCard item={item} deleteCartItem={deleteCartItem} />
                                    <div className="cartInput">
                                        <button
                                            onClick={() =>
                                                decreaseQuantity(
                                                    item.product,
                                                    item.quantity,
                                                    item.stock
                                                )
                                            }
                                        >
                                            -
                                        </button>
                                        <input type="number" value={item.quantity} readOnly />
                                        <button
                                            onClick={() =>
                                                increaseQuantity(
                                                    item.product,
                                                    item.quantity,
                                                    item.stock
                                                )
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="cartSubTotal">{`₹${item.price * item.quantity
                                        }`}</div>
                                </div>
                            ))}

                        <div className="cartGrossProfit">
                            <div></div>
                            <div className="cartGrossProfitBox">
                                <p>Gross Total</p>
                                <p>{`₹${cartItems.reduce(
                                    (acc, item) => acc + item.quantity * item.price, 0
                                )
                                    }`}</p>
                            </div>
                            <div></div>
                            <div className="checkOutBtn">
                                <button onClick={checkOutHandler}>Check Out</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Cart;
