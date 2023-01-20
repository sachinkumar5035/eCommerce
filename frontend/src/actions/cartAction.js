import {ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO} from "../constants/cartConstants";
import axios from "axios";

// add item to cart action method
export const addItemToCart = (id, quantity) => async (dispatch,getState) => {
   
        
        const {data} = await axios.get(`/api/v1/product/${id}`); // api for login a user

        dispatch({type:ADD_TO_CART, // these values will be available in store of cart 
            payload:{
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image:data.product.images[0].url,
                Stock: data.product.Stock,
                quantity,
            }
        });

        // till now we have added the item in cart if now we reload the page the cart item will remove 
        // so we will store these items in localstorage with the name cartItems 
        localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems)); // getState will fetch the items from the state and add them into cartItems in localStorage 
        
};

// remove item from cart 
export const removeItemFromCart = (id) => async (dispatch,getState) => {     
    dispatch({
        type:REMOVE_CART_ITEM, // these values will be available in store of cart 
        payload:id,
    });
    // till now we have removed the item from cart if now we reload the page the cart item will still there in cartItems state 
    // so we will store these items in localstorage with the name cartItems 
    localStorage.removeItem("cartItems",JSON.stringify(getState().cart.cartItems)); // getState will fetch the items from the state and add them into cartItems in localStorage 

};

// save shipping info
export const saveShippingInfo = (data)=> async(dispatch)=>{
    dispatch({
        type:SAVE_SHIPPING_INFO,
        payload:data,
    })
    localStorage.setItem("shippingInfo",JSON.stringify(data)); // saving shipping info in local storage as a string format
};