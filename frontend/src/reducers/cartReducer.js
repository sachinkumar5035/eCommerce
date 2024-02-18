import {ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO} from "../constants/cartConstants";



// add to cart and remove item from cart reducer 
export const cartReducer = (state = { cartItems: [],shippingInfo:{} }, action) => {

    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const isItemExists = state.cartItems.find(
                (i) => i.product === item.product // product is like id of item 
            );
            if(isItemExists){ // item exists in the cart already
                return{
                    ...state,
                    cartItems: state.cartItems.map((i)=>
                    i.product === isItemExists.product ? item : i)
                };
            }
            else{ // item does not exists
                return {
                    ...state,
                    cartItems:[...state.cartItems,item], // append this item in cart item array
                };
            }

        case REMOVE_CART_ITEM:
            return {
                ...state,
                // i.product is actually id of product if it is not same which we need to remove, that product will be add to cartItems if id matches than it will be neglacted
                cartItems: state.cartItems.filter((i)=> i.product !== action.payload), //  
            }
            case SAVE_SHIPPING_INFO:
                return{ // save the shipping info 
                    ...state,
                    shippingInfo:action.payload,
                }
        default:
            return state;
    }

}