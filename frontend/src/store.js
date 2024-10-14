import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { deleteProductReducer, newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewsReducer, reviewsReducer } from "./reducers/productReducer.js";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer.js";
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, ordersDetailsReducer, updateOrdersReducer } from "./reducers/orderReducer.js";


// we are creating a reducer using combine reducer for all like product and image etc.
const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer, // storeName then reducer_name this store name will be appear in store
    user: userReducer, // in redux store there is a user store will appear which hold the data of logged in user
    profile: profileReducer, // to profile in store
    forgotPassword: forgotPasswordReducer, // for forgot password 
    cart: cartReducer, // cart reducer for cart functionality
    newOrder: newOrderReducer, // reducer for order 
    myOrder: myOrdersReducer, // to see my own orders
    orderDetails: ordersDetailsReducer, // to store orderDetails 
    newReview: newReviewReducer, // to store review 
    newProduct: newProductReducer, // to add a new product (admin)
    deleteProduct: deleteProductReducer, // delete product (admin)
    allOrders: allOrdersReducer, // for admin to all orders(admin)
    order: updateOrdersReducer, // update and delete order (admin)
    allUsers: allUsersReducer, // to get all users (admin)
    userDetails: userDetailsReducer, // to hold given user details (admin)
    productReviews: productReviewsReducer, // to hold all reviews of a product (admin)
    review: reviewsReducer, // to hold the review of the current product (admin)
});

let initialState = {
    cart: { // initial state of cart 
        // now check if in cartItems there is a item in localStorage or not (is yes then add it into cartItems array otherwise add empty array )
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {}, // initial state of shippingInfo 
    }
}; // here we will define initial state of store like products,productDetails,user,cart 
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;


