import React from 'react'
import { Link } from 'react-router-dom';
import "./CartItemCard.css";


const CartItemCard = ({item,deleteCartItem}) => {

  return (
    <div className="cartItemCard">
        <img src={item.image} alt="ssa" />
        <div>
            <Link to={`/product/${item.product}`}>{item.name} </Link>
            <span>{`Price ₹ ${item.price}`}</span>
            <p onClick={()=>deleteCartItem(item.product)}>Remove</p>
        </div>
    </div>
  )
}

export default CartItemCard
